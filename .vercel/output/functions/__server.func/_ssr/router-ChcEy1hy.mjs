import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as useRouterState, e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { S as redirect } from "../_libs/tanstack__router-core.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { a as getSupabaseClient } from "./supabase-B6oNw5MC.mjs";
import { c as createServerFn, a as createMiddleware, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-BjK0EJpJ.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import { S as Search, a as ShoppingBag, C as CircleUserRound, X, M as Menu, b as Sparkles, A as ArrowRight, I as Instagram, c as Music2, d as Mail, e as Check } from "../_libs/lucide-react.mjs";
import { o as objectType, a as arrayType, n as numberType, s as stringType, l as literalType, b as booleanType } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const appCss = "/assets/styles-PErT48yn.css";
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const getFeaturedProducts = createServerFn({
  method: "GET"
}).handler(createSsrRpc("2e52d376c560f13f4b61f22e7cd08cf944cdef0b00910a15331f3822d10cd61a"));
const getAllProducts = createServerFn({
  method: "GET"
}).handler(createSsrRpc("134239e0b57c1a0828a2ca1b12c707e0765b30e82fd974e9fbdcd6921e300fee"));
const getAdminDashboardData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("7e76ff5110a5d02668819d1c037a172495db3e431fc0529ab9c1194ef657affc"));
const getUserActiveOrderStatus = createServerFn({
  method: "GET"
}).handler(createSsrRpc("b11adab6bbee01ffbf09d77542fd6ddb6ca14d4b02f5961a5d5cef7fcb9d1263"));
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
})).handler(createSsrRpc("724b4a807909a6cb3bf92641c31b4ddf645e7527d63be7206083cc9bfa163f57"));
const getAdminProducts = createServerFn({
  method: "GET"
}).handler(createSsrRpc("5a3ea73e22e890dc236f252494d16759d214434f052b691d398bf6ff371fc934"));
const toggleProductActive = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().uuid(),
  is_active: booleanType(),
  accessToken: stringType().optional()
})).handler(createSsrRpc("c2bfc448f09020514abc1480a33033370d741a5a2ec42cd15bbe751f456a3211"));
const deleteProduct = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().uuid(),
  accessToken: stringType().optional()
})).handler(createSsrRpc("d3249ff7c53baf1d5aa77d833043dc591a1089c14640644703529aa10b895a58"));
const getProductById = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().uuid()
})).handler(createSsrRpc("017f11955e2825eee78e335e200cda245acf509074047ecd2de46db831030dc6"));
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
})).handler(createSsrRpc("9a027eb7fe617841ed2e12c0f59efc52bd6fa86ced99b71b0d562e7c0eb3bf33"));
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
})).handler(createSsrRpc("21a18b21d98c300eac8679b420612d35df84a11ab4e477bcace47f48a53c37f3"));
const getOrdersList = createServerFn({
  method: "GET"
}).handler(createSsrRpc("3cdebb12d1443d2c3ae4db1b9e7ebcb404efad457c7ca9fc5851130d258158ee"));
const getOrderDetails = createServerFn({
  method: "GET"
}).inputValidator(objectType({
  id: stringType().uuid()
})).handler(createSsrRpc("4da3201e5791e31c4e6845e165471eb6c3e365aef4d8e13c598cdea140c6c944"));
const updateOrderStatus = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().uuid(),
  status: stringType().min(1)
})).handler(createSsrRpc("6c3526fdbf4f16975cc94b6c49ced8acc7a2debaeeca6c8d4523fa938ec4ba7e"));
const getAnalyticsData = createServerFn({
  method: "GET"
}).handler(createSsrRpc("c450a30d31a564973c85e65058f78677a15e5238e844cd31e6770b5f4af09e99"));
const uploadProductImage = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  fileName: stringType().min(1),
  base64: stringType().min(1),
  accessToken: stringType().optional()
})).handler(createSsrRpc("836924c59abf2bce45bbb63fb90bd96e3b2a39526f9ce59b9886c6fd17be7421"));
const signUpWithProfile = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  email: stringType().email("Invalid email address"),
  password: stringType().min(8, "Password must be at least 8 characters"),
  username: stringType().min(2, "Username must be at least 2 characters").max(50, "Username is too long"),
  address: stringType().min(5, "Address must be at least 5 characters").max(200, "Address is too long")
})).handler(createSsrRpc("50dc331cd0a5f6cb1e5012163c717012557d8aeb981e34426223f7a36bc7efff"));
createServerFn({
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
})).handler(createSsrRpc("ca0384b788bbc6e7f55d89600f226bb491b2c710240621167497ef736537cb7b"));
createServerFn({
  method: "GET"
}).handler(createSsrRpc("2f977311003aaad1bedfed02a9a50a1a411aca285b5b2ba2291f02325dc05b7b"));
const getCartItemsForUser = createServerFn({
  method: "GET"
}).handler(createSsrRpc("060fd1260430d1bedebd75221fd0964bbc2416b8a47b0a8bca880fe07a23cbb4"));
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
})).handler(createSsrRpc("3406ed42c59c6b1aa56fe405aaadacbd8a40b098afac711d3767ee91c13f40ba"));
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
})).handler(createSsrRpc("b65d83cf58c78f7bf88970253e57e99580dc06b18a792f3cba7dc301921419ca"));
const updateCartItemQuantity = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  item_cart_id: stringType().uuid(),
  qty: numberType().min(0)
})).handler(createSsrRpc("e3478fa95d3da7fe79645881b2dab62371fae9f35071d51c86095d9e0df9bd42"));
const removeCartItem = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  item_cart_id: stringType().uuid()
})).handler(createSsrRpc("69efe05081d4c59034791f04c4374641d8f0ada3688fcf7429822492fb114517"));
const clearCartItems = createServerFn({
  method: "POST"
}).handler(createSsrRpc("0453a1ae017fbcd8fef461d849f5b4c65a7a0fcbc3b1fa9fa66f3ba190972412"));
const getMyOrders = createServerFn({
  method: "GET"
}).handler(createSsrRpc("a799c956eef1866ba8ef6cd4fb4954e8c3cbce8c7fd51a850e82dd1566a9f011"));
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
})).handler(createSsrRpc("91ca8d8ff077a706d74f7f830e2c09f280b97623aa37e44fa17a05d56e4f8d7b"));
const checkEmailVerification = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  userId: stringType().uuid()
})).handler(createSsrRpc("3960bcf3f9a6a8d577539bac29a414e1e2d282f328e75b24a2c489df6eb9eada"));
const CART_STORAGE_KEY = "peachcraft-cart";
const CART_UPDATED_EVENT = "peachcraft-cart-updated";
function isBrowser() {
  return typeof window !== "undefined";
}
function readCartStorage() {
  if (!isBrowser()) return [];
  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}
