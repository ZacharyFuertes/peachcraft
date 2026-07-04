import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, g as useLocation, L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as getSupabaseClient } from "./supabase-BbYbDVIj.mjs";
<<<<<<<< HEAD:.vercel/output/functions/__server.func/_ssr/login-Be7cq1Ra.mjs
import { c as checkEmailVerification } from "./router-D98JWfRI.mjs";
========
import { c as checkEmailVerification } from "./router-CN-wybRF.mjs";
>>>>>>>> 8e9d1c4d806b4680033fc485fbb81fd36eb1433e:.vercel/output/functions/__server.func/_ssr/login-U6NMoy3x.mjs
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/supabase__ssr.mjs";
import "../_libs/cookie.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
<<<<<<<< HEAD:.vercel/output/functions/__server.func/_ssr/login-Be7cq1Ra.mjs
import "./server-BWmwJzJ_.mjs";
========
import "./server-BO7pyA8t.mjs";
>>>>>>>> 8e9d1c4d806b4680033fc485fbb81fd36eb1433e:.vercel/output/functions/__server.func/_ssr/login-U6NMoy3x.mjs
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-separator.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/radix-ui__react-collapsible.mjs";
import "../_libs/radix-ui__react-avatar.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/zod.mjs";
function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const adminEmail = "admin@peachcraft.com";
  const isAdminAttempt = email.trim().toLowerCase() === adminEmail.toLowerCase();
  const redirectPath = new URLSearchParams(location.searchStr).get("redirect") ?? "/";
  const handleSignIn = async () => {
    setError(null);
    setIsLoading(true);
    const supabase = getSupabaseClient();
    const {
      data,
      error: authError
    } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password
    });
    setIsLoading(false);
    if (authError) {
      setError(authError.message);
      return;
    }
    if (!data.user?.id) {
      setError("Failed to sign in. Please try again.");
      return;
    }
    if (!isAdminAttempt) {
      try {
        const verification = await checkEmailVerification({
          data: {
            userId: data.user.id
          }
        });
        if (!verification.emailVerified) {
          setError("Your email has not been verified yet. Please check your email for a verification link and try again.");
          return;
        }
      } catch (verifyError) {
        console.error("Email verification check failed:", verifyError);
      }
    }
    const userEmail = data?.user?.email?.toLowerCase() ?? "";
    if (userEmail === adminEmail.toLowerCase()) {
      navigate({
        to: "/admin"
      });
      return;
    }
    navigate({
      to: redirectPath
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md rounded-[var(--radius)] bg-[var(--card)] p-8 shadow-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-display text-[var(--foreground)]", children: "Peach Craft" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-[var(--foreground)]/70", children: "Sign in to your account." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-semibold text-[var(--foreground)]", children: "Email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: email, onChange: (event) => setEmail(event.target.value.trimStart()), className: "w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-4 py-3 font-sans text-[var(--foreground)] outline-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-semibold text-[var(--foreground)]", children: "Password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: showPassword ? "text" : "password", value: password, onChange: (event) => setPassword(event.target.value), className: "w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-4 py-3 pr-20 font-sans text-[var(--foreground)] outline-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPassword((prev) => !prev), className: "absolute inset-y-0 right-2 flex items-center rounded-full px-3 text-sm font-semibold text-[var(--foreground)]/80 hover:text-[var(--foreground)]", children: showPassword ? "Hide" : "Show" })
      ] }),
      isAdminAttempt && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-[var(--foreground)]/70", children: "Admin email detected. If these credentials are valid, you will be redirected to the admin dashboard." }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-md bg-red-50 p-3 text-sm text-[#f87171]", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleSignIn, disabled: isLoading, className: "w-full rounded-full bg-[var(--sage)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] shadow-soft hover:bg-[var(--sage-deep)] disabled:opacity-50", children: isLoading ? "Signing in..." : "Sign in" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-[var(--foreground)]/75", children: [
        "Don't have an account?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", className: "font-semibold text-[var(--sage)] hover:text-[var(--sage-deep)]", children: "Create account" })
      ] })
    ] })
  ] }) });
}
export {
  LoginPage as component
};
