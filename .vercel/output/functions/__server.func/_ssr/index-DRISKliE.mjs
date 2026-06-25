import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { d as cn, i as getAdminDashboardData } from "./router-C4B3aEDs.mjs";
import "../_libs/seroval.mjs";
import { f as formatDistanceToNowStrict } from "../_libs/date-fns.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/lucide-react.mjs";
import "../_libs/zod.mjs";
const statusColors = {
  pending: "bg-[var(--blush)] text-[var(--foreground)]",
  confirmed: "bg-[var(--sage)] text-[var(--foreground)]",
  shipped: "bg-[var(--sage-deep)] text-[var(--foreground)]",
  delivered: "bg-[var(--cream)] text-[var(--foreground)]",
  cancelled: "bg-[#f87171] text-[var(--foreground)]"
};
function AdminDashboard() {
  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: getAdminDashboardData
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-4", children: Array.from({
        length: 4
      }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-40 rounded-3xl bg-[var(--card)] shadow-soft" }, index)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-72 rounded-3xl bg-[var(--card)] shadow-soft" })
    ] });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-3xl bg-[var(--card)] p-6 text-sm text-[#f87171]", children: error instanceof Error ? error.message : "Could not load dashboard data." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm uppercase tracking-[0.25em] text-[var(--foreground)]/70", children: "Admin dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 text-4xl font-semibold text-[var(--foreground)]", children: "Overview" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/shop", target: "_blank", rel: "noreferrer", className: "inline-flex items-center justify-center rounded-full bg-[var(--sage)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] shadow-soft transition hover:bg-[var(--sage-deep)]", children: "Preview store" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { label: "Today's Revenue", value: `₱${data?.todaysRevenue.toLocaleString("en-PH") ?? "0"}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { label: "Today's Orders", value: `${data?.todaysOrders ?? 0}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { label: "Pending Orders", value: `${data?.pendingOrders ?? 0}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { label: "Low Stock", value: `${data?.lowStock.length ?? 0}` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 xl:grid-cols-[1.2fr_0.8fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-[var(--card)] p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 flex items-center justify-between gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-[var(--foreground)]", children: "Recent orders" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[var(--foreground)]/70", children: "Latest 5 placed orders" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-3xl border border-[var(--border)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[var(--background)] text-[var(--foreground)]/75", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-4", children: "Order" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-4", children: "Customer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-4", children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-4", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-4", children: "Placed" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: data?.recentOrders.map((order) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-[var(--border)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 font-semibold text-[var(--foreground)]", children: order.id.slice(0, 8) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 text-[var(--foreground)]/80", children: order.user_email }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-4 text-[var(--foreground)]", children: [
              "₱",
              order.total_amount.toLocaleString("en-PH")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold", statusColors[order.status] ?? "bg-[var(--card)] text-[var(--foreground)]"), children: order.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 text-[var(--foreground)]/80", children: formatDistanceToNowStrict(new Date(order.created_at), {
              addSuffix: true
            }) })
          ] }, order.id)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-[var(--card)] p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-[var(--foreground)]", children: "Low stock" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[var(--foreground)]/70", children: "Products selling out soon" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: data?.lowStock.length ? data.lowStock.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl bg-[var(--blush)]/20 p-4 shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-[var(--foreground)]", children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-[var(--blush)] px-3 py-1 text-xs font-semibold text-[var(--foreground)]", children: [
            product.stock_qty ?? 0,
            " left"
          ] })
        ] }) }, product.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[var(--foreground)]/70", children: "No products are low on stock." }) })
      ] })
    ] })
  ] });
}
function Card({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-[var(--card)] p-6 shadow-soft", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm uppercase tracking-[0.18em] text-[var(--foreground)]/70", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-3xl font-semibold text-[var(--foreground)]", children: value })
  ] });
}
export {
  AdminDashboard as component
};
