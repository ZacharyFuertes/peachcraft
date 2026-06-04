import { createFileRoute } from "@tanstack/react-router";
import { ProductCard, type Product } from "@/components/ProductCard";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Peach Craft" },
      { name: "description", content: "Browse handmade fake cakes, kawaii storage boxes and air-dry clay figures from Peach Craft." },
      { property: "og:title", content: "Shop — Peach Craft" },
      { property: "og:description", content: "Browse handmade fake cakes, kawaii storage boxes and clay figures." },
    ],
  }),
  component: ShopPage,
});

const all: Product[] = [
  { id: "1", name: "Strawberry Dream Cake", price: 680, emoji: "🍰", swatch: "blush", soldOut: true },
  { id: "2", name: "Matcha Slice Box", price: 520, emoji: "🍵", swatch: "sage", tag: "New" },
  { id: "3", name: "Peach Bear Clay Figure", price: 450, emoji: "🧸", swatch: "peach", soldOut: true },
  { id: "4", name: "Cake Storage Box", price: 780, emoji: "🎁", swatch: "blush", tag: "Bestseller" },
  { id: "5", name: "Cloud Bunny Trinket", price: 380, emoji: "🐰", swatch: "cream" },
  { id: "6", name: "Mini Mochi Set", price: 290, emoji: "🍡", swatch: "blush", tag: "New" },
  { id: "7", name: "Peach Pudding Jar", price: 420, emoji: "🍮", swatch: "peach" },
  { id: "8", name: "Sakura Cake Slice", price: 560, emoji: "🌸", swatch: "blush" },
];

function ShopPage() {
  return (
    <section className="bg-cream py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <header className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">The Shop</span>
          <h1 className="mt-3 font-display text-5xl text-brown">All Crafts</h1>
          <p className="mt-3 text-foreground/75">
            Sculpted one piece at a time. Restocks happen every Friday — sign up for alerts so you never miss a drop.
          </p>
        </header>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {all.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
