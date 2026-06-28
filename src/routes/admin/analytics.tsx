import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { getAnalyticsData, type AnalyticsData } from "@/lib/api/supabase.functions";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const statusColors: Record<string, string> = {
  pending: "#f0abfc",
  confirmed: "#4a7c59",
  shipped: "#2d5a3d",
  delivered: "#d4a76a",
  cancelled: "#f87171",
};

const catChartColors = ["#4a7c59", "#2d5a3d", "#d4a76a", "#f0abfc", "#f87171", "#94a3b8"];

function formatDateLabel(label: string): string {
  const d = new Date(label + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatMonthLabel(label: string): string {
  const d = new Date(label + "-01T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
}

function TrendBadge({ current, previous, reverse }: { current: number; previous: number; reverse?: boolean }) {
  if (previous === 0) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-[var(--foreground)]/50">
        <Minus className="size-3" /> —
      </span>
    );
  }
  const pct = ((current - previous) / previous) * 100;
  const isUp = pct > 0;
  const isDown = pct < 0;
  const positive = reverse ? isDown : isUp;
  const negative = reverse ? isUp : isDown;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs font-medium",
        positive && "text-emerald-600",
        negative && "text-red-500",
        !positive && !negative && "text-[var(--foreground)]/50",
      )}
    >
      {positive ? <TrendingUp className="size-3" /> : negative ? <TrendingDown className="size-3" /> : <Minus className="size-3" />}
      {Math.abs(pct).toFixed(1)}%
    </span>
  );
}

const CustomTooltip = ({ active, payload, label, format = "currency" }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border bg-white p-3 shadow-lg">
      <p className="mb-1 text-xs text-gray-500">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-sm font-semibold" style={{ color: entry.color }}>
          {entry.name}: {format === "currency" ? `₱${Number(entry.value).toLocaleString("en-PH")}` : entry.value}
        </p>
      ))}
    </div>
  );
};

export const Route = createFileRoute("/admin/analytics")({
  component: AdminAnalyticsPage,
});

