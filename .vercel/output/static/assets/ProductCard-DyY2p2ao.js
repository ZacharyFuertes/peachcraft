import{c as r,r as d,u as l,j as e,G as m,L as u}from"./index-CqPUuDTD.js";const h=[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",key:"mvr1a0"}]],g=r("heart",h);function p({product:i}){const[s,o]=d.useState(!1),c=l(),a=i.images?.[0]??null;return e.jsxs(e.Fragment,{children:[e.jsxs("article",{onClick:()=>c({to:`/shop/${i.id}`}),className:"custom-product-card group",children:[e.jsxs("div",{className:"relative overflow-hidden bg-cream",children:[a?e.jsxs("div",{className:"custom-card-media",children:[e.jsx("img",{src:a,alt:i.name,className:"custom-card-img",loading:"lazy"}),i.images?.[1]&&e.jsx("img",{src:i.images[1],alt:"",className:"custom-card-img",loading:"lazy"})]}):e.jsx("div",{className:"custom-card-media flex items-center justify-center",children:e.jsx("span",{className:"text-foreground/20 text-4xl",children:"🎂"})}),i.soldOut&&e.jsx("div",{className:"absolute left-2.5 bottom-2.5 sm:left-3 sm:bottom-3 z-10",children:e.jsx("span",{className:"px-2 py-0.5 rounded-md bg-foreground/90 backdrop-blur text-[9px] font-bold uppercase tracking-wider text-background shadow-card select-none",children:"Sold out"})}),e.jsx("button",{type:"button",onClick:t=>{t.stopPropagation(),o(n=>!n)},"aria-label":s?"Remove from wishlist":"Add to wishlist","aria-pressed":s,className:"absolute right-2.5 top-2.5 sm:right-3 sm:top-3 z-10 grid place-items-center w-8 h-8 rounded-full bg-white/90 backdrop-blur shadow-card hover:scale-110 active:scale-95 transition-transform",children:e.jsx(g,{className:m("w-3.5 h-3.5 transition-colors",s?"fill-blush text-blush":"text-foreground/70")})})]}),e.jsxs("div",{className:"custom-card-info",children:[e.jsx("h3",{className:"custom-card-heading",children:e.jsx(u,{to:"/shop/$id",params:{id:i.id},id:`CardLink-${i.id}`,className:"full-unstyled-link",onClick:t=>t.stopPropagation(),children:e.jsxs("span",{className:"line-clamp-2",children:[i.name,i.tag?` (${i.tag})`:""]})})}),e.jsxs("p",{className:"custom-card-price",children:["₱",i.price.toLocaleString("en-PH")," PHP"]})]})]}),e.jsx("style",{children:`
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
    `})]})}export{g as H,p as P};
