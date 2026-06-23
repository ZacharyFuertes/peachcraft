# Peach Craft — Full Website Details

---

## 1. Project Overview

Peach Craft is an e-commerce website for a small business selling handmade fake cakes, clay crafts, and kawaii storage items. Built with **TanStack React Start** (meta-framework), **Supabase** (backend/database), **Tailwind CSS v4** (styling), and deployed on **Cloudflare Workers**.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Meta-framework | TanStack React Start (React 19 + TanStack Router + server functions) |
| Routing | TanStack Router with auto-generated route tree |
| Styling | Tailwind CSS v4, tw-animate-css, shadcn/ui (Radix primitives) |
| Backend | Server Functions (createServerFn) via Nitro server engine |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (email/password) |
| Image Storage | Cloudflare R2 (primary) → Supabase Storage (fallback) |
| Charts | Recharts |
| Icons | Lucide React |
| Forms | react-hook-form, Zod validation |
| State | React Query (TanStack Query), localStorage (cart) |
| Deployment | Cloudflare Workers (Vercel configured as alternative) |

---

## 3. Database Schema (Supabase PostgreSQL)

### 3.1 Tables

**`profiles`** — Extended user profiles linked to `auth.users`.

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | PK → `auth.users(id)` ON DELETE CASCADE |
| `username` | TEXT | NOT NULL, UNIQUE |
| `email` | TEXT | NOT NULL, UNIQUE |
| `address` | TEXT | nullable |
| `email_verified` | BOOLEAN | DEFAULT false |
| `created_at` | TIMESTAMPTZ | DEFAULT now() |
| `updated_at` | TIMESTAMPTZ | DEFAULT now() |

**`products`** — Product catalog.

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | PK |
| `name` | TEXT | NOT NULL |
| `price` | NUMERIC | NOT NULL |
| `description` | TEXT | nullable |
| `images` | TEXT[] | array of public URLs |
| `tag` | TEXT | nullable (e.g. "New", "Best seller") |
| `swatch` | TEXT | nullable (hex color for card background) |
| `category` | TEXT | nullable (e.g. "Rings", "Accessories") |
| `stock_qty` | INTEGER | stock tracking |
| `is_active` | BOOLEAN | published/inactive toggle |
| `created_at` | TIMESTAMPTZ | DEFAULT now() |

**`orders`** — Customer orders.

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | PK |
| `user_id` | UUID | FK → `profiles(id)` |
| `total_amount` | NUMERIC | NOT NULL |
| `status` | TEXT | pending / confirmed / shipped / delivered / cancelled |
| `shipping_address` | JSONB | `{ name, email, street, city, province, zip }` |
| `created_at` | TIMESTAMPTZ | DEFAULT now() |

**`order_items`** — Line items per order.

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | PK |
| `order_id` | UUID | FK → `orders(id)` |
| `product_id` | UUID | FK → `products(id)` |
| `qty` | INTEGER | NOT NULL |
| `price_at_purchase` | NUMERIC | NOT NULL (snapshot) |

**`carts`** — One JSONB cart per authenticated user (used for server-side cart sync).

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | PK |
| `user_id` | UUID | UNIQUE, FK → `profiles(id)` ON DELETE CASCADE |
| `items` | JSONB | NOT NULL (CartItem[]) |
| `updated_at` | TIMESTAMPTZ | DEFAULT now() |

**`cart_items`** — Normalized per-product cart rows (alternative storage).

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | PK |
| `user_id` | UUID | FK → `profiles(id)` ON DELETE CASCADE |
| `product_id` | UUID | NOT NULL |
| `qty` | INTEGER | NOT NULL |
| `price` | NUMERIC | NOT NULL |
| `name` | TEXT | NOT NULL |
| `image` | TEXT | nullable |
| `swatch` | TEXT | nullable |
| `stock_qty` | INTEGER | nullable |
| `created_at` | TIMESTAMPTZ | DEFAULT now() |
| `updated_at` | TIMESTAMPTZ | DEFAULT now() |

**`signup_attempts`** — IP-based rate limiting for signups.

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | PK |
| `ip` | TEXT | NOT NULL |
| `created_at` | TIMESTAMPTZ | DEFAULT now() |

