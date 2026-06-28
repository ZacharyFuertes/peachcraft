import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { h as cn, B as Badge, f as createSsrRpc } from "./router-yrh6O6LQ.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-CgbbcQJd.mjs";
import { c as createServerFn } from "./server-COqVcV7o.mjs";
import "../_libs/seroval.mjs";
import { P as Package, f as ShoppingCart, D as DollarSign, u as TrendingUp, U as Users, v as Clock } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Bar, P as PieChart, b as Pie, c as Cell } from "../_libs/recharts.mjs";
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
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
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
const getDashboardData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("b6fc71d242071d137840a72f04ba960c612aa824c43b4cfe38cfc23bbd85efa6"));
const CATEGORY_COLORS = ["#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#e879f9", "#f472b6", "#fb7185", "#f87171"];
const statCardConfig = [{
  label: "Total Products",
  icon: Package,
  color: "bg-violet-500",
  key: "totalProducts",
  format: (v) => v.toLocaleString()
}, {
  label: "Total Orders",
  icon: ShoppingCart,
  color: "bg-blue-500",
  key: "totalOrders",
  format: (v) => v.toLocaleString()
}, {
  label: "Total Revenue",
  icon: DollarSign,
  color: "bg-emerald-500",
  key: "totalRevenue",
  format: (v) => `₱${v.toLocaleString()}`
}, {
  label: "Low Stock Items",
  icon: Package,
  color: "bg-orange-500",
  key: "lowStockCount",
  format: (v) => v.toLocaleString()
}];
function StatCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border bg-white p-5 shadow-sm animate-pulse", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-lg bg-gray-200" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-16 rounded bg-gray-200" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 h-8 w-28 rounded bg-gray-200" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-4 w-20 rounded bg-gray-200" })
  ] });
}
function ChartSkeleton({
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("rounded-xl border bg-white p-5 shadow-sm animate-pulse", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-36 rounded bg-gray-200 mb-2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-48 rounded bg-gray-200 mb-6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[200px] rounded bg-gray-100" })
  ] });
}
function AdminDashboard() {
  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: getDashboardData
  });
  const [sortKey, setSortKey] = reactExports.useState("sales");
  const [sortDir, setSortDir] = reactExports.useState("desc");
  const sortedProducts = data ? [...data.topProducts].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return sortDir === "asc" ? aVal - bVal : bVal - aVal;
  }) : [];
  function toggleSort(key) {
    if (sortKey === key) {
      setSortDir((d) => d === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-36 rounded bg-gray-200 animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 h-4 w-56 rounded bg-gray-200 animate-pulse" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: Array.from({
        length: 4
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatCardSkeleton, {}, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChartSkeleton, { className: "lg:col-span-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChartSkeleton, { className: "lg:col-span-2" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChartSkeleton, { className: "lg:col-span-2 h-[320px]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChartSkeleton, { className: "lg:col-span-3 h-[320px]" })
      ] })
    ] });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border bg-red-50 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-red-800", children: "Failed to load dashboard data" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-red-600", children: error instanceof Error ? error.message : "Unknown error" })
    ] });
  }
  const chartData = data.revenueByMonth.map((d) => ({
    name: d.month.slice(5),
    revenue: d.revenue
  }));
  const totalCatCount = data.categories.reduce((sum, c) => sum + c.count, 0);
  const activityIcons = {
    new_order: ShoppingCart,
    low_stock: Package,
    new_user: Users,
    payment: TrendingUp
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold text-gray-900", children: "Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "Your store overview at a glance" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: statCardConfig.map((cfg) => {
      const value = data[cfg.key];
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border bg-white p-5 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex h-10 w-10 items-center justify-center rounded-lg", cfg.color), children: /* @__PURE__ */ jsxRuntimeExports.jsx(cfg.icon, { className: "h-5 w-5 text-white" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-2xl font-bold text-gray-900", children: cfg.format(value) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-gray-500", children: cfg.label })
      ] }, cfg.label);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border bg-white p-5 shadow-sm lg:col-span-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-gray-900", children: "Sales Revenue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Monthly revenue (last 12 months)" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[280px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: chartData, barGap: 4, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#f0f0f0", vertical: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", tick: {
            fontSize: 12,
            fill: "#9ca3af"
          }, axisLine: false, tickLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: {
            fontSize: 12,
            fill: "#9ca3af"
          }, axisLine: false, tickLine: false, tickFormatter: (v) => `₱${(v / 1e3).toFixed(0)}k` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (value) => [`₱${value.toLocaleString()}`, "Revenue"], contentStyle: {
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            fontSize: "13px"
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "revenue", radius: [4, 4, 0, 0], fill: "#6366f1", maxBarSize: 40 })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border bg-white p-5 shadow-sm lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-gray-900", children: "Product Categories" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-4", children: "Category distribution" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-[200px] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data: data.categories.map((c, i) => ({
            ...c,
            color: CATEGORY_COLORS[i % CATEGORY_COLORS.length]
          })), cx: "50%", cy: "50%", innerRadius: 50, outerRadius: 80, paddingAngle: 3, dataKey: "count", nameKey: "name", children: data.categories.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: CATEGORY_COLORS[i % CATEGORY_COLORS.length] }, entry.name)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (value) => [`${value}`, "Products"] })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 space-y-2", children: data.categories.map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 w-2.5 rounded-full", style: {
              backgroundColor: CATEGORY_COLORS[i % CATEGORY_COLORS.length]
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-600", children: cat.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-900", children: cat.count }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-400", children: [
              "(",
              totalCatCount > 0 ? (cat.count / totalCatCount * 100).toFixed(0) : 0,
              "%)"
            ] })
          ] })
        ] }, cat.name)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border bg-white p-5 shadow-sm lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-gray-900", children: "Recent Activity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-4", children: "Latest store events" }),
        data.recentActivity.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: "No recent activity" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: data.recentActivity.map((activity, i) => {
          const Icon = activityIcons[activity.type] ?? ShoppingCart;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-gray-600" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-900 truncate", children: activity.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: cn("shrink-0 rounded-full border-0 px-2 py-0 text-[10px] font-medium", activity.badge.color), children: activity.badge.label })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 truncate", children: activity.subtitle }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-0.5 flex items-center gap-1 text-[10px] text-gray-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
                activity.time
              ] })
            ] })
          ] }, i);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border bg-white p-5 shadow-sm lg:col-span-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-gray-900", children: "Top Products" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-4", children: "Best selling products by revenue" }),
        data.topProducts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400", children: "No product sales data yet" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-[200px]", children: "Product" }),
            ["stocks", "price", "sales", "earnings"].map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "cursor-pointer hover:text-gray-900", onClick: () => toggleSort(key), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              key.charAt(0).toUpperCase() + key.slice(1),
              sortKey === key && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px]", children: sortDir === "asc" ? "▲" : "▼" })
            ] }) }, key))
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: sortedProducts.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              product.image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: product.image, alt: product.name, className: "h-9 w-9 rounded-md object-cover bg-gray-100" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-md bg-gray-100 text-gray-400 text-xs", children: "N/A" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-gray-900 truncate max-w-[140px]", children: product.name })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-gray-600", children: product.stocks }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-gray-600", children: [
              "₱",
              product.price.toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-gray-600", children: product.sales }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "font-medium text-gray-900", children: [
              "₱",
              product.earnings.toLocaleString()
            ] })
          ] }, product.id)) })
        ] })
      ] })
    ] })
  ] });
}
export {
  AdminDashboard as component
};
