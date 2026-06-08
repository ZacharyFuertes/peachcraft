# Peach Craft Website Details

## Overview

This repository is a React-based e-commerce storefront for `Peach Craft`, a small handmade craft brand. It uses:
- `@tanstack/react-router` for file-based routing.
- `@tanstack/react-query` for query context support.
- `@tanstack/react-start` for server rendering and app startup.
- Tailwind CSS through `@tailwindcss/vite` and a custom `styles.css` design system.
- A component-driven layout with reusable UI pieces in `src/components`.

The site is built as a single-page application with a static-feeling marketing storefront and several pages: Home, Shop, About, Shipping & Policy, and Contact.

---

## Project Structure

### Root files

- `package.json` — defines dependencies, scripts, and TypeScript/React toolchain.
- `bunfig.toml` — likely Bun configuration, though the app is currently using Vite scripts.
- `vite.config.ts` — Vite config for building the app.
- `tsconfig.json` — TypeScript compiler options.
- `src/` — application source.

### `src/` layout

- `src/router.tsx` — creates the router instance with route tree and query client.
- `src/start.ts` — sets up React Start middleware and server behavior.
- `src/server.ts` — defines the server entry that handles request/response and SSR error normalization.
- `src/styles.css` — global theme, CSS utilities, and Tailwind-style custom tokens.
- `src/lib/` — utility helpers and error handling.
- `src/components/` — reusable UI and page components.
- `src/routes/` — page route components.
- `src/routeTree.gen.ts` — generated route tree from TanStack Router.

---

## Routing and App Entry

### Routing

The app uses file-based routes and `@tanstack/react-router`.

- `src/routeTree.gen.ts` is generated automatically by TanStack Router.
- Each page route file exports a `Route` object created with `createFileRoute(...)`.
- The root route is defined in `src/routes/__root.tsx`.
- Child routes are mounted under the root route by `routeTree`.

Routes present:
- `/` — Home page (`src/routes/index.tsx`)
- `/shop` — Shop page (`src/routes/shop.tsx`)
- `/about` — About page (`src/routes/about.tsx`)
- `/shipping-policy` — Shipping policy page (`src/routes/shipping-policy.tsx`)
- `/contact` — Contact page (`src/routes/contact.tsx`)

### Root route and layout

`src/routes/__root.tsx` defines the app shell:
- A `<head>` section with default metadata and CSS imports.
- `RootShell` wraps the HTML and body tags.
- `RootComponent` renders `SiteHeader`, an `<Outlet />`, and `SiteFooter`.
- It provides a `QueryClientProvider` for React Query context.
- It also supplies `notFoundComponent` and `errorComponent` for route-level fallback UI.

The route tree and router are assembled in `src/router.tsx`:
- `createRouter({ routeTree, context: { queryClient }, scrollRestoration: true, defaultPreloadStaleTime: 0 })`

This means the app handles navigation, scroll restoration, and preloading through TanStack Router.

---

## Page Components

Each route file renders one page component and metadata for the route.

### Home page — `src/routes/index.tsx`

- Provides a hero section with a headline, intro text, and CTA links to Shop and About.
- Includes a feature section that explains studio values.
- Renders a list of featured product cards using `ProductCard`.
- Uses icons from `lucide-react` and handmade illustrations from `src/components/illustrations.tsx`.

Data for the home page is static and defined in the route file as a `products` array.

### Shop page — `src/routes/shop.tsx`

- Renders a full product catalog.
- Uses the same `ProductCard` component for each item.
- Product data is currently static in the page file as the `all` array.
- The page includes metadata for SEO and Open Graph support.

### About page — `src/routes/about.tsx`

- Introduces the maker and studio story.
- Uses a large hero section and a three-step process block.
- Includes a static illustration and branding copy.

### Contact page — `src/routes/contact.tsx`

- Provides contact information and a simple form.
- Uses local `useState` to track submitted state.
- The form does not yet connect to an external backend or API.

### Shipping policy page — `src/routes/shipping-policy.tsx`

This page is part of the route tree and provides policy information.
It likely renders a static content block describing shipping, returns, and other store policies.

---

## Shared UI Components

### `src/components/SiteHeader.tsx`

- Implements a sticky header with announcement bars, desktop navigation, and a mobile menu.
- Uses `useRouterState` to determine the current location and active link.
- Tracks scroll position to apply background and border styling when the page scrolls.
- Includes search and cart buttons as UI placeholders.
- Uses Tailwind utility classes and a `cn()` helper for conditional class names.

