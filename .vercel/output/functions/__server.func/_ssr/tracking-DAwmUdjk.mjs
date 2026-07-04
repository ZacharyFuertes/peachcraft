import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
<<<<<<<< HEAD:.vercel/output/functions/__server.func/_ssr/tracking-6JvtOxXr.mjs
import { I as Input, h as cn, z as getOrdersList } from "./router-D98JWfRI.mjs";
========
import { I as Input, h as cn, E as getOrdersList } from "./router-CN-wybRF.mjs";
>>>>>>>> 8e9d1c4d806b4680033fc485fbb81fd36eb1433e:.vercel/output/functions/__server.func/_ssr/tracking-DAwmUdjk.mjs
import "../_libs/seroval.mjs";
import { S as Search } from "../_libs/lucide-react.mjs";
import { f as format } from "../_libs/date-fns.mjs";
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
<<<<<<<< HEAD:.vercel/output/functions/__server.func/_ssr/tracking-6JvtOxXr.mjs
import "./server-BWmwJzJ_.mjs";
========
import "./server-BO7pyA8t.mjs";
>>>>>>>> 8e9d1c4d806b4680033fc485fbb81fd36eb1433e:.vercel/output/functions/__server.func/_ssr/tracking-DAwmUdjk.mjs
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
const statusColors = {
  pending: "bg-[var(--blush)] text-[var(--foreground)]",
  confirmed: "bg-[var(--sage)] text-[var(--foreground)]",
  shipped: "bg-[var(--sage-deep)] text-[var(--foreground)]",
  delivered: "bg-[var(--cream)] text-[var(--foreground)]",
  cancelled: "bg-[#f87171] text-white"
};
const statusOrder = ["pending", "confirmed", "shipped", "delivered"];
function AdminOrderTrackingPage() {
  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ["admin-tracking"],
    queryFn: getOrdersList
  });
  const [search, setSearch] = reactExports.useState("");
  const filtered = reactExports.useMemo(() => {
    if (!data) return [];
    const q = search.toLowerCase().trim();
    return data.filter((order) => {
      if (q && !order.id.toLowerCase().includes(q) && !order.user_email.toLowerCase().includes(q)) {
        return false;
      }
      return true;
    });
  }, [data, search]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm uppercase tracking-[0.25em] text-[var(--foreground)]/70", children: "Orders" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 text-4xl font-semibold text-[var(--foreground)]", children: "Order Tracking" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-[var(--foreground)]/70", children: [
        filtered.length,
        " order",
        filtered.length !== 1 ? "s" : ""
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--foreground)]/50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search by order ID or email...", value: search, onChange: (e) => setSearch(e.target.value), className: "pl-9" })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4", children: Array.from({
      length: 4
    }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-28 rounded-3xl bg-[var(--card)] shadow-soft" }, index)) }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-3xl bg-[var(--card)] p-6 text-sm text-[#f87171]", children: error instanceof Error ? error.message : "Could not load orders." }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center rounded-3xl bg-[var(--card)] p-12 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-medium text-[var(--foreground)]", children: "No orders found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-[var(--foreground)]/70", children: "Try a different search term." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4", children: filtered.map((order) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/orders/$id", params: {
      id: order.id
    }, className: "block rounded-3xl bg-[var(--card)] p-6 shadow-soft transition hover:shadow-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-[var(--foreground)]", children: [
              "#",
              order.id.slice(0, 8)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold", statusColors[order.status] ?? "bg-[var(--card)] text-[var(--foreground)]"), children: order.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-[var(--foreground)]/70", children: order.user_email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-[var(--foreground)]", children: [
            "₱",
            order.total_amount.toLocaleString("en-PH")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[var(--foreground)]/60", children: format(new Date(order.created_at), "MMM d, yyyy") })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-2 overflow-hidden rounded-full bg-[var(--background)]", children: statusOrder.map((s) => {
          const orderIdx = statusOrder.indexOf(order.status);
          const currentIdx = statusOrder.indexOf(s);
          const filled = currentIdx <= orderIdx && orderIdx >= 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex-1 transition-colors", currentIdx > 0 && "ml-0.5", filled ? "bg-[var(--sage-deep)]" : "bg-transparent", currentIdx === orderIdx && "bg-[var(--sage-deep)]") }, s);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 flex justify-between text-[10px] text-[var(--foreground)]/50", children: statusOrder.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize", children: s }, s)) })
      ] })
    ] }, order.id)) })
  ] });
}
export {
  AdminOrderTrackingPage as component
};
