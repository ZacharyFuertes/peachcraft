import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as Mail, I as Instagram, c as Music2, g as Send } from "../_libs/lucide-react.mjs";
function ContactPage() {
  const [sent, setSent] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-6 grid lg:grid-cols-[1fr_1.2fr] gap-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-primary", children: "Contact" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-5xl text-brown", children: "Say hi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-foreground/80 leading-relaxed", children: "Custom order? Press inquiry? Just want to chat about clay? I'd love to hear from you. I reply within 1–2 business days." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-6 space-y-3 text-foreground/80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-5 h-5 text-primary", "aria-hidden": true }),
          " hello@peachcraft.shop"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "w-5 h-5 text-primary", "aria-hidden": true }),
          " @peach.craft"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Music2, { className: "w-5 h-5 text-primary", "aria-hidden": true }),
          " @thepeachywitch"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      setSent(true);
    }, className: "bg-card rounded-3xl p-8 shadow-card space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "name", className: "block text-sm font-semibold text-brown mb-1.5", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "name", required: true, className: "w-full h-11 px-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "email", className: "block text-sm font-semibold text-brown mb-1.5", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "email", type: "email", required: true, className: "w-full h-11 px-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "msg", className: "block text-sm font-semibold text-brown mb-1.5", children: "Message" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { id: "msg", required: true, rows: 5, className: "w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-soft hover:-translate-y-0.5 transition-transform", children: sent ? "Sent! Talk soon" : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        "Send message ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" })
      ] }) })
    ] })
  ] }) });
}
export {
  ContactPage as component
};
