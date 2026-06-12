import { useEffect, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { verifyEmail } from "@/lib/api/supabase.functions";

export const Route = createFileRoute("/verify-email")({
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/verify-email" });
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Get the token from the URL hash or query parameter
        const hash = window.location.hash;
        const query = window.location.search;
        const hashParams = new URLSearchParams(hash.substring(1));
        const queryParams = new URLSearchParams(query);
        const token =
          hashParams.get("token") ||
          hashParams.get("code") ||
          queryParams.get("token") ||
          queryParams.get("code");
        const tokenHash =
          hashParams.get("token_hash") || queryParams.get("token_hash");
        const email = hashParams.get("email") || queryParams.get("email");
        const type = hashParams.get("type") || queryParams.get("type");

        if ((!token || !email) && !tokenHash) {
          setStatus("error");
          setMessage(
            "Invalid verification link. Please check your email for the correct link or request a new one."
          );
          return;
        }

        const result = await verifyEmail({
          data: tokenHash
            ? { token_hash: tokenHash, type: type ?? "signup" }
            : { token: token!, email: email!, type: type ?? "signup" },
        });
        setStatus("success");
        setMessage(result.message);

        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate({ to: "/login" });
        }, 3000);
      } catch (error) {
        setStatus("error");
        setMessage(error instanceof Error ? error.message : "Failed to verify email. Please try again.");
      }
    };

    verifyToken();
  }, [navigate]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-[var(--radius)] bg-[var(--card)] p-8 shadow-card text-center">
        <div className="mb-8">
          <h1 className="text-4xl font-display text-[var(--foreground)]">Email Verification</h1>
        </div>

        <div className="space-y-6">
          {status === "loading" && (
            <>
              <div className="flex justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-[var(--border)] border-t-[var(--sage)]"></div>
              </div>
              <p className="text-sm text-[var(--foreground)]/70">{message}</p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                  <svg
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-sm font-semibold text-green-700">{message}</p>
              <p className="text-xs text-[var(--foreground)]/60">
                Redirecting to login page in a few seconds...
              </p>
              <button
                onClick={() => navigate({ to: "/login" })}
                className="w-full rounded-full bg-[var(--sage)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] shadow-soft hover:bg-[var(--sage-deep)]"
              >
                Go to login now
              </button>
            </>
          )}

          {status === "error" && (
            <>
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                  <svg
                    className="h-8 w-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-[#f87171]">{message}</p>
              <div className="space-y-2">
                <button
                  onClick={() => navigate({ to: "/signup" })}
                  className="w-full rounded-full bg-[var(--sage)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] shadow-soft hover:bg-[var(--sage-deep)]"
                >
                  Try signing up again
                </button>
                <button
                  onClick={() => navigate({ to: "/login" })}
                  className="w-full rounded-full border border-[var(--border)] bg-background px-4 py-3 text-sm font-semibold text-[var(--foreground)] hover:bg-accent"
                >
                  Back to login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
