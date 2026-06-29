import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { P as ProductCard } from "./ProductCard-DSqOGi5a.mjs";
import { R as Route$k, a as searchProducts } from "./router-CEXJ6wrN.mjs";
import "../_libs/seroval.mjs";
import { o as ArrowLeft, S as Search, P as Package, d as Sparkles } from "../_libs/lucide-react.mjs";
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
import "../_libs/zod.mjs";
function SearchResultsPage() {
  const {
    q
  } = Route$k.useSearch();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = reactExports.useState(q);
  reactExports.useEffect(() => {
    setSearchInput(q);
  }, [q]);
  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ["search-products", q],
    queryFn: () => searchProducts({
      data: {
        q
      }
    })
  });
  const products = data?.products ?? [];
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    navigate({
      to: "/search",
      search: {
        q: searchInput.trim()
      }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream min-h-screen py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop", className: "inline-flex items-center gap-1.5 text-sm font-medium text-foreground/60 hover:text-foreground transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Back to shop" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-xs font-bold uppercase tracking-wider text-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-3 w-3" }),
        " E-commerce Search"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-4xl sm:text-5xl text-brown", children: q ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        "Search Results for ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
          '"',
          q,
          '"'
        ] })
      ] }) : "Search Peach Craft" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-foreground/60", children: products.length > 0 ? `Found ${products.length} product${products.length === 1 ? "" : "s"} ranked by relevance and sales popularity.` : q ? "We couldn't find matches for your search, but you can refine it below." : "Type a keyword to discover cute handmade clay figures, storage boxes, and fake cakes." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 max-w-xl bg-card rounded-3xl p-4 shadow-card border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSearchSubmit, className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: searchInput, onChange: (e) => setSearchInput(e.target.value), placeholder: "Search products, brands, or categories...", className: "w-full pl-10 pr-4 py-2.5 rounded-full border border-border focus:border-primary focus:outline-none text-sm bg-background/50" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-soft hover:shadow-card hover:-translate-y-0.5 active:translate-y-0 transition-all shrink-0", children: "Search" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12", children: isLoading ? (
      // Skeleton Loader
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: Array.from({
        length: 4
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[28rem] rounded-3xl bg-[var(--card)] animate-pulse shadow-soft" }, i)) })
    ) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl bg-red-50 p-6 text-sm text-red-600 shadow-soft", children: error instanceof Error ? error.message : "An error occurred during search. Please try again." }) : products.length === 0 ? (
      // Empty State
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-3xl p-12 text-center shadow-card max-w-2xl mx-auto space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto text-foreground/45", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-8 w-8" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl text-brown", children: "No Matches Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground/60 max-w-md mx-auto text-sm leading-relaxed", children: [
            "Try checking your spelling, using more general keywords (e.g. ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "cake" }),
            " instead of ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "strawberry dream" }),
            "), or exploring the popular categories below."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t border-border space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-foreground/40 text-left", children: "Try These Collections" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: ["Accessories", "Necklaces", "Earrings", "Rings", "Bracelets"].map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/search", search: {
            q: cat
          }, className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-accent hover:bg-primary hover:text-primary-foreground transition-all", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-3 w-3" }),
            cat
          ] }, cat)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4 flex items-center justify-center gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-card hover:-translate-y-0.5 active:translate-y-0 transition-all", children: "Browse All Crafts" }) })
      ] })
    ) : (
      // Results Grid
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-foreground/50 border-b pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-primary" }),
            " Sorted by text relevance + popularity boost"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Showing ",
            products.length,
            " result",
            products.length === 1 ? "" : "s"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 sm:gap-6 animate-fade-in", children: products.map((p) => {
          const typedProduct = p;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2.5 py-1 rounded-md bg-white/95 backdrop-blur text-[10px] font-bold text-brown uppercase tracking-wider shadow-card select-none", children: typedProduct.brand }),
              typedProduct.searchScore > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-2 py-0.5 rounded bg-primary text-primary-foreground text-[8px] font-bold uppercase tracking-wider shadow-card w-fit select-none", children: [
                "Match Score: ",
                typedProduct.searchScore
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p })
          ] }, p.id);
        }) })
      ] })
    ) })
  ] }) });
}
export {
  SearchResultsPage as component
};
