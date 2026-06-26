import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useCart, h as useCartToast, d as cn } from "./router-BoccmxA6.mjs";
import { H as Heart, e as Check, a as ShoppingBag } from "../_libs/lucide-react.mjs";
const namedSwatchColors = {
  blush: "#f7c8d9",
  sage: "#a8c5a3",
  cream: "#f9f2e8",
  peach: "#f5d0b9"
};
function hexContrastColor(hex) {
  try {
    const h = hex.replace("#", "");
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1e3;
    return brightness > 128 ? "#000000" : "#ffffff";
  } catch {
    return "#000000";
  }
}
function ProductCard({ product }) {
  const [liked, setLiked] = reactExports.useState(false);
  const [added, setAdded] = reactExports.useState(false);
  const navigate = useNavigate();
  const { items, addItem } = useCart();
  const { notify } = useCartToast();
  const imageSrc = product.images?.[0] ?? null;
  const swatchColor = product.swatch ?? "#f7c8d9";
  const tagSwatch = swatchColor.startsWith("#") ? swatchColor : namedSwatchColors[swatchColor] ?? "#f7c8d9";
  hexContrastColor(tagSwatch);
  const existingCartItem = items.find((item) => item.product_id === product.id);
  const isOutOfStock = product.soldOut || product.stock_qty != null && existingCartItem?.qty >= product.stock_qty;
  const handleAddToCart = (e) => {
    e.stopPropagation();
    try {
      addItem(product, 1);
      notify({
        productName: product.name,
        productImage: product.images?.[0] ?? null,
        qty: 1
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 1400);
    } catch (error) {
      if (error instanceof Error) {
        window.alert(error.message);
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      onClick: () => navigate({ to: `/shop/${product.id}` }),
      className: cn(
        "group relative rounded-[1.5rem] sm:rounded-[2rem] border border-border/80 overflow-hidden shadow-card bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-soft cursor-pointer"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-t-[1.5rem] sm:rounded-t-[2rem]", children: [
          imageSrc ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full aspect-[4/5] overflow-hidden bg-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: imageSrc,
              alt: product.name,
              className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
              loading: "lazy"
            }
          ) }) : null,
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-3 bottom-3 sm:left-4 sm:bottom-4 flex flex-col gap-2", children: product.soldOut && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2.5 py-1 rounded-md bg-foreground/90 backdrop-blur text-[9px] font-bold uppercase tracking-wider shadow-card select-none", children: "Sold out" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: (e) => {
                e.stopPropagation();
                setLiked((v) => !v);
              },
              "aria-label": liked ? "Remove from wishlist" : "Add to wishlist",
              "aria-pressed": liked,
              className: "absolute right-3 top-3 sm:right-4 sm:top-4 grid place-items-center w-8.5 h-8.5 rounded-full bg-white/90 backdrop-blur shadow-card hover:scale-110 active:scale-95 transition-transform",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: cn("w-3.5 h-3.5 transition-colors", liked ? "fill-blush text-blush" : "text-foreground") })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 sm:p-6 bg-white rounded-b-[1.5rem] sm:rounded-b-[2rem] space-y-2 sm:space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-sm sm:text-base font-bold text-brown leading-tight", children: [
              product.name,
              " ",
              product.tag ? `(${product.tag})` : ""
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs sm:text-sm text-foreground/80 font-medium", children: [
              "₱",
              product.price.toLocaleString("en-PH"),
              " PHP"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex pt-2 border-t border-border/60 items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-foreground/50 font-medium", children: product.soldOut ? "Unavailable" : product.category ?? "Handmade" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleAddToCart,
                disabled: isOutOfStock,
                className: cn(
                  "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-all btn-bounce-hover shadow-soft",
                  isOutOfStock ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200" : "bg-foreground text-background hover:bg-foreground/90"
                ),
                children: [
                  added ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-3 h-3" }),
                  product.soldOut ? "Sold out" : added ? "Added!" : "Add"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  ProductCard as P
};
