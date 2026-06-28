import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getSupabaseClient } from "@/lib/supabase";
import { getAdminProducts, toggleProductActive, deleteProduct, type ProductRow } from "@/lib/api/supabase.functions";
import { ProductsTable } from "@/components/admin/products/ProductsTable";

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
    } catch (error) {
      // error handled silently or could surface via toast
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
    } catch (error) {
      // error handled silently
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
