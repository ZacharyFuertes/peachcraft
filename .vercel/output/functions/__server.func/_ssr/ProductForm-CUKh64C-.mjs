import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { i as imageCompression } from "../_libs/browser-image-compression.mjs";
import { b as cn, r as uploadProductImage } from "./router-ChcEy1hy.mjs";
import { a as getSupabaseClient } from "./supabase-B6oNw5MC.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/50 dark:bg-emerald-950/50 dark:text-emerald-200",
        warning: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/50 dark:bg-amber-950/50 dark:text-amber-200"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Alert = reactExports.forwardRef(({ className, variant, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, role: "alert", className: cn(alertVariants({ variant }), className), ...props }));
Alert.displayName = "Alert";
const AlertTitle = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "h5",
    {
      ref,
      className: cn("mb-1 font-medium leading-none tracking-tight", className),
      ...props
    }
  )
);
AlertTitle.displayName = "AlertTitle";
const AlertDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("text-sm [&_p]:leading-relaxed", className), ...props }));
AlertDescription.displayName = "AlertDescription";
function ProductForm({ initialData, onSubmit, isLoading }) {
  const navigate = useNavigate();
  const categoryOptions = ["Rings", "Necklaces", "Bracelets", "Earrings", "Accessories"];
  const tagOptions = ["New", "Best seller", "Limited", "Featured", "Gift"];
  const [name, setName] = reactExports.useState(initialData?.name ?? "");
  const [priceInput, setPriceInput] = reactExports.useState(initialData?.price != null ? String(initialData.price) : "");
  const [description, setDescription] = reactExports.useState(initialData?.description ?? "");
  const [selectedCategories, setSelectedCategories] = reactExports.useState(
    initialData?.category ? initialData.category.split(",").map((item) => item.trim()).filter(Boolean) : []
  );
  const [categorySelect, setCategorySelect] = reactExports.useState("");
  const [showCategoryInput, setShowCategoryInput] = reactExports.useState(false);
  const [customCategory, setCustomCategory] = reactExports.useState("");
  const [selectedTags, setSelectedTags] = reactExports.useState(
    initialData?.tag ? initialData.tag.split(",").map((item) => item.trim()).filter(Boolean) : []
  );
  const [tagSelect, setTagSelect] = reactExports.useState("");
  const [showTagInput, setShowTagInput] = reactExports.useState(false);
  const [customTag, setCustomTag] = reactExports.useState("");
  const [swatch, setSwatch] = reactExports.useState(initialData?.swatch ?? "#f7c8d9");
  const [stockQtyInput, setStockQtyInput] = reactExports.useState(initialData?.stock_qty != null ? String(initialData.stock_qty) : "");
  const [isActive, setIsActive] = reactExports.useState(initialData?.is_active ?? true);
  const [images, setImages] = reactExports.useState(initialData?.images ?? []);
  const [uploadError, setUploadError] = reactExports.useState(null);
  const [formError, setFormError] = reactExports.useState(null);
  const [uploading, setUploading] = reactExports.useState(false);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const [isDragActive, setIsDragActive] = reactExports.useState(false);
  const colorInputRef = reactExports.useRef(null);
  const fileInputRef = reactExports.useRef(null);
  const getAccessToken = async () => {
    const supabase = getSupabaseClient();
    const { data } = await supabase.auth.getSession();
    return data?.session?.access_token;
  };
  reactExports.useEffect(() => {
    setName(initialData?.name ?? "");
    setPriceInput(initialData?.price != null ? String(initialData.price) : "");
    setDescription(initialData?.description ?? "");
    setSelectedCategories(
      initialData?.category ? initialData.category.split(",").map((item) => item.trim()).filter(Boolean) : []
    );
    setCategorySelect("");
    setCustomCategory("");
    setShowCategoryInput(false);
    setSelectedTags(
      initialData?.tag ? initialData.tag.split(",").map((item) => item.trim()).filter(Boolean) : []
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
  const fileToBase64 = (file) => new Promise((resolve, reject) => {
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
  const addCategory = (value) => {
    const trimmed = value.trim();
    if (!trimmed || selectedCategories.includes(trimmed)) return;
    setSelectedCategories((current) => [...current, trimmed]);
  };
  const addTag = (value) => {
    const trimmed = value.trim();
    if (!trimmed || selectedTags.includes(trimmed)) return;
    setSelectedTags((current) => [...current, trimmed]);
  };
  const handleCategorySelect = (value) => {
    if (!value) return;
    if (value === "new") {
      setShowCategoryInput(true);
      setCategorySelect("");
      return;
    }
    addCategory(value);
    setCategorySelect("");
  };
  const handleTagSelect = (value) => {
    if (!value) return;
    if (value === "new") {
      setShowTagInput(true);
      setTagSelect("");
      return;
    }
    addTag(value);
    setTagSelect("");
  };
  const removeCategory = (value) => {
    setSelectedCategories((current) => current.filter((item) => item !== value));
  };
  const removeTag = (value) => {
    setSelectedTags((current) => current.filter((item) => item !== value));
  };
  const presetSwatches = ["#f7c8d9", "#fde68a", "#a7f3d0", "#bfdbfe", "#fbcfe8", "#fcd34d"];
  reactExports.useMemo(
    () => ({ backgroundColor: swatch || "var(--blush)" }),
    [swatch]
  );
  const handleCustomColor = (event) => {
    setSwatch(event.target.value);
  };
  const openColorPicker = () => {
    colorInputRef.current?.click();
  };
  const openFileChooser = () => {
    fileInputRef.current?.click();
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDragEnter = () => {
    setIsDragActive(true);
  };
  const handleDragLeave = () => {
    setIsDragActive(false);
  };
  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragActive(false);
    handleImageFiles(event.dataTransfer.files);
  };
  const handleImageFiles = async (files) => {
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
    const uploadUrls = [];
    try {
      const fileArray = Array.from(files);
      for (let index = 0; index < fileArray.length; index += 1) {
        const file = fileArray[index];
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 0.3,
          maxWidthOrHeight: 1200,
          useWebWorker: true
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
            accessToken
          }
        });
        uploadUrls.push(result.publicUrl);
        setUploadProgress(Math.round((index + 1) / fileArray.length * 100));
      }
      setImages((current) => [...current, ...uploadUrls]);
    } catch (error) {
      let msg = "Upload failed. Please try again.";
      if (error instanceof Error) {
        msg = error.message;
      } else if (typeof error === "string") {
        msg = error;
      } else {
        try {
          msg = JSON.stringify(error);
        } catch {
        }
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
        images
      },
      accessToken
    );
  };
  const handleDiscard = () => {
    setName(initialData?.name ?? "");
    setPriceInput(initialData?.price != null ? String(initialData.price) : "");
    setDescription(initialData?.description ?? "");
    setSelectedCategories(
      initialData?.category ? initialData.category.split(",").map((item) => item.trim()).filter(Boolean) : []
    );
    setSelectedTags(
      initialData?.tag ? initialData.tag.split(",").map((item) => item.trim()).filter(Boolean) : []
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
  const removeImage = (url) => {
    setImages((current) => current.filter((image) => image !== url));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-10 rounded-t-3xl border-b border-[var(--border)] bg-[var(--background)]/95 px-6 py-4 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm uppercase tracking-[0.25em] text-[var(--foreground)]/70", children: "New product" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => navigate({ to: "/shop" }),
            className: "rounded-full border border-[var(--border)] bg-transparent px-5 py-2 text-sm font-semibold text-foreground transition hover:bg-[var(--card)]",
            children: "Preview"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleSubmit,
            disabled: isLoading,
            className: "inline-flex items-center justify-center rounded-full bg-[var(--sage)] px-5 py-2 text-sm font-semibold text-[var(--foreground)] shadow-soft transition hover:bg-[var(--sage-deep)] disabled:cursor-not-allowed disabled:opacity-50",
            children: isLoading ? "Saving..." : "Save product"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 p-6", children: [
      formError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl bg-[#f87171]/10 p-4 text-sm text-[#991b1b]", children: formError }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm uppercase tracking-[0.2em] text-[var(--foreground)]/70", children: "Basic info" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 text-lg font-semibold text-foreground", children: "Product details" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-sm font-semibold text-foreground", children: [
              "Name ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#ef4444]", children: "*" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                value: name,
                onChange: (event) => setName(event.target.value),
                className: "w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-4 py-3 font-sans text-foreground outline-none focus:border-[var(--sage)]"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/70", children: "Enter the product display name." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-sm font-semibold text-foreground", children: [
              "Price ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#ef4444]", children: "*" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-4 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: "₱" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  value: priceInput,
                  onChange: (event) => setPriceInput(event.target.value.replace(/[^0-9]/g, "")),
                  className: "w-full bg-transparent text-foreground outline-none"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/70", children: "Set the retail price in Philippine pesos." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-foreground", children: "Description" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground/70", children: description.length })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                value: description,
                onChange: (event) => setDescription(event.target.value),
                rows: 5,
                className: "w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-4 py-3 font-sans text-foreground outline-none focus:border-[var(--sage)]"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/70", children: "Describe product details, materials, and benefits." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm uppercase tracking-[0.2em] text-[var(--foreground)]/70", children: "Categorization" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 text-lg font-semibold text-foreground", children: "Category & tags" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-foreground", children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: categorySelect,
                onChange: (event) => {
                  setCategorySelect(event.target.value);
                  handleCategorySelect(event.target.value);
                },
                className: "w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-4 py-3 font-sans text-foreground outline-none focus:border-[var(--sage)]",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select a category" }),
                  categoryOptions.filter((option) => !selectedCategories.includes(option)).map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: option, children: option }, option)),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "new", children: "Add custom category" })
                ]
              }
            ),
            showCategoryInput && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  value: customCategory,
                  onChange: (event) => setCustomCategory(event.target.value),
                  placeholder: "Type a new category",
                  className: "w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-4 py-3 font-sans text-foreground outline-none focus:border-[var(--sage)]"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    addCategory(customCategory);
                    setCustomCategory("");
                    setShowCategoryInput(false);
                  },
                  className: "inline-flex items-center justify-center rounded-full bg-[var(--sage)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] shadow-soft hover:bg-[var(--sage-deep)]",
                  children: "Add"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: selectedCategories.map((value) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => removeCategory(value),
                className: "inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-foreground",
                children: [
                  value,
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, className: "text-[0.85em]", children: "×" })
                ]
              },
              value
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/70", children: "Choose one or more categories and remove them by clicking the pill." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-foreground", children: "Tags" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: tagSelect,
                onChange: (event) => {
                  setTagSelect(event.target.value);
                  handleTagSelect(event.target.value);
                },
                className: "w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-4 py-3 font-sans text-foreground outline-none focus:border-[var(--sage)]",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select a tag" }),
                  tagOptions.filter((option) => !selectedTags.includes(option)).map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: option, children: option }, option)),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "new", children: "Add custom tag" })
                ]
              }
            ),
            showTagInput && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  value: customTag,
                  onChange: (event) => setCustomTag(event.target.value),
                  placeholder: "Type a new tag",
                  className: "w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-4 py-3 font-sans text-foreground outline-none focus:border-[var(--sage)]"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    addTag(customTag);
                    setCustomTag("");
                    setShowTagInput(false);
                  },
                  className: "inline-flex items-center justify-center rounded-full bg-[var(--sage)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] shadow-soft hover:bg-[var(--sage-deep)]",
                  children: "Add"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: selectedTags.map((value) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => removeTag(value),
                className: "inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-foreground",
                children: [
                  value,
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, className: "text-[0.85em]", children: "×" })
                ]
              },
              value
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/70", children: "Add tags for special collections, promotions, or product highlights." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm uppercase tracking-[0.2em] text-[var(--foreground)]/70", children: "Variants & stock" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 text-lg font-semibold text-foreground", children: "Inventory and appearance" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-foreground", children: "Swatch" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
                presetSwatches.map((value) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setSwatch(value),
                    className: cn(
                      "h-10 w-10 rounded-full border transition-all",
                      value === swatch ? "border-[var(--sage)] outline outline-2 outline-[var(--sage)] outline-offset-2" : "border-[var(--border)]"
                    ),
                    style: { backgroundColor: value }
                  },
                  value
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: openColorPicker,
                    className: "inline-flex h-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] px-4 text-sm font-semibold text-foreground",
                    children: "Add custom"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: colorInputRef,
                  type: "color",
                  value: swatch,
                  onChange: handleCustomColor,
                  className: "hidden"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/70", children: "Choose a preset swatch or add a custom color for this product." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-foreground", children: "Stock quantity" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                inputMode: "numeric",
                pattern: "[0-9]*",
                value: stockQtyInput,
                onChange: (event) => setStockQtyInput(event.target.value.replace(/[^0-9]/g, "")),
                className: "w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-4 py-3 font-sans text-foreground outline-none focus:border-[var(--sage)]"
              }
            ),
            Number(stockQtyInput) > 0 && Number(stockQtyInput) <= 5 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { variant: "warning", className: "text-sm", children: "Low stock warning at 5 units." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-2xl border border-[#5eead4] bg-[#dafaf6] px-4 py-3 text-xs text-[#0f766e]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "ℹ️" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Low stock warning at 5 units" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/70", children: "Track available inventory and adjust stock levels before publishing." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-2 flex flex-col gap-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Active" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/70", children: isActive ? "Active — product is visible in shop" : "Inactive hidden from shop" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "relative inline-flex cursor-pointer items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: isActive,
                  onChange: (event) => setIsActive(event.target.checked),
                  className: "sr-only"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "h-6 w-11 rounded-full transition-colors",
                    isActive ? "bg-[var(--sage)]" : "bg-[var(--border)]"
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "absolute left-1 top-1 h-4 w-4 rounded-full bg-[var(--card)] shadow-soft transition-transform",
                    isActive ? "translate-x-5" : "translate-x-0"
                  )
                }
              )
            ] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm uppercase tracking-[0.2em] text-[var(--foreground)]/70", children: "Visibility & images" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 text-lg font-semibold text-foreground", children: "Upload product photography" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            onDragOver: handleDragOver,
            onDragEnter: handleDragEnter,
            onDragLeave: handleDragLeave,
            onDrop: handleDrop,
            className: cn(
              "rounded-3xl border border-dashed px-6 py-10 text-center transition",
              isDragActive ? "border-[var(--sage)] bg-[var(--sage)]/10" : "border-[var(--border)] bg-[var(--background)]"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Drag and drop images here" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-foreground/70", children: "or use the button below to choose files." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: openFileChooser,
                  className: "mt-5 inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] px-5 py-3 text-sm font-semibold text-foreground shadow-soft hover:bg-[var(--sage)]/5",
                  children: "Choose files"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-xs text-foreground/70", children: "JPG, PNG, WEBP, GIF · max 5MB · up to 8 images" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: fileInputRef,
                  type: "file",
                  accept: "image/jpeg,image/png,image/webp,image/gif",
                  multiple: true,
                  onChange: (event) => handleImageFiles(event.target.files),
                  className: "hidden"
                }
              )
            ]
          }
        ),
        uploading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-[var(--background)] p-3 text-sm text-foreground", children: [
          "Uploading images... ",
          uploadProgress,
          "%"
        ] }),
        uploadError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#f87171]", children: uploadError }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: images.map((src) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: "Product preview", className: "h-40 w-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => removeImage(src),
              className: "absolute right-3 top-3 rounded-full bg-background/90 px-2 py-1 text-xs font-semibold text-foreground shadow-card",
              children: "✕"
            }
          )
        ] }, src)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 border-t border-[var(--border)] bg-[var(--background)] px-6 py-5 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: handleDiscard,
          className: "inline-flex items-center justify-center rounded-full border border-[#ef4444] bg-[#fef2f2] px-6 py-3 text-sm font-semibold text-[#b91c1c] transition hover:bg-[#fee2e2]",
          children: "Discard"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: handleSubmit,
          disabled: isLoading,
          className: "inline-flex items-center justify-center rounded-full bg-[var(--sage)] px-6 py-3 text-sm font-semibold text-[var(--foreground)] shadow-soft transition hover:bg-[var(--sage-deep)] disabled:cursor-not-allowed disabled:opacity-50",
          children: isLoading ? "Saving..." : "Save product"
        }
      )
    ] })
  ] });
}
export {
  Alert as A,
  ProductForm as P
};
