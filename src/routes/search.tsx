import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";
import { searchProducts } from "@/lib/api/search.functions";
import { Search, Sparkles, SlidersHorizontal, Package, Tag, CornerDownRight, ArrowLeft } from "lucide-react";
import type { Product } from "@/lib/supabase";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      q: (search.q as string) || "",
    };
  },
  head: () => ({
    meta: [
      { title: "Search Results — Peach Craft" },
      {
        name: "description",
        content: "Search results for handmade crafts, fake cakes, and clay figures on Peach Craft.",
      },
    ],
  }),
  component: SearchResultsPage,
});

function SearchResultsPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState(q);

  // Sync state if search params change
  useEffect(() => {
    setSearchInput(q);
  }, [q]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["search-products", q],
    queryFn: () => searchProducts({ data: { q } }),
  });

  const products = data?.products ?? [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    navigate({
      to: "/search",
      search: { q: searchInput.trim() },
    });
  };

  return (
    <section className="bg-cream min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back and Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to shop</span>
          </Link>
        </div>

        {/* Header Title */}
        <header className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-xs font-bold uppercase tracking-wider text-primary">
            <Search className="h-3 w-3" /> E-commerce Search
          </span>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl text-brown">
            {q ? (
              <>
                Search Results for <span className="text-primary">"{q}"</span>
              </>
            ) : (
              "Search Peach Craft"
            )}
          </h1>
          <p className="mt-2 text-foreground/60">
            {products.length > 0
              ? `Found ${products.length} product${products.length === 1 ? "" : "s"} ranked by relevance and sales popularity.`
              : q
                ? "We couldn't find matches for your search, but you can refine it below."
                : "Type a keyword to discover cute handmade clay figures, storage boxes, and fake cakes."}
          </p>
        </header>

        {/* Refining Search Input bar */}
        <div className="mt-8 max-w-xl bg-card rounded-3xl p-4 shadow-card border border-border">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search products, brands, or categories..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-border focus:border-primary focus:outline-none text-sm bg-background/50"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-soft hover:shadow-card hover:-translate-y-0.5 active:translate-y-0 transition-all shrink-0"
            >
              Search
            </button>
          </form>
        </div>

        {/* Search Results Display */}
        <div className="mt-12">
          {isLoading ? (
            // Skeleton Loader
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-[28rem] rounded-3xl bg-[var(--card)] animate-pulse shadow-soft" />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-3xl bg-red-50 p-6 text-sm text-red-600 shadow-soft">
              {error instanceof Error ? error.message : "An error occurred during search. Please try again."}
            </div>
          ) : products.length === 0 ? (
            // Empty State
            <div className="bg-card rounded-3xl p-12 text-center shadow-card max-w-2xl mx-auto space-y-6">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto text-foreground/45">
                <Search className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-2xl text-brown">No Matches Found</h3>
                <p className="text-foreground/60 max-w-md mx-auto text-sm leading-relaxed">
                  Try checking your spelling, using more general keywords (e.g. <strong>cake</strong> instead of <strong>strawberry dream</strong>), or exploring the popular categories below.
                </p>
              </div>

              <div className="pt-4 border-t border-border space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-foreground/40 text-left">
                  Try These Collections
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Accessories", "Necklaces", "Earrings", "Rings", "Bracelets"].map((cat) => (
                    <Link
                      key={cat}
                      to="/search"
                      search={{ q: cat }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-accent hover:bg-primary hover:text-primary-foreground transition-all"
                    >
                      <Package className="h-3 w-3" />
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-center gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:shadow-card hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                  Browse All Crafts
                </Link>
              </div>
            </div>
          ) : (
            // Results Grid
            <div className="space-y-6">
              {/* Scoring Info Header */}
              <div className="flex items-center justify-between text-xs text-foreground/50 border-b pb-4">
                <span className="flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5 text-primary" /> Sorted by text relevance + popularity boost
                </span>
                <span>Showing {products.length} result{products.length === 1 ? "" : "s"}</span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 animate-fade-in">
                {products.map((p) => {
                  const typedProduct = p as Product & { brand: string; searchScore: number };
                  return (
                    <div key={p.id} className="relative group">
                      {/* Badge for Score / Brand */}
                      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
                        <span className="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur text-[10px] font-bold text-brown uppercase tracking-wider shadow-card select-none">
                          {typedProduct.brand}
                        </span>
                        {typedProduct.searchScore > 1 && (
                          <span className="px-2 py-0.5 rounded bg-primary text-primary-foreground text-[8px] font-bold uppercase tracking-wider shadow-card w-fit select-none">
                            Match Score: {typedProduct.searchScore}
                          </span>
                        )}
                      </div>
                      <ProductCard product={p} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
