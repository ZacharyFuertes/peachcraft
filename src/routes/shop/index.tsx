import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/ProductCard";
import { getAllProducts } from "@/lib/api/supabase.functions";
import { getSupabaseClient } from "@/lib/supabase";
import { useProductFilters } from "@/hooks/useProductFilters";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { useCurrency } from "@/lib/currency-context";
import { CURRENCIES } from "@/lib/currency";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductAvailabilityFilter, ProductSortOption } from "@/hooks/useProductFilters";
import type { Product } from "@/lib/supabase";

export const Route = createFileRoute("/shop/")(({
  head: () => ({
    meta: [
      { title: "Shop — Peach Craft" },
      { name: "description", content: "Browse handmade fake cakes, kawaii storage boxes and air-dry clay figures from Peach Craft." },
      { property: "og:title", content: "Shop — Peach Craft" },
      { property: "og:description", content: "Browse handmade fake cakes, kawaii storage boxes and clay figures." },
    ],
  }),
  component: ShopPage,
} as any));

const allProductsQuery = {
  queryKey: ["all-products"],
  queryFn: getAllProducts,
};

function ProductCardWrapper({ product, index }: { product: Product; index: number }) {
  const { ref, isVisible } = useRevealOnScroll();

  return (
    <div
      ref={ref}
      className={isVisible ? "animate-stagger-fade" : "opacity-0"}
      style={isVisible ? { animationDelay: `${index * 60}ms` } : undefined}
    >
      <ProductCard product={product} />
    </div>
  );
}

const AVAILABILITY_OPTIONS: { value: ProductAvailabilityFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "in-stock", label: "In stock" },
  { value: "out-of-stock", label: "Out of stock" },
];

