import { useState } from "react";
import { Eye, ShoppingBag, Heart, Check } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useCartToast } from "@/components/CartToast";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { items, addItem } = useCart();
  const images = product.images ?? [];
  const selectedImage = images[selectedImageIndex] ?? images[0] ?? null;
  const imageSrc = product.images?.[0] ?? null;
  const swatchColor = product.swatch ?? "#f7c8d9";
  const backgroundColor = swatchColor.startsWith("#")
    ? swatchColor
    : namedSwatchColors[swatchColor] ?? "#f7c8d9";
  const tagSwatch = swatchColor.startsWith('#') ? swatchColor : namedSwatchColors[swatchColor] ?? '#f7c8d9';
  const tagTextColor = hexContrastColor(tagSwatch);
  const existingCartItem = items.find((item) => item.product_id === product.id);
  const isOutOfStock = product.soldOut || (product.stock_qty != null && existingCartItem?.qty >= product.stock_qty);

  const [added, setAdded] = useState(false);
  const { notify } = useCartToast();

  const handleAddToCart = () => {
    try {
      addItem(product, 1);
      notify({
        productName: product.name,
        productImage: product.images?.[0] ?? null,
        qty: 1,
      });
      // Trigger button checkmark animation
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
        <Dialog>
          <DialogTrigger asChild>
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
          </DialogTrigger>

          <DialogContent className="max-w-[95vw] w-[min(95vw,80rem)] p-4 sm:p-6 bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 border border-pink-200 shadow-[0_45px_120px_-40px_rgba(219,39,119,0.35)]">
            <DialogHeader>
              <DialogTitle>{product.name}</DialogTitle>
            </DialogHeader>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
              <div className="overflow-hidden bg-[rgba(255,255,255,0.85)] shadow-soft">
                <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full max-h-[32rem] overflow-hidden bg-white p-4">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt={`${product.name} preview`}
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                      No image available
                    </div>
                  )}
                </div>
                {images.length > 1 ? (
                  <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 p-2 sm:p-4">
                    {images.map((src, index) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setSelectedImageIndex(index)}
                        className={cn(
                            "overflow-hidden rounded-none border transition-transform focus:outline-none focus:ring-2 focus:ring-primary",
                            index === selectedImageIndex
                              ? "border-primary shadow-soft"
                              : "border-border hover:-translate-y-0.5",
                          )}
                      >
                        <img
                          src={src}
                          alt={`${product.name} thumbnail ${index + 1}`}
                          className="h-16 w-full object-cover rounded-none"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="space-y-5">
                <div className="rounded-3xl border border-border bg-background p-5 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                      <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        {product.category ?? "Craft"}
                      </span>
                      <span className="text-lg font-semibold text-primary">₱{product.price.toLocaleString()}</span>
                    </div>

                    <h4 className="mt-4 text-sm font-semibold text-foreground">Product Description</h4>
                    <div className="product-description mt-2 text-sm leading-6 text-foreground/80 max-h-72 sm:max-h-[24rem] overflow-auto pr-3">
                      <p className="whitespace-pre-wrap">{product.description ?? "No additional details available for this product."}</p>
                    </div>
                </div>

                <div className="rounded-3xl border border-border bg-background p-5 shadow-sm space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Tag</h4>
                    <div className="mt-2">
                      <span
                        style={{ backgroundColor: tagSwatch, color: tagTextColor }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold"
                      >
                        {product.tag ?? 'Handmade'}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Availability</h4>
                    <p className="mt-2 text-sm text-foreground/75">
                      {product.soldOut ? "Sold out" : product.stock_qty != null ? `${product.stock_qty} left` : "In stock"}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                <div className="mt-4">
                  <DialogClose asChild>
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      disabled={isOutOfStock}
                      className={cn(
                        "w-full rounded-full px-4 py-3 text-sm font-semibold transition-colors",
                        "bg-blush text-blush-foreground hover:bg-blush/90",
                        "disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed",
                      )}
                    >
                      {product.soldOut ? "Sold out" : isOutOfStock ? "Max qty" : "Add to cart"}
                    </button>
                  </DialogClose>
                </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg text-brown">{product.name}</h3>
        <div className="mt-1 flex items-end justify-between gap-2">
          <p className="text-primary font-semibold">₱{product.price.toLocaleString()}</p>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            aria-label={isOutOfStock ? "Unable to add to cart" : `Add ${product.name} to cart`}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold",
              "bg-blush text-blush-foreground hover:bg-blush/90 transition-colors",
              "disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed",
              added && "animate-cart-pop",
            )}
          >
            {added ? (
              <Check className="w-3.5 h-3.5 stroke-[3] animate-scale-in" />
            ) : (
              <ShoppingBag className="w-3.5 h-3.5" />
            )}
            {product.soldOut ? "Sold out" : isOutOfStock ? "Max qty" : added ? "Added!" : "Add"}
          </button>
        </div>
      </div>
    </article>
  );
}
