# Peach Craft — Codebase Improvement Plan

> Generated from codebase analysis on 2026-06-15.

---

## Tier 1 — High Impact (code health & correctness)

### 1. Split `src/lib/api/supabase.functions.ts` (1542 lines) into domain modules

The file centralizes ~28 server functions mixing auth, products, orders, cart, analytics, and file uploads.

**Action:** Split into:
- `src/lib/api/auth.ts` — `signUpWithProfile`, `verifyEmailOtp`, admin verification helpers
- `src/lib/api/products.ts` — `getFeaturedProducts`, `getAllProducts`, `getProductById`, `createProduct`, `updateProduct`, `deleteProduct`, `toggleProductActive`
- `src/lib/api/orders.ts` — `createOrder`, `getOrdersList`, `getMyOrders`, `updateOrderStatus`, order analytics queries
- `src/lib/api/cart.ts` — `getCartForUser`, `getCartItemsForUser`, `addCartItem`, `updateCartItemQuantity`, `removeCartItem`, `clearCart`
- `src/lib/api/analytics.ts` — `getAdminDashboardData`, `getAnalyticsData`
- `src/lib/api/constants.ts` — shared constants (see #20)

### 2. Eliminate all `as any` casts in server functions

| Location | Current Code |
|---|---|
| `supabase.functions.ts:120` | `(supabase.auth as any).getUser(accessToken)` |
| `supabase.functions.ts:1057, 1064, 1071-1078` | `(createData as any)`, `(supabase.auth as any).admin` |
| `supabase.functions.ts:1503` | `verifyPayload as any` |
| `supabase.functions.ts:1456` | `return [] as any[]` |

**Action:** Use proper types from `@supabase/supabase-js` (`GoTrueAdminApi`, `UserAttributes`, `VerifyOtpParams`). The Admin API types are available via `supabase.auth.admin`.

### 3. Fix error middleware in `src/start.ts:13`

The middleware catches all server function errors and returns raw HTML:

```ts
return new Response(renderErrorPage(), { status: 500, headers: { "Content-Type": "text/html" } });
```

**Problem:** Server functions are called by TanStack Query on the client. Returning HTML breaks client-side error handling — React Query expects JSON.

**Action:** Return a structured JSON error:
```ts
return new Response(JSON.stringify({ error: error.message }), {
  status: 500,
  headers: { "Content-Type": "application/json" },
});
```

### 4. Fix real-time subscription in `src/routes/admin/orders/index.tsx:46`

```ts
payload.new as OrderSummary
```

**Problem:** `payload.new` is the raw database row — it doesn't include `user_email` (that's a joined field populated by `getOrdersList`). The cast silently makes `user_email` undefined.

**Action:** Fetch the user email separately using `getUserEmail(createdUserId)` or handle the optional field properly in the UI.

### 5. Stop the `getMyOrders` localStorage side-effect in `SiteHeader.tsx:45-50`

```ts
const orders = await getMyOrders({ data: { accessToken } });
localStorage.setItem("peachcraft-orders", JSON.stringify(orders));
```

**Problem:** Fires on every auth state change (including token refresh). Stores data never displayed by the header. No cleanup on unmount.

**Action:** Remove this call entirely. Orders data belongs in the TanStack Query cache, not localStorage.

---

## Tier 2 — Code Quality & Consistency

### 6. Adopt shadcn/ui primitives (exist but are unused)

