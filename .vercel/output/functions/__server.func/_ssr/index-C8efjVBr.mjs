import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { P as ProductCard } from "./ProductCard-DOKYjl-V.mjs";
import { e as getFeaturedProducts } from "./router-C4B3aEDs.mjs";
import { C as CakeIllustration, H as HandmadeIllustration, K as KawaiiIllustration, P as PackagingIllustration } from "./illustrations-BQVlEpbF.mjs";
import "../_libs/seroval.mjs";
import { b as Sparkles, A as ArrowRight, H as Heart } from "../_libs/lucide-react.mjs";
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
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/zod.mjs";
const featuredProductsQuery = {
  queryKey: ["featured-products"],
  queryFn: getFeaturedProducts
};
function HomePage() {
  const {
    data: products,
    isLoading,
    error
  } = useQuery(featuredProductsQuery);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden", style: {
      backgroundImage: "var(--gradient-hero)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "aria-hidden": true, className: "pointer-events-none absolute inset-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-10 left-1/3 w-3 h-3 rounded-full bg-blush animate-float", style: {
          animationDelay: "0.5s"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-32 right-1/4 w-2 h-2 rounded-full bg-sage animate-float", style: {
          animationDelay: "1.2s"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-24 left-1/4 text-2xl animate-float", style: {
          animationDelay: "0s"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-20 right-10 text-xl animate-float text-blush", style: {
          animationDelay: "2s"
        } })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32 grid lg:grid-cols-2 gap-12 items-center relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card/80 backdrop-blur text-xs font-semibold text-brown shadow-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5 text-blush", "aria-hidden": true }),
            " New drop · Strawberry Dream Series"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-5 font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-brown", children: "Your shelf's most interesting story" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-lg text-foreground/85 max-w-md leading-relaxed", children: "Welcome to Peach Craft, the home of fake cakes and air-dry clay crafts, each one sculpted by hand with a whole lot of heart." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop", className: "inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold shadow-soft hover:shadow-card hover:-translate-y-0.5 active:translate-y-0 transition-all", children: [
              "Shop the Collection ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/about", className: "inline-flex  items-center gap-2 px-7 py-3.5 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-colors", children: [
              "About Me ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "mt-10 grid grid-cols-3 gap-6 max-w-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs uppercase tracking-wider text-foreground/60", children: "SINCE" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-1 font-display text-2xl text-brown", children: "2021" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs uppercase tracking-wider text-foreground/60", children: "BASED IN" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-1 font-display text-2xl text-brown inline-flex items-center gap-1", children: "Philippines" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs uppercase tracking-wider text-foreground/60", children: "Made by" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-1 font-display text-2xl text-brown", children: "1 pair of hands" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto w-full max-w-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-6 rounded-full bg-card/40 backdrop-blur-sm shadow-soft" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CakeIllustration, { className: "relative w-full h-full animate-float" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex absolute -left-4 top-12 items-center gap-2 px-3 py-2 rounded-2xl bg-card shadow-card animate-float", style: {
            animationDelay: "1s"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid place-items-center w-9 h-9 rounded-xl bg-blush text-lg", "aria-hidden": true }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-brown", children: "New restock" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/60", children: "3 pieces left" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex absolute -right-2 bottom-10 items-center gap-2 px-3 py-2 rounded-2xl bg-card shadow-card animate-float", style: {
            animationDelay: "2.2s"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4 fill-blush text-blush", "aria-hidden": true }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-brown", children: '"So adorable!"' }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/60", children: "— Mika, verified buyer" })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-primary", children: "Why Peach Craft" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-4xl text-brown", children: "Small studio, big heart" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid md:grid-cols-3 gap-6", children: [{
        Icon: HandmadeIllustration,
        title: "Handmade",
        desc: "Every piece is crafted by hand with love and care. No two are exactly alike — each one is a tiny original made just for you."
      }, {
        Icon: KawaiiIllustration,
        title: "Pretty useful",
        desc: "Each piece is made to earn its place: fake cakes that open up for storage, clay crafts that add something to your space. Handmade to look good and actually be useful."
      }, {
        Icon: PackagingIllustration,
        title: "Thoughtful Packaging",
        desc: "Your orders are packed with care using eco-friendly materials. Because we love the planet as much as we love cute crafts."
      }].map(({
        Icon,
        title,
        desc
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group bg-card rounded-3xl p-8 shadow-card hover:-translate-y-1 hover:shadow-soft transition-all", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 mb-5 transition-transform group-hover:scale-110 group-hover:rotate-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-full h-full" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl text-brown", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-foreground/80 leading-relaxed", children: desc })
      ] }, title)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-accent py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl text-brown", children: "Featured Crafts" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-foreground/75", children: "A few of our most beloved creations — restocks coming soon!" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: isLoading ? Array.from({
          length: 4
        }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-80 rounded-3xl bg-[var(--card)] shadow-soft" }, index)) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl bg-[var(--card)] p-6 text-sm text-[#f87171] shadow-soft", children: error instanceof Error ? error.message : "Unable to load featured products." }) : (products ?? []).map((product) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product }, product.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop", className: "inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-blush text-blush-foreground font-semibold shadow-soft hover:scale-105 transition-transform", children: [
          "View All Crafts ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/assets/COMPILATIONPIC.png", alt: "Compilation of customer photos and stories", loading: "lazy", className: "block w-full h-auto object-cover shadow-soft rounded-none" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-blush text-blush-foreground py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-6 grid lg:grid-cols-[1fr_auto] items-center gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display italic text-2xl sm:text-3xl text-center lg:text-left", children: "A few pieces are still available." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop", className: "justify-self-center inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blush-foreground text-blush font-semibold hover:scale-105 transition-transform", children: [
        "Shop ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
      ] })
    ] }) })
  ] });
}
export {
  HomePage as component
};