**`cart_add_attempts`** — Rate limiting for cart additions.

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | PK |
| `user_id` | UUID | FK → `profiles(id)` ON DELETE CASCADE |
| `created_at` | TIMESTAMPTZ | DEFAULT now() |

**`website_settings`** — Singleton row for store configuration.

| Column | Type | Notes |
|---|---|---|
| `id` | TEXT | PK (value: "singleton") |
| `store_name` | TEXT | |
| `store_logo` | TEXT | image URL |
| `store_description` | TEXT | |
| `contact_email` | TEXT | |
| `contact_number` | TEXT | |
| `address` | TEXT | |
| `facebook_url` | TEXT | |
| `instagram_url` | TEXT | |
| `twitter_url` | TEXT | |
| `footer_text` | TEXT | copyright text |
| `hero_banner` | TEXT | image URL |

### 3.2 RLS Policies

- **`profiles`**: Users can SELECT/UPDATE their own row (auth.uid() = id).
- **`carts`**: Users can ALL operations on their own cart (auth.uid() = user_id).
- Other tables are accessed server-side via service-role key (bypasses RLS).

---

## 4. Backend / API Layer

### 4.1 Server Functions Architecture

All backend logic is implemented as `createServerFn({ method: "GET" | "POST" })` — they run exclusively on the server; client imports are tree-shaken.

**Two Supabase client modes:**
- `getSupabaseClient()` — browser singleton with anon key
- `getSupabaseServer(request?, { authOnly? })` — server-side; service-role key by default (bypasses RLS), anon key if `authOnly: true` (respects RLS)

### 4.2 Full API Endpoint List

#### Product Endpoints

| Function | Method | Description |
|---|---|---|
| `getFeaturedProducts` | GET | Latest 4 active products for homepage |
| `getAllProducts` | GET | All active products for shop page |
| `getProductById` | POST | Single product by ID |
| `createProduct` | POST | Admin: create product (image upload, fields) |
| `updateProduct` | POST | Admin: update product |
| `deleteProduct` | POST | Admin: delete product + images |
| `toggleProductActive` | POST | Admin: enable/disable product visibility |
| `getAdminProducts` | GET | Admin: all products (incl. inactive) |
| `uploadProductImage` | POST | Admin: upload base64 image to R2/Supabase |

#### Order Endpoints

| Function | Method | Description |
|---|---|---|
| `createOrder` | POST | Place order (validates auth, stock, pricing; decrements stock) |
| `getOrdersList` | GET | Admin: all orders with user emails |
| `getOrderDetails` | GET | Admin: single order with items |
| `updateOrderStatus` | POST | Admin: update order status |
| `getMyOrders` | POST | Current user's orders |

#### Cart Endpoints

| Function | Method | Description |
|---|---|---|
| `saveCartForUser` | POST | Save cart to server (upsert by user_id) |
| `getCartForUser` | POST | Load cart from server |

#### Auth Endpoints

| Function | Method | Description |
|---|---|---|
| `signUpWithProfile` | POST | Sign up (rate-limited, creates auth user + profile) |
| `verifyEmail` | POST | Verify email OTP |
| `checkEmailVerification` | POST | Check if email is verified |

#### Analytics / Dashboard

| Function | Method | Description |
|---|---|---|
| `getAdminDashboardData` | GET | Today's revenue, orders, pending count, low stock |
| `getAnalyticsData` | GET | 30-day revenue series, order status breakdown, top 5 products |
| `getUserActiveOrderStatus` | GET | Check if user has an active order (one-order limit) |

#### Store Settings

| Function | Method | Description |
|---|---|---|
| `getStoreDetails` | GET | Fetch store name, logo, description, social links, etc. |
| `updateStoreDetails` | POST | Admin: update all store settings |
| `uploadStoreImage` | POST | Admin: upload store logo/banner to R2 |

### 4.3 Image Storage

- **Primary**: Cloudflare R2 (via S3-compatible API using env vars `CLOUDFLARE_R2_ACCOUNT_ID`, `CLOUDFLARE_R2_BUCKET_NAME`, `CLOUDFLARE_R2_API_TOKEN`)
- **Fallback**: Supabase Storage bucket `product-images`
- **Server proxy**: Requests to `/api/images/*` are proxied to R2 with 1-year cache headers
- **Client-side compression**: Images are compressed via `browser-image-compression` (max 0.3MB, 1200px) before upload

