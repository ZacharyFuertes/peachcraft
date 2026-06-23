import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { b as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { b as cn, t as toggleProductActive, m as deleteProduct, l as getAdminProducts } from "./router-ChcEy1hy.mjs";
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
import "../_libs/lucide-react.mjs";
import "../_libs/zod.mjs";
function AdminProductsPage() {
  const queryClient = useQueryClient();
  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ["admin-products"],
    queryFn: getAdminProducts
  });
  const [activeId, setActiveId] = reactExports.useState(null);
  const [actionError, setActionError] = reactExports.useState(null);
  const getAccessToken = async () => {
    const supabase = getSupabaseClient();
    const {
      data: data2
    } = await supabase.auth.getSession();
    return data2?.session?.access_token;
  };
  const handleToggle = async (product) => {
    setActionError(null);
    setActiveId(product.id);
    try {
      const accessToken = await getAccessToken();
      await toggleProductActive({
        data: {
          id: product.id,
          is_active: !Boolean(product.is_active),
          accessToken
        }
      });
      await queryClient.invalidateQueries(["admin-products"]);
    } catch (error2) {
      setActionError(error2 instanceof Error ? error2.message : "Unable to update product.");
    } finally {
      setActiveId(null);
    }
  };
  const handleDelete = async (product) => {
    if (!window.confirm("Delete this product? This action cannot be undone.")) {
      return;
    }
    setActionError(null);
    setActiveId(product.id);
    try {
      const accessToken = await getAccessToken();
      await deleteProduct({
        data: {
          id: product.id,
          accessToken
        }
      });
      await queryClient.invalidateQueries(["admin-products"]);
    } catch (error2) {
      setActionError(error2 instanceof Error ? error2.message : "Unable to delete product.");
    } finally {
      setActiveId(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm uppercase tracking-[0.25em] text-[var(--foreground)]/70", children: "Products" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 text-4xl font-semibold text-[var(--foreground)]", children: "Manage products" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/products/new", className: "inline-flex items-center justify-center rounded-full bg-[var(--sage)] px-6 py-3 text-sm font-semibold text-[var(--foreground)] shadow-soft hover:bg-[var(--sage-deep)]", children: "Add product" })
    ] }),
    actionError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl bg-[#f87171]/10 p-4 text-sm text-[#991b1b]", children: actionError }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4", children: Array.from({
      length: 4
    }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 rounded-3xl bg-[var(--card)] shadow-soft" }, index)) }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-3xl bg-[var(--card)] p-6 text-sm text-[#f87171]", children: error instanceof Error ? error.message : "Could not load products." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[var(--background)] text-[var(--foreground)]/75", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-4", children: "Product" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-4", children: "Price" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-4", children: "Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-4", children: "Stock" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-4", children: "Active" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-4", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: data?.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-[var(--border)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 font-semibold text-[var(--foreground)]", children: product.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-4 text-[var(--foreground)]", children: [
          "₱",
          product.price.toLocaleString("en-PH")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 text-[var(--foreground)]/80", children: product.category ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold", product.stock_qty === 0 ? "bg-[#f87171] text-[var(--background)]" : "bg-[var(--sage)] text-[var(--foreground)]"), children: product.stock_qty ?? 0 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4", children: product.is_active ? "Yes" : "No" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-4 space-x-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/admin/products/${product.id}`, className: "inline-flex rounded-full bg-[var(--background)] px-3 py-2 text-xs font-semibold text-[var(--foreground)] shadow-soft hover:bg-[var(--foreground)]/10", children: "Edit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => handleToggle(product), disabled: activeId === product.id, className: "inline-flex rounded-full bg-[var(--sage)] px-3 py-2 text-xs font-semibold text-[var(--foreground)] shadow-soft hover:bg-[var(--sage-deep)] disabled:opacity-50", children: product.is_active ? "Disable" : "Enable" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => handleDelete(product), disabled: activeId === product.id, className: "inline-flex rounded-full bg-[#f87171] px-3 py-2 text-xs font-semibold text-[var(--background)] shadow-soft hover:bg-[#ef4444] disabled:opacity-50", children: "Delete" })
        ] })
      ] }, product.id)) })
    ] }) })
  ] });
}
export {
  AdminProductsPage as component
};
