import { useState } from "react";
import { Eye, ShoppingBag, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/supabase";

const namedSwatchColors: Record<string, string> = {
  blush: "#f7c8d9",
  sage: "#a8c5a3",
  cream: "#f9f2e8",
  peach: "#f5d0b9",
};

export function ProductCard({ product }: { product: Product }) {
  const [liked, setLiked] = useState(false);
  const imageSrc = product.images?.[0] ?? null;
  const swatchColor = product.swatch ?? "#f7c8d9";
  const backgroundColor = swatchColor.startsWith("#")
    ? swatchColor
    : namedSwatchColors[swatchColor] ?? "#f7c8d9";

  return (
    <article
      className={cn(
        "group relative rounded-3xl overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft focus-within:-translate-y-1.5",
      )}
      style={{ backgroundColor }}
    >
      <div className="relative aspect-square overflow-hidden">
        {imageSrc ? (
          <div className="absolute inset-4 overflow-hidden rounded-[1.75rem] bg-[var(--card)]">
            <img
              src={imageSrc}
              alt={product.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        ) : null}

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
