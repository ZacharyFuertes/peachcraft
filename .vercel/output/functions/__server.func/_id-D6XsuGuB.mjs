import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { e as useNavigate } from "./_libs/tanstack__react-router.mjs";
import { a as useQuery } from "./_libs/tanstack__react-query.mjs";
import { R as Route$7, u as useCart, f as useCartToast, b as cn, i as getProductById } from "./_ssr/router-ChcEy1hy.mjs";
import "./_libs/seroval.mjs";
import { k as ChevronLeft, P as Package, H as Heart, l as Minus, m as Plus, e as Check, a as ShoppingBag, n as Shield, T as Truck, o as Share2, i as ChevronUp, h as ChevronDown } from "./_libs/lucide-react.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_libs/isbot.mjs";
import "./_libs/tanstack__query-core.mjs";
import "./_ssr/supabase-B6oNw5MC.mjs";
import "./_libs/supabase__supabase-js.mjs";
import "./_libs/supabase__postgrest-js.mjs";
import "./_libs/supabase__realtime-js.mjs";
import "./_libs/supabase__phoenix.mjs";
import "./_libs/supabase__storage-js.mjs";
import "./_libs/iceberg-js.mjs";
import "./_libs/supabase__auth-js.mjs";
import "tslib";
import "./_libs/supabase__functions-js.mjs";
import "./_ssr/server-BjK0EJpJ.mjs";
import "node:async_hooks";
import "./_libs/h3-v2.mjs";
import "./_libs/rou3.mjs";
import "./_libs/srvx.mjs";
import "./_libs/clsx.mjs";
import "./_libs/tailwind-merge.mjs";
import "./_libs/zod.mjs";
function ProductDetailPage() {
  const navigate = useNavigate();
  const {
    id
  } = Route$7.useParams();
  const {
    data: product,
    isLoading,
    error
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById({
      id
    })
  });
  const [liked, setLiked] = reactExports.useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = reactExports.useState(0);
  const [added, setAdded] = reactExports.useState(false);
  const [quantity, setQuantity] = reactExports.useState(1);
  const [openSection, setOpenSection] = reactExports.useState(null);
  const {
    items,
    addItem
  } = useCart();
  const {
    notify
  } = useCartToast();
  const handleAddToCart = () => {
    if (!product) return;
    try {
      addItem(product, quantity);
      notify({
        productName: product.name,
        productImage: product.images?.[0] ?? null,
        qty: quantity
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 1400);
    } catch (err) {
      if (err instanceof Error) {
        window.alert(err.message);
      }
    }
  };
  const images = product?.images ?? [];
  const selectedImage = images[selectedImageIndex] ?? images[0] ?? null;
  const existingCartItem = items.find((item) => item.product_id === product?.id);
  const isOutOfStock = product?.soldOut || product?.stock_qty != null && product.stock_qty <= 0 || product?.stock_qty != null && existingCartItem && existingCartItem.qty >= product.stock_qty;
  const maxQty = product?.stock_qty ?? 25;
  const canIncrement = quantity < maxQty;
  const canDecrement = quantity > 1;
  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-cream flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/60 text-sm", children: "Loading product..." })
    ] }) });
  }
  if (error || !product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-cream flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-500 text-sm", children: error instanceof Error ? error.message : "Product not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => navigate({
        to: "/shop"
      }), className: "inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition hover:bg-foreground/90", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
        " Back to shop"
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => navigate({
      to: "/shop"
    }), className: "inline-flex items-center gap-1.5 text-sm text-foreground/60 hover:text-foreground transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Back to shop" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square overflow-hidden rounded-2xl bg-cream", children: [
          selectedImage ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: selectedImage, alt: product.name, className: "h-full w-full object-cover transition-transform duration-500 hover:scale-105" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full flex items-center justify-center bg-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-16 h-16 text-foreground/20" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setLiked((v) => !v), "aria-label": liked ? "Remove from wishlist" : "Add to wishlist", className: "absolute right-4 top-4 grid place-items-center w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-card hover:scale-110 transition-all", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: cn("w-5 h-5 transition-colors", liked ? "fill-blush text-blush" : "text-foreground/60") }) }),
          product.soldOut && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-4 bottom-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-4 py-1.5 rounded-full bg-foreground text-background text-xs font-bold uppercase tracking-wider", children: "Sold out" }) })
        ] }),
        images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-3", children: images.map((src, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSelectedImageIndex(index), className: cn("relative aspect-square overflow-hidden rounded-xl transition-all duration-200", index === selectedImageIndex ? "ring-2 ring-foreground ring-offset-2" : "ring-1 ring-border hover:ring-foreground/40 opacity-70 hover:opacity-100"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: `${product.name} view ${index + 1}`, className: "h-full w-full object-cover", loading: "lazy" }) }, src)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl sm:text-4xl text-brown leading-tight", children: [
          product.name,
          product.tag && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-lg text-muted-foreground font-normal", children: [
            "— ",
            product.tag
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-3 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: cn("text-2xl font-semibold", product.soldOut ? "text-foreground/40 line-through" : "text-foreground"), children: [
            "₱",
            product.price.toLocaleString("en-PH", {
              minimumFractionDigits: 2
            }),
            " PHP"
          ] }),
          product.soldOut && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-red-100 text-red-700 text-xs font-bold px-3 py-1 uppercase tracking-wide", children: "Sold out" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1.5 text-xs text-foreground/50", children: [
          "Tax included.",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
            to: "/shipping-policy"
          }), className: "underline underline-offset-2 hover:text-foreground/70 transition-colors", children: "Shipping" }),
          " ",
          "calculated at checkout."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 border-t border-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.15em] text-foreground/60 mb-3", children: "Quantity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center rounded-lg border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => canDecrement && setQuantity((q) => q - 1), disabled: !canDecrement, "aria-label": "Decrease quantity", className: "grid place-items-center w-11 h-11 text-foreground/60 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3.5 h-3.5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-12 text-center text-sm font-semibold text-foreground tabular-nums select-none", children: quantity }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => canIncrement && setQuantity((q) => q + 1), disabled: !canIncrement, "aria-label": "Increase quantity", className: "grid place-items-center w-11 h-11 text-foreground/60 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }) })
          ] }),
          product.stock_qty != null && product.stock_qty > 0 && product.stock_qty <= 10 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-xs text-amber-600 font-medium", children: [
            "Only ",
            product.stock_qty,
            " left in stock"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: handleAddToCart, disabled: isOutOfStock, className: cn("w-full flex items-center justify-center gap-2.5 rounded-lg px-6 py-4 text-sm font-semibold uppercase tracking-wider transition-all duration-200", isOutOfStock ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200" : "bg-white text-foreground border border-foreground hover:bg-foreground hover:text-white"), children: [
            added ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4" }),
            product.soldOut ? "Sold out" : isOutOfStock ? "Max quantity reached" : added ? "Added to cart!" : "Add to cart"
          ] }),
          !product.soldOut && !isOutOfStock && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
            handleAddToCart();
            navigate({
              to: "/checkout"
            });
          }, className: "w-full flex items-center justify-center gap-2.5 rounded-lg px-6 py-4 text-sm font-semibold uppercase tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200", children: "Buy it now" })
        ] }),
        product.description && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-7 text-foreground/70 whitespace-pre-line", children: product.description }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-4", children: [
          product.category && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 text-foreground/40 mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.15em] text-foreground/50", children: "Category" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm text-foreground/80", children: product.category })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-foreground/40 mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.15em] text-foreground/50", children: "Availability" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm text-foreground/80", children: product.soldOut ? "Currently sold out" : product.stock_qty != null ? `${product.stock_qty} available` : "In stock" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 pt-6 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-4 h-4 text-foreground/40 mt-0.5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.15em] text-foreground/50 underline underline-offset-2", children: "Estimated shipping time" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 space-y-1 text-sm text-foreground/70", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Philippines: 4-6 business days" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Other Countries: 14-20 business days" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 pt-6 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.15em] text-foreground/50 underline underline-offset-2 mb-2", children: "Kindly Note:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-xs text-foreground/50 leading-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "*Actual colour may vary slightly from photos due to lighting & screen settings." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "*Shipping times are estimated only & might be subject to delays due to unforeseen circumstances." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 pt-6 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
          if (navigator.share) {
            navigator.share({
              title: product.name,
              url: window.location.href
            });
          } else {
            navigator.clipboard.writeText(window.location.href);
          }
        }, className: "inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4" }),
          "Share"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 border-t border-border divide-y divide-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => toggleSection("materials"), className: "w-full flex items-center justify-between py-4 text-sm font-semibold text-foreground hover:text-foreground/80 transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4" }),
                "Materials"
              ] }),
              openSection === "materials" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4" })
            ] }),
            openSection === "materials" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-4 text-sm text-foreground/60 leading-6 animate-in fade-in slide-in-from-top-1 duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Handcrafted with premium materials. Each piece is unique and made with love." }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => toggleSection("shipping"), className: "w-full flex items-center justify-between py-4 text-sm font-semibold text-foreground hover:text-foreground/80 transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-4 h-4" }),
                "Shipping & Returns"
              ] }),
              openSection === "shipping" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4" })
            ] }),
            openSection === "shipping" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-4 text-sm text-foreground/60 leading-6 animate-in fade-in slide-in-from-top-1 duration-200", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We ship within 1-3 business days. Standard delivery takes 4-6 business days within the Philippines and 14-20 business days internationally." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2", children: "Returns are accepted within 7 days of delivery for unused items in original packaging." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => toggleSection("care"), className: "w-full flex items-center justify-between py-4 text-sm font-semibold text-foreground hover:text-foreground/80 transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }),
                "Care Instructions"
              ] }),
              openSection === "care" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4" })
            ] }),
            openSection === "care" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-4 text-sm text-foreground/60 leading-6 animate-in fade-in slide-in-from-top-1 duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Handle with care. Keep away from water and direct sunlight. Clean gently with a dry soft cloth." }) })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  ProductDetailPage as component
};
