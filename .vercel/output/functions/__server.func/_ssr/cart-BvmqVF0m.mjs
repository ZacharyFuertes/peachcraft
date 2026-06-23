import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useCart } from "./router-ChcEy1hy.mjs";
import { a as getSupabaseClient } from "./supabase-B6oNw5MC.mjs";
import "../_libs/seroval.mjs";
import { A as ArrowRight, h as ChevronDown, i as ChevronUp, j as Trash2 } from "../_libs/lucide-react.mjs";
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
import "./server-BjK0EJpJ.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/zod.mjs";
function CartPage() {
  const navigate = useNavigate();
  const {
    items,
    itemCount,
    subtotal,
    updateQuantity,
    removeItem,
    clear
  } = useCart();
  const [userEmail, setUserEmail] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const supabase = getSupabaseClient();
    supabase.auth.getUser().then(({
      data
    }) => {
      setUserEmail(data.user?.email ?? null);
    });
  }, []);
  const shippingFee = 150;
  const taxAmount = 0;
  const totalAmount = subtotal + shippingFee + taxAmount;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-primary", children: "Your bag" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-5xl text-brown", children: "Shopping cart" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-foreground/75", children: "Review your selected crafts, update quantities, and continue to checkout." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-[var(--card)] p-4 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[var(--foreground)]/70", children: "Items in cart" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-2xl font-semibold text-[var(--foreground)]", children: itemCount })
      ] })
    ] }),
    items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-[var(--card)] p-10 text-center shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-[var(--foreground)]", children: "Your cart is empty." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-[var(--foreground)]/75", children: "Add some Peach Craft favorites before checking out." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop", className: "mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90", children: [
        "Shop crafts ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-[1.6fr_0.9fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl bg-[var(--card)] p-6 shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-28 w-28 overflow-hidden rounded-3xl bg-[var(--background)]", children: item.image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.image, alt: item.name, className: "h-full w-full object-cover" }) : null }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-[var(--foreground)]", children: item.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-[var(--foreground)]/80", children: [
              "₱",
              item.price.toLocaleString()
            ] }),
            item.stock_qty != null ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-sm text-[var(--foreground)]/70", children: [
              item.stock_qty,
              " left in stock"
            ] }) : null
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-background px-3 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => updateQuantity(item.product_id, item.qty - 1), "aria-label": `Decrease quantity for ${item.name}`, className: "grid place-items-center h-9 w-9 rounded-full bg-[var(--card)] text-[var(--foreground)] shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-[2rem] text-center text-sm font-semibold text-[var(--foreground)]", children: item.qty }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => updateQuantity(item.product_id, item.qty + 1), "aria-label": `Increase quantity for ${item.name}`, className: "grid place-items-center h-9 w-9 rounded-full bg-[var(--card)] text-[var(--foreground)] shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => removeItem(item.product_id), className: "inline-flex items-center gap-2 rounded-full border border-[#f3d1d8] bg-[#fff1f4] px-4 py-2 text-sm font-semibold text-[#c24151] hover:bg-[#ffe3ec]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
            " Remove"
          ] })
        ] })
      ] }) }, item.product_id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-6 rounded-3xl bg-[var(--card)] p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm uppercase tracking-[0.18em] text-[var(--foreground)]/70", children: "Order summary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-3 text-sm text-[var(--foreground)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
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
        !userEmail ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[var(--foreground)]/75 mb-2", children: "Please sign in to place your order" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => navigate({
            to: "/login",
            search: {
              redirect: "/checkout"
            }
          }), className: "w-full rounded-full border border-primary bg-background px-5 py-3 text-sm font-semibold text-primary hover:bg-primary/5 transition-all", children: "Sign in to checkout" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => navigate({
          to: "/checkout"
        }), className: "w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:bg-primary/90", children: "Proceed to checkout" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: clear, className: "w-full rounded-full border border-[var(--border)] bg-background px-5 py-3 text-sm font-semibold text-[var(--foreground)] hover:bg-accent", children: "Empty cart" })
      ] })
    ] })
  ] }) });
}
export {
  CartPage as component
};