const SORT_OPTIONS: { value: ProductSortOption; label: string }[] = [
  { value: "newest-first", label: "Featured" },
  { value: "name-asc", label: "Alphabetically, A–Z" },
  { value: "name-desc", label: "Alphabetically, Z–A" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
];

function ShopPage() {
  const [isAdminPreview, setIsAdminPreview] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const { data: all, isLoading, error } = useQuery(allProductsQuery);
  const { currency, setCurrency } = useCurrency();

  const { filteredProducts, productCount, setAvailabilityFilter, setSortOption, availabilityFilter, sortOption } =
    useProductFilters(all ?? []);

  const activeFilterCount = availabilityFilter !== "all" ? 1 : 0;

  useEffect(() => {
    let mounted = true;
    const supabase = getSupabaseClient();
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL ?? "";

    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      const userEmail = data.user?.email?.toLowerCase() ?? "";
      if (adminEmail && userEmail === adminEmail.toLowerCase()) {
        setIsAdminPreview(true);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="bg-white py-10 sm:py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        

        {isAdminPreview ? (
          <div className="mt-4 sm:mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={() => navigate({ to: "/admin" })}
              className="inline-flex items-center justify-center rounded-full bg-[var(--sage)] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[var(--foreground)] shadow-soft transition-all btn-bounce-hover"
            >
              Back to admin dashboard
            </button>
          </div>
        ) : null}

        {/* ── Filter / Sort bar ── */}
        {!isLoading && (
          <>
            <div className="shop-filterbar">
              {/* Row 1: Filter toggle + active chip (left) | Count (right) */}
              <div className="shop-filterbar-row">
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    id="shop-filter-toggle"
                    type="button"
                    onClick={() => setShowFilters((v) => !v)}
                    aria-expanded={showFilters}
                    className={cn("shop-filter-btn", showFilters && "shop-filter-btn--active")}
                  >
                    <SlidersHorizontal className="w-4 h-4 shrink-0" />
                    <span>Filter</span>
                    {activeFilterCount > 0 && (
                      <span className="shop-filter-count">{activeFilterCount}</span>
                    )}
                    <ChevronDown
                      className={cn(
                        "w-3.5 h-3.5 shrink-0 transition-transform duration-200",
                        showFilters ? "rotate-180" : "rotate-0"
                      )}
                    />
                  </button>

                  {/* Quick-clear active filter chip */}
                  {availabilityFilter !== "all" && (
                    <button
                      type="button"
                      onClick={() => setAvailabilityFilter("all")}
                      className="shop-active-filter-chip"
                    >
                      {AVAILABILITY_OPTIONS.find((o) => o.value === availabilityFilter)?.label}
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <span className="text-xs text-foreground/45 ml-auto shrink-0">
                  {productCount} {productCount === 1 ? "product" : "products"}
                </span>
              </div>

              {/* Row 2: Sort + Currency (full width on mobile, right-aligned on desktop) */}
              <div className="shop-filterbar-row shop-filterbar-row--controls">
                {/* Currency — hidden on mobile, shown sm+ (already in header menu) */}
                <select
                  id="shop-currency-select"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Parameters<typeof setCurrency>[0])}
                  className="shop-sort-select hidden sm:block"
                  aria-label="Select currency"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>{c.code}</option>
                  ))}
                </select>

                {/* Sort — full width on mobile */}
                <select
                  id="shop-sort-select"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as ProductSortOption)}
                  className="shop-sort-select shop-sort-select--full-mobile"
                  aria-label="Sort products"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* ── Expandable filter row ── */}
            {showFilters && (
              <div
                className="shop-filter-row"
                role="group"
                aria-label="Availability filter"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-foreground/40 mr-1 hidden sm:inline">
                  Availability
                </span>
                {AVAILABILITY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    id={`shop-filter-${opt.value}`}
                    onClick={() => setAvailabilityFilter(opt.value)}
                    className={cn(
                      "shop-filter-pill",
                      availabilityFilter === opt.value && "shop-filter-pill--active"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}

                <span className="text-sm text-foreground/50 sm:hidden ml-auto">
                  {productCount} {productCount === 1 ? "product" : "products"}
                </span>
              </div>
            )}
          </>
        )}

        {/* ── Product grid ── */}
        <ul id="product-grid" className="product-grid">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <li key={index} className="h-80 rounded-[10px] bg-[var(--card)] shadow-soft animate-pulse" />
            ))
          ) : error ? (
            <li className="full-width-item"><div className="rounded-[2rem] bg-[var(--card)] p-6 text-sm text-[#f87171] shadow-soft">
              {error instanceof Error ? error.message : "Unable to load products."}
            </div></li>
          ) : filteredProducts.length === 0 ? (
            <li className="full-width-item"><p className="text-center text-foreground/50 py-16">
              No products match the selected filters.
            </p></li>
          ) : filteredProducts.map((p, i) => (
            <li key={p.id}>
              <ProductCardWrapper
                product={p}
                index={i}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* ── Shop page scoped styles ── */}
      <style>{`
        /* ── Filter bar wrapper ──
           Two-row stacked layout on mobile, single row on desktop */
        .shop-filterbar {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 8px;
          padding-bottom: 14px;
          border-bottom: 1px solid oklch(0.92 0.02 80);
        }
        @media (min-width: 640px) {
          .shop-filterbar {
            flex-direction: row;
            align-items: center;
            gap: 10px;
          }
        }

        /* Each row within the filterbar */
        .shop-filterbar-row {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
        }
        @media (min-width: 640px) {
          .shop-filterbar-row {
            width: auto;
          }
          /* Controls row pushes to the right on desktop */
          .shop-filterbar-row--controls {
            margin-left: auto;
          }
        }

        /* ── Filter toggle button ── */
        .shop-filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border: 1.5px solid oklch(0.87 0.03 150);
          border-radius: 8px;
          background: transparent;
          font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: oklch(0.28 0.06 55);
          cursor: pointer;
          transition: background 200ms, border-color 200ms, color 200ms;
          white-space: nowrap;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
        .shop-filter-btn:hover {
          background: oklch(0.94 0.05 150);
          border-color: oklch(0.65 0.07 150);
        }
        .shop-filter-btn--active {
          background: oklch(0.32 0.05 150);
          border-color: oklch(0.32 0.05 150);
          color: oklch(0.99 0.005 80);
        }
        .shop-filter-btn--active:hover {
          background: oklch(0.28 0.05 150);
          border-color: oklch(0.28 0.05 150);
          color: oklch(0.99 0.005 80);
        }

        /* Active filter count badge */
        .shop-filter-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 18px;
          height: 18px;
          border-radius: 999px;
          background: oklch(0.85 0.09 20);
          color: oklch(0.32 0.1 25);
          font-size: 10px;
          font-weight: 800;
          padding: 0 4px;
        }

        /* Quick-clear chip for active filter */
        .shop-active-filter-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 10px 5px 12px;
          border-radius: 999px;
          background: oklch(0.94 0.05 150);
          border: 1.5px solid oklch(0.75 0.07 150);
          font-size: 12px;
          font-weight: 600;
          color: oklch(0.32 0.05 150);
          cursor: pointer;
          transition: background 180ms, opacity 180ms;
          white-space: nowrap;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
        .shop-active-filter-chip:hover {
          background: oklch(0.88 0.07 150);
        }

        /* ── Sort / Currency select ── */
        .shop-sort-select {
          appearance: none;
          -webkit-appearance: none;
          border: 1.5px solid oklch(0.87 0.03 150);
          border-radius: 8px;
          padding: 8px 30px 8px 11px;
          font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: oklch(0.28 0.06 55);
          background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 10px center;
          cursor: pointer;
          transition: border-color 200ms, background-color 200ms;
          white-space: nowrap;
          min-width: 0;
          touch-action: manipulation;
        }
        /* Sort takes full width on mobile so it's easy to tap */
        .shop-sort-select--full-mobile {
          flex: 1 1 0;
        }
        @media (min-width: 640px) {
          .shop-sort-select--full-mobile {
            flex: none;
          }
        }
        .shop-sort-select:hover {
          border-color: oklch(0.65 0.07 150);
          background-color: oklch(0.97 0.02 150);
        }
        .shop-sort-select:focus {
          outline: 2px solid oklch(0.58 0.08 150);
          outline-offset: 2px;
        }

        /* ── Expandable filter pill row ── */
        .shop-filter-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          padding: 10px 0 10px;
          border-bottom: 1px solid oklch(0.92 0.02 80);
          animation: shop-filter-row-open 200ms ease forwards;
        }
        @keyframes shop-filter-row-open {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Filter pills */
        .shop-filter-pill {
          padding: 7px 16px;
          border-radius: 999px;
          border: 1.5px solid oklch(0.87 0.04 80);
          font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: oklch(0.38 0.05 55);
          background: #fff;
          cursor: pointer;
          transition: background 180ms, border-color 180ms, color 180ms, transform 120ms;
          white-space: nowrap;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
        .shop-filter-pill:hover {
          background: oklch(0.94 0.05 150);
          border-color: oklch(0.7 0.07 150);
          color: oklch(0.28 0.05 150);
        }
        .shop-filter-pill--active {
          background: oklch(0.32 0.05 150);
          border-color: oklch(0.32 0.05 150);
          color: oklch(0.99 0.005 80);
        }
        .shop-filter-pill--active:hover {
          background: oklch(0.28 0.05 150);
        }
        .shop-filter-pill:active {
          transform: scale(0.96);
        }

        /* ── Product grid ── */
        .product-grid {
          display: flex;
          flex-wrap: wrap;
          margin-top: 16px;
          gap: 12px;
          font-family: Quicksand, sans-serif;
          font-size: 16px;
          font-weight: 500;
          line-height: 28.8px;
          letter-spacing: 0.6px;
          color: rgba(0, 0, 0, 0.75);
          list-style: none;
          padding: 0;
        }
        .product-grid > li {
          width: calc(50% - 6px);
        }
        @media (min-width: 1024px) {
          .product-grid > li {
            width: calc(25% - 9px);
          }
        }
        .product-grid > li.full-width-item {
          width: 100%;
        }
      `}</style>
    </section>
  );
}
