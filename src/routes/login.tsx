import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { getSupabaseClient } from "@/lib/supabase";
import { checkEmailVerification } from "@/lib/api/supabase.functions";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initialCheck, setInitialCheck] = useState(true);

  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL ?? "";
  const isAdminAttempt = adminEmail && email.trim().toLowerCase() === adminEmail.toLowerCase();
  const redirectPath = new URLSearchParams(location.searchStr).get("redirect") ?? "/";

  // If already logged in, redirect away immediately
  useEffect(() => {
    const check = async () => {
      const supabase = getSupabaseClient();
      // Use getSession() first to await async session recovery from localStorage
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        console.log("[Auth:Login] Already logged in as", session.user.email, "— redirecting");
        const adminEmail = import.meta.env.VITE_ADMIN_EMAIL ?? "";
        if (adminEmail && session.user.email?.toLowerCase() === adminEmail.toLowerCase()) {
          navigate({ to: "/admin" });
        } else {
          navigate({ to: redirectPath as "/" });
        }
      } else {
        setInitialCheck(false);
      }
    };
    check();
  }, []);

  const handleSignIn = async () => {
    console.log("[Auth:SignIn] ===== SIGN-IN START =====");
    console.log("[Auth:SignIn] Client type:", typeof window !== "undefined" ? "browser" : "server");
    console.log("[Auth:SignIn] Cookies before sign-in:", document.cookie);
    console.log("[Auth:SignIn] Supabase client constructor:", getSupabaseClient().constructor.name);

    setError(null);
    setIsLoading(true);

    const supabase = getSupabaseClient();
    console.log("[Auth:SignIn] Calling supabase.auth.signInWithPassword...");
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    console.log("[Auth:SignIn] signInWithPassword result:", {
      hasUser: !!data?.user,
      userId: data?.user?.id ?? null,
      email: data?.user?.email ?? null,
      hasSession: !!data?.session,
      accessTokenPresent: !!data?.session?.access_token,
      refreshTokenPresent: !!data?.session?.refresh_token,
      error: authError?.message ?? null,
    });

    setIsLoading(false);

    if (authError) {
      console.log("[Auth:SignIn] Auth error:", authError.message);
      setError(authError.message);
      return;
    }

    if (!data.user?.id) {
      console.log("[Auth:SignIn] No user ID returned");
      setError("Failed to sign in. Please try again.");
      return;
    }

    // Check cookies after sign-in
    console.log("[Auth:SignIn] Cookies after sign-in:", document.cookie);
    const sbCookie = document.cookie.split("; ").find((c) => c.startsWith("sb-"));
    console.log("[Auth:SignIn] Supabase auth cookie found:", !!sbCookie, sbCookie ? sbCookie.slice(0, 50) + "..." : "NONE");

    // Check if email is verified for non-admin users
    if (!isAdminAttempt) {
      try {
        const verification = await checkEmailVerification({ data: { userId: data.user.id } });
        console.log("[Auth:SignIn] Email verification check:", verification);

        if (!verification.emailVerified) {
          console.log("[Auth:SignIn] Email not verified, blocking sign-in");
          setError(
            "Your email has not been verified yet. Please check your email for a verification link and try again."
          );
          return;
        }
      } catch (verifyError) {
        console.error("[Auth:SignIn] Email verification check failed:", verifyError);
        // Continue with login even if verification check fails for backward compatibility
      }
    }

    const userEmail = data?.user?.email?.toLowerCase() ?? "";
    console.log("[Auth:SignIn] Sign-in successful, navigating to:", adminEmail && userEmail === adminEmail.toLowerCase() ? "/admin" : redirectPath);
    if (adminEmail && userEmail === adminEmail.toLowerCase()) {
      navigate({ to: "/admin" });
      return;
    }

    navigate({ to: redirectPath as "/" });
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-[var(--radius)] bg-[var(--card)] p-8 shadow-card">
        {initialCheck ? (
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

              {isAdminAttempt && (
                <p className="mt-2 text-sm text-[var(--foreground)]/70">
                  Admin email detected. If these credentials are valid, you will be redirected to the admin dashboard.
                </p>
              )}

              {error && <p className="rounded-md bg-red-50 p-3 text-sm text-[#f87171]">{error}</p>}

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
