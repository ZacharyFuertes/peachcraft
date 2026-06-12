# Cart & Checkout System Implementation Guide

## Overview

This guide documents the complete customer-facing cart and checkout implementation for Peach Craft. The system supports persistent carts, guest checkout, and full order creation with stock management.

## Features Implemented

### 1. Shopping Cart (`src/lib/cart.ts`)

A lightweight localStorage-based cart system that persists across browser sessions.

**Key Functions:**
- `useCart()` - React hook for cart state management
- `addToCart(product, quantity)` - Add items with stock checking
- `updateCartQuantity(productId, qty)` - Update item quantity
- `removeCartItem(productId)` - Remove items
- `clearCart()` - Empty entire cart

**Cart Item Structure:**
```typescript
type CartItem = {
  product_id: string;
  name: string;
  price: number;
  qty: number;
  image?: string | null;
  swatch?: string | null;
  stock_qty?: number | null;
};
```

### 2. Cart Page (`src/routes/cart.tsx`)

Full-page cart view with:
- Product list with quantity controls
- Real-time cart total calculation
- Stock availability display
- Empty cart messaging
- Checkout navigation
- Cart management buttons (increase/decrease/remove)

**Route:** `/cart`

### 3. Checkout Page (`src/routes/checkout.tsx`)

Multi-field checkout form with:
- Shipping address collection (name, email, street, city, province, zip)
- Payment method selection (currently Cash on Delivery only)
- Order summary with line items
- Form validation with Zod
- Real-time error display
- Success confirmation messaging

**Route:** `/checkout`

### 4. Server Functions (`src/lib/api/supabase.functions.ts`)

#### `createOrder()`

Primary order creation endpoint that:
- Validates all cart items are in stock and available
- Verifies prices haven't changed since add-to-cart
- Atomically reserves stock (prevents overselling)
- Creates order record in database
- Creates order_items junction records
- Handles rollback on failure
- Returns order ID on success

**Input Schema:**
```typescript
{
  items: Array<{
    product_id: string;
    qty: number;
    price_at_purchase: number;
  }>;
  shipping_address: {
    name: string;
    email: string;
    street: string;
    city: string;
    province: string;
    zip: string;
  };
  total_amount: number;
  payment_method: "cash_on_delivery";
}
```

**Response:**
```typescript
{ id: string } // Order ID
```

### 5. UI Updates

#### Header Cart Badge (`src/components/SiteHeader.tsx`)
- Live item count display
- Links to `/cart` page
- Real-time updates via `useCart()` hook

#### ProductCard Add-to-Cart (`src/components/ProductCard.tsx`)
- Stock availability checking
- Max quantity enforcement
- Error alerting on stock issues
- Active add-to-cart button state

#### Login/Signup Pages
- "Continue as Guest" buttons redirect to checkout
- Allow users to proceed without account creation

## Supabase Database Schema

### Required Tables

Assuming these tables already exist based on admin functionality:

```sql
-- Products table (already exists)
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT,
  images TEXT[] DEFAULT '{}',
  tag TEXT,
  swatch TEXT,
  category TEXT,
  stock_qty INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Orders table (likely exists, verify structure)
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  total_amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending',
  shipping_address JSONB,
  payment_method TEXT DEFAULT 'cash_on_delivery',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Order items junction table (VERIFY THIS EXISTS)
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  qty INTEGER NOT NULL,
  price_at_purchase NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS if needed
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create indexes for performance
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- Website settings singleton table for admin-managed site metadata
CREATE TABLE IF NOT EXISTS website_settings (
  id TEXT PRIMARY KEY,
  store_name TEXT NOT NULL,
  store_logo TEXT,
  store_description TEXT,
  contact_email TEXT,
  contact_number TEXT NOT NULL,
  address TEXT,
  facebook_url TEXT,
  instagram_url TEXT,
  twitter_url TEXT,
  footer_text TEXT,
  hero_banner TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- For the current admin UI, insert a singleton row with id = 'singleton'
-- or let the app upsert it automatically.

### Cloudflare R2 / Supabase storage fallback
The website settings image upload uses Cloudflare R2 when the following env vars are configured:
- CLOUDFLARE_R2_ACCOUNT_ID
- CLOUDFLARE_R2_BUCKET_NAME
- CLOUDFLARE_R2_API_TOKEN

If R2 is not configured, uploads fallback to Supabase Storage and return a public URL.
```

### Key Constraints & Checks

```sql
-- Ensure order has items
ALTER TABLE orders ADD CONSTRAINT check_order_has_items 
  CHECK (total_amount > 0);

-- Ensure stock never goes negative
ALTER TABLE products ADD CONSTRAINT check_positive_stock 
  CHECK (stock_qty >= 0);

-- Ensure valid order status
ALTER TABLE orders ADD CONSTRAINT check_valid_status 
  CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled'));
```

## Shipping & Tax Configuration

Currently hardcoded values:
- **Shipping fee:** ₱150 (fixed)
- **Tax amount:** ₱0 (placeholder)

**To customize:**
Edit in `src/routes/cart.tsx` and `src/routes/checkout.tsx`:

```typescript
const shippingFee = 150;  // Change this value
const taxAmount = 0;       // Add tax calculation logic
```

Future: Move to environment variables or admin settings.

## Testing the Full Flow

### Step 1: Add Items to Cart

```typescript
// From product page
1. Browse /shop or /
2. Click "Add" button on any product
3. Observe cart badge update in header
```

### Step 2: View Cart

```
1. Click cart badge or navigate to /cart
2. Verify item list, quantities, and totals
3. Test increment/decrement buttons
4. Test remove item button
5. Verify subtotal + shipping = total
```

