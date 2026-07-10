import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Star, Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/api/supabase.functions";
import type { Product } from "@/lib/supabase";
import { CakeIllustration } from "@/components/illustrations";
import { FadeIn } from "@/components/FadeIn";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Peach Craft Cute Fake Cakes & Kawaii Clay Crafts" },
      { name: "description", content: "Adorable handmade fake cakes, air-dry clay figures and kawaii storage boxes. Sculpted by hand with love." },
      { property: "og:title", content: "Peach Craft — Handmade with love" },
      { property: "og:description", content: "Adorable handmade fake cakes, air-dry clay figures and kawaii storage boxes." },
    ],
  }),
  component: HomePage,
});

const featuredProductsQuery = {
  queryKey: ["featured-products"],
  queryFn: getFeaturedProducts,
};

function HomePage() {
  const { data: products, isLoading, error } = useQuery<Product[]>(featuredProductsQuery);

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="relative overflow-hidden border-b border-border/40"
        style={{ backgroundImage: "var(--gradient-hero)" }}
      >
        {/* Floating circles/decorations */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute top-10 left-1/3 w-3 h-3 rounded-full bg-blush animate-float" style={{ animationDelay: "0.5s" }} />

          <div className="absolute bottom-24 left-1/4 text-2xl animate-float" style={{ animationDelay: "0s" }} />
          <div className="absolute top-20 right-10 text-xl animate-float text-blush" style={{ animationDelay: "2s" }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 sm:pb-24 lg:pt-24 lg:pb-32 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative">
          <div className="space-y-5 sm:space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card/85 backdrop-blur text-xs font-bold text-brown shadow-card border border-border/40">
              <Sparkles className="w-3.5 h-3.5 text-blush animate-wiggle" aria-hidden /> New drop · Strawberry Dream Series
            </span>
            <h1 className="font-display text-[2rem] sm:text-5xl lg:text-7xl xl:text-8xl leading-[1.05] text-brown tracking-tight">
              Your shelf's most interesting story
            </h1>
            <p className="text-base sm:text-lg text-foreground/85 max-w-md leading-relaxed">
              Welcome to Peach Craft, the home of handmade fake cakes and kawaii air-dry clay crafts. Sculpted one piece at a time, with a whole lot of heart.
            </p>

            <div className="pt-2 flex flex-wrap gap-3 sm:gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider btn-bounce-hover shadow-soft"
              >
                Shop the Collection
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border-2 border-primary/80 bg-white/40 text-primary font-bold text-xs uppercase tracking-wider btn-bounce-hover shadow-soft"
              >
                Our Story <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            {/* Trust row */}
            <dl className="pt-6 grid grid-cols-3 gap-3 sm:gap-6 max-w-md border-t border-border/60">
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-widest text-foreground/50">SINCE</dt>
                <dd className="mt-1 font-display text-xl sm:text-2xl font-bold text-brown">2021</dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-widest text-foreground/50">BASED IN</dt>
                <dd className="mt-1 font-display text-xl sm:text-2xl font-bold text-brown">Philippines</dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-widest text-foreground/50">HANDMADE BY</dt>
                <dd className="mt-1 font-display text-xl sm:text-2xl font-bold text-brown">1 Maker</dd>
              </div>
            </dl>
          </div>

          {/* Hero Illustration */}
          <div className="relative mx-auto w-full max-w-xs sm:max-w-lg">
            <div className="relative aspect-square">
              <div className="absolute inset-4 sm:inset-6 rounded-full bg-card/45 backdrop-blur-sm shadow-soft border border-white/20" />
              <CakeIllustration className="relative w-full h-full animate-float" />
            </div>

            {/* Floating badge */}
            <div className="hidden sm:flex absolute -left-4 top-12 items-center gap-3 px-4 py-2.5 rounded-2xl bg-card border border-border shadow-card animate-float" style={{ animationDelay: "1s" }}>
              <div className="text-xs">
                <p className="font-bold text-brown">New Restock</p>
                <p className="text-foreground/60">Limited quantities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY PEACH CRAFT (SUPERPOWERS) */}
      <section className="bg-cream py-16 sm:py-24 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Why Peach Craft</span>
              <h2 className="font-display text-4xl sm:text-5xl text-brown">Small studio, big heart</h2>
            </div>
          </FadeIn>
          <div className="mt-10 sm:mt-16 grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "100% Handmade",
                desc: "Every piece is sculpted by hand with love and care. No molds, no shortcuts. Each one is a tiny original creation made just for you.",
              },
              {
                title: "Pretty & Useful",
                desc: "Each piece is made to earn its place: fake cakes that open up for storage, clay crafts that store jewelry. Designed to look good and be functional.",
              },
              {
                title: "Eco-friendly Packs",
                desc: "Your orders are packed with care using sustainable cardboard and starch peanuts that melt in water. Because we care about the planet.",
              },
            ].map(({ title, desc }, i) => (
              <FadeIn key={title} delay={i * 100}>
                <div className="group bg-card border border-border rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-8 shadow-card hover:-translate-y-2 hover:shadow-soft transition-all duration-300">
                  <h3 className="font-display text-xl sm:text-2xl text-brown font-semibold">{title}</h3>
                  <p className="mt-3 text-foreground/80 leading-relaxed text-sm">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PEAS OF MIND / SPECS SECTION */}
      <section className="bg-background py-16 sm:py-24 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            <FadeIn className="lg:sticky lg:top-24 space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Aesthetic & Quality</span>
              <h2 className="font-display text-4xl sm:text-5xl text-brown leading-tight">
                Peas of mind in every craft
              </h2>
              <p className="text-foreground/75 leading-relaxed text-sm">
                We make sure our handmade creations look delicious but last forever. Here's what makes Peach Craft stand out.
              </p>
            </FadeIn>
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6 sm:gap-8">
              {[
                {
                  t: "Premium Air-Dry Clay",
                  d: "Sculpted with ultra-light, durable clay that hardens into a solid, lightweight piece. No heavy stoneware — safe to display anywhere."
                },
                {
                  t: "Aqueous Acrylic Coating",
                  d: "Every creation is hand-painted with multiple layers of pastel acrylics and finished with a protective water-resistant seal."
                },
                {
                  t: "Secret Storage Spaces",
                  d: "Many of our fake cakes open up! A beautiful topping hides a storage box for your rings, keys, and desk clutter."
                },
                {
                  t: "Thoughtful Materials",
                  d: "Using non-toxic clays, recycled paper pulps, and premium seals. We design safe and high quality decorations for your home."
                }
              ].map((spec, i) => (
                <FadeIn key={spec.t} delay={i * 100}>
                  <div className="border-b border-border/80 pb-6">
                    <h3 className="font-display text-lg text-brown font-bold mb-2">{spec.t}</h3>
                    <p className="text-sm text-foreground/80 leading-relaxed">{spec.d}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-background py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">The Studio Favorites</span>
              <h2 className="font-display text-4xl sm:text-5xl text-brown">
                Featured Crafts
              </h2>
              <p className="text-foreground/75 text-sm max-w-md mx-auto">
                A few of our most beloved creations. Sign up for alerts so you never miss a drop!
              </p>
            </div>
          </FadeIn>

          <div className="mt-10 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-x-1.5 sm:gap-x-2 gap-y-3 sm:gap-y-4">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-60 sm:h-80 rounded-[2rem] bg-[var(--card)] shadow-soft animate-pulse" />
              ))
            ) : error ? (
              <div className="rounded-[2rem] bg-[var(--card)] p-6 text-sm text-red-400 shadow-soft col-span-full">
                {error instanceof Error ? error.message : "Unable to load featured products."}
              </div>
            ) : (
              (products ?? []).slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>

          <FadeIn delay={100}>
            <div className="mt-10 sm:mt-16 text-center">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-blush text-blush-foreground font-bold text-xs uppercase tracking-wider btn-bounce-hover shadow-soft"
              >
                View All Crafts <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* compilation image moved outside container to be full-bleed */}
        <div className="w-full mt-16 overflow-hidden">
          <img
            src="/assets/COMPILATIONPIC.png"
            alt="Compilation of customer photos and stories"
            loading="lazy"
            className="block w-full h-auto object-cover opacity-95"
          />
        </div>
      </section>

      {/* FINAL CALL TO ACTION CARD */}
      <section className="bg-background py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="bg-blush text-blush-foreground rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-12 lg:p-16 shadow-soft grid lg:grid-cols-[1.2fr_1fr] gap-6 sm:gap-8 items-center relative overflow-hidden">
              <div className="absolute inset-0 marquee-strip pointer-events-none opacity-20" aria-hidden />
              <div className="relative z-10 space-y-4">
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight">
                  A few unique crafts are still available.
                </h2>
                <p className="text-blush-foreground/90 max-w-md text-sm leading-relaxed">
                  Each piece is a singular creation. Visit our shop to find the perfect cupcake container or clay companion.
                </p>
              </div>
              <div className="relative z-10 flex justify-start lg:justify-end">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-blush-foreground text-blush font-bold text-xs uppercase tracking-wider btn-bounce-hover shadow-soft"
                >
                  Shop the Drop <ArrowRight className="w-4 h-4 ml-2 animate-wiggle" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
