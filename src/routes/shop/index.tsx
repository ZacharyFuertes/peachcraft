import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/ProductCard";
import { getAllProducts } from "@/lib/api/supabase.functions";
import { getSupabaseClient } from "@/lib/supabase";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: "Shop — Peach Craft" },
      { name: "description", content: "Browse handmade fake cakes, kawaii storage boxes and air-dry clay figures from Peach Craft." },
      { property: "og:title", content: "Shop — Peach Craft" },
      { property: "og:description", content: "Browse handmade fake cakes, kawaii storage boxes and clay figures." },
    ],
  }),
  component: ShopPage,
});

const allProductsQuery = {
  queryKey: ["all-products"],
  queryFn: getAllProducts,
};

function ShopPage() {
  const [isAdminPreview, setIsAdminPreview] = useState(false);
  const navigate = useNavigate();
  const { data: all, isLoading, error } = useQuery(allProductsQuery);

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
    <section className="bg-cream py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <header className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">The Shop</span>
          <h1 className="mt-3 font-display text-5xl text-brown">All Crafts</h1>
          <p className="mt-3 text-foreground/75">
            Sculpted one piece at a time. Restocks happen every Friday — sign up for alerts so you never miss a drop.
          </p>
        </header>

        {isAdminPreview ? (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={() => navigate({ to: "/admin" })}
              className="inline-flex items-center justify-center rounded-full bg-[var(--sage)] px-5 py-2 text-sm font-semibold text-[var(--foreground)] shadow-soft transition hover:bg-[var(--sage-deep)]"
            >
              Back to admin dashboard
            </button>
          </div>
        ) : null}

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-80 rounded-3xl bg-[var(--card)] shadow-soft" />
            ))
          ) : error ? (
            <div className="rounded-3xl bg-[var(--card)] p-6 text-sm text-[#f87171] shadow-soft">{error instanceof Error ? error.message : "Unable to load products."}</div>
          ) : (all ?? []).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