### 4.4 Admin Verification

Every admin-only server function uses `verifyAdmin()` which checks that `user.email === process.env.ADMIN_EMAIL`. The `adminMiddleware` provides route-level protection for `/admin` pages by checking the session on every request.

---

## 5. Frontend Routes & Pages

### 5.1 Root Layout (`/` — `__root.tsx`)

**Every page is wrapped in:**
- `QueryClientProvider` (React Query)
- `CartToastProvider` (toast notifications for cart additions)
- `SiteHeader` and `SiteFooter` (hidden for `/admin` routes)
- **Meta tags**: charset, viewport, fonts (Fraunces + Plus Jakarta Sans), OG tags

**Error page** (shown on uncaught errors):
- Heading: "This page didn't load"
- **"Try again"** button → `router.invalidate()` + `reset()`
- **"Go home"** link

**404 page**:
- "404" heading, "Page not found" message
- **"Go home"** link

### 5.2 Home Page (`/` — `index.tsx`)

**Purpose**: Landing/marketing page.

**Sections:**
1. **Hero** (gradient bg, floating shapes):
   - Badge: "New drop - Strawberry Dream Series"
   - Headline: "Handcrafted with love, made to delight"
   - **"Shop the Collection"** → `/shop`
   - **"About Me"** → `/about`
   - Trust row: "1,200+ Happy buyers", "4.9 Star rating", "1 pair of hands"

2. **Why Peach Craft** (cream bg):
   - 3 feature cards: Handmade, Kawaii & Cute, Thoughtful Packaging (with SVG illustrations)
   - Hover: lift + scale effect

3. **Featured Crafts** (accent bg):
   - Fetches `getFeaturedProducts` (latest 4 active products)
   - Loading: 4 skeleton placeholders
   - Error: red error message
   - Renders `ProductCard` for each
   - **"View All Crafts"** → `/shop`

4. **Emotional CTA** (blush bg):
   - Text: "it's okay to feel all the sweetness"
   - **"Get restock alerts"** → `/shop`

### 5.3 Shop Page (`/shop` — `shop.tsx`)

**Purpose**: Browse all products.

**Elements:**
- Header: "The Shop" / "All Crafts" + Friday restocks info
- Admin detection: if logged-in email = `VITE_ADMIN_EMAIL`, shows **"Back to admin dashboard"** → `/admin`
- Product grid: fetches `getAllProducts`, renders `ProductCard` in responsive 4→1 column grid
- Loading: 8 skeletons
- Error: red error message

**ProductCard interactions** (per card):
- **Wishlist heart button**: toggles liked state (client-side only, no backend persistence)
- **Quick View button**: appears on hover, opens shadcn `Dialog` with full product details
  - Thumbnail selector (if multiple images)
  - Category badge, price, description, tag pill
  - Stock info: "Sold out" / "N left" / "In stock"
  - **"Add to cart"** button (closes dialog on add)
- **"Add" button** (on card face): adds to cart, shows "Added!" with checkmark animation for 1400ms
- **Sold Out badge**: top-left if `soldOut` or `stock_qty = 0`
- **Tag badge**: top-left if product has a tag

### 5.4 Cart Page (`/cart` — `cart.tsx`)

**Purpose**: Review/manage cart items.

**Elements:**
- Header: "Your bag" / "Shopping cart" + item count
- **Empty state**: "Your cart is empty." + **"Shop crafts"** → `/shop`

**Per cart item:**
- Product image (or placeholder)
- Name, price (₱PHP)
- Stock remaining
- **Quantity controls**: chevron down (decrease) / chevron up (increase) buttons
- **"Remove" button** (trash icon, red/pink)

**Order summary sidebar:**
- Subtotal, Shipping (₱150 flat), Tax (₱0), Total
- If **not authenticated**: **"Sign in to checkout"** → `/login?redirect=/checkout`
- If **authenticated**: **"Proceed to checkout"** → `/checkout`
- **"Empty cart"** button → clears all items (with confirmation)

### 5.5 Checkout Page (`/checkout` — `checkout.tsx`)

**Purpose**: Collect shipping info and place order.

**Authentication checks** (on mount):
1. If not authenticated → warning card with **"Sign In Now"** and **"Create Account"** buttons; auto-redirects in 3s to `/login?redirect=/checkout`
2. If email not verified → warning card with **"Return to Shop"** → `/shop`
3. If has active order (one-order limit) → warning card with **"Return to Shop"** → `/shop`