### `src/components/SiteFooter.tsx`

- Contains a newsletter signup form and links.
- Uses `useState` for email input and submission confirmation.
- Renders site navigation, social icons, and copyright info.

### `src/components/ProductCard.tsx`

- Displays a product tile with image area, badges, wishlist button, and add-to-cart button.
- Supports states like `soldOut` and `tag`.
- Uses an internal `liked` state toggled by the heart button.
- Uses the `cn()` helper to merge Tailwind classes.
- Renders a color swatch background based on the product's `swatch` value.

### `src/components/illustrations.tsx`

- Exports SVG illustration components used across pages.
- These visuals reinforce the brand's kawaii / handmade aesthetic.

---

## Support and Utilities

### `src/lib/utils.ts`

- Exports `cn(...inputs)`.
- This helper merges `clsx` and `tailwind-merge` to safely combine Tailwind class names.

### Error handling

- `src/lib/error-page.ts` renders an HTML error page for catastrophic failures.
- `src/lib/error-capture.ts` captures errors during SSR.
- `src/start.ts` installs a middleware that catches exceptions and returns a rendered error page instead of a generic 500.
- `src/server.ts` normalizes SSR errors from the React Start handler and ensures proper HTML output.

---

## Styling and Design System

### `src/styles.css`

This file defines the entire theme and custom utilities.

- Uses `@import "tailwindcss" source(none);` and `@source "../src"` to enable Tailwind-style compilation.
- Defines semantic custom properties for colors, typography, radius, shadows, gradients, and utilities.
- Uses Oklch color values for soft pastel brand colors.
- Supports both light and dark themes via a `.dark` class.
- Defines reusable utilities such as `animate-float`, `animate-wiggle`, and `marquee-strip`.
- Applies base styles for body, headings, focus, and default font families.

### Design tokens

Important tokens include:
- `--background`, `--foreground`, `--card`, `--border`, `--ring`
- `--primary`, `--secondary`, `--accent`
- `--blush`, `--cream`, `--sage`, `--sage-deep`, `--brown`
- `--radius`, `--shadow-soft`, `--shadow-card`
- `--gradient-hero`

These tokens are used throughout the app with Tailwind-style classes and inline styling.

---

## Build and Run

### Scripts in `package.json`

- `npm run dev` — starts Vite development server.
- `npm run build` — builds the site for production.
- `npm run build:dev` — builds in development mode.
- `npm run preview` — previews the production build.
- `npm run lint` — runs ESLint.
- `npm run format` — formats code with Prettier.

### Runtime

- The app is built for both client-side navigation and server-side rendering via `@tanstack/react-start`.
- `src/server.ts` is the server adapter that dispatches requests to the React Start SSR entry.

---

## How the Code Works

1. `src/router.tsx` creates a `QueryClient` and `router` from the generated `routeTree`.
2. `src/routes/__root.tsx` defines the root layout and wraps nested pages.
3. Each route file exports a route configuration with metadata and a React component.
4. Navigation is handled by `@tanstack/react-router` with `<Link>` components and `<Outlet />` for nested rendering.
5. Shared page structure is provided by `SiteHeader` and `SiteFooter`.
6. Product UI is rendered by `ProductCard` and product data is currently hard-coded as static arrays.
7. Styling relies on a centralized CSS theme in `src/styles.css`, plus Tailwind utility classes.
8. Errors are caught and rendered with custom HTML when SSR failures occur.

---

## Notes

- The route tree is generated and should not be edited manually: `src/routeTree.gen.ts`.
- Product and form interactions are mostly local UI state; there is no backend cart or newsletter service wired in yet.
- The site has strong branding and marketing structure, with a static storefront design and small hero/features/product sections.

If you want, I can also add a shorter `README` version or convert this into developer-facing architecture docs inside `src/README.md`.


# Peach Craft — Complete Website Details & Architecture

## Project Overview & Brand Vibe

**Peach Craft** is a charming, high-polish e-commerce/marketing storefront for a fictional small handmade craft brand specializing in kawaii-style cakes, clay crafts, and cute storage items.

### Core Vibe & Aesthetic (Critical for AI)
- **Mood**: Extremely cute, warm, gentle, whimsical, handmade, and heartfelt.
- **Tone of Voice**: Sweet, personal, passionate solo maker.
- **Visual Style**: Soft pastel color palette, generous rounded corners, subtle floating animations, gentle shadows, playful illustrations.
- **Key Feelings**: Kawaii, artisan, cozy, trustworthy, delightful.
- **Color System**: Based on Oklch colors defined in `styles.css` (blush, cream, sage, sage-deep, brown, etc.). Full light + dark mode support.
- **Typography**: 
  - Headings: `Fraunces` or DM Serif Display
  - Body: `Plus Jakarta Sans`
