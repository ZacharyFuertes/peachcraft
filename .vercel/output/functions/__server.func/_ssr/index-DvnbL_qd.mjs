import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { P as ProductCard } from "./ProductCard-TgrXYWd8.mjs";
import { f as getAllProducts } from "./router-BWI5fU0i.mjs";
import { a as getSupabaseClient } from "./supabase-B6oNw5MC.mjs";
import "../_libs/seroval.mjs";
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
import "../_libs/lucide-react.mjs";
import "./server-DDg7KSaC.mjs";
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
const allProductsQuery = {
  queryKey: ["all-products"],
  queryFn: getAllProducts
};
function ShopPage() {
  const [isAdminPreview, setIsAdminPreview] = reactExports.useState(false);
  const navigate = useNavigate();
  const {
    data: all,
    isLoading,
    error
  } = useQuery(allProductsQuery);
  reactExports.useEffect(() => {
    let mounted = true;
    const supabase = getSupabaseClient();
    const adminEmail = "admin@peachcraft.com";
    supabase.auth.getUser().then(({
      data
    }) => {
      if (!mounted) return;
      const userEmail = data.user?.email?.toLowerCase() ?? "";
      if (userEmail === adminEmail.toLowerCase()) {
        setIsAdminPreview(true);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-white py-10 sm:py-20 min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "max-w-2xl mx-auto space-y-3 mb-8 sm:mb-0 sm:text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-[0.25em] text-primary hidden sm:inline-block", children: "The Collection" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl sm:text-5xl lg:text-6xl text-brown font-bold tracking-tight", children: "Products" })
    ] }),
    isAdminPreview ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => navigate({
      to: "/admin"
    }), className: "inline-flex items-center justify-center rounded-full bg-[var(--sage)] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[var(--foreground)] shadow-soft transition-all btn-bounce-hover", children: "Back to admin dashboard" }) }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-5 sm:gap-8", children: isLoading ? Array.from({
      length: 8
    }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-80 rounded-[2rem] bg-[var(--card)] shadow-soft animate-pulse" }, index)) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-[2rem] bg-[var(--card)] p-6 text-sm text-[#f87171] shadow-soft col-span-full", children: error instanceof Error ? error.message : "Unable to load products." }) : (all ?? []).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p }, p.id)) })
  ] }) });
}
export {
  ShopPage as component
};
