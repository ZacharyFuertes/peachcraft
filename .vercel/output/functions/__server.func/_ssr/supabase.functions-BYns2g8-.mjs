import { c as createServerRpc } from "./createServerRpc-Csm7uDoH.mjs";
import { c as createServerFn } from "./server-CAyWubo2.mjs";
import { g as getSupabaseServer } from "./supabase-BbYbDVIj.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, l as literalType, n as numberType, s as stringType, a as arrayType, b as booleanType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/supabase__ssr.mjs";
import "../_libs/cookie.mjs";
async function verifyAdmin(request, accessToken) {
  const supabase = getSupabaseServer(request, {
    authOnly: true
  });
  let user = null;
  let error = null;
  if (accessToken) {
    const tokenResult = await supabase.auth.getUser(accessToken);
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
const getFeaturedProducts_createServerFn_handler = createServerRpc({
  id: "2e52d376c560f13f4b61f22e7cd08cf944cdef0b00910a15331f3822d10cd61a",
  name: "getFeaturedProducts",
  filename: "src/lib/api/supabase.functions.ts"
}, (opts) => getFeaturedProducts.__executeServer(opts));
const getFeaturedProducts = createServerFn({
  method: "GET"
}).handler(getFeaturedProducts_createServerFn_handler, async () => {
  const supabase = getSupabaseServer();
  const {
    data,
    error
  } = await supabase.from("products").select("id,name,price,description,images,tag,swatch,category,stock_qty,is_active").eq("is_active", true).order("created_at", {
    ascending: false
  }).limit(4);
  if (error) {
    throw error;
  }
  return data ?? [];
});
const getAllProducts_createServerFn_handler = createServerRpc({
  id: "134239e0b57c1a0828a2ca1b12c707e0765b30e82fd974e9fbdcd6921e300fee",
  name: "getAllProducts",
  filename: "src/lib/api/supabase.functions.ts"
}, (opts) => getAllProducts.__executeServer(opts));
const getAllProducts = createServerFn({
  method: "GET"
}).handler(getAllProducts_createServerFn_handler, async () => {
  const supabase = getSupabaseServer();
  const {
    data,
    error
  } = await supabase.from("products").select("id,name,price,description,images,tag,swatch,category,stock_qty,is_active").eq("is_active", true).order("created_at", {
    ascending: false
  });
  if (error) {
    throw error;
  }
  return data ?? [];
});
const getAdminDashboardData_createServerFn_handler = createServerRpc({
  id: "7e76ff5110a5d02668819d1c037a172495db3e431fc0529ab9c1194ef657affc",
  name: "getAdminDashboardData",
  filename: "src/lib/api/supabase.functions.ts"
}, (opts) => getAdminDashboardData.__executeServer(opts));
const getAdminDashboardData = createServerFn({
  method: "GET"
}).handler(getAdminDashboardData_createServerFn_handler, async () => {
  const supabase = getSupabaseServer();
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [{
    data: todaysOrdersData,
    error: todaysOrdersError
  }, {
    data: todaysRevenueData,
    error: todaysRevenueError
  }] = await Promise.all([supabase.from("orders").select("id", {
    count: "exact"
  }).gte("created_at", today.toISOString()).lt("created_at", tomorrow.toISOString()), supabase.from("orders").select("total_amount").gte("created_at", today.toISOString()).lt("created_at", tomorrow.toISOString())]);
  if (todaysOrdersError) {
    throw todaysOrdersError;
  }
  if (todaysRevenueError) {
    throw todaysRevenueError;
  }
  const todaysOrders = todaysOrdersData?.length ?? 0;
  const todaysRevenue = (todaysRevenueData ?? []).reduce((sum, item) => sum + item.total_amount, 0);
  const {
    data: pendingOrdersData,
    error: pendingOrdersError
  } = await supabase.from("orders").select("id", {
    count: "exact"
  }).eq("status", "pending");
  if (pendingOrdersError) {
    throw pendingOrdersError;
  }
  const pendingOrders = pendingOrdersData?.length ?? 0;
  const {
    data: lowStock,
    error: lowStockError
  } = await supabase.from("products").select("id,name,stock_qty").lt("stock_qty", 5).order("stock_qty", {
    ascending: true
  });
  if (lowStockError) {
    throw lowStockError;
  }
  const {
    data: recentOrders,
    error: recentOrdersError
  } = await supabase.from("orders").select("id,user_id,total_amount,status,created_at").order("created_at", {
    ascending: false
  }).limit(5);
  if (recentOrdersError) {
    throw recentOrdersError;
  }
  const userIds = Array.from(new Set((recentOrders ?? []).map((order) => order.user_id).filter(Boolean)));
  const {
    data: users,
    error: usersError
  } = await supabase.from("users").select("id,email").in("id", userIds);
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
      stock_qty: product.stock_qty
    })),
    recentOrders: (recentOrders ?? []).map((order) => ({
      id: order.id,
      user_email: userMap.get(order.user_id) ?? "Unknown",
      total_amount: order.total_amount,
      status: order.status,
      created_at: order.created_at
    }))
  };
});
const getUserActiveOrderStatus_createServerFn_handler = createServerRpc({
  id: "b11adab6bbee01ffbf09d77542fd6ddb6ca14d4b02f5961a5d5cef7fcb9d1263",
  name: "getUserActiveOrderStatus",
  filename: "src/lib/api/supabase.functions.ts"
}, (opts) => getUserActiveOrderStatus.__executeServer(opts));
const getUserActiveOrderStatus = createServerFn({
  method: "GET"
}).handler(getUserActiveOrderStatus_createServerFn_handler, async () => {
  const supabase = getSupabaseServer();
  const {
    data: authData
  } = await supabase.auth.getUser();
  const userId = authData.user?.id ?? null;
  if (!userId) {
    return {
      hasActiveOrder: false,
      activeOrder: null
    };
  }
  const {
    data: activeOrders,
    error
  } = await supabase.from("orders").select("id, status").eq("user_id", userId).in("status", ["pending", "confirmed", "shipped"]);
  if (error) {
    throw error;
  }
  return {
    hasActiveOrder: activeOrders && activeOrders.length > 0,
    activeOrder: activeOrders?.[0] ?? null
  };
});
const createOrder_createServerFn_handler = createServerRpc({
  id: "724b4a807909a6cb3bf92641c31b4ddf645e7527d63be7206083cc9bfa163f57",
  name: "createOrder",
  filename: "src/lib/api/supabase.functions.ts"
}, (opts) => createOrder.__executeServer(opts));
const createOrder = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  items: arrayType(objectType({
    product_id: stringType().uuid(),
    qty: numberType().min(1),
    price_at_purchase: numberType().min(0)
  })).min(1),
  shipping_address: objectType({
    name: stringType().min(1),
    email: stringType().email(),
    street: stringType().min(1),
    city: stringType().min(1),
    province: stringType().min(1),
    zip: stringType().min(1)
  }),
  total_amount: numberType().min(0),
  payment_method: literalType("cash_on_delivery")
})).handler(createOrder_createServerFn_handler, async ({
  data
}) => {
  const supabase = getSupabaseServer();
  const {
    data: authData
  } = await supabase.auth.getUser();
  const userId = authData.user?.id ?? null;
  if (!userId) {
    throw new Error("Authentication required. Please sign in to place an order.");
  }
  const {
    data: profile,
    error: profileError
  } = await supabase.from("profiles").select("email_verified").eq("id", userId).single();
  if (profileError || !profile || !profile.email_verified) {
    throw new Error("Your email has not been verified yet. Please verify your email before placing an order.");
  }
  const {
    data: activeOrders,
    error: activeOrdersError
  } = await supabase.from("orders").select("id").eq("user_id", userId).in("status", ["pending", "confirmed", "shipped"]);
  if (activeOrdersError) {
    throw activeOrdersError;
  }
  if (activeOrders && activeOrders.length > 0) {
    throw new Error("You already have an active order. You can only place a new order once your current order is completed or cancelled.");
  }
  const productIds = Array.from(new Set(data.items.map((item) => item.product_id)));
  const {
    data: products,
    error: productsError
  } = await supabase.from("products").select("id,name,price,stock_qty,is_active").in("id", productIds);
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
  const originalStock = /* @__PURE__ */ new Map();
  const updatedProductIds = [];
  for (const item of data.items) {
    const product = productMap.get(item.product_id);
    originalStock.set(item.product_id, product.stock_qty ?? 0);
    const {
      data: updated,
      error: updateError
    } = await supabase.from("products").update({
      stock_qty: (product.stock_qty ?? 0) - item.qty
    }).eq("id", item.product_id).gte("stock_qty", item.qty).select("id");
    if (updateError || !updated || updated.length === 0) {
      for (const rollbackId of updatedProductIds) {
        const rollbackQty = originalStock.get(rollbackId) ?? 0;
        await supabase.from("products").update({
          stock_qty: rollbackQty
        }).eq("id", rollbackId);
      }
      throw new Error(`Failed to reserve stock for ${product.name}. Please try again.`);
    }
    updatedProductIds.push(item.product_id);
  }
  const orderPayload = {
    user_id: userId,
    total_amount: data.total_amount,
    status: "pending",
    shipping_address: data.shipping_address
  };
  const {
    data: order,
    error: orderError
  } = await supabase.from("orders").insert(orderPayload).select("id").single();
  if (orderError || !order) {
    for (const rollbackId of updatedProductIds) {
      const rollbackQty = originalStock.get(rollbackId) ?? 0;
      await supabase.from("products").update({
        stock_qty: rollbackQty
      }).eq("id", rollbackId);
    }
    throw orderError ?? new Error("Failed to create order.");
  }
  const orderItems = data.items.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    qty: item.qty,
    price_at_purchase: item.price_at_purchase
  }));
  const {
    error: itemsError
  } = await supabase.from("order_items").insert(orderItems);
  if (itemsError) {
    for (const rollbackId of updatedProductIds) {
      const rollbackQty = originalStock.get(rollbackId) ?? 0;
      await supabase.from("products").update({
        stock_qty: rollbackQty
      }).eq("id", rollbackId);
    }
    throw itemsError;
  }
  return {
    id: order.id
  };
});
const getAdminProducts_createServerFn_handler = createServerRpc({
  id: "5a3ea73e22e890dc236f252494d16759d214434f052b691d398bf6ff371fc934",
  name: "getAdminProducts",
  filename: "src/lib/api/supabase.functions.ts"
}, (opts) => getAdminProducts.__executeServer(opts));
const getAdminProducts = createServerFn({
  method: "GET"
}).handler(getAdminProducts_createServerFn_handler, async () => {
  const supabase = getSupabaseServer();
  const {
    data,
    error
  } = await supabase.from("products").select("id,name,price,category,stock_qty,is_active").order("created_at", {
    ascending: false
  });
  if (error) {
    throw error;
  }
  return data ?? [];
});
const toggleProductActive_createServerFn_handler = createServerRpc({
  id: "c2bfc448f09020514abc1480a33033370d741a5a2ec42cd15bbe751f456a3211",
  name: "toggleProductActive",
  filename: "src/lib/api/supabase.functions.ts"
}, (opts) => toggleProductActive.__executeServer(opts));
const toggleProductActive = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().uuid(),
  is_active: booleanType(),
  accessToken: stringType().optional()
})).handler(toggleProductActive_createServerFn_handler, async ({
  data
}) => {
  await verifyAdmin(void 0, data.accessToken);
  const supabase = getSupabaseServer();
  const {
    error
  } = await supabase.from("products").update({
    is_active: data.is_active
  }).eq("id", data.id);
  if (error) {
    throw error;
  }
  return {
    id: data.id,
    is_active: data.is_active
  };
});
const deleteProduct_createServerFn_handler = createServerRpc({
  id: "d3249ff7c53baf1d5aa77d833043dc591a1089c14640644703529aa10b895a58",
  name: "deleteProduct",
  filename: "src/lib/api/supabase.functions.ts"
}, (opts) => deleteProduct.__executeServer(opts));
const deleteProduct = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().uuid(),
  accessToken: stringType().optional()
})).handler(deleteProduct_createServerFn_handler, async ({
  data
}) => {
  await verifyAdmin(void 0, data.accessToken);
  const supabase = getSupabaseServer();
  const {
    data: product,
    error: fetchError
  } = await supabase.from("products").select("images").eq("id", data.id).single();
  if (fetchError) {
    throw fetchError;
  }
  if (product?.images && Array.isArray(product.images)) {
    const r2AccountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID;
    const r2BucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME;
    const r2ApiToken = process.env.CLOUDFLARE_R2_API_TOKEN;
    const encodeR2ObjectKey = (key) => key.split("/").map(encodeURIComponent).join("/");
    const parseStorageFilePath = (imageUrl) => {
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
          const response = await (deleteUrl, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${r2ApiToken}`
            }
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
            const {
              error: removeError
            } = await supabase.storage.from("product-images").remove([supabaseFilePath]);
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
  const {
    error: deleteError
  } = await supabase.from("products").delete().eq("id", data.id);
  if (deleteError) {
    throw deleteError;
  }
  return {
    id: data.id
  };
});
const getProductById_createServerFn_handler = createServerRpc({
  id: "017f11955e2825eee78e335e200cda245acf509074047ecd2de46db831030dc6",
  name: "getProductById",
  filename: "src/lib/api/supabase.functions.ts"
}, (opts) => getProductById.__executeServer(opts));
const getProductById = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().uuid()
})).handler(getProductById_createServerFn_handler, async ({
  data
}) => {
  const supabase = getSupabaseServer();
  const {
    data: product,
    error
  } = await supabase.from("products").select("id,name,price,description,images,tag,swatch,category,stock_qty,is_active,created_at").eq("id", data.id).single();
  if (error) {
    throw error;
  }
  return product;
});
const createProduct_createServerFn_handler = createServerRpc({
  id: "9a027eb7fe617841ed2e12c0f59efc52bd6fa86ced99b71b0d562e7c0eb3bf33",
  name: "createProduct",
  filename: "src/lib/api/supabase.functions.ts"
}, (opts) => createProduct.__executeServer(opts));
const createProduct = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  name: stringType().min(1),
  price: numberType().min(0),
  description: stringType().optional(),
  category: stringType().optional(),
  tag: stringType().optional(),
  swatch: stringType().optional(),
  stock_qty: numberType().min(0),
  is_active: booleanType(),
  images: arrayType(stringType()).optional(),
  accessToken: stringType().optional()
})).handler(createProduct_createServerFn_handler, async ({
  data
}) => {
  await verifyAdmin(void 0, data.accessToken);
  const supabase = getSupabaseServer();
  const {
    data: created,
    error
  } = await supabase.from("products").insert({
    name: data.name,
    price: data.price,
    description: data.description ?? null,
    category: data.category ?? null,
    tag: data.tag ?? null,
    swatch: data.swatch ?? null,
    stock_qty: data.stock_qty,
    is_active: data.is_active,
    images: data.images ?? []
  }).select("id").single();
  if (error || !created) {
    throw error ?? new Error("Failed to create product.");
  }
  return created.id;
});
const updateProduct_createServerFn_handler = createServerRpc({
  id: "21a18b21d98c300eac8679b420612d35df84a11ab4e477bcace47f48a53c37f3",
  name: "updateProduct",
  filename: "src/lib/api/supabase.functions.ts"
}, (opts) => updateProduct.__executeServer(opts));
const updateProduct = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().uuid(),
  name: stringType().min(1),
  price: numberType().min(0),
  description: stringType().optional(),
  category: stringType().optional(),
  tag: stringType().optional(),
  swatch: stringType().optional(),
  stock_qty: numberType().min(0),
  is_active: booleanType(),
  images: arrayType(stringType()).optional(),
  accessToken: stringType().optional()
})).handler(updateProduct_createServerFn_handler, async ({
  data
}) => {
  await verifyAdmin(void 0, data.accessToken);
  const supabase = getSupabaseServer();
  const {
    data: updated,
    error
  } = await supabase.from("products").update({
    name: data.name,
    price: data.price,
    description: data.description ?? null,
    category: data.category ?? null,
    tag: data.tag ?? null,
    swatch: data.swatch ?? null,
    stock_qty: data.stock_qty,
    is_active: data.is_active,
    images: data.images ?? []
  }).eq("id", data.id).select("id").single();
  if (error || !updated) {
    throw error ?? new Error("Failed to update product.");
  }
  return updated;
});
const getOrdersList_createServerFn_handler = createServerRpc({
  id: "3cdebb12d1443d2c3ae4db1b9e7ebcb404efad457c7ca9fc5851130d258158ee",
  name: "getOrdersList",
  filename: "src/lib/api/supabase.functions.ts"
}, (opts) => getOrdersList.__executeServer(opts));
const getOrdersList = createServerFn({
  method: "GET"
}).handler(getOrdersList_createServerFn_handler, async () => {
  const supabase = getSupabaseServer();
  const {
    data: orders,
    error
  } = await supabase.from("orders").select("id,user_id,total_amount,status,created_at").order("created_at", {
    ascending: false
  });
  if (error) {
    throw error;
  }
  const userIds = Array.from(new Set(orders?.map((order) => order.user_id).filter(Boolean)));
  const {
    data: users,
    error: usersError
  } = await supabase.from("users").select("id,email").in("id", userIds);
  if (usersError) {
    throw usersError;
  }
  const userMap = new Map(users?.map((user) => [user.id, user.email]));
  return (orders ?? []).map((order) => ({
    id: order.id,
    user_email: userMap.get(order.user_id) ?? "Unknown",
    total_amount: order.total_amount,
    status: order.status,
    created_at: order.created_at
  }));
});
const getOrderDetails_createServerFn_handler = createServerRpc({
  id: "4da3201e5791e31c4e6845e165471eb6c3e365aef4d8e13c598cdea140c6c944",
  name: "getOrderDetails",
  filename: "src/lib/api/supabase.functions.ts"
}, (opts) => getOrderDetails.__executeServer(opts));
const getOrderDetails = createServerFn({
  method: "GET"
}).inputValidator(objectType({
  id: stringType().uuid()
})).handler(getOrderDetails_createServerFn_handler, async ({
  data
}) => {
  const supabase = getSupabaseServer();
  const {
    data: order,
    error: orderError
  } = await supabase.from("orders").select("id,status,total_amount,shipping_address,created_at,user_id").eq("id", data.id).single();
  if (orderError) {
    throw orderError;
  }
  if (!order) {
    throw new Error("Order not found");
  }
  const {
    data: user,
    error: userError
  } = await supabase.from("users").select("name,email").eq("id", order.user_id).single();
  if (userError) {
    throw userError;
  }
  const {
    data: items,
    error: itemsError
  } = await supabase.from("order_items").select("id,product_id,qty,price_at_purchase").eq("order_id", data.id);
  if (itemsError) {
    throw itemsError;
  }
  const productIds = Array.from(new Set(items?.map((item) => item.product_id).filter(Boolean)));
  const {
    data: products,
    error: productsError
  } = await supabase.from("products").select("id,name,images").in("id", productIds);
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
      price_at_purchase: item.price_at_purchase
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
      email: user?.email ?? null
    },
    items: resultItems
  };
});
const updateOrderStatus_createServerFn_handler = createServerRpc({
  id: "6c3526fdbf4f16975cc94b6c49ced8acc7a2debaeeca6c8d4523fa938ec4ba7e",
  name: "updateOrderStatus",
  filename: "src/lib/api/supabase.functions.ts"
}, (opts) => updateOrderStatus.__executeServer(opts));
const updateOrderStatus = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().uuid(),
  status: stringType().min(1)
})).handler(updateOrderStatus_createServerFn_handler, async ({
  data
}) => {
  await verifyAdmin();
  const supabase = getSupabaseServer();
  const {
    data: updated,
    error
  } = await supabase.from("orders").update({
    status: data.status
  }).eq("id", data.id).select("id,status");
  if (error || !updated) {
    throw error ?? new Error("Failed to update order status.");
  }
  return updated[0];
});
const getAnalyticsData_createServerFn_handler = createServerRpc({
  id: "c450a30d31a564973c85e65058f78677a15e5238e844cd31e6770b5f4af09e99",
  name: "getAnalyticsData",
  filename: "src/lib/api/supabase.functions.ts"
}, (opts) => getAnalyticsData.__executeServer(opts));
const getAnalyticsData = createServerFn({
  method: "GET"
}).handler(getAnalyticsData_createServerFn_handler, async () => {
  const supabase = getSupabaseServer();
  const today = /* @__PURE__ */ new Date();
  const start = new Date(today);
  start.setDate(start.getDate() - 29);
  start.setHours(0, 0, 0, 0);
  const {
    data: orders,
    error: ordersError
  } = await supabase.from("orders").select("id,total_amount,status,created_at").gte("created_at", start.toISOString()).order("created_at", {
    ascending: true
  });
  if (ordersError) {
    throw ordersError;
  }
  const todayData = orders ?? [];
  const revenueByDate = /* @__PURE__ */ new Map();
  const statusCounts = /* @__PURE__ */ new Map();
  let dailyDate = new Date(start);
  for (let i = 0; i < 30; i += 1) {
    const key = dailyDate.toISOString().slice(0, 10);
    revenueByDate.set(key, 0);
    dailyDate.setDate(dailyDate.getDate() + 1);
  }
  let totalRevenue = 0;
  (todayData ?? []).forEach((order) => {
    const day = order.created_at?.slice(0, 10) ?? "";
    const prevRevenue = revenueByDate.get(day) ?? 0;
    revenueByDate.set(day, prevRevenue + order.total_amount);
    totalRevenue += order.total_amount;
    statusCounts.set(order.status, (statusCounts.get(order.status) ?? 0) + 1);
  });
  const statusArray = Array.from(statusCounts.entries()).map(([status, count]) => ({
    status,
    count
  }));
  const revenueSeries = Array.from(revenueByDate.entries()).map(([date, revenue]) => ({
    date,
    revenue
  }));
  const {
    data: items,
    error: itemsError
  } = await supabase.from("order_items").select("product_id,qty,price_at_purchase");
  if (itemsError) {
    throw itemsError;
  }
  const productIds = Array.from(new Set((items ?? []).map((item) => item.product_id).filter(Boolean)));
  const {
    data: products,
    error: productsError
  } = await supabase.from("products").select("id,name").in("id", productIds);
  if (productsError) {
    throw productsError;
  }
  const revenueByProduct = /* @__PURE__ */ new Map();
  const productMap = /* @__PURE__ */ new Map();
  (products ?? []).forEach((product) => {
    productMap.set(product.id, product.name ?? "Unknown");
  });
  (items ?? []).forEach((item) => {
    const productName = productMap.get(item.product_id) ?? "Unknown";
    revenueByProduct.set(productName, (revenueByProduct.get(productName) ?? 0) + item.qty * item.price_at_purchase);
  });
  const topProducts = Array.from(revenueByProduct.entries()).map(([name, revenue]) => ({
    name,
    revenue
  })).sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  const {
    data: allOrders,
    error: allOrdersError
  } = await supabase.from("orders").select("id,total_amount");
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
    avgOrderValue
  };
});
const uploadProductImage_createServerFn_handler = createServerRpc({
  id: "836924c59abf2bce45bbb63fb90bd96e3b2a39526f9ce59b9886c6fd17be7421",
  name: "uploadProductImage",
  filename: "src/lib/api/supabase.functions.ts"
}, (opts) => uploadProductImage.__executeServer(opts));
const uploadProductImage = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  fileName: stringType().min(1),
  base64: stringType().min(1),
  accessToken: stringType().optional()
})).handler(uploadProductImage_createServerFn_handler, async ({
  data
}) => {
  await verifyAdmin(void 0, data.accessToken);
  const {
    Buffer
  } = await import("node:buffer");
  const mimeType = data.base64.match(/^data:(.*);base64,/)?.[1] ?? "application/octet-stream";
  const base64String = data.base64.replace(/^data:.*;base64,/, "");
  const buffer = Buffer.from(base64String, "base64");
  const filePath = `public/${Date.now()}-${data.fileName}`;
  const encodeR2ObjectKey = (key) => key.split("/").map(encodeURIComponent).join("/");
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
          "Content-Type": mimeType
        },
        body: buffer
      });
      const json = await response.json().catch(() => null);
      if (response.ok && json && json.success !== false) {
        const proxyUrl = `/api/images/${encodeURIComponent(filePath)}`;
        console.log("[R2] Upload successful, using proxy URL:", proxyUrl);
        return {
          publicUrl: proxyUrl
        };
      } else {
        console.warn("[R2] Upload failed:", json?.errors?.[0]?.message);
        throw new Error(`R2 upload failed: ${json?.errors?.[0]?.message}`);
      }
    } catch (error) {
      console.error("[R2] Upload error:", error);
      throw error;
    }
  }
  console.log("[Supabase] R2 not configured, using Supabase Storage");
  const supabase = getSupabaseServer();
  const {
    error: uploadError
  } = await supabase.storage.from("product-images").upload(filePath, buffer, {
    contentType: "image/*",
    upsert: false
  });
  if (uploadError) {
    throw uploadError;
  }
  const {
    data: publicData
  } = await supabase.storage.from("product-images").getPublicUrl(filePath);
  if (!publicData) {
    throw new Error("Failed to generate public URL.");
  }
  console.log("[Supabase] Upload successful:", publicData.publicUrl);
  return {
    publicUrl: publicData.publicUrl
  };
});
const signUpWithProfile_createServerFn_handler = createServerRpc({
  id: "50dc331cd0a5f6cb1e5012163c717012557d8aeb981e34426223f7a36bc7efff",
  name: "signUpWithProfile",
  filename: "src/lib/api/supabase.functions.ts"
}, (opts) => signUpWithProfile.__executeServer(opts));
const signUpWithProfile = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  email: stringType().email("Invalid email address"),
  password: stringType().min(8, "Password must be at least 8 characters"),
  username: stringType().min(2, "Username must be at least 2 characters").max(50, "Username is too long"),
  address: stringType().min(5, "Address must be at least 5 characters").max(200, "Address is too long")
})).handler(signUpWithProfile_createServerFn_handler, async ({
  data
}) => {
  const supabase = getSupabaseServer();
  try {
    const MAX_PER_HOUR = 5;
    const ip = data.ip ? String(data.ip) : "unknown";
    const hourAgo = new Date(Date.now() - 60 * 60 * 1e3).toISOString();
    const {
      data: recentAttempts
    } = await supabase.from("signup_attempts").select("id").gte("created_at", hourAgo).eq("ip", ip);
    if (recentAttempts && recentAttempts.length >= MAX_PER_HOUR) {
      throw new Error("Too many signup attempts from this IP. Please try again later.");
    }
    await supabase.from("signup_attempts").insert({
      ip
    });
  } catch (rateErr) {
    if (rateErr instanceof Error) throw rateErr;
  }
  const {
    data: existingUser
  } = await supabase.from("profiles").select("id").eq("email", data.email.toLowerCase()).single();
  if (existingUser) {
    throw new Error("An account with this email already exists. Please sign in instead.");
  }
  try {
    const {
      data: authUsersData,
      error: authUsersError
    } = await supabase.auth.admin.listUsers({
      perPage: 1e3
    });
    if (!authUsersError && authUsersData?.users?.some((user) => user.email?.toLowerCase() === data.email.toLowerCase())) {
      throw new Error("An account with this email already exists. Please sign in instead.");
    }
  } catch {
  }
  const {
    data: existingUsername
  } = await supabase.from("profiles").select("id").eq("username", data.username.toLowerCase()).single();
  if (existingUsername) {
    throw new Error("This username is already taken");
  }
  let userId;
  let message = "Account created. You can sign in now.";
  try {
    const {
      data: createData,
      error: createError
    } = await supabase.auth.admin.createUser({
      email: data.email,
      password: data.password
    });
    if (createError) {
      throw createError;
    }
    userId = createData?.user?.id ?? createData?.id;
    if (!userId) throw new Error("Failed to create user account");
    try {
      const adminApi = supabase.auth.admin;
      if (adminApi?.updateUserById) {
        await adminApi.updateUserById(userId, {
          email_confirm: true
        });
      } else if (adminApi?.updateUser) {
        await adminApi.updateUser(userId, {
          email_confirm: true
        });
      } else if (adminApi?.update) {
        await adminApi.update(userId, {
          email_confirm: true
        });
      }
    } catch (confirmErr) {
      console.warn("Could not programmatically confirm auth user:", confirmErr);
    }
  } catch (createErr) {
    const {
      data: authData,
      error: authError
    } = await supabase.auth.signUp({
      email: data.email,
      password: data.password
    });
    if (authError) throw new Error(authError.message);
    if (!authData.user?.id) throw new Error("Failed to create user account");
    userId = authData.user.id;
    try {
      const adminApi = supabase.auth.admin;
      if (adminApi?.updateUserById) {
        await adminApi.updateUserById(userId, {
          email_confirm: true
        });
      } else if (adminApi?.updateUser) {
        await adminApi.updateUser(userId, {
          email_confirm: true
        });
      } else if (adminApi?.update) {
        await adminApi.update(userId, {
          email_confirm: true
        });
      }
    } catch (confirmErr) {
      console.warn("Could not programmatically confirm auth user (fallback):", confirmErr);
    }
  }
  const {
    error: profileError
  } = await supabase.from("profiles").insert({
    id: userId,
    email: data.email.toLowerCase(),
    username: data.username.toLowerCase(),
    address: data.address,
    email_verified: true
  });
  if (profileError) {
    await supabase.auth.admin.deleteUser(userId);
    throw new Error("Failed to create user profile. Please try again.");
  }
  return {
    success: true,
    message,
    userId
  };
});
const saveCartForUser_createServerFn_handler = createServerRpc({
  id: "ca0384b788bbc6e7f55d89600f226bb491b2c710240621167497ef736537cb7b",
  name: "saveCartForUser",
  filename: "src/lib/api/supabase.functions.ts"
}, (opts) => saveCartForUser.__executeServer(opts));
const saveCartForUser = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  items: arrayType(objectType({
    product_id: stringType(),
    name: stringType(),
    price: numberType(),
    qty: numberType(),
    image: stringType().nullable().optional(),
    swatch: stringType().nullable().optional(),
    stock_qty: numberType().nullable().optional()
  })),
  accessToken: stringType().optional()
})).handler(saveCartForUser_createServerFn_handler, async ({
  data
}) => {
  const supabase = getSupabaseServer(void 0, {
    authOnly: true
  });
  let userId = null;
  if (data.accessToken) {
    const tokenResult = await supabase.auth.getUser(data.accessToken);
    userId = tokenResult.data?.user?.id ?? null;
  }
  if (!userId) {
    const {
      data: authData
    } = await supabase.auth.getUser();
    userId = authData.user?.id ?? null;
  }
  if (!userId) throw new Error("Authentication required to save cart.");
  const {
    error
  } = await supabase.from("carts").upsert({
    user_id: userId,
    items: data.items,
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  }, {
    onConflict: "user_id"
  });
  if (error) throw error;
  return {
    success: true
  };
});
const getCartForUser_createServerFn_handler = createServerRpc({
  id: "2f977311003aaad1bedfed02a9a50a1a411aca285b5b2ba2291f02325dc05b7b",
  name: "getCartForUser",
  filename: "src/lib/api/supabase.functions.ts"
}, (opts) => getCartForUser.__executeServer(opts));
const getCartForUser = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  accessToken: stringType().optional()
})).handler(getCartForUser_createServerFn_handler, async ({
  data
}) => {
  const supabase = getSupabaseServer(void 0, {
    authOnly: true
  });
  let userId = null;
  if (data.accessToken) {
    const tokenResult = await supabase.auth.getUser(data.accessToken);
    userId = tokenResult.data?.user?.id ?? null;
  }
  if (!userId) {
    const {
      data: authData
    } = await supabase.auth.getUser();
    userId = authData.user?.id ?? null;
  }
  if (!userId) return {
    items: []
  };
  const {
    data: cartData,
    error
  } = await supabase.from("carts").select("items").eq("user_id", userId).single();
  if (error) return {
    items: []
  };
  return {
    items: cartData?.items ?? []
  };
});
const getMyOrders_createServerFn_handler = createServerRpc({
  id: "a799c956eef1866ba8ef6cd4fb4954e8c3cbce8c7fd51a850e82dd1566a9f011",
  name: "getMyOrders",
  filename: "src/lib/api/supabase.functions.ts"
}, (opts) => getMyOrders.__executeServer(opts));
const getMyOrders = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  accessToken: stringType().optional()
})).handler(getMyOrders_createServerFn_handler, async ({
  data
}) => {
  const supabase = getSupabaseServer(void 0, {
    authOnly: true
  });
  let userId = null;
  if (data.accessToken) {
    const tokenResult = await supabase.auth.getUser(data.accessToken);
    userId = tokenResult.data?.user?.id ?? null;
  }
  if (!userId) {
    const {
      data: authData
    } = await supabase.auth.getUser();
    userId = authData.user?.id ?? null;
  }
  if (!userId) return [];
  const {
    data: orders,
    error
  } = await supabase.from("orders").select("id,status,total_amount,created_at").eq("user_id", userId).order("created_at", {
    ascending: false
  });
  if (error) throw error;
  return (orders ?? []).map((o) => ({
    id: o.id,
    status: o.status,
    total_amount: o.total_amount,
    created_at: o.created_at
  }));
});
const verifyEmail_createServerFn_handler = createServerRpc({
  id: "91ca8d8ff077a706d74f7f830e2c09f280b97623aa37e44fa17a05d56e4f8d7b",
  name: "verifyEmail",
  filename: "src/lib/api/supabase.functions.ts"
}, (opts) => verifyEmail.__executeServer(opts));
const verifyEmail = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  token: stringType().min(1).optional(),
  token_hash: stringType().min(1).optional(),
  email: stringType().email("Invalid email address").optional(),
  type: stringType().optional()
}).refine((value) => value.token && value.email || value.token_hash, {
  message: "A token and email or a token_hash are required",
  path: ["token"]
})).handler(verifyEmail_createServerFn_handler, async ({
  data
}) => {
  const supabase = getSupabaseServer();
  const verifyPayload = {};
  if (data.token_hash) {
    verifyPayload.token_hash = data.token_hash;
  } else {
    verifyPayload.token = data.token;
    verifyPayload.email = data.email;
  }
  verifyPayload.type = data.type ?? "signup";
  const {
    data: verifyData,
    error: verifyError
  } = await supabase.auth.verifyOtp(verifyPayload);
  if (verifyError || !verifyData?.user?.id) {
    throw new Error("Invalid or expired verification link. Please try signing up again.");
  }
  const {
    error: updateError
  } = await supabase.from("profiles").update({
    email_verified: true
  }).eq("id", verifyData.user.id);
  if (updateError) {
    throw new Error("Failed to verify email. Please try again.");
  }
  return {
    success: true,
    message: "Email verified successfully! You can now log in.",
    userId: verifyData.user.id
  };
});
const checkEmailVerification_createServerFn_handler = createServerRpc({
  id: "3960bcf3f9a6a8d577539bac29a414e1e2d282f328e75b24a2c489df6eb9eada",
  name: "checkEmailVerification",
  filename: "src/lib/api/supabase.functions.ts"
}, (opts) => checkEmailVerification.__executeServer(opts));
const checkEmailVerification = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  userId: stringType().uuid()
})).handler(checkEmailVerification_createServerFn_handler, async ({
  data
}) => {
  const supabase = getSupabaseServer();
  const {
    data: profile,
    error
  } = await supabase.from("profiles").select("email_verified").eq("id", data.userId).single();
  if (error || !profile) {
    throw new Error("User profile not found");
  }
  return {
    emailVerified: profile.email_verified ?? false
  };
});
export {
  checkEmailVerification_createServerFn_handler,
  createOrder_createServerFn_handler,
  createProduct_createServerFn_handler,
  deleteProduct_createServerFn_handler,
  getAdminDashboardData_createServerFn_handler,
  getAdminProducts_createServerFn_handler,
  getAllProducts_createServerFn_handler,
  getAnalyticsData_createServerFn_handler,
  getCartForUser_createServerFn_handler,
  getFeaturedProducts_createServerFn_handler,
  getMyOrders_createServerFn_handler,
  getOrderDetails_createServerFn_handler,
  getOrdersList_createServerFn_handler,
  getProductById_createServerFn_handler,
  getUserActiveOrderStatus_createServerFn_handler,
  saveCartForUser_createServerFn_handler,
  signUpWithProfile_createServerFn_handler,
  toggleProductActive_createServerFn_handler,
  updateOrderStatus_createServerFn_handler,
  updateProduct_createServerFn_handler,
  uploadProductImage_createServerFn_handler,
  verifyEmail_createServerFn_handler
};
