import { useState } from "react";
import { Heart, ShoppingCart, Check } from "lucide-react";
import { useNavigate, Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/lib/currency-context";
import { useCart } from "@/lib/cart";
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

export function ProductCard({ product, formattedPrice }: { product: Product; formattedPrice?: string }) {
  const [liked, setLiked] = useState(false);
  const [addedState, setAddedState] = useState<"idle" | "adding" | "added">("idle");
  const { formatPrice } = useCurrency();
  const { addItem } = useCart();
  const navigate = useNavigate();

  const imageSrc = product.images?.[0] ?? null;
  const isSoldOut = product.soldOut || (product.stock_qty !== undefined && product.stock_qty !== null && product.stock_qty <= 0);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSoldOut || addedState !== "idle") return;

    setAddedState("adding");
    try {
      addItem(product, 1);
      setAddedState("added");
      setTimeout(() => setAddedState("idle"), 1400);
    } catch {
      setAddedState("idle");
    }
  };

  return (
    <>
    <article
      onClick={() => navigate({ to: `/shop/${product.id}` })}
      className="custom-product-card group"
    >
      {/* ─── Image area ──────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-cream aspect-square">
        {imageSrc ? (
          <div className="custom-card-media">
            <img
              src={imageSrc}
              alt={product.name}
              className="custom-card-img"
              loading="lazy"
              sizes="(min-width: 1200px) 449px, (min-width: 990px) calc((100vw - 120px) / 4), (min-width: 750px) calc((100vw - 60px) / 2), calc((100vw - 40px) / 2)"
            />
            {product.images?.[1] && (
              <img
                src={product.images[1]}
                alt=""
                className="custom-card-img"
                loading="lazy"
                sizes="(min-width: 1200px) 449px, (min-width: 990px) calc((100vw - 120px) / 4), (min-width: 750px) calc((100vw - 60px) / 2), calc((100vw - 40px) / 2)"
              />
            )}
          </div>
        ) : (
          <div className="custom-card-media flex items-center justify-center">
            <span className="text-foreground/20 text-4xl">🎂</span>
          </div>
        )}

        {/* Sold out badge */}
        {isSoldOut && (
          <div className="absolute left-2.5 bottom-2.5 sm:left-3 sm:bottom-3 z-10">
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
          className="absolute right-2.5 top-2.5 sm:right-3 sm:top-3 z-10 grid place-items-center w-8 h-8 rounded-full bg-white/90 backdrop-blur shadow-card hover:scale-110 active:scale-95 transition-transform"
        >
          <Heart className={cn("w-3.5 h-3.5 transition-colors", liked ? "fill-blush text-blush" : "text-foreground/70")} />
        </button>

        {/* ── Quick Add overlay — slides up from bottom on hover ── */}
        {!isSoldOut && (
          <div className="card-quick-add">
            <button
              type="button"
              onClick={handleQuickAdd}
              disabled={addedState !== "idle"}
              aria-label={`Add ${product.name} to cart`}
              className="card-quick-add-btn"
            >
              {addedState === "added" ? (
                <>
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
                  <span>Quick add</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* ─── Info area ───────────────────────────────────────────────── */}
      <div className="custom-card-info">
        {/* Name */}
        <h3 className="custom-card-heading">
          <Link
            to="/shop/$id"
            params={{ id: product.id }}
            id={`CardLink-${product.id}`}
            className="full-unstyled-link"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="line-clamp-2">
              {product.name}{product.tag ? ` (${product.tag})` : ''}
            </span>
          </Link>
        </h3>

        {/* Price */}
        <p className="custom-card-price">
          {formattedPrice ?? formatPrice(product.price)}
        </p>
      </div>
    </article>

    <style>{`
      .custom-product-card {
        border: 1px solid oklch(0 0 0 / 0.1);
        border-radius: 6px;
        background-color: #ffffff;
        overflow: hidden;
        position: relative;
        cursor: pointer;
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      .custom-product-card:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      }
      .custom-card-media {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: #f9f2e8;
      }
      .custom-card-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: opacity 500ms ease, transform 500ms ease;
      }
      .custom-card-media img:first-child:not(:only-child) {
        position: relative;
        z-index: 1;
      }
      .custom-card-media img + img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        opacity: 0;
      }
      .custom-product-card:hover .custom-card-img {
        transform: scale(1.05);
      }
      .custom-product-card:hover .custom-card-media img:first-child:not(:only-child) {
        opacity: 0;
      }
      .custom-product-card:hover .custom-card-media img + img {
        opacity: 1;
      }
      /* ── Quick Add ── */
      .card-quick-add {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 10;
        transform: translateY(100%);
        opacity: 0;
        transition: transform 280ms cubic-bezier(0.4, 0, 0.2, 1), opacity 280ms ease;
      }
      /* Desktop hover: slide up */
      @media (hover: hover) {
        .custom-product-card:hover .card-quick-add {
          transform: translateY(0);
          opacity: 1;
        }
      }
      /* Touch devices: always visible at bottom */
      @media (hover: none) {
        .card-quick-add {
          transform: translateY(0);
          opacity: 1;
        }
        /* No lift effect on touch */
        .custom-product-card:hover {
          transform: none;
        }
      }
      .card-quick-add-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        width: 100%;
        padding: 10px 12px;
        background-color: oklch(0.32 0.05 150);
        color: oklch(0.99 0.005 80);
        font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.04em;
        border: none;
        cursor: pointer;
        transition: background-color 180ms ease, opacity 180ms ease;
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
      }
      @media (min-width: 640px) {
        .card-quick-add-btn {
          font-size: 13px;
          padding: 11px 16px;
        }
      }
      .card-quick-add-btn:hover:not(:disabled) {
        background-color: oklch(0.28 0.06 150);
      }
      .card-quick-add-btn:active:not(:disabled) {
        background-color: oklch(0.25 0.06 150);
      }
      .card-quick-add-btn:disabled {
        background-color: oklch(0.55 0.09 150);
        cursor: default;
      }
      /* ── Card info ── */
      .custom-card-info {
        padding: 10px 9px 12px;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
      }
      @media (min-width: 640px) {
        .custom-card-info {
          padding: 13px 10px;
        }
      }
      @media (min-width: 750px) {
        .custom-card-info {
          padding: 17px 10px;
        }
      }
      .custom-card-heading {
        font-family: 'Quicksand', sans-serif;
        font-weight: 700;
        font-size: 12.5px;
        line-height: 1.25;
        color: #000000;
        margin: 0;
      }
      @media (min-width: 400px) {
        .custom-card-heading {
          font-size: 13.5px;
        }
      }
      @media (min-width: 750px) {
        .custom-card-heading {
          font-size: 15.6px;
        }
      }
      .custom-card-heading .full-unstyled-link {
        text-decoration: none;
        color: currentColor;
        display: block;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
        font-synthesis: none;
      }
      .custom-card-heading .full-unstyled-link::after {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 1;
      }
      .custom-card-heading .full-unstyled-link:focus {
        outline: none;
        box-shadow: none;
      }
      .custom-product-card:hover .custom-card-heading .full-unstyled-link {
        text-decoration: underline;
        text-underline-offset: 0.3rem;
      }
      .custom-card-price {
        font-family: 'Quicksand', sans-serif;
        font-weight: 500;
        font-size: 13px;
        line-height: 1.5;
        letter-spacing: 0.06rem;
        color: #000000;
        margin-top: 5px;
        margin-bottom: 0;
      }
      @media (min-width: 640px) {
        .custom-card-price {
          font-size: 15px;
          letter-spacing: 0.09rem;
          margin-top: 6px;
        }
      }
      @media (min-width: 750px) {
        .custom-card-price {
          font-size: 16px;
          letter-spacing: 0.1rem;
          margin-top: 7px;
        }
      }
    `}</style>
    </>
  );
}
