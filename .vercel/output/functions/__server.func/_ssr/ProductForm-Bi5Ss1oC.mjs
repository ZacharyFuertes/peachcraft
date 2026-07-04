import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { i as imageCompression } from "../_libs/browser-image-compression.mjs";
import { h as cn, o as Button, I as Input, K as uploadProductImage } from "./router-CN-wybRF.mjs";
import { a as getSupabaseClient } from "./supabase-BbYbDVIj.mjs";
import { R as Root } from "../_libs/radix-ui__react-label.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { S as Switch } from "./switch-C_Wt3iIf.mjs";
import { n as normalizeProductCategories, g as getAvailableProductCategories } from "./productCategories-DYShMXc1.mjs";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = Root.displayName;
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
  const tagOptions = ["New", "Best seller", "Limited", "Featured", "Gift"];
  const [name, setName] = reactExports.useState(initialData?.name ?? "");
  const [priceInput, setPriceInput] = reactExports.useState(initialData?.price != null ? String(initialData.price) : "");
  const [description, setDescription] = reactExports.useState(initialData?.description ?? "");
  const [selectedCategories, setSelectedCategories] = reactExports.useState(
    initialData?.category ? normalizeProductCategories(initialData.category) : []
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
    setSelectedCategories(initialData?.category ? normalizeProductCategories(initialData.category) : []);
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
    setSelectedCategories(initialData?.category ? normalizeProductCategories(initialData.category) : []);
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 pb-4 border-b", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "Product details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "Fill in the information below to create your product." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => navigate({ to: "/shop" }), children: "Preview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: handleSubmit, disabled: isLoading, children: isLoading ? "Saving..." : "Save product" })
      ] })
    ] }),
    formError && /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { variant: "destructive", className: "rounded-lg", children: formError }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border bg-white p-5 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-gray-900 mb-4", children: "Basic info" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "product-name", children: [
            "Name ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "product-name",
              value: name,
              onChange: (e) => setName(e.target.value),
              placeholder: "Product display name"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: "Enter the product display name." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "product-price", children: [
            "Price ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500", children: "₱" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "product-price",
                type: "text",
                inputMode: "numeric",
                value: priceInput,
                onChange: (e) => setPriceInput(e.target.value.replace(/[^0-9]/g, "")),
                className: "pl-8",
                placeholder: "0"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: "Set the retail price in Philippine pesos." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "product-desc", children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: description.length })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              id: "product-desc",
              value: description,
              onChange: (e) => setDescription(e.target.value),
              rows: 5,
              className: "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500",
              placeholder: "Describe product details, materials, and benefits..."
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border bg-white p-5 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-gray-900 mb-4", children: "Category & tags" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: categorySelect,
              onChange: (e) => {
                setCategorySelect(e.target.value);
                handleCategorySelect(e.target.value);
              },
              className: "flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select a category" }),
                getAvailableProductCategories(selectedCategories).map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o, children: o }, o)),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "new", children: "Add custom category" })
              ]
            }
          ),
          showCategoryInput && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: customCategory,
                onChange: (e) => setCustomCategory(e.target.value),
                placeholder: "Type a new category"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: () => {
                  addCategory(customCategory);
                  setCustomCategory("");
                  setShowCategoryInput(false);
                },
                children: "Add"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: selectedCategories.map((value) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => removeCategory(value),
              className: "inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100",
              children: [
                value,
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400", children: "×" })
              ]
            },
            value
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: "Choose one or more categories and remove them by clicking the pill." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Tags" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: tagSelect,
              onChange: (e) => {
                setTagSelect(e.target.value);
                handleTagSelect(e.target.value);
              },
              className: "flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select a tag" }),
                tagOptions.filter((o) => !selectedTags.includes(o)).map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o, children: o }, o)),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "new", children: "Add custom tag" })
              ]
            }
          ),
          showTagInput && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: customTag,
                onChange: (e) => setCustomTag(e.target.value),
                placeholder: "Type a new tag"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: () => {
                  addTag(customTag);
                  setCustomTag("");
                  setShowTagInput(false);
                },
                children: "Add"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: selectedTags.map((value) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => removeTag(value),
              className: "inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100",
              children: [
                value,
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400", children: "×" })
              ]
            },
            value
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: "Add tags for special collections, promotions, or product highlights." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border bg-white p-5 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-gray-900 mb-4", children: "Inventory & appearance" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Swatch" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-gray-200 bg-white p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3", children: [
              presetSwatches.map((value) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setSwatch(value),
                  className: cn(
                    "h-9 w-9 rounded-full border transition-all",
                    value === swatch ? "border-indigo-500 outline outline-2 outline-indigo-500 outline-offset-2" : "border-gray-200"
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
                  className: "inline-flex h-9 items-center justify-center rounded-full border border-gray-200 bg-white px-3 text-xs font-medium text-gray-600 hover:bg-gray-50",
                  children: "Custom"
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: "Choose a preset swatch or add a custom color for this product." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "product-stock", children: [
            "Stock quantity ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "product-stock",
              type: "text",
              inputMode: "numeric",
              value: stockQtyInput,
              onChange: (e) => setStockQtyInput(e.target.value.replace(/[^0-9]/g, "")),
              placeholder: "0"
            }
          ),
          Number(stockQtyInput) > 0 && Number(stockQtyInput) <= 5 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { variant: "warning", className: "rounded-lg text-xs py-2", children: "Low stock warning at 5 units." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: "Low stock warning at 5 units." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium text-gray-900", children: "Active" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: isActive ? "Active — product is visible in shop" : "Inactive — hidden from shop" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: isActive, onCheckedChange: setIsActive })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border bg-white p-5 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-gray-900 mb-4", children: "Product images" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onDragOver: handleDragOver,
          onDragEnter: handleDragEnter,
          onDragLeave: handleDragLeave,
          onDrop: handleDrop,
          className: cn(
            "rounded-lg border-2 border-dashed px-6 py-8 text-center transition cursor-pointer",
            isDragActive ? "border-indigo-400 bg-indigo-50" : "border-gray-200 bg-gray-50 hover:bg-gray-100/50"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-600", children: "Drag and drop images here" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-gray-400", children: "or click to choose files" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", size: "sm", className: "mt-3", onClick: openFileChooser, children: "Choose files" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[10px] text-gray-400", children: "JPG, PNG, WEBP, GIF · max 5MB · up to 8 images" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: fileInputRef,
                type: "file",
                accept: "image/jpeg,image/png,image/webp,image/gif",
                multiple: true,
                onChange: (e) => handleImageFiles(e.target.files),
                className: "hidden"
              }
            )
          ]
        }
      ),
      uploading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 rounded-lg bg-gray-100 px-4 py-2 text-xs text-gray-600", children: [
        "Uploading images... ",
        uploadProgress,
        "%"
      ] }),
      uploadError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-red-500", children: uploadError }),
      images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3", children: images.map((src) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden rounded-lg border border-gray-200 bg-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: "Product preview", className: "h-36 w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => removeImage(src),
            className: "absolute right-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100",
            children: "✕"
          }
        )
      ] }, src)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 border-t pt-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: handleDiscard, className: "text-red-600 border-red-200 hover:bg-red-50", children: "Discard changes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleSubmit, disabled: isLoading, children: isLoading ? "Saving..." : "Save product" })
    ] })
  ] });
}
export {
  Alert as A,
  ProductForm as P
};
