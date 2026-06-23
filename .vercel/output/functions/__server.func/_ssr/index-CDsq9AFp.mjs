import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { P as ProductCard } from "./ProductCard-DkFp0Wyb.mjs";
import { e as getAllProducts } from "./router-ChcEy1hy.mjs";
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "text-center max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-primary", children: "The Shop" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-5xl text-brown", children: "All Crafts" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-foreground/75", children: "Sculpted one piece at a time. Restocks happen every Friday — sign up for alerts so you never miss a drop." })
    ] }),
    isAdminPreview ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => navigate({
      to: "/admin"
    }), className: "inline-flex items-center justify-center rounded-full bg-[var(--sage)] px-5 py-2 text-sm font-semibold text-[var(--foreground)] shadow-soft transition hover:bg-[var(--sage-deep)]", children: "Back to admin dashboard" }) }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: isLoading ? Array.from({
      length: 8
    }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-80 rounded-3xl bg-[var(--card)] shadow-soft" }, index)) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl bg-[var(--card)] p-6 text-sm text-[#f87171] shadow-soft", children: error instanceof Error ? error.message : "Unable to load products." }) : (all ?? []).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p }, p.id)) })
  ] }) });
}
export {
  ShopPage as component
};
