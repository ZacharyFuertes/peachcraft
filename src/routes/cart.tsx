import { ArrowRight, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { useCurrency } from "@/lib/currency-context";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

function CartPage() {
  const navigate = useNavigate();
  const { items, itemCount, subtotal, updateQuantity, removeItem, clear } = useCart();
  const { formatPrice } = useCurrency();
  const { user: authUser } = useAuth();
  const userEmail = authUser?.email ?? null;

  const shippingFee = 150;
  const taxAmount = 0;
  const totalAmount = subtotal + shippingFee + taxAmount;

  return (
    <section className="bg-cream py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Your bag</span>
            <h1 className="mt-3 font-display text-5xl text-brown">Shopping cart</h1>
            <p className="mt-2 text-foreground/75">Review your selected crafts, update quantities, and continue to checkout.</p>
          </div>
          <div className="rounded-3xl bg-[var(--card)] p-4 shadow-soft">
            <p className="text-sm text-[var(--foreground)]/70">Items in cart</p>
            <p className="mt-1 text-2xl font-semibold text-[var(--foreground)]">{itemCount}</p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="rounded-3xl bg-[var(--card)] p-10 text-center shadow-soft">
            <p className="text-lg font-semibold text-[var(--foreground)]">Your cart is empty.</p>
            <p className="mt-2 text-sm text-[var(--foreground)]/75">Add some Peach Craft favorites before checking out.</p>
            <Link
              to="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Shop crafts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.6fr_0.9fr]">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product_id} className="rounded-3xl bg-[var(--card)] p-6 shadow-soft">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="h-28 w-28 overflow-hidden rounded-3xl bg-[var(--background)]">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        ) : null}
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-[var(--foreground)]">{item.name}</h2>
                        <p className="mt-2 text-sm text-[var(--foreground)]/80">{formatPrice(item.price)}</p>
                        {item.stock_qty != null ? (
                          <p className="mt-3 text-sm text-[var(--foreground)]/70">{item.stock_qty} left in stock</p>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className="inline-flex items-center gap-3 rounded-full border border-[var(--border)] bg-background px-3 py-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product_id, item.qty - 1)}
                          aria-label={`Decrease quantity for ${item.name}`}
                          className="grid place-items-center h-9 w-9 rounded-full bg-[var(--card)] text-[var(--foreground)] shadow-soft"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <span className="min-w-[2rem] text-center text-sm font-semibold text-[var(--foreground)]">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product_id, item.qty + 1)}
                          aria-label={`Increase quantity for ${item.name}`}
                          className="grid place-items-center h-9 w-9 rounded-full bg-[var(--card)] text-[var(--foreground)] shadow-soft"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.product_id)}
                        className="inline-flex items-center gap-2 rounded-full border border-[#f3d1d8] bg-[#fff1f4] px-4 py-2 text-sm font-semibold text-[#c24151] hover:bg-[#ffe3ec]"
                      >
                        <Trash2 className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="space-y-6 rounded-3xl bg-[var(--card)] p-6 shadow-soft">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-[var(--foreground)]/70">Order summary</p>
                <div className="mt-5 space-y-3 text-sm text-[var(--foreground)]">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Shipping</span>
                    <span>{formatPrice(shippingFee)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Tax</span>
                    <span>{formatPrice(taxAmount)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-[var(--border)] pt-5 text-lg font-semibold text-[var(--foreground)]">
                <span>Total</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>

              {!userEmail ? (
                <div className="text-center pt-2">
                  <p className="text-xs text-[var(--foreground)]/75 mb-2">Please sign in to place your order</p>
                  <button
                    type="button"
                    onClick={() => navigate({ to: "/login", search: { redirect: "/checkout" } })}
                    className="w-full rounded-full border border-primary bg-background px-5 py-3 text-sm font-semibold text-primary hover:bg-primary/5 transition-all"
                  >
                    Sign in to checkout
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate({ to: "/checkout" })}
                  className="w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:bg-primary/90"
                >
                  Proceed to checkout
                </button>
              )}

              <button
                type="button"
                onClick={clear}
                className="w-full rounded-full border border-[var(--border)] bg-background px-5 py-3 text-sm font-semibold text-[var(--foreground)] hover:bg-accent"
              >
                Empty cart
              </button>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