- **Animations**: `animate-float`, `animate-wiggle`, subtle scale on hover, smooth transitions (300ms ease).

---

## Tech Stack

- **Frontend**: React 19 + TypeScript (strict)
- **Routing**: TanStack Router (file-based routing + SSR)
- **Full-stack**: TanStack Start
- **Styling**: Tailwind CSS v4 + custom `styles.css` design system
- **Data Fetching**: TanStack Query
- **UI Primitives**: Radix UI + custom components
- **Icons**: Lucide React
- **Build Tool**: Vite 7
- **Code Quality**: ESLint + Prettier

---

## Detailed Project Structure




# Peach Craft — Complete Website Details & Architecture

## Project Overview & Brand Vibe

**Peach Craft** is a charming, high-polish e-commerce/marketing storefront for a fictional small handmade craft brand specializing in kawaii-style cakes, clay crafts, and cute storage items.

### Core Vibe & Aesthetic (Critical for AI)
- **Mood**: Extremely cute, warm, gentle, whimsical, handmade, and heartfelt.
- **Tone of Voice**: Sweet, personal, passionate solo maker.
- **Visual Style**: Soft pastel color palette, generous rounded corners, subtle floating animations, gentle shadows, playful illustrations.
- **Key Feelings**: Kawaii, artisan, cozy, trustworthy, delightful.
- **Color System**: Based on Oklch colors defined in `styles.css` (blush, cream, sage, sage-deep, brown, etc.). Full light + dark mode support.
- **Typography**: 
  - Headings: `Fraunces` or DM Serif Display
  - Body: `Plus Jakarta Sans`
- **Animations**: `animate-float`, `animate-wiggle`, subtle scale on hover, smooth transitions (300ms ease).

---

## Tech Stack

- **Frontend**: React 19 + TypeScript (strict)
- **Routing**: TanStack Router (file-based routing + SSR)
- **Full-stack**: TanStack Start
- **Styling**: Tailwind CSS v4 + custom `styles.css` design system
- **Data Fetching**: TanStack Query
- **UI Primitives**: Radix UI + custom components
- **Icons**: Lucide React
- **Build Tool**: Vite 7
- **Code Quality**: ESLint + Prettier

---

## Detailed Project Structure



---

## Key Components & Logic (Detailed)

### 1. ProductCard.tsx
- Displays image, title, price, description snippet.
- **States**: `soldOut`, `tag` (e.g. "New", "Best Seller").
- **Interactions**:
  - Heart wishlist button with local `liked` state + animation.
  - Add to cart button (currently UI only).
  - Color swatch background based on `product.swatch`.
  - Hover: Lift effect, image scale, shadow increase.
- Reused on Home (featured) and Shop pages.

### 2. SiteHeader.tsx
- Sticky header.
- Announcement bar (top).
- Desktop nav + mobile menu (slide-in).
- Scroll-aware styling (background appears on scroll).
- Active link highlighting via `useRouterState`.
- Cart & search icons (placeholders).

### 3. SiteFooter.tsx
- Newsletter signup form with local state + success message.
- Navigation links, social icons, copyright.

### 4. Styling System (`styles.css`)
- Full custom design tokens using CSS variables (Oklch).
- Semantic colors: `--blush`, `--sage`, `--cream`, etc.
- Utilities: `animate-float`, `animate-wiggle`, `marquee-strip`, soft shadows, hero gradient.
- Dark mode via `.dark` class.

### 5. Product Data Structure
Currently static arrays with this shape:

```ts
type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  soldOut?: boolean;
  tag?: string;
  swatch?: string;        // color for swatch
  category?: string;
};


Pages Summary

Home (/): Hero with floating elements, trust badges, featured products, studio values.
Shop (/shop): Full grid of products.
About: Story, process (3 steps), illustrations.
Contact: Info + simple form (local state only).
Shipping Policy: Static policy content.


Current Limitations (Important for Backend Planning)

All product data is hardcoded.
Cart, wishlist, newsletter, contact form are local state only.
No real backend, database, or persistence.
No authentication or admin features yet.


Development Workflow

npm run dev → Vite dev server
Route tree auto-generated (routeTree.gen.ts)
SSR via TanStack Start
Error handling: Custom SSR error pages