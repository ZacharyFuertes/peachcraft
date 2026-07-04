import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { e as useNavigate } from "./_libs/tanstack__react-router.mjs";
import { u as useQuery } from "./_libs/tanstack__react-query.mjs";
<<<<<<<< HEAD:.vercel/output/functions/__server.func/_id-DGX8U2ey.mjs
import { i as Route$a, u as useCart, k as useCartToast, h as cn, j as getProductById, e as getAllProducts } from "./_ssr/router-D98JWfRI.mjs";
import { P as ProductCard } from "./_ssr/ProductCard-BkC9izPm.mjs";
========
import { i as Route$a, u as useCart, k as useCartToast, h as cn, j as getProductById, e as getAllProducts } from "./_ssr/router-CN-wybRF.mjs";
import { P as ProductCard } from "./_ssr/ProductCard-Cnf6dDld.mjs";
>>>>>>>> 8e9d1c4d806b4680033fc485fbb81fd36eb1433e:.vercel/output/functions/__server.func/_id-ugcyvwdX.mjs
import "./_libs/seroval.mjs";
import { w as ChevronLeft, P as Package, H as Heart, k as ChevronRight, x as Minus, y as Plus, f as Check, a as ShoppingBag, z as Upload, e as ChevronDown, E as CircleQuestionMark, F as Ruler, G as Clipboard, R as RotateCcw } from "./_libs/lucide-react.mjs";
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
import "./_ssr/supabase-BbYbDVIj.mjs";
import "./_libs/supabase__supabase-js.mjs";
import "./_libs/supabase__postgrest-js.mjs";
import "./_libs/supabase__realtime-js.mjs";
import "./_libs/supabase__phoenix.mjs";
import "./_libs/supabase__storage-js.mjs";
import "./_libs/iceberg-js.mjs";
import "./_libs/supabase__auth-js.mjs";
import "tslib";
import "./_libs/supabase__functions-js.mjs";
import "./_libs/supabase__ssr.mjs";
import "./_libs/cookie.mjs";
<<<<<<<< HEAD:.vercel/output/functions/__server.func/_id-DGX8U2ey.mjs
import "./_ssr/server-BWmwJzJ_.mjs";
========
import "./_ssr/server-BO7pyA8t.mjs";
>>>>>>>> 8e9d1c4d806b4680033fc485fbb81fd36eb1433e:.vercel/output/functions/__server.func/_id-ugcyvwdX.mjs
import "node:async_hooks";
import "./_libs/h3-v2.mjs";
import "./_libs/rou3.mjs";
import "./_libs/srvx.mjs";
import "./_libs/clsx.mjs";
import "./_libs/tailwind-merge.mjs";
import "./_libs/radix-ui__react-slot.mjs";
import "./_libs/radix-ui__react-compose-refs.mjs";
import "./_libs/class-variance-authority.mjs";
import "./_libs/radix-ui__react-separator.mjs";
import "./_libs/radix-ui__react-primitive.mjs";
import "./_libs/radix-ui__react-dialog.mjs";
import "./_libs/radix-ui__primitive.mjs";
import "./_libs/radix-ui__react-context.mjs";
import "./_libs/radix-ui__react-id.mjs";
import "./_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "./_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "./_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "./_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "./_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "./_libs/radix-ui__react-focus-scope.mjs";
import "./_libs/radix-ui__react-portal.mjs";
import "./_libs/radix-ui__react-presence.mjs";
import "./_libs/radix-ui__react-focus-guards.mjs";
import "./_libs/react-remove-scroll.mjs";
import "./_libs/react-remove-scroll-bar.mjs";
import "./_libs/react-style-singleton.mjs";
import "./_libs/get-nonce.mjs";
import "./_libs/use-sidecar.mjs";
import "./_libs/use-callback-ref.mjs";
import "./_libs/aria-hidden.mjs";
import "./_libs/radix-ui__react-tooltip.mjs";
import "./_libs/radix-ui__react-popper.mjs";
import "./_libs/floating-ui__react-dom.mjs";
import "./_libs/floating-ui__dom.mjs";
import "./_libs/floating-ui__core.mjs";
import "./_libs/floating-ui__utils.mjs";
import "./_libs/radix-ui__react-arrow.mjs";
import "./_libs/radix-ui__react-use-size.mjs";
import "./_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "./_libs/radix-ui__react-collapsible.mjs";
import "./_libs/radix-ui__react-avatar.mjs";
import "./_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "./_libs/use-sync-external-store.mjs";
import "./_libs/radix-ui__react-dropdown-menu.mjs";
import "./_libs/radix-ui__react-menu.mjs";
import "./_libs/radix-ui__react-collection.mjs";
import "./_libs/radix-ui__react-direction.mjs";
import "./_libs/radix-ui__react-roving-focus.mjs";
import "./_libs/zod.mjs";
import "./_ssr/Price-VXxyaxmC.mjs";
function ProductDetailPage() {
  const navigate = useNavigate();
  const {
    id
  } = Route$a.useParams();
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
  const {
    data: allProducts
  } = useQuery({
    queryKey: ["all-products"],
    queryFn: getAllProducts
  });
  const [liked, setLiked] = reactExports.useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = reactExports.useState(0);
  const [added, setAdded] = reactExports.useState(false);
  const [quantity, setQuantity] = reactExports.useState(1);
  const [openAccordion, setOpenAccordion] = reactExports.useState("materials");
  const {
    items,
    addItem
  } = useCart();
  const {
    notify
  } = useCartToast();
  const relatedProducts = (allProducts ?? []).filter((p) => p.id !== product?.id).slice(0, 4);
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
  const isSoldOut = product?.is_active === false || product?.stock_qty != null && product.stock_qty <= 0;
  const isOutOfStock = isSoldOut || product?.stock_qty != null && existingCartItem && existingCartItem.qty >= product.stock_qty;
  const maxQty = product?.stock_qty ?? 25;
  const canIncrement = quantity < maxQty;
  const canDecrement = quantity > 1;
  const toggleAccordion = (key) => {
    setOpenAccordion((prev) => prev === key ? null : key);
  };
  const accordions = [{
    key: "materials",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { className: "w-5 h-5 text-foreground/60 shrink-0" }),
    title: "Materials",
    content: "Our crafts are shaped by hand with high-quality, lightweight air-dry clay, colored with custom-mixed pastels, and sealed with multiple layers of durable protective varnish (in matte or semi-gloss finish). Every single piece is a unique original creation."
  }, {
    key: "dimensions",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Ruler, { className: "w-5 h-5 text-foreground/60 shrink-0" }),
    title: "Dimensions",
    content: "Each fake cake container is approximately 12cm in diameter and 15cm in height. Due to the hand-sculpted nature, please allow minor variations of 1–2cm in sizes."
  }, {
    key: "care",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clipboard, { className: "w-5 h-5 text-foreground/60 shrink-0" }),
    title: "Care Instructions",
    content: "Clay crafts are fragile and decorative only (not waterproof or food-safe). Protect your pieces from moisture, water, extreme heat, and direct sunlight. To clean, wipe gently with a dry, soft paint brush or soft cloth."
  }, {
    key: "returns",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-5 h-5 text-foreground/60 shrink-0" }),
    title: "Return Policy",
    content: "Standard orders ship from Manila within 1–3 business days. Free shipping is automatically applied to orders ₱1,000 and above! Refunds are eligible on unopened items within 7 days of package delivery. If an item arrives broken, contact us with photos within 48 hours for a replacement."
  }];
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
    }), className: "inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-foreground/50 hover:text-primary transition-colors btn-bounce-hover", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Back to shop" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-20 items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full overflow-hidden bg-cream\n              aspect-[4/3] sm:aspect-square\n              rounded-none sm:rounded-[2.5rem]\n              border-0 sm:border sm:border-border/80", children: [
            selectedImage ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: selectedImage, alt: product.name, className: "h-full w-full object-cover transition-transform duration-500 hover:scale-105" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full flex items-center justify-center bg-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-16 h-16 text-foreground/20" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setLiked((v) => !v), "aria-label": liked ? "Remove from wishlist" : "Add to wishlist", className: "absolute right-4 top-4 sm:right-6 sm:top-6 grid place-items-center w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-card hover:scale-110 active:scale-95 transition-all", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: cn("w-5 h-5 transition-colors", liked ? "fill-blush text-blush" : "text-foreground") }) }),
            isSoldOut && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-4 bottom-4 sm:left-6 sm:bottom-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-4 py-2 rounded-xl bg-foreground text-background text-[10px] font-bold uppercase tracking-wider shadow-card select-none", children: "Sold out" }) })
          ] }),
          images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-6 text-sm font-semibold text-foreground/75 select-none px-4 sm:px-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setSelectedImageIndex((prev) => prev === 0 ? images.length - 1 : prev - 1), "aria-label": "Previous image", className: "p-2 hover:text-primary transition-colors btn-bounce-hover", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums font-bold text-sm", children: [
              selectedImageIndex + 1,
              " / ",
              images.length
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setSelectedImageIndex((prev) => prev === images.length - 1 ? 0 : prev + 1), "aria-label": "Next image", className: "p-2 hover:text-primary transition-colors btn-bounce-hover", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" }) })
          ] }),
          images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:grid grid-cols-4 gap-4", children: images.map((src, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSelectedImageIndex(index), className: cn("relative aspect-square overflow-hidden rounded-2xl transition-all duration-300 btn-bounce-hover", index === selectedImageIndex ? "ring-2 ring-foreground ring-offset-2 opacity-100" : "ring-1 ring-border hover:ring-foreground/45 opacity-60 hover:opacity-100"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: `${product.name} view ${index + 1}`, className: "h-full w-full object-cover", loading: "lazy" }) }, src)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 sm:px-0 lg:sticky lg:top-24 space-y-5 flex flex-col mt-5 lg:mt-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-4xl lg:text-5xl text-brown font-bold leading-tight", children: product.name }),
            product.tag && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex px-3 py-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider", children: product.tag })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("text-xl sm:text-2xl font-bold tracking-tight text-foreground", isSoldOut && "text-foreground/40 line-through"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Price, { amountPHP: product.price }) }),
            isSoldOut && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block rounded-full bg-red-100 text-red-700 text-[10px] font-bold px-3 py-1 uppercase tracking-wide", children: "Sold out" }),
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground/75", children: "Quantity" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-0 border border-border/80 rounded-lg bg-white w-36 overflow-hidden shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => canDecrement && setQuantity((q) => q - 1), disabled: !canDecrement, "aria-label": "Decrease quantity", className: "grid place-items-center w-11 h-11 text-foreground/60 hover:text-foreground hover:bg-accent/40 disabled:opacity-30 transition-all", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3.5 h-3.5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-center text-sm font-bold text-foreground select-none tabular-nums border-x border-border/60 h-11 flex items-center justify-center", children: quantity }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => canIncrement && setQuantity((q) => q + 1), disabled: !canIncrement, "aria-label": "Increase quantity", className: "grid place-items-center w-11 h-11 text-foreground/60 hover:text-foreground hover:bg-accent/40 disabled:opacity-30 transition-all", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }) })
            ] }),
            product.stock_qty != null && product.stock_qty > 0 && product.stock_qty <= 10 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber-600 font-semibold uppercase tracking-wider", children: [
              "Only ",
              product.stock_qty,
              " left in stock!"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: handleAddToCart, disabled: isOutOfStock, className: cn("w-full flex items-center justify-center gap-2.5 rounded-full px-6 py-4 text-xs font-bold uppercase tracking-wider border border-foreground bg-white text-foreground hover:bg-foreground hover:text-white transition-all duration-200 btn-bounce-hover shadow-sm", isOutOfStock && "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"), children: [
              added ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4" }),
              isSoldOut ? "Sold out" : isOutOfStock ? "Max quantity reached" : added ? "Added to cart!" : "Add to cart"
            ] }),
            !isSoldOut && !isOutOfStock && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
              handleAddToCart();
              navigate({
                to: "/checkout"
              });
            }, className: "w-full flex items-center justify-center gap-2.5 rounded-full px-6 py-4 text-xs font-bold uppercase tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 transition-all btn-bounce-hover shadow-soft", children: "Buy it now" })
          ] }),
          product.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-foreground/75 whitespace-pre-line pt-1", children: product.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-start border-t border-border/80 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
            if (navigator.share) {
              navigator.share({
                title: product.name,
                url: window.location.href
              });
            } else {
              navigator.clipboard.writeText(window.location.href);
            }
          }, className: "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground/60 hover:text-primary transition-colors btn-bounce-hover", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
            "Share"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border/80", children: accordions.map(({
            key,
            icon,
            title,
            content
          }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border/80", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => toggleAccordion(key), "aria-expanded": openAccordion === key, className: "w-full flex items-center justify-between gap-3 py-4 text-left group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3 text-sm font-semibold text-foreground", children: [
                icon,
                title
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: cn("w-4 h-4 text-foreground/50 shrink-0 transition-transform duration-300", openAccordion === key && "rotate-180") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("overflow-hidden transition-all duration-300 ease-in-out", openAccordion === key ? "max-h-48 opacity-100 pb-4" : "max-h-0 opacity-0"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/70 leading-relaxed", children: content }) })
          ] }, key)) })
        ] })
      ] }),
      relatedProducts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-20 pt-16 border-t border-border/80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl text-brown font-bold mb-8", children: "Related products" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4", children: relatedProducts.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p }, p.id)) })
      ] })
    ] })
  ] });
}
export {
  ProductDetailPage as component
};
