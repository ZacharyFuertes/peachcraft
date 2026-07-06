import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { getSupabaseClient } from "@/lib/supabase";
import { getAdminProducts, toggleProductActive, deleteProduct, type ProductRow } from "@/lib/api/supabase.functions";
import { ProductsTable } from "@/components/admin/products/ProductsTable";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/products/")({
  component: AdminProductsPage,
  validateSearch: (search: Record<string, unknown>): { updated?: "true" } => ({
    updated: search.updated === "true" ? ("true" as const) : undefined,
  }),
});

function AdminProductsPage() {
  const queryClient = useQueryClient();
  const search = useSearch({ from: Route.id });
  const { data, isLoading, error } = useQuery<ProductRow[]>({
    queryKey: ["admin-products"],
    queryFn: getAdminProducts,
  });
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (search.updated === "true") {
      toast.success("Product updated successfully");
    }
  }, [search.updated]);

  const getAccessToken = async () => {
    const supabase = getSupabaseClient();
    const { data } = await supabase.auth.getSession();
    return data?.session?.access_token;
  };
  const handleToggle = async (product: ProductRow) => {
    setActiveId(product.id);
    try {
      const accessToken = await getAccessToken();
      await toggleProductActive({ data: { id: product.id, is_active: !Boolean(product.is_active), accessToken } });
      await queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success(product.is_active ? "Product deactivated" : "Product activated");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update product");
    } finally {
      setActiveId(null);
    }
  };
  const handleDelete = async (product: ProductRow) => {
    if (!window.confirm("Delete this product? This action cannot be undone.")) {
      return;
    }
    setActiveId(product.id);
    try {
      const accessToken = await getAccessToken();
      await deleteProduct({ data: { id: product.id, accessToken } });
      await queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Product deleted");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete product.");
    } finally {
      setActiveId(null);
    }
  };

  return (
    <ProductsTable
      data={data}
      isLoading={isLoading}
      error={error}
      activeId={activeId}
      onToggle={handleToggle}
      onDelete={handleDelete}
    />
  );
}