**Shipping form** (Zod-validated):
- Name (text, required)
- Email (email, auto-filled from auth)
- Street address (text, auto-filled from profile)
- City (text, required)
- Province (text, required)
- Postal code (text, required)
- Payment method: "Cash on delivery" (only option)
- Inline validation errors per field

**Order summary sidebar:**
- Item count, subtotal, shipping (₱150), tax (₱0), total
- Info card: "Payment is handled at delivery."
- **"Edit cart"** → `/cart`

**Order placement:**
- **"Place order"** button → validates form, calls `createOrder`
- Loading: "Placing order..."
- Success: green card + **"Continue shopping"** → `/shop`
- Error: red error card

**Backend flow for `createOrder`:**
1. Validates auth + email verification
2. Checks no active order exists (one-order limit)
3. Validates stock for each item
4. Validates pricing matches current product prices
5. Decrements `stock_qty` on products (with `stock_qty >= requested_qty` guard, rollback on failure)
6. Inserts order + order_items in a transaction-like sequence
7. Returns order ID

### 5.6 Login Page (`/login` — `login.tsx`)

**Purpose**: Sign in existing users.

**Elements:**
- Email input
- Password input + **"Show" / "Hide"** toggle button
- Admin detection: if email matches `VITE_ADMIN_EMAIL`, shows admin redirect note
- **"Sign in"** button → calls `supabase.auth.signInWithPassword`
  - Admin → redirects to `/admin`
  - Regular user → redirects to `redirect` query param (default `/`)
- **"Create account"** link → `/signup`
- Error display: red box for auth errors (e.g. "Invalid credentials", "Email not verified")

### 5.7 Signup Page (`/signup` — `signup.tsx`)

**Purpose**: Register a new account.

**Form fields** (all Zod-validated):
- Username (text, min 2 chars)
- Email (email format)
- Shipping Address (text, min 5 chars)
- Password (text, min 8 chars) + **"Show / Hide"** toggle
- Confirm Password (must match) + **"Show / Hide"** toggle
- Inline validation errors

**Submission:**
- Collects client IP from `api.ipify.org` (best-effort, for rate limiting)
- Calls `signUpWithProfile` server function
- Loading: "Creating account..."
- Success: green box + auto-redirect to `/login` in 2 seconds
- Error: red error box

**Backend flow for `signUpWithProfile`:**
1. Rate-limit check: max 5 signups/hr per IP (`signup_attempts` table)
2. Check for duplicate email/username
3. Create auth user via `supabase.admin.createUser` (with fallback to `signUp`)
4. Programmatically confirm email (best-effort)
5. Insert row into `profiles` with `email_verified: true`
6. Log attempt in `signup_attempts`

### 5.8 Verify Email Page (`/verify-email` — `verify-email.tsx`)

**Purpose**: Handle email verification links.

**On mount:**
- Extracts `token`, `token_hash`, `email`, `type`, `code` from URL hash + query params
- Calls `verifyEmail` server function

**States:**
- Loading: spinner + "Verifying your email..."
- Success: green checkmark + **"Go to login now"** → `/login`
- Error: red X + **"Try signing up again"** → `/signup` + **"Back to login"** → `/login`

### 5.9 About Page (`/about` — `about.tsx`)

**Purpose**: Brand story / meet the maker.

**Content:**
- Hero: "Hi, I'm the hands behind Peach Craft" (story about starting in 2023)
- **"See what I'm making"** → `/shop`
- Process section (3 steps): Sketch → Sculpt → Paint & pack

### 5.10 Contact Page (`/contact` — `contact.tsx`)

**Purpose**: Contact form and social links.

**Elements:**
- Contact info: `hello@peachcraft.shop`, `@peach.craft` on Instagram
- **Contact form** (client-side only — no backend call):
  - Name (required)
  - Email (required)
  - Message (required textarea, 5 rows)
  - **"Send message"** button → on submit, sets `sent=true`, button changes to "Sent! Talk soon"

### 5.11 Shipping & Policy Page (`/shipping-policy` — `shipping-policy.tsx`)

**Purpose**: Display shipping rates, refund policy, care instructions.

