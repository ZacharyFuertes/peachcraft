import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { h as cn } from "./router-CEXJ6wrN.mjs";
import { H as Heart } from "../_libs/lucide-react.mjs";
function ProductCard({ product }) {
  const [liked, setLiked] = reactExports.useState(false);
  const navigate = useNavigate();
  const imageSrc = product.images?.[0] ?? null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "article",
      {
        onClick: () => navigate({ to: `/shop/${product.id}` }),
        className: cn(
          "group relative cursor-pointer",
          // Mobile: borderless flat card; Desktop: elevated with rounded corners
          "rounded-[1rem] sm:rounded-[1.75rem] border border-border/70 overflow-hidden",
          "bg-white transition-all duration-300",
          "hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-card sm:hover:shadow-soft",
          "shadow-[0_1px_4px_-1px_rgba(0,0,0,0.08)] sm:shadow-card"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden bg-cream rounded-t-[1rem] sm:rounded-t-[1.75rem]", children: [
            imageSrc ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full aspect-[1/1] sm:aspect-[4/5] overflow-hidden bg-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: imageSrc,
                alt: product.name,
                className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
                loading: "lazy"
              }
            ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full aspect-square bg-cream flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/20 text-4xl", children: "🎂" }) }),
            product.soldOut && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-2.5 bottom-2.5 sm:left-3 sm:bottom-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-md bg-foreground/90 backdrop-blur text-[9px] font-bold uppercase tracking-wider text-background shadow-card select-none", children: "Sold out" }) }),
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
                className: "absolute right-2.5 top-2.5 sm:right-3 sm:top-3 grid place-items-center w-8 h-8 rounded-full bg-white/90 backdrop-blur shadow-card hover:scale-110 active:scale-95 transition-transform",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: cn("w-3.5 h-3.5 transition-colors", liked ? "fill-blush text-blush" : "text-foreground/70") })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 sm:p-5 space-y-0.5 sm:space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "card__heading", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/shop/$id",
                params: { id: product.id },
                id: `CardLink-${product.id}`,
                className: "full-unstyled-link",
                onClick: (e) => e.stopPropagation(),
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "line-clamp-2", style: { fontFamily: "'Quicksand', sans-serif", fontSize: "15px", lineHeight: "19.5px", fontWeight: 500, letterSpacing: "0.6px", color: "#000000", opacity: 0.85 }, children: [
                  product.name,
                  product.tag ? ` (${product.tag})` : ""
                ] })
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "card__price", style: { fontFamily: "'Quicksand', sans-serif", fontSize: "15px", lineHeight: "1.5", fontWeight: 500, color: "#000000" }, children: [
              "₱",
              product.price.toLocaleString("en-PH"),
              " PHP"
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
      .card__heading {
        font-family: 'Quicksand', sans-serif;
        margin: 0;
      }
      .card__heading .full-unstyled-link {
        text-decoration: none;
        color: currentColor;
        display: block;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
        font-synthesis: none;
      }
      .card__heading .full-unstyled-link::after {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 1;
      }
      .card__heading .full-unstyled-link:focus {
        outline: none;
        box-shadow: none;
      }
      article:hover .card__heading .full-unstyled-link {
        text-decoration: underline;
        text-underline-offset: 0.3rem;
      }
      @media (min-width: 990px) {
        .card__heading .full-unstyled-link {
          font-size: 15px;
        }
      }
      .card__price {
        font-family: 'Quicksand', sans-serif;
      }
    ` })
  ] });
}
export {
  ProductCard as P
};
