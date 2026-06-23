import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Heart,
  ShoppingBag,
  Check,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Minus,
  Plus,
  Share2,
  Truck,
  Package,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart";
import { useCartToast } from "@/components/CartToast";
import { getProductById } from "@/lib/api/supabase.functions";

export const Route = createFileRoute("/shop/$id")({
  head: () => ({
    meta: [
      { title: "Product — Peach Craft" },
      {
        name: "description",
        content:
          "View product details, pricing, and availability from Peach Craft.",
      },
    ],
  }),
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const navigate = useNavigate();
  const { id } = Route.useParams();
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById({ data: { id } }),
  });

  const [liked, setLiked] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const { items, addItem } = useCart();
  const { notify } = useCartToast();

  const handleAddToCart = () => {
    if (!product) return;

    try {
      addItem(product, quantity);
      notify({
        productName: product.name,
        productImage: product.images?.[0] ?? null,
        qty: quantity,
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 1400);
    } catch (err) {
      if (err instanceof Error) {
        window.alert(err.message);
      }
    }
  };

  const images = product?.images ?? [];
  const selectedImage = images[selectedImageIndex] ?? images[0] ?? null;
  const existingCartItem = items.find(
    (item) => item.product_id === product?.id,
  );
  const isOutOfStock =
    product?.soldOut ||
    (product?.stock_qty != null && product.stock_qty <= 0) ||
    (product?.stock_qty != null &&
      existingCartItem &&
      existingCartItem.qty >= product.stock_qty);

  const maxQty = product?.stock_qty ?? 25;
  const canIncrement = quantity < maxQty;
  const canDecrement = quantity > 1;

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto" />
          <p className="text-foreground/60 text-sm">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-red-500 text-sm">
            {error instanceof Error ? error.message : "Product not found"}
          </p>
          <button
            onClick={() => navigate({ to: "/shop" })}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition hover:bg-foreground/90"
          >
            <ChevronLeft className="w-4 h-4" /> Back to shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb / back bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <button
          onClick={() => navigate({ to: "/shop" })}
          className="inline-flex items-center gap-1.5 text-sm text-foreground/60 hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to shop</span>
        </button>
      </div>

      {/* Main product section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
          {/* ═══════════ LEFT: Image Gallery ═══════════ */}
          <div className="space-y-4">
            {/* Hero image */}
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-cream">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-cream">
                  <Package className="w-16 h-16 text-foreground/20" />
                </div>
              )}

              {/* Wishlist button overlay */}
              <button
                type="button"
                onClick={() => setLiked((v) => !v)}
                aria-label={
                  liked ? "Remove from wishlist" : "Add to wishlist"
                }
                className="absolute right-4 top-4 grid place-items-center w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-card hover:scale-110 transition-all"
              >
                <Heart
                  className={cn(
                    "w-5 h-5 transition-colors",
                    liked
                      ? "fill-blush text-blush"
                      : "text-foreground/60",
                  )}
                />
              </button>

              {/* Sold out overlay badge */}
              {product.soldOut && (
                <div className="absolute left-4 bottom-4">
                  <span className="px-4 py-1.5 rounded-full bg-foreground text-background text-xs font-bold uppercase tracking-wider">
                    Sold out
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail grid */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((src, index) => (
                  <button
                    key={src}
                    onClick={() => setSelectedImageIndex(index)}
                    className={cn(
                      "relative aspect-square overflow-hidden rounded-xl transition-all duration-200",
                      index === selectedImageIndex
                        ? "ring-2 ring-foreground ring-offset-2"
                        : "ring-1 ring-border hover:ring-foreground/40 opacity-70 hover:opacity-100",
                    )}
                  >
                    <img
                      src={src}
                      alt={`${product.name} view ${index + 1}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ═══════════ RIGHT: Product Details ═══════════ */}
          <div className="flex flex-col lg:pt-2">
            {/* Product name */}
            <h1 className="font-display text-3xl sm:text-4xl text-brown leading-tight">
              {product.name}
              {product.tag && (
                <span className="ml-2 text-lg text-muted-foreground font-normal">
                  — {product.tag}
                </span>
              )}
            </h1>

            {/* Price row */}
            <div className="mt-4 flex items-center gap-3 flex-wrap">
              <p
                className={cn(
                  "text-2xl font-semibold",
                  product.soldOut
                    ? "text-foreground/40 line-through"
                    : "text-foreground",
                )}
              >
                ₱{product.price.toLocaleString("en-PH", { minimumFractionDigits: 2 })} PHP
              </p>
              {product.soldOut && (
                <span className="rounded-full bg-red-100 text-red-700 text-xs font-bold px-3 py-1 uppercase tracking-wide">
                  Sold out
                </span>
              )}
            </div>

            {/* Tax / shipping note */}
            <p className="mt-1.5 text-xs text-foreground/50">
              Tax included.{" "}
              <button
                onClick={() => navigate({ to: "/shipping-policy" })}
                className="underline underline-offset-2 hover:text-foreground/70 transition-colors"
              >
                Shipping
              </button>{" "}
              calculated at checkout.
            </p>

            {/* Divider */}
            <div className="mt-6 border-t border-border" />

            {/* Quantity selector */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground/60 mb-3">
                Quantity
              </p>
              <div className="inline-flex items-center rounded-lg border border-border">
                <button
                  type="button"
                  onClick={() => canDecrement && setQuantity((q) => q - 1)}
                  disabled={!canDecrement}
                  aria-label="Decrease quantity"
                  className="grid place-items-center w-11 h-11 text-foreground/60 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-12 text-center text-sm font-semibold text-foreground tabular-nums select-none">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => canIncrement && setQuantity((q) => q + 1)}
                  disabled={!canIncrement}
                  aria-label="Increase quantity"
                  className="grid place-items-center w-11 h-11 text-foreground/60 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              {product.stock_qty != null && product.stock_qty > 0 && product.stock_qty <= 10 && (
                <p className="mt-2 text-xs text-amber-600 font-medium">
                  Only {product.stock_qty} left in stock
                </p>
              )}
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex flex-col gap-3">
              {/* Add to cart / Sold out */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={cn(
                  "w-full flex items-center justify-center gap-2.5 rounded-lg px-6 py-4 text-sm font-semibold uppercase tracking-wider transition-all duration-200",
                  isOutOfStock
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                    : "bg-white text-foreground border border-foreground hover:bg-foreground hover:text-white",
                )}
              >
                {added ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <ShoppingBag className="h-4 w-4" />
                )}
                {product.soldOut
                  ? "Sold out"
                  : isOutOfStock
                    ? "Max quantity reached"
                    : added
                      ? "Added to cart!"
                      : "Add to cart"}
              </button>

              {/* Buy now button */}
              {!product.soldOut && !isOutOfStock && (
                <button
                  type="button"
                  onClick={() => {
                    handleAddToCart();
                    navigate({ to: "/checkout" });
                  }}
                  className="w-full flex items-center justify-center gap-2.5 rounded-lg px-6 py-4 text-sm font-semibold uppercase tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
                >
                  Buy it now
                </button>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="mt-8">
                <p className="text-sm leading-7 text-foreground/70 whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}

            {/* Product info badges */}
            <div className="mt-8 space-y-4">
              {/* Category */}
              {product.category && (
                <div className="flex items-start gap-3">
                  <Package className="w-4 h-4 text-foreground/40 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground/50">
                      Category
                    </p>
                    <p className="mt-0.5 text-sm text-foreground/80">
                      {product.category}
                    </p>
                  </div>
                </div>
              )}

              {/* Availability */}
              <div className="flex items-start gap-3">
                <Shield className="w-4 h-4 text-foreground/40 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground/50">
                    Availability
                  </p>
                  <p className="mt-0.5 text-sm text-foreground/80">
                    {product.soldOut
                      ? "Currently sold out"
                      : product.stock_qty != null
                        ? `${product.stock_qty} available`
                        : "In stock"}
                  </p>
                </div>
              </div>
            </div>

            {/* Estimated shipping time */}
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex items-start gap-3">
                <Truck className="w-4 h-4 text-foreground/40 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground/50 underline underline-offset-2">
                    Estimated shipping time
                  </p>
                  <div className="mt-2 space-y-1 text-sm text-foreground/70">
                    <p>Philippines: 4-6 business days</p>
                    <p>Other Countries: 14-20 business days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Kindly note */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground/50 underline underline-offset-2 mb-2">
                Kindly Note:
              </p>
              <div className="space-y-2 text-xs text-foreground/50 leading-5">
                <p>
                  *Actual colour may vary slightly from photos due to lighting
                  &amp; screen settings.
                </p>
                <p>
                  *Shipping times are estimated only &amp; might be subject to
                  delays due to unforeseen circumstances.
                </p>
              </div>
            </div>

            {/* Share button */}
            <div className="mt-6 pt-6 border-t border-border">
              <button
                type="button"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: product.name,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
                className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

            {/* Collapsible sections */}
            <div className="mt-4 border-t border-border divide-y divide-border">
              {/* Materials */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection("materials")}
                  className="w-full flex items-center justify-between py-4 text-sm font-semibold text-foreground hover:text-foreground/80 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Materials
                  </span>
                  {openSection === "materials" ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {openSection === "materials" && (
                  <div className="pb-4 text-sm text-foreground/60 leading-6 animate-in fade-in slide-in-from-top-1 duration-200">
                    <p>Handcrafted with premium materials. Each piece is unique and made with love.</p>
                  </div>
                )}
              </div>

              {/* Shipping & Returns */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection("shipping")}
                  className="w-full flex items-center justify-between py-4 text-sm font-semibold text-foreground hover:text-foreground/80 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    Shipping &amp; Returns
                  </span>
                  {openSection === "shipping" ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {openSection === "shipping" && (
                  <div className="pb-4 text-sm text-foreground/60 leading-6 animate-in fade-in slide-in-from-top-1 duration-200">
                    <p>
                      We ship within 1-3 business days. Standard delivery takes 4-6 business days within the Philippines and 14-20 business days internationally.
                    </p>
                    <p className="mt-2">
                      Returns are accepted within 7 days of delivery for unused items in original packaging.
                    </p>
                  </div>
                )}
              </div>

              {/* Care Instructions */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection("care")}
                  className="w-full flex items-center justify-between py-4 text-sm font-semibold text-foreground hover:text-foreground/80 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Care Instructions
                  </span>
                  {openSection === "care" ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {openSection === "care" && (
                  <div className="pb-4 text-sm text-foreground/60 leading-6 animate-in fade-in slide-in-from-top-1 duration-200">
                    <p>Handle with care. Keep away from water and direct sunlight. Clean gently with a dry soft cloth.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
