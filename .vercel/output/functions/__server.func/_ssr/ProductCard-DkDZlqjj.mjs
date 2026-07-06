import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { h as cn } from "./router-CKtFdSku.mjs";
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
        className: "custom-product-card group",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden bg-cream", children: [
            imageSrc ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "custom-card-media", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: imageSrc,
                  alt: product.name,
                  className: "custom-card-img",
                  loading: "lazy"
                }
              ),
              product.images?.[1] && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: product.images[1],
                  alt: "",
                  className: "custom-card-img",
                  loading: "lazy"
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "custom-card-media flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/20 text-4xl", children: "🎂" }) }),
            product.soldOut && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-2.5 bottom-2.5 sm:left-3 sm:bottom-3 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-md bg-foreground/90 backdrop-blur text-[9px] font-bold uppercase tracking-wider text-background shadow-card select-none", children: "Sold out" }) }),
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
                className: "absolute right-2.5 top-2.5 sm:right-3 sm:top-3 z-10 grid place-items-center w-8 h-8 rounded-full bg-white/90 backdrop-blur shadow-card hover:scale-110 active:scale-95 transition-transform",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: cn("w-3.5 h-3.5 transition-colors", liked ? "fill-blush text-blush" : "text-foreground/70") })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "custom-card-info", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "custom-card-heading", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/shop/$id",
                params: { id: product.id },
                id: `CardLink-${product.id}`,
                className: "full-unstyled-link",
                onClick: (e) => e.stopPropagation(),
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "line-clamp-2", children: [
                  product.name,
                  product.tag ? ` (${product.tag})` : ""
                ] })
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "custom-card-price", children: [
              "₱",
              product.price.toLocaleString("en-PH"),
              " PHP"
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
      .custom-product-card {
        border: none;
        border-radius: 10px;
        box-shadow: 0 4px 5px rgba(0, 0, 0, 0.15);
        background-color: #ffffff;
        overflow: hidden;
        position: relative;
        cursor: pointer;
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      .custom-card-media {
        width: 100%;
        aspect-ratio: 1 / 1;
        overflow: hidden;
        background-color: #f9f2e8;
        position: relative;
      }
      .custom-card-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: opacity 500ms ease, transform 500ms ease;
      }
      .custom-card-media img:first-child:not(:only-child) {
        position: relative;
        z-index: 1;
      }
      .custom-card-media img + img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        opacity: 0;
      }
      .custom-product-card:hover .custom-card-img {
        transform: scale(1.03);
      }
      .custom-product-card:hover .custom-card-media img:first-child:not(:only-child) {
        opacity: 0;
      }
      .custom-product-card:hover .custom-card-media img + img {
        opacity: 1;
      }
      .custom-card-info {
        padding: 13px 10px;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
      }
      @media (min-width: 750px) {
        .custom-card-info {
          padding: 17px 10px;
        }
      }
      .custom-card-heading {
        font-family: 'Quicksand', sans-serif;
        font-weight: 700;
        font-size: 14.4px;
        line-height: 1.25;
        color: #000000;
        margin: 0;
      }
      @media (min-width: 750px) {
        .custom-card-heading {
          font-size: 15.6px;
        }
      }
      .custom-card-heading .full-unstyled-link {
        text-decoration: none;
        color: currentColor;
        display: block;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
        font-synthesis: none;
      }
      .custom-card-heading .full-unstyled-link::after {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 1;
      }
      .custom-card-heading .full-unstyled-link:focus {
        outline: none;
        box-shadow: none;
      }
      .custom-product-card:hover .custom-card-heading .full-unstyled-link {
        text-decoration: underline;
        text-underline-offset: 0.3rem;
      }
      .custom-card-price {
        font-family: 'Quicksand', sans-serif;
        font-weight: 500;
        font-size: 16px;
        line-height: 1.5;
        letter-spacing: 0.1rem;
        color: #000000;
        margin-top: 7px;
        margin-bottom: 0;
      }
    ` })
  ] });
}
export {
  ProductCard as P
};
