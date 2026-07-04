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
    <section className="bg-white py-10 sm:py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8 sm:mb-12">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-brown font-bold tracking-tight">Products</h1>
        </header>

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

        <div className="mt-4 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-80 rounded-[2rem] bg-[var(--card)] shadow-soft animate-pulse" />
            ))
          ) : error ? (
            <div className="rounded-[2rem] bg-[var(--card)] p-6 text-sm text-[#f87171] shadow-soft col-span-full">
              {error instanceof Error ? error.message : "Unable to load products."}
            </div>
          ) : (all ?? []).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
