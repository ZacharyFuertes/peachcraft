import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { getSupabaseClient } from "@/lib/supabase";
import { checkEmailVerification, checkIsAdmin, saveCartForUser, verifyLoginAttempt, recordLoginFailure } from "@/lib/api/supabase.functions";
import { getCartItems, makePersistableCartItem } from "@/lib/cart";
import { TurnstileWidget } from "@/components/TurnstileWidget";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function sanitizeRedirect(path: string): string {
  if (path.startsWith("//") || path.includes(":")) return "/";
  if (!path.startsWith("/")) return "/";
  return path;
}

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [clientIp, setClientIp] = useState<string | null>(null);

  // Fetch client IP on mount for rate limiting
  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((r) => r.json())
      .then((d) => setClientIp(d.ip))
      .catch(() => {});
  }, []);

  const redirectPath = sanitizeRedirect(new URLSearchParams(location.searchStr).get("redirect") ?? "/");

  const { loading: authLoading, isAuthenticated, session: authSession } = useAuth();
  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated || !authSession) return;
    checkIsAdmin({ data: { accessToken: authSession.access_token } })
      .then(({ isAdmin }) => navigate({ to: isAdmin ? "/admin" : redirectPath as "/" }))
      .catch(() => {});
  }, [authLoading, isAuthenticated, authSession, navigate]);

  const handleSignIn = async () => {
    setError(null);
    setIsLoading(true);

    try {
      // Verify Turnstile + rate limit before calling Supabase Auth
      try {
        await verifyLoginAttempt({
          data: { turnstileToken: turnstileToken ?? undefined, ip: clientIp ?? undefined },
        });
      } catch (verifyErr) {
        setError(verifyErr instanceof Error ? verifyErr.message : "Verification failed. Please try again.");
        return;
      }

      const supabase = getSupabaseClient();
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });

      if (authError) {
        // Record the failed attempt for rate limiting
        try {
          await recordLoginFailure({ data: { ip: clientIp ?? undefined } });
        } catch {}
        setError(authError.message);
        return;
      }

      if (!data.user?.id) {
        setError("Failed to sign in. Please try again.");
        return;
      }

      const accessToken = data.session?.access_token;

      // Determine admin status using the access token (not cookies, which may
      // not be fully settled yet after signInWithPassword in some browsers).
      let isAdmin = false;
      try {
        const adminResult = await checkIsAdmin({ data: { accessToken } });
        isAdmin = adminResult.isAdmin;
      } catch {
        // Server function unreachable — proceed as non-admin
      }

      // Check if email is verified for non-admin users
      if (!isAdmin) {
        try {
          const verification = await checkEmailVerification({ data: { userId: data.user.id } });
          if (!verification.emailVerified) {
            setError(
              "Your email has not been verified yet. Please check your email for a verification link and try again."
            );
            return;
          }
        } catch {
          // Continue even if verification check fails
        }
      }

      // Merge guest cart to server before navigating
      if (accessToken) {
        try {
          const localItems = getCartItems();
          if (localItems.length > 0) {
            await saveCartForUser({
              data: { items: localItems.map((item) => makePersistableCartItem(item)), accessToken },
            });
          }
        } catch {
          // Cart merge failure is non-blocking — continue with login
        }
      }

      navigate({ to: isAdmin ? "/admin" : redirectPath as "/" });
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-[var(--radius)] bg-[var(--card)] p-8 shadow-card">
        {authLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : (
          <>
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-display text-[var(--foreground)]">Peach Craft</h1>
              <p className="mt-2 text-sm text-[var(--foreground)]/70">Sign in to your account.</p>
            </div>

            <div className="space-y-5">
              <label className="block text-sm font-semibold text-[var(--foreground)]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value.trimStart())}
                className="w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-4 py-3 font-sans text-[var(--foreground)] outline-none"
              />

              <label className="block text-sm font-semibold text-[var(--foreground)]">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-4 py-3 pr-20 font-sans text-[var(--foreground)] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-2 flex items-center rounded-full px-3 text-sm font-semibold text-[var(--foreground)]/80 hover:text-[var(--foreground)]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {error && <p className="rounded-md bg-red-50 p-3 text-sm text-[#f87171]">{error}</p>}

              <div className="flex justify-center">
                <TurnstileWidget
                  onToken={setTurnstileToken}
                  onExpired={() => setTurnstileToken(null)}
                />
              </div>

              <button
                type="button"
                onClick={handleSignIn}
                disabled={isLoading}
                className="w-full rounded-full bg-[var(--sage)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] shadow-soft hover:bg-[var(--sage-deep)] disabled:opacity-50"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>

              <p className="text-center text-sm text-[var(--foreground)]/75">
                Don't have an account?{" "}
                <Link to="/signup" className="font-semibold text-[var(--sage)] hover:text-[var(--sage-deep)]">
                  Create account
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
