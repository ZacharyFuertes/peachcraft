import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSupabaseServer } from "../supabase";

export type ProductRow = {
  id: string;
  name: string;
  price: number;
  description?: string | null;
  images?: string[] | null;
  tag?: string | null;
  swatch?: string | null;
  category?: string | null;
  stock_qty?: number | null;
  is_active?: boolean | null;
  created_at?: string | null;
};

export type ProductFormData = {
  name: string;
  price: number;
  description: string;
  category: string;
  tag: string;
  swatch: string;
  stock_qty: number;
  is_active: boolean;
  images: string[];
};

export type OrderSummary = {
  id: string;
  user_email: string;
  total_amount: number;
  status: string;
  created_at: string;
};

export type OrderDetailItem = {
  id: string;
  product_name: string;
  product_image: string | null;
  qty: number;
  price_at_purchase: number;
};

export type OrderDetail = {
  id: string;
  status: string;
  total_amount: number;
  created_at: string;
  shipping_address: {
    street?: string;
    city?: string;
    province?: string;
    zip?: string;
  } | null;
  customer: {
    name?: string | null;
    email?: string | null;
  };
  items: OrderDetailItem[];
};

export type CartOrderItem = {
  product_id: string;
  qty: number;
  price_at_purchase: number;
};

export type CartItemRow = {
  item_cart_id: string;
  product_id: string;
  qty: number;
  price: number;
  name: string;
  image?: string | null;
  swatch?: string | null;
  stock_qty?: number | null;
};

export type OrderShippingAddress = {
  name: string;
  email: string;
  street: string;
  city: string;
  province: string;
  zip: string;
};

export type CreateOrderInput = {
  items: CartOrderItem[];
  shipping_address: OrderShippingAddress;
  total_amount: number;
  payment_method: "cash_on_delivery";
};

export type AdminDashboardData = {
  todaysRevenue: number;
  todaysOrders: number;
  pendingOrders: number;
  lowStock: Array<{ id: string; name: string; stock_qty: number | null }>;
  recentOrders: OrderSummary[];
};

function formatDateRange(start: Date, end: Date) {
  return {
    start: start.toISOString(),
    end: end.toISOString(),
  };
}

async function verifyAdmin(request?: Request, accessToken?: string) {
  const supabase = getSupabaseServer(request, { authOnly: true });

  let user = null;
  let error = null;

  if (accessToken) {
    const tokenResult = await (supabase.auth as any).getUser(accessToken);
    user = tokenResult?.data?.user ?? null;
    error = tokenResult?.error ?? null;
  }

  if (!user) {
    const cookieResult = await supabase.auth.getUser();
    user = cookieResult.data?.user ?? null;
    error = cookieResult.error ?? error;
  }

  if (error || !user || user.email !== process.env.ADMIN_EMAIL) {
    throw new Error("Unauthorized");
  }

  return user;
}

export const getFeaturedProducts = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("products")
    .select("id,name,price,description,images,tag,swatch,category,stock_qty,is_active")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(4);

  if (error) {
    throw error;
  }

  return data ?? [];
});

export const getAllProducts = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("products")
    .select("id,name,price,description,images,tag,swatch,category,stock_qty,is_active")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
});

export const getAdminDashboardData = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getSupabaseServer();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [{ data: todaysOrdersData, error: todaysOrdersError }, { data: todaysRevenueData, error: todaysRevenueError }] = await Promise.all([
    supabase
      .from("orders")
      .select("id", { count: "exact" })
      .gte("created_at", today.toISOString())
      .lt("created_at", tomorrow.toISOString()),
    supabase
      .from("orders")
      .select("total_amount")
      .gte("created_at", today.toISOString())
      .lt("created_at", tomorrow.toISOString()),
  ]);

  if (todaysOrdersError) {
    throw todaysOrdersError;
  }
  if (todaysRevenueError) {
    throw todaysRevenueError;
  }

  const todaysOrders = todaysOrdersData?.length ?? 0;
  const todaysRevenue = (todaysRevenueData ?? []).reduce((sum, item) => sum + item.total_amount, 0);

  const { data: pendingOrdersData, error: pendingOrdersError } = await supabase
    .from("orders")
    .select("id", { count: "exact" })
    .eq("status", "pending");

  if (pendingOrdersError) {
    throw pendingOrdersError;
  }

  const pendingOrders = pendingOrdersData?.length ?? 0;

  const { data: lowStock, error: lowStockError } = await supabase
    .from("products")
    .select("id,name,stock_qty")
    .lt("stock_qty", 5)
    .order("stock_qty", { ascending: true });

  if (lowStockError) {
    throw lowStockError;
  }

  const { data: recentOrders, error: recentOrdersError } = await supabase
    .from("orders")
    .select("id,user_id,total_amount,status,created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  if (recentOrdersError) {
    throw recentOrdersError;
  }

  const userIds = Array.from(new Set((recentOrders ?? []).map((order) => order.user_id).filter(Boolean)));
  const { data: users, error: usersError } = await supabase
    .from("users")
    .select("id,email")
    .in("id", userIds);

  if (usersError) {
    throw usersError;
  }

  const userMap = new Map(users?.map((user) => [user.id, user.email]));

  return {
    todaysRevenue,
    todaysOrders,
    pendingOrders,
    lowStock: (lowStock ?? []).map((product) => ({
      id: product.id,
      name: product.name,
      stock_qty: product.stock_qty,
    })),
    recentOrders: (recentOrders ?? []).map((order) => ({
      id: order.id,
      user_email: userMap.get(order.user_id) ?? "Unknown",
      total_amount: order.total_amount,
      status: order.status,
      created_at: order.created_at,
    })),
  };
});

