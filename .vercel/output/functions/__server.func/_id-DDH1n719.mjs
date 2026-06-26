import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { e as useNavigate } from "./_libs/tanstack__react-router.mjs";
import { u as useQuery } from "./_libs/tanstack__react-query.mjs";
import { j as Route$7, u as useCart, h as useCartToast, d as cn, k as getProductById } from "./_ssr/router-BoccmxA6.mjs";
import "./_libs/seroval.mjs";
import { n as ChevronLeft, P as Package, H as Heart, o as Minus, p as Plus, e as Check, a as ShoppingBag, f as Truck, q as Share2 } from "./_libs/lucide-react.mjs";
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
import "./_ssr/server-DGfOajJg.mjs";
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
      data: {
        id
      }
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => navigate({
      to: "/shop"
    }), className: "inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-foreground/50 hover:text-primary transition-colors btn-bounce-hover", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Back to shop" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square overflow-hidden rounded-[2.5rem] border border-border/80 bg-cream", children: [
          selectedImage ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: selectedImage, alt: product.name, className: "h-full w-full object-cover transition-transform duration-500 hover:scale-105" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full flex items-center justify-center bg-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-16 h-16 text-foreground/20" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setLiked((v) => !v), "aria-label": liked ? "Remove from wishlist" : "Add to wishlist", className: "absolute right-6 top-6 grid place-items-center w-11 h-11 rounded-full bg-white/90 backdrop-blur shadow-card hover:scale-110 active:scale-95 transition-all", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: cn("w-5 h-5 transition-colors", liked ? "fill-blush text-blush" : "text-foreground") }) }),
          product.soldOut && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-6 bottom-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-4 py-2 rounded-xl bg-foreground text-background text-[10px] font-bold uppercase tracking-wider shadow-card select-none", children: "Sold out" }) })
        ] }),
        images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-4", children: images.map((src, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSelectedImageIndex(index), className: cn("relative aspect-square overflow-hidden rounded-2xl transition-all duration-300 btn-bounce-hover", index === selectedImageIndex ? "ring-2 ring-foreground ring-offset-2 opacity-100" : "ring-1 ring-border hover:ring-foreground/45 opacity-60 hover:opacity-100"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: `${product.name} view ${index + 1}`, className: "h-full w-full object-cover", loading: "lazy" }) }, src)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:sticky lg:top-24 space-y-6 flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl sm:text-5xl text-brown font-bold leading-tight", children: product.name }),
          product.tag && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex px-3 py-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider", children: product.tag })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: cn("text-3xl font-bold tracking-tight text-foreground", product.soldOut && "text-foreground/40 line-through"), children: [
            "₱",
            product.price.toLocaleString("en-PH", {
              minimumFractionDigits: 2
            }),
            " PHP"
          ] }),
          product.soldOut && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block rounded-full bg-red-100 text-red-700 text-[10px] font-bold px-3 py-1 uppercase tracking-wide", children: "Sold out" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-foreground/50", children: [
            "Tax included.",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
              to: "/shipping-policy"
            }), className: "underline underline-offset-2 hover:text-foreground transition-colors font-semibold", children: "Shipping" }),
            " ",
            "calculated at checkout."
          ] })
        ] }),
        product.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-foreground/75 whitespace-pre-line", children: product.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "border-border/60" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-wider text-foreground/50", children: "Quantity" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border border-border/80 rounded-full bg-white px-2 py-1 shadow-sm shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => canDecrement && setQuantity((q) => q - 1), disabled: !canDecrement, "aria-label": "Decrease quantity", className: "grid place-items-center w-8 h-8 rounded-full text-foreground/60 hover:text-foreground hover:bg-accent/40 disabled:opacity-30 transition-all btn-bounce-hover", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3.5 h-3.5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 text-center text-sm font-bold text-foreground select-none", children: quantity }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => canIncrement && setQuantity((q) => q + 1), disabled: !canIncrement, "aria-label": "Increase quantity", className: "grid place-items-center w-8 h-8 rounded-full text-foreground/60 hover:text-foreground hover:bg-accent/40 disabled:opacity-30 transition-all btn-bounce-hover", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }) })
            ] })
          ] }),
          product.stock_qty != null && product.stock_qty > 0 && product.stock_qty <= 10 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber-600 font-semibold uppercase tracking-wider", children: [
            "Only ",
            product.stock_qty,
            " left in stock!"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: handleAddToCart, disabled: isOutOfStock, className: cn("w-full flex items-center justify-center gap-2.5 rounded-full px-6 py-4 text-xs font-bold uppercase tracking-wider transition-all duration-250 btn-bounce-hover shadow-soft", isOutOfStock ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200" : "bg-white text-foreground border border-foreground hover:bg-foreground hover:text-white"), children: [
            added ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4" }),
            product.soldOut ? "Sold out" : isOutOfStock ? "Max quantity reached" : added ? "Added to cart!" : "Add to cart"
          ] }),
          !product.soldOut && !isOutOfStock && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
            handleAddToCart();
            navigate({
              to: "/checkout"
            });
          }, className: "w-full flex items-center justify-center gap-2.5 rounded-full px-6 py-4 text-xs font-bold uppercase tracking-wider bg-primary text-primary-foreground hover:bg-primary/95 transition-all btn-bounce-hover shadow-soft", children: "Buy it now" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 bg-cream/40 rounded-[1.5rem] p-4 border border-border/40 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-4 h-4 text-primary mt-0.5 shrink-0 animate-wiggle" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-brown uppercase tracking-wider text-[9px] mb-1", children: "Estimated Shipping Delivery" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5 text-foreground/75 leading-relaxed", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Philippines: 3-5 business days" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Other Countries: 14-20 business days" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-accent/35 rounded-[1.5rem] p-4 border border-border/30 text-[11px] text-foreground/60 leading-relaxed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold uppercase tracking-wider text-[9px] text-accent-foreground mb-1", children: "Kindly Note:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "*Actual colour may vary slightly from photos due to lighting & screen settings." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "*Shipping times are estimated only & might be subject to delays due to logistics courier factors." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-start", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
          if (navigator.share) {
            navigator.share({
              title: product.name,
              url: window.location.href
            });
          } else {
            navigator.clipboard.writeText(window.location.href);
          }
        }, className: "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground/60 hover:text-primary transition-colors btn-bounce-hover", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4" }),
          "Share product"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border/80 mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "faq-accordion", open: true, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Materials & Design" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "accordion-icon", "aria-hidden": true })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "accordion-content", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/75 leading-relaxed", children: "Our crafts are shaped by hand with high-quality, lightweight air-dry clay, colored with custom-mixed pastels, and sealed with multiple layers of durable protective varnish (in matte or semi-gloss finish). Every single piece is a unique original creation." }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "faq-accordion", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Shipping & Returns Policy" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "accordion-icon", "aria-hidden": true })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "accordion-content space-y-2 text-xs text-foreground/75 leading-relaxed", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Standard orders ship from Manila within 1-3 business days. Free shipping is automatically applied to orders ₱1,000 and above!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Refunds are eligible on unopened items within 7 days of package delivery. If an item arrives broken, contact us with photos within 48 hours for a replacement." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "faq-accordion", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Care Instructions" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "accordion-icon", "aria-hidden": true })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "accordion-content", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/75 leading-relaxed", children: "Clay crafts are fragile and decorative only (not waterproof or food-safe). Protect your pieces from moisture, water, extreme heat, and direct sunlight. To clean, wipe gently with a dry, soft paint brush or soft cloth." }) })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  ProductDetailPage as component
};
