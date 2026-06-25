# Fully Detailed Database Schema — Peach Craft

---

## Overview

The project uses **Supabase (PostgreSQL)** as its database. The schema consists of **8 user-defined tables**, **1 Supabase built-in auth table**, and **RLS policies** where applicable. All migrations are located in `sql/migrations/`.

---

## 1. `auth.users` (Supabase Built-in)

**Purpose**: Supabase Auth internal table — stores authenticated user accounts. Referenced via foreign keys from `profiles`, `orders`, `carts`, `cart_items`, and `cart_add_attempts`.

**Relevant Columns** (partial, only those referenced in the project):

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | PRIMARY KEY |
| `email` | TEXT | NOT NULL |

**Note**: This table is managed entirely by Supabase Auth. The project reads from it via `supabase.from("users").select("id,email")` in `getOrdersList` and `getOrderDetails` to resolve user emails.

---

## 2. `profiles`

**Purpose**: Extended user profile data, linked 1:1 with `auth.users`.

**Defined in**: `REGISTRATION_SETUP_GUIDE.md` (SQL setup instructions), not in migration files.

**Columns**:

| Column | Type | Constraints | Default |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY, FOREIGN KEY → `auth.users(id)` ON DELETE CASCADE | — |
| `username` | TEXT | NOT NULL, UNIQUE | — |
| `email` | TEXT | NOT NULL, UNIQUE | — |
| `address` | TEXT | nullable | — |
| `email_verified` | BOOLEAN | | `false` |
| `created_at` | TIMESTAMPTZ | | `now()` |
| `updated_at` | TIMESTAMPTZ | | `now()` |

**Indexes**:

| Index Name | Columns |
|---|---|
| `idx_profiles_email` | `email` |
| `idx_profiles_username` | `username` |
| `idx_profiles_email_verified` | `email_verified` |

**RLS Policies**:

| Policy Name | Operation | Using/Check | Effect |
|---|---|---|---|
| `"Users can read their own profile"` | SELECT | `auth.uid() = id` | Users can only read their own row |
| `"Users can update their own profile"` | UPDATE | `auth.uid() = id` (WITH CHECK) | Users can only update their own row |

**Relationships**:
- `id` → `auth.users(id)` (1:1, parent)
- `id` ← `orders(user_id)` (1:N, child)
- `id` ← `carts(user_id)` (1:1, child)
- `id` ← `cart_items(user_id)` (1:N, child)
- `id` ← `cart_add_attempts(user_id)` (1:N, child)

---

## 3. `products`

**Purpose**: Product catalog — items available for purchase.

**Defined in**: No migration SQL found; likely created in Supabase dashboard or earlier migration. Inferred from TypeScript types and server function queries.

**Columns**:

| Column | Type | Constraints | Default |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY | `gen_random_uuid()` (inferred) |
| `name` | TEXT | NOT NULL | — |
| `price` | NUMERIC | NOT NULL | — |
| `description` | TEXT | nullable | — |
| `images` | TEXT[] | nullable (array of URL strings) | — |
| `tag` | TEXT | nullable (e.g. "New", "Best seller", "Limited") | — |
| `swatch` | TEXT | nullable (hex color, e.g. "#F5C8C0") | — |
| `category` | TEXT | nullable (e.g. "Rings", "Accessories", "Bracelets") | — |
| `stock_qty` | INTEGER | nullable | — |
| `is_active` | BOOLEAN | nullable (controls shop visibility) | — |
| `created_at` | TIMESTAMPTZ | | `now()` |

**Indexes**: None explicitly defined in migrations (may exist from creation context).

**RLS Policies**: None defined (accessed server-side with service-role key, bypassing RLS).

**Relationships**:
- `id` ← `order_items(product_id)` (1:N, child)
- `id` ← `cart_items(product_id)` (1:N, child)

---

## 4. `orders`

**Purpose**: Customer orders with status tracking.

