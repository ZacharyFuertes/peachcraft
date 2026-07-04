import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { n as Truck, R as RotateCcw, o as ShieldCheck } from "../_libs/lucide-react.mjs";
function PolicyPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-20 min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "text-center space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-[0.25em] text-primary", children: "Help Center" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl text-brown font-bold tracking-tight", children: "Frequently Asked Questions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/75 text-sm max-w-xl mx-auto", children: "Everything you need to know about how your craft makes it from our kitchen table studio to your shelf." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid sm:grid-cols-3 gap-6", children: [{
      Icon: Truck,
      t: "3–5 Days Delivery",
      d: "Nationwide PH Shipping"
    }, {
      Icon: RotateCcw,
      t: "7-Day Returns",
      d: "On unopened, stock crafts"
    }, {
      Icon: ShieldCheck,
      t: "Full Safe Guarantee",
      d: "Replacement if it arrives broken"
    }].map(({
      Icon,
      t,
      d
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border/80 rounded-2xl p-6 shadow-card text-center space-y-2 btn-bounce-hover", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-accent/40 flex items-center justify-center mx-auto text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5", "aria-hidden": true }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-brown text-sm", children: t }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/70", children: d })
    ] }, t)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 bg-card border border-border/80 rounded-[2.5rem] p-8 sm:p-12 shadow-card space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "faq-accordion", open: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "When will my order ship?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "accordion-icon", "aria-hidden": true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "accordion-content", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Standard in-stock orders are processed and ship out from Manila within 1 to 3 business days. Made-to-order creations or custom items may require an additional sculpting period which is specified on their individual pages." }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "faq-accordion", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "How much is shipping and do you offer free options?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "accordion-icon", "aria-hidden": true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "accordion-content space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Shipping is calculated automatically at checkout based on your delivery address." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Yes!" }),
            " We offer completely free shipping on all orders totaling ₱1,000 or more within the Philippines."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "faq-accordion", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Do you ship internationally?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "accordion-icon", "aria-hidden": true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "accordion-content", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We do! International orders are shipped via standard airmail. Transit times usually vary from 14 to 20 business days depending on customs and local courier handling in your destination country." }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "faq-accordion", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Can I return or exchange my craft?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "accordion-icon", "aria-hidden": true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "accordion-content", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We accept returns on unopened, unused items in their original packaging within 7 days of package delivery. Return postage is covered by the customer. Please note that custom commissions, personalized, and sales items are final sale." }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "faq-accordion", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "What happens if my creation arrives broken?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "accordion-icon", "aria-hidden": true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "accordion-content", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Because clay creations can be delicate, we pack them with layers of high-grade starch and bubble wraps. In the rare event that an item arrives damaged, send us a photo of the item and its package within 48 hours of delivery and we will ship you a replacement, free of charge." }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "faq-accordion", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "How should I clean and care for my clay item?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "accordion-icon", "aria-hidden": true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "accordion-content", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Air-dry clay items are decorative pieces and are not waterproof, dishwasher, or food-safe. Handle them gently. Keep them away from moisture, water, and prolonged direct sunlight. To clean, brush off dust using a soft dry painting brush or a micro-fiber cloth." }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "faq-accordion", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Do you accept custom clay commissions?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "accordion-icon", "aria-hidden": true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "accordion-content", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We open slots for custom cake storage boxes and clay figures periodically. When slots are open, a special booking button will appear in the shop menu, and we will announce drops on our Instagram channel (@peach.craft). Feel free to send us custom requests via our Contact page!" }) })
      ] })
    ] })
  ] }) });
}
export {
  PolicyPage as component
};
