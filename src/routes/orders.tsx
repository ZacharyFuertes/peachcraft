import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { clearAuthCookies, getSupabaseClient } from "@/lib/supabase";
import { getCustomerOrders, cancelCustomerOrder } from "@/lib/api/supabase.functions";
import { useCurrency } from "@/lib/currency-context";
import { Package, XCircle, ArrowLeft, Loader2 } from "lucide-react";

export const Route = createFileRoute("/orders")({
  component: OrdersPage,
});

type OrderItem = {
  product_id: string;
  name: string;
  qty: number;
  price_at_purchase: number;
};

type Order = {
  id: string;
  status: string;
  total_amount: number;
  created_at: string;
  shipping_address: Record<string, string> | null;
  payment_method: string | null;
  items: OrderItem[];
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  shipped: "bg-purple-50 text-purple-700 border-purple-200",
  delivered: "bg-green-50 text-green-700 border-green-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

function OrdersPage() {
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const supabase = getSupabaseClient();

    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (!mounted) return;
        if (!session) {
          navigate({ to: "/login", search: { redirect: "/orders" } });
          return;
        }
        setAccessToken(session.access_token);

        getCustomerOrders({ data: { accessToken: session.access_token } })
          .then((data) => {
            if (mounted) setOrders(data);
          })
          .catch(() => {
            // AbortError from StrictMode double-mount is expected
          })
          .finally(() => {
            if (mounted) setLoading(false);
          });
      })
      .catch(() => {
        if (!mounted) return;
        const supabase = getSupabaseClient();
        supabase.auth.signOut();
        clearAuthCookies();
        navigate({ to: "/login" });
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  const handleCancel = async (orderId: string) => {
    setConfirmId(null);
    setCancellingId(orderId);
    try {
      await cancelCustomerOrder({ data: { orderId, accessToken: accessToken ?? undefined } });
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: "cancelled" } : o)),
      );
    } catch {
      // Error is handled silently — user can retry
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) {
    return (
      <section className="bg-cream py-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-foreground/40 mx-auto" />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-cream py-10 sm:py-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-foreground/60 hover:text-foreground">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <Package className="w-6 h-6 text-foreground/70" />
          <h1 className="text-3xl font-display text-[var(--foreground)]">My Orders</h1>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-[var(--radius)] bg-[var(--card)] p-12 shadow-card text-center space-y-4">
            <Package className="w-12 h-12 mx-auto text-foreground/30" />
            <p className="text-foreground/60">No orders yet.</p>
            <Link
              to="/shop"
              className="inline-flex rounded-full bg-[var(--sage)] px-6 py-2.5 text-sm font-semibold text-[var(--foreground)] shadow-soft hover:bg-[var(--sage-deep)]"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-[var(--radius)] bg-[var(--card)] p-6 shadow-card space-y-4"
              >
                {/* Order header */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-xs text-foreground/50 font-mono">
                      {order.id.slice(0, 8).toUpperCase()}
                    </p>
                    <p className="text-sm text-foreground/60">
                      {new Date(order.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-block rounded-full border px-3 py-0.5 text-xs font-semibold ${
                        STATUS_COLORS[order.status] ?? "bg-gray-50 text-gray-700 border-gray-200"
                      }`}
                    >
                      {STATUS_LABELS[order.status] ?? order.status}
                    </span>
                    <span className="text-lg font-semibold">{formatPrice(order.total_amount)}</span>
                  </div>
                </div>

                {/* Order items */}
                <div className="divide-y divide-border/50">
                  {order.items.map((item) => (
                    <div key={item.product_id} className="flex items-center justify-between py-2 text-sm">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                          <Package className="w-5 h-5 text-foreground/40" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium truncate">{item.name}</p>
                          <p className="text-xs text-foreground/60">Qty: {item.qty}</p>
                        </div>
                      </div>
                      <span className="shrink-0 ml-4">{formatPrice(item.price_at_purchase * item.qty)}</span>
                    </div>
                  ))}
                </div>

                {/* Cancel button */}
                {order.status === "pending" && (
                  <div className="pt-2">
                    {confirmId === order.id ? (
                      <div className="flex items-center gap-3 rounded-lg bg-red-50 p-3">
                        <p className="text-sm text-red-700 flex-1">Cancel this order?</p>
                        <button
                          type="button"
                          onClick={() => handleCancel(order.id)}
                          disabled={cancellingId === order.id}
                          className="rounded-full bg-red-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                        >
                          {cancellingId === order.id ? "Cancelling..." : "Yes, cancel"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmId(null)}
                          className="rounded-full border border-border bg-background px-4 py-1.5 text-xs font-semibold text-foreground hover:bg-muted"
                        >
                          Keep
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmId(order.id)}
                        className="inline-flex items-center gap-1.5 text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        <XCircle className="w-4 h-4" /> Cancel Order
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