**Defined in**: No migration SQL found; inferred from TypeScript types and server function queries.

**Columns**:

| Column | Type | Constraints | Default |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY | `gen_random_uuid()` (inferred) |
| `user_id` | UUID | FOREIGN KEY → `profiles(id)` | — |
| `total_amount` | NUMERIC | NOT NULL | — |
| `status` | TEXT | NOT NULL | — |
| `shipping_address` | JSONB | NOT NULL | — |
| `created_at` | TIMESTAMPTZ | | `now()` |

**Status Values**: `pending`, `confirmed`, `shipped`, `delivered`, `cancelled`

**`shipping_address` JSONB Structure**:
```json
{
  "name": "string",
  "email": "string",
  "street": "string",
  "city": "string",
  "province": "string",
  "zip": "string"
}
```

**Indexes**: None explicitly defined in migrations.

**RLS Policies**: None defined (accessed server-side with service-role key).

**Relationships**:
- `user_id` → `profiles(id)` (N:1, parent)
- `id` ← `order_items(order_id)` (1:N, child)

---

## 5. `order_items`

**Purpose**: Line items belonging to an order (snapshot of products at purchase time).

**Defined in**: No migration SQL found; inferred from server function queries.

**Columns**:

| Column | Type | Constraints | Default |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY | `gen_random_uuid()` (inferred) |
| `order_id` | UUID | FOREIGN KEY → `orders(id)`, NOT NULL | — |
| `product_id` | UUID | FOREIGN KEY → `products(id)`, NOT NULL | — |
| `qty` | INTEGER | NOT NULL | — |
| `price_at_purchase` | NUMERIC | NOT NULL | — |

**Indexes**: None explicitly defined in migrations.

**RLS Policies**: None defined (accessed server-side with service-role key).

**Relationships**:
- `order_id` → `orders(id)` (N:1, parent)
- `product_id` → `products(id)` (N:1, parent)

---

## 6. `carts`

**Purpose**: Persists one cart per authenticated user as a JSONB blob of cart items.

**Defined in**: `sql/migrations/001_create_signup_attempts_and_carts.sql`

**Columns**:

| Column | Type | Constraints | Default |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY | `gen_random_uuid()` |
| `user_id` | UUID | NOT NULL, UNIQUE, FOREIGN KEY → `profiles(id)` ON DELETE CASCADE | — |
| `items` | JSONB | NOT NULL | — |
| `updated_at` | TIMESTAMPTZ | | `now()` |

**Unique Constraints**:

| Constraint Name | Columns |
|---|---|
| `unique_user_cart` | `(user_id)` — one cart per user |

**Indexes**:

| Index Name | Columns |
|---|---|
| `carts_user_id_idx` | `(user_id)` |

**`items` JSONB Structure** (array of objects):
```json
[
  {
    "product_id": "uuid",
    "name": "string",
    "price": number,
    "qty": number,
    "image": "string | null",
    "swatch": "string | null",
    "stock_qty": number | null
  }
]
```

**RLS Policies** (defined in `sql/migrations/003_enable_rls_carts.sql`):

| Policy Name | Operation | Using / Check | Effect |
|---|---|---|---|
| `"Users manage own cart"` | ALL (SELECT, INSERT, UPDATE, DELETE) | `USING (user_id = auth.uid())` WITH CHECK `(user_id = auth.uid())` | Users can only access their own cart row |

**Relationships**:
- `user_id` → `profiles(id)` (N:1, parent)

---

## 7. `cart_items`

**Purpose**: Normalized per-product cart storage (alternative to `carts` JSONB approach). One row per product per user.

**Defined in**: `sql/migrations/002_create_cart_items_and_add_attempts.sql`

**Columns**:

| Column | Type | Constraints | Default |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY | `gen_random_uuid()` |
| `user_id` | UUID | NOT NULL, FOREIGN KEY → `profiles(id)` ON DELETE CASCADE | — |
| `product_id` | UUID | NOT NULL | — |
| `qty` | INTEGER | NOT NULL | — |
| `price` | NUMERIC | NOT NULL | — |
| `name` | TEXT | NOT NULL | — |
| `image` | TEXT | nullable | — |
| `swatch` | TEXT | nullable | — |
| `stock_qty` | INTEGER | nullable | — |
| `created_at` | TIMESTAMPTZ | | `now()` |
| `updated_at` | TIMESTAMPTZ | | `now()` |

**Unique Constraints**:

| Constraint Name | Columns |
|---|---|
| `cart_item_unique_per_user_product` | `(user_id, product_id)` — one row per product per user |

**Indexes**:

| Index Name | Columns |
|---|---|
| `cart_items_user_id_idx` | `(user_id)` |

**RLS Policies**: None explicitly defined in migrations. (The `carts` table is the primary server-sync mechanism; `cart_items` may be a legacy/alternative table.)

**Relationships**:
- `user_id` → `profiles(id)` (N:1, parent)
- `product_id` → `products(id)` (N:1, parent)

---

## 8. `signup_attempts`

**Purpose**: Rate-limiting table for signup registrations — tracks attempts by IP address.

**Defined in**: `sql/migrations/001_create_signup_attempts_and_carts.sql`

**Columns**:

| Column | Type | Constraints | Default |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY | `gen_random_uuid()` |
| `ip` | TEXT | NOT NULL | — |
| `created_at` | TIMESTAMPTZ | | `now()` |

**Indexes**:

| Index Name | Columns |
|---|---|
| `signup_attempts_ip_created_at_idx` | `(ip, created_at)` |

**RLS Policies**: None defined (accessed server-side with service-role key).

**Usage**: When a signup is attempted, the server queries `SELECT COUNT(*) FROM signup_attempts WHERE ip = $1 AND created_at > now() - interval '1 hour'`. If count >= 5, the signup is rejected.

**Relationships**: None (standalone table, no foreign keys).

---

## 9. `cart_add_attempts`

**Purpose**: Rate-limiting table for "add to cart" operations per user.

**Defined in**: `sql/migrations/002_create_cart_items_and_add_attempts.sql`

**Columns**:

| Column | Type | Constraints | Default |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY | `gen_random_uuid()` |
| `user_id` | UUID | FOREIGN KEY → `profiles(id)` ON DELETE CASCADE | — |
| `created_at` | TIMESTAMPTZ | | `now()` |

**Indexes**:

| Index Name | Columns |
|---|---|
| `cart_add_attempts_user_id_created_at_idx` | `(user_id, created_at)` |

**RLS Policies**: None defined (accessed server-side with service-role key).

**Note**: This table exists in the schema but the rate-limiting logic for cart additions is not yet implemented in the application code.

**Relationships**:
- `user_id` → `profiles(id)` (N:1, parent)

---

## 10. `website_settings`

**Purpose**: Singleton row storing global store configuration (name, description, logo, social links, etc.).

**Status**: Updated with new social media fields (instagram_username, tiktok_username, tiktok_url).

**Columns**:

| Column | Type | Constraints | Default |
|---|---|---|---|
| `id` | TEXT | PRIMARY KEY | `"singleton"` |
| `store_name` | TEXT | NOT NULL | — |
| `store_logo` | TEXT | nullable (URL string) | — |
| `store_description` | TEXT | nullable | — |
| `contact_email` | TEXT | nullable | — |
| `contact_number` | TEXT | NOT NULL | — |
| `address` | TEXT | nullable | — |
| `instagram_username` | TEXT | nullable | — |
| `instagram_url` | TEXT | nullable | — |
| `tiktok_username` | TEXT | nullable | — |
| `tiktok_url` | TEXT | nullable | — |
| `footer_text` | TEXT | nullable (copyright text) | — |
| `hero_banner` | TEXT | nullable (URL string) | — |
| `updated_at` | TIMESTAMPTZ | — | `now()` |

**Deprecated Columns** (removed):
- ~~`facebook_url`~~ - No longer used
- ~~`twitter_url`~~ - No longer used

**RLS Policies**: None defined (accessed server-side with service-role key, admin-only).

---

## Entity Relationship Diagram

```
auth.users (Supabase built-in)
  │
  │ (1:1)
  ├─── profiles
  │     │
  │     │ (1:N)             (1:N)             (1:N)             (1:N)
  │     ├─── orders ──── order_items
  │     │                              │
  │     │                              └─── products
  │     │
  │     ├─── carts (1:1, JSONB)
  │     │
  │     ├─── cart_items (1:N, normalized)
  │     │
  │     └─── cart_add_attempts (1:N, rate limiting)
  │
  │ (standalone)
  ├─── signup_attempts (IP-based rate limiting, no FK)
  │
  │ (standalone, singleton)
  └─── website_settings (id = "singleton", no FK)
```

---

## RLS Policies Summary

| Table | Policy Name | Operations | Scope | Effect |
|---|---|---|---|---|
| `profiles` | Users can read their own profile | SELECT | `auth.uid() = id` | User reads own row |
| `profiles` | Users can update their own profile | UPDATE | `auth.uid() = id` (WITH CHECK) | User updates own row |
| `carts` | Users manage own cart | ALL (SELECT/INSERT/UPDATE/DELETE) | `USING (user_id = auth.uid())` WITH CHECK `(user_id = auth.uid())` | User manages own cart row |

All other tables are accessed server-side via `getSupabaseServer()` with the **service-role key**, which bypasses RLS entirely. The `carts` table is accessed via `getSupabaseServer(request, { authOnly: true })` with the **anon key**, which respects RLS.

---

## Server Function Access Patterns

| Server Function | Client Used | RLS Status |
|---|---|---|
| `getFeaturedProducts` | Service-role | Bypassed |
| `getAllProducts` | Service-role | Bypassed |
| `getProductById` | Service-role | Bypassed |
| `createProduct` | Service-role | Bypassed |
| `updateProduct` | Service-role | Bypassed |
| `deleteProduct` | Service-role | Bypassed |
| `toggleProductActive` | Service-role | Bypassed |
| `getAdminProducts` | Service-role | Bypassed |
| `uploadProductImage` | Service-role | Bypassed |
| `createOrder` | Service-role | Bypassed |
| `getOrdersList` | Service-role | Bypassed |
| `getOrderDetails` | Service-role | Bypassed |
| `updateOrderStatus` | Service-role | Bypassed |
| `getMyOrders` | Anon key (authOnly) | Respected |
| `saveCartForUser` | Anon key (authOnly) | Respected (RLS on `carts`) |
| `getCartForUser` | Anon key (authOnly) | Respected (RLS on `carts`) |
| `signUpWithProfile` | Service-role | Bypassed |
| `verifyEmail` | Service-role | Bypassed |
| `checkEmailVerification` | Service-role | Bypassed |
| `getAdminDashboardData` | Service-role | Bypassed |
| `getAnalyticsData` | Service-role | Bypassed |
| `getUserActiveOrderStatus` | Service-role | Bypassed |
| `getStoreDetails` | Service-role | Bypassed |
| `updateStoreDetails` | Service-role | Bypassed |
| `uploadStoreImage` | Service-role | Bypassed |

---

## Migration Files

| File | Content |
|---|---|
| `sql/migrations/001_create_signup_attempts_and_carts.sql` | Creates `signup_attempts` table with IP index; creates `carts` table with unique constraint, user FK, and index |
| `sql/migrations/002_create_cart_items_and_add_attempts.sql` | Creates `cart_items` table with unique per-user-product constraint; creates `cart_add_attempts` table with user FK and index |
| `sql/migrations/003_enable_rls_carts.sql` | Enables RLS on `carts` table; creates policy `"Users manage own cart"` for ALL operations |
