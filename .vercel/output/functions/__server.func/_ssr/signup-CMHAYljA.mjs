import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { s as signUpWithProfile } from "./router-CEXJ6wrN.mjs";
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
import "./supabase-BbYbDVIj.mjs";
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
import "./server-vV9MCtmr.mjs";
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
function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = reactExports.useState({
    username: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = reactExports.useState({});
  const [error, setError] = reactExports.useState(null);
  const [success, setSuccess] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const validateForm = () => {
    const newErrors = {};
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
      let ip = void 0;
      try {
        const ipRes = await fetch("https://api.ipify.org?format=json");
        if (ipRes.ok) {
          const ipJson = await ipRes.json();
          ip = ipJson.ip;
        }
      } catch {
      }
      const result = await signUpWithProfile({
        data: {
          email: formData.email,
          password: formData.password,
          username: formData.username,
          address: formData.address,
          ip
        }
      });
      setSuccess(result.message);
      setFormData({
        username: "",
        email: "",
        address: "",
        password: "",
        confirmPassword: ""
      });
      setTimeout(() => {
        navigate({
          to: "/login"
        });
      }, 2e3);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };
  const handleChange = (e) => {
    const {
      name,
      value
    } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = {
          ...prev
        };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md rounded-[var(--radius)] bg-[var(--card)] p-8 shadow-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-display text-[var(--foreground)]", children: "Create account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-[var(--foreground)]/70", children: "Join Peach Craft and start shopping!" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-semibold text-[var(--foreground)]", children: "Username" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", name: "username", value: formData.username, onChange: handleChange, placeholder: "Choose a unique username", className: `w-full rounded-[var(--radius)] border bg-[var(--background)] px-4 py-3 font-sans text-[var(--foreground)] outline-none ${errors.username ? "border-[#f87171]" : "border-[var(--border)]"}` }),
        errors.username && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-[#f87171]", children: errors.username })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-semibold text-[var(--foreground)]", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", name: "email", value: formData.email, onChange: handleChange, placeholder: "your@email.com", className: `w-full rounded-[var(--radius)] border bg-[var(--background)] px-4 py-3 font-sans text-[var(--foreground)] outline-none ${errors.email ? "border-[#f87171]" : "border-[var(--border)]"}` }),
        errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-[#f87171]", children: errors.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-[var(--foreground)]/60", children: "We'll send you a verification email to confirm your account" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-[var(--foreground)]/60", children: "Your account will be active immediately after creating it." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-semibold text-[var(--foreground)]", children: "Shipping Address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", name: "address", value: formData.address, onChange: handleChange, placeholder: "e.g., 123 Main St, Manila, NCR 1000", className: `w-full rounded-[var(--radius)] border bg-[var(--background)] px-4 py-3 font-sans text-[var(--foreground)] outline-none ${errors.address ? "border-[#f87171]" : "border-[var(--border)]"}` }),
        errors.address && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-[#f87171]", children: errors.address })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-semibold text-[var(--foreground)]", children: "Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: showPassword ? "text" : "password", name: "password", value: formData.password, onChange: handleChange, placeholder: "At least 8 characters", className: `w-full rounded-[var(--radius)] border bg-[var(--background)] px-4 py-3 pr-20 font-sans text-[var(--foreground)] outline-none ${errors.password ? "border-[#f87171]" : "border-[var(--border)]"}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPassword((prev) => !prev), className: "absolute inset-y-0 right-2 flex items-center rounded-full px-3 text-xs font-semibold text-[var(--foreground)]/80 hover:text-[var(--foreground)]", children: showPassword ? "Hide" : "Show" })
        ] }),
        errors.password && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-[#f87171]", children: errors.password })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-semibold text-[var(--foreground)]", children: "Re-enter Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: showConfirm ? "text" : "password", name: "confirmPassword", value: formData.confirmPassword, onChange: handleChange, placeholder: "Confirm your password", className: `w-full rounded-[var(--radius)] border bg-[var(--background)] px-4 py-3 pr-20 font-sans text-[var(--foreground)] outline-none ${errors.confirmPassword ? "border-[#f87171]" : "border-[var(--border)]"}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowConfirm((prev) => !prev), className: "absolute inset-y-0 right-2 flex items-center rounded-full px-3 text-xs font-semibold text-[var(--foreground)]/80 hover:text-[var(--foreground)]", children: showConfirm ? "Hide" : "Show" })
        ] }),
        errors.confirmPassword && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-[#f87171]", children: errors.confirmPassword })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-md bg-red-50 p-3 text-sm text-[#f87171]", children: error }),
      success && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-md bg-green-50 p-3 text-sm text-green-700", children: success }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleSignUp, disabled: isLoading, className: "w-full rounded-full bg-[var(--sage)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] shadow-soft hover:bg-[var(--sage-deep)] disabled:opacity-50", children: isLoading ? "Creating account..." : "Create account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-[var(--foreground)]/75", children: [
        "Already have an account?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "font-semibold text-[var(--sage)] hover:text-[var(--sage-deep)]", children: "Sign in" })
      ] })
    ] })
  ] }) });
}
export {
  SignupPage as component
};
