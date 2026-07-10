import { createFileRoute, Link } from "@tanstack/react-router";
import { CakeIllustration } from "@/components/illustrations";
import { FadeIn } from "@/components/FadeIn";
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
      {/* Centered Hero Section */}
      <section className="py-20 lg:py-28" style={{ backgroundImage: "var(--gradient-hero)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">About Peach Craft</span>
          </FadeIn>
          <FadeIn delay={100}>
            <h1 className="font-display text-5xl sm:text-6xl text-brown font-bold tracking-tight leading-tight">
              Hi, I'm the hands behind <em className="text-primary not-italic italic font-display">Peach Craft</em>
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="text-foreground/85 text-base sm:text-lg leading-relaxed space-y-6 max-w-2xl mx-auto">
              <p>
                Peach Craft didn't start with a grand business plan. It started with simple curiosity: how does air-dry clay actually work? And how do I make a realistic fake cake?
              </p>
              <p>
                One question led to the next, and before I knew it, I was making all sorts of things at my kitchen table. My friends saw something in my early crafts before I did, and that push kept me going. What really sustained me, though, was my customers—the ones who gave feedback, shared pictures of their shelves, and came back for every drop.
              </p>
              <p>
                Eventually, life got incredibly full. Between work, commissions, and standard packaging, I was pushing my limits, and my hands started to ache. So I stopped. Not quit—just paused. I told myself to take a breath and craft with intention.
              </p>
              <p>
                And now, Peach Craft is back. Same curious hands, same dedication to the clay process, but moving a little slower this time. Just making things, one piece at a time, with absolute love.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="pt-4 flex justify-center">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider btn-bounce-hover shadow-soft"
              >
                See what I'm making <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Centered Illustration Section */}
      <section className="py-12 bg-background border-t border-b border-border/40">
        <div className="max-w-md mx-auto px-6">
          <CakeIllustration className="w-full h-auto animate-float mx-auto" />
        </div>
      </section>

      {/* Method Grid */}
      <section className="bg-cream py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
          <FadeIn>
            <div className="text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">The Process</span>
              <h2 className="font-display text-4xl text-brown font-bold tracking-tight">How it gets made</h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { k: "01", t: "Notebook Doodles", d: "Every single craft begins as a quick watercolor sketch or pencil doodle in my ideas book." },
              { k: "02", t: "Hand Sculpting", d: "Air-dry clay is hand-shaped and custom blended without using synthetic molds. No two items are identical!" },
              { k: "03", t: "Seal & Package", d: "Each piece is hand-painted, waterproof sealed, and packaged in recycled cardboard with water-soluble peanuts." },
            ].map((s, i) => (
              <FadeIn key={s.k} delay={i * 100}>
                <div className="bg-card border border-border/80 rounded-[2.5rem] p-8 shadow-card hover:-translate-y-1.5 hover:shadow-soft transition-all duration-300">
                  <div className="font-display text-3xl font-bold text-blush">{s.k}</div>
                  <h3 className="mt-4 font-display text-xl text-brown font-bold">{s.t}</h3>
                  <p className="mt-2 text-sm text-foreground/80 leading-relaxed">{s.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
