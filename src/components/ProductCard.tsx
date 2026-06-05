import { useState } from "react";
import { Eye, ShoppingBag, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export type Product = {
  id: string;
  name: string;
  price: number;
  swatch: "blush" | "sage" | "cream" | "peach";
  soldOut?: boolean;
  tag?: string;
};

const swatchBg: Record<Product["swatch"], string> = {
  blush: "bg-[oklch(0.92_0.05_20)]",
  sage: "bg-[oklch(0.92_0.05_150)]",
  cream: "bg-[oklch(0.95_0.04_80)]",
  peach: "bg-[oklch(0.93_0.06_55)]",
};

export function ProductCard({ product }: { product: Product }) {
  const [liked, setLiked] = useState(false);

  return (
    <article
      className={cn(
        "group relative bg-card rounded-3xl overflow-hidden shadow-card",
        "transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft",
        "focus-within:-translate-y-1.5",
      )}
    >
      <div className={cn("relative aspect-square overflow-hidden", swatchBg[product.swatch])}>
        {/* Top-left badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.soldOut && (
            <span className="px-2.5 py-1 rounded-full bg-card text-brown text-xs font-semibold shadow-card">
              Sold Out
            </span>
          )}
          {product.tag && !product.soldOut && (
            <span className="px-2.5 py-1 rounded-full bg-blush text-blush-foreground text-xs font-semibold shadow-card">
              {product.tag}
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => setLiked((v) => !v)}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={liked}
          className="absolute top-3 right-3 grid place-items-center w-10 h-10 rounded-full bg-card/90 backdrop-blur shadow-card hover:scale-110 transition-transform"
        >
          <Heart
            className={cn("w-4 h-4 transition-colors", liked ? "fill-blush text-blush" : "text-foreground")}
          />
        </button>

        {/* Quick view (hover/focus) */}
        <button
          type="button"
          className={cn(
            "absolute left-1/2 -translate-x-1/2 bottom-3 inline-flex items-center gap-2",
            "px-4 py-2 rounded-full bg-foreground text-background text-xs font-semibold",
            "opacity-0 translate-y-2 transition-all duration-300",
            "group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0",
          )}
        >
          <Eye className="w-3.5 h-3.5" /> Quick view
        </button>
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg text-brown">{product.name}</h3>
        <div className="mt-1 flex items-end justify-between gap-2">
          <p className="text-primary font-semibold">₱{product.price.toLocaleString()}</p>
          <button
            type="button"
            disabled={product.soldOut}
            aria-label={product.soldOut ? "Sold out" : `Add ${product.name} to cart`}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold",
              "bg-primary text-primary-foreground hover:bg-primary/90 transition-colors",
              "disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed",
            )}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            {product.soldOut ? "Sold out" : "Add"}
          </button>
        </div>
      </div>
    </article>
  );
}