export const getUserActiveOrderStatus = createServerFn({ method: "GET" })
  .handler(async () => {
    const supabase = getSupabaseServer();
    const { data: authData } = await supabase.auth.getUser();
    const userId = authData.user?.id ?? null;

    if (!userId) {
      return { hasActiveOrder: false, activeOrder: null };
    }

    const { data: activeOrders, error } = await supabase
      .from("orders")
      .select("id, status")
      .eq("user_id", userId)
      .in("status", ["pending", "confirmed", "shipped"]);

    if (error) {
      throw error;
    }

    return {
      hasActiveOrder: activeOrders && activeOrders.length > 0,
      activeOrder: activeOrders?.[0] ?? null,
    };
  });

export const createOrder = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      items: z.array(
        z.object({
          product_id: z.string().uuid(),
          qty: z.number().min(1),
          price_at_purchase: z.number().min(0),
        }),
      ).min(1),
      shipping_address: z.object({
        name: z.string().min(1),
        email: z.string().email(),
        street: z.string().min(1),
        city: z.string().min(1),
        province: z.string().min(1),
        zip: z.string().min(1),
      }),
      total_amount: z.number().min(0),
      payment_method: z.literal("cash_on_delivery"),
    }),
  )
  .handler(async ({ data }) => {
    const supabase = getSupabaseServer();
    const { data: authData } = await supabase.auth.getUser();
    const userId = authData.user?.id ?? null;

    if (!userId) {
      throw new Error("Authentication required. Please sign in to place an order.");
    }

    // Verify email_verified status in user profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("email_verified")
      .eq("id", userId)
      .single();

    if (profileError || !profile || !profile.email_verified) {
      throw new Error("Your email has not been verified yet. Please verify your email before placing an order.");
    }

    // Rate limit check: ensure user doesn't have an active order
    const { data: activeOrders, error: activeOrdersError } = await supabase
      .from("orders")
      .select("id")
      .eq("user_id", userId)
      .in("status", ["pending", "confirmed", "shipped"]);

    if (activeOrdersError) {
      throw activeOrdersError;
    }

    if (activeOrders && activeOrders.length > 0) {
      throw new Error("You already have an active order. You can only place a new order once your current order is completed or cancelled.");
    }

    const productIds = Array.from(new Set(data.items.map((item) => item.product_id)));
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("id,name,price,stock_qty,is_active")
      .in("id", productIds);

    if (productsError) {
      throw productsError;
    }

    const productMap = new Map(products?.map((product) => [product.id, product]));

    for (const item of data.items) {
      const product = productMap.get(item.product_id);
      if (!product || !product.is_active) {
        throw new Error("One or more products are unavailable.");
      }
      const available = product.stock_qty ?? 0;
      if (item.qty > available) {
        throw new Error(`Not enough stock for ${product.name}.`);
      }
      if (item.price_at_purchase !== product.price) {
        throw new Error(`Pricing mismatch for ${product.name}. Please refresh your cart.`);
      }
    }

    const originalStock = new Map<string, number>();
    const updatedProductIds: string[] = [];

    for (const item of data.items) {
      const product = productMap.get(item.product_id)!;
      originalStock.set(item.product_id, product.stock_qty ?? 0);

      const { data: updated, error: updateError } = await supabase
        .from("products")
        .update({ stock_qty: (product.stock_qty ?? 0) - item.qty })
        .eq("id", item.product_id)
        .gte("stock_qty", item.qty)
        .select("id");

      if (updateError || !updated || updated.length === 0) {
        for (const rollbackId of updatedProductIds) {
          const rollbackQty = originalStock.get(rollbackId) ?? 0;
          await supabase.from("products").update({ stock_qty: rollbackQty }).eq("id", rollbackId);
        }
        throw new Error(`Failed to reserve stock for ${product.name}. Please try again.`);
      }

      updatedProductIds.push(item.product_id);
    }

    const orderPayload = {
      user_id: userId,
      total_amount: data.total_amount,
      status: "pending",
      shipping_address: data.shipping_address,
    };

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert(orderPayload)
      .select("id")
      .single();

    if (orderError || !order) {
      for (const rollbackId of updatedProductIds) {
        const rollbackQty = originalStock.get(rollbackId) ?? 0;
        await supabase.from("products").update({ stock_qty: rollbackQty }).eq("id", rollbackId);
      }
      throw orderError ?? new Error("Failed to create order.");
    }

    const orderItems = data.items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      qty: item.qty,
      price_at_purchase: item.price_at_purchase,
    }));

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
    if (itemsError) {
      for (const rollbackId of updatedProductIds) {
        const rollbackQty = originalStock.get(rollbackId) ?? 0;
        await supabase.from("products").update({ stock_qty: rollbackQty }).eq("id", rollbackId);
      }
      throw itemsError;
    }

    return { id: order.id };
  });

export const getAdminProducts = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("products")
    .select("id,name,price,category,stock_qty,is_active,images")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
});

export const toggleProductActive = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string().uuid(), is_active: z.boolean(), accessToken: z.string().optional() }))
  .handler(async ({ data }) => {
    await verifyAdmin(undefined, data.accessToken);
    const supabase = getSupabaseServer();

    const { error } = await supabase
      .from("products")
      .update({ is_active: data.is_active })
      .eq("id", data.id);

    if (error) {
      throw error;
    }

    return { id: data.id, is_active: data.is_active };
  });

