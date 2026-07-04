import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { h as cn, l as getAnalyticsData } from "./router-D98JWfRI.mjs";
import "../_libs/seroval.mjs";
import { R as ResponsiveContainer, A as AreaChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, d as Area, P as PieChart, b as Pie, c as Cell, B as BarChart, a as Bar, L as LineChart, e as Line } from "../_libs/recharts.mjs";
import { x as Minus, u as TrendingUp, J as TrendingDown } from "../_libs/lucide-react.mjs";
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
import "./server-BWmwJzJ_.mjs";
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
import "../_libs/lodash.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
const statusColors = {
  pending: "#f0abfc",
  confirmed: "#4a7c59",
  shipped: "#2d5a3d",
  delivered: "#d4a76a",
  cancelled: "#f87171"
};
const catChartColors = ["#4a7c59", "#2d5a3d", "#d4a76a", "#f0abfc", "#f87171", "#94a3b8"];
function formatDateLabel(label) {
  const d = /* @__PURE__ */ new Date(label + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });
}
function formatMonthLabel(label) {
  const d = /* @__PURE__ */ new Date(label + "-01T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    year: "2-digit"
  });
}
function TrendBadge({
  current,
  previous,
  reverse
}) {
  if (previous === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-[var(--foreground)]/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "size-3" }),
      " —"
    ] });
  }
  const pct = (current - previous) / previous * 100;
  const isUp = pct > 0;
  const isDown = pct < 0;
  const positive = reverse ? isDown : isUp;
  const negative = reverse ? isUp : isDown;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("inline-flex items-center gap-1 text-xs font-medium", positive && "text-emerald-600", negative && "text-red-500", !positive && !negative && "text-[var(--foreground)]/50"), children: [
    positive ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "size-3" }) : negative ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "size-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "size-3" }),
    Math.abs(pct).toFixed(1),
    "%"
  ] });
}
const CustomTooltip = ({
  active,
  payload,
  label,
  format = "currency"
}) => {
  if (!active || !payload?.length) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border bg-white p-3 shadow-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1 text-xs text-gray-500", children: label }),
    payload.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold", style: {
      color: entry.color
    }, children: [
      entry.name,
      ": ",
      format === "currency" ? `₱${Number(entry.value).toLocaleString("en-PH")}` : entry.value
    ] }, i))
  ] });
};
function AdminAnalyticsPage() {
  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: getAnalyticsData
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6", children: Array.from({
        length: 6
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-28 rounded-xl bg-white shadow-sm" }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-80 rounded-xl bg-white shadow-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-72 rounded-xl bg-white shadow-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-72 rounded-xl bg-white shadow-sm" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 rounded-xl bg-white shadow-sm" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 rounded-xl bg-white shadow-sm" })
    ] });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-xl bg-red-50 p-6 text-sm text-red-600", children: error instanceof Error ? error.message : "Unable to load analytics." });
  }
  if (!data) return null;
  const hasStatusData = data.statusSeries.length > 0;
  const hasCategoryData = data.categoryRevenue.length > 0;
  const hasProducts = data.topProducts.length > 0;
  const hasCustomerGrowth = data.customerGrowth.some((m) => m.count > 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm uppercase tracking-[0.25em] text-gray-500", children: "Analytics" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1 text-3xl font-semibold text-gray-900", children: "Sales performance" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryCard, { label: "Total Revenue", value: `₱${data.allTimeRevenue.toLocaleString("en-PH")}`, trend: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendBadge, { current: data.revenueThisMonth, previous: data.revenueLastMonth }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryCard, { label: "Revenue (This Month)", value: `₱${data.revenueThisMonth.toLocaleString("en-PH")}`, trend: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendBadge, { current: data.revenueThisMonth, previous: data.revenueLastMonth }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryCard, { label: "Total Orders", value: data.allTimeOrderCount.toLocaleString("en-PH"), trend: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendBadge, { current: data.ordersThisMonth, previous: data.ordersLastMonth }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryCard, { label: "Avg Order Value", value: `₱${Math.round(data.avgOrderValue).toLocaleString("en-PH")}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryCard, { label: "New Customers", value: data.newCustomersThisMonth.toLocaleString("en-PH"), trend: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendBadge, { current: data.newCustomersThisMonth, previous: data.newCustomersLastMonth }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryCard, { label: "Low Stock Items", value: data.lowStockCount.toLocaleString("en-PH"), trend: data.lowStockCount > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-red-500", children: [
        data.lowStockCount,
        " need attention"
      ] }) : void 0 })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border bg-white p-6 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "Daily revenue" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "Last 30 days" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 h-[280px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 280, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: data.revenueSeries, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "revenueGradient", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#4a7c59", stopOpacity: 0.25 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#4a7c59", stopOpacity: 0.02 })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e5e7eb" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "date", tickFormatter: formatDateLabel, tick: {
          fill: "#6b7280",
          fontSize: 11
        }, axisLine: false, tickLine: false, interval: "preserveStartEnd" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: {
          fill: "#6b7280",
          fontSize: 11
        }, axisLine: false, tickLine: false, tickFormatter: (v) => `₱${(v / 1e3).toFixed(0)}k` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(CustomTooltip, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "revenue", stroke: "#4a7c59", strokeWidth: 2, fill: "url(#revenueGradient)", dot: false, activeDot: {
          r: 4,
          fill: "#4a7c59",
          stroke: "#fff",
          strokeWidth: 2
        } })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border bg-white p-6 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "Order status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "Distribution (last 30 days)" }),
        hasStatusData ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[220px] w-[220px] shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data: data.statusSeries, dataKey: "count", nameKey: "status", cx: "50%", cy: "50%", innerRadius: 55, outerRadius: 90, paddingAngle: 3, children: data.statusSeries.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: statusColors[entry.status] ?? "#94a3b8" }, entry.status)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (value) => `${value} orders` })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: data.statusSeries.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2.5 shrink-0 rounded-full", style: {
              backgroundColor: statusColors[entry.status] ?? "#94a3b8"
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-20 capitalize text-gray-600", children: entry.status }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-gray-900", children: entry.count })
          ] }, entry.status)) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-sm text-gray-400", children: "No orders in the last 30 days." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border bg-white p-6 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "Revenue by category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "All time" }),
        hasCategoryData ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 h-[220px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: data.categoryRevenue, layout: "vertical", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e5e7eb", horizontal: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { type: "number", tick: {
            fill: "#6b7280",
            fontSize: 11
          }, axisLine: false, tickLine: false, tickFormatter: (v) => `₱${(v / 1e3).toFixed(0)}k` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { dataKey: "name", type: "category", tick: {
            fill: "#6b7280",
            fontSize: 11
          }, axisLine: false, tickLine: false, width: 100 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(CustomTooltip, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "revenue", radius: [0, 4, 4, 0], children: data.categoryRevenue.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: catChartColors[i % catChartColors.length] }, i)) })
        ] }) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-sm text-gray-400", children: "No category data yet." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border bg-white shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-gray-100 p-6 pb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "Top products" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "Best sellers by revenue" })
      ] }),
      hasProducts ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100 bg-gray-50 text-xs uppercase tracking-wider text-gray-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 font-medium", children: "#" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 font-medium", children: "Product" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 font-medium text-right", children: "Units Sold" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 font-medium text-right", children: "Revenue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 font-medium text-right", children: "Share" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: data.topProducts.map((product, i) => {
          const share = data.allTimeRevenue > 0 ? (product.revenue / data.allTimeRevenue * 100).toFixed(1) : "0";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-50 last:border-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-gray-400", children: i + 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 font-medium text-gray-900", children: product.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-right text-gray-600", children: product.sales }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-4 text-right font-semibold text-gray-900", children: [
              "₱",
              product.revenue.toLocaleString("en-PH")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700", children: [
              share,
              "%"
            ] }) })
          ] }, product.name);
        }) })
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 text-sm text-gray-400", children: "No sales data yet." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-xl border bg-white p-6 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "Customer growth" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "New customers per month (last 12 months)" }),
      hasCustomerGrowth ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 h-[220px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: data.customerGrowth, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e5e7eb" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "month", tickFormatter: formatMonthLabel, tick: {
          fill: "#6b7280",
          fontSize: 11
        }, axisLine: false, tickLine: false, interval: "preserveStartEnd" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: {
          fill: "#6b7280",
          fontSize: 11
        }, axisLine: false, tickLine: false, allowDecimals: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(CustomTooltip, { format: "number" }), labelFormatter: formatMonthLabel }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "count", stroke: "#4a7c59", strokeWidth: 2, dot: {
          r: 3,
          fill: "#4a7c59",
          stroke: "#fff",
          strokeWidth: 2
        }, activeDot: {
          r: 5,
          fill: "#4a7c59",
          stroke: "#fff",
          strokeWidth: 2
        } })
      ] }) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-sm text-gray-400", children: "No customer data yet." })
    ] })
  ] });
}
function SummaryCard({
  label,
  value,
  trend
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border bg-white p-4 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-gray-500", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xl font-semibold text-gray-900", children: value }),
    trend && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1", children: trend })
  ] });
}
export {
  AdminAnalyticsPage as component
};
