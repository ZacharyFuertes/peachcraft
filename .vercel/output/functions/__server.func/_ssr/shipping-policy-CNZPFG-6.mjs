import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Truck, R as RotateCcw, f as ShieldCheck } from "../_libs/lucide-react.mjs";
function PolicyPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-primary", children: "Fine print" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-5xl text-brown", children: "Shipping & Policy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-foreground/75 max-w-xl mx-auto", children: "Everything you need to know about how your craft makes it from my studio to your shelf." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid sm:grid-cols-3 gap-4", children: [{
      Icon: Truck,
      t: "3–5 day shipping",
      d: "Nationwide PH"
    }, {
      Icon: RotateCcw,
      t: "7-day returns",
      d: "On unopened items"
    }, {
      Icon: ShieldCheck,
      t: "Replacement guarantee",
      d: "If it arrives broken"
    }].map(({
      Icon,
      t,
      d
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl p-5 shadow-card text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-6 h-6 mx-auto text-primary", "aria-hidden": true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-semibold text-brown", children: t }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/70", children: d })
    ] }, t)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "mt-12 space-y-8 bg-card rounded-3xl p-8 sm:p-10 shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl text-brown", children: "Shipping" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-foreground/80 leading-relaxed", children: "Orders ship within 3 business days from Manila. Free shipping on orders ₱1,000 and above. Delivery typically takes 3–5 business days within the Philippines via our trusted courier partners." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl text-brown", children: "Refunds" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-foreground/80 leading-relaxed", children: "We accept returns on unopened items within 7 days of delivery. Custom and made-to-order pieces are final sale. If your order arrives damaged, send us a photo within 48 hours and we'll send a replacement, free of charge." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl text-brown", children: "Care" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-foreground/80 leading-relaxed", children: "Our pieces are made from air-dry clay and are decorative, not food-safe. Keep them dry, away from direct sunlight, and dust gently with a soft brush." })
      ] })
    ] })
  ] }) });
}
export {
  PolicyPage as component
};
