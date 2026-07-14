import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { getSupabaseClient } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { getCustomerOrders, cancelCustomerOrder } from "@/lib/api/supabase.functions";
import { useCurrency } from "@/lib/currency-context";
import { Package, XCircle, ArrowLeft, Loader2, MapPin, ChevronDown, ChevronUp } from "lucide-react";

export const Route = createFileRoute("/orders")({
  component: OrdersPage,
});

type OrderItem = {
  product_id: string;
  name: string;
  image: string | null;
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

type TabKey = "active" | "arrived" | "cancelled";

const TABS: { key: TabKey; label: string; statuses: string[] }[] = [
  { key: "active", label: "On Shipping", statuses: ["pending", "confirmed", "shipped"] },
  { key: "arrived", label: "Arrived", statuses: ["delivered"] },
  { key: "cancelled", label: "Cancelled", statuses: ["cancelled"] },
];

const STATUS_PILL: Record<string, string> = {
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
  const [tab, setTab] = useState<TabKey>("active");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { loading: authLoading, session: authSession } = useAuth();

  useEffect(() => {
    if (authLoading) return;
    if (!authSession) {
      navigate({ to: "/login", search: { redirect: "/orders" } });
      return;
    }

    let mounted = true;
    setAccessToken(authSession.access_token);

    (async () => {
      try {
        const data = await getCustomerOrders({ data: { accessToken: authSession.access_token } });
        if (mounted) setOrders(data);
      } catch {
        // AbortError from StrictMode double-mount is expected
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, [authLoading, authSession, navigate]);

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

  const activeTab = TABS.find((t) => t.key === tab) ?? TABS[0];
  const visibleOrders = orders.filter((o) => activeTab.statuses.includes(o.status));

  function countForTab(key: TabKey) {
    const t = TABS.find((t) => t.key === key)!;
    return orders.filter((o) => t.statuses.includes(o.status)).length;
  }

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

        {/* Tab bar */}
        {orders.length > 0 && (
          <div className="flex gap-2 mb-8">
            {TABS.map((t) => {
              const count = countForTab(t.key);
              const active = t.key === tab;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    active
                      ? "bg-[var(--sage-deep)] text-white shadow-soft"
                      : "bg-[var(--card)] text-foreground/70 hover:text-foreground shadow-card"
                  }`}
                >
                  {t.label}
                  {count > 0 && (
                    <span
                      className={`inline-flex items-center justify-center min-w-[1.25rem] h-5 rounded-full px-1.5 text-[11px] font-bold ${
                        active ? "bg-white/20 text-white" : "bg-[var(--sage)]/20 text-[var(--sage-deep)]"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {visibleOrders.length === 0 ? (
          <div className="rounded-[var(--radius)] bg-[var(--card)] p-12 shadow-card text-center space-y-4">
            <Package className="w-12 h-12 mx-auto text-foreground/30" />
            <p className="text-foreground/60">
              {orders.length === 0 ? "No orders yet." : `No orders in "${activeTab.label}".`}
            </p>
            {orders.length === 0 && (
              <Link
                to="/shop"
                className="inline-flex rounded-full bg-[var(--sage)] px-6 py-2.5 text-sm font-semibold text-[var(--foreground)] shadow-soft hover:bg-[var(--sage-deep)]"
              >
                Start Shopping
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {visibleOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-[var(--radius)] bg-[var(--card)] p-6 shadow-card space-y-4"
              >
                {/* Order header */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--cream)] flex items-center justify-center shrink-0">
                      <Package className="w-5 h-5 text-foreground/50" />
                    </div>
                    <div>
                      <p className="text-xs text-foreground/50 font-mono font-semibold">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </p>
                      <p className="text-xs text-foreground/60 mt-0.5">
                        {new Date(order.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-block rounded-full border px-3 py-0.5 text-xs font-semibold ${
                      STATUS_PILL[order.status] ?? "bg-gray-50 text-gray-700 border-gray-200"
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>

                {/* Order items */}
                <div className="divide-y divide-[var(--border)]/50">
                  {order.items.map((item) => (
                    <div key={item.product_id} className="flex items-center justify-between py-2.5 text-sm">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 rounded-lg bg-[var(--cream)] overflow-hidden flex items-center justify-center shrink-0">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <Package className="w-5 h-5 text-foreground/30" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-foreground truncate">{item.name}</p>
                          <p className="text-xs text-foreground/60">Qty: {item.qty}</p>
                        </div>
                      </div>
                      <span className="shrink-0 ml-4 text-foreground font-medium">
                        {formatPrice(item.price_at_purchase * item.qty)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Route tracker — On Shipping orders only */}
                {["pending", "confirmed", "shipped"].includes(order.status) && order.shipping_address && (
                  <div className="bg-[var(--cream)] rounded-xl p-4 flex items-start gap-4">
                    <div className="flex flex-col items-center gap-1 shrink-0">
                      <div className="w-3 h-3 rounded-full bg-[var(--sage-deep)] shrink-0" />
                      <div className="w-0.5 h-8 bg-[var(--sage-deep)]/30" />
                      <div className="w-3 h-3 rounded-full bg-[var(--sage)] shrink-0" />
                    </div>
                    <div className="flex-1 min-w-0 flex justify-between gap-4 text-xs">
                      <div>
                        <p className="font-semibold text-foreground">Quezon City, Philippines</p>
                        <p className="text-foreground/50 mt-0.5">Origin</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">
                          {order.shipping_address.city ?? "—"}, {order.shipping_address.province ?? "—"}
                        </p>
                        <p className="text-foreground/50 mt-0.5">Destination</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer: total + details toggle */}
                <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]/50">
                  <button
                    type="button"
                    onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/60 hover:text-foreground transition-colors"
                  >
                    {expandedId === order.id ? (
                      <><ChevronUp className="w-3.5 h-3.5" /> Details</>
                    ) : (
                      <><ChevronDown className="w-3.5 h-3.5" /> Details</>
                    )}
                  </button>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-foreground/60">Total</span>
                    <span className="text-lg font-bold text-foreground">{formatPrice(order.total_amount)}</span>
                  </div>
                </div>

                {/* Expandable details */}
                {expandedId === order.id && (
                  <div className="rounded-xl bg-[var(--cream)] p-4 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-foreground/50">Order date</span>
                      <span className="font-medium text-foreground">
                        {new Date(order.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/50">Payment</span>
                      <span className="font-medium text-foreground">
                        {order.payment_method === "gcash" ? "GCash" : "Cash on Delivery"}
                      </span>
                    </div>
                    {order.shipping_address && (
                      <div className="flex justify-between">
                        <span className="text-foreground/50">Shipping address</span>
                        <span className="font-medium text-foreground text-right max-w-[60%]">
                          {[
                            order.shipping_address.street,
                            order.shipping_address.city,
                            order.shipping_address.province,
                            order.shipping_address.zip,
                          ]
                            .filter(Boolean)
                            .join(", ")}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Cancel button — pending only */}
                {order.status === "pending" && (
                  <div>
                    {confirmId === order.id ? (
                      <div className="flex items-center gap-3 rounded-xl bg-red-50 p-3">
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
