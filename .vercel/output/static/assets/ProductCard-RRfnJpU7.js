import{c as d,r as c,u as m,j as e,F as i,L as h}from"./index-CkjC3ZC6.js";const u=[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",key:"mvr1a0"}]],f=d("heart",u);function x({product:s}){const[a,r]=c.useState(!1),l=m(),n=s.images?.[0]??null;return e.jsxs(e.Fragment,{children:[e.jsxs("article",{onClick:()=>l({to:`/shop/${s.id}`}),className:i("group relative cursor-pointer","rounded-[1rem] sm:rounded-[1.75rem] border border-border/70 overflow-hidden","bg-white transition-all duration-300","hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-card sm:hover:shadow-soft","shadow-[0_1px_4px_-1px_rgba(0,0,0,0.08)] sm:shadow-card"),children:[e.jsxs("div",{className:"relative overflow-hidden bg-cream rounded-t-[1rem] sm:rounded-t-[1.75rem]",children:[n?e.jsx("div",{className:"w-full aspect-[1/1] sm:aspect-[4/5] overflow-hidden bg-cream",children:e.jsx("img",{src:n,alt:s.name,className:"w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",loading:"lazy"})}):e.jsx("div",{className:"w-full aspect-square bg-cream flex items-center justify-center",children:e.jsx("span",{className:"text-foreground/20 text-4xl",children:"🎂"})}),s.soldOut&&e.jsx("div",{className:"absolute left-2.5 bottom-2.5 sm:left-3 sm:bottom-3",children:e.jsx("span",{className:"px-2 py-0.5 rounded-md bg-foreground/90 backdrop-blur text-[9px] font-bold uppercase tracking-wider text-background shadow-card select-none",children:"Sold out"})}),e.jsx("button",{type:"button",onClick:t=>{t.stopPropagation(),r(o=>!o)},"aria-label":a?"Remove from wishlist":"Add to wishlist","aria-pressed":a,className:"absolute right-2.5 top-2.5 sm:right-3 sm:top-3 grid place-items-center w-8 h-8 rounded-full bg-white/90 backdrop-blur shadow-card hover:scale-110 active:scale-95 transition-transform",children:e.jsx(f,{className:i("w-3.5 h-3.5 transition-colors",a?"fill-blush text-blush":"text-foreground/70")})})]}),e.jsxs("div",{className:"p-3 sm:p-5 space-y-0.5 sm:space-y-1",children:[e.jsx("h3",{className:"card__heading",children:e.jsx(h,{to:"/shop/$id",params:{id:s.id},id:`CardLink-${s.id}`,className:"full-unstyled-link",onClick:t=>t.stopPropagation(),children:e.jsxs("span",{className:"line-clamp-2",style:{fontFamily:"'Quicksand', sans-serif",fontSize:"15px",lineHeight:"19.5px",fontWeight:500,letterSpacing:"0.6px",color:"#000000",opacity:.85},children:[s.name,s.tag?` (${s.tag})`:""]})})}),e.jsxs("p",{className:"card__price",style:{fontFamily:"'Quicksand', sans-serif",fontSize:"15px",lineHeight:"1.5",fontWeight:500,color:"#000000"},children:["₱",s.price.toLocaleString("en-PH")," PHP"]})]})]}),e.jsx("style",{children:`
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
    `})]})}export{f as H,x as P};
