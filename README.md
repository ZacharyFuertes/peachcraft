# Peach Craft

A handcrafted e-commerce storefront for Peach Craft — a small studio selling fake cakes, air-dry clay figures, kawaii storage boxes, and other cute handmade crafts.

## Project Overview

Peach Craft is built as a modern React/Vite storefront with a product catalog, shop page, contact and about pages, plus an admin dashboard for order and product management.

The app uses:

- `@tanstack/react-start` for server rendering and server functions
- `@tanstack/react-router` for file-based routing and nested routes
- `@tanstack/react-query` for data fetching and caching
- `Supabase` for product, order, and user data storage
- `Tailwind CSS` for styling
- `Vite` for development and production builds
- `Cloudflare Workers` style server entry with image proxy support

## Architecture

### Folder structure

- `src/`
  - `routes/` - page routes for the web app
  - `components/` - reusable UI and layout components
  - `lib/` - utility and API integration code
  - `assets/` - static assets, illustrations, icons and fonts
  - `styles.css` - Tailwind CSS entrypoint and global theme styles
  - `router.tsx` - router creation for TanStack Router
  - `routeTree.gen.ts` - automatically generated route tree
  - `start.ts` - TanStack React Start middleware and server function config
  - `server.ts` - server entry for production, includes image proxy handling

### Routing

The website uses file-based routes under `src/routes/`.

- `src/routes/__root.tsx` is the root layout and app shell.
- `src/routes/index.tsx` is the home page (`/`).
- `src/routes/shop.tsx` is the shop/catalog page (`/shop`).
- `src/routes/about.tsx` is the about page (`/about`).
- `src/routes/contact.tsx` is the contact page (`/contact`).
- `src/routes/login.tsx` and `src/routes/signup.tsx` handle authentication views.
- `src/routes/shipping-policy.tsx` is the store policy page.
- `src/routes/admin/` contains admin-only sections, including dashboard, products, orders, and analytics.

The generated route tree is kept in `src/routeTree.gen.ts`, and should not be edited manually.

### Layout & UI

The app shell is built in `src/lib/config.server.ts`.

- `RootShell` sets up the HTML document and includes global styles and script tags.
- `RootComponent` wraps routes with a `QueryClientProvider` and renders the site header/footer.
- The header/footer are hidden for admin routes.

Reusable UI primitives are stored in `src/components/ui/` and include:

- buttons, inputs, form components, cards, tables, dialogs, dropdowns, tooltips, and more
- custom utilities like `cn` for class name merging in `src/lib/utils.ts`

### Data & API integration

All Supabase access is centralized in `src/lib/supabase.ts` and `src/lib/api/supabase.functions.ts`.

- `getSupabaseClient()` provides a browser-safe Supabase client.
- `getSupabaseServer()` provides server-side Supabase access and supports service role or anon keys.
- `supabase.functions.ts` exposes server functions via `@tanstack/react-start`.

Key server functions include:

- `getFeaturedProducts()` - returns active featured products for homepage cards
- `getAllProducts()` - fetches all active shop products
- `getAdminDashboardData()` - aggregates dashboard metrics, low stock alerts, and recent orders
- `getAdminProducts()` - returns products for the admin product list
- `toggleProductActive()` - admin-only product on/off activation

### Admin area

The admin panel is mounted under `/admin/` and includes:

- `/admin/` - dashboard overview with metrics and order snapshots
- `/admin/analytics` - analytics view for product/order charts
- `/admin/products/` - product management list
- `/admin/products/new` - new product creation
- `/admin/products/$id` - product details/edit page
- `/admin/orders/` - orders list
- `/admin/orders/$id` - order details page

Admin routes use Supabase authentication checks and server-side verification logic.

### Server infrastructure

The site is designed to run with a server entry using `@tanstack/react-start`.

- `src/start.ts` configures request middleware and CSRF protection.
- `src/server.ts` is the production entry point and catches SSR errors.
- Image proxy support is implemented in `src/server.ts` for paths under `/api/images/`, forwarding requests to Cloudflare R2 when configured.

### Styling

The site uses Tailwind CSS and custom theme tokens imported via `src/styles.css`.

- UI components and pages use utility classes and design tokens such as `bg-primary`, `text-foreground`, `shadow-soft`, and custom palette styles.
- Animations and layouts are created with Tailwind utility classes plus custom `animate-float` behaviors.

## Pages

The main public website pages are:

- `/` - homepage with hero, feature section, and featured products
- `/shop` - product catalog
- `/about` - about the studio and maker
- `/contact` - contact form or details
- `/login` - user login page
- `/signup` - account creation page
- `/shipping-policy` - shipping and fulfillment policy

## Development

Install dependencies and run locally with:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production output:

```bash
npm run preview
```

Lint and format:

```bash
npm run lint
npm run format
```

## Environment variables

The site requires Supabase environment variables.

Client-side:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Server-side:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (recommended for server operations)
- `ADMIN_EMAIL` (used by admin auth verification)

Optional Cloudflare R2 image proxy variables:

- `CLOUDFLARE_R2_ACCOUNT_ID`
- `CLOUDFLARE_R2_BUCKET_NAME`
- `CLOUDFLARE_R2_API_TOKEN`

## Notes

- `src/routes/README.md` contains the route naming conventions used by TanStack Start / React Router.
- `src/routeTree.gen.ts` is generated and should not be edited by hand.
- Server-only config in `src/lib/config.server.ts` is intentionally not bundled to the browser.

## Useful files

- `src/router.tsx` - router setup with `QueryClient`
- `src/start.ts` - request middleware and server function config
- `src/server.ts` - production request handler and error normalization
- `src/lib/supabase.ts` - Supabase client/server initialization
- `src/lib/api/supabase.functions.ts` - backend server functions
- `src/components/` - reusable components and layout
- `src/routes/` - file-based route pages
- `src/components/ui/` - design system primitives and shared UI controls
