import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { getSupabaseClient } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { updateProfile, changePassword } from "@/lib/api/supabase.functions";
import { TurnstileWidget } from "@/components/TurnstileWidget";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");

  const [profileMessage, setProfileMessage] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [profileTurnstileToken, setProfileTurnstileToken] = useState<string | null>(null);

  const [newPassword, setNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [changingPassword, setChangingPassword] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [pwTurnstileToken, setPwTurnstileToken] = useState<string | null>(null);

  const { loading: authLoading, isAuthenticated, session: authSession } = useAuth();

  useEffect(() => {
    if (authLoading) return;
    if (!authSession) {
      navigate({ to: "/login", search: { redirect: "/profile" } });
      return;
    }

    let mounted = true;
    const supabase = getSupabaseClient();
    setUserId(authSession.user.id);
    setEmail(authSession.user.email ?? "");

    (async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("username, address, email_verified")
          .eq("id", authSession.user.id)
          .single();
        if (!mounted) return;
        if (!error && data) {
          setUsername(data.username ?? "");
          setAddress(data.address ?? "");
          setEmailVerified(data.email_verified ?? false);
        }
      } catch {
        // profile fetch failed — show empty form
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, [authLoading, authSession, navigate]);

  const handleSaveProfile = async () => {
    setProfileError(null);
    setProfileMessage(null);

    if (username.trim().length < 2) {
      setProfileError("Username must be at least 2 characters");
      return;
    }
    if (address.trim().length < 5) {
      setProfileError("Address must be at least 5 characters");
      return;
    }

    // Read the access token fresh from context at call time, not from a
    // value captured at mount. If the token is null the user has been
    // signed out; show a clear re-auth prompt rather than a raw API error.
    if (!authSession?.access_token) {
      setProfileError("Session expired. Please sign in again.");
      return;
    }

    setSaving(true);
    try {
      const result = await updateProfile({
        data: {
          username: username.trim(),
          address: address.trim(),
          accessToken: authSession.access_token,
          turnstileToken: profileTurnstileToken ?? undefined,
        },
      });
      setProfileMessage(result.message);
      setProfileTurnstileToken(null);
    } catch (err) {
      setProfileError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    setPasswordError(null);
    setPasswordMessage(null);

    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters");
      return;
    }

    if (!authSession?.access_token) {
      setPasswordError("Session expired. Please sign in again.");
      return;
    }

    setChangingPassword(true);
    try {
      const result = await changePassword({
        data: { newPassword, turnstileToken: pwTurnstileToken ?? undefined, accessToken: authSession.access_token },
      });
      setPasswordMessage(result.message);
      setNewPassword("");
      setPwTurnstileToken(null);
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : "Failed to change password");
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <section className="bg-white py-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto" />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-10 sm:py-20 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-3xl font-display text-[var(--foreground)]">My Account</h1>
          <p className="mt-1 text-sm text-[var(--foreground)]/70">Manage your profile and security settings.</p>
        </div>

        {/* Profile Info */}
        <div className="rounded-[var(--radius)] bg-[var(--card)] p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Profile Information</h2>
            {emailVerified ? (
              <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Email verified</span>
            ) : (
              <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Email not verified</span>
            )}
          </div>

          <div className="text-sm text-[var(--foreground)]/80">
            <span className="font-medium">Email:</span> {email}
          </div>

          <label className="block text-sm font-medium text-[var(--foreground)]">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-4 py-3 font-sans text-[var(--foreground)] outline-none"
          />

          <label className="block text-sm font-medium text-[var(--foreground)]">Shipping Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-4 py-3 font-sans text-[var(--foreground)] outline-none"
          />

          {profileError && <p className="rounded-md bg-red-50 p-3 text-sm text-[#f87171]">{profileError}</p>}
          {profileMessage && <p className="rounded-md bg-green-50 p-3 text-sm text-green-700">{profileMessage}</p>}

          <div className="flex justify-center">
            <TurnstileWidget
              onToken={setProfileTurnstileToken}
              onExpired={() => setProfileTurnstileToken(null)}
            />
          </div>

          <button
            type="button"
            onClick={handleSaveProfile}
            disabled={saving}
            className="w-full rounded-full bg-[var(--sage)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] shadow-soft hover:bg-[var(--sage-deep)] disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* Change Password */}
        <div className="rounded-[var(--radius)] bg-[var(--card)] p-6 shadow-card space-y-4">
          <h2 className="text-lg font-semibold">Change Password</h2>

          <label className="block text-sm font-medium text-[var(--foreground)]">New Password</label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-4 py-3 pr-20 font-sans text-[var(--foreground)] outline-none"
            />
            <button
              type="button"
              onClick={() => setShowNew((p) => !p)}
              className="absolute inset-y-0 right-2 flex items-center rounded-full px-3 text-xs font-semibold text-[var(--foreground)]/80 hover:text-[var(--foreground)]"
            >
              {showNew ? "Hide" : "Show"}
            </button>
          </div>

          <div className="flex justify-center">
            <TurnstileWidget
              onToken={setPwTurnstileToken}
              onExpired={() => setPwTurnstileToken(null)}
            />
          </div>

          {passwordError && <p className="rounded-md bg-red-50 p-3 text-sm text-[#f87171]">{passwordError}</p>}
          {passwordMessage && <p className="rounded-md bg-green-50 p-3 text-sm text-green-700">{passwordMessage}</p>}

          <button
            type="button"
            onClick={handleChangePassword}
            disabled={changingPassword}
            className="w-full rounded-full bg-[var(--sage)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] shadow-soft hover:bg-[var(--sage-deep)] disabled:opacity-50"
          >
            {changingPassword ? "Changing..." : "Change Password"}
          </button>
        </div>

        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-blush text-blush-foreground px-6 py-2.5 text-sm font-semibold hover:bg-blush/90 transition-all"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
