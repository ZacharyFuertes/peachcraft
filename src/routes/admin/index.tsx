import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { formatDistanceToNowStrict, format } from "date-fns";
import { getAdminDashboardData, type AdminDashboardData } from "@/lib/api/supabase.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

const statusColors: Record<string, string> = {
  pending: "bg-[var(--blush)] text-[var(--foreground)]",
  confirmed: "bg-[var(--sage)] text-[var(--foreground)]",
  shipped: "bg-[var(--sage-deep)] text-[var(--foreground)]",
  delivered: "bg-[var(--cream)] text-[var(--foreground)]",
  cancelled: "bg-[#f87171] text-[var(--foreground)]",
};

function AdminDashboard() {
  const { data, isLoading, error } = useQuery<AdminDashboardData>({
    queryKey: ["admin-dashboard"],
    queryFn: getAdminDashboardData,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-40 rounded-3xl bg-[var(--card)] shadow-soft" />
          ))}
        </div>
        <div className="h-72 rounded-3xl bg-[var(--card)] shadow-soft" />
      </div>
    );
  }

  if (error) {
    return <p className="rounded-3xl bg-[var(--card)] p-6 text-sm text-[#f87171]">{error instanceof Error ? error.message : "Could not load dashboard data."}</p>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-[var(--foreground)]/70">Admin dashboard</p>
          <h1 className="mt-2 text-4xl font-semibold text-[var(--foreground)]">Overview</h1>
        </div>

        <a
          href="/shop"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-[var(--sage)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] shadow-soft transition hover:bg-[var(--sage-deep)]"
        >
          Preview store
        </a>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card label="Today's Revenue" value={`₱${data?.todaysRevenue.toLocaleString("en-PH") ?? "0"}`} />
        <Card label="Today's Orders" value={`${data?.todaysOrders ?? 0}`} />
        <Card label="Pending Orders" value={`${data?.pendingOrders ?? 0}`} />
        <Card label="Low Stock" value={`${data?.lowStock.length ?? 0}`} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-3xl bg-[var(--card)] p-6 shadow-soft">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-[var(--foreground)]">Recent orders</h2>
              <p className="text-sm text-[var(--foreground)]/70">Latest 5 placed orders</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-[var(--border)]">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--background)] text-[var(--foreground)]/75">
                <tr>
                  <th className="px-5 py-4">Order</th>
                  <th className="px-5 py-4">Customer</th>
                  <th className="px-5 py-4">Total</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Placed</th>
                </tr>
              </thead>
              <tbody>
                {data?.recentOrders.map((order) => (
                  <tr key={order.id} className="border-t border-[var(--border)]">
                    <td className="px-5 py-4 font-semibold text-[var(--foreground)]">{order.id.slice(0, 8)}</td>
                    <td className="px-5 py-4 text-[var(--foreground)]/80">{order.user_email}</td>
                    <td className="px-5 py-4 text-[var(--foreground)]">₱{order.total_amount.toLocaleString("en-PH")}</td>
                    <td className="px-5 py-4">
                      <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold", statusColors[order.status] ?? "bg-[var(--card)] text-[var(--foreground)]")}>{order.status}</span>
                    </td>
                    <td className="px-5 py-4 text-[var(--foreground)]/80">{formatDistanceToNowStrict(new Date(order.created_at), { addSuffix: true })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-3xl bg-[var(--card)] p-6 shadow-soft">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-[var(--foreground)]">Low stock</h2>
            <p className="text-sm text-[var(--foreground)]/70">Products selling out soon</p>
          </div>
          <div className="space-y-3">
            {data?.lowStock.length ? (
              data.lowStock.map((product) => (
                <div key={product.id} className="rounded-3xl bg-[var(--blush)]/20 p-4 shadow-soft">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-[var(--foreground)]">{product.name}</p>
                    <span className="rounded-full bg-[var(--blush)] px-3 py-1 text-xs font-semibold text-[var(--foreground)]">{product.stock_qty ?? 0} left</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-[var(--foreground)]/70">No products are low on stock.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-[var(--card)] p-6 shadow-soft">
      <p className="text-sm uppercase tracking-[0.18em] text-[var(--foreground)]/70">{label}</p>
      <p className="mt-4 text-3xl font-semibold text-[var(--foreground)]">{value}</p>
    </div>
  );
}
