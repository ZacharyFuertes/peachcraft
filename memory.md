# Peach Craft — System Memory

Dense reference for the Peach Craft storefront + admin. Traceable to files; treat
anything marked `[verify]` as unconfirmed in the last inspection pass, not as fact.

---

## 1. Overview & Tech Stack

- **App**: Peach Craft — PHP-first kawaii clay/craft e-commerce storefront + admin panel.
- **Framework**: TanStack Start v1.167.50 (file-based routing, SSR) + React 19.2 + Vite 7.3.
- **Wiring**: `@lovable.dev/vite-tanstack-config` v2.3.1 wraps TanStack/Vite/Tailwind/nitro. `vite.config.ts` only sets `nitro: { preset: "vercel" }`, `tanstackStart.server.entry: "server"`, port 3000. Do NOT add TanStack/React/Tailwind plugins manually — the wrapper already does (comment in `vite.config.ts:1-6`).
- **Data access**: no ORM — direct `@supabase/supabase-js` v2.107.0 queries. Sessions via `@supabase/ssr` v0.10.3.
- **Client libs**: React Query v5.83, zod 3.24 (server-fn input validators), Tailwind 4.2 (`@tailwindcss/vite`), shadcn/ui (new-york, slate, cssVariables, lucide — `components.json`), recharts (admin charts), sonner (toasts), vaul, lucide-react, `browser-image-compression` (client image resize before upload).
- **Backend services** (all validated reachable in the last check):
  - Supabase Postgres + Auth (GoTrue v2.190.0) + Storage.
  - Cloudflare R2 (file objects; API token auth; S3 endpoint exists but is not used by app code).
  - Cloudflare Turnstile (bot check on signup / checkout).
  - Resend (email) — connectivity validated; app-side usage location `[verify]`.
  - Host: Vercel (nitro preset `vercel`).
- **Currency**: PHP is base; `src/lib/currency.ts` — 10 currencies, hardcoded static `CONVERSION_RATES`, `formatBasePrice` → `₱… PHP`, JPY/KRW rounded to 0 decimals.
- **Scripts** (`package.json`): `dev` = `vite dev` (port 3000 strict), `build` = `vite build`, `preview`, `lint` = `eslint .`, `format` = `prettier --write .`.

---

## 2. Architecture, Routing & Build

- **Custom SSR entry** `src/server.ts` (wired via `tanstackStart.server.entry`): imports `./lib/error-capture`, then:
  - `fetch()` handles `/api/images/*` (R2 image proxy, see §7) before handing off to `@tanstack/react-start/server-entry`.
  - Wraps every response with security headers (`server.ts:40-76`): CSP, HSTS, nosniff, X-Frame-Options DENY, Referrer-Policy.
  - `normalizeCatastrophicSsrResponse` (`server.ts:23-38`): h3 swallows in-handler throws into `{"unhandled":true,"message":"HTTPError"}` JSON 500s — this detects that shape and replaces with `renderErrorPage()` from `src/lib/error-page.ts`.
- **Routing** (`src/routes/README.md`): every `.tsx` in `src/routes/` is a route. Never create `src/pages/` or `app/layout.tsx`. `routeTree.gen.ts` is auto-generated — don't edit.
- **Route tree** (`src/routes/`):
  - `__root.tsx` — app shell wrapping every page (keep `<Outlet />`); `ErrorComponent` logs via `console.error`.
  - Public: `index.tsx` (home; hero gradient untouched, section backgrounds white), `about.tsx`, `cart.tsx`, `login.tsx`, `signup.tsx`, `checkout.tsx`, `order-confirmation.tsx`, `shop/index.tsx`, `shop/$category.tsx`, `shop/$id.tsx` (product detail), `account/*`, `$.tsx` (404).
  - Admin: `admin/index.tsx` (dashboard/analytics), `admin/products/`, `admin/orders/`, `admin/payments/`, `admin/customers/` — all guarded by `src/lib/adminMiddleware.ts` + server-side `verifyAdmin()`.