**Content:**
- 3 summary cards: "3-5 day shipping" / "7-day returns" / "Replacement guarantee"
- **Shipping**: Ships within 3 business days from Manila, free over ₱1,000
- **Refunds**: 7-day returns on unopened items, damaged replacement (photo within 48hrs)
- **Care instructions**: air-dry clay, not food-safe, keep dry, avoid sunlight

### 5.12 Admin Layout (`/admin` — `admin.tsx`)

**Purpose**: Admin panel shell.

**Auth guard**: On mount, verifies session email = `VITE_ADMIN_EMAIL`; redirects to login if not.

**Sidebar** (blush background):
- "Admin" / "Peach Craft owner" profile card
- **Navigation links** (active highlighted with sage bg):
  - "Dashboard" → `/admin`
  - "Products" → `/admin/products`
  - "Orders" → `/admin/orders`
  - "Analytics" → `/admin/analytics`
  - "Website Settings" → `/admin/website-settings`
- **"Sign out"** → `supabase.auth.signOut()`, redirects to `/`

### 5.13 Admin Dashboard (`/admin/` — `admin/index.tsx`)

**Purpose**: Store performance overview.

**4 stat cards:**
- Today's Revenue (₱)
- Today's Orders (count)
- Pending Orders (count)
- Low Stock (count)

**Recent orders table** (last 5): Order ID (truncated), Customer email, Total, Status (color-coded badge), Time ago

**Low stock section**: Products with stock < 5 (red for 0)

**"Preview store"** → opens `/shop` in new tab

### 5.14 Admin Products List (`/admin/products/` — `admin/products/index.tsx`)

**Purpose**: Manage product catalog.

**"Add product"** → `/admin/products/new`

**Products table**: Name, Price (₱), Category, Stock (color-coded badge), Active (Yes/No), Actions

**Per-row actions:**
- **"Edit"** → `/admin/products/{id}`
- **"Enable" / "Disable"** toggle → calls `toggleProductActive`
- **"Delete"** → `window.confirm()` then calls `deleteProduct`

### 5.15 Admin New Product (`/admin/products/new` — `admin/products/new.tsx`)

**Purpose**: Create a product via `ProductForm` component.

**Success dialog** after creation:
- "Product added"
- **"Add another"** → resets form
- **"Go to dashboard"** → `/admin`

### 5.16 Admin Edit Product (`/admin/products/{id}` — `admin/products/$id.tsx`)

**Purpose**: Edit existing product via `ProductForm` with `initialData`.

**On save**: calls `updateProduct`, redirects to `/admin/products?updated=true`

### 5.17 Admin Orders List (`/admin/orders/` — `admin/orders/index.tsx`)

**Purpose**: View and filter orders.

**Realtime**: Subscribes to INSERT on `orders` table — shows notification banner "New order received!" for 5 seconds.

**Filter buttons**: All / Pending / Confirmed / Shipped / Delivered / Cancelled

**Orders table**: Order ID (truncated), Customer email, Total (₱), Status badge, Date, **"View"** → `/admin/orders/{id}`

### 5.18 Admin Order Detail (`/admin/orders/{id}` — `admin/orders/$id.tsx`)

**Purpose**: View single order, update status.

**Content:**
- Customer info (name, email)
- Order info (date, total)
- Shipping address
- **Status update**: dropdown (Pending/Confirmed/Shipped/Delivered/Cancelled) + **"Update status"** button
- Items table: image, name, qty, price, line total

### 5.19 Admin Analytics (`/admin/analytics` — `admin/analytics.tsx`)

**Purpose**: Sales charts.

**3 summary cards**: Total Revenue (₱), Total Orders, Avg Order Value (₱)

**3 Recharts:**
1. **Daily revenue (30 days)** — line chart, sage stroke
2. **Order count by status** — horizontal bar, color-coded
3. **Top 5 products by revenue** — horizontal bar, blush fill

### 5.20 Admin Website Settings (`/admin/website-settings` — `admin/website-settings.tsx`)

**Purpose**: Edit store-wide settings.

**Left column — text fields:**
- Store Name (required), Store Description, Contact Email, Contact Number (required), Business Address, Facebook URL, Instagram URL, Twitter/X URL, Footer Copyright Text

