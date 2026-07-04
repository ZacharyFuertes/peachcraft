import { c as createServerRpc } from "./createServerRpc-C-96jpkR.mjs";
import { c as createServerFn } from "./server-BO7pyA8t.mjs";
import { g as getSupabaseServer } from "./supabase-BbYbDVIj.mjs";
import { v as verifyAdmin } from "./admin-auth-DUzTaow6.mjs";
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
  await verifyAdmin();
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
  await verifyAdmin();
  const supabase = getSupabaseServer();
  const {
    data,
    error
  } = await supabase.from("products").select("id,name,price,category,stock_qty,is_active,images").order("created_at", {
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
          const response = await fetch(deleteUrl, {
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
  await verifyAdmin();
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
  await verifyAdmin();
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
  await verifyAdmin();
  const supabase = getSupabaseServer();
  const now = /* @__PURE__ */ new Date();
  const start30 = new Date(now);
  start30.setDate(start30.getDate() - 29);
  start30.setHours(0, 0, 0, 0);
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
  const {
    data: recentOrders,
    error: ordersError
  } = await supabase.from("orders").select("id,total_amount,status,created_at").gte("created_at", start30.toISOString()).order("created_at", {
    ascending: true
  });
  if (ordersError) throw ordersError;
  const {
    data: allOrders,
    error: allOrdersError
  } = await supabase.from("orders").select("id,total_amount,status,created_at").order("created_at", {
    ascending: false
  });
  if (allOrdersError) throw allOrdersError;
  const {
    data: items,
    error: itemsError
  } = await supabase.from("order_items").select("product_id,qty,price_at_purchase");
  if (itemsError) throw itemsError;
  const {
    data: products,
    error: prodError
  } = await supabase.from("products").select("id,name,category,stock_qty,is_active");
  if (prodError) throw prodError;
  const {
    data: users,
    error: usersError
  } = await supabase.from("users").select("id,created_at");
  if (usersError) throw usersError;
  const revenueByDate = /* @__PURE__ */ new Map();
  const orderCountByDate = /* @__PURE__ */ new Map();
  const statusCounts = /* @__PURE__ */ new Map();
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
  const revenueSeries = Array.from(revenueByDate.entries()).map(([date, revenue]) => ({
    date,
    revenue
  }));
  const orderCountSeries = Array.from(orderCountByDate.entries()).map(([date, count]) => ({
    date,
    count
  }));
  const statusSeries = Array.from(statusCounts.entries()).map(([status, count]) => ({
    status,
    count
  }));
  const deliveredOrders = (allOrders ?? []).filter((o) => o.status === "delivered");
  const allRevenue = deliveredOrders.reduce((sum, o) => sum + o.total_amount, 0);
  const allOrderCount = (allOrders ?? []).filter((o) => o.status !== "cancelled").length;
  const avgOrderValue = allOrderCount > 0 ? allRevenue / allOrderCount : 0;
  const thisMonthOrders = (allOrders ?? []).filter((o) => new Date(o.created_at) >= thisMonthStart && o.status !== "cancelled");
  const lastMonthOrders = (allOrders ?? []).filter((o) => new Date(o.created_at) >= lastMonthStart && new Date(o.created_at) <= lastMonthEnd && o.status !== "cancelled");
  const revenueThisMonth = thisMonthOrders.filter((o) => o.status === "delivered").reduce((sum, o) => sum + o.total_amount, 0);
  const revenueLastMonth = lastMonthOrders.filter((o) => o.status === "delivered").reduce((sum, o) => sum + o.total_amount, 0);
  const ordersThisMonth = thisMonthOrders.length;
  const ordersLastMonth = lastMonthOrders.length;
  const lowStockCount = (products ?? []).filter((p) => (p.stock_qty ?? 0) < 5 && p.is_active !== false).length;
  const newCustomersThisMonth = (users ?? []).filter((u) => new Date(u.created_at) >= thisMonthStart).length;
  const newCustomersLastMonth = (users ?? []).filter((u) => new Date(u.created_at) >= lastMonthStart && new Date(u.created_at) <= lastMonthEnd).length;
  const twelveMonthsAgo = new Date(now);
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11);
  twelveMonthsAgo.setDate(1);
  twelveMonthsAgo.setHours(0, 0, 0, 0);
  const customerGrowthMap = /* @__PURE__ */ new Map();
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
  const customerGrowth = Array.from(customerGrowthMap.entries()).map(([month, count]) => ({
    month,
    count
  }));
  const productCategoryMap = /* @__PURE__ */ new Map();
  (products ?? []).forEach((p) => {
    productCategoryMap.set(p.id, p.category ?? "Uncategorized");
  });
  const categoryRevenueMap = /* @__PURE__ */ new Map();
  (items ?? []).forEach((item) => {
    const cat = productCategoryMap.get(item.product_id) ?? "Uncategorized";
    const rev = item.qty * item.price_at_purchase;
    categoryRevenueMap.set(cat, (categoryRevenueMap.get(cat) ?? 0) + rev);
  });
  const categoryRevenue = Array.from(categoryRevenueMap.entries()).map(([name, revenue]) => ({
    name,
    revenue
  })).sort((a, b) => b.revenue - a.revenue);
  const productNameMap = /* @__PURE__ */ new Map();
  (products ?? []).forEach((p) => {
    productNameMap.set(p.id, p.name ?? "Unknown");
  });
  const productSalesMap = /* @__PURE__ */ new Map();
  (items ?? []).forEach((item) => {
    const existing = productSalesMap.get(item.product_id) ?? {
      sales: 0,
      revenue: 0
    };
    existing.sales += item.qty;
    existing.revenue += item.qty * item.price_at_purchase;
    productSalesMap.set(item.product_id, existing);
  });
  const topProducts = Array.from(productSalesMap.entries()).map(([id, data]) => ({
    name: productNameMap.get(id) ?? "Unknown",
    sales: data.sales,
    revenue: data.revenue
  })).sort((a, b) => b.revenue - a.revenue).slice(0, 5);
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
    customerGrowth
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
  address: stringType().min(5, "Address must be at least 5 characters").max(200, "Address is too long"),
  ip: stringType().optional()
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
    swatch: stringType().nullable().optional()
  }))
})).handler(saveCartForUser_createServerFn_handler, async ({
  data
}) => {
  const supabase = getSupabaseServer();
  const {
    data: authData
  } = await supabase.auth.getUser();
  const userId = authData.user?.id ?? null;
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
  method: "GET"
}).handler(getCartForUser_createServerFn_handler, async () => {
  const supabase = getSupabaseServer();
  const {
    data: authData
  } = await supabase.auth.getUser();
  const userId = authData.user?.id ?? null;
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
const getCartItemsForUser_createServerFn_handler = createServerRpc({
  id: "060fd1260430d1bedebd75221fd0964bbc2416b8a47b0a8bca880fe07a23cbb4",
  name: "getCartItemsForUser",
  filename: "src/lib/api/supabase.functions.ts"
}, (opts) => getCartItemsForUser.__executeServer(opts));
const getCartItemsForUser = createServerFn({
  method: "GET"
}).handler(getCartItemsForUser_createServerFn_handler, async () => {
  const supabase = getSupabaseServer();
  const {
    data: authData
  } = await supabase.auth.getUser();
  const userId = authData.user?.id ?? null;
  if (!userId) return {
    items: []
  };
  const {
    data,
    error
  } = await supabase.from("cart_items").select("id,product_id,qty,price,name,image,swatch,stock_qty").eq("user_id", userId);
  if (error) return {
    items: []
  };
  return {
    items: (data ?? []).map((item) => ({
      item_cart_id: item.id,
      product_id: item.product_id,
      qty: item.qty,
      price: item.price,
      name: item.name,
      image: item.image,
      swatch: item.swatch,
      stock_qty: item.stock_qty
    }))
  };
});
async function getAuthenticatedUserId(supabase) {
  const {
    data: authData
  } = await supabase.auth.getUser();
  return authData.user?.id ?? null;
}
async function enforceCartAddRateLimit(supabase, userId) {
  const windowStart = new Date(Date.now() - 6e4).toISOString();
  const {
    count,
    error
  } = await supabase.from("cart_add_attempts").select("id", {
    count: "exact",
    head: true
  }).eq("user_id", userId).gte("created_at", windowStart);
  if (error) throw error;
  if ((count ?? 0) >= 20) {
    throw new Error("Too many cart requests. Please wait a moment.");
  }
  const {
    error: insertError
  } = await supabase.from("cart_add_attempts").insert({
    user_id: userId
  });
  if (insertError) throw insertError;
}
const addCartItem_createServerFn_handler = createServerRpc({
  id: "3406ed42c59c6b1aa56fe405aaadacbd8a40b098afac711d3767ee91c13f40ba",
  name: "addCartItem",
  filename: "src/lib/api/supabase.functions.ts"
}, (opts) => addCartItem.__executeServer(opts));
const addCartItem = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  product_id: stringType(),
  qty: numberType().min(1),
  price: numberType(),
  name: stringType(),
  image: stringType().nullable().optional(),
  swatch: stringType().nullable().optional(),
  stock_qty: numberType().nullable().optional()
})).handler(addCartItem_createServerFn_handler, async ({
  data
}) => {
  const supabase = getSupabaseServer();
  const userId = await getAuthenticatedUserId(supabase);
  if (!userId) throw new Error("Authentication required to add a cart item.");
  await enforceCartAddRateLimit(supabase, userId);
  const nextQty = data.qty;
  const stockQuantity = data.stock_qty ?? Infinity;
  if (stockQuantity !== Infinity && nextQty > stockQuantity) {
    throw new Error(`Only ${stockQuantity} items are available for this product.`);
  }
  const {
    data: existing,
    error: existingError
  } = await supabase.from("cart_items").select("id,qty").eq("user_id", userId).eq("product_id", data.product_id).maybeSingle();
  if (existingError) throw existingError;
  const combinedQty = existing ? existing.qty + data.qty : data.qty;
  if (stockQuantity !== Infinity && combinedQty > stockQuantity) {
    throw new Error(`Only ${stockQuantity} items are available for this product.`);
  }
  const MAX_ITEMS_PER_PRODUCT = 25;
  if (combinedQty > MAX_ITEMS_PER_PRODUCT) {
    throw new Error(`You can only add up to ${MAX_ITEMS_PER_PRODUCT} units of ${data.name} in your cart.`);
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
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  const {
    data: savedItem,
    error: upsertError
  } = await supabase.from("cart_items").upsert(payload, {
    onConflict: "user_id,product_id"
  }).select("id,product_id,qty,price,name,image,swatch,stock_qty").single();
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
      stock_qty: savedItem.stock_qty
    }
  };
});
const mergeCartItems_createServerFn_handler = createServerRpc({
  id: "b65d83cf58c78f7bf88970253e57e99580dc06b18a792f3cba7dc301921419ca",
  name: "mergeCartItems",
  filename: "src/lib/api/supabase.functions.ts"
}, (opts) => mergeCartItems.__executeServer(opts));
const mergeCartItems = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  items: arrayType(objectType({
    product_id: stringType(),
    qty: numberType().min(1),
    price: numberType(),
    name: stringType(),
    image: stringType().nullable().optional(),
    swatch: stringType().nullable().optional(),
    stock_qty: numberType().nullable().optional()
  }))
})).handler(mergeCartItems_createServerFn_handler, async ({
  data
}) => {
  const supabase = getSupabaseServer();
  const userId = await getAuthenticatedUserId(supabase);
  if (!userId) throw new Error("Authentication required to merge cart items.");
  const mergedItems = /* @__PURE__ */ new Map();
  for (const item of data.items) {
    const existing = mergedItems.get(item.product_id);
    if (existing) {
      existing.qty += item.qty;
    } else {
      mergedItems.set(item.product_id, {
        qty: item.qty,
        item
      });
    }
  }
  const productIds = Array.from(mergedItems.keys());
  const {
    data: existingItems,
    error: existingError
  } = await supabase.from("cart_items").select("product_id,qty").eq("user_id", userId).in("product_id", productIds);
  if (existingError) throw existingError;
  const existingQtyMap = /* @__PURE__ */ new Map();
  for (const row of existingItems ?? []) {
    existingQtyMap.set(row.product_id, row.qty);
  }
  const MAX_ITEMS_PER_PRODUCT = 25;
  for (const [, record] of mergedItems) {
    const base = record.item;
    const qty = record.qty + (existingQtyMap.get(base.product_id) ?? 0);
    if (qty > MAX_ITEMS_PER_PRODUCT) {
      throw new Error(`You can only add up to ${MAX_ITEMS_PER_PRODUCT} units of ${base.name} in your cart.`);
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
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    };
  });
  const {
    error: upsertError
  } = await supabase.from("cart_items").upsert(upsertItems, {
    onConflict: "user_id,product_id"
  });
  if (upsertError) throw upsertError;
  return {
    success: true
  };
});
const updateCartItemQuantity_createServerFn_handler = createServerRpc({
  id: "e3478fa95d3da7fe79645881b2dab62371fae9f35071d51c86095d9e0df9bd42",
  name: "updateCartItemQuantity",
  filename: "src/lib/api/supabase.functions.ts"
}, (opts) => updateCartItemQuantity.__executeServer(opts));
const updateCartItemQuantity = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  item_cart_id: stringType().uuid(),
  qty: numberType().min(0)
})).handler(updateCartItemQuantity_createServerFn_handler, async ({
  data
}) => {
  const supabase = getSupabaseServer();
  const userId = await getAuthenticatedUserId(supabase);
  if (!userId) throw new Error("Authentication required to update cart items.");
  if (data.qty === 0) {
    const {
      error: error2
    } = await supabase.from("cart_items").delete().eq("id", data.item_cart_id).eq("user_id", userId);
    if (error2) throw error2;
    return {
      success: true
    };
  }
  const {
    error
  } = await supabase.from("cart_items").update({
    qty: data.qty,
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  }).eq("id", data.item_cart_id).eq("user_id", userId);
  if (error) throw error;
  return {
    success: true
  };
});
const removeCartItem_createServerFn_handler = createServerRpc({
  id: "69efe05081d4c59034791f04c4374641d8f0ada3688fcf7429822492fb114517",
  name: "removeCartItem",
  filename: "src/lib/api/supabase.functions.ts"
}, (opts) => removeCartItem.__executeServer(opts));
const removeCartItem = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  item_cart_id: stringType().uuid()
})).handler(removeCartItem_createServerFn_handler, async ({
  data
}) => {
  const supabase = getSupabaseServer();
  const userId = await getAuthenticatedUserId(supabase);
  if (!userId) throw new Error("Authentication required to remove cart items.");
  const {
    error
  } = await supabase.from("cart_items").delete().eq("id", data.item_cart_id).eq("user_id", userId);
  if (error) throw error;
  return {
    success: true
  };
});
const clearCartItems_createServerFn_handler = createServerRpc({
  id: "0453a1ae017fbcd8fef461d849f5b4c65a7a0fcbc3b1fa9fa66f3ba190972412",
  name: "clearCartItems",
  filename: "src/lib/api/supabase.functions.ts"
}, (opts) => clearCartItems.__executeServer(opts));
const clearCartItems = createServerFn({
  method: "POST"
}).handler(clearCartItems_createServerFn_handler, async () => {
  const supabase = getSupabaseServer();
  const userId = await getAuthenticatedUserId(supabase);
  if (!userId) throw new Error("Authentication required to clear cart items.");
  const {
    error
  } = await supabase.from("cart_items").delete().eq("user_id", userId);
  if (error) throw error;
  return {
    success: true
  };
});
const getMyOrders_createServerFn_handler = createServerRpc({
  id: "a799c956eef1866ba8ef6cd4fb4954e8c3cbce8c7fd51a850e82dd1566a9f011",
  name: "getMyOrders",
  filename: "src/lib/api/supabase.functions.ts"
}, (opts) => getMyOrders.__executeServer(opts));
const getMyOrders = createServerFn({
  method: "GET"
}).handler(getMyOrders_createServerFn_handler, async () => {
  const supabase = getSupabaseServer();
  const {
    data: authData
  } = await supabase.auth.getUser();
  const userId = authData.user?.id ?? null;
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
  await verifyAdmin();
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
  addCartItem_createServerFn_handler,
  checkEmailVerification_createServerFn_handler,
  clearCartItems_createServerFn_handler,
  createOrder_createServerFn_handler,
  createProduct_createServerFn_handler,
  deleteProduct_createServerFn_handler,
  getAdminDashboardData_createServerFn_handler,
  getAdminProducts_createServerFn_handler,
  getAllProducts_createServerFn_handler,
  getAnalyticsData_createServerFn_handler,
  getCartForUser_createServerFn_handler,
  getCartItemsForUser_createServerFn_handler,
  getFeaturedProducts_createServerFn_handler,
  getMyOrders_createServerFn_handler,
  getOrderDetails_createServerFn_handler,
  getOrdersList_createServerFn_handler,
  getProductById_createServerFn_handler,
  getUserActiveOrderStatus_createServerFn_handler,
  mergeCartItems_createServerFn_handler,
  removeCartItem_createServerFn_handler,
  saveCartForUser_createServerFn_handler,
  signUpWithProfile_createServerFn_handler,
  toggleProductActive_createServerFn_handler,
  updateCartItemQuantity_createServerFn_handler,
  updateOrderStatus_createServerFn_handler,
  updateProduct_createServerFn_handler,
  uploadProductImage_createServerFn_handler,
  verifyEmail_createServerFn_handler
};