function AdminAnalyticsPage() {
  const { data, isLoading, error } = useQuery<AnalyticsData>({
    queryKey: ["admin-analytics"],
    queryFn: getAnalyticsData,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-28 rounded-xl bg-white shadow-sm" />
          ))}
        </div>
        <div className="h-80 rounded-xl bg-white shadow-sm" />
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="h-72 rounded-xl bg-white shadow-sm" />
          <div className="h-72 rounded-xl bg-white shadow-sm" />
        </div>
        <div className="h-64 rounded-xl bg-white shadow-sm" />
        <div className="h-64 rounded-xl bg-white shadow-sm" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="rounded-xl bg-red-50 p-6 text-sm text-red-600">
        {error instanceof Error ? error.message : "Unable to load analytics."}
      </p>
    );
  }

  if (!data) return null;

  const hasStatusData = data.statusSeries.length > 0;
  const hasCategoryData = data.categoryRevenue.length > 0;
  const hasProducts = data.topProducts.length > 0;
  const hasCustomerGrowth = data.customerGrowth.some((m) => m.count > 0);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-gray-500">Analytics</p>
        <h1 className="mt-1 text-3xl font-semibold text-gray-900">Sales performance</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <SummaryCard
          label="Total Revenue"
          value={`₱${data.allTimeRevenue.toLocaleString("en-PH")}`}
          trend={<TrendBadge current={data.revenueThisMonth} previous={data.revenueLastMonth} />}
        />
        <SummaryCard
          label="Revenue (This Month)"
          value={`₱${data.revenueThisMonth.toLocaleString("en-PH")}`}
          trend={<TrendBadge current={data.revenueThisMonth} previous={data.revenueLastMonth} />}
        />
        <SummaryCard
          label="Total Orders"
          value={data.allTimeOrderCount.toLocaleString("en-PH")}
          trend={<TrendBadge current={data.ordersThisMonth} previous={data.ordersLastMonth} />}
        />
        <SummaryCard
          label="Avg Order Value"
          value={`₱${Math.round(data.avgOrderValue).toLocaleString("en-PH")}`}
        />
        <SummaryCard
          label="New Customers"
          value={data.newCustomersThisMonth.toLocaleString("en-PH")}
          trend={<TrendBadge current={data.newCustomersThisMonth} previous={data.newCustomersLastMonth} />}
        />
        <SummaryCard
          label="Low Stock Items"
          value={data.lowStockCount.toLocaleString("en-PH")}
          trend={data.lowStockCount > 0 ? <span className="text-xs font-medium text-red-500">{data.lowStockCount} need attention</span> : undefined}
        />
      </div>

      {/* Revenue Area Chart */}
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Daily revenue</h2>
            <p className="text-sm text-gray-500">Last 30 days</p>
          </div>
        </div>
        <div className="mt-4 h-[280px]">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={data.revenueSeries}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4a7c59" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#4a7c59" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDateLabel}
                tick={{ fill: "#6b7280", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fill: "#6b7280", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₱${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#4a7c59"
                strokeWidth={2}
                fill="url(#revenueGradient)"
                dot={false}
                activeDot={{ r: 4, fill: "#4a7c59", stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Two-column: Status Donut + Category Revenue */}
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Order status</h2>
          <p className="text-sm text-gray-500">Distribution (last 30 days)</p>
          {hasStatusData ? (
            <div className="mt-4 flex items-center gap-6">
              <div className="h-[220px] w-[220px] shrink-0">
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={data.statusSeries}
                      dataKey="count"
                      nameKey="status"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={90}
                      paddingAngle={3}
                    >
                      {data.statusSeries.map((entry) => (
                        <Cell key={entry.status} fill={statusColors[entry.status] ?? "#94a3b8"} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `${value} orders`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col gap-2">
                {data.statusSeries.map((entry) => (
                  <div key={entry.status} className="flex items-center gap-2 text-sm">
                    <span
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: statusColors[entry.status] ?? "#94a3b8" }}
                    />
                    <span className="w-20 capitalize text-gray-600">{entry.status}</span>
                    <span className="font-semibold text-gray-900">{entry.count}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="mt-6 text-sm text-gray-400">No orders in the last 30 days.</p>
          )}
        </section>

        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Revenue by category</h2>
          <p className="text-sm text-gray-500">All time</p>
          {hasCategoryData ? (
            <div className="mt-4 h-[220px]">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={data.categoryRevenue} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                  <XAxis type="number" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₱${(v / 1000).toFixed(0)}k`} />
                  <YAxis dataKey="name" type="category" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} width={100} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
                    {data.categoryRevenue.map((_, i) => (
                      <Cell key={i} fill={catChartColors[i % catChartColors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="mt-6 text-sm text-gray-400">No category data yet.</p>
          )}
        </section>
      </div>

      {/* Top Products */}
      <section className="rounded-xl border bg-white shadow-sm">
        <div className="border-b border-gray-100 p-6 pb-4">
          <h2 className="text-lg font-semibold text-gray-900">Top products</h2>
          <p className="text-sm text-gray-500">Best sellers by revenue</p>
        </div>
        {hasProducts ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-3 font-medium">#</th>
                  <th className="px-6 py-3 font-medium">Product</th>
                  <th className="px-6 py-3 font-medium text-right">Units Sold</th>
                  <th className="px-6 py-3 font-medium text-right">Revenue</th>
                  <th className="px-6 py-3 font-medium text-right">Share</th>
                </tr>
              </thead>
              <tbody>
                {data.topProducts.map((product, i) => {
                  const share = data.allTimeRevenue > 0 ? ((product.revenue / data.allTimeRevenue) * 100).toFixed(1) : "0";
                  return (
                    <tr key={product.name} className="border-b border-gray-50 last:border-0">
                      <td className="px-6 py-4 text-gray-400">{i + 1}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                      <td className="px-6 py-4 text-right text-gray-600">{product.sales}</td>
                      <td className="px-6 py-4 text-right font-semibold text-gray-900">₱{product.revenue.toLocaleString("en-PH")}</td>
                      <td className="px-6 py-4 text-right">
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">{share}%</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 text-sm text-gray-400">No sales data yet.</div>
        )}
      </section>

      {/* Customer Growth */}
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Customer growth</h2>
        <p className="text-sm text-gray-500">New customers per month (last 12 months)</p>
        {hasCustomerGrowth ? (
          <div className="mt-4 h-[220px]">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={data.customerGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tickFormatter={formatMonthLabel} tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
                <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip format="number" />} labelFormatter={formatMonthLabel} />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#4a7c59"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#4a7c59", stroke: "#fff", strokeWidth: 2 }}
                  activeDot={{ r: 5, fill: "#4a7c59", stroke: "#fff", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="mt-6 text-sm text-gray-400">No customer data yet.</p>
        )}
      </section>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <p className="text-xs uppercase tracking-wider text-gray-500">{label}</p>
      <p className="mt-1 text-xl font-semibold text-gray-900">{value}</p>
      {trend && <div className="mt-1">{trend}</div>}
    </div>
  );
}