**Right column — file uploads + preview:**
- **Store Logo**: file input (jpg/jpeg/png/webp, max 5MB), preview area
- **Hero Banner**: file input, preview area
- Preview text showing how name/description renders

**Buttons:**
- **"Save"** → validates, uploads images to R2 via base64, calls `updateStoreDetails`
- **"Reset"** → restores to last saved state
- Success/error banners

---

## 6. Components

### 6.1 `SiteHeader.tsx`

**Sticky header** with backdrop blur, scroll-aware border.

| Element | Action |
|---|---|
| Logo "Peach Craft" | → `/` |
| Desktop nav: Home, Shop, About, Shipping & Policy, Contact | → respective routes (active underline with scale animation) |
| Search button (Lucide icon) | Placeholder — no onClick wired |
| Cart icon + badge | → `/cart` (bounce animation on item count increase) |
| **Sign In** (not logged in) | → `/login` |
| **User initial + Sign out** (logged in) | Shows initial in circle; sign out button |
| Mobile hamburger (Menu/X) | Toggles mobile nav panel |
| Announcement bars: "Shop is OPEN" + "Free shipping on P1,000+" | Marquee stripe |

**Auth sync**: On sign-in, loads orders into localStorage; on sign-out, clears them.

### 6.2 `SiteFooter.tsx`

| Section | Elements |
|---|---|
| Newsletter | Email input + **"Join" → "You're in!"** (cosmetic, no backend) |
| Social links | Instagram, TikTok, Email (placeholder `#` hrefs) |
| Shop links | All Crafts, Fake Cakes, Clay Figures, Storage Boxes → `/shop` |
| Support links | Shipping Policy, Refund Policy → `/shipping-policy`, Contact → `/contact` |
| Studio links | About → `/about`, Process → `#`, Press → `#` |
| Copyright | "© 2026 Peach Craft" + quick links |

### 6.3 `CartToast.tsx` (Context Provider)

**When a product is added to cart**, a toast slides in at bottom-right, auto-dismisses after 3.5s.

- Shows: product thumbnail, green check, "Added to cart", product name, qty
- **X dismiss button** to close manually
- Uses context via `useCartToast().notify(item)`

### 6.4 `ProductCard.tsx`

Props: `{ product: Product }`

| Element | Behavior |
|---|---|
| **Wishlist heart** | Toggles liked state (client-side only) |
| **Quick View** (hover) | Opens Dialog with full product details |
| Image thumbnails (in dialog) | Click to select preview image |
| **"Add to cart"** (dialog) | Adds 1 item, closes dialog, fires toast |
| **"Add"** (card face) | Adds 1 item, shows "Added!" animation for 1400ms |
| Sold Out / Tag badges | Top-left overlay |
| Card bg color | From `product.swatch` hex value |

### 6.5 `admin/ProductForm.tsx`

Props: `{ initialData?, onSubmit, isLoading }`

| Section | Fields / Buttons |
|---|---|
| **Top bar** | **Preview** → `/shop`, **Save product** |
| **Basic Info** | Name (required), Price (numeric, ₱), Description (textarea with char count) |
| **Category & Tags** | Multi-select dropdowns + custom add input + removable chips |
| **Swatch** | 6 color presets (blush, yellow, green, blue, pink, amber) + custom color picker |
| **Stock** | Numeric input (low-stock warning at 1-5) |
| **Active toggle** | Switch: "Active — visible" / "Inactive — hidden" |
| **Image upload** | Drag-drop zone + file picker; max 8 images, 5MB each; compress to 0.3MB/1200px; previews with remove button; progress bar |
| **Bottom bar** | **Discard** (red, resets form), **Save product** |
| **Validation** | Name, price, stock required; valid numbers; image type/size checks |

### 6.6 SVG Illustrations (`illustrations.tsx`)

| Component | Visual |
|---|---|
| `HandmadeIllustration` | Palette + paintbrush on circle |
| `KawaiiIllustration` | Cute blob face + sparkles on circle |
| `PackagingIllustration` | Gift box with ribbon on circle |
| `CakeIllustration` | Two-tier kawaii cake with candles (larger, with glow) |

---

## 7. Authentication Flow

### 7.1 Sign Up
1. User fills username, email, address, password, confirm password
2. Client-side Zod validation
3. `signUpWithProfile` server function called:
   - Rate-limit check (max 5/hr per IP)
   - Duplicate email/username check
   - Creates auth user via `supabase.admin.createUser`
   - Creates profile row (email_verified = true)
