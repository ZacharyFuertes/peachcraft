import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import imageCompression from "browser-image-compression";
import { cn } from "@/lib/utils";
import { getSupabaseClient } from "@/lib/supabase";
import { uploadProductImage } from "@/lib/api/supabase.functions";
import { Alert } from "@/components/ui/alert";
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
  const navigate = useNavigate();
  const categoryOptions = ["Rings", "Necklaces", "Bracelets", "Earrings", "Accessories"];
  const tagOptions = ["New", "Best seller", "Limited", "Featured", "Gift"];

  const [name, setName] = useState(initialData?.name ?? "");
  const [priceInput, setPriceInput] = useState(initialData?.price != null ? String(initialData.price) : "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialData?.category ? initialData.category.split(",").map((item) => item.trim()).filter(Boolean) : [],
  );
  const [categorySelect, setCategorySelect] = useState("");
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [customCategory, setCustomCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>(
    initialData?.tag ? initialData.tag.split(",").map((item) => item.trim()).filter(Boolean) : [],
  );
  const [tagSelect, setTagSelect] = useState("");
  const [showTagInput, setShowTagInput] = useState(false);
  const [customTag, setCustomTag] = useState("");
  const [swatch, setSwatch] = useState(initialData?.swatch ?? "#f7c8d9");
  const [stockQtyInput, setStockQtyInput] = useState(initialData?.stock_qty != null ? String(initialData.stock_qty) : "");
  const [isActive, setIsActive] = useState(initialData?.is_active ?? true);
  const [images, setImages] = useState<string[]>(initialData?.images ?? []);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragActive, setIsDragActive] = useState(false);

  const colorInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const getAccessToken = async () => {
    const supabase = getSupabaseClient();
    const { data } = await supabase.auth.getSession();
    return data?.session?.access_token;
  };

  useEffect(() => {
    setName(initialData?.name ?? "");
    setPriceInput(initialData?.price != null ? String(initialData.price) : "");
    setDescription(initialData?.description ?? "");
    setSelectedCategories(
      initialData?.category ? initialData.category.split(",").map((item) => item.trim()).filter(Boolean) : [],
    );
    setCategorySelect("");
    setCustomCategory("");
    setShowCategoryInput(false);
    setSelectedTags(
      initialData?.tag ? initialData.tag.split(",").map((item) => item.trim()).filter(Boolean) : [],
    );
    setTagSelect("");
    setCustomTag("");
    setShowTagInput(false);
    setSwatch(initialData?.swatch ?? "#f7c8d9");
    setStockQtyInput(initialData?.stock_qty != null ? String(initialData.stock_qty) : "");
    setIsActive(initialData?.is_active ?? true);
    setImages(initialData?.images ?? []);
  }, [initialData]);

  const categoryString = selectedCategories.join(", ");
  const tagString = selectedTags.join(", ");

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

  const addCategory = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed || selectedCategories.includes(trimmed)) return;
    setSelectedCategories((current) => [...current, trimmed]);
  };

  const addTag = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed || selectedTags.includes(trimmed)) return;
    setSelectedTags((current) => [...current, trimmed]);
  };

  const handleCategorySelect = (value: string) => {
    if (!value) return;
    if (value === "new") {
      setShowCategoryInput(true);
      setCategorySelect("");
      return;
    }
    addCategory(value);
    setCategorySelect("");
  };

  const handleTagSelect = (value: string) => {
    if (!value) return;
    if (value === "new") {
      setShowTagInput(true);
      setTagSelect("");
      return;
    }
    addTag(value);
    setTagSelect("");
  };

  const removeCategory = (value: string) => {
    setSelectedCategories((current) => current.filter((item) => item !== value));
  };

  const removeTag = (value: string) => {
    setSelectedTags((current) => current.filter((item) => item !== value));
  };

  const presetSwatches = ["#f7c8d9", "#fde68a", "#a7f3d0", "#bfdbfe", "#fbcfe8", "#fcd34d"];

  const productSwatchStyle = useMemo(
    () => ({ backgroundColor: swatch || "var(--blush)" }),
    [swatch],
  );

  const handleCustomColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSwatch(event.target.value);
  };

  const openColorPicker = () => {
    colorInputRef.current?.click();
  };

  const openFileChooser = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragEnter = () => {
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(false);
    handleImageFiles(event.dataTransfer.files);
  };

  const handleImageFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    if (images.length + files.length > 8) {
      setUploadError("You can upload up to 8 images.");
      return;
    }

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
        category: categoryString,
        tag: tagString,
        swatch,
        stock_qty: stockQty,
        is_active: isActive,
        images,
      },
      accessToken,
    );
  };

  const handleDiscard = () => {
    setName(initialData?.name ?? "");
    setPriceInput(initialData?.price != null ? String(initialData.price) : "");
    setDescription(initialData?.description ?? "");
    setSelectedCategories(
      initialData?.category ? initialData.category.split(",").map((item) => item.trim()).filter(Boolean) : [],
    );
    setSelectedTags(
      initialData?.tag ? initialData.tag.split(",").map((item) => item.trim()).filter(Boolean) : [],
    );
    setSwatch(initialData?.swatch ?? "#f7c8d9");
    setStockQtyInput(initialData?.stock_qty != null ? String(initialData.stock_qty) : "");
    setIsActive(initialData?.is_active ?? true);
    setImages(initialData?.images ?? []);
    setUploadError(null);
    setFormError(null);
    setShowCategoryInput(false);
    setShowTagInput(false);
    setCustomCategory("");
    setCustomTag("");
    setCategorySelect("");
    setTagSelect("");
  };

  const removeImage = (url: string) => {
    setImages((current) => current.filter((image) => image !== url));
  };

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-10 rounded-t-3xl border-b border-[var(--border)] bg-[var(--background)]/95 px-6 py-4 backdrop-blur-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-[var(--foreground)]/70">New product</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => navigate({ to: "/shop" })}
              className="rounded-full border border-[var(--border)] bg-transparent px-5 py-2 text-sm font-semibold text-foreground transition hover:bg-[var(--card)]"
            >
              Preview
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="inline-flex items-center justify-center rounded-full bg-[var(--sage)] px-5 py-2 text-sm font-semibold text-[var(--foreground)] shadow-soft transition hover:bg-[var(--sage-deep)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save product"}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-6">
        {formError && (
          <div className="rounded-3xl bg-[#f87171]/10 p-4 text-sm text-[#991b1b]">{formError}</div>
        )}

        <section className="space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[var(--foreground)]/70">Basic info</p>
              <h2 className="mt-2 text-lg font-semibold text-foreground">Product details</h2>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-foreground">
                  Name <span className="text-[#ef4444]">*</span>
                </label>
              </div>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-4 py-3 font-sans text-foreground outline-none focus:border-[var(--sage)]"
              />
              <p className="text-xs text-foreground/70">Enter the product display name.</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-foreground">
                  Price <span className="text-[#ef4444]">*</span>
                </label>
              </div>
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
              <p className="text-xs text-foreground/70">Set the retail price in Philippine pesos.</p>
            </div>

            <div className="md:col-span-2 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <label className="text-sm font-semibold text-foreground">Description</label>
                <span className="text-xs text-foreground/70">{description.length}</span>
              </div>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={5}
                className="w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-4 py-3 font-sans text-foreground outline-none focus:border-[var(--sage)]"
              />
              <p className="text-xs text-foreground/70">Describe product details, materials, and benefits.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[var(--foreground)]/70">Categorization</p>
              <h2 className="mt-2 text-lg font-semibold text-foreground">Category & tags</h2>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Category</label>
              <select
                value={categorySelect}
                onChange={(event) => {
                  setCategorySelect(event.target.value);
                  handleCategorySelect(event.target.value);
                }}
                className="w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-4 py-3 font-sans text-foreground outline-none focus:border-[var(--sage)]"
              >
                <option value="">Select a category</option>
                {categoryOptions.filter((option) => !selectedCategories.includes(option)).map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
                <option value="new">Add custom category</option>
              </select>
              {showCategoryInput && (
                <div className="flex gap-2">
                  <input
                    value={customCategory}
                    onChange={(event) => setCustomCategory(event.target.value)}
                    placeholder="Type a new category"
                    className="w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-4 py-3 font-sans text-foreground outline-none focus:border-[var(--sage)]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      addCategory(customCategory);
                      setCustomCategory("");
                      setShowCategoryInput(false);
                    }}
                    className="inline-flex items-center justify-center rounded-full bg-[var(--sage)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] shadow-soft hover:bg-[var(--sage-deep)]"
                  >
                    Add
                  </button>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {selectedCategories.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => removeCategory(value)}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-foreground"
                  >
                    {value}
                    <span aria-hidden className="text-[0.85em]">×</span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-foreground/70">Choose one or more categories and remove them by clicking the pill.</p>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Tags</label>
              <select
                value={tagSelect}
                onChange={(event) => {
                  setTagSelect(event.target.value);
                  handleTagSelect(event.target.value);
                }}
                className="w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-4 py-3 font-sans text-foreground outline-none focus:border-[var(--sage)]"
              >
                <option value="">Select a tag</option>
                {tagOptions.filter((option) => !selectedTags.includes(option)).map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
                <option value="new">Add custom tag</option>
              </select>
              {showTagInput && (
                <div className="flex gap-2">
                  <input
                    value={customTag}
                    onChange={(event) => setCustomTag(event.target.value)}
                    placeholder="Type a new tag"
                    className="w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-4 py-3 font-sans text-foreground outline-none focus:border-[var(--sage)]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      addTag(customTag);
                      setCustomTag("");
                      setShowTagInput(false);
                    }}
                    className="inline-flex items-center justify-center rounded-full bg-[var(--sage)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] shadow-soft hover:bg-[var(--sage-deep)]"
                  >
                    Add
                  </button>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => removeTag(value)}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-foreground"
                  >
                    {value}
                    <span aria-hidden className="text-[0.85em]">×</span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-foreground/70">Add tags for special collections, promotions, or product highlights.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[var(--foreground)]/70">Variants & stock</p>
              <h2 className="mt-2 text-lg font-semibold text-foreground">Inventory and appearance</h2>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Swatch</label>
              <div className="grid gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] p-4">
                <div className="flex flex-wrap gap-3">
                  {presetSwatches.map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setSwatch(value)}
                      className={cn(
                        "h-10 w-10 rounded-full border transition-all",
                        value === swatch
                          ? "border-[var(--sage)] outline outline-2 outline-[var(--sage)] outline-offset-2"
                          : "border-[var(--border)]",
                      )}
                      style={{ backgroundColor: value }}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={openColorPicker}
                    className="inline-flex h-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-semibold text-foreground"
                  >
                    Add custom
                  </button>
                </div>
                <input
                  ref={colorInputRef}
                  type="color"
                  value={swatch}
                  onChange={handleCustomColor}
                  className="hidden"
                />
              </div>
              <p className="text-xs text-foreground/70">Choose a preset swatch or add a custom color for this product.</p>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Stock quantity</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={stockQtyInput}
                onChange={(event) => setStockQtyInput(event.target.value.replace(/[^0-9]/g, ""))}
                className="w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-4 py-3 font-sans text-foreground outline-none focus:border-[var(--sage)]"
              />
              {Number(stockQtyInput) > 0 && Number(stockQtyInput) <= 5 ? (
                <Alert variant="warning" className="text-sm">
                  Low stock warning at 5 units.
                </Alert>
              ) : (
                <div className="flex items-center gap-2 rounded-2xl border border-[#5eead4] bg-[#dafaf6] px-4 py-3 text-xs text-[#0f766e]">
                  <span aria-hidden>ℹ️</span>
                  <span>Low stock warning at 5 units</span>
                </div>
              )}
              <p className="text-xs text-foreground/70">Track available inventory and adjust stock levels before publishing.</p>
            </div>

            <div className="md:col-span-2 flex flex-col gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">Active</p>
                  <p className="text-xs text-foreground/70">
                    {isActive ? "Active — product is visible in shop" : "Inactive hidden from shop"}
                  </p>
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
          </div>
        </section>

        <section className="space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[var(--foreground)]/70">Visibility & images</p>
              <h2 className="mt-2 text-lg font-semibold text-foreground">Upload product photography</h2>
            </div>
          </div>

          <div
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "rounded-3xl border border-dashed px-6 py-10 text-center transition",
              isDragActive
                ? "border-[var(--sage)] bg-[var(--sage)]/10"
                : "border-[var(--border)] bg-[var(--background)]",
            )}
          >
            <p className="text-sm font-semibold text-foreground">Drag and drop images here</p>
            <p className="mt-2 text-sm text-foreground/70">or use the button below to choose files.</p>
            <button
              type="button"
              onClick={openFileChooser}
              className="mt-5 inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] px-5 py-3 text-sm font-semibold text-foreground shadow-soft hover:bg-[var(--sage)]/5"
            >
              Choose files
            </button>
            <p className="mt-4 text-xs text-foreground/70">JPG, PNG, WEBP, GIF · max 5MB · up to 8 images</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              multiple
              onChange={(event) => handleImageFiles(event.target.files)}
              className="hidden"
            />
          </div>

          {uploading && (
            <div className="rounded-3xl bg-[var(--background)] p-3 text-sm text-foreground">
              Uploading images... {uploadProgress}%
            </div>
          )}

          {uploadError && (
            <p className="text-sm text-[#f87171]">{uploadError}</p>
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
        </section>
      </div>

      <div className="flex flex-col gap-3 border-t border-[var(--border)] bg-[var(--background)] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={handleDiscard}
          className="inline-flex items-center justify-center rounded-full border border-[#ef4444] bg-[#fef2f2] px-6 py-3 text-sm font-semibold text-[#b91c1c] transition hover:bg-[#fee2e2]"
        >
          Discard
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className="inline-flex items-center justify-center rounded-full bg-[var(--sage)] px-6 py-3 text-sm font-semibold text-[var(--foreground)] shadow-soft transition hover:bg-[var(--sage-deep)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save product"}
        </button>
      </div>
    </div>
  );
}

