import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { P as ProductCard } from "./ProductCard-D8po8w3n.mjs";
import { d as getFeaturedProducts } from "./router-yrh6O6LQ.mjs";
import { C as CakeIllustration, H as HandmadeIllustration, K as KawaiiIllustration, P as PackagingIllustration } from "./illustrations-BQVlEpbF.mjs";
import "../_libs/seroval.mjs";
import { d as Sparkles, A as ArrowRight, H as Heart } from "../_libs/lucide-react.mjs";
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
import "./server-COqVcV7o.mjs";
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden border-b border-border/40", style: {
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32 grid lg:grid-cols-2 gap-12 items-center relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card/85 backdrop-blur text-xs font-bold text-brown shadow-card border border-border/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5 text-blush animate-wiggle", "aria-hidden": true }),
            " New drop · Strawberry Dream Series"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] text-brown tracking-tight", children: "Your shelf's most interesting story" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-foreground/85 max-w-md leading-relaxed", children: "Welcome to Peach Craft, the home of handmade fake cakes and kawaii air-dry clay crafts. Sculpted one piece at a time, with a whole lot of heart." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 flex flex-wrap gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider btn-bounce-hover shadow-soft", children: "Shop the Collection" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/about", className: "inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-primary/80 bg-white/40 text-primary font-bold text-xs uppercase tracking-wider btn-bounce-hover shadow-soft", children: [
              "Our Story ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "pt-6 grid grid-cols-3 gap-6 max-w-md border-t border-border/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-[10px] font-bold uppercase tracking-widest text-foreground/50", children: "SINCE" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-1 font-display text-2xl font-bold text-brown", children: "2021" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-[10px] font-bold uppercase tracking-widest text-foreground/50", children: "BASED IN" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-1 font-display text-2xl font-bold text-brown", children: "Philippines" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-[10px] font-bold uppercase tracking-widest text-foreground/50", children: "HANDMADE BY" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-1 font-display text-2xl font-bold text-brown", children: "1 Maker" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto w-full max-w-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-6 rounded-full bg-card/45 backdrop-blur-sm shadow-soft border border-white/20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CakeIllustration, { className: "relative w-full h-full animate-float" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex absolute -left-4 top-12 items-center gap-3 px-4 py-2.5 rounded-2xl bg-card border border-border shadow-card animate-float", style: {
            animationDelay: "1s"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid place-items-center w-8 h-8 rounded-xl bg-blush text-sm text-white font-bold", "aria-hidden": true, children: "🍑" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-brown", children: "New Restock" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/60", children: "Limited quantities" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex absolute -right-2 bottom-10 items-center gap-3 px-4 py-2.5 rounded-2xl bg-card border border-border shadow-card animate-float", style: {
            animationDelay: "2.2s"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4 fill-blush text-blush", "aria-hidden": true }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-brown", children: '"So adorable!"' }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/60", children: "— Mika, verified buyer" })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-24 border-b border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-2xl mx-auto space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-[0.25em] text-primary", children: "Why Peach Craft" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl sm:text-5xl text-brown", children: "Small studio, big heart" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 grid md:grid-cols-3 gap-8", children: [{
        Icon: HandmadeIllustration,
        title: "100% Handmade",
        desc: "Every piece is sculpted by hand with love and care. No molds, no shortcuts. Each one is a tiny original creation made just for you."
      }, {
        Icon: KawaiiIllustration,
        title: "Pretty & Useful",
        desc: "Each piece is made to earn its place: fake cakes that open up for storage, clay crafts that store jewelry. Designed to look good and be functional."
      }, {
        Icon: PackagingIllustration,
        title: "Eco-friendly Packs",
        desc: "Your orders are packed with care using sustainable cardboard and starch peanuts that melt in water. Because we care about the planet."
      }].map(({
        Icon,
        title,
        desc
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group bg-card border border-border rounded-[2.5rem] p-8 shadow-card hover:-translate-y-2 hover:shadow-soft transition-all duration-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-full h-full" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl text-brown font-semibold", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-foreground/80 leading-relaxed text-sm", children: desc })
      ] }, title)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-24 border-b border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-12 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:sticky lg:top-24 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-[0.2em] text-primary", children: "Aesthetic & Quality" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl sm:text-5xl text-brown leading-tight", children: "Peas of mind in every craft" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/75 leading-relaxed text-sm", children: "We make sure our handmade creations look delicious but last forever. Here's what makes Peach Craft stand out." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2 grid sm:grid-cols-2 gap-8", children: [{
        t: "Premium Air-Dry Clay",
        d: "Sculpted with ultra-light, durable clay that hardens into a solid, lightweight piece. No heavy stoneware — safe to display anywhere."
      }, {
        t: "Aqueous Acrylic Coating",
        d: "Every creation is hand-painted with multiple layers of pastel acrylics and finished with a protective water-resistant seal."
      }, {
        t: "Secret Storage Spaces",
        d: "Many of our fake cakes open up! A beautiful topping hides a storage box for your rings, keys, and desk clutter."
      }, {
        t: "Thoughtful Materials",
        d: "Using non-toxic clays, recycled paper pulps, and premium seals. We design safe and high quality decorations for your home."
      }].map((spec) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border/80 pb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg text-brown font-bold mb-2", children: spec.t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed", children: spec.d })
      ] }, spec.t)) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-accent py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-[0.25em] text-primary", children: "The Studio Favorites" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl sm:text-5xl text-brown", children: "Featured Crafts" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/75 text-sm max-w-md mx-auto", children: "A few of our most beloved creations. Sign up for alerts so you never miss a drop!" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-8", children: isLoading ? Array.from({
          length: 4
        }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-80 rounded-[2rem] bg-[var(--card)] shadow-soft animate-pulse" }, index)) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-[2rem] bg-[var(--card)] p-6 text-sm text-red-400 shadow-soft col-span-full", children: error instanceof Error ? error.message : "Unable to load featured products." }) : (products ?? []).slice(0, 4).map((product) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product }, product.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop", className: "inline-flex items-center justify-center px-8 py-4 rounded-full bg-blush text-blush-foreground font-bold text-xs uppercase tracking-wider btn-bounce-hover shadow-soft", children: [
          "View All Crafts ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full mt-16 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/assets/COMPILATIONPIC.png", alt: "Compilation of customer photos and stories", loading: "lazy", className: "block w-full h-auto object-cover opacity-95" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blush text-blush-foreground rounded-[2.5rem] p-8 sm:p-12 lg:p-16 shadow-soft grid lg:grid-cols-[1.2fr_1fr] gap-8 items-center relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 marquee-strip pointer-events-none opacity-20", "aria-hidden": true }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl sm:text-5xl leading-tight", children: "A few unique crafts are still available." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blush-foreground/90 max-w-md text-sm leading-relaxed", children: "Each piece is a singular creation. Visit our shop to find the perfect cupcake container or clay companion." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex justify-start lg:justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop", className: "inline-flex items-center justify-center px-8 py-4 rounded-full bg-blush-foreground text-blush font-bold text-xs uppercase tracking-wider btn-bounce-hover shadow-soft", children: [
        "Shop the Drop ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2 animate-wiggle" })
      ] }) })
    ] }) }) })
  ] });
}
export {
  HomePage as component
};
