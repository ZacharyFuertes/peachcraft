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

export const getAdminProducts = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("products")
    .select("id,name,price,category,stock_qty,is_active")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
});

export const toggleProductActive = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string().uuid(), is_active: z.boolean(), accessToken: z.string().optional() }))
  .handler(async ({ data, request }) => {
    await verifyAdmin(request, data.accessToken);
    const supabase = getSupabaseServer(request);

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
  .handler(async ({ data, request }) => {
    await verifyAdmin(request, data.accessToken);
    const supabase = getSupabaseServer(request);

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
  .handler(async ({ data, request }) => {
    await verifyAdmin(request, data.accessToken);
    const supabase = getSupabaseServer(request);

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
  .handler(async ({ data, request }) => {
    await verifyAdmin(request, data.accessToken);
    const supabase = getSupabaseServer(request);

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
  .handler(async ({ data, request }) => {
    await verifyAdmin(request);
    const supabase = getSupabaseServer(request);

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

export const getAnalyticsData = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getSupabaseServer();

  const today = new Date();
  const start = new Date(today);
  start.setDate(start.getDate() - 29);
  start.setHours(0, 0, 0, 0);

  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select("id,total_amount,status,created_at")
    .gte("created_at", start.toISOString())
    .order("created_at", { ascending: true });

  if (ordersError) {
    throw ordersError;
  }

  const todayData = orders ?? [];
  const revenueByDate = new Map<string, number>();
  const statusCounts = new Map<string, number>();
  let dailyDate = new Date(start);

  for (let i = 0; i < 30; i += 1) {
    const key = dailyDate.toISOString().slice(0, 10);
    revenueByDate.set(key, 0);
    dailyDate.setDate(dailyDate.getDate() + 1);
  }

  let totalRevenue = 0;
  let trackedOrdersCount = 0;

  (todayData ?? []).forEach((order) => {
    const day = order.created_at?.slice(0, 10) ?? "";
    const prevRevenue = revenueByDate.get(day) ?? 0;
    revenueByDate.set(day, prevRevenue + order.total_amount);
    totalRevenue += order.total_amount;
    trackedOrdersCount += 1;
    statusCounts.set(order.status, (statusCounts.get(order.status) ?? 0) + 1);
  });

  const statusArray = Array.from(statusCounts.entries()).map(([status, count]) => ({ status, count }));
  const revenueSeries = Array.from(revenueByDate.entries()).map(([date, revenue]) => ({ date, revenue }));

  const { data: items, error: itemsError } = await supabase.from("order_items").select("product_id,qty,price_at_purchase");
  if (itemsError) {
    throw itemsError;
  }

  const productIds = Array.from(new Set((items ?? []).map((item) => item.product_id).filter(Boolean)));
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id,name")
    .in("id", productIds);

  if (productsError) {
    throw productsError;
  }

  const revenueByProduct = new Map<string, number>();
  const productMap = new Map<string, string>();
  (products ?? []).forEach((product) => {
    productMap.set(product.id, product.name ?? "Unknown");
  });

  (items ?? []).forEach((item) => {
    const productName = productMap.get(item.product_id) ?? "Unknown";
    revenueByProduct.set(
      productName,
      (revenueByProduct.get(productName) ?? 0) + item.qty * item.price_at_purchase,
    );
  });

  const topProducts = Array.from(revenueByProduct.entries())
    .map(([name, revenue]) => ({ name, revenue }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  const { data: allOrders, error: allOrdersError } = await supabase.from("orders").select("id,total_amount");
  if (allOrdersError) {
    throw allOrdersError;
  }

  const allRevenue = (allOrders ?? []).reduce((sum, order) => sum + order.total_amount, 0);
  const allOrderCount = (allOrders ?? []).length;
  const avgOrderValue = allOrderCount > 0 ? allRevenue / allOrderCount : 0;

  return {
    revenueSeries,
    statusSeries: statusArray,
    topProducts,
    allTimeRevenue: allRevenue,
    allTimeOrderCount: allOrderCount,
    avgOrderValue,
  };
});

export const uploadProductImage = createServerFn({ method: "POST" })
  .inputValidator(z.object({ fileName: z.string().min(1), base64: z.string().min(1), accessToken: z.string().optional() }))
  .handler(async ({ data, request }) => {
    await verifyAdmin(request, data.accessToken);

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
    const supabase = getSupabaseServer(request);
    const { error: uploadError } = await supabase.storage.from("product-images").upload(filePath, buffer, {
      contentType: "image/*",
      upsert: false,
    });

    if (uploadError) {
      throw uploadError;
    }

    const { data: publicData, error: urlError } = await supabase.storage.from("product-images").getPublicUrl(filePath);
    if (urlError || !publicData) {
      throw urlError ?? new Error("Failed to generate public URL.");
    }

    console.log("[Supabase] Upload successful:", publicData.publicUrl);
    return { publicUrl: publicData.publicUrl };
  });