export const deleteProduct = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string().uuid(), accessToken: z.string().optional() }))
  .handler(async ({ data }) => {
    await verifyAdmin(undefined, data.accessToken);
    const supabase = getSupabaseServer();

    // Fetch product to get images
    const { data: product, error: fetchError } = await supabase
      .from("products")
      .select("images")
      .eq("id", data.id)
      .single();

    if (fetchError) {
      throw fetchError;
    }

    // Delete images from storage
    if (product?.images && Array.isArray(product.images)) {
      const r2AccountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID;
      const r2BucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME;
      const r2ApiToken = process.env.CLOUDFLARE_R2_API_TOKEN;
      const encodeR2ObjectKey = (key: string) => key.split("/").map(encodeURIComponent).join("/");
      const parseStorageFilePath = (imageUrl: string) => {
        if (imageUrl.startsWith("/api/images/")) {
          return decodeURIComponent(imageUrl.replace("/api/images/", ""));
        }

        if (imageUrl.includes("r2.cloudflarestorage.com") && r2BucketName) {
          try {
            const url = new URL(imageUrl);
            const bucketSegment = `/${r2BucketName}/`;
            const index = url.pathname.indexOf(bucketSegment);
            if (index >= 0) {
              return decodeURIComponent(url.pathname.slice(index + bucketSegment.length));
            }
          } catch {
            return null;
          }
        }

        if (imageUrl.includes("supabase.co")) {
          return imageUrl.split("/object/public/product-images/")[1] ?? null;
        }

        return null;
      };

      let deleteFailed = false;

      for (const imageUrl of product.images) {
        const filePath = parseStorageFilePath(imageUrl);

        if (filePath && r2AccountId && r2BucketName && r2ApiToken) {
          try {
            const encodedObjectKey = encodeR2ObjectKey(filePath);
            const deleteUrl = `https://api.cloudflare.com/client/v4/accounts/${r2AccountId}/r2/buckets/${r2BucketName}/objects/${encodedObjectKey}`;
            const response = await fetch(deleteUrl, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${r2ApiToken}`,
              },
            });

            if (response.ok) {
              console.log("[Delete] Removed Cloudflare R2 image:", filePath);
            } else {
              console.warn("[Delete] Failed to remove Cloudflare R2 image:", filePath, response.statusText);
              deleteFailed = true;
            }
          } catch (error) {
            console.warn("[Delete] Error removing Cloudflare R2 image:", filePath, error);
            deleteFailed = true;
          }
        }

        if (imageUrl.includes("supabase.co")) {
          const supabaseFilePath = imageUrl.split("/object/public/product-images/")[1];
          if (supabaseFilePath) {
            try {
              const { error: removeError } = await supabase.storage.from("product-images").remove([supabaseFilePath]);
              if (removeError) {
                console.warn("[Delete] Failed to remove Supabase image:", supabaseFilePath, removeError.message);
                deleteFailed = true;
              } else {
                console.log("[Delete] Removed Supabase image:", supabaseFilePath);
              }
            } catch (error) {
              console.warn("[Delete] Failed to remove Supabase image:", supabaseFilePath, error);
              deleteFailed = true;
            }
          }
        }
      }

      if (deleteFailed) {
        throw new Error("Failed to remove one or more product images from storage.");
      }
    }

    // Delete product from database
    const { error: deleteError } = await supabase
      .from("products")
      .delete()
      .eq("id", data.id);

    if (deleteError) {
      throw deleteError;
    }

    return { id: data.id };
  });

export const getProductById = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    const supabase = getSupabaseServer();
    const { data: product, error } = await supabase
      .from("products")
      .select("id,name,price,description,images,tag,swatch,category,stock_qty,is_active,created_at")
      .eq("id", data.id)
      .single();

    if (error) {
      throw error;
    }

    return product;
  });

export const createProduct = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      name: z.string().min(1),
      price: z.number().min(0),
      description: z.string().optional(),
      category: z.string().optional(),
      tag: z.string().optional(),
      swatch: z.string().optional(),
      stock_qty: z.number().min(0),
      is_active: z.boolean(),
      images: z.array(z.string()).optional(),
      accessToken: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    await verifyAdmin(undefined, data.accessToken);
    const supabase = getSupabaseServer();

    const { data: created, error } = await supabase
      .from("products")
      .insert({
        name: data.name,
        price: data.price,
        description: data.description ?? null,
        category: data.category ?? null,
        tag: data.tag ?? null,
        swatch: data.swatch ?? null,
        stock_qty: data.stock_qty,
        is_active: data.is_active,
        images: data.images ?? [],
      })
      .select("id")
      .single();

    if (error || !created) {
      throw error ?? new Error("Failed to create product.");
    }

    return created.id;
  });

export const updateProduct = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      id: z.string().uuid(),
      name: z.string().min(1),
      price: z.number().min(0),
      description: z.string().optional(),
      category: z.string().optional(),
      tag: z.string().optional(),
      swatch: z.string().optional(),
      stock_qty: z.number().min(0),
      is_active: z.boolean(),
      images: z.array(z.string()).optional(),
      accessToken: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    await verifyAdmin(undefined, data.accessToken);
    const supabase = getSupabaseServer();

    const { data: updated, error } = await supabase
      .from("products")
      .update({
        name: data.name,
        price: data.price,
        description: data.description ?? null,
        category: data.category ?? null,
        tag: data.tag ?? null,
        swatch: data.swatch ?? null,
        stock_qty: data.stock_qty,
        is_active: data.is_active,
        images: data.images ?? [],
      })
      .eq("id", data.id)
      .select("id")
      .single();

    if (error || !updated) {
      throw error ?? new Error("Failed to update product.");
    }

    return updated;
  });

export const getOrdersList = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getSupabaseServer();
  const { data: orders, error } = await supabase
    .from("orders")
    .select("id,user_id,total_amount,status,created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  const userIds = Array.from(new Set(orders?.map((order) => order.user_id).filter(Boolean)));
  const { data: users, error: usersError } = await supabase
    .from("users")
    .select("id,email")
    .in("id", userIds);

  if (usersError) {
    throw usersError;
  }

  const userMap = new Map(users?.map((user) => [user.id, user.email]));

  return (orders ?? []).map((order) => ({
    id: order.id,
    user_email: userMap.get(order.user_id) ?? "Unknown",
    total_amount: order.total_amount,
    status: order.status,
    created_at: order.created_at,
  }));
});

export const getOrderDetails = createServerFn({ method: "GET" })
  .inputValidator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    const supabase = getSupabaseServer();
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("id,status,total_amount,shipping_address,created_at,user_id")
      .eq("id", data.id)
      .single();

    if (orderError) {
      throw orderError;
    }

    if (!order) {
      throw new Error("Order not found");
    }

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("name,email")
      .eq("id", order.user_id)
      .single();

    if (userError) {
      throw userError;
    }

    const { data: items, error: itemsError } = await supabase
      .from("order_items")
      .select("id,product_id,qty,price_at_purchase")
      .eq("order_id", data.id);

    if (itemsError) {
      throw itemsError;
    }

    const productIds = Array.from(new Set(items?.map((item) => item.product_id).filter(Boolean)));
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("id,name,images")
      .in("id", productIds);

    if (productsError) {
      throw productsError;
    }

    const productMap = new Map(products?.map((product) => [product.id, product]));

    const resultItems = (items ?? []).map((item) => {
      const product = productMap.get(item.product_id);
      return {
        id: item.id,
        product_name: product?.name ?? "Unknown product",
        product_image: product?.images?.[0] ?? null,
        qty: item.qty,
        price_at_purchase: item.price_at_purchase,
      };
    });

    return {
      id: order.id,
      status: order.status,
      total_amount: order.total_amount,
      created_at: order.created_at,
      shipping_address: order.shipping_address ?? null,
      customer: {
        name: user?.name ?? null,
        email: user?.email ?? null,
      },
      items: resultItems,
    };
  });

export const updateOrderStatus = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string().uuid(), status: z.string().min(1) }))
  .handler(async ({ data }) => {
    await verifyAdmin();
    const supabase = getSupabaseServer();

    const { data: updated, error } = await supabase
      .from("orders")
      .update({ status: data.status })
      .eq("id", data.id)
      .select("id,status");

    if (error || !updated) {
      throw error ?? new Error("Failed to update order status.");
    }

    return updated[0];
  });

export type AnalyticsData = {
  allTimeRevenue: number;
  allTimeOrderCount: number;
  avgOrderValue: number;
  revenueThisMonth: number;
  revenueLastMonth: number;
  ordersThisMonth: number;
  ordersLastMonth: number;
  lowStockCount: number;
  newCustomersThisMonth: number;
  newCustomersLastMonth: number;
  revenueSeries: { date: string; revenue: number }[];
  orderCountSeries: { date: string; count: number }[];
  statusSeries: { status: string; count: number }[];
  categoryRevenue: { name: string; revenue: number }[];
  topProducts: { name: string; sales: number; revenue: number }[];
  customerGrowth: { month: string; count: number }[];
};

export const getAnalyticsData = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getSupabaseServer();

  const now = new Date();
  const start30 = new Date(now);
  start30.setDate(start30.getDate() - 29);
  start30.setHours(0, 0, 0, 0);

  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

  // ---- Orders (last 30 days) ----
  const { data: recentOrders, error: ordersError } = await supabase
    .from("orders")
    .select("id,total_amount,status,created_at")
    .gte("created_at", start30.toISOString())
    .order("created_at", { ascending: true });

  if (ordersError) throw ordersError;

  // ---- All-time orders for totals ----
  const { data: allOrders, error: allOrdersError } = await supabase
    .from("orders")
    .select("id,total_amount,status,created_at")
    .order("created_at", { ascending: false });

  if (allOrdersError) throw allOrdersError;

  // ---- Order items for product/category revenue ----
  const { data: items, error: itemsError } = await supabase
    .from("order_items")
    .select("product_id,qty,price_at_purchase");

  if (itemsError) throw itemsError;

  // ---- Products ----
  const { data: products, error: prodError } = await supabase
    .from("products")
    .select("id,name,category,stock_qty,is_active");

  if (prodError) throw prodError;

  // ---- Users (counts for customer growth) ----
  const { data: users, error: usersError } = await supabase
    .from("users")
    .select("id,created_at");

  if (usersError) throw usersError;

  // ---- Build 30-day series ----
  const revenueByDate = new Map<string, number>();
  const orderCountByDate = new Map<string, number>();
  const statusCounts = new Map<string, number>();
  const dailyDate = new Date(start30);

  for (let i = 0; i < 30; i++) {
    const key = dailyDate.toISOString().slice(0, 10);
    revenueByDate.set(key, 0);
    orderCountByDate.set(key, 0);
    dailyDate.setDate(dailyDate.getDate() + 1);
  }

  (recentOrders ?? []).forEach((order) => {
    const day = order.created_at?.slice(0, 10) ?? "";
    revenueByDate.set(day, (revenueByDate.get(day) ?? 0) + order.total_amount);
    orderCountByDate.set(day, (orderCountByDate.get(day) ?? 0) + 1);
    statusCounts.set(order.status, (statusCounts.get(order.status) ?? 0) + 1);
  });

  const revenueSeries = Array.from(revenueByDate.entries()).map(([date, revenue]) => ({ date, revenue }));
  const orderCountSeries = Array.from(orderCountByDate.entries()).map(([date, count]) => ({ date, count }));
  const statusSeries = Array.from(statusCounts.entries()).map(([status, count]) => ({ status, count }));

  // ---- All-time metrics ----
  const deliveredOrders = (allOrders ?? []).filter((o) => o.status === "delivered");
  const allRevenue = deliveredOrders.reduce((sum, o) => sum + o.total_amount, 0);
  const allOrderCount = (allOrders ?? []).filter((o) => o.status !== "cancelled").length;
  const avgOrderValue = allOrderCount > 0 ? allRevenue / allOrderCount : 0;

  // ---- This month vs last month ----
  const thisMonthOrders = (allOrders ?? []).filter(
    (o) => new Date(o.created_at) >= thisMonthStart && o.status !== "cancelled",
  );
  const lastMonthOrders = (allOrders ?? []).filter(
    (o) => new Date(o.created_at) >= lastMonthStart && new Date(o.created_at) <= lastMonthEnd && o.status !== "cancelled",
  );

  const revenueThisMonth = thisMonthOrders
    .filter((o) => o.status === "delivered")
    .reduce((sum, o) => sum + o.total_amount, 0);
  const revenueLastMonth = lastMonthOrders
    .filter((o) => o.status === "delivered")
    .reduce((sum, o) => sum + o.total_amount, 0);
  const ordersThisMonth = thisMonthOrders.length;
  const ordersLastMonth = lastMonthOrders.length;

  // ---- Low stock count ----
  const lowStockCount = (products ?? []).filter(
    (p) => (p.stock_qty ?? 0) < 5 && p.is_active !== false,
  ).length;

  // ---- New customers this month vs last month ----
  const newCustomersThisMonth = (users ?? []).filter(
    (u) => new Date(u.created_at) >= thisMonthStart,
  ).length;
  const newCustomersLastMonth = (users ?? []).filter(
    (u) => new Date(u.created_at) >= lastMonthStart && new Date(u.created_at) <= lastMonthEnd,
  ).length;

  // ---- Customer growth (monthly for 12 months) ----
  const twelveMonthsAgo = new Date(now);
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11);
  twelveMonthsAgo.setDate(1);
  twelveMonthsAgo.setHours(0, 0, 0, 0);

  const customerGrowthMap = new Map<string, number>();
  const monthCursor = new Date(twelveMonthsAgo);
  for (let i = 0; i < 12; i++) {
    const key = `${monthCursor.getFullYear()}-${String(monthCursor.getMonth() + 1).padStart(2, "0")}`;
    customerGrowthMap.set(key, 0);
    monthCursor.setMonth(monthCursor.getMonth() + 1);
  }

  (users ?? []).forEach((u) => {
    const key = u.created_at?.slice(0, 7) ?? "";
    if (customerGrowthMap.has(key)) {
      customerGrowthMap.set(key, (customerGrowthMap.get(key) ?? 0) + 1);
    }
  });

  const customerGrowth = Array.from(customerGrowthMap.entries()).map(([month, count]) => ({ month, count }));

  // ---- Category revenue ----
  const productCategoryMap = new Map<string, string>();
  (products ?? []).forEach((p) => {
    productCategoryMap.set(p.id, p.category ?? "Uncategorized");
  });

  const categoryRevenueMap = new Map<string, number>();
  (items ?? []).forEach((item) => {
    const cat = productCategoryMap.get(item.product_id) ?? "Uncategorized";
    const rev = item.qty * item.price_at_purchase;
    categoryRevenueMap.set(cat, (categoryRevenueMap.get(cat) ?? 0) + rev);
  });

  const categoryRevenue = Array.from(categoryRevenueMap.entries())
    .map(([name, revenue]) => ({ name, revenue }))
    .sort((a, b) => b.revenue - a.revenue);

  // ---- Top products (with sales count) ----
  const productNameMap = new Map<string, string>();
  (products ?? []).forEach((p) => {
    productNameMap.set(p.id, p.name ?? "Unknown");
  });

  const productSalesMap = new Map<string, { sales: number; revenue: number }>();
  (items ?? []).forEach((item) => {
    const existing = productSalesMap.get(item.product_id) ?? { sales: 0, revenue: 0 };
    existing.sales += item.qty;
    existing.revenue += item.qty * item.price_at_purchase;
    productSalesMap.set(item.product_id, existing);
  });

  const topProducts = Array.from(productSalesMap.entries())
    .map(([id, data]) => ({
      name: productNameMap.get(id) ?? "Unknown",
      sales: data.sales,
      revenue: data.revenue,
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  return {
    allTimeRevenue: allRevenue,
    allTimeOrderCount: allOrderCount,
    avgOrderValue,
    revenueThisMonth,
    revenueLastMonth,
    ordersThisMonth,
    ordersLastMonth,
    lowStockCount,
    newCustomersThisMonth,
    newCustomersLastMonth,
    revenueSeries,
    orderCountSeries,
    statusSeries,
    categoryRevenue,
    topProducts,
    customerGrowth,
  } satisfies AnalyticsData;
});

export const uploadProductImage = createServerFn({ method: "POST" })
  .inputValidator(z.object({ fileName: z.string().min(1), base64: z.string().min(1), accessToken: z.string().optional() }))
  .handler(async ({ data }) => {
    await verifyAdmin(undefined, data.accessToken);

    const { Buffer } = await import("node:buffer");
    const mimeType = data.base64.match(/^data:(.*);base64,/)?.[1] ?? "application/octet-stream";
    const base64String = data.base64.replace(/^data:.*;base64,/, "");
    const buffer = Buffer.from(base64String, "base64");
    const filePath = `public/${Date.now()}-${data.fileName}`;

    const encodeR2ObjectKey = (key: string) => key.split("/").map(encodeURIComponent).join("/");

    // Primary: Upload to Cloudflare R2
    const r2AccountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID;
    const r2BucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME;
    const r2ApiToken = process.env.CLOUDFLARE_R2_API_TOKEN;

    if (r2AccountId && r2BucketName && r2ApiToken) {
      try {
        const encodedObjectKey = encodeR2ObjectKey(filePath);
        const uploadUrl = `https://api.cloudflare.com/client/v4/accounts/${r2AccountId}/r2/buckets/${r2BucketName}/objects/${encodedObjectKey}`;
        console.log("[R2] Uploading to Cloudflare R2...");
        
        const response = await fetch(uploadUrl, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${r2ApiToken}`,
            "Content-Type": mimeType,
          },
          body: buffer,
        });

        const json = await response.json().catch(() => null);
        if (response.ok && json && json.success !== false) {
          // Return proxy URL instead of direct R2 URL (bypasses ORB)
          const proxyUrl = `/api/images/${encodeURIComponent(filePath)}`;
          console.log("[R2] Upload successful, using proxy URL:", proxyUrl);
          return { publicUrl: proxyUrl };
        } else {
          console.warn("[R2] Upload failed:", json?.errors?.[0]?.message);
          throw new Error(`R2 upload failed: ${json?.errors?.[0]?.message}`);
        }
      } catch (error) {
        console.error("[R2] Upload error:", error);
        throw error;
      }
    }

    // Fallback to Supabase if R2 not configured
    console.log("[Supabase] R2 not configured, using Supabase Storage");
    const supabase = getSupabaseServer();
    const { error: uploadError } = await supabase.storage.from("product-images").upload(filePath, buffer, {
      contentType: "image/*",
      upsert: false,
    });

    if (uploadError) {
      throw uploadError;
    }

    const { data: publicData } = await supabase.storage.from("product-images").getPublicUrl(filePath);
    if (!publicData) {
      throw new Error("Failed to generate public URL.");
    }

    console.log("[Supabase] Upload successful:", publicData.publicUrl);
    return { publicUrl: publicData.publicUrl };
  });

// ===== Authentication & User Profile Functions =====

export const signUpWithProfile = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      email: z.string().email("Invalid email address"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      username: z.string().min(2, "Username must be at least 2 characters").max(50, "Username is too long"),
      address: z.string().min(5, "Address must be at least 5 characters").max(200, "Address is too long"),
      ip: z.string().optional(),
    })
  )
  .handler(async ({ data }) => {
    const supabase = getSupabaseServer();

    // Rate-limit: allow a small number of signup attempts per IP per hour.
    // Note: `data.ip` is expected to be provided by the client (e.g. via ipify).
    // If no IP is provided, this will count under the 'unknown' bucket.
    try {
      const MAX_PER_HOUR = 5;
      const ip = data.ip ? String(data.ip) : "unknown";
      const hourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

      const { data: recentAttempts } = await supabase
        .from("signup_attempts")
        .select("id")
        .gte("created_at", hourAgo)
        .eq("ip", ip);

      if (recentAttempts && recentAttempts.length >= MAX_PER_HOUR) {
        throw new Error("Too many signup attempts from this IP. Please try again later.");
      }

      // Record this attempt (best-effort; ignore insert failures)
      await supabase.from("signup_attempts").insert({ ip });
    } catch (rateErr) {
      // If the rate-limit check threw, rethrow to the client.
      if (rateErr instanceof Error) throw rateErr;
    }

    // Check if user already exists in profiles
    const { data: existingUser } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", data.email.toLowerCase())
      .single();

    if (existingUser) {
      throw new Error("An account with this email already exists. Please sign in instead.");
    }

    // Check if user already exists in auth (partial signup may have left an auth user behind)
    try {
      const { data: authUsersData, error: authUsersError } = await supabase.auth.admin.listUsers({ perPage: 1000 });
      if (!authUsersError && authUsersData?.users?.some((user) => user.email?.toLowerCase() === data.email.toLowerCase())) {
        throw new Error("An account with this email already exists. Please sign in instead.");
      }
    } catch {
      // Ignore admin lookup failures and continue with signup flow.
    }

    // Check if username is taken
    const { data: existingUsername } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", data.username.toLowerCase())
      .single();

    if (existingUsername) {
      throw new Error("This username is already taken");
    }

    // Create user via Supabase Admin API (service role required for `.admin.createUser`).
    // This bypasses the automatic verification email flow and lets us mark the
    // profile as verified immediately for a smoother UX while keeping a rate-limit.
    let userId: string;
    let message = "Account created. You can sign in now.";

    try {
      const { data: createData, error: createError } = await supabase.auth.admin.createUser({
        email: data.email,
        password: data.password,
      } as any);

      if (createError) {
        throw createError;
      }

      // `createData.user.id` is expected. If SDK shape differs, guard accordingly.
      userId = (createData as any)?.user?.id ?? (createData as any)?.id;
      if (!userId) throw new Error("Failed to create user account");

      // Try to mark auth user as confirmed via admin API to avoid Supabase
      // preventing sign-in due to unconfirmed email. This uses best-effort
      // calls and will not block signup on failure.
      try {
        const adminApi = (supabase.auth as any).admin;
        if (adminApi?.updateUserById) {
          await adminApi.updateUserById(userId, { email_confirm: true });
        } else if (adminApi?.updateUser) {
          await adminApi.updateUser(userId, { email_confirm: true });
        } else if (adminApi?.update) {
          await adminApi.update(userId, { email_confirm: true });
        }
      } catch (confirmErr) {
        // ignore — fallback below handles signIn issues via profile flag
        console.warn("Could not programmatically confirm auth user:", confirmErr);
      }
    } catch (createErr) {
      // If admin.createUser isn't permitted in your environment (no service role),
      // fall back to signUp and continue but note this may still send verification
      // emails depending on Supabase project settings.
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });
      if (authError) throw new Error(authError.message);
      if (!authData.user?.id) throw new Error("Failed to create user account");
      userId = authData.user.id;

      // If we used signUp fallback, try to immediately mark the auth user as confirmed
      // via admin API (best-effort). This helps avoid Supabase blocking sign-in.
      try {
        const adminApi = (supabase.auth as any).admin;
        if (adminApi?.updateUserById) {
          await adminApi.updateUserById(userId, { email_confirm: true });
        } else if (adminApi?.updateUser) {
          await adminApi.updateUser(userId, { email_confirm: true });
        } else if (adminApi?.update) {
          await adminApi.update(userId, { email_confirm: true });
        }
      } catch (confirmErr) {
        console.warn("Could not programmatically confirm auth user (fallback):", confirmErr);
      }
    }

    // Create user profile and mark email as verified immediately
    const { error: profileError } = await supabase.from("profiles").insert({
      id: userId,
      email: data.email.toLowerCase(),
      username: data.username.toLowerCase(),
      address: data.address,
      email_verified: true,
    });

    if (profileError) {
      // Clean up auth user if profile creation fails
      await supabase.auth.admin.deleteUser(userId);
      throw new Error("Failed to create user profile. Please try again.");
    }

    return {
      success: true,
      message,
      userId,
    };
  });

// Persist cart for authenticated user
export const saveCartForUser = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      items: z.array(
        z.object({
          product_id: z.string(),
          name: z.string(),
          price: z.number(),
          qty: z.number(),
          image: z.string().nullable().optional(),
          swatch: z.string().nullable().optional(),
        }),
      ),
    }),
  )
  .handler(async ({ data }) => {
    const supabase = getSupabaseServer();
    const { data: authData } = await supabase.auth.getUser();
    const userId = authData.user?.id ?? null;
    if (!userId) throw new Error("Authentication required to save cart.");

    const { error } = await supabase
      .from("carts")
      .upsert({ user_id: userId, items: data.items, updated_at: new Date().toISOString() }, { onConflict: "user_id" });

    if (error) throw error;
    return { success: true };
  });

export const getCartForUser = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getSupabaseServer();
  const { data: authData } = await supabase.auth.getUser();
  const userId = authData.user?.id ?? null;
  if (!userId) return { items: [] };

  const { data: cartData, error } = await supabase.from("carts").select("items").eq("user_id", userId).single();
  if (error) return { items: [] };
  return { items: (cartData as any)?.items ?? [] };
});

export const getCartItemsForUser = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getSupabaseServer();
  const { data: authData } = await supabase.auth.getUser();
  const userId = authData.user?.id ?? null;
  if (!userId) return { items: [] as CartItemRow[] };

  const { data, error } = await supabase
    .from("cart_items")
    .select("id,product_id,qty,price,name,image,swatch,stock_qty")
    .eq("user_id", userId);

  if (error) return { items: [] };

  return {
    items: (data ?? []).map((item: any) => ({
      item_cart_id: item.id,
      product_id: item.product_id,
      qty: item.qty,
      price: item.price,
      name: item.name,
      image: item.image,
      swatch: item.swatch,
      stock_qty: item.stock_qty,
    })),
  };
});

async function getAuthenticatedUserId(supabase: ReturnType<typeof getSupabaseServer>) {
  const { data: authData } = await supabase.auth.getUser();
  return authData.user?.id ?? null;
}

async function enforceCartAddRateLimit(supabase: ReturnType<typeof getSupabaseServer>, userId: string) {
  const windowStart = new Date(Date.now() - 60_000).toISOString();
  const { count, error } = await supabase
    .from("cart_add_attempts")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("created_at", windowStart);

  if (error) throw error;
  if ((count ?? 0) >= 20) {
    throw new Error("Too many cart requests. Please wait a moment.");
  }

  const { error: insertError } = await supabase.from("cart_add_attempts").insert({ user_id: userId });
  if (insertError) throw insertError;
}

export const addCartItem = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      product_id: z.string(),
      qty: z.number().min(1),
      price: z.number(),
      name: z.string(),
      image: z.string().nullable().optional(),
      swatch: z.string().nullable().optional(),
      stock_qty: z.number().nullable().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const supabase = getSupabaseServer();
    const userId = await getAuthenticatedUserId(supabase);
    if (!userId) throw new Error("Authentication required to add a cart item.");

    await enforceCartAddRateLimit(supabase, userId);

    const nextQty = data.qty;
    const stockQuantity = data.stock_qty ?? Infinity;
    if (stockQuantity !== Infinity && nextQty > stockQuantity) {
      throw new Error(`Only ${stockQuantity} items are available for this product.`);
    }

    const { data: existing, error: existingError } = await supabase
      .from("cart_items")
      .select("id,qty")
      .eq("user_id", userId)
      .eq("product_id", data.product_id)
      .maybeSingle();

    if (existingError) throw existingError;

    const combinedQty = existing ? existing.qty + data.qty : data.qty;
    if (stockQuantity !== Infinity && combinedQty > stockQuantity) {
      throw new Error(`Only ${stockQuantity} items are available for this product.`);
    }

    // Enforce max 25 units per product per user
    const MAX_ITEMS_PER_PRODUCT = 25;
    if (combinedQty > MAX_ITEMS_PER_PRODUCT) {
      throw new Error(
        `You can only add up to ${MAX_ITEMS_PER_PRODUCT} units of ${data.name} in your cart.`,
      );
    }

    const payload = {
      user_id: userId,
      product_id: data.product_id,
      qty: combinedQty,
      price: data.price,
      name: data.name,
      image: data.image ?? null,
      swatch: data.swatch ?? null,
      stock_qty: data.stock_qty ?? null,
      updated_at: new Date().toISOString(),
    };

    const { data: savedItem, error: upsertError } = await supabase
      .from("cart_items")
      .upsert(payload, { onConflict: "user_id,product_id" })
      .select("id,product_id,qty,price,name,image,swatch,stock_qty")
      .single();

    if (upsertError) throw upsertError;

    return {
      item: {
        item_cart_id: savedItem.id,
        product_id: savedItem.product_id,
        qty: savedItem.qty,
        price: savedItem.price,
        name: savedItem.name,
        image: savedItem.image,
        swatch: savedItem.swatch,
        stock_qty: savedItem.stock_qty,
      },
    };
  });

export const mergeCartItems = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      items: z.array(
        z.object({
          product_id: z.string(),
          qty: z.number().min(1),
          price: z.number(),
          name: z.string(),
          image: z.string().nullable().optional(),
          swatch: z.string().nullable().optional(),
          stock_qty: z.number().nullable().optional(),
        }),
      ),
    }),
  )
  .handler(async ({ data }) => {
    const supabase = getSupabaseServer();
    const userId = await getAuthenticatedUserId(supabase);
    if (!userId) throw new Error("Authentication required to merge cart items.");

    const mergedItems = new Map<string, { qty: number; item: typeof data.items[number] }>();
    for (const item of data.items) {
      const existing = mergedItems.get(item.product_id);
      if (existing) {
        existing.qty += item.qty;
      } else {
        mergedItems.set(item.product_id, { qty: item.qty, item });
      }
    }

    const productIds = Array.from(mergedItems.keys());
    const { data: existingItems, error: existingError } = await supabase
      .from("cart_items")
      .select("product_id,qty")
      .eq("user_id", userId)
      .in("product_id", productIds);

    if (existingError) throw existingError;

    const existingQtyMap = new Map<string, number>();
    for (const row of existingItems ?? []) {
      existingQtyMap.set(row.product_id, row.qty);
    }

    const MAX_ITEMS_PER_PRODUCT = 25;

    for (const [, record] of mergedItems) {
      const base = record.item;
      const qty = record.qty + (existingQtyMap.get(base.product_id) ?? 0);
      if (qty > MAX_ITEMS_PER_PRODUCT) {
        throw new Error(
          `You can only add up to ${MAX_ITEMS_PER_PRODUCT} units of ${base.name} in your cart.`,
        );
      }
    }

    const upsertItems = Array.from(mergedItems.entries()).map(([product_id, record]) => {
      const base = record.item;
      const qty = record.qty + (existingQtyMap.get(product_id) ?? 0);
      return {
        user_id: userId,
        product_id,
        qty,
        price: base.price,
        name: base.name,
        image: base.image ?? null,
        swatch: base.swatch ?? null,
        stock_qty: base.stock_qty ?? null,
        updated_at: new Date().toISOString(),
      };
    });

    const { error: upsertError } = await supabase
      .from("cart_items")
      .upsert(upsertItems, { onConflict: "user_id,product_id" });

    if (upsertError) throw upsertError;
    return { success: true };
  });

export const updateCartItemQuantity = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      item_cart_id: z.string().uuid(),
      qty: z.number().min(0),
    }),
  )
  .handler(async ({ data }) => {
    const supabase = getSupabaseServer();
    const userId = await getAuthenticatedUserId(supabase);
    if (!userId) throw new Error("Authentication required to update cart items.");

    if (data.qty === 0) {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", data.item_cart_id)
        .eq("user_id", userId);
      if (error) throw error;
      return { success: true };
    }

    const { error } = await supabase
      .from("cart_items")
      .update({ qty: data.qty, updated_at: new Date().toISOString() })
      .eq("id", data.item_cart_id)
      .eq("user_id", userId);

    if (error) throw error;
    return { success: true };
  });

export const removeCartItem = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      item_cart_id: z.string().uuid(),
    }),
  )
  .handler(async ({ data }) => {
    const supabase = getSupabaseServer();
    const userId = await getAuthenticatedUserId(supabase);
    if (!userId) throw new Error("Authentication required to remove cart items.");

    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", data.item_cart_id)
      .eq("user_id", userId);

    if (error) throw error;
    return { success: true };
  });

export const clearCartItems = createServerFn({ method: "POST" })
  .handler(async () => {
    const supabase = getSupabaseServer();
    const userId = await getAuthenticatedUserId(supabase);
    if (!userId) throw new Error("Authentication required to clear cart items.");

    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", userId);
    if (error) throw error;
    return { success: true };
  });

export const getMyOrders = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getSupabaseServer();
  const { data: authData } = await supabase.auth.getUser();
  const userId = authData.user?.id ?? null;
  if (!userId) return [] as any[];

  const { data: orders, error } = await supabase
    .from("orders")
    .select("id,status,total_amount,created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (orders ?? []).map((o) => ({
    id: o.id,
    status: o.status,
    total_amount: o.total_amount,
    created_at: o.created_at,
  }));
});

export const verifyEmail = createServerFn({ method: "POST" })
  .inputValidator(
    z
      .object({
        token: z.string().min(1).optional(),
        token_hash: z.string().min(1).optional(),
        email: z.string().email("Invalid email address").optional(),
        type: z.string().optional(),
      })
      .refine(
        (value) => (value.token && value.email) || value.token_hash,
        {
          message: "A token and email or a token_hash are required",
          path: ["token"],
        }
      )
  )
  .handler(async ({ data }) => {
    const supabase = getSupabaseServer();

    const verifyPayload: Record<string, string> = {};
    if (data.token_hash) {
      verifyPayload.token_hash = data.token_hash;
    } else {
      verifyPayload.token = data.token!;
      verifyPayload.email = data.email!;
    }
    verifyPayload.type = data.type ?? "signup";

    const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp(verifyPayload as any);

    if (verifyError || !verifyData?.user?.id) {
      throw new Error("Invalid or expired verification link. Please try signing up again.");
    }

    // Update profile to mark email as verified
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ email_verified: true })
      .eq("id", verifyData.user.id);

    if (updateError) {
      throw new Error("Failed to verify email. Please try again.");
    }

    return {
      success: true,
      message: "Email verified successfully! You can now log in.",
      userId: verifyData.user.id,
    };
  });

export const checkEmailVerification = createServerFn({ method: "POST" })
  .inputValidator(z.object({ userId: z.string().uuid() }))
  .handler(async ({ data }) => {
    const supabase = getSupabaseServer();

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("email_verified")
      .eq("id", data.userId)
      .single();

    if (error || !profile) {
      throw new Error("User profile not found");
    }

    return { emailVerified: profile.email_verified ?? false };
  });
