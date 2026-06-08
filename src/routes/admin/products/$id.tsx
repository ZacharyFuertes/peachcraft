import { useEffect, useState } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ProductForm, type ProductFormData } from "@/components/admin/ProductForm";
import { getProductById, updateProduct, type ProductRow } from "@/lib/api/supabase.functions";

export const Route = createFileRoute("/admin/products/$id")({
  component: EditProductPage,
});

function EditProductPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const productId = params.id;

  const { data, isLoading, error: loadError } = useQuery<ProductRow | null>({
    queryKey: ["admin-product", productId],
    queryFn: () => getProductById({ data: { id: productId! } }),
    enabled: Boolean(productId),
    retry: false,
  });

  useEffect(() => {
    if (loadError) {
      const message = loadError instanceof Error ? loadError.message : "Unable to load product.";
      if (message.includes("not found")) {
        navigate("/admin/products");
      }
      setError(message);
    }
  }, [loadError, navigate]);

  const handleUpdate = async (formData: ProductFormData, accessToken?: string) => {
    setError(null);
    setIsSaving(true);

    try {
      await updateProduct({ data: { id: params.id!, ...formData, accessToken } });
      navigate("/admin/products?updated=true");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update product.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!productId) {
    return (
      <div className="space-y-6 rounded-3xl bg-[var(--card)] p-8 shadow-soft">
        <p className="text-sm text-[#f87171]">Invalid product link. Please go back to the product list.</p>
      </div>
    );
  }

  if (isLoading) {
    return <div className="h-96 rounded-3xl bg-[var(--card)] shadow-soft" />;
  }

  if (loadError) {
    return (
      <div className="space-y-6 rounded-3xl bg-[var(--card)] p-8 shadow-soft">
        <p className="text-sm text-[#f87171]">{error ?? "Unable to load this product."}</p>
      </div>
    );
  }

  if (!data) {
    return <p className="text-sm text-[#f87171]">Product not found.</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-[var(--foreground)]/70">Products</p>
        <h1 className="mt-2 text-4xl font-semibold text-[var(--foreground)]">Edit product</h1>
      </div>
      {error && <div className="rounded-3xl bg-[#f87171]/10 p-4 text-sm text-[#991b1b]">{error}</div>}
      <div className="rounded-3xl bg-[var(--card)] p-8 shadow-soft">
        <ProductForm initialData={data} onSubmit={handleUpdate} isLoading={isSaving} />
      </div>
    </div>
  );
}
