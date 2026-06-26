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
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 lg:py-28", style: {
      backgroundImage: "var(--gradient-hero)"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-[0.25em] text-primary", children: "About Peach Craft" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl sm:text-6xl text-brown font-bold tracking-tight leading-tight", children: [
        "Hi, I'm the hands behind ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "text-primary not-italic italic font-display", children: "Peach Craft" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-foreground/85 text-base sm:text-lg leading-relaxed space-y-6 max-w-2xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Peach Craft didn't start with a grand business plan. It started with simple curiosity: how does air-dry clay actually work? And how do I make a realistic fake cake?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "One question led to the next, and before I knew it, I was making all sorts of things at my kitchen table. My friends saw something in my early crafts before I did, and that push kept me going. What really sustained me, though, was my customers—the ones who gave feedback, shared pictures of their shelves, and came back for every drop." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Eventually, life got incredibly full. Between work, commissions, and standard packaging, I was pushing my limits, and my hands started to ache. So I stopped. Not quit—just paused. I told myself to take a breath and craft with intention." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "And now, Peach Craft is back. Same curious hands, same dedication to the clay process, but moving a little slower this time. Just making things, one piece at a time, with absolute love." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop", className: "inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider btn-bounce-hover shadow-soft", children: [
        "See what I'm making ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 bg-background border-t border-b border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-md mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CakeIllustration, { className: "w-full h-auto animate-float mx-auto" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 space-y-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-[0.25em] text-primary", children: "The Process" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl text-brown font-bold tracking-tight", children: "How it gets made" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-8", children: [{
        k: "01",
        t: "Notebook Doodles",
        d: "Every single craft begins as a quick watercolor sketch or pencil doodle in my ideas book."
      }, {
        k: "02",
        t: "Hand Sculpting",
        d: "Air-dry clay is hand-shaped and custom blended without using synthetic molds. No two items are identical!"
      }, {
        k: "03",
        t: "Seal & Package",
        d: "Each piece is hand-painted, waterproof sealed, and packaged in recycled cardboard with water-soluble peanuts."
      }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border/80 rounded-[2.5rem] p-8 shadow-card hover:-translate-y-1.5 hover:shadow-soft transition-all duration-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl font-bold text-blush", children: s.k }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-display text-xl text-brown font-bold", children: s.t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-foreground/80 leading-relaxed", children: s.d })
      ] }, s.k)) })
    ] }) })
  ] });
}
export {
  AboutPage as component
};