4. Success → redirect to `/login` after 2 seconds

### 7.2 Sign In
1. User enters email + password
2. `supabase.auth.signInWithPassword`
3. Admin user → `/admin`
4. Regular user → redirect URL (default `/`)

### 7.3 Email Verification
1. User clicks link in email → `/verify-email?token_hash=...`
2. `verifyEmail` server function calls `supabase.auth.verifyOtp`
3. Sets `email_verified = true` in profiles
4. Redirects to login

### 7.4 Session Handling
- Auth state changes are listened to globally in `SiteHeader` and `useCart`
- On sign-in: server cart replaces local cart
- On sign-out: local cart saved to server, localStorage cleared

---

## 8. Cart & Checkout Flow

### 8.1 Guest Cart
- Stored entirely in localStorage under `peachcraft-cart` key
- Cross-tab sync via custom `peachcraft-cart-updated` event
- Functions: `getCartItems()`, `addToCart()`, `updateCartQuantity()`, `removeCartItem()`, `clearCart()`
- Enforces stock limit and per-product cap of 25 units

### 8.2 Authenticated Cart
- On sign-in: server cart loaded (via `getCartForUser`) replaces localStorage
- On sign-out: localStorage cart saved to server (via `saveCartForUser`)
- Server cart stored in `carts` table (JSONB blob) or `cart_items` table (normalized)

### 8.3 Checkout
1. Auth check + email verification + active-order check
2. Shipping form with Zod validation
3. Order summary with ₱150 flat shipping
4. "Place order" calls `createOrder`:
   - Validates stock & pricing
   - Decrements stock atomically
   - Creates order + order_items
   - Clears cart
5. Success page with "Continue shopping"

---

## 9. Admin Panel

**Protected by**: `adminMiddleware` (server-side) + client-side email check
**Admin email**: configured via `VITE_ADMIN_EMAIL` / `ADMIN_EMAIL` env var

### Sections:
1. **Dashboard** — stats, recent orders, low stock alerts
2. **Products** — CRUD with enable/disable, drag-drop image upload, swatch color picker
3. **Orders** — real-time notifications, status filters, status updates
4. **Analytics** — revenue chart, order status breakdown, top products
5. **Website Settings** — store info, social links, logo/banner upload, preview

---

## 10. Error Handling

| Layer | Mechanism |
|---|---|
| **Server SSR errors** | `error-capture.ts` catches uncaught errors/unhandled rejections via global event listeners; `server.ts` normalizes catastrophic SSR responses and replaces generic 500 JSON with a proper HTML error page |
| **React error boundary** | `__root.tsx` `ErrorComponent` with "Try again" and "Go home" |
| **Server function errors** | `start.ts` error middleware catches thrown errors; returns 500 HTML page if not a known HTTP error |
| **CSRF** | `createCsrfMiddleware` protects server function calls (not page loads) |
| **404** | `__root.tsx` `NotFoundComponent` with "Go home" |

---

## 11. Data Flow Summary

```
Browser                          Server (Nitro/Cloudflare)
──────                            ──────────────────────
Route change ──→ TanStack Router ──→ SSR renders page
useQuery       ──→ createServerFn ──→ Supabase (service-role key)
useMutation    ──→ createServerFn ──→ Supabase + R2 storage
Auth state     ──→ Supabase JS SDK  ──→ Supabase Auth API
Cart (local)   ──→ localStorage      (synced to server on sign-in/out)
Image upload   ──→ browser-image-compression → base64 → createServerFn → R2/Supabase Storage
```

---

## 12. Environment Variables

| Variable | Purpose |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL (client) |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key (client) |
| `SUPABASE_URL` | Supabase URL (server) |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server, bypasses RLS) |
| `SUPABASE_ANON_KEY` | Anon key (server, respects RLS) |
| `ADMIN_EMAIL` / `VITE_ADMIN_EMAIL` | Admin user email |
| `CLOUDFLARE_R2_ACCOUNT_ID` | Cloudflare R2 account |
| `CLOUDFLARE_R2_BUCKET_NAME` | R2 bucket name |
| `CLOUDFLARE_R2_API_TOKEN` | R2 API token |
