import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Instagram, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Peach Craft" },
      { name: "description", content: "Say hi, ask about custom orders, or get help with an existing order at Peach Craft." },
      { property: "og:title", content: "Contact Peach Craft" },
      { property: "og:description", content: "Say hi, ask about custom orders, or get help with an existing order." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <section className="bg-cream py-16">
      <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-[1fr_1.2fr] gap-10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Contact</span>
          <h1 className="mt-3 font-display text-5xl text-brown">Say hi</h1>
          <p className="mt-3 text-foreground/80 leading-relaxed">
            Custom order? Press inquiry? Just want to chat about clay? I'd love to hear from you. I reply within 1–2 business days.
          </p>
          <ul className="mt-6 space-y-3 text-foreground/80">
            <li className="flex items-center gap-3"><Mail className="w-5 h-5 text-primary" aria-hidden /> hello@peachcraft.shop</li>
            <li className="flex items-center gap-3"><Instagram className="w-5 h-5 text-primary" aria-hidden /> @peach.craft</li>
          </ul>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="bg-card rounded-3xl p-8 shadow-card space-y-4"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-brown mb-1.5">Name</label>
            <input id="name" required className="w-full h-11 px-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-brown mb-1.5">Email</label>
            <input id="email" type="email" required className="w-full h-11 px-4 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label htmlFor="msg" className="block text-sm font-semibold text-brown mb-1.5">Message</label>
            <textarea id="msg" required rows={5} className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-soft hover:-translate-y-0.5 transition-transform"
          >
            {sent ? "Sent! Talk soon" : <>Send message <Send className="w-4 h-4" /></>}
          </button>
        </form>
      </div>
    </section>
  );
}
