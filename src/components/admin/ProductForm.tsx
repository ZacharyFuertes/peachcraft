import { useEffect, useMemo, useState } from "react";
import imageCompression from "browser-image-compression";
import { cn } from "@/lib/utils";
import { getSupabaseClient } from "@/lib/supabase";
import { uploadProductImage } from "@/lib/api/supabase.functions";
import type { Product } from "@/lib/supabase";

export type ProductFormData = {
  name: string;
  price: number;
  description: string;
  category: string;
  tag: string;
  swatch: string;
  stock_qty: number;
  is_active: boolean;
  images: string[];
};

interface ProductFormProps {
  initialData?: Partial<Product>;
  onSubmit: (data: ProductFormData, accessToken?: string) => Promise<void>;
  isLoading: boolean;
}

export function ProductForm({ initialData, onSubmit, isLoading }: ProductFormProps) {
  const categoryOptions = ["Rings", "Necklaces", "Bracelets", "Earrings", "Accessories"];
  const tagOptions = ["New", "Best seller", "Limited", "Featured", "Gift"];

  const [name, setName] = useState(initialData?.name ?? "");
  const [priceInput, setPriceInput] = useState(initialData?.price != null ? String(initialData.price) : "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [category, setCategory] = useState(initialData?.category ?? "");
  const [categoryMode, setCategoryMode] = useState(
    initialData?.category && categoryOptions.includes(initialData.category) ? initialData.category : "",
  );
  const [customCategory, setCustomCategory] = useState(
    initialData?.category && !categoryOptions.includes(initialData.category) ? initialData.category : "",
  );
  const [tag, setTag] = useState(initialData?.tag ?? "");
  const [tagMode, setTagMode] = useState(
    initialData?.tag && tagOptions.includes(initialData.tag) ? initialData.tag : "",
  );
  const [customTag, setCustomTag] = useState(
    initialData?.tag && !tagOptions.includes(initialData.tag) ? initialData.tag : "",
  );
  const [swatch, setSwatch] = useState(initialData?.swatch ?? "#f7c8d9");
  const [stockQtyInput, setStockQtyInput] = useState(initialData?.stock_qty != null ? String(initialData.stock_qty) : "");
  const [isActive, setIsActive] = useState(initialData?.is_active ?? true);
  const [images, setImages] = useState<string[]>(initialData?.images ?? []);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const getAccessToken = async () => {
    const supabase = getSupabaseClient();
    const { data } = await supabase.auth.getSession();
    return data?.session?.access_token;
  };

  useEffect(() => {
    setName(initialData?.name ?? "");
    setPriceInput(initialData?.price != null ? String(initialData.price) : "");
    setDescription(initialData?.description ?? "");
    setCategory(initialData?.category ?? "");
    setCategoryMode(
      initialData?.category && categoryOptions.includes(initialData.category)
        ? initialData.category
        : "custom",
    );
    setCustomCategory(
      initialData?.category && !categoryOptions.includes(initialData.category)
        ? initialData.category
        : "",
    );
    setTag(initialData?.tag ?? "");
    setTagMode(
      initialData?.tag && tagOptions.includes(initialData.tag)
        ? initialData.tag
        : "custom",
    );
    setCustomTag(
      initialData?.tag && !tagOptions.includes(initialData.tag)
        ? initialData.tag
        : "",
    );
    setSwatch(initialData?.swatch ?? "#f7c8d9");
    setStockQtyInput(initialData?.stock_qty != null ? String(initialData.stock_qty) : "");
    setIsActive(initialData?.is_active ?? true);
    setImages(initialData?.images ?? []);
  }, [initialData]);

  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  const MAX_SIZE_MB = 5;

  const fileToBase64 = (file: File): Promise<string | null> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          resolve(null);
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });

  const handleImageFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    // Validate each file before uploading
    for (const file of Array.from(files)) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setUploadError(`"${file.name}" is not supported. Please use JPG, PNG, WEBP or GIF.`);
        return;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setUploadError(`"${file.name}" is too large. Max size is ${MAX_SIZE_MB} MB.`);
        return;
      }
    }

    setUploadError(null);
    setUploading(true);
    setUploadProgress(0);

    const uploadUrls: string[] = [];

    try {
      const fileArray = Array.from(files);
      for (let index = 0; index < fileArray.length; index += 1) {
        const file = fileArray[index];

        const compressedFile = await imageCompression(file, {
          maxSizeMB: 0.3,
          maxWidthOrHeight: 1200,
          useWebWorker: true,
        });

        const base64 = await fileToBase64(compressedFile);
        if (!base64) {
          throw new Error(`Could not read file "${file.name}". Please try a different image.`);
        }

        const accessToken = await getAccessToken();
        const result = await uploadProductImage({
          data: {
            fileName: `${Date.now()}-${file.name}`,
            base64,
            accessToken,
          },
        });

        uploadUrls.push(result.publicUrl);
        setUploadProgress(Math.round(((index + 1) / fileArray.length) * 100));
      }

      setImages((current) => [...current, ...uploadUrls]);
    } catch (error: unknown) {
      let msg = "Upload failed. Please try again.";
      if (error instanceof Error) {
        msg = error.message;
      } else if (typeof error === "string") {
        msg = error;
      } else {
        try { msg = JSON.stringify(error); } catch { /* keep default */ }
      }
      setUploadError(msg);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSubmit = async () => {
    const price = Number(priceInput);
    const stockQty = Number(stockQtyInput);

    if (name.trim() === "" || priceInput.trim() === "" || stockQtyInput.trim() === "") {
      setFormError("Please complete the required fields before saving this product.");
      return;
    }

    if (Number.isNaN(price) || Number.isNaN(stockQty)) {
      setFormError("Please enter valid numbers for price and stock quantity.");
      return;
    }

    setFormError(null);
    const accessToken = await getAccessToken();
    await onSubmit(
      {
        name,
        price,
        description,
        category,
        tag,
        swatch,
        stock_qty: stockQty,
        is_active: isActive,
        images,
      },
      accessToken,
    );
  };

  const removeImage = (url: string) => {
    setImages((current) => current.filter((image) => image !== url));
  };

  const productSwatchStyle = useMemo(
    () => ({ backgroundColor: swatch || "var(--blush)" }),
    [swatch],
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Name</label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-4 py-3 font-sans text-foreground outline-none focus:border-[var(--sage)]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Price</label>
          <div className="flex items-center gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-4 py-3">
            <span className="text-sm text-foreground">₱</span>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={priceInput}
              onChange={(event) => setPriceInput(event.target.value.replace(/[^0-9]/g, ""))}
              className="w-full bg-transparent text-foreground outline-none"
            />
          </div>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold text-foreground">Description</label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={5}
            className="w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-4 py-3 font-sans text-foreground outline-none focus:border-[var(--sage)]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Category</label>
          <div className="grid gap-3">
            <select
              value={categoryMode}
              onChange={(event) => {
                const value = event.target.value;
                setCategoryMode(value);
                if (value === "custom") {
                  setCategory(customCategory);
                } else {
                  setCategory(value);
                  setCustomCategory("");
                }
              }}
              className="w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-4 py-3 font-sans text-foreground outline-none focus:border-[var(--sage)]"
            >
              <option value="">Select a category</option>
              {categoryOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
              <option value="custom">Add new category</option>
            </select>
            {categoryMode === "custom" && (
              <input
                value={customCategory}
                onChange={(event) => {
                  setCustomCategory(event.target.value);
                  setCategory(event.target.value);
                }}
                placeholder="Type a new category"
                className="w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-4 py-3 font-sans text-foreground outline-none focus:border-[var(--sage)]"
              />
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Tag</label>
          <div className="grid gap-3">
            <select
              value={tagMode}
              onChange={(event) => {
                const value = event.target.value;
                setTagMode(value);
                if (value === "custom") {
                  setTag(customTag);
                } else {
                  setTag(value);
                  setCustomTag("");
                }
              }}
              className="w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-4 py-3 font-sans text-foreground outline-none focus:border-[var(--sage)]"
            >
              <option value="">Select a tag</option>
              {tagOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
              <option value="custom">Add new tag</option>
            </select>
            {tagMode === "custom" && (
              <input
                value={customTag}
                onChange={(event) => {
                  setCustomTag(event.target.value);
                  setTag(event.target.value);
                }}
                placeholder="Type a new tag"
                className="w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-4 py-3 font-sans text-foreground outline-none focus:border-[var(--sage)]"
              />
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Swatch</label>
          <div className="flex items-center gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-4 py-3">
            <input
              type="color"
              value={swatch}
              onChange={(event) => setSwatch(event.target.value)}
              className="h-10 w-14 cursor-pointer rounded-lg border border-[var(--border)] p-0"
            />
            <div className="text-sm text-foreground">Current</div>
            <span className="h-8 w-8 rounded-full border border-[var(--border)]" style={productSwatchStyle} />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Stock quantity</label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={stockQtyInput}
            onChange={(event) => setStockQtyInput(event.target.value.replace(/[^0-9]/g, ""))}
            className="w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-4 py-3 font-sans text-foreground outline-none focus:border-[var(--sage)]"
          />
        </div>

        <div className="space-y-2 flex items-center gap-4">
          <div>
            <p className="text-sm font-semibold text-foreground">Active</p>
            <p className="text-xs text-foreground/70">Toggle product visibility</p>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(event) => setIsActive(event.target.checked)}
              className="sr-only"
            />
            <span
              className={cn(
                "h-6 w-11 rounded-full transition-colors",
                isActive ? "bg-[var(--sage)]" : "bg-[var(--border)]",
              )}
            />
            <span
              className={cn(
                "absolute left-1 top-1 h-4 w-4 rounded-full bg-[var(--card)] shadow-soft transition-transform",
                isActive ? "translate-x-5" : "translate-x-0",
              )}
            />
          </label>
        </div>
      </div>

      <div className="space-y-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] p-6 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-foreground">Images</h3>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            onChange={(event) => handleImageFiles(event.target.files)}
            className="text-sm text-foreground"
          />
          <p className="text-xs text-foreground/50">JPG, PNG, WEBP, GIF · max 5 MB each</p>
        </div>

        {uploading && (
          <div className="rounded-[var(--radius)] bg-[var(--background)] p-3 text-sm text-foreground">
            Uploading images... {uploadProgress}%
          </div>
        )}

        {uploadError && (
          <p className="text-sm text-[#f87171]">{uploadError}</p>
        )}

        {formError && (
          <p className="text-sm text-[#f87171]">{formError}</p>
        )}

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((src) => (
            <div key={src} className="group relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-soft">
              <img src={src} alt="Product preview" className="h-40 w-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(src)}
                className="absolute right-3 top-3 rounded-full bg-background/90 px-2 py-1 text-xs font-semibold text-foreground shadow-card"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-foreground/75">
          Use the upload control to compress and store product photos in Supabase storage.
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="inline-flex items-center justify-center rounded-full bg-[var(--sage)] px-6 py-3 font-semibold text-[var(--foreground)] shadow-soft transition hover:bg-[var(--sage-deep)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save product"}
        </button>
      </div>
    </div>
  );
}

