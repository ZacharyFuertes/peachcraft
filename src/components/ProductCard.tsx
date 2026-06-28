import { useState } from "react";
import { Heart } from "lucide-react";
import { useNavigate, Link } from "@tanstack/react-router";
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
  const navigate = useNavigate();

  const imageSrc = product.images?.[0] ?? null;

  return (
    <>
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
        <h3 className="card__heading">
          <Link
            to="/shop/$id"
            params={{ id: product.id }}
            id={`CardLink-${product.id}`}
            className="full-unstyled-link"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="line-clamp-2" style={{ fontFamily: "'Quicksand', sans-serif", fontSize: "15px", lineHeight: "19.5px", fontWeight: 500, letterSpacing: "0.6px", color: "#000000", opacity: 0.85 }}>
              {product.name}{product.tag ? ` (${product.tag})` : ''}
            </span>
          </Link>
        </h3>

        {/* Price */}
        <p className="card__price" style={{ fontFamily: "'Quicksand', sans-serif", fontSize: "15px", lineHeight: "1.5", fontWeight: 500, color: "#000000" }}>
          ₱{product.price.toLocaleString("en-PH")} PHP
        </p>
      </div>
    </article>

    <style>{`
      .card__heading {
        font-family: 'Quicksand', sans-serif;
        margin: 0;
      }
      .card__heading .full-unstyled-link {
        text-decoration: none;
        color: currentColor;
        display: block;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
        font-synthesis: none;
      }
      .card__heading .full-unstyled-link::after {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 1;
      }
      .card__heading .full-unstyled-link:focus {
        outline: none;
        box-shadow: none;
      }
      article:hover .card__heading .full-unstyled-link {
        text-decoration: underline;
        text-underline-offset: 0.3rem;
      }
      @media (min-width: 990px) {
        .card__heading .full-unstyled-link {
          font-size: 15px;
        }
      }
      .card__price {
        font-family: 'Quicksand', sans-serif;
      }
    `}</style>
    </>
  );
}
