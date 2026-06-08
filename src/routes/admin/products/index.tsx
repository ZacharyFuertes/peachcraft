import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { getSupabaseClient } from "@/lib/supabase";
import { getAdminProducts, toggleProductActive, deleteProduct, type ProductRow } from "@/lib/api/supabase.functions";

export const Route = createFileRoute("/admin/products/")({
  component: AdminProductsPage,
});

function AdminProductsPage() {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery<ProductRow[]>({
    queryKey: ["admin-products"],
    queryFn: getAdminProducts,
  });
  const [activeId, setActiveId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const getAccessToken = async () => {
    const supabase = getSupabaseClient();
    const { data } = await supabase.auth.getSession();
    return data?.session?.access_token;
  };
  const handleToggle = async (product: ProductRow) => {
    setActionError(null);
    setActiveId(product.id);

    try {
      const accessToken = await getAccessToken();
      await toggleProductActive({ data: { id: product.id, is_active: !Boolean(product.is_active), accessToken } });
      await queryClient.invalidateQueries(["admin-products"]);
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Unable to update product.");
    } finally {
      setActiveId(null);
    }
  };

  const handleDelete = async (product: ProductRow) => {
    if (!window.confirm("Delete this product? This action cannot be undone.")) {
      return;
    }

    setActionError(null);
    setActiveId(product.id);

    try {
      const accessToken = await getAccessToken();
      await deleteProduct({ data: { id: product.id, accessToken } });
      await queryClient.invalidateQueries(["admin-products"]);
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Unable to delete product.");
    } finally {
      setActiveId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-[var(--foreground)]/70">Products</p>
          <h1 className="mt-2 text-4xl font-semibold text-[var(--foreground)]">Manage products</h1>
        </div>
        <Link
          to="/admin/products/new"
          className="inline-flex items-center justify-center rounded-full bg-[var(--sage)] px-6 py-3 text-sm font-semibold text-[var(--foreground)] shadow-soft hover:bg-[var(--sage-deep)]"
        >
          Add product
        </Link>
      </div>

      {actionError && <div className="rounded-3xl bg-[#f87171]/10 p-4 text-sm text-[#991b1b]">{actionError}</div>}

      {isLoading ? (
        <div className="grid gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-24 rounded-3xl bg-[var(--card)] shadow-soft" />
          ))}
        </div>
      ) : error ? (
        <p className="rounded-3xl bg-[var(--card)] p-6 text-sm text-[#f87171]">{error instanceof Error ? error.message : "Could not load products."}</p>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-soft">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--background)] text-[var(--foreground)]/75">
              <tr>
                <th className="px-5 py-4">Product</th>
                <th className="px-5 py-4">Price</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Stock</th>
                <th className="px-5 py-4">Active</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((product) => (
                <tr key={product.id} className="border-t border-[var(--border)]">
                  <td className="px-5 py-4 font-semibold text-[var(--foreground)]">{product.name}</td>
                  <td className="px-5 py-4 text-[var(--foreground)]">₱{product.price.toLocaleString("en-PH")}</td>
                  <td className="px-5 py-4 text-[var(--foreground)]/80">{product.category ?? "—"}</td>
                  <td className="px-5 py-4">
                    <span className={cn(
                      "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
                      product.stock_qty === 0 ? "bg-[#f87171] text-[var(--background)]" : "bg-[var(--sage)] text-[var(--foreground)]",
                    )}>
                      {product.stock_qty ?? 0}
                    </span>
                  </td>
                  <td className="px-5 py-4">{product.is_active ? "Yes" : "No"}</td>
                  <td className="px-5 py-4 space-x-2">
                    <Link
                      to={`/admin/products/${product.id}`}
                      className="inline-flex rounded-full bg-[var(--background)] px-3 py-2 text-xs font-semibold text-[var(--foreground)] shadow-soft hover:bg-[var(--foreground)]/10"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleToggle(product)}
                      disabled={activeId === product.id}
                      className="inline-flex rounded-full bg-[var(--sage)] px-3 py-2 text-xs font-semibold text-[var(--foreground)] shadow-soft hover:bg-[var(--sage-deep)] disabled:opacity-50"
                    >
                      {product.is_active ? "Disable" : "Enable"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(product)}
                      disabled={activeId === product.id}
                      className="inline-flex rounded-full bg-[#f87171] px-3 py-2 text-xs font-semibold text-[var(--background)] shadow-soft hover:bg-[#ef4444] disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