| shadcn Component | File Location | Currently Replaced By |
|---|---|---|
| `AlertDialog` | `src/components/ui/alert-dialog.tsx` | `window.confirm("Delete...")` in `admin/products/index.tsx:42` |
| `Input` | `src/components/ui/input.tsx` | Raw `<input>` in `ProductForm.tsx`, `login.tsx`, `signup.tsx` |
| `Textarea` | valid | Raw `<textarea>` in `ProductForm.tsx:399` |
| `Select` | `src/components/ui/select.tsx` | Raw `<select>` in `ProductForm.tsx:421, 474` |
| `Switch` | `src/components/ui/switch.tsx` | Custom toggle (raw checkbox + styled span) in `ProductForm.tsx:604-623` |
| `Card` | `src/components/ui/card.tsx` | Divs with `rounded-3xl bg-[var(--card)] p-6 shadow-soft` in admin pages |
| `Badge` | `src/components/ui/badge.tsx` | Manual `span` with inline classes for order statuses |
| `Button` | `src/components/ui/button.tsx` | Raw `<button>` everywhere (see #22 for variants) |

**Action:** Replace hand-rolled elements with shadcn primitives across all pages. Extend `button.tsx` CVA with `sage` and `blush` variants (see #22).

### 7. Replace custom toast with `sonner`

**Problem:** `CartToast.tsx` (156 lines) implements a custom context-based toast system with its own animation, stacking, and auto-dismiss logic. The project already has `sonner` installed with a shadcn wrapper at `src/components/ui/sonner.tsx`, but neither is used.

**Action:** Replace `CartToast.tsx` + `CartToastProvider` with `sonner`. Migrate all `toast.show()` calls to `toast()` from `sonner`.

### 8. Replace CSS variable bypasses with Tailwind v4 utilities

| Current (verbose) | Preferred |
|---|---|
| `bg-[var(--card)]` | `bg-card` |
| `text-[var(--foreground)]` | `text-foreground` |
| `border-[var(--border)]` | `border-border` |
| `bg-[var(--background)]` | `bg-background` |
| `bg-[var(--sage)]` | `bg-sage` |
| `hover:bg-[var(--sage-deep)]` | `hover:bg-sage-deep` |
| `rounded-[var(--radius)]` | `rounded-lg` / `rounded-xl` |

**Action:** Search-replace across the entire codebase. These are registered as `@theme inline` tokens in `src/styles.css` and generate proper Tailwind utilities automatically.

### 9. Replace hardcoded colors with design tokens

| File | Hardcoded Value | Suggested Token |
|---|---|---|
| `ProductForm.tsx:348` | `bg-[#f87171]/10 text-[#991b1b]` | `bg-destructive/10 text-destructive` |
| `ProductForm.tsx:363, 377` | `text-[#ef4444]` | `text-destructive` |
| `login.tsx:109` | `bg-red-50 text-[#f87171]` | `bg-destructive/10 text-destructive` |
| `signup.tsx:146, 162, 180, 196, 221` | `border-[#f87171]` | `border-destructive` |
| `checkout.tsx:138` | `bg-[#fee2e2] text-[#b91c1c]` | `bg-destructive/10 text-destructive` |
| `cart.tsx:97` | `border-[#f3d1d8] bg-[#fff1f4] text-[#c24151]` | Use `Button variant="destructive"` |
| `admin/orders/index.tsx:16` | `cancelled: "bg-[#f87171]..."` | `bg-destructive` |
| `admin/products/index.tsx:107` | `bg-[#f87171] text-[var(--background)]` | `bg-destructive text-destructive-foreground` |

**Action:** Replace all literal hex colors with theme tokens defined in `styles.css`.

### 10. Define or remove `animate-fade-in`

**Problem:** Used in `SiteHeader.tsx:218` but not defined in `src/styles.css` or `tw-animate-css`. The animation silently does nothing.

**Action:** Either add the keyframe definition to `styles.css` or remove the class.

---

## Tier 3 — Architecture & Patterns

### 11. Adopt `react-hook-form` + shadcn `Form` for all forms

**Problem:** `react-hook-form` is in `package.json` but never used. All forms (login, signup, checkout, ProductForm, website-settings) use raw `useState` with manual validation, error tracking, and submission logic. This is error-prone and verbose.

| Page | Lines of Manual Form Code |
|---|---|
| `login.tsx` | ~40 lines of state/validation logic |
| `signup.tsx` | ~100 lines |
| `checkout.tsx` | ~80 lines |
| `ProductForm.tsx` | ~200 lines |
| `website-settings.tsx` | ~150 lines |

**Action:** Migrate to `react-hook-form` + `zod` + shadcn `Form`. The shadcn `Form` wrapper exists at `src/components/ui/form.tsx` but is unused.

### 12. Fix SSR flash in `use-mobile.tsx`

**Problem:** The hook initializes state as `undefined`, causing a desktop layout flash on mobile before the first `useEffect` runs.

```ts
// Current
const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);
```

**Action:** Initialize with a synchronous check where possible:
```ts
const [isMobile, setIsMobile] = useState(() =>
  typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false
);
```

### 13. Properly type `website-settings.tsx`

**Problem:** Uses `any` types that defeat TypeScript safety:
```ts
const [initial, setInitial] = useState<any | null>(null);
const [form, setForm] = useState<any>({});
catch (err: any)
```

**Action:** Define an interface for website settings and use it:
```ts
interface WebsiteSettings {
  storeName: string;
  storeLogo: string;
  facebookUrl: string;
  instagramUrl: string;
  // ...
}
const [form, setForm] = useState<WebsiteSettings>(defaultSettings);
```

### 14. Add date filtering to analytics queries

**Problem:** `getAnalyticsData` loads ALL `order_items` and `orders` with no date range filters. This will become a performance issue as the store grows.

**Action:** Add an optional date range parameter (defaulting to last 30 days) to all analytics queries:
```ts
function getAnalyticsData({ data: { startDate, endDate } }: { data: { startDate: string; endDate: string } })
```

### 15. Make wishlist functional or remove it from `ProductCard.tsx:81-91`

**Problem:** The "wishlist" heart button toggles local `liked` state only — it's lost on page refresh. The "Quick view" button has no `onClick` handler.

**Action:** Either implement actual wishlist persistence (Supabase table + server function) or remove both non-functional buttons.

---

## Tier 4 — Low Effort / Quick Wins

### 16. Remove dead code

| File | Line(s) | Code | Reason |
|---|---|---|---|
| `supabase.functions.ts` | 106-111 | `formatDateRange()` | Defined but never called |
| `supabase.ts` | 120 | `seedProductsFromStatic()` | Comment says "Run once then delete" |
| `supabase.functions.ts` | 19-29 | `ProductFormData` type | Defined here but used in `ProductForm.tsx` where it's redefined |
| `cart.ts` | 86-124 | Standalone `addToCart` | Duplicate of `useCart.addItem` — appears unused |

### 17. Clean up unused shadcn component files

The following shadcn component files exist but are never imported anywhere:
`accordion`, `aspect-ratio`, `breadcrumb`, `calendar`, `carousel`, `chart`, `collapsible`, `command`, `context-menu`, `drawer`, `hover-card`, `input-otp`, `menubar`, `navigation-menu`, `pagination`, `popover`, `progress`, `radio-group`, `resizable`, `scroll-area`, `separator`, `sidebar`, `skeleton`, `slider`, `table`, `tabs`, `toggle`, `toggle-group`, `tooltip`.

**Action:** Either remove them or keep as a design system toolkit for future use.

### 18. Fix navigation active-state in `SiteHeader.tsx:124`

```ts
active={pathname.startsWith(link.href)}
```

**Problem:** `/shipping-policy` would match when on `/shop` since both start with `/s`. Also, `/admin/products` would not be highlighted when on `/admin/products/new`.

**Action:** Use precise matching. For root `/`, check `===`. For other routes, use `startsWith(link.href + "/")` or `=== link.href`.

### 19. Replace `window.alert` with the toast system

**Problem:** `ProductCard.tsx:42` uses `window.alert(error.message)` for API errors, which blocks the main thread and provides poor UX.

**Action:** Use `toast.error()` from `sonner`.

### 20. Extract shared constants

| Constant | Value | Used In |
|---|---|---|
| Product select columns | `"id,name,price,description,images,tag,swatch,category,stock_qty,is_active"` | `supabase.functions.ts` (3+ places) |
| Status colors mapping | `{ pending: "...", completed: "..." }` | `analytics.tsx:18`, `orders/index.tsx:11` |
| Max items per product | `25` | `supabase.functions.ts:1263`, `cart.ts:97` |
| Shipping fee | `150` | `checkout.tsx:43` |
| Signup rate limit | `5` | `supabase.functions.ts:994` |
| Cart rate limit | `20` | `supabase.functions.ts:1215` |

**Action:** Move to `src/lib/constants.ts` and import where needed.

### 21. Add `role="main"` and `aria-label` to `__root.tsx:129`

```tsx
<main id="main" className="flex-1" role="main" aria-label="Main content">
```

### 22. Add sage/blush variants to the shadcn `Button` component

Currently, button variants are hand-rolled inline across the app (at least 6 distinct patterns). Extend `button.tsx` CVA:

```ts
const buttonVariants = cva(
  // ...
  variants: {
    variant: {
      // existing: default, destructive, outline, secondary, ghost, link
      sage: "bg-sage text-foreground shadow-soft hover:bg-sage-deep",
      blush: "bg-blush text-blush-foreground shadow-soft hover:opacity-90",
    },
  },
);
```

---

## 🏁 Recommended Order of Execution

| Phase | Focus | Est. Effort |
|---|---|---|
| **Phase 1** | Tiers 1-2 (split server functions, fix correctness bugs, adopt shadcn primitives, replace var() with utilities) | ~2-3 days |
| **Phase 2** | Tier 3 (react-hook-form migration, typing fixes, analytics perf, wishlist) | ~2-3 days |
| **Phase 3** | Tier 4 (dead code removal, constants extraction, a11y, quick wins) | ~0.5 days |
