import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { ProductForm, type ProductFormData } from "@/components/admin/ProductForm";
import { createProduct } from "@/lib/api/supabase.functions";
import { Alert } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/products/new")({
  component: NewProductPage,
});

function NewProductPage() {
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const navigate = useNavigate();

  const handleCreate = async (data: ProductFormData, accessToken?: string) => {
    setError(null);
    setIsSaving(true);

    try {
      await createProduct({ data: { ...data, accessToken } });
      setShowSuccessDialog(true);
    } catch (err) {
      let message = "Failed to create product.";

      if (err instanceof Error) {
        const errMsg = err.message;
        if (errMsg.includes('"code":"too_small"') || errMsg.includes('"issues"')) {
          message = "Please fill in all required fields before saving this product.";
        } else {
          message = errMsg;
        }
      } else if (typeof err === "string") {
        message = err.includes('"code":"too_small"') ? "Please fill in all required fields before saving this product." : err;
      }

      setError(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddAnother = () => {
    setShowSuccessDialog(false);
    setFormKey((prev) => prev + 1);
  };

  const handleGoToDashboard = () => {
    navigate({ to: "/admin" });
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.25em] text-[var(--foreground)]/70">Products</p>
        <h1 className="mt-2 text-4xl font-semibold text-[var(--foreground)]">New product</h1>
      </div>
      {error && <div className="rounded-3xl bg-[#f87171]/10 p-4 text-sm text-[#991b1b]">{error}</div>}
      {showSuccessDialog && (
        <Alert variant="success" className="rounded-3xl text-sm">
          Product added successfully.
        </Alert>
      )}
      <ProductForm key={formKey} onSubmit={handleCreate} isLoading={isSaving} />

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Product added</DialogTitle>
            <DialogDescription>
              Your product was successfully added. Would you like to add another item or return to the dashboard?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              type="button"
              onClick={handleAddAnother}
              className="inline-flex items-center justify-center rounded-full bg-[var(--sage)] px-5 py-2 text-sm font-semibold text-[var(--foreground)] shadow-soft transition hover:bg-[var(--sage-deep)]"
            >
              Add another
            </button>
            <button
              type="button"
              onClick={handleGoToDashboard}
              className="inline-flex items-center justify-center rounded-full bg-muted px-5 py-2 text-sm font-semibold text-muted-foreground shadow-soft transition hover:bg-muted/90"
            >
              Go to dashboard
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
