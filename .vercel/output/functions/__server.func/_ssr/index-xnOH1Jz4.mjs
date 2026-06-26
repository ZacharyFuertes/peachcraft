import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as getSupabaseClient } from "./supabase-B6oNw5MC.mjs";
import { d as cn, p as getOrdersList } from "./router-BoccmxA6.mjs";
import "../_libs/seroval.mjs";
import { a as format } from "../_libs/date-fns.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./server-DGfOajJg.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/zod.mjs";
const statuses = ["all", "pending", "confirmed", "shipped", "delivered", "cancelled"];
const statusColors = {
  pending: "bg-[var(--blush)] text-[var(--foreground)]",
  confirmed: "bg-[var(--sage)] text-[var(--foreground)]",
  shipped: "bg-[var(--sage-deep)] text-[var(--foreground)]",
  delivered: "bg-[var(--cream)] text-[var(--foreground)]",
  cancelled: "bg-[#f87171] text-[var(--foreground)]"
};
function AdminOrdersPage() {
  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: getOrdersList
  });
  const [filter, setFilter] = reactExports.useState("all");
  const [newOrderMessage, setNewOrderMessage] = reactExports.useState(null);
  const [orders, setOrders] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);
  reactExports.useEffect(() => {
    const supabase = getSupabaseClient();
    const channel = supabase.channel("orders").on("postgres_changes", {
      event: "INSERT",
      schema: "public",
      table: "orders"
    }, (payload) => {
      const newOrder = payload.new;
      setOrders((current) => [{
        id: newOrder.id,
        user_email: newOrder.user_email,
        total_amount: newOrder.total_amount,
        status: newOrder.status,
        created_at: newOrder.created_at
      }, ...current]);
      setNewOrderMessage(`New order ${newOrder.id.slice(0, 8)} received!`);
      window.setTimeout(() => setNewOrderMessage(null), 5e3);
    }).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  const filteredOrders = reactExports.useMemo(() => {
    if (filter === "all") return orders;
    return orders.filter((order) => order.status === filter);
  }, [filter, orders]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm uppercase tracking-[0.25em] text-[var(--foreground)]/70", children: "Orders" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 text-4xl font-semibold text-[var(--foreground)]", children: "Order management" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-[var(--foreground)]/70", children: [
        "Total ",
        orders.length,
        " orders"
      ] })
    ] }) }),
    newOrderMessage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl bg-[var(--sage)]/10 p-4 text-sm text-[var(--foreground)]", children: newOrderMessage }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: statuses.map((status) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setFilter(status), className: cn("rounded-full px-4 py-2 text-sm font-semibold transition", filter === status ? "bg-[var(--sage)] text-[var(--foreground)]" : "bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--foreground)]/10"), children: status.charAt(0).toUpperCase() + status.slice(1) }, status)) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4", children: Array.from({
      length: 5
    }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 rounded-3xl bg-[var(--card)] shadow-soft" }, index)) }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-3xl bg-[var(--card)] p-6 text-sm text-[#f87171]", children: error instanceof Error ? error.message : "Could not load orders." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[var(--background)] text-[var(--foreground)]/75", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-4", children: "Order" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-4", children: "Customer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-4", children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-4", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-4", children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-4", children: "View" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filteredOrders.map((order) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-[var(--border)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 font-semibold text-[var(--foreground)]", children: order.id.slice(0, 8) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 text-[var(--foreground)]/80", children: order.user_email }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-4 text-[var(--foreground)]", children: [
          "₱",
          order.total_amount.toLocaleString("en-PH")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold", statusColors[order.status] ?? "bg-[var(--card)] text-[var(--foreground)]"), children: order.status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 text-[var(--foreground)]/80", children: format(new Date(order.created_at), "MMM d, yyyy") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/admin/orders/${order.id}`, className: "inline-flex rounded-full bg-[var(--background)] px-3 py-2 text-xs font-semibold text-[var(--foreground)] shadow-soft hover:bg-[var(--foreground)]/10", children: "View" }) })
      ] }, order.id)) })
    ] }) })
  ] });
}
export {
  AdminOrdersPage as component
};
