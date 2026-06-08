import { useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { getSupabaseClient } from "@/lib/supabase";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    setError(null);
    setIsLoading(true);

    const supabase = getSupabaseClient();
    const { error: authError } = await supabase.auth.signUp({ email, password });
    setIsLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    navigate("/");
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-[var(--radius)] bg-[var(--card)] p-8 shadow-card">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-display text-[var(--foreground)]">Create account</h1>
          <p className="mt-2 text-sm text-[var(--foreground)]/70">Register to shop and manage your Peach Craft orders.</p>
        </div>

        <div className="space-y-5">
          <label className="block text-sm font-semibold text-[var(--foreground)]">Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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

          {error && <p className="text-sm text-[#f87171]">{error}</p>}

          <button
            type="button"
            onClick={handleSignUp}
            disabled={isLoading}
            className="w-full rounded-full bg-[var(--sage)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] shadow-soft hover:bg-[var(--sage-deep)] disabled:opacity-50"
          >
            {isLoading ? "Creating account..." : "Create account"}
          </button>

          <p className="text-center text-sm text-[var(--foreground)]/75">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-[var(--sage)] hover:text-[var(--sage-deep)]">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
