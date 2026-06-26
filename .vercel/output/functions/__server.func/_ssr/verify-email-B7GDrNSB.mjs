import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, f as useSearch } from "../_libs/tanstack__react-router.mjs";
import { v as verifyEmail } from "./router-BoccmxA6.mjs";
import "../_libs/seroval.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./supabase-B6oNw5MC.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./server-DGfOajJg.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/zod.mjs";
function VerifyEmailPage() {
  const navigate = useNavigate();
  useSearch({
    from: "/verify-email"
  });
  const [status, setStatus] = reactExports.useState("loading");
  const [message, setMessage] = reactExports.useState("Verifying your email...");
  reactExports.useEffect(() => {
    const verifyToken = async () => {
      try {
        const hash = window.location.hash;
        const query = window.location.search;
        const hashParams = new URLSearchParams(hash.substring(1));
        const queryParams = new URLSearchParams(query);
        const token = hashParams.get("token") || hashParams.get("code") || queryParams.get("token") || queryParams.get("code");
        const tokenHash = hashParams.get("token_hash") || queryParams.get("token_hash");
        const email = hashParams.get("email") || queryParams.get("email");
        const type = hashParams.get("type") || queryParams.get("type");
        if ((!token || !email) && !tokenHash) {
          setStatus("error");
          setMessage("Invalid verification link. Please check your email for the correct link or request a new one.");
          return;
        }
        const result = await verifyEmail({
          data: tokenHash ? {
            token_hash: tokenHash,
            type: type ?? "signup"
          } : {
            token,
            email,
            type: type ?? "signup"
          }
        });
        setStatus("success");
        setMessage(result.message);
        setTimeout(() => {
          navigate({
            to: "/login"
          });
        }, 3e3);
      } catch (error) {
        setStatus("error");
        setMessage(error instanceof Error ? error.message : "Failed to verify email. Please try again.");
      }
    };
    verifyToken();
  }, [navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md rounded-[var(--radius)] bg-[var(--card)] p-8 shadow-card text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-display text-[var(--foreground)]", children: "Email Verification" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      status === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 animate-spin rounded-full border-4 border-[var(--border)] border-t-[var(--sage)]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[var(--foreground)]/70", children: message })
      ] }),
      status === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-green-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "h-8 w-8 text-green-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-green-700", children: message }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[var(--foreground)]/60", children: "Redirecting to login page in a few seconds..." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
          to: "/login"
        }), className: "w-full rounded-full bg-[var(--sage)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] shadow-soft hover:bg-[var(--sage-deep)]", children: "Go to login now" })
      ] }),
      status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-red-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "h-8 w-8 text-red-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#f87171]", children: message }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
            to: "/signup"
          }), className: "w-full rounded-full bg-[var(--sage)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] shadow-soft hover:bg-[var(--sage-deep)]", children: "Try signing up again" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
            to: "/login"
          }), className: "w-full rounded-full border border-[var(--border)] bg-background px-4 py-3 text-sm font-semibold text-[var(--foreground)] hover:bg-accent", children: "Back to login" })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  VerifyEmailPage as component
};
