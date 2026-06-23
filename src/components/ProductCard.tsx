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
        "group relative rounded-3xl overflow-hidden shadow-card bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft focus-within:-translate-y-1.5 cursor-pointer",
      )}
    >
      <div className="relative overflow-hidden rounded-t-3xl">
        {imageSrc ? (
          <div className="w-full h-[24rem] sm:h-[22rem] md:h-[20rem] lg:h-[18rem] overflow-hidden">
            <img
              src={imageSrc}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ) : null}

        <div className="absolute left-4 bottom-4 flex flex-col gap-2">
          {product.soldOut && (
            <span className="px-3 py-1 rounded-md bg-foreground text-background text-xs font-semibold shadow-card">
              Sold out
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setLiked((v) => !v);
          }}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={liked}
          className="absolute right-4 top-4 grid place-items-center w-9 h-9 rounded-full bg-card/90 backdrop-blur shadow-card hover:scale-110 transition-transform"
        >
          <Heart className={cn("w-4 h-4 transition-colors", liked ? "fill-blush text-blush" : "text-foreground")} />
        </button>
      </div>

      <div className="p-5 bg-white rounded-b-3xl">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-base text-brown leading-tight">
            {product.name} {product.tag ? <span className="text-sm text-muted-foreground font-normal">({product.tag})</span> : null}
          </h3>
          <p className="text-sm text-primary font-semibold">₱{product.price.toLocaleString()}</p>
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="text-xs text-foreground/70">{product.soldOut ? 'Unavailable' : product.category ?? ''}</p>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition",
              isOutOfStock
                ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                : "bg-foreground text-background hover:bg-foreground/90",
            )}
          >
            {added ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <ShoppingBag className="w-3.5 h-3.5" />
            )}
            {product.soldOut ? 'Sold out' : added ? 'Added!' : 'Add to cart'}
          </button>
        </div>
      </div>
    </article>
  );
}
