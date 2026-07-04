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
      className="custom-product-card group"
    >
      {/* ─── Image area ──────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-cream">
        {imageSrc ? (
          <div className="custom-card-media">
            <img
              src={imageSrc}
              alt={product.name}
              className="custom-card-img"
              loading="lazy"
            />
            {product.images?.[1] && (
              <img
                src={product.images[1]}
                alt=""
                className="custom-card-img"
                loading="lazy"
              />
            )}
          </div>
        ) : (
          <div className="custom-card-media flex items-center justify-center">
            <span className="text-foreground/20 text-4xl">🎂</span>
          </div>
        )}

        {/* Sold out badge */}
        {product.soldOut && (
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
          ₱{product.price.toLocaleString("en-PH")} PHP
        </p>
      </div>
    </article>

    <style>{`
      .custom-product-card {
        border: none;
        border-radius: 10px;
        box-shadow: 0 4px 5px rgba(0, 0, 0, 0.15);
        background-color: #ffffff;
        overflow: hidden;
        position: relative;
        cursor: pointer;
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      .custom-card-media {
        width: 100%;
        aspect-ratio: 1 / 1;
        overflow: hidden;
        background-color: #f9f2e8;
        position: relative;
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
        transform: scale(1.03);
      }
      .custom-product-card:hover .custom-card-media img:first-child:not(:only-child) {
        opacity: 0;
      }
      .custom-product-card:hover .custom-card-media img + img {
        opacity: 1;
      }
      .custom-card-info {
        padding: 13px 10px;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
      }
      @media (min-width: 750px) {
        .custom-card-info {
          padding: 17px 10px;
        }
      }
      .custom-card-heading {
        font-family: 'Quicksand', sans-serif;
        font-weight: 700;
        font-size: 14.4px;
        line-height: 1.25;
        color: #000000;
        margin: 0;
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
        font-size: 16px;
        line-height: 1.5;
        letter-spacing: 0.1rem;
        color: #000000;
        margin-top: 7px;
        margin-bottom: 0;
      }
    `}</style>
    </>
  );
}