### Step 3: Checkout as Guest

```
1. Click "Proceed to checkout" or "Continue as guest"
2. Fill shipping form:
   - Name: Any name
   - Email: any@example.com
   - Address: 123 Test St
   - City: Manila
   - Province: NCR
   - Zip: 1000
3. Payment method: Should show "Cash on delivery"
4. Click "Place order"
5. Should see success message
```

### Step 4: Verify Order in Admin

```
1. Sign in as admin (admin@peachcraft.com)
2. Navigate to /admin/orders
3. New order should appear in list
4. Click order to view details
5. Verify:
   - Customer email matches
   - Items are listed correctly
   - Total amount is correct
   - Status is "pending"
   - Shipping address saved
```

### Step 5: Check Stock Reduction

```
1. Go to /admin/products
2. Click on product that was ordered
3. stock_qty should be reduced by order quantity
```

## Error Handling

### Client-Side

1. **Stock exhaustion on add:**
   - Shows browser alert: "Only X [product] left in stock."
   - Button becomes disabled ("Max quantity")

2. **Checkout validation:**
   - Form shows inline error messages for each field
   - Submit button disabled until all required fields valid

3. **Order creation failure:**
   - Shows error message in red banner
   - Cart remains intact for retry
   - User can adjust and resubmit

### Server-Side

1. **Stock check fails:**
   - Returns 400-level error
   - Stock rollback applied atomically
   - Message: "Not enough stock for [product]."

2. **Price mismatch:**
   - Returns error: "Pricing mismatch. Please refresh your cart."
   - User must re-add items at current price

3. **Product unavailable:**
   - Returns error: "One or more products are unavailable."

## Future Enhancements

### Phase 2: Payment Integration

1. **Stripe Integration**
   - Create `createPaymentIntent` server function
   - Add payment form to checkout
   - Update `createOrder` to require successful payment before completion
   - Handle webhook for Stripe events

2. **Email Notifications**
   - Order confirmation email to customer
   - Order notification to admin
   - Shipping tracking email

### Phase 3: Order Management

1. **Customer Order History**
   - Create `/orders` page (requires auth)
   - Show user's past orders
   - Allow order status tracking
   - Reorder functionality

2. **Admin Order Management**
   - Bulk order status updates
   - Order fulfillment tracking
   - Shipping label generation
   - Refund processing

### Phase 4: Advanced Features

1. **Inventory Alerts**
   - Email admin when product drops below threshold
   - Suggest restock in admin dashboard

2. **Abandoned Cart Recovery**
   - Email reminders for unpaid carts
   - Apply discount codes to recover sales

3. **Promo Codes**
   - Apply discount codes at checkout
   - Track code usage and redemptions
   - A/B test discount strategies

## File Structure

```
src/
├── lib/
│   ├── cart.ts                          # Cart hook & utilities
│   └── api/
│       └── supabase.functions.ts        # createOrder server fn
├── components/
│   ├── ProductCard.tsx                  # Updated: addToCart
│   └── SiteHeader.tsx                   # Updated: cart badge
└── routes/
    ├── cart.tsx                         # NEW: Cart page
    ├── checkout.tsx                     # NEW: Checkout page
    ├── login.tsx                        # Updated: guest checkout
    └── signup.tsx                       # Updated: guest checkout
```

## Environment Variables

No new environment variables needed. Uses existing:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Performance Considerations

1. **Cart Persistence**
   - Uses localStorage (~5MB limit per domain)
   - Suitable for typical cart sizes (< 100 items)
   - No server-side session overhead

2. **Stock Checking**
   - Validated at checkout only (not on add)
   - Prevents race conditions with atomic database update
   - Row-level locking on products table during update

3. **Order Creation**
   - Uses transaction-like pattern with rollback
   - Suitable for < 100 items per order
   - Index on (order_id, product_id) for fast lookups

## Troubleshooting

### Cart badge not updating

**Cause:** localStorage event listener didn't register
**Fix:** Hard refresh page (Ctrl+Shift+R)

### "Maximum quantity" shown but item actually available

**Cause:** Stale product data from cart cache
**Fix:** Refresh product from database: Delete cart, re-add item

### Order fails silently

**Cause:** Supabase permission/auth issue
**Fix:** Check browser console for server error message

### Stock not decremented after order

**Cause:** Order creation succeeded but stock update failed
**Fix:** Check Supabase logs for constraint violations

## API Reference

### `createOrder` Server Function

**Endpoint:** POST to internal RPC
**Auth:** Optional (guest or authenticated users)
**Input Validation:** Zod schema with full validation
**Response:** `{ id: string }` - Order UUID

**Error Codes:**
- 400: Validation error (missing field, invalid email, etc.)
- 400: Stock insufficient
- 400: Product unavailable
- 500: Database error / rollback failure

**Example Usage:**

```typescript
const { mutateAsync, isLoading } = useMutation({
  mutationFn: async (payload) => createOrder({ data: payload }),
});

try {
  const { id } = await mutateAsync({
    items: cart.items.map(item => ({
      product_id: item.product_id,
      qty: item.qty,
      price_at_purchase: item.price,
    })),
    shipping_address: { ... },
    total_amount: 1650,
    payment_method: "cash_on_delivery",
  });
  console.log("Order created:", id);
} catch (error) {
  console.error("Order failed:", error.message);
}
```

## Support & Debugging

For issues:
1. Check browser console for client-side errors
2. Check Supabase logs for server-side errors
3. Verify database schema matches above
4. Ensure `SUPABASE_SERVICE_ROLE_KEY` is set (required for stock updates)
5. Test with one item first before large orders
