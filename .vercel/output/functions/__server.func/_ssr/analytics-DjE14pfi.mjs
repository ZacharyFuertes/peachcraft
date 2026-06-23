import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { k as getAnalyticsData } from "./router-ChcEy1hy.mjs";
import "../_libs/seroval.mjs";
import { R as ResponsiveContainer, L as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Line, B as BarChart, b as Bar, c as Cell } from "../_libs/recharts.mjs";
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
import "./server-BjK0EJpJ.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/lucide-react.mjs";
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
  confirmed: "var(--sage)",
  shipped: "var(--sage-deep)",
  delivered: "var(--cream)",
  cancelled: "#f87171"
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-3", children: Array.from({
        length: 3
      }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-32 rounded-3xl bg-[var(--card)] shadow-soft" }, index)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-80 rounded-3xl bg-[var(--card)] shadow-soft" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-80 rounded-3xl bg-[var(--card)] shadow-soft" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-80 rounded-3xl bg-[var(--card)] shadow-soft" })
    ] });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-3xl bg-[var(--card)] p-6 text-sm text-[#f87171]", children: error instanceof Error ? error.message : "Unable to load analytics." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm uppercase tracking-[0.25em] text-[var(--foreground)]/70", children: "Analytics" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 text-4xl font-semibold text-[var(--foreground)]", children: "Sales performance" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryCard, { label: "Total Revenue", value: `₱${data.allTimeRevenue.toLocaleString("en-PH")}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryCard, { label: "Total Orders", value: `${data.allTimeOrderCount}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryCard, { label: "Avg Order Value", value: `₱${data.avgOrderValue.toFixed(0).toLocaleString("en-PH")}` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-[var(--card)] p-6 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-[var(--foreground)]", children: "Daily revenue (last 30 days)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 h-[300px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: data.revenueSeries, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "rgba(15, 23, 42, 0.08)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "date", tick: {
          fill: "var(--foreground)"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: {
          fill: "var(--foreground)"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (value) => `₱${value.toLocaleString("en-PH")}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "revenue", stroke: "var(--sage-deep)", strokeWidth: 3, dot: false })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-[var(--card)] p-6 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-[var(--foreground)]", children: "Order count by status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 h-[300px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: data.statusSeries, layout: "vertical", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "rgba(15, 23, 42, 0.08)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { type: "number", tick: {
          fill: "var(--foreground)"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { dataKey: "status", type: "category", tick: {
          fill: "var(--foreground)"
        }, width: 120 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (value) => `${value} orders` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "count", children: data.statusSeries.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: statusColors[entry.status] ?? "var(--sage)" }, entry.status)) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-[var(--card)] p-6 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-[var(--foreground)]", children: "Top 5 products by revenue" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 h-[300px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: data.topProducts, layout: "vertical", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "rgba(15, 23, 42, 0.08)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { type: "number", tick: {
          fill: "var(--foreground)"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { dataKey: "name", type: "category", tick: {
          fill: "var(--foreground)"
        }, width: 150 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (value) => `₱${value.toLocaleString("en-PH")}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "revenue", fill: "var(--blush)", children: data.topProducts.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, {}, entry.name)) })
      ] }) }) })
    ] })
  ] });
}
function SummaryCard({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-[var(--card)] p-6 shadow-soft", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm uppercase tracking-[0.18em] text-[var(--foreground)]/70", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-3xl font-semibold text-[var(--foreground)]", children: value })
  ] });
}
export {
  AdminAnalyticsPage as component
};
