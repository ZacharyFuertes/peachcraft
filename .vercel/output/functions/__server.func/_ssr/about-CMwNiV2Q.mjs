import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { C as CakeIllustration } from "./illustrations-BQVlEpbF.mjs";
import { A as ArrowRight } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
function AboutPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 lg:py-24", style: {
      backgroundImage: "var(--gradient-hero)"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-primary", children: "About" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-3 font-display text-5xl lg:text-6xl text-brown leading-tight", children: [
          "Hi, I'm the hands behind ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "text-primary not-italic italic", children: "Peach Craft" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-lg text-foreground/85 leading-relaxed", children: "Peach Craft didn't start with a grand plan. It started with two curious questions: how does air-dry clay actually work? And how do I make a fake cake?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-foreground/80 leading-relaxed", children: "One question led to the next, and before I knew it, I was making things. My friends and family saw something in my work before I even saw it in myself, and that early belief pushed me to keep going. What kept it going after that was the customers. The ones who gave honest feedback so I could improve. The ones who loved what they received. The ones who kept coming back." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-foreground/80 leading-relaxed", children: "Then life got full. Work, the ups and downs of everything at once. My hands started to give out. I was taking every order, working without limits, and eventually my hands ached bad enough to scare me. So I stopped. Not quit — stopped. I told myself: this is just a pause." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-foreground/80 leading-relaxed", children: "And here we are. Same curious hands and same love for the craft, just with a little more intention this time. Peach Craft is back, and we're not in a hurry. Just making things, one piece at a time." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop", className: "mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-soft hover:-translate-y-0.5 transition-transform", children: [
          "See what I'm making ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CakeIllustration, { className: "w-full max-w-md mx-auto animate-float" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-6", children: [{
      k: "01",
      t: "Sketch",
      d: "Every craft starts as a doodle in my notebook."
    }, {
      k: "02",
      t: "Sculpt",
      d: "Hand-shaped from air-dry clay — no molds."
    }, {
      k: "03",
      t: "Paint & pack",
      d: "Sealed, painted, and packed in eco-friendly boxes."
    }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-3xl p-8 shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl text-blush", children: s.k }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-display text-2xl text-brown", children: s.t }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-foreground/80", children: s.d })
    ] }, s.k)) }) })
  ] });
}
export {
  AboutPage as component
};
