import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { a as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useCart, g as getUserActiveOrderStatus, b as createOrder } from "./router-C4B3aEDs.mjs";
import { a as getSupabaseClient } from "./supabase-B6oNw5MC.mjs";
import "../_libs/seroval.mjs";
import { o as objectType, e as enumType, s as stringType } from "../_libs/zod.mjs";
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
import "./server-BdVVm24x.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/cmdk.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/lucide-react.mjs";
const shippingSchema = objectType({
  name: stringType().min(1, "Please enter your full name."),
  email: stringType().email("Please enter a valid email address."),
  street: stringType().min(1, "Please enter a street address."),
  city: stringType().min(1, "Please enter a city."),
  province: stringType().min(1, "Please enter a province."),
  zip: stringType().min(1, "Please enter a postal code."),
  payment_method: enumType(["cash_on_delivery"])
});
function CheckoutPage() {
  const navigate = useNavigate();
  const {
    items,
    subtotal,
    itemCount,
    clear
  } = useCart();
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [street, setStreet] = reactExports.useState("");
  const [city, setCity] = reactExports.useState("");
  const [province, setProvince] = reactExports.useState("");
  const [zip, setZip] = reactExports.useState("");
  const [paymentMethod, setPaymentMethod] = reactExports.useState("cash_on_delivery");
  const [formErrors, setFormErrors] = reactExports.useState({});
  const [successMessage, setSuccessMessage] = reactExports.useState(null);
  const [checkingAuth, setCheckingAuth] = reactExports.useState(true);
  const [isAuthenticated, setIsAuthenticated] = reactExports.useState(null);
  const [isVerified, setIsVerified] = reactExports.useState(null);
  const [hasActiveOrder, setHasActiveOrder] = reactExports.useState(false);
  const [activeOrderId, setActiveOrderId] = reactExports.useState(null);
  const [authError, setAuthError] = reactExports.useState(null);
  const shippingFee = 150;
  const taxAmount = 0;
  const totalAmount = subtotal + shippingFee + taxAmount;
  reactExports.useEffect(() => {
    let mounted = true;
    const performChecks = async () => {
      try {
        const supabase = getSupabaseClient();
        const {
          data: {
            user
          }
        } = await supabase.auth.getUser();
        if (!mounted) return;
        if (!user) {
          setIsAuthenticated(false);
          setIsVerified(false);
          setCheckingAuth(false);
          return;
        }
        setIsAuthenticated(true);
        setEmail(user.email ?? "");
        const {
          data: profile,
          error: profileError
        } = await supabase.from("profiles").select("email_verified, username, address").eq("id", user.id).single();
        if (!mounted) return;
        if (profileError || !profile) {
          setIsVerified(false);
        } else {
          setIsVerified(!!profile.email_verified);
          if (profile.username) setName(profile.username);
          if (profile.address) setStreet(profile.address);
        }
        const activeStatus = await getUserActiveOrderStatus();
        if (!mounted) return;
        setHasActiveOrder(activeStatus.hasActiveOrder);
        setActiveOrderId(activeStatus.activeOrder?.id ?? null);
      } catch (err) {
        console.error("Checkout validation check failed:", err);
        if (mounted) {
          setAuthError("An error occurred while validating your session. Please refresh the page.");
        }
      } finally {
        if (mounted) {
          setCheckingAuth(false);
        }
      }
    };
    performChecks();
    return () => {
      mounted = false;
    };
  }, []);
  reactExports.useEffect(() => {
    if (checkingAuth === false && !isAuthenticated) {
      const timer = setTimeout(() => {
        navigate({
          to: "/login",
          search: {
            redirect: "/checkout"
          }
        });
      }, 3e3);
      return () => clearTimeout(timer);
    }
  }, [checkingAuth, isAuthenticated]);
  if (checkingAuth) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-[var(--card)] p-12 shadow-soft flex flex-col items-center justify-center min-h-[300px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/75 font-medium", children: "Verifying your account status..." })
    ] }) }) });
  }
  if (authError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-[var(--card)] p-12 shadow-soft space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl bg-[#fee2e2] p-4 text-sm text-[#b91c1c]", children: authError }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => window.location.reload(), className: "inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 shadow-soft", children: "Refresh Page" })
    ] }) }) });
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-[var(--card)] p-12 shadow-soft space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#fee2e2] text-[#ef4444]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "h-8 w-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl text-brown", children: "Authentication Required" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-foreground/75 max-w-md mx-auto", children: "Only verified users can place orders. Please sign in to your account to proceed." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-foreground/50", children: "Redirecting you to the login page shortly..." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => navigate({
          to: "/login",
          search: {
            redirect: "/checkout"
          }
        }), className: "inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 shadow-soft", children: "Sign In Now" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => navigate({
          to: "/signup"
        }), className: "inline-flex rounded-full border border-[var(--border)] bg-background px-6 py-3 text-sm font-semibold text-[var(--foreground)] hover:bg-accent shadow-soft", children: "Create Account" })
      ] })
    ] }) }) });
  }
  if (!isVerified) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-[var(--card)] p-12 shadow-soft space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#fef3c7] text-[#d97706]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "h-8 w-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl text-brown", children: "Email Verification Required" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-foreground/75 max-w-md mx-auto", children: "Your email address has not been verified yet. For security reasons, only users with verified email addresses can place orders." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-sm text-foreground/70", children: [
          "Please check your inbox at ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-primary", children: email }),
          " for the verification link sent during signup."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => navigate({
        to: "/shop"
      }), className: "inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 shadow-soft", children: "Return to Shop" }) })
    ] }) }) });
  }
  if (hasActiveOrder) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-[var(--card)] p-12 shadow-soft space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#fee2e2] text-[#ef4444]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "h-8 w-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl text-brown", children: "Active Order In Progress" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-foreground/75 max-w-md mx-auto", children: [
          "You already have an order currently in progress (Order ID: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-mono text-xs", children: activeOrderId?.slice(0, 8) }),
          ")."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-foreground/70", children: "To prevent database inflation and spam, we limit customers to one active order. You can place a new order once your current order is delivered or cancelled." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => navigate({
        to: "/shop"
      }), className: "inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 shadow-soft", children: "Return to Shop" }) })
    ] }) }) });
  }
  const mutation = useMutation({
    mutationFn: async (payload) => {
      return createOrder({
        data: payload
      });
    },
    onSuccess: () => {
      clear();
      setSuccessMessage("Your order is confirmed! We will reach out once it ships.");
    }
  });
  const handleSubmit = async () => {
    setFormErrors({});
    setSuccessMessage(null);
    if (items.length === 0) {
      setFormErrors({
        general: "Your cart is empty. Add items before checking out."
      });
      return;
    }
    const result = shippingSchema.safeParse({
      name,
      email,
      street,
      city,
      province,
      zip,
      payment_method: paymentMethod
    });
    if (!result.success) {
      const newErrors = {};
      for (const issue of result.error.issues) {
        newErrors[issue.path[0]] = issue.message;
      }
      setFormErrors(newErrors);
      return;
    }
    try {
      await mutation.mutateAsync({
        items: items.map((item) => ({
          product_id: item.product_id,
          qty: item.qty,
          price_at_purchase: item.price
        })),
        shipping_address: {
          name: result.data.name,
          email: result.data.email,
          street: result.data.street,
          city: result.data.city,
          province: result.data.province,
          zip: result.data.zip
        },
        total_amount: totalAmount,
        payment_method: result.data.payment_method
      });
    } catch (error) {
      setFormErrors({
        general: error instanceof Error ? error.message : "Unable to place order."
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-[1.4fr_0.9fr]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 rounded-3xl bg-[var(--card)] p-8 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-primary", children: "Checkout" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-5xl text-brown", children: "Shipping & payment" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-foreground/75", children: "Complete your order with shipping details and place your purchase." })
      ] }),
      successMessage ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-[var(--sage)]/15 p-6 text-sm text-[var(--foreground)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Order placed successfully!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2", children: successMessage }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => navigate({
          to: "/shop"
        }), className: "mt-4 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90", children: "Continue shopping" })
      ] }) : null,
      formErrors.general ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl bg-[#fee2e2] p-4 text-sm text-[#b91c1c]", children: formErrors.general }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "space-y-2 text-sm text-[var(--foreground)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: name, onChange: (event) => setName(event.target.value), className: "w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-4 py-3 outline-none" }),
          formErrors.name ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#f87171]", children: formErrors.name }) : null
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "space-y-2 text-sm text-[var(--foreground)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: email, onChange: (event) => setEmail(event.target.value), className: "w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-4 py-3 outline-none" }),
          formErrors.email ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#f87171]", children: formErrors.email }) : null
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "space-y-2 text-sm text-[var(--foreground)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Street address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: street, onChange: (event) => setStreet(event.target.value), className: "w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-4 py-3 outline-none" }),
        formErrors.street ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#f87171]", children: formErrors.street }) : null
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "space-y-2 text-sm text-[var(--foreground)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "City" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: city, onChange: (event) => setCity(event.target.value), className: "w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-4 py-3 outline-none" }),
          formErrors.city ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#f87171]", children: formErrors.city }) : null
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "space-y-2 text-sm text-[var(--foreground)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Province" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: province, onChange: (event) => setProvince(event.target.value), className: "w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-4 py-3 outline-none" }),
          formErrors.province ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#f87171]", children: formErrors.province }) : null
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "space-y-2 text-sm text-[var(--foreground)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Postal code" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: zip, onChange: (event) => setZip(event.target.value), className: "w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-4 py-3 outline-none" }),
          formErrors.zip ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#f87171]", children: formErrors.zip }) : null
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "space-y-2 text-sm text-[var(--foreground)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Payment method" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: paymentMethod, onChange: (event) => setPaymentMethod(event.target.value), className: "w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-4 py-3 outline-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "cash_on_delivery", children: "Cash on delivery" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleSubmit, disabled: mutation.isLoading, className: "inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:bg-primary/90 disabled:opacity-50", children: mutation.isLoading ? "Placing order..." : "Place order" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-6 rounded-3xl bg-[var(--card)] p-6 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm uppercase tracking-[0.18em] text-[var(--foreground)]/70", children: "Order summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-3 text-sm text-[var(--foreground)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              itemCount,
              " items"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "₱",
              subtotal.toLocaleString()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Shipping" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "₱",
              shippingFee.toLocaleString()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Tax" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "₱",
              taxAmount.toLocaleString()
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-t border-[var(--border)] pt-5 text-lg font-semibold text-[var(--foreground)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "₱",
          totalAmount.toLocaleString()
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-[var(--background)] p-5 text-sm text-[var(--foreground)]/80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Payment is handled at delivery." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2", children: "This checkout flow currently uses Cash on Delivery. Stripe integration can be added later." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-[var(--background)] p-5 text-sm text-[var(--foreground)]/80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Need to change your cart?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => navigate({
          to: "/cart"
        }), className: "mt-3 inline-flex rounded-full bg-primary/5 px-4 py-2 text-sm font-semibold text-primary", children: "Edit cart" })
      ] })
    ] })
  ] }) }) });
}
export {
  CheckoutPage as component
};