function writeCartStorage(items) {
  if (!isBrowser()) return;
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  setTimeout(() => window.dispatchEvent(new Event(CART_UPDATED_EVENT)), 0);
}
function getCartTotals(items) {
  const itemCount = items.reduce((count, item) => count + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  return { itemCount, subtotal };
}
function makePersistableCartItem(item) {
  return {
    product_id: item.product_id,
    name: item.name,
    price: item.price,
    qty: item.qty,
    image: item.image ?? null,
    swatch: item.swatch ?? null,
    stock_qty: item.stock_qty ?? null
  };
}
async function fetchServerCartItems() {
  const response = await getCartItemsForUser();
  return Array.isArray(response.items) ? response.items : [];
}
function useCart() {
  const [items, setItems] = reactExports.useState([]);
  const refreshServerCart = reactExports.useCallback(async () => {
    try {
      const serverItems = await fetchServerCartItems();
      writeCartStorage(serverItems);
      setItems(serverItems);
    } catch {
    }
  }, []);
  const mergeLocalCartWithServer = reactExports.useCallback(async (localItems) => {
    try {
      console.log("[Cart] Merging local cart with server. Local items:", localItems.length);
      const serverItems = localItems.length ? await (async () => {
        console.log("[Cart] Sending local items to server for merge");
        await mergeCartItems({ data: { items: localItems.map(makePersistableCartItem) } });
        return fetchServerCartItems();
      })() : await fetchServerCartItems();
      console.log("[Cart] Merge complete. Server items:", serverItems.length);
      writeCartStorage(serverItems);
      setItems(serverItems);
    } catch (error) {
      console.error("[Cart] Failed to merge local cart with server:", error);
    }
  }, []);
  const syncAddItem = reactExports.useCallback(
    async (item) => {
      try {
        const supabase = getSupabaseClient();
        const { data: authData } = await supabase.auth.getUser();
        if (!authData.user) {
          console.log("[Cart] Not authenticated, skipping server sync for add");
          return;
        }
        console.log("[Cart] Adding item to server:", item);
        await addCartItem({ data: item });
        console.log("[Cart] Item added successfully, refreshing cart");
        await refreshServerCart();
      } catch (error) {
        console.error("[Cart] Failed to sync add item:", error);
      }
    },
    [refreshServerCart]
  );
  const syncUpdateCartItem = reactExports.useCallback(
    async (itemCartId, qty) => {
      try {
        const supabase = getSupabaseClient();
        const { data: authData } = await supabase.auth.getUser();
        if (!authData.user) {
          console.log("[Cart] Not authenticated, skipping server sync for update");
          return;
        }
        console.log("[Cart] Updating item on server:", { itemCartId, qty });
        await updateCartItemQuantity({ data: { item_cart_id: itemCartId, qty } });
        console.log("[Cart] Item updated successfully, refreshing cart");
        await refreshServerCart();
      } catch (error) {
        console.error("[Cart] Failed to sync update item:", error);
      }
    },
    [refreshServerCart]
  );
  const syncRemoveCartItem = reactExports.useCallback(
    async (itemCartId) => {
      try {
        const supabase = getSupabaseClient();
        const { data: authData } = await supabase.auth.getUser();
        if (!authData.user) {
          console.log("[Cart] Not authenticated, skipping server sync for remove");
          return;
        }
        console.log("[Cart] Removing item from server:", itemCartId);
        await removeCartItem({ data: { item_cart_id: itemCartId } });
        console.log("[Cart] Item removed successfully, refreshing cart");
        await refreshServerCart();
      } catch (error) {
        console.error("[Cart] Failed to sync remove item:", error);
      }
    },
    [refreshServerCart]
  );
  const syncClearCart = reactExports.useCallback(async () => {
    try {
      const supabase = getSupabaseClient();
      const { data: authData } = await supabase.auth.getUser();
      if (!authData.user) {
        console.log("[Cart] Not authenticated, skipping server sync for clear");
        return;
      }
      console.log("[Cart] Clearing cart on server");
      await clearCartItems();
      console.log("[Cart] Cart cleared successfully");
      writeCartStorage([]);
      setItems([]);
    } catch (error) {
      console.error("[Cart] Failed to sync clear cart:", error);
    }
  }, []);
  reactExports.useEffect(() => {
    setItems(readCartStorage());
    const handleStorageUpdate = () => {
      setItems(readCartStorage());
    };
    if (isBrowser()) {
      window.addEventListener(CART_UPDATED_EVENT, handleStorageUpdate);
      return () => window.removeEventListener(CART_UPDATED_EVENT, handleStorageUpdate);
    }
    return void 0;
  }, []);
  reactExports.useEffect(() => {
    let mounted = true;
    (async () => {
      if (!isBrowser()) return;
      const supabase = getSupabaseClient();
      const { data: authData } = await supabase.auth.getUser();
      if (!authData.user) {
        console.log("[Cart] No user on mount, using local storage only");
        return;
      }
      if (!mounted) return;
      console.log("[Cart] User found on mount, merging local cart to server");
      await mergeLocalCartWithServer(readCartStorage());
    })();
    return () => {
      mounted = false;
    };
  }, [mergeLocalCartWithServer]);
  reactExports.useEffect(() => {
    if (!isBrowser()) return void 0;
    const supabase = getSupabaseClient();
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log("[Cart] Auth state changed:", _event, "user:", session?.user?.id ? "logged in" : "logged out");
      if (session?.user) {
        console.log("[Cart] User logged in, merging cart");
        await mergeLocalCartWithServer(readCartStorage());
      } else {
        console.log("[Cart] User logged out, keeping local cart");
      }
    });
    return () => listener.subscription.unsubscribe();
  }, [mergeLocalCartWithServer]);
  const addItem = reactExports.useCallback(
    (product, quantity = 1) => {
      setItems((prevItems) => {
        const existing = prevItems.find((item) => item.product_id === product.id);
        const stockQuantity = product.stock_qty ?? Infinity;
        const desiredQuantity = Math.max(1, quantity);
        const nextQty = existing ? existing.qty + desiredQuantity : desiredQuantity;
        if (stockQuantity !== Infinity && nextQty > stockQuantity) {
          throw new Error(`Only ${stockQuantity} ${product.name} left in stock.`);
        }
        const MAX_ITEMS_PER_PRODUCT = 25;
        if (nextQty > MAX_ITEMS_PER_PRODUCT) {
          throw new Error(`You can only add up to ${MAX_ITEMS_PER_PRODUCT} units of ${product.name} in your cart.`);
        }
        const nextItems = existing ? prevItems.map(
          (item) => item.product_id === product.id ? { ...item, qty: item.qty + desiredQuantity } : item
        ) : [
          ...prevItems,
          {
            product_id: product.id,
            name: product.name,
            price: product.price,
            qty: Math.min(desiredQuantity, stockQuantity),
            image: product.images?.[0] ?? null,
            swatch: product.swatch ?? null,
            stock_qty: product.stock_qty ?? null
          }
        ];
        writeCartStorage(nextItems);
        const itemToSync = nextItems.find((item) => item.product_id === product.id);
        void syncAddItem(makePersistableCartItem(itemToSync));
        return nextItems;
      });
    },
    [syncAddItem]
  );
  const updateQuantity = reactExports.useCallback(
    (productId, qty) => {
      setItems((prevItems) => {
        const normalizedQty = Math.max(0, Math.floor(qty));
        const nextItems = prevItems.map(
          (item) => item.product_id === productId ? { ...item, qty: normalizedQty } : item
        ).filter((item) => item.qty > 0);
        writeCartStorage(nextItems);
        const itemToUpdate = prevItems.find((item) => item.product_id === productId);
        if (itemToUpdate?.item_cart_id) {
          void syncUpdateCartItem(itemToUpdate.item_cart_id, normalizedQty);
        }
        return nextItems;
      });
    },
    [syncUpdateCartItem]
  );
  const removeItem = reactExports.useCallback(
    (productId) => {
      setItems((prevItems) => {
        const itemToRemove = prevItems.find((item) => item.product_id === productId);
        const nextItems = prevItems.filter((item) => item.product_id !== productId);
        writeCartStorage(nextItems);
        if (itemToRemove?.item_cart_id) {
          void syncRemoveCartItem(itemToRemove.item_cart_id);
        }
        return nextItems;
      });
    },
    [syncRemoveCartItem]
  );
  const clear = reactExports.useCallback(() => {
    writeCartStorage([]);
    setItems([]);
    void syncClearCart();
  }, [syncClearCart]);
  const totals = reactExports.useMemo(() => getCartTotals(items), [items]);
  return {
    items,
    ...totals,
    addItem,
    updateQuantity,
    removeItem,
    clear
  };
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const logoUrl = "/assets/logo-DoHDqvt9.svg";
const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/shipping-policy", label: "Shipping & Policy" },
  { to: "/contact", label: "Contact" }
];
function SiteHeader() {
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [open, setOpen] = reactExports.useState(false);
  const [userEmail, setUserEmail] = reactExports.useState(null);
  const { location } = useRouterState();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  reactExports.useEffect(() => setOpen(false), [location.pathname]);
  reactExports.useEffect(() => {
    const supabase = getSupabaseClient();
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
      (async () => {
        try {
          if (session?.user) {
            const orders = await getMyOrders();
            if (orders && Array.isArray(orders)) {
              try {
                window.localStorage.setItem("peachcraft-orders", JSON.stringify(orders));
              } catch {
              }
            }
          } else {
            try {
              window.localStorage.removeItem("peachcraft-orders");
            } catch {
            }
          }
        } catch {
        }
      })();
    });
    return () => listener.subscription.unsubscribe();
  }, []);
  const handleSignOut = async () => {
    const supabase = getSupabaseClient();
    await supabase.auth.signOut();
    setUserEmail(null);
    navigate({ to: "/" });
  };
  const { itemCount } = useCart();
  const prevItemCountRef = reactExports.useRef(itemCount);
  const [cartBouncing, setCartBouncing] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (itemCount > prevItemCountRef.current) {
      setCartBouncing(true);
      setTimeout(() => setCartBouncing(false), 600);
    }
    prevItemCountRef.current = itemCount;
  }, [itemCount]);
  const initial = userEmail?.[0]?.toUpperCase() ?? "?";
  const isLoggedIn = !!userEmail;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary text-primary-foreground text-sm py-2 text-center font-medium", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true }),
      " Shop is OPEN for all orders"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blush text-blush-foreground text-sm py-2 text-center font-medium relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative z-10", children: "Free shipping on orders ₱1,000+" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 marquee-strip pointer-events-none", "aria-hidden": true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "header",
      {
        className: cn(
          "sticky top-0 z-50 transition-all duration-300 backdrop-blur-md",
          scrolled ? "bg-background/85 border-b border-border shadow-soft" : "bg-background/60"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between h-16 lg:h-20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-3 group", "aria-label": "Peach Craft home", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: logoUrl,
                  alt: "Peach Craft logo",
                  className: "w-10 h-10 object-contain"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-2xl", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brown", children: "Peach" }),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Craft" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { "aria-label": "Primary", className: "hidden lg:flex items-center gap-1", children: nav.map((item) => {
              const active = item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: item.to,
                  className: cn(
                    "relative px-4 py-2 text-sm font-medium rounded-full transition-colors",
                    "hover:text-primary",
                    active ? "text-primary" : "text-foreground/80"
                  ),
                  children: [
                    item.label,
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: cn(
                          "absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-primary origin-left transition-transform duration-300",
                          active ? "scale-x-100" : "scale-x-0"
                        ),
                        "aria-hidden": true
                      }
                    )
                  ]
                },
                item.to
              );
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "aria-label": "Search",
                  className: "grid place-items-center w-11 h-11 rounded-full hover:bg-accent transition-colors",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-5 h-5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/cart",
                  "aria-label": `Cart, ${itemCount} items`,
                  className: "grid place-items-center w-11 h-11 rounded-full hover:bg-accent transition-colors relative",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ShoppingBag,
                      {
                        className: cn(
                          "w-5 h-5 transition-transform",
                          cartBouncing && "animate-cart-bounce"
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-1.5 right-1.5 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-blush text-[0.65rem] font-semibold text-white", children: itemCount })
                  ]
                }
              ),
              isLoggedIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex items-center gap-2 ml-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    title: userEmail ?? "",
                    className: "flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-soft select-none",
                    children: initial
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleSignOut,
                    className: "hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-foreground/80 hover:bg-accent transition-colors",
                    children: "Sign out"
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/login",
                  id: "header-sign-in-btn",
                  className: "hidden lg:inline-flex items-center gap-2 ml-1 px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-soft hover:shadow-card hover:-translate-y-0.5 active:translate-y-0 transition-all",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleUserRound, { className: "w-4 h-4", "aria-hidden": true }),
                    "Sign In"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "aria-label": open ? "Close menu" : "Open menu",
                  "aria-expanded": open,
                  onClick: () => setOpen((v) => !v),
                  className: "lg:hidden grid place-items-center w-11 h-11 rounded-full hover:bg-accent",
                  children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-5 h-5" })
                }
              )
            ] })
          ] }) }),
          open && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "nav",
            {
              "aria-label": "Mobile",
              className: "lg:hidden border-t border-border bg-background/95 backdrop-blur animate-fade-in",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "px-4 py-2", children: [
                nav.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: item.to,
                    className: "block px-3 py-3 rounded-lg text-base font-medium hover:bg-accent",
                    children: item.label
                  }
                ) }, item.to)),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "pt-1 pb-2", children: isLoggedIn ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleSignOut,
                    className: "w-full text-left px-3 py-3 rounded-lg text-base font-medium hover:bg-accent text-foreground/80",
                    children: "Sign out"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/login",
                    className: "flex items-center gap-2 px-3 py-3 rounded-lg text-base font-semibold text-primary hover:bg-accent",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleUserRound, { className: "w-5 h-5", "aria-hidden": true }),
                      "Sign In"
                    ]
                  }
                ) })
              ] })
            }
          )
        ]
      }
    )
  ] });
}
function SiteFooter() {
  const [email, setEmail] = reactExports.useState("");
  const [done, setDone] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "bg-sage-deep text-background mt-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-6 py-14 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-sm font-medium", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4", "aria-hidden": true }),
        " New drops every month"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-3xl sm:text-4xl font-display", children: "Get notified when new crafts drop" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-background/75 max-w-xl mx-auto", children: "Be the first to grab restocks and limited pieces before they sell out." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: (e) => {
            e.preventDefault();
            if (email) setDone(true);
          },
          className: "mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "newsletter", className: "sr-only", children: "Email address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "newsletter",
                type: "email",
                required: true,
                value: email,
                onChange: (e) => setEmail(e.target.value),
                placeholder: "you@hello.com",
                className: "flex-1 h-12 px-4 rounded-full bg-white/10 border border-white/20 placeholder:text-background/60 text-background focus:outline-none focus:ring-2 focus:ring-blush"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                className: "h-12 px-6 rounded-full bg-blush text-blush-foreground font-semibold inline-flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-100 transition-transform shadow-soft",
                children: done ? "You're in! 🍑" : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  "Join ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                ] })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-background/60", children: "No spam, just shop updates." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 py-12 grid gap-10 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Peach" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blush", children: "Craft" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-background/75 max-w-xs", children: "Handmade fake cakes, storage boxes & clay crafts — made with love, one piece at a time. 🍑" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex gap-2", children: [
          { Icon: Instagram, label: "Instagram" },
          { Icon: Music2, label: "TikTok" },
          { Icon: Mail, label: "Email us" }
        ].map(({ Icon, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "#",
            "aria-label": label,
            className: "grid place-items-center w-11 h-11 rounded-full bg-white/10 hover:bg-blush hover:text-blush-foreground transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" })
          },
          label
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-background mb-3", children: "Shop" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-background/75", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "hover:text-blush", children: "All Crafts" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "hover:text-blush", children: "Fake Cakes" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "hover:text-blush", children: "Clay Figures" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "hover:text-blush", children: "Storage Boxes" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-background mb-3", children: "Support" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-background/75", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shipping-policy", className: "hover:text-blush", children: "Shipping Policy" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shipping-policy", className: "hover:text-blush", children: "Refund Policy" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "hover:text-blush", children: "Contact" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-background mb-3", children: "Studio" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-background/75", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: "hover:text-blush", children: "About" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-blush", children: "Process" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-blush", children: "Press" }) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-background/70", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "© 2026 Peach Craft. All rights reserved. Made with 🍑 & love." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shipping-policy", className: "hover:text-blush", children: "Shipping Policy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shipping-policy", className: "hover:text-blush", children: "Refund Policy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "hover:text-blush", children: "Contact" })
      ] })
    ] }) })
  ] });
}
const CartToastContext = reactExports.createContext(null);
function useCartToast() {
  const ctx = reactExports.useContext(CartToastContext);
  if (!ctx) throw new Error("useCartToast must be used inside CartToastProvider");
  return ctx;
}
function ToastCard({
  item,
  onDismiss
}) {
  const [visible, setVisible] = reactExports.useState(false);
  const [leaving, setLeaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);
  const dismiss = reactExports.useCallback(() => {
    setLeaving(true);
    setTimeout(() => onDismiss(item.id), 350);
  }, [item.id, onDismiss]);
  reactExports.useEffect(() => {
    const timer = setTimeout(dismiss, 3500);
    return () => clearTimeout(timer);
  }, [dismiss]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      role: "status",
      "aria-live": "polite",
      "aria-atomic": "true",
      className: cn(
        "flex items-center gap-3 w-80 max-w-[calc(100vw-2rem)]",
        "rounded-2xl bg-card shadow-[0_8px_32px_-8px_rgba(0,0,0,0.18)] border border-border/60",
        "p-3 pr-4 backdrop-blur-sm",
        "transition-all duration-350 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
        visible && !leaving ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-8 scale-95"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0", children: [
          item.productImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: item.productImage,
              alt: item.productName,
              className: "w-14 h-14 rounded-xl object-cover border border-border/40"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-xl bg-blush/30 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-6 h-6 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary grid place-items-center shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3 text-primary-foreground stroke-[3]" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground leading-none mb-1", children: "Added to cart" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate leading-snug", children: item.productName }),
          item.qty > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
            "Qty: ",
            item.qty
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: dismiss,
            "aria-label": "Dismiss notification",
            className: "shrink-0 grid place-items-center w-7 h-7 rounded-full hover:bg-accent transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5 text-muted-foreground" })
          }
        )
      ]
    }
  );
}
function CartToastProvider({ children }) {
  const [toasts, setToasts] = reactExports.useState([]);
  const counterRef = reactExports.useRef(0);
  const notify = reactExports.useCallback((item) => {
    const id = `cart-toast-${++counterRef.current}`;
    setToasts((prev) => [...prev, { ...item, id }]);
  }, []);
  const dismiss = reactExports.useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(CartToastContext.Provider, { value: { notify }, children: [
    children,
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "aria-label": "Cart notifications",
        className: "fixed bottom-6 right-6 z-[200] flex flex-col gap-2 items-end pointer-events-none",
        children: toasts.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ToastCard, { item: t, onDismiss: dismiss }) }, t.id))
      }
    )
  ] });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$l = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Peach Craft Handmade fake cakes, clay crafts & kawaii storage" },
      { name: "description", content: "Peach Craft makes adorable handmade fake cakes, air-dry clay figures and kawaii storage boxes — sculpted one piece at a time with love." },
      { name: "author", content: "Peach Craft" },
      { property: "og:title", content: "Peach Craft — Handmade with love" },
      { property: "og:description", content: "Adorable fake cakes, kawaii storage boxes and air-dry clay creations, sculpted by hand." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@peachcraft" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500;1,9..144,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$l.useRouteContext();
  const router2 = useRouter();
  const hideShell = router2.state.location.pathname.startsWith("/admin");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CartToastProvider, { children: [
    !hideShell && /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { id: "main", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    !hideShell && /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] }) });
}
const $$splitComponentImporter$k = () => import("./verify-email-7F2tJ5kK.mjs");
const Route$k = createFileRoute("/verify-email")({
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const $$splitComponentImporter$j = () => import("./signup-D4jrPdU9.mjs");
const Route$j = createFileRoute("/signup")({
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("./shop-Bjqr0uUk.mjs");
const Route$i = createFileRoute("/shop")({
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./shipping-policy-CNZPFG-6.mjs");
const Route$h = createFileRoute("/shipping-policy")({
  head: () => ({
    meta: [{
      title: "Shipping & Policy — Peach Craft"
    }, {
      name: "description",
      content: "Shipping rates, delivery times, refund policy and care instructions for Peach Craft handmade items."
    }, {
      property: "og:title",
      content: "Shipping & Policy — Peach Craft"
    }, {
      property: "og:description",
      content: "Shipping rates, refund policy and care instructions."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./login-DB5SgajL.mjs");
const Route$g = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./contact-BtLkPpvZ.mjs");
const Route$f = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Contact — Peach Craft"
    }, {
      name: "description",
      content: "Say hi, ask about custom orders, or get help with an existing order at Peach Craft."
    }, {
      property: "og:title",
      content: "Contact Peach Craft"
    }, {
      property: "og:description",
      content: "Say hi, ask about custom orders, or get help with an existing order."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./checkout-BB7ewFUy.mjs");
const Route$e = createFileRoute("/checkout")({
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./cart-BvmqVF0m.mjs");
const Route$d = createFileRoute("/cart")({
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const adminMiddleware = createMiddleware().server(async ({ next, request }) => {
  const url = new URL(request.url);
  const supabaseUrl = process.env.SUPABASE_URL ?? "";
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ?? "";
  if (!supabaseUrl || !supabaseAnonKey) {
    throw redirect({ to: `/login?redirect=${encodeURIComponent(url.pathname)}` });
  }
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        cookie: request.headers.get("cookie") ?? ""
      }
    },
    auth: {
      // Disable auto-refresh and storage on the server — we only want to
      // read the session once from the request cookies.
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false
    }
  });
  const { data, error } = await supabase.auth.getUser();
  const user = data?.user;
  if (error || !user) {
    throw redirect({ to: `/login?redirect=${encodeURIComponent(url.pathname)}` });
  }
  const adminEmail = process.env.ADMIN_EMAIL ?? "";
  if (!adminEmail || user.email !== adminEmail) {
    throw redirect({ to: "/" });
  }
  return next();
});
const $$splitComponentImporter$c = () => import("./admin-DNniRtFA.mjs");
const Route$c = createFileRoute("/admin")({
  middleware: [adminMiddleware],
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./about-CbbzIdlP.mjs");
const Route$b = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "About — Peach Craft"
    }, {
      name: "description",
      content: "Meet the maker behind Peach Craft — a one-person studio sculpting kawaii clay creations from her kitchen table."
    }, {
      property: "og:title",
      content: "About Peach Craft"
    }, {
      property: "og:description",
      content: "A one-person studio sculpting kawaii clay creations with love."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./index-CE9ad5M5.mjs");
const Route$a = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Peach Craft Cute Fake Cakes & Kawaii Clay Crafts"
    }, {
      name: "description",
      content: "Adorable handmade fake cakes, air-dry clay figures and kawaii storage boxes. Sculpted by hand with love."
    }, {
      property: "og:title",
      content: "Peach Craft — Handmade with love"
    }, {
      property: "og:description",
      content: "Adorable handmade fake cakes, air-dry clay figures and kawaii storage boxes."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./index-CDsq9AFp.mjs");
const Route$9 = createFileRoute("/shop/")({
  head: () => ({
    meta: [{
      title: "Shop — Peach Craft"
    }, {
      name: "description",
      content: "Browse handmade fake cakes, kawaii storage boxes and air-dry clay figures from Peach Craft."
    }, {
      property: "og:title",
      content: "Shop — Peach Craft"
    }, {
      property: "og:description",
      content: "Browse handmade fake cakes, kawaii storage boxes and clay figures."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./index-Bp_Sj5Es.mjs");
const Route$8 = createFileRoute("/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("../_id-D6XsuGuB.mjs");
const Route$7 = createFileRoute("/shop/$id")({
  head: () => ({
    meta: [{
      title: "Product — Peach Craft"
    }, {
      name: "description",
      content: "View product details, pricing, and availability from Peach Craft."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./website-settings-C6qEgba6.mjs");
const Route$6 = createFileRoute("/admin/website-settings")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./analytics-DjE14pfi.mjs");
const Route$5 = createFileRoute("/admin/analytics")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./index-rVvqEkd4.mjs");
const Route$4 = createFileRoute("/admin/products/")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./index-XvG-9CxA.mjs");
const Route$3 = createFileRoute("/admin/orders/")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./new-iSN1LDmW.mjs");
const Route$2 = createFileRoute("/admin/products/new")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("../_id-CvjV_-2x.mjs");
const Route$1 = createFileRoute("/admin/products/$id")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("../_id-C1uEvXCK.mjs");
const Route = createFileRoute("/admin/orders/$id")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const VerifyEmailRoute = Route$k.update({
  id: "/verify-email",
  path: "/verify-email",
  getParentRoute: () => Route$l
});
const SignupRoute = Route$j.update({
  id: "/signup",
  path: "/signup",
  getParentRoute: () => Route$l
});
const ShopRoute = Route$i.update({
  id: "/shop",
  path: "/shop",
  getParentRoute: () => Route$l
});
const ShippingPolicyRoute = Route$h.update({
  id: "/shipping-policy",
  path: "/shipping-policy",
  getParentRoute: () => Route$l
});
const LoginRoute = Route$g.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$l
});
const ContactRoute = Route$f.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$l
});
const CheckoutRoute = Route$e.update({
  id: "/checkout",
  path: "/checkout",
  getParentRoute: () => Route$l
});
const CartRoute = Route$d.update({
  id: "/cart",
  path: "/cart",
  getParentRoute: () => Route$l
});
const AdminRoute = Route$c.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$l
});
const AboutRoute = Route$b.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$l
});
const IndexRoute = Route$a.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$l
});
const ShopIndexRoute = Route$9.update({
  id: "/",
  path: "/",
  getParentRoute: () => ShopRoute
});
const AdminIndexRoute = Route$8.update({
  id: "/",
  path: "/",
  getParentRoute: () => AdminRoute
});
const ShopIdRoute = Route$7.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => ShopRoute
});
const AdminWebsiteSettingsRoute = Route$6.update({
  id: "/website-settings",
  path: "/website-settings",
  getParentRoute: () => AdminRoute
});
const AdminAnalyticsRoute = Route$5.update({
  id: "/analytics",
  path: "/analytics",
  getParentRoute: () => AdminRoute
});
const AdminProductsIndexRoute = Route$4.update({
  id: "/products/",
  path: "/products/",
  getParentRoute: () => AdminRoute
});
const AdminOrdersIndexRoute = Route$3.update({
  id: "/orders/",
  path: "/orders/",
  getParentRoute: () => AdminRoute
});
const AdminProductsNewRoute = Route$2.update({
  id: "/products/new",
  path: "/products/new",
  getParentRoute: () => AdminRoute
});
const AdminProductsIdRoute = Route$1.update({
  id: "/products/$id",
  path: "/products/$id",
  getParentRoute: () => AdminRoute
});
const AdminOrdersIdRoute = Route.update({
  id: "/orders/$id",
  path: "/orders/$id",
  getParentRoute: () => AdminRoute
});
const AdminRouteChildren = {
  AdminAnalyticsRoute,
  AdminWebsiteSettingsRoute,
  AdminIndexRoute,
  AdminOrdersIdRoute,
  AdminProductsIdRoute,
  AdminProductsNewRoute,
  AdminOrdersIndexRoute,
  AdminProductsIndexRoute
};
const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
const ShopRouteChildren = {
  ShopIdRoute,
  ShopIndexRoute
};
const ShopRouteWithChildren = ShopRoute._addFileChildren(ShopRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  AdminRoute: AdminRouteWithChildren,
  CartRoute,
  CheckoutRoute,
  ContactRoute,
  LoginRoute,
  ShippingPolicyRoute,
  ShopRoute: ShopRouteWithChildren,
  SignupRoute,
  VerifyEmailRoute
};
const routeTree = Route$l._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$7 as R,
  createOrder as a,
  cn as b,
  checkEmailVerification as c,
  getFeaturedProducts as d,
  getAllProducts as e,
  useCartToast as f,
  getUserActiveOrderStatus as g,
  getAdminDashboardData as h,
  getProductById as i,
  createSsrRpc as j,
  getAnalyticsData as k,
  getAdminProducts as l,
  deleteProduct as m,
  getOrdersList as n,
  createProduct as o,
  Route$1 as p,
  updateProduct as q,
  uploadProductImage as r,
  signUpWithProfile as s,
  toggleProductActive as t,
  useCart as u,
  verifyEmail as v,
  Route as w,
  getOrderDetails as x,
  updateOrderStatus as y,
  router as z
};