- **Query/client plumbing**: React Query v5 is used for admin/storefront server-fn data; provider setup location `[verify]` (likely `__root.tsx` or a lib module). Client supabase singleton lives on `window.__peachcraft_supabase` (`src/lib/supabase.ts`).
- **Build caveat**: at current HEAD `2236181`, `vite.config.ts` still sets `server.entry: "server"` and there is **no** `vercel.json`. This exact shape has an open Vercel 500 issue (see §9 Known Issue #2).

---

## 3. Data Model (Supabase)

- **Base tables** created in the Supabase dashboard (documented in `Fully-Detailed-Schema.md` + `supabase-current-schema.md`):
  - `products` — `name, price, description, images[] (jsonb), tag, swatch, category, stock_qty, is_active, created_at, brand`.
  - `orders` — `user_id, total_amount, status (pending/confirmed/…), shipping_address, payment_method, payment_status (pending|paid|awaiting_verification|failed), created_at`.
  - `order_items` — `order_id, product_id, qty, price_at_purchase`.
  - `gcash_payments` — `order_id, gcash_reference_number (UNIQUE), screenshot_url, customer_email, status (pending|verified|rejected), verified_at`.
  - `users`, `profiles`.
- **Migration-created tables** (`sql/migrations/001-005`):
  - `001`: `signup_attempts` (IP rate limit), `carts`.
  - `002`: `cart_items`.
  - `003`: `cart_add_attempts`.
  - `004`: RLS on carts; `gcash_payments`.
  - `005`: `login_attempts`, `order_attempts`.
- **Constraints**: `gcash_reference_number` unique (app also catches PG error `23505`). RLS on carts.
- **Order ID** displayed to customers: `PTT-yyyymmdd-XXX` from `generateOrderId(orderUuid, createdAt)` (`supabase.functions.ts:583-588`) — UUID suffix first 3 hex chars uppercased.

---

## 4. Authentication & Admin Authorization

- **Client**: `getSupabaseClient()` in `src/lib/supabase.ts` (browser singleton). `clearAuthCookies()` for sign-out.
- **Server**: `getSupabaseServer(accessToken?, { authOnly })` — `authOnly: true` creates a client that cannot persist cookies; use it for token-verified calls.
- **Session context**: `src/lib/auth-context.tsx` `AuthProvider` — 5s timeout on session resolution, `validSession` 24h expiry buffer; invalid/expired tokens handled as a graceful state, never a crash.
- **Admin gate — THE authoritative check** is server-side `verifyAdmin()` in `src/lib/api/admin-auth.ts`:
  - With `accessToken`: `authClient.auth.getUser(token)` then email must equal `ADMIN_EMAIL`.
  - Without `accessToken` (all GET admin fns): detects the request from TanStack Start AsyncLocalStorage context, builds a `createServerClient` with cookie `getAll()`, reads the session via `supabase.auth.getUser()`. **This cookie-fallback path is the current working fix (uncommitted working-tree change).**
  - Client-side admin checks are cosmetic only (show/hide UI).
- **Route guard**: `src/lib/adminMiddleware.ts` used by admin routes.
- **Login**: `src/routes/login.tsx` sets `sb-admin-token` cookie; `sanitizeRedirect` accepts **same-origin relative paths only** (rejects full URLs and `//`).
- **Signup**: `signUpWithProfile` (`supabase.functions.ts:1621+`) — Turnstile verify (if token provided), IP rate-limit `signup_attempts` 5/hr (`MAX_PER_HOUR = 5`), zod validation (email, password ≥8, username 2-50, address 5-200).
- **Server-only env**: `src/lib/config.server.ts` patterns; admin email/id/auth identifiers are never in client-bundled `VITE_*` vars.

---

## 5. Server Functions & Core Business Logic

All core server functions live in `src/lib/api/supabase.functions.ts` (2333 lines), declared as `createServerFn({ method })` with `.inputValidator(z.object(...))` (zod) — validation happens at the server boundary.

- **`createOrder`** (`:384+`) — checkout order creation:
  - Validates items, shipping address, payment method, `total_amount`, `accessToken`, `turnstileToken`, `ip`.
  - Requires authenticated user; records order attempt for IP rate-limiting (best-effort, `order_attempts`).
  - Enforces one active order rule (TOCTOU-prone, see §9 #5).
  - **Stock reservation is atomic-ish**: per-item `.gte("stock_qty", qty)` conditional update; on ANY failure rolls back previously deducted stock via `restoreStock()` helper; order insert failure also rolls back.
  - Inserts `orders` + `order_items` (`price_at_purchase` taken from client input — see §9 #4).
- **`searchProducts` / `getAutocompleteSuggestions`** (`src/lib/api/search.functions.ts`): fully in-memory JS search over active products. Tokenizes, uses Levenshtein + weighted scoring (name 10, category 6, brand 6, tag 4, description 2) + log-scaled popularity boost; no pg_trgm/TS. Virtual brands from `getVirtualBrand()` (`Kawaii Deco`, `Clay Dream`, `Strawberry Fields`, else `Peach Craft`).
- **Admin reads** (all `GET`, all call `verifyAdmin()` with the cookie path): `getAdminProducts` (`:956`), `getOrdersList` (`:1203`), `getAnalyticsData` (`:1373`), `getAdminPayments` (`:840`).
- **Cart sync** (`src/lib/cart.ts`): localStorage key `peachcraft-cart`, cross-tab event `peachcraft-cart-updated`; `saveCartForUser` / `getCartForUser` sync to DB when logged in. Enforces max 25 units/product and stock limits client-side.
- **Other fns** in the same module: `uploadProductImage`, `uploadPaymentProof`, `submitGCashProof`, `verifyGCashPayment`, `checkDuplicateReference` (see §6–§7), plus profile/account handlers.

---

## 6. Payments — GCash Flow

- **Config** (`src/routes/checkout.tsx`): `GCASH_CONFIG = { number: "0917 123 4567", name: "Peach Craft PH" }`. Checkout uses `shippingSchema` (zod) and `generateDisplayOrderId`.
- **Flow**:
  1. `createOrder` → order created `status: pending`, `payment_status: pending` (gcash) or `paid` (other).
  2. Customer submits proof → `submitGCashProof` (`:701`): auth via `accessToken`; rejects duplicate `gcash_reference_number` (app check + unique constraint `23505`); verifies order ownership, `payment_method === "gcash"`, `payment_status === "pending"`. Inserts `gcash_payments (status: pending)` and flips order to `payment_status: awaiting_verification`.
  3. Customer pre-checks duplicate refs via `checkDuplicateReference` (`:686`, GET).
  4. Admin acts → `verifyGCashPayment` (`:784`, POST, calls `verifyAdmin()`): payment must be `pending`; **approve** → payment `verified` + order `payment_status: paid, status: confirmed`; **reject** → payment `rejected` + order `payment_status: failed`.
- **Idempotency note**: verify endpoint guards on `payment.status !== "pending"`, so a double-submitted action is rejected — good. The proof-submit step relies on the unique ref + `23505` catch — acceptable.

---

## 7. Image Handling & R2 Storage

- **Upload path** (`uploadProductImage`, `:1546`; `uploadPaymentProof`, `:609`): client sends `{ fileName, base64, accessToken }`; server decodes MIME from the data URI, rejects non-PNG/JPEG/GIF/WebP, then:
  - **Magic-byte validation**: `validateMagicBytes`/`validateImageBuffer` (`:590-607`) — signature check, not client MIME. Payment proofs also capped at 10 MB (`:647`).
  - **Primary store: Cloudflare R2** via REST API `PUT https://api.cloudflare.com/client/v4/accounts/{account}/r2/buckets/{bucket}/objects/{key}` with Bearer `CLOUDFLARE_R2_API_TOKEN` (`encodeR2ObjectKey` percent-encodes each path segment).
  - Keys: products → `public/`, payment proofs → `payment-proofs/`.
  - **Fallback**: Supabase Storage buckets `product-images` / `payment-proofs` if R2 env missing.
- **Serving**: returned URL is always the **proxy** `/api/images/{encodedPath}` — never a direct R2 public URL (bypasses Cloudflare OFRB). `src/server.ts:84-128` proxies the GET, sets `Content-Type` from R2 response, `Cache-Control: public, max-age=31536000`, `Access-Control-Allow-Origin: *`.

---

## 8. Frontend Patterns & Design System

- **Design tokens** in `src/styles.css`: oklch color space, kawaii "Peach Craft" palette, semantic tokens via `@theme inline`; shadcn tokens (slate base, `cssVariables: true` in `components.json`).
- **Home page**: hero gradient kept; section backgrounds are **white** (latest intended design).
- **Utility**: `cn()` = `twMerge(clsx(...))` in `src/lib/utils.ts`.
- **Components**: shadcn/ui style in `src/components/ui/*`; Radix primitives; lucide icons.
- **Cart UX**: `src/lib/cart.ts` hook — localStorage-first with server sync; `addToCart` throws on over-stock / >25 units; cart badge reacts to `peachcraft-cart-updated` event.
- **Forms**: react-hook-form + `@hookform/resolvers` zod. **Toasts**: sonner. **Charts**: recharts.
- **Loading/error discipline**: server fns return data to React Query; every mutation invalidates the exact query keys it feeds. (Audit found the admin dashboard currently violates the "no `data!` without guard" rule — §9 #1.)

---

## 9. Security, Error Handling & Known Issues

### Security posture (implemented)
- Server-side zod validation on every server fn; client validation is UX only.
- Image uploads validated by magic bytes + server size cap; rejected before any external I/O.
- Redirect params same-origin only (`login.tsx` `sanitizeRedirect`).
- IP rate limits via `signup_attempts` (5/hr), `login_attempts`, `cart_add_attempts`, `order_attempts`.
- Turnstile on signup (and checkout where token provided).
- CSP + security headers applied at `src/server.ts`.
- Error page never leaks stack traces (`src/lib/error-page.ts`); SSR throws captured by `src/lib/error-capture.ts`.

### Known issues (report as facts; none fixed in this task)
1. **Admin dashboard crash** — `src/routes/admin/index.tsx:138` `data!.revenueByMonth` throws `Cannot read properties of undefined` when `data` is `undefined` while `isLoading` is false and `error` is null. Same `data!` pattern at other lines (~143, 162, 221, 230, 239, 266, 270, 307). Root cause of `data === undefined` with no error still under investigation.
2. **Vercel 500** — deployed `_ssr/index.mjs` imports `/var/task/_ssr/server-CUcuYyFi.mjs`, which is never built (`ERR_MODULE_NOT_FOUND`). Identical hash appears across deployments, including after "redeploy without cache", so it is **not** a stale-cache issue; the Vercel-side build produces a server bundle reference with no matching file. Local `vite build` produces a valid `server-CATFT5PZ.mjs`. Repo currently sits at pre-fix commit `2236181` (reset + force-push removed the `vercel.json` + entry-removal fix commits).
3. **Stored XSS (High)** — `screenshot_url` from `submitGCashProof` is client-supplied and later rendered in `admin/payments/index.tsx` (~233-241) via `dangerouslySetInnerHTML` without sanitization. Fix should validate `screenshot_url` to the `/api/images/…` proxy shape server-side and/or render as plain `<img src>`.
4. **Client-supplied amounts (High)** — `createOrder` trusts `total_amount` and per-item `price_at_purchase` from the client; nothing recomputes prices server-side from `products.price`. A crafted request can underpay.
5. **TOCTOU one-active-order (Medium)** — the "only one active order" check + insert is not atomic; concurrent submits can create two orders.
6. **Double-order on double-click (Medium)** — checkout submit button can fire twice before navigation; no in-flight lock.
7. **Uncommitted change** — `src/lib/api/admin-auth.ts` `verifyAdmin` cookie fallback is an uncommitted working-tree edit.
8. **`@supabase/ssr` types** — `setAll` is optional on the cookie client; cookie-session paths must construct the client explicitly (relevant to the §4 cookie fix).

### Conventions to keep
- One concern per change; server-side recompute/verify privileged data; webhook/payment mutations idempotent; DB constraints over app-level assumptions; never log tokens/sessions; run `npx tsc --noEmit` after changes.

---

## Self-Check
- ✅ File paths & line refs above trace to real files read this session.
- ✅ Data model matches `sql/migrations/001-005` + `supabase-current-schema.md`.
- ✅ Known issues are reported as facts, not fixed.
- ✅ No generic Next.js/TanStack boilerplate assumptions — every statement maps to Peach Craft code.
- ⚠️ Marked `[verify]`: Resend usage site in app code; React Query provider file; exact `createOrder` head (lines 384-505 not re-read this pass); `brand` column presence in `products` (used by search but shown in schema docs as `brand`).
- ✅ This task changed only `memory.md` — no source code was modified.