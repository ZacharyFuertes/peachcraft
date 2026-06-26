import { useState } from "react";
import { ShoppingBag, Heart, Check } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { useCartToast } from "@/components/CartToast";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/supabase";

const namedSwatchColors: Record<string, string> = {
  blush: "#f7c8d9",
  sage: "#a8c5a3",
  cream: "#f9f2e8",
  peach: "#f5d0b9",
};

function hexContrastColor(hex: string) {
  try {
    const h = hex.replace('#', '');
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
  } catch {
    return '#000000';
  }
}

export function ProductCard({ product }: { product: Product }) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();
  const { items, addItem } = useCart();
  const { notify } = useCartToast();

  const imageSrc = product.images?.[0] ?? null;
  const swatchColor = product.swatch ?? "#f7c8d9";
  const tagSwatch = swatchColor.startsWith('#') ? swatchColor : namedSwatchColors[swatchColor] ?? '#f7c8d9';
  const tagTextColor = hexContrastColor(tagSwatch);
  const existingCartItem = items.find((item) => item.product_id === product.id);
  const isOutOfStock = product.soldOut || (product.stock_qty != null && existingCartItem?.qty >= product.stock_qty);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      addItem(product, 1);
      notify({
        productName: product.name,
        productImage: product.images?.[0] ?? null,
        qty: 1,
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 1400);
    } catch (error) {
      if (error instanceof Error) {
        window.alert(error.message);
      }
    }
  };

  return (
    <article
      onClick={() => navigate({ to: `/shop/${product.id}` })}
      className={cn(
        "group relative cursor-pointer",
        // Mobile: borderless flat card; Desktop: elevated with rounded corners
        "rounded-[1rem] sm:rounded-[1.75rem] border border-border/70 overflow-hidden",
        "bg-white transition-all duration-300",
        "hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-card sm:hover:shadow-soft",
        "shadow-[0_1px_4px_-1px_rgba(0,0,0,0.08)] sm:shadow-card",
      )}
    >
      {/* ─── Image area ──────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-cream rounded-t-[1rem] sm:rounded-t-[1.75rem]">
        {imageSrc ? (
          <div className="w-full aspect-[1/1] sm:aspect-[4/5] overflow-hidden bg-cream">
            <img
              src={imageSrc}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="w-full aspect-square bg-cream flex items-center justify-center">
            <span className="text-foreground/20 text-4xl">🎂</span>
          </div>
        )}

        {/* Sold out badge */}
        {product.soldOut && (
          <div className="absolute left-2.5 bottom-2.5 sm:left-3 sm:bottom-3">
            <span className="px-2 py-0.5 rounded-md bg-foreground/90 backdrop-blur text-[9px] font-bold uppercase tracking-wider text-background shadow-card select-none">
              Sold out
            </span>
          </div>
        )}

        {/* Wishlist heart */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setLiked((v) => !v);
          }}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={liked}
          className="absolute right-2.5 top-2.5 sm:right-3 sm:top-3 grid place-items-center w-8 h-8 rounded-full bg-white/90 backdrop-blur shadow-card hover:scale-110 active:scale-95 transition-transform"
        >
          <Heart className={cn("w-3.5 h-3.5 transition-colors", liked ? "fill-blush text-blush" : "text-foreground/70")} />
        </button>
      </div>

      {/* ─── Info area ───────────────────────────────────────────────── */}
      <div className="p-3 sm:p-5 space-y-0.5 sm:space-y-1">
        {/* Name */}
        <h3 className="font-sans text-[13px] sm:text-sm font-semibold text-foreground leading-snug line-clamp-2">
          {product.name}{product.tag ? ` (${product.tag})` : ''}
        </h3>

        {/* Price */}
        <p className="text-[12px] sm:text-sm text-foreground/80 font-medium">
          ₱{product.price.toLocaleString("en-PH")} PHP
        </p>

        {/* Desktop-only: Add to cart row */}
        <div className="hidden sm:flex pt-2.5 mt-1 border-t border-border/50 items-center justify-between gap-2">
          <p className="text-[11px] text-foreground/45 font-medium truncate">
            {product.soldOut ? 'Unavailable' : product.category ?? 'Handmade'}
          </p>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={cn(
              "shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all btn-bounce-hover shadow-sm",
              isOutOfStock
                ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                : "bg-foreground text-background hover:bg-foreground/90",
            )}
          >
            {added ? (
              <Check className="w-3 h-3" />
            ) : (
              <ShoppingBag className="w-3 h-3" />
            )}
            {product.soldOut ? 'Sold out' : added ? 'Added!' : 'Add'}
          </button>
        </div>
      </div>
    </article>
  );
}
