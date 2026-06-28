import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { createOrder, getUserActiveOrderStatus } from "@/lib/api/supabase.functions";
import { getSupabaseClient } from "@/lib/supabase";
import { useCart } from "@/lib/cart";

const shippingSchema = z.object({
  name: z.string().min(1, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  street: z.string().min(1, "Please enter a street address."),
  city: z.string().min(1, "Please enter a city."),
  province: z.string().min(1, "Please enter a province."),
  zip: z.string().min(1, "Please enter a postal code."),
  payment_method: z.enum(["cash_on_delivery"]),
});

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, itemCount, clear } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [zip, setZip] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [hasActiveOrder, setHasActiveOrder] = useState<boolean>(false);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const shippingFee = 150;
  const taxAmount = 0;
  const totalAmount = subtotal + shippingFee + taxAmount;

  useEffect(() => {
    let mounted = true;

    const performChecks = async () => {
      try {
        const supabase = getSupabaseClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!mounted) return;

        if (!user) {
          setIsAuthenticated(false);
          setIsVerified(false);
          setCheckingAuth(false);
          return;
        }

        setIsAuthenticated(true);
        setEmail(user.email ?? "");

        // Check verification status from profile
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("email_verified, username, address")
          .eq("id", user.id)
          .single();

        if (!mounted) return;

        if (profileError || !profile) {
          setIsVerified(false);
        } else {
          setIsVerified(!!profile.email_verified);
          if (profile.username) setName(profile.username);
          if (profile.address) setStreet(profile.address);
        }

        // Check active order status
        const activeStatus = await getUserActiveOrderStatus();
        
        if (!mounted) return;

        setHasActiveOrder(activeStatus.hasActiveOrder);
        setActiveOrderId(activeStatus.activeOrder?.id ?? null);

      } catch (err) {
        console.error("Checkout validation check failed:", err);
        if (mounted) {
          setAuthError("An error occurred while validating your session. Please refresh the page.");
        }
      } finally {
        if (mounted) {
          setCheckingAuth(false);
        }
      }
    };

    performChecks();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (checkingAuth === false && !isAuthenticated) {
      const timer = setTimeout(() => {
        navigate({ to: "/login", search: { redirect: "/checkout" } });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [checkingAuth, isAuthenticated]);

  if (checkingAuth) {
    return (
      <section className="bg-cream py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="rounded-3xl bg-[var(--card)] p-12 shadow-soft flex flex-col items-center justify-center min-h-[300px]">
            <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4" />
            <p className="text-foreground/75 font-medium">Verifying your account status...</p>
          </div>
        </div>
      </section>
    );
  }

  if (authError) {
    return (
      <section className="bg-cream py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="rounded-3xl bg-[var(--card)] p-12 shadow-soft space-y-4">
            <div className="rounded-3xl bg-[#fee2e2] p-4 text-sm text-[#b91c1c]">{authError}</div>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 shadow-soft"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!isAuthenticated) {
    return (
      <section className="bg-cream py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="rounded-3xl bg-[var(--card)] p-12 shadow-soft space-y-6">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#fee2e2] text-[#ef4444]">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h1 className="font-display text-3xl text-brown">Authentication Required</h1>
              <p className="mt-3 text-foreground/75 max-w-md mx-auto">
                Only verified users can place orders. Please sign in to your account to proceed.
              </p>
              <p className="mt-2 text-xs text-foreground/50">
                Redirecting you to the login page shortly...
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => navigate({ to: "/login", search: { redirect: "/checkout" } })}
                className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 shadow-soft"
              >
                Sign In Now
              </button>
              <button
                type="button"
                onClick={() => navigate({ to: "/signup" })}
                className="inline-flex rounded-full border border-[var(--border)] bg-background px-6 py-3 text-sm font-semibold text-[var(--foreground)] hover:bg-accent shadow-soft"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!isVerified) {
    return (
      <section className="bg-cream py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="rounded-3xl bg-[var(--card)] p-12 shadow-soft space-y-6">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#fef3c7] text-[#d97706]">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h1 className="font-display text-3xl text-brown">Email Verification Required</h1>
              <p className="mt-3 text-foreground/75 max-w-md mx-auto">
                Your email address has not been verified yet. For security reasons, only users with verified email addresses can place orders.
              </p>
              <p className="mt-3 text-sm text-foreground/70">
                Please check your inbox at <strong className="text-primary">{email}</strong> for the verification link sent during signup.
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => navigate({ to: "/shop" })}
                className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 shadow-soft"
              >
                Return to Shop
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (hasActiveOrder) {
    return (
      <section className="bg-cream py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="rounded-3xl bg-[var(--card)] p-12 shadow-soft space-y-6">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#fee2e2] text-[#ef4444]">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h1 className="font-display text-3xl text-brown">Active Order In Progress</h1>
              <p className="mt-3 text-foreground/75 max-w-md mx-auto">
                You already have an order currently in progress (Order ID: <strong className="font-mono text-xs">{activeOrderId?.slice(0, 8)}</strong>).
              </p>
              <p className="mt-3 text-sm text-foreground/70">
                To prevent database inflation and spam, we limit customers to one active order. You can place a new order once your current order is delivered or cancelled.
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => navigate({ to: "/shop" })}
                className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 shadow-soft"
              >
                Return to Shop
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const mutation = useMutation({
    mutationFn: async (payload: Parameters<typeof createOrder>[0]["data"]) => {
      return createOrder({ data: payload });
    },
    onSuccess: () => {
      clear();
      setSuccessMessage("Your order is confirmed! We will reach out once it ships.");
    },
  });

  const handleSubmit = async () => {
    setFormErrors({});
    setSuccessMessage(null);

    if (items.length === 0) {
      setFormErrors({ general: "Your cart is empty. Add items before checking out." });
      return;
    }

    const result = shippingSchema.safeParse({
      name,
      email,
      street,
      city,
      province,
      zip,
      payment_method: paymentMethod,
    });

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        newErrors[issue.path[0] as string] = issue.message;
      }
      setFormErrors(newErrors);
      return;
    }

    try {
      await mutation.mutateAsync({
        items: items.map((item) => ({
          product_id: item.product_id,
          qty: item.qty,
          price_at_purchase: item.price,
        })),
        shipping_address: {
          name: result.data.name,
          email: result.data.email,
          street: result.data.street,
          city: result.data.city,
          province: result.data.province,
          zip: result.data.zip,
        },
        total_amount: totalAmount,
        payment_method: result.data.payment_method,
      });
    } catch (error) {
      setFormErrors({ general: error instanceof Error ? error.message : "Unable to place order." });
    }
  };

  return (
    <section className="bg-cream py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="space-y-6 rounded-3xl bg-[var(--card)] p-8 shadow-soft">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Checkout</span>
              <h1 className="mt-3 font-display text-5xl text-brown">Shipping & payment</h1>
              <p className="mt-2 text-foreground/75">Complete your order with shipping details and place your purchase.</p>
            </div>

            {successMessage ? (
              <div className="rounded-3xl bg-[var(--sage)]/15 p-6 text-sm text-[var(--foreground)]">
                <p className="font-semibold">Order placed successfully!</p>
                <p className="mt-2">{successMessage}</p>
                <button
                  type="button"
                  onClick={() => navigate({ to: "/shop" })}
                  className="mt-4 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Continue shopping
                </button>
              </div>
            ) : null}

            {formErrors.general ? (
              <div className="rounded-3xl bg-[#fee2e2] p-4 text-sm text-[#b91c1c]">{formErrors.general}</div>
            ) : null}

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-[var(--foreground)]">
                <span>Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-4 py-3 outline-none"
                />
                {formErrors.name ? <p className="text-xs text-[#f87171]">{formErrors.name}</p> : null}
              </label>

              <label className="space-y-2 text-sm text-[var(--foreground)]">
                <span>Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-4 py-3 outline-none"
                />
                {formErrors.email ? <p className="text-xs text-[#f87171]">{formErrors.email}</p> : null}
              </label>
            </div>

            <label className="space-y-2 text-sm text-[var(--foreground)]">
              <span>Street address</span>
              <input
                type="text"
                value={street}
                onChange={(event) => setStreet(event.target.value)}
                className="w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-4 py-3 outline-none"
              />
              {formErrors.street ? <p className="text-xs text-[#f87171]">{formErrors.street}</p> : null}
            </label>

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-[var(--foreground)]">
                <span>City</span>
                <input
                  type="text"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  className="w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-4 py-3 outline-none"
                />
                {formErrors.city ? <p className="text-xs text-[#f87171]">{formErrors.city}</p> : null}
              </label>

              <label className="space-y-2 text-sm text-[var(--foreground)]">
                <span>Province</span>
                <input
                  type="text"
                  value={province}
                  onChange={(event) => setProvince(event.target.value)}
                  className="w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-4 py-3 outline-none"
                />
                {formErrors.province ? <p className="text-xs text-[#f87171]">{formErrors.province}</p> : null}
              </label>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-[var(--foreground)]">
                <span>Postal code</span>
                <input
                  type="text"
                  value={zip}
                  onChange={(event) => setZip(event.target.value)}
                  className="w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-4 py-3 outline-none"
                />
                {formErrors.zip ? <p className="text-xs text-[#f87171]">{formErrors.zip}</p> : null}
              </label>

              <label className="space-y-2 text-sm text-[var(--foreground)]">
                <span>Payment method</span>
                <select
                  value={paymentMethod}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                  className="w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] px-4 py-3 outline-none"
                >
                  <option value="cash_on_delivery">Cash on delivery</option>
                </select>
              </label>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={mutation.isPending}
              className="inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:bg-primary/90 disabled:opacity-50"
            >
              {mutation.isPending ? "Placing order..." : "Place order"}
            </button>
          </div>

          <aside className="space-y-6 rounded-3xl bg-[var(--card)] p-6 shadow-soft">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--foreground)]/70">Order summary</p>
              <div className="mt-5 space-y-3 text-sm text-[var(--foreground)]">
                <div className="flex items-center justify-between">
                  <span>{itemCount} items</span>
                  <span>₱{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span>₱{shippingFee.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tax</span>
                  <span>₱{taxAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[var(--border)] pt-5 text-lg font-semibold text-[var(--foreground)]">
              <span>Total</span>
              <span>₱{totalAmount.toLocaleString()}</span>
            </div>

            <div className="rounded-3xl bg-[var(--background)] p-5 text-sm text-[var(--foreground)]/80">
              <p className="font-semibold">Payment is handled at delivery.</p>
              <p className="mt-2">This checkout flow currently uses Cash on Delivery. Stripe integration can be added later.</p>
            </div>

            <div className="rounded-3xl bg-[var(--background)] p-5 text-sm text-[var(--foreground)]/80">
              <p className="font-semibold">Need to change your cart?</p>
              <button
                type="button"
                onClick={() => navigate({ to: "/cart" })}
                className="mt-3 inline-flex rounded-full bg-primary/5 px-4 py-2 text-sm font-semibold text-primary"
              >
                Edit cart
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
