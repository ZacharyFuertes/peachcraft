import { createFileRoute, Link } from "@tanstack/react-router";
import { CakeIllustration } from "@/components/illustrations";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Peach Craft" },
      { name: "description", content: "Meet the maker behind Peach Craft — a one-person studio sculpting kawaii clay creations from her kitchen table." },
      { property: "og:title", content: "About Peach Craft" },
      { property: "og:description", content: "A one-person studio sculpting kawaii clay creations with love." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="py-16 lg:py-24" style={{ backgroundImage: "var(--gradient-hero)" }}>
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">About</span>
            <h1 className="mt-3 font-display text-5xl lg:text-6xl text-brown leading-tight">
              Hi, I'm the hands behind <em className="text-primary not-italic italic">Peach Craft</em>
            </h1>
            <p className="mt-5 text-lg text-foreground/85 leading-relaxed">
              Peach Craft started on a kitchen table in 2023 with a lump of air-dry clay and too many late-night cake cravings. What began as a hobby is now a tiny studio where I sculpt, paint, and pack every single order myself.
            </p>
            <p className="mt-4 text-foreground/80 leading-relaxed">
              Every piece takes hours — sometimes days — but that's the point. No machines. No mass production. Just slow, soft, joyful little objects made to brighten your shelf.
            </p>
            <Link to="/shop" className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-soft hover:-translate-y-0.5 transition-transform">
              See what I'm making <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <CakeIllustration className="w-full max-w-md mx-auto animate-float" />
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          {[
            { k: "01", t: "Sketch", d: "Every craft starts as a doodle in my notebook." },
            { k: "02", t: "Sculpt", d: "Hand-shaped from air-dry clay — no molds." },
            { k: "03", t: "Paint & pack", d: "Sealed, painted, and packed in eco-friendly boxes." },
          ].map((s) => (
            <div key={s.k} className="bg-card rounded-3xl p-8 shadow-card">
              <div className="font-display text-3xl text-blush">{s.k}</div>
              <h3 className="mt-3 font-display text-2xl text-brown">{s.t}</h3>
              <p className="mt-2 text-foreground/80">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
