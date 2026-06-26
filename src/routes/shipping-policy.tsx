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
    <section className="bg-cream py-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <header className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Help Center</span>
          <h1 className="font-display text-5xl text-brown font-bold tracking-tight">Frequently Asked Questions</h1>
          <p className="text-foreground/75 text-sm max-w-xl mx-auto">
            Everything you need to know about how your craft makes it from our kitchen table studio to your shelf.
          </p>
        </header>

        {/* Highlights Row */}
        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          {[
            { Icon: Truck, t: "3–5 Days Delivery", d: "Nationwide PH Shipping" },
            { Icon: RotateCcw, t: "7-Day Returns", d: "On unopened, stock crafts" },
            { Icon: ShieldCheck, t: "Full Safe Guarantee", d: "Replacement if it arrives broken" },
          ].map(({ Icon, t, d }) => (
            <div key={t} className="bg-card border border-border/80 rounded-2xl p-6 shadow-card text-center space-y-2 btn-bounce-hover">
              <div className="w-10 h-10 rounded-full bg-accent/40 flex items-center justify-center mx-auto text-primary">
                <Icon className="w-5 h-5" aria-hidden />
              </div>
              <p className="font-bold text-brown text-sm">{t}</p>
              <p className="text-xs text-foreground/70">{d}</p>
            </div>
          ))}
        </div>

        {/* FAQ Accordions Block */}
        <div className="mt-16 bg-card border border-border/80 rounded-[2.5rem] p-8 sm:p-12 shadow-card space-y-2">
          
          <details className="faq-accordion" open>
            <summary>
              <span>When will my order ship?</span>
              <span className="accordion-icon" aria-hidden />
            </summary>
            <div className="accordion-content">
              <p>
                Standard in-stock orders are processed and ship out from Manila within 1 to 3 business days. Made-to-order creations or custom items may require an additional sculpting period which is specified on their individual pages.
              </p>
            </div>
          </details>

          <details className="faq-accordion">
            <summary>
              <span>How much is shipping and do you offer free options?</span>
              <span className="accordion-icon" aria-hidden />
            </summary>
            <div className="accordion-content space-y-2">
              <p>
                Shipping is calculated automatically at checkout based on your delivery address.
              </p>
              <p>
                <strong>Yes!</strong> We offer completely free shipping on all orders totaling ₱1,000 or more within the Philippines.
              </p>
            </div>
          </details>

          <details className="faq-accordion">
            <summary>
              <span>Do you ship internationally?</span>
              <span className="accordion-icon" aria-hidden />
            </summary>
            <div className="accordion-content">
              <p>
                We do! International orders are shipped via standard airmail. Transit times usually vary from 14 to 20 business days depending on customs and local courier handling in your destination country.
              </p>
            </div>
          </details>

          <details className="faq-accordion">
            <summary>
              <span>Can I return or exchange my craft?</span>
              <span className="accordion-icon" aria-hidden />
            </summary>
            <div className="accordion-content">
              <p>
                We accept returns on unopened, unused items in their original packaging within 7 days of package delivery. Return postage is covered by the customer. Please note that custom commissions, personalized, and sales items are final sale.
              </p>
            </div>
          </details>

          <details className="faq-accordion">
            <summary>
              <span>What happens if my creation arrives broken?</span>
              <span className="accordion-icon" aria-hidden />
            </summary>
            <div className="accordion-content">
              <p>
                Because clay creations can be delicate, we pack them with layers of high-grade starch and bubble wraps. In the rare event that an item arrives damaged, send us a photo of the item and its package within 48 hours of delivery and we will ship you a replacement, free of charge.
              </p>
            </div>
          </details>

          <details className="faq-accordion">
            <summary>
              <span>How should I clean and care for my clay item?</span>
              <span className="accordion-icon" aria-hidden />
            </summary>
            <div className="accordion-content">
              <p>
                Air-dry clay items are decorative pieces and are not waterproof, dishwasher, or food-safe. Handle them gently. Keep them away from moisture, water, and prolonged direct sunlight. To clean, brush off dust using a soft dry painting brush or a micro-fiber cloth.
              </p>
            </div>
          </details>

          <details className="faq-accordion">
            <summary>
              <span>Do you accept custom clay commissions?</span>
              <span className="accordion-icon" aria-hidden />
            </summary>
            <div className="accordion-content">
              <p>
                We open slots for custom cake storage boxes and clay figures periodically. When slots are open, a special booking button will appear in the shop menu, and we will announce drops on our Instagram channel (@peach.craft). Feel free to send us custom requests via our Contact page!
              </p>
            </div>
          </details>

        </div>
      </div>
    </section>
  );
}
