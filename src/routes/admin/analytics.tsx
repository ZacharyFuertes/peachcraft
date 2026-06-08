import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { getAnalyticsData } from "@/lib/api/supabase.functions";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  pending: "#f0abfc",
  confirmed: "var(--sage)",
  shipped: "var(--sage-deep)",
  delivered: "var(--cream)",
  cancelled: "#f87171",
};

export const Route = createFileRoute("/admin/analytics")({
  component: AdminAnalyticsPage,
});

function AdminAnalyticsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: getAnalyticsData,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-32 rounded-3xl bg-[var(--card)] shadow-soft" />
          ))}
        </div>
        <div className="h-80 rounded-3xl bg-[var(--card)] shadow-soft" />
        <div className="h-80 rounded-3xl bg-[var(--card)] shadow-soft" />
        <div className="h-80 rounded-3xl bg-[var(--card)] shadow-soft" />
      </div>
    );
  }

  if (error) {
    return <p className="rounded-3xl bg-[var(--card)] p-6 text-sm text-[#f87171]">{error instanceof Error ? error.message : "Unable to load analytics."}</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-[var(--foreground)]/70">Analytics</p>
        <h1 className="mt-2 text-4xl font-semibold text-[var(--foreground)]">Sales performance</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <SummaryCard label="Total Revenue" value={`₱${data.allTimeRevenue.toLocaleString("en-PH")}`} />
        <SummaryCard label="Total Orders" value={`${data.allTimeOrderCount}`} />
        <SummaryCard label="Avg Order Value" value={`₱${data.avgOrderValue.toFixed(0).toLocaleString("en-PH")}`} />
      </div>

      <section className="rounded-3xl bg-[var(--card)] p-6 shadow-soft">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">Daily revenue (last 30 days)</h2>
        <div className="mt-6 h-[300px]">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.revenueSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(15, 23, 42, 0.08)" />
              <XAxis dataKey="date" tick={{ fill: "var(--foreground)" }} />
              <YAxis tick={{ fill: "var(--foreground)" }} />
              <Tooltip formatter={(value: number) => `₱${value.toLocaleString("en-PH")}`} />
              <Line type="monotone" dataKey="revenue" stroke="var(--sage-deep)" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="rounded-3xl bg-[var(--card)] p-6 shadow-soft">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">Order count by status</h2>
        <div className="mt-6 h-[300px]">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.statusSeries} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(15, 23, 42, 0.08)" />
              <XAxis type="number" tick={{ fill: "var(--foreground)" }} />
              <YAxis dataKey="status" type="category" tick={{ fill: "var(--foreground)" }} width={120} />
              <Tooltip formatter={(value: number) => `${value} orders`} />
              <Bar dataKey="count">
                {data.statusSeries.map((entry) => (
                  <Cell key={entry.status} fill={statusColors[entry.status] ?? "var(--sage)"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="rounded-3xl bg-[var(--card)] p-6 shadow-soft">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">Top 5 products by revenue</h2>
        <div className="mt-6 h-[300px]">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.topProducts} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(15, 23, 42, 0.08)" />
              <XAxis type="number" tick={{ fill: "var(--foreground)" }} />
              <YAxis dataKey="name" type="category" tick={{ fill: "var(--foreground)" }} width={150} />
              <Tooltip formatter={(value: number) => `₱${value.toLocaleString("en-PH")}`} />
              <Bar dataKey="revenue" fill="var(--blush)">
                {data.topProducts.map((entry) => (
                  <Cell key={entry.name} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-[var(--card)] p-6 shadow-soft">
      <p className="text-sm uppercase tracking-[0.18em] text-[var(--foreground)]/70">{label}</p>
      <p className="mt-4 text-3xl font-semibold text-[var(--foreground)]">{value}</p>
    </div>
  );
}
