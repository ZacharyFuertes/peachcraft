import { useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { signUpWithProfile } from "@/lib/api/supabase.functions";
import { TurnstileWidget } from "@/components/TurnstileWidget";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 2) {
      newErrors.username = "Username must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.length < 5) {
      newErrors.address = "Address must be at least 5 characters";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    setError(null);
    setSuccess(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Try to fetch client IP for server-side per-IP rate limiting. If this
      // fails, continue without it (server will fall back to 'unknown').
      let ip: string | undefined = undefined;
      try {
        const ipRes = await fetch("https://api.ipify.org?format=json");
        if (ipRes.ok) {
          const ipJson = await ipRes.json();
          ip = ipJson.ip;
        }
      } catch {}

      const result = await signUpWithProfile({
        data: {
          email: formData.email,
          password: formData.password,
          username: formData.username,
          address: formData.address,
          ip,
          turnstileToken: turnstileToken ?? undefined,
        },
      });

      setSuccess(result.message);
      setFormData({
        username: "",
        email: "",
        address: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect to login after a delay
      setTimeout(() => {
        navigate({ to: "/login" });
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-[var(--radius)] bg-[var(--card)] p-8 shadow-card">
        <button
          type="button"
          onClick={() => navigate({ to: "/" })}
          className="inline-flex items-center gap-1 text-sm text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-display text-[var(--foreground)]">Create account</h1>
          <p className="mt-2 text-sm text-[var(--foreground)]/70">Join Peach Craft and start shopping!</p>
        </div>

        <div className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-semibold text-[var(--foreground)]">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a unique username"
              className={`w-full rounded-[var(--radius)] border bg-[var(--background)] px-4 py-3 font-sans text-[var(--foreground)] outline-none ${
                errors.username ? "border-[#f87171]" : "border-[var(--border)]"
              }`}
            />
            {errors.username && <p className="mt-1 text-xs text-[#f87171]">{errors.username}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-[var(--foreground)]">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className={`w-full rounded-[var(--radius)] border bg-[var(--background)] px-4 py-3 font-sans text-[var(--foreground)] outline-none ${
                errors.email ? "border-[#f87171]" : "border-[var(--border)]"
              }`}
            />
            {errors.email && <p className="mt-1 text-xs text-[#f87171]">{errors.email}</p>}
            <p className="mt-1 text-xs text-[var(--foreground)]/60">We'll send you a verification email to confirm your account</p>
            <p className="mt-1 text-xs text-[var(--foreground)]/60">Your account will be active immediately after creating it.</p>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-[var(--foreground)]">Shipping Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g., 123 Main St, Manila, NCR 1000"
              className={`w-full rounded-[var(--radius)] border bg-[var(--background)] px-4 py-3 font-sans text-[var(--foreground)] outline-none ${
                errors.address ? "border-[#f87171]" : "border-[var(--border)]"
              }`}
            />
            {errors.address && <p className="mt-1 text-xs text-[#f87171]">{errors.address}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-[var(--foreground)]">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                className={`w-full rounded-[var(--radius)] border bg-[var(--background)] px-4 py-3 pr-20 font-sans text-[var(--foreground)] outline-none ${
                  errors.password ? "border-[#f87171]" : "border-[var(--border)]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-2 flex items-center rounded-full px-3 text-xs font-semibold text-[var(--foreground)]/80 hover:text-[var(--foreground)]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-[#f87171]">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-[var(--foreground)]">Re-enter Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className={`w-full rounded-[var(--radius)] border bg-[var(--background)] px-4 py-3 pr-20 font-sans text-[var(--foreground)] outline-none ${
                  errors.confirmPassword ? "border-[#f87171]" : "border-[var(--border)]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((prev) => !prev)}
                className="absolute inset-y-0 right-2 flex items-center rounded-full px-3 text-xs font-semibold text-[var(--foreground)]/80 hover:text-[var(--foreground)]"
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
            {errors.confirmPassword && <p className="mt-1 text-xs text-[#f87171]">{errors.confirmPassword}</p>}
          </div>

          {error && <p className="rounded-md bg-red-50 p-3 text-sm text-[#f87171]">{error}</p>}
          {success && <p className="rounded-md bg-green-50 p-3 text-sm text-green-700">{success}</p>}

          <div className="flex justify-center">
            <TurnstileWidget
              onToken={setTurnstileToken}
              onExpired={() => setTurnstileToken(null)}
            />
          </div>

          <button
            type="button"
            onClick={handleSignUp}
            disabled={isLoading}
            className="w-full rounded-full bg-[var(--sage)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] shadow-soft hover:bg-[var(--sage-deep)] disabled:opacity-50"
          >
            {isLoading ? "Creating account..." : "Create account"}
          </button>

          <p className="text-center text-sm text-[var(--foreground)]/75">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-[var(--sage)] hover:text-[var(--sage-deep)]">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
