import { createFileRoute } from "@tanstack/react-router";
import { Truck, RotateCcw, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/shipping-policy")({
  head: () => ({
    meta: [
      { title: "Shipping & Policy — Peach Craft" },
      { name: "description", content: "Shipping rates, delivery times, refund policy and care instructions for Peach Craft handmade items." },
      { property: "og:title", content: "Shipping & Policy — Peach Craft" },
      { property: "og:description", content: "Shipping rates, refund policy and care instructions." },
    ],
  }),
  component: PolicyPage,
});

function PolicyPage() {
  return (
    <section className="bg-cream py-16">
      <div className="max-w-4xl mx-auto px-6">
        <header className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Fine print</span>
          <h1 className="mt-3 font-display text-5xl text-brown">Shipping &amp; Policy</h1>
          <p className="mt-3 text-foreground/75 max-w-xl mx-auto">
            Everything you need to know about how your craft makes it from my studio to your shelf.
          </p>
        </header>

        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          {[
            { Icon: Truck, t: "3–5 day shipping", d: "Nationwide PH" },
            { Icon: RotateCcw, t: "7-day returns", d: "On unopened items" },
            { Icon: ShieldCheck, t: "Replacement guarantee", d: "If it arrives broken" },
          ].map(({ Icon, t, d }) => (
            <div key={t} className="bg-card rounded-2xl p-5 shadow-card text-center">
              <Icon className="w-6 h-6 mx-auto text-primary" aria-hidden />
              <p className="mt-2 font-semibold text-brown">{t}</p>
              <p className="text-sm text-foreground/70">{d}</p>
            </div>
          ))}
        </div>

        <article className="mt-12 space-y-8 bg-card rounded-3xl p-8 sm:p-10 shadow-card">
          <section>
            <h2 className="font-display text-2xl text-brown">Shipping</h2>
            <p className="mt-2 text-foreground/80 leading-relaxed">
              Orders ship within 3 business days from Manila. Free shipping on orders ₱1,000 and above. Delivery typically takes 3–5 business days within the Philippines via our trusted courier partners.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-brown">Refunds</h2>
            <p className="mt-2 text-foreground/80 leading-relaxed">
              We accept returns on unopened items within 7 days of delivery. Custom and made-to-order pieces are final sale. If your order arrives damaged, send us a photo within 48 hours and we'll send a replacement, free of charge.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-brown">Care</h2>
            <p className="mt-2 text-foreground/80 leading-relaxed">
              Our pieces are made from air-dry clay and are decorative, not food-safe. Keep them dry, away from direct sunlight, and dust gently with a soft brush.
            </p>
          </section>
        </article>
      </div>
    </section>
  );
}
