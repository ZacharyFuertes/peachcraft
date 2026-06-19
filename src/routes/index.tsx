import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Star, Sparkles, Heart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProducts } from "@/lib/api/supabase.functions";
import type { Product } from "@/lib/supabase";
import {
  HandmadeIllustration,
  KawaiiIllustration,
  PackagingIllustration,
  CakeIllustration,
} from "@/components/illustrations";

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
      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundImage: "var(--gradient-hero)" }}
      >
        {/* Decorative floating shapes */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute top-10 left-1/3 w-3 h-3 rounded-full bg-blush animate-float" style={{ animationDelay: "0.5s" }} />
          <div className="absolute top-32 right-1/4 w-2 h-2 rounded-full bg-sage animate-float" style={{ animationDelay: "1.2s" }} />
          <div className="absolute bottom-24 left-1/4 text-2xl animate-float" style={{ animationDelay: "0s" }} />
          <div className="absolute top-20 right-10 text-xl animate-float text-blush" style={{ animationDelay: "2s" }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32 grid lg:grid-cols-2 gap-12 items-center relative">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card/80 backdrop-blur text-xs font-semibold text-brown shadow-card">
              <Sparkles className="w-3.5 h-3.5 text-blush" aria-hidden /> New drop · Strawberry Dream Series
            </span>
            <h1 className="mt-5 font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-brown">
              Your shelf's most interesting story
              
            </h1>
            <p className="mt-6 text-lg text-foreground/85 max-w-md leading-relaxed">
              Welcome to Peach Craft, the home of fake cakes and air-dry clay crafts, each one sculpted by hand with a whole lot of heart.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold shadow-soft hover:shadow-card hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                Shop the Collection <span aria-hidden></span>
              </Link>
              <Link
                to="/about"
                className="inline-flex  items-center gap-2 px-7 py-3.5 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                About Me <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust row */}
            <dl className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              <div>
                <dt className="text-xs uppercase tracking-wider text-foreground/60">SINCE</dt>
                <dd className="mt-1 font-display text-2xl text-brown">2021</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-foreground/60">BASED IN</dt>
                <dd className="mt-1 font-display text-2xl text-brown inline-flex items-center gap-1">
                  Philippines 
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-foreground/60">Made by</dt>
                <dd className="mt-1 font-display text-2xl text-brown">1 pair of hands</dd>
              </div>
            </dl>
          </div>

          {/* Hero illustration with floating cards */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="relative aspect-square">
              <div className="absolute inset-6 rounded-full bg-card/40 backdrop-blur-sm shadow-soft" />
              <CakeIllustration className="relative w-full h-full animate-float" />
            </div>

            {/* Floating mini-cards */}
            <div className="hidden sm:flex absolute -left-4 top-12 items-center gap-2 px-3 py-2 rounded-2xl bg-card shadow-card animate-float" style={{ animationDelay: "1s" }}>
              <span className="grid place-items-center w-9 h-9 rounded-xl bg-blush text-lg" aria-hidden />
              <div className="text-xs">
                <p className="font-semibold text-brown">New restock</p>
                <p className="text-foreground/60">3 pieces left</p>
              </div>
            </div>
            <div className="hidden sm:flex absolute -right-2 bottom-10 items-center gap-2 px-3 py-2 rounded-2xl bg-card shadow-card animate-float" style={{ animationDelay: "2.2s" }}>
              <Heart className="w-4 h-4 fill-blush text-blush" aria-hidden />
              <div className="text-xs">
                <p className="font-semibold text-brown">"So adorable!"</p>
                <p className="text-foreground/60">— Mika, verified buyer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Why Peach Craft</span>
            <h2 className="mt-3 font-display text-4xl text-brown">Small studio, big heart</h2>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              {
                Icon: HandmadeIllustration,
                title: "Handmade",
                desc: "Every piece is crafted by hand with love and care. No two are exactly alike — each one is a tiny original made just for you.",
              },
              {
                Icon: KawaiiIllustration,
                title: "Pretty useful",
                desc: "Each piece is made to earn its place: fake cakes that open up for storage, clay crafts that add something to your space. Handmade to look good and actually be useful.",
              },
              {
                Icon: PackagingIllustration,
                title: "Thoughtful Packaging",
                desc: "Your orders are packed with care using eco-friendly materials. Because we love the planet as much as we love cute crafts.",
              },
            ].map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="group bg-card rounded-3xl p-8 shadow-card hover:-translate-y-1 hover:shadow-soft transition-all"
              >
                <div className="w-20 h-20 mb-5 transition-transform group-hover:scale-110 group-hover:rotate-3">
                  <Icon className="w-full h-full" />
                </div>
                <h3 className="font-display text-2xl text-brown">{title}</h3>
                <p className="mt-2 text-foreground/80 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-accent py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-4xl text-brown">
              Featured Crafts
            </h2>
            <p className="mt-3 text-foreground/75">
              A few of our most beloved creations — restocks coming soon!
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-80 rounded-3xl bg-[var(--card)] shadow-soft" />
              ))
            ) : error ? (
              <div className="rounded-3xl bg-[var(--card)] p-6 text-sm text-[#f87171] shadow-soft">{error instanceof Error ? error.message : "Unable to load featured products."}</div>
            ) : (
              (products ?? []).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-blush text-blush-foreground font-semibold shadow-soft hover:scale-105 transition-transform"
            >
              View All Crafts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {/* Compilation image (customer/stories grid) - place the image at /public/assets/compilation.jpg */}
          <div className="mt-6 text-center">
            <img
              src="/assets/COMPILATIONPIC.png"
              alt="Compilation of customer photos and stories"
              loading="lazy"
              className="mx-auto mt-6 shadow-soft w-full max-w-none object-cover rounded-none"
            />
          </div>
        </div>
      </section>

      {/* EMOTIONAL CTA STRIP — now actionable */}
      <section className="bg-blush text-blush-foreground py-12">
        <div className="max-w-5xl mx-auto px-6 grid lg:grid-cols-[1fr_auto] items-center gap-6">
          <p className="font-display italic text-2xl sm:text-3xl text-center lg:text-left">
            A few pieces are still available.
          </p>
          <Link
            to="/shop"
            className="justify-self-center inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blush-foreground text-blush font-semibold hover:scale-105 transition-transform"
          >
            Shop <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
