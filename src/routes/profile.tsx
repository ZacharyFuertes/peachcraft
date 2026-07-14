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
      const profilePromise = supabase
        .from("profiles")
        .select("username, address, email_verified")
        .eq("id", authSession.user.id)
        .single();

      const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Profile fetch timed out")), 3000),
      );

      try {
        const result = await Promise.race([profilePromise, timeout]);
        if (!mounted) return;
        if (result && !result.error && result.data) {
          setUsername(result.data.username ?? "");
          setAddress(result.data.address ?? "");
          setEmailVerified(result.data.email_verified ?? false);
        }
      } catch {
        // profile fetch failed or timed out — show empty form
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-lg mx-auto lg:max-w-2xl xl:max-w-3xl px-5 py-8 sm:py-12 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-[26px] font-display font-medium text-gray-900 -tracking-[0.03em]">
            My Account
          </h1>
          <p className="text-[13px] text-gray-400 mt-1">Manage your profile and security settings.</p>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-2xl shadow-[0_2px_24px_-6px_rgba(0,0,0,0.10)] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-[15px] font-medium text-gray-900">Profile Information</p>
            {emailVerified ? (
              <span className="text-[11px] font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                Email verified
              </span>
            ) : (
              <span className="text-[11px] font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                Email not verified
              </span>
            )}
          </div>

          <div className="text-[13px] text-gray-500">
            <span className="font-medium text-gray-700">Email:</span> {email}
          </div>

          <div className="border-t border-gray-100" />

          <label className="block text-[13px] font-medium text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[14px] text-gray-900 outline-none transition-colors focus:border-gray-400"
          />

          <label className="block text-[13px] font-medium text-gray-700">Shipping Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[14px] text-gray-900 outline-none transition-colors focus:border-gray-400"
          />

          {profileError && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-[13px] font-medium text-red-600">
              {profileError}
            </p>
          )}
          {profileMessage && (
            <p className="rounded-xl bg-green-50 px-4 py-3 text-[13px] font-medium text-green-700">
              {profileMessage}
            </p>
          )}

          <div className="flex justify-center pt-1">
            <TurnstileWidget
              onToken={setProfileTurnstileToken}
              onExpired={() => setProfileTurnstileToken(null)}
            />
          </div>

          <button
            type="button"
            onClick={handleSaveProfile}
            disabled={saving}
            className="w-full rounded-full bg-gray-900 px-5 py-3 text-sm font-medium text-white shadow-[0_2px_12px_-3px_rgba(0,0,0,0.25)] hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-2xl shadow-[0_2px_24px_-6px_rgba(0,0,0,0.10)] p-5 space-y-4">
          <p className="text-[15px] font-medium text-gray-900">Change Password</p>

          <div className="border-t border-gray-100" />

          <label className="block text-[13px] font-medium text-gray-700">New Password</label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-20 text-[14px] text-gray-900 outline-none transition-colors focus:border-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowNew((p) => !p)}
              className="absolute inset-y-0 right-2 flex items-center rounded-full px-3 text-[12px] font-medium text-gray-400 hover:text-gray-700 transition-colors"
            >
              {showNew ? "Hide" : "Show"}
            </button>
          </div>

          <div className="flex justify-center pt-1">
            <TurnstileWidget
              onToken={setPwTurnstileToken}
              onExpired={() => setPwTurnstileToken(null)}
            />
          </div>

          {passwordError && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-[13px] font-medium text-red-600">
              {passwordError}
            </p>
          )}
          {passwordMessage && (
            <p className="rounded-xl bg-green-50 px-4 py-3 text-[13px] font-medium text-green-700">
              {passwordMessage}
            </p>
          )}

          <button
            type="button"
            onClick={handleChangePassword}
            disabled={changingPassword}
            className="w-full rounded-full bg-gray-900 px-5 py-3 text-sm font-medium text-white shadow-[0_2px_12px_-3px_rgba(0,0,0,0.25)] hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {changingPassword ? "Changing..." : "Change Password"}
          </button>
        </div>

        <div className="text-center pt-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-6 py-2.5 text-[13px] font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
