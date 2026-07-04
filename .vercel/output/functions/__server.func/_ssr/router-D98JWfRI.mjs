import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as useRouterState, e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { S as redirect } from "../_libs/tanstack__router-core.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { a as getSupabaseClient } from "./supabase-BbYbDVIj.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById, a as createMiddleware } from "./server-BWmwJzJ_.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { R as Root$3 } from "../_libs/radix-ui__react-separator.mjs";
import { R as Root, P as Portal, C as Content, a as Close, T as Title, D as Description, O as Overlay } from "../_libs/radix-ui__react-dialog.mjs";
import { P as Provider, R as Root3, T as Trigger$1, a as Portal$1, C as Content2$1 } from "../_libs/radix-ui__react-tooltip.mjs";
import { R as Root$1, C as CollapsibleTrigger$1, a as CollapsibleContent$1 } from "../_libs/radix-ui__react-collapsible.mjs";
import { R as Root$2, F as Fallback, I as Image } from "../_libs/radix-ui__react-avatar.mjs";
import { R as Root2, T as Trigger, P as Portal2, C as Content2, L as Label2, S as Separator2, I as Item2, a as SubTrigger2, b as SubContent2, c as CheckboxItem2, d as ItemIndicator2, e as RadioItem2 } from "../_libs/radix-ui__react-dropdown-menu.mjs";
import { S as Search, X, M as Menu, a as ShoppingBag, C as CircleUserRound, A as ArrowRight, P as Package, T as Tag, I as Instagram, b as Music2, c as Mail, d as Sparkles, e as Check, L as LayoutDashboard, f as ShoppingCart, U as Users, g as ChartColumn, h as Settings, B as Bell, i as LogOut, j as ChevronRight, k as PanelLeft, l as Circle } from "../_libs/lucide-react.mjs";
import { c as createServerClient } from "../_libs/supabase__ssr.mjs";
import { o as objectType, s as stringType, a as arrayType, n as numberType, l as literalType, b as booleanType } from "../_libs/zod.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/cookie.mjs";
const appCss = "/assets/styles-DXUr71Dd.css";
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
createServerFn({
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
})).handler(createSsrRpc("ca0384b788bbc6e7f55d89600f226bb491b2c710240621167497ef736537cb7b"));
const getCartForUser = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  accessToken: stringType().optional()
})).handler(createSsrRpc("2f977311003aaad1bedfed02a9a50a1a411aca285b5b2ba2291f02325dc05b7b"));
const getMyOrders = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  accessToken: stringType().optional()
})).handler(createSsrRpc("a799c956eef1866ba8ef6cd4fb4954e8c3cbce8c7fd51a850e82dd1566a9f011"));
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
  const response = await getCartForUser({ data: {} });
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
        await saveCartForUser({ data: { items: localItems.map(makePersistableCartItem) } });
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
        const currentItems = readCartStorage().filter(
          (ci) => ci.product_id !== item.product_id
        );
        console.log("[Cart] Adding item to server:", item);
        await saveCartForUser({
          data: {
            items: [
              ...currentItems.map(makePersistableCartItem),
              item
            ]
          }
        });
        console.log("[Cart] Item added successfully, refreshing cart");
        await refreshServerCart();
      } catch (error) {
        console.error("[Cart] Failed to sync add item:", error);
      }
    },
    [refreshServerCart]
  );
  const syncUpdateCartItem = reactExports.useCallback(
    async (_itemCartId, _qty) => {
      try {
        const supabase = getSupabaseClient();
        const { data: authData } = await supabase.auth.getUser();
        if (!authData.user) {
          console.log("[Cart] Not authenticated, skipping server sync for update");
          return;
        }
        const currentItems = readCartStorage();
        console.log("[Cart] Syncing cart to server after update");
        await saveCartForUser({ data: { items: currentItems.map(makePersistableCartItem) } });
        console.log("[Cart] Cart synced successfully");
        await refreshServerCart();
      } catch (error) {
        console.error("[Cart] Failed to sync after update:", error);
      }
    },
    [refreshServerCart]
  );
  const syncRemoveCartItem = reactExports.useCallback(
    async (_itemCartId) => {
      try {
        const supabase = getSupabaseClient();
        const { data: authData } = await supabase.auth.getUser();
        if (!authData.user) {
          console.log("[Cart] Not authenticated, skipping server sync for remove");
          return;
        }
        const currentItems = readCartStorage();
        console.log("[Cart] Syncing cart to server after removal");
        await saveCartForUser({ data: { items: currentItems.map(makePersistableCartItem) } });
        console.log("[Cart] Cart synced after removal successfully");
        await refreshServerCart();
      } catch (error) {
        console.error("[Cart] Failed to sync after removal:", error);
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
      await saveCartForUser({ data: { items: [] } });
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
const searchProducts = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  q: stringType()
})).handler(createSsrRpc("3da541399998645662eb6354918334f237760cff00d444ed65abbc1f10fa8a46"));
const getAutocompleteSuggestions = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  q: stringType()
})).handler(createSsrRpc("18ed727622b898cf89c5c033b5a38eda1bf0aa8e890c7960beff86b493fae0ab"));
const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "Our Story" },
  { to: "/shipping-policy", label: "FAQ" }
];
function HighlightMatch({ text, query }) {
  if (!query.trim()) return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: text });
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: parts.map(
    (part, i) => part.toLowerCase() === query.toLowerCase() ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "mark",
      {
        className: "bg-primary/15 text-primary font-semibold rounded-sm px-0.5 not-italic",
        children: part
      },
      i
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: part }, i)
  ) });
}
function SiteHeader() {
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  const [searchOpen, setSearchOpen] = reactExports.useState(false);
  const [query, setQuery] = reactExports.useState("");
  const [debouncedQuery, setDebouncedQuery] = reactExports.useState("");
  const [isLoadingSuggestions, setIsLoadingSuggestions] = reactExports.useState(false);
  const [suggestions, setSuggestions] = reactExports.useState({
    products: [],
    categories: [],
    brands: []
  });
  const [userEmail, setUserEmail] = reactExports.useState(null);
  const { location } = useRouterState();
  const navigate = useNavigate();
  const searchInputRef = reactExports.useRef(null);
  const dropdownRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  reactExports.useEffect(() => {
    setMobileOpen(false);
    closeSearch();
  }, [location.pathname]);
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
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (searchOpen) closeSearch();
        else openSearch();
      }
      if (e.key === "Escape" && searchOpen) {
        closeSearch();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [searchOpen]);
  reactExports.useEffect(() => {
    if (!searchOpen) return;
    const handler = (e) => {
      const target = e.target;
      if (dropdownRef.current && !dropdownRef.current.contains(target) && searchInputRef.current && !searchInputRef.current.closest("[data-search-bar]")?.contains(target)) {
        closeSearch();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [searchOpen]);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 220);
    return () => clearTimeout(t);
  }, [query]);
  reactExports.useEffect(() => {
    let active = true;
    if (!debouncedQuery.trim()) {
      setSuggestions({ products: [], categories: [], brands: [] });
      setIsLoadingSuggestions(false);
      return;
    }
    setIsLoadingSuggestions(true);
    getAutocompleteSuggestions({ data: { q: debouncedQuery } }).then((res) => {
      if (active) setSuggestions(res);
    }).catch(console.error).finally(() => {
      if (active) setIsLoadingSuggestions(false);
    });
    return () => {
      active = false;
    };
  }, [debouncedQuery]);
  const openSearch = reactExports.useCallback(() => {
    setSearchOpen(true);
    setTimeout(() => searchInputRef.current?.focus(), 50);
  }, []);
  const closeSearch = reactExports.useCallback(() => {
    setSearchOpen(false);
    setQuery("");
    setDebouncedQuery("");
    setSuggestions({ products: [], categories: [], brands: [] });
  }, []);
  const handleSignOut = async () => {
    const supabase = getSupabaseClient();
    await supabase.auth.signOut();
    setUserEmail(null);
    navigate({ to: "/" });
  };
  const handleSearchSubmit = (q) => {
    if (!q.trim()) return;
    closeSearch();
    navigate({ to: "/search", search: { q: q.trim() } });
  };
  const handleSelectProduct = (id) => {
    closeSearch();
    navigate({ to: `/shop/${id}` });
  };
  const handleSelectSuggestion = (term) => {
    closeSearch();
    navigate({ to: "/search", search: { q: term } });
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
  const hasSuggestions = suggestions.products.length > 0 || suggestions.categories.length > 0 || suggestions.brands.length > 0;
  const showDropdown = searchOpen && query.trim().length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: "fixed top-0 left-0 right-0 w-full z-50 bg-sage-deep text-background border-b border-white/10 py-3",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: searchOpen ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-search-bar": true,
            className: "flex items-center gap-3 h-14 lg:h-16 animate-in fade-in slide-in-from-top-1 duration-200 bg-background rounded-xl px-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-5 h-5 text-foreground/50 shrink-0", "aria-hidden": true }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: searchInputRef,
                  type: "search",
                  value: query,
                  onChange: (e) => setQuery(e.target.value),
                  onKeyDown: (e) => {
                    if (e.key === "Enter") handleSearchSubmit(query);
                  },
                  placeholder: "Search products, brands, or categories...",
                  "aria-label": "Search Peach Craft",
                  className: "flex-1 bg-transparent border-none outline-none text-base font-medium text-foreground placeholder:text-foreground/40 caret-primary"
                }
              ),
              isLoadingSuggestions && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: closeSearch,
                  "aria-label": "Close search",
                  className: "grid place-items-center w-10 h-10 rounded-full text-foreground/60 hover:text-foreground hover:bg-accent transition-colors shrink-0",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
                }
              )
            ]
          }
        ) : (
          /* ── NORMAL MODE ── */
          /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between h-14 lg:hidden w-full relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-start z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "aria-label": mobileOpen ? "Close menu" : "Open menu",
                  "aria-expanded": mobileOpen,
                  onClick: () => setMobileOpen((v) => !v),
                  className: "text-background hover:text-blush transition-colors p-1",
                  children: mobileOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-6 h-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-6 h-6" })
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 mx-auto flex justify-center items-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-1.5 pointer-events-auto group whitespace-nowrap", "aria-label": "Peach Craft home", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: logoUrl,
                    alt: "Peach Craft logo",
                    className: "w-8 h-8 object-contain transition-transform group-hover:rotate-12 duration-300"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-xl whitespace-nowrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-background", children: "Peach" }),
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blush font-bold", children: "Craft" })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end items-center gap-4 z-10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "aria-label": "Search",
                    onClick: openSearch,
                    className: "text-background hover:text-blush transition-colors p-1",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-6 h-6" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/cart",
                    "aria-label": `Cart, ${itemCount} items`,
                    className: "text-background hover:text-blush transition-colors p-1 relative",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ShoppingBag,
                        {
                          className: cn(
                            "w-6 h-6 transition-transform text-background",
                            cartBouncing && "animate-cart-bounce"
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1.5 -right-1.5 grid h-4 min-w-[1rem] place-items-center rounded-full bg-blush text-[0.55rem] font-bold text-white px-0.5 shadow-soft", children: itemCount })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex items-center justify-between h-16 w-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-3 group btn-bounce-hover", "aria-label": "Peach Craft home", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: logoUrl,
                    alt: "Peach Craft logo",
                    className: "w-10 h-10 object-contain transition-transform group-hover:rotate-12 duration-300"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-2xl", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-background", children: "Peach" }),
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blush font-bold", children: "Craft" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { "aria-label": "Primary", className: "hidden lg:flex items-center gap-1 bg-white/10 border border-white/20 px-1 py-1 rounded-full", children: nav.map((item) => {
                const active = location.pathname.startsWith(item.to);
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: item.to,
                    className: cn(
                      "relative px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 btn-bounce-hover",
                      active ? "bg-blush text-blush-foreground" : "text-background/80 hover:text-background hover:bg-white/10"
                    ),
                    children: item.label
                  },
                  item.to
                );
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "aria-label": "Search",
                    onClick: openSearch,
                    className: "grid place-items-center w-10 h-10 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors btn-bounce-hover shrink-0",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4 text-background" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/cart",
                    "aria-label": `Cart, ${itemCount} items`,
                    className: "grid place-items-center w-10 h-10 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors relative btn-bounce-hover shrink-0",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ShoppingBag,
                        {
                          className: cn(
                            "w-4 h-4 transition-transform text-background",
                            cartBouncing && "animate-cart-bounce"
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-1 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-blush text-[0.65rem] font-bold text-white px-1 shadow-soft", children: itemCount })
                    ]
                  }
                ),
                isLoggedIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex items-center gap-2 ml-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      title: userEmail ?? "",
                      className: "flex h-9 w-9 items-center justify-center rounded-full bg-blush text-blush-foreground text-sm font-semibold select-none border border-white/20",
                      children: initial
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: handleSignOut,
                      className: "hidden lg:inline-flex items-center justify-center px-4 py-2 border border-white/20 bg-white/10 rounded-full text-xs font-semibold text-background hover:bg-white/20 transition-colors btn-bounce-hover",
                      children: "Sign out"
                    }
                  )
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/login",
                    id: "header-sign-in-btn",
                    className: "hidden lg:inline-flex items-center justify-center px-5 py-2 rounded-full bg-blush text-blush-foreground text-xs font-semibold hover:bg-blush/90 transition-all btn-bounce-hover",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleUserRound, { className: "w-3.5 h-3.5 mr-1", "aria-hidden": true }),
                      "Sign In"
                    ]
                  }
                )
              ] })
            ] })
          ] })
        ) }),
        mobileOpen && !searchOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "nav",
          {
            "aria-label": "Mobile",
            className: "lg:hidden border-b border-white/10 bg-sage-deep animate-fade-in rounded-b-[2rem] overflow-hidden",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "px-6 py-6 space-y-2", children: [
              nav.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: item.to,
                  className: "block px-4 py-3 rounded-2xl text-base font-semibold hover:bg-white/10 text-background transition-all",
                  children: item.label
                }
              ) }, item.to)),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "pt-2 border-t border-border mt-4", children: isLoggedIn ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleSignOut,
                  className: "w-full text-left px-4 py-3 rounded-2xl text-base font-semibold hover:bg-white/10 text-background/80 transition-all",
                  children: "Sign out"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/login",
                  className: "flex items-center gap-2 px-4 py-3 rounded-2xl text-base font-bold text-blush hover:bg-white/10 transition-all",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleUserRound, { className: "w-5 h-5", "aria-hidden": true }),
                    "Sign In"
                  ]
                }
              ) })
            ] })
          }
        ),
        showDropdown && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ref: dropdownRef,
            className: "absolute left-0 right-0 top-full z-50 bg-background/98 backdrop-blur-xl border-b border-border shadow-soft animate-in fade-in slide-in-from-top-1 duration-200",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6", children: [
              !hasSuggestions && !isLoadingSuggestions ? (
                /* No results state */
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 py-8 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground/50", children: [
                    "No matches for ",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-foreground", children: [
                      '"',
                      query,
                      '"'
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleSearchSubmit(query),
                      className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-soft hover:-translate-y-0.5 transition-all",
                      children: [
                        "Search all products ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
                      ]
                    }
                  )
                ] })
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-0 lg:gap-8", children: [
                (suggestions.categories.length > 0 || suggestions.brands.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-4 lg:pb-0 mb-4 lg:mb-0 border-b lg:border-b-0 lg:border-r border-border lg:pr-8", children: [
                  suggestions.categories.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/40 mb-2.5", children: "Categories" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: suggestions.categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => handleSelectSuggestion(cat),
                        className: "flex items-center gap-2.5 w-full text-left px-2 py-2 rounded-lg text-sm text-foreground/80 hover:bg-accent hover:text-foreground transition-colors group",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-3.5 h-3.5 text-foreground/40 shrink-0 group-hover:text-primary transition-colors" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(HighlightMatch, { text: cat, query })
                        ]
                      }
                    ) }, cat)) })
                  ] }),
                  suggestions.brands.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/40 mb-2.5", children: "Brands" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: suggestions.brands.map((brand) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => handleSelectSuggestion(brand),
                        className: "flex items-center gap-2.5 w-full text-left px-2 py-2 rounded-lg text-sm text-foreground/80 hover:bg-accent hover:text-foreground transition-colors group",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3.5 h-3.5 text-foreground/40 shrink-0 group-hover:text-primary transition-colors" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(HighlightMatch, { text: brand, query })
                        ]
                      }
                    ) }, brand)) })
                  ] })
                ] }),
                suggestions.products.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/40 mb-2.5", children: "Products" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: suggestions.products.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleSelectProduct(p.id),
                      className: "flex items-center gap-3 w-full text-left px-2 py-2 rounded-xl hover:bg-accent transition-colors group",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-lg overflow-hidden bg-cream shrink-0 border border-border", children: p.image ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "img",
                          {
                            src: p.image,
                            alt: p.name,
                            className: "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5 text-foreground/20" }) }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate leading-tight", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HighlightMatch, { text: p.name, query }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-foreground/50 mt-0.5 flex items-center gap-1.5", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: p.brand }),
                            p.category && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 rounded-full bg-foreground/30" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: p.category })
                            ] })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-foreground shrink-0", children: [
                          "₱",
                          p.price.toLocaleString("en-PH")
                        ] })
                      ]
                    }
                  ) }, p.id)) })
                ] })
              ] }),
              hasSuggestions && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 pt-4 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => handleSearchSubmit(query),
                  className: "flex items-center justify-between w-full px-4 py-3 rounded-xl bg-accent/50 hover:bg-accent text-sm font-semibold text-foreground hover:text-primary transition-all group",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "Search all results for",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
                        '"',
                        query,
                        '"'
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 text-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all" })
                  ]
                }
              ) })
            ] })
          }
        )
      ]
    }
  ) });
}
function SiteFooter({ compact = false }) {
  const [email, setEmail] = reactExports.useState("");
  const [done, setDone] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "bg-sage-deep text-background mt-0 border-t border-white/10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 grid gap-12 lg:grid-cols-[1.2fr_1fr_1.2fr] " + (compact ? "py-6" : "py-16"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-3xl font-bold tracking-tight", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Peach" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blush", children: "Craft" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-background/80 text-sm max-w-sm leading-relaxed", children: "Handmade fake cakes, storage boxes & clay crafts — made with love, one piece at a time. Crafted to look good and actually be useful. 🍑" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: [
          {
            Icon: Instagram,
            label: "Instagram",
            href: "https://www.instagram.com/_peachcraft?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          },
          {
            Icon: Music2,
            label: "TikTok",
            href: "https://www.tiktok.com/@thepeachywitch?is_from_webapp=1&sender_device=pc"
          },
          { Icon: Mail, label: "Email us", href: "mailto:hello@peachcraft.shop" }
        ].map(({ Icon, label, href }) => {
          const external = href?.startsWith("http");
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href,
              target: external ? "_blank" : void 0,
              rel: external ? "noopener noreferrer" : void 0,
              "aria-label": label,
              className: "grid place-items-center w-10 h-10 rounded-full bg-white/10 hover:bg-blush hover:text-blush-foreground transition-all duration-300 btn-bounce-hover",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" })
            },
            label
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-8 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-background mb-4", children: "Shop" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3 text-background/75 font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "hover:text-blush transition-colors", children: "All Crafts" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: "hover:text-blush transition-colors", children: "Our Story" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-background mb-4", children: "Support" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3 text-background/75 font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shipping-policy", className: "hover:text-blush transition-colors", children: "Shipping Policy" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shipping-policy", className: "hover:text-blush transition-colors", children: "Refund Policy" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "hover:text-blush transition-colors", children: "Contact" }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 border border-white/10 rounded-[2rem] p-6 lg:p-8 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5 text-blush", "aria-hidden": true }),
          " New drops monthly"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl text-background", children: "Keep in contact for FRESH crafts!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-background/75 text-xs max-w-sm leading-relaxed", children: "Be the first to grab restocks and limited pieces before they sell out." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "form",
          {
            onSubmit: (e) => {
              e.preventDefault();
              if (email) setDone(true);
            },
            className: "flex flex-col gap-2 pt-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "newsletter", className: "sr-only", children: "Email address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 bg-white/10 border border-white/20 rounded-full p-1.5 focus-within:ring-2 focus-within:ring-blush", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "newsletter",
                    type: "email",
                    required: true,
                    value: email,
                    onChange: (e) => setEmail(e.target.value),
                    placeholder: "you@hello.com",
                    className: "flex-1 bg-transparent px-3 text-sm text-background placeholder:text-background/60 focus:outline-none"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "submit",
                    className: "px-5 py-2.5 rounded-full bg-blush text-blush-foreground font-semibold text-xs transition-all btn-bounce-hover shadow-soft whitespace-nowrap",
                    children: done ? "You're in! 🍑" : "Join"
                  }
                )
              ] })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-white/10 bg-black/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-background/65 " + (compact ? "py-3" : "py-6"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "© 2026 Peach Craft. All rights reserved. Made with 🍑 & love." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6 font-medium", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shipping-policy", className: "hover:text-blush transition-colors", children: "Shipping Policy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shipping-policy", className: "hover:text-blush transition-colors", children: "Refund Policy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "hover:text-blush transition-colors", children: "Contact" })
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
function CartPanel({
  item,
  onDismiss
}) {
  const [visible, setVisible] = reactExports.useState(false);
  const [leaving, setLeaving] = reactExports.useState(false);
  const navigate = useNavigate();
  const { itemCount } = useCart();
  reactExports.useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);
  const dismiss = reactExports.useCallback(() => {
    setLeaving(true);
    setTimeout(() => onDismiss(item.id), 300);
  }, [item.id, onDismiss]);
  reactExports.useEffect(() => {
    const timer = setTimeout(dismiss, 5e3);
    return () => clearTimeout(timer);
  }, [dismiss]);
  const handleViewCart = () => {
    dismiss();
    navigate({ to: "/cart" });
  };
  const handleCheckout = () => {
    dismiss();
    navigate({ to: "/cart" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        role: "status",
        "aria-live": "polite",
        "aria-atomic": "true",
        className: cn(
          "lg:hidden w-full bg-sage-deep text-background",
          "border-b border-white/10",
          "transition-all duration-300 ease-out overflow-hidden",
          visible && !leaving ? "opacity-100 max-h-[400px]" : "opacity-0 max-h-0"
        ),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-background", strokeWidth: 3 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-background", children: "Item added to your cart" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: dismiss,
                "aria-label": "Dismiss",
                className: "text-background/60 hover:text-background transition-colors p-1",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-5", children: [
            item.productImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: item.productImage,
                alt: item.productName,
                className: "w-14 h-14 rounded-lg object-cover shrink-0 border border-white/10"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-lg bg-white/10 grid place-items-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-6 h-6 text-background/60" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base font-bold text-background leading-snug", children: [
              item.productName,
              item.qty > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block text-sm font-normal text-background/70 mt-0.5", children: [
                "Qty: ",
                item.qty
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleViewCart,
                className: "w-full py-3 rounded-full border border-background/80 text-background text-sm font-semibold hover:bg-white/10 transition-colors",
                children: [
                  "View my cart (",
                  itemCount,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleCheckout,
                className: "w-full py-3 rounded-full bg-background text-foreground text-sm font-semibold hover:bg-background/90 transition-colors",
                children: "Check out"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: dismiss,
                className: "w-full py-2 text-sm font-medium text-background underline underline-offset-2 hover:text-background/80 transition-colors text-center",
                children: "Continue shopping"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        role: "status",
        "aria-live": "polite",
        "aria-atomic": "true",
        className: cn(
          "hidden lg:block",
          "w-[300px] bg-sage-deep text-background",
          "rounded-2xl shadow-[0_16px_48px_-8px_rgba(0,0,0,0.45)] border border-white/10",
          "overflow-hidden",
          "transition-all duration-300 ease-out",
          visible && !leaving ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-3 scale-95 pointer-events-none"
        ),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-background", strokeWidth: 3 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-background", children: "Item added to your cart" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: dismiss,
                "aria-label": "Dismiss",
                className: "text-background/60 hover:text-background transition-colors p-1 -mr-1",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
            item.productImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: item.productImage,
                alt: item.productName,
                className: "w-14 h-14 rounded-lg object-cover shrink-0 border border-white/10"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-lg bg-white/10 grid place-items-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-5 h-5 text-background/60" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-background leading-snug", children: [
              item.productName,
              item.qty > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block text-xs font-normal text-background/70 mt-0.5", children: [
                "Qty: ",
                item.qty
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleViewCart,
                className: "w-full py-2.5 rounded-full border border-background/80 text-background text-sm font-semibold hover:bg-white/10 transition-colors",
                children: [
                  "View my cart (",
                  itemCount,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleCheckout,
                className: "w-full py-2.5 rounded-full bg-background text-foreground text-sm font-semibold hover:bg-background/90 transition-colors",
                children: "Check out"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: dismiss,
                className: "w-full py-1.5 text-sm font-medium text-background underline underline-offset-2 hover:text-background/80 transition-colors text-center",
                children: "Continue shopping"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
function CartToastProvider({ children }) {
  const [toasts, setToasts] = reactExports.useState([]);
  const counterRef = reactExports.useRef(0);
  const notify = reactExports.useCallback((item) => {
    const id = `cart-toast-${++counterRef.current}`;
    setToasts([{ ...item, id }]);
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
        className: "lg:hidden fixed top-20 left-0 right-0 z-40 pointer-events-none",
        children: toasts.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CartPanel, { item: t, onDismiss: dismiss }) }, t.id))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "aria-label": "Cart notifications",
        className: "hidden lg:block fixed top-[88px] right-6 z-40 pointer-events-none",
        children: toasts.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CartPanel, { item: t, onDismiss: dismiss }) }, t.id))
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
const Route$p = createRootRouteWithContext()({
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
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
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
  const { queryClient } = Route$p.useRouteContext();
  const router2 = useRouter();
  const hideShell = router2.state.location.pathname.startsWith("/admin");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CartToastProvider, { children: [
    !hideShell && /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { id: "main", className: !hideShell ? "pt-20 lg:pt-[88px]" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    !hideShell && /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, { compact: /^\/shop\/[^/]+$/.test(router2.state.location.pathname) })
  ] }) });
}
const $$splitComponentImporter$n = () => import("./verify-email-DZBrG07H.mjs");
const Route$o = createFileRoute("/verify-email")({
  component: lazyRouteComponent($$splitComponentImporter$n, "component")
});
const $$splitComponentImporter$m = () => import("./signup-SgqvADN_.mjs");
const Route$n = createFileRoute("/signup")({
  component: lazyRouteComponent($$splitComponentImporter$m, "component")
});
const $$splitComponentImporter$l = () => import("./shop-Bjqr0uUk.mjs");
const Route$m = createFileRoute("/shop")({
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("./shipping-policy-C2ByWIIp.mjs");
const Route$l = createFileRoute("/shipping-policy")({
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
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const $$splitComponentImporter$j = () => import("./search-Bn7AZTDe.mjs");
const Route$k = createFileRoute("/search")({
  validateSearch: (search) => {
    return {
      q: search.q || ""
    };
  },
  head: () => ({
    meta: [{
      title: "Search Results — Peach Craft"
    }, {
      name: "description",
      content: "Search results for handmade crafts, fake cakes, and clay figures on Peach Craft."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("./login-Be7cq1Ra.mjs");
const Route$j = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./contact-C4S_5Ia3.mjs");
const Route$i = createFileRoute("/contact")({
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
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./checkout-BDBgADf7.mjs");
const Route$h = createFileRoute("/checkout")({
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./cart-Bk-hNh8d.mjs");
const Route$g = createFileRoute("/cart")({
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const adminMiddleware = createMiddleware({
  type: "request"
}).server(async ({ request, next }) => {
  const url = new URL(request.url);
  const supabaseUrl = process.env.SUPABASE_URL ?? "";
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ?? "";
  if (!supabaseUrl || !supabaseAnonKey) {
    throw redirect({ to: "/login", search: { redirect: url.pathname } });
  }
  const cookiesToSet = [];
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        const cookie = request.headers.get("cookie") ?? "";
        if (!cookie) return [];
        return cookie.split("; ").filter(Boolean).map((c) => {
          const eq = c.indexOf("=");
          if (eq === -1) return { name: c.trim(), value: "" };
          return { name: c.slice(0, eq).trim(), value: c.slice(eq + 1).trim() };
        });
      },
      setAll(cookies) {
        cookiesToSet.push(...cookies);
      }
    },
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false
    }
  });
  const { data, error } = await supabase.auth.getUser();
  const user = data?.user;
  if (error || !user) {
    throw redirect({ to: "/login", search: { redirect: url.pathname } });
  }
  const adminEmail = process.env.ADMIN_EMAIL ?? "";
  if (!adminEmail || user.email !== adminEmail) {
    throw redirect({ to: "/" });
  }
  const result = await next();
  if (cookiesToSet.length > 0 && result?.response) {
    const response = result.response;
    for (const { name, value, options } of cookiesToSet) {
      let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
      if (options.path) cookieStr += `; Path=${options.path}`;
      if (options.maxAge !== void 0) cookieStr += `; Max-Age=${options.maxAge}`;
      if (options.sameSite) {
        const v = typeof options.sameSite === "boolean" ? "strict" : options.sameSite;
        cookieStr += `; SameSite=${v}`;
      }
      if (options.secure) cookieStr += `; Secure`;
      if (options.httpOnly) cookieStr += `; HttpOnly`;
      response.headers.append("Set-Cookie", cookieStr);
    }
  }
  return result;
});
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = reactExports.useState(void 0);
  reactExports.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!isMobile;
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const Separator = reactExports.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root$3,
  {
    ref,
    decorative,
    orientation,
    className: cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    ),
    ...props
  }
));
Separator.displayName = Root$3.displayName;
const Sheet = Root;
const SheetPortal = Portal;
const SheetOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = reactExports.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(Content, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
    ] }),
    children
  ] })
] }));
SheetContent.displayName = Content.displayName;
const SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
SheetHeader.displayName = "SheetHeader";
const SheetTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = Title.displayName;
const SheetDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = Description.displayName;
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("animate-pulse rounded-md bg-primary/10", className), ...props });
}
const TooltipProvider = Provider;
const Tooltip = Root3;
const TooltipTrigger = Trigger$1;
const TooltipContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$1, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2$1,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-tooltip-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
TooltipContent.displayName = Content2$1.displayName;
const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const SidebarContext = reactExports.createContext(null);
function useSidebar() {
  const context = reactExports.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
const SidebarProvider = reactExports.forwardRef(
  ({
    defaultOpen = true,
    open: openProp,
    onOpenChange: setOpenProp,
    className,
    style,
    children,
    ...props
  }, ref) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = reactExports.useState(false);
    const [_open, _setOpen] = reactExports.useState(defaultOpen);
    const open = openProp ?? _open;
    const setOpen = reactExports.useCallback(
      (value) => {
        const openState = typeof value === "function" ? value(open) : value;
        if (setOpenProp) {
          setOpenProp(openState);
        } else {
          _setOpen(openState);
        }
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      },
      [setOpenProp, open]
    );
    const toggleSidebar = reactExports.useCallback(() => {
      return isMobile ? setOpenMobile((open2) => !open2) : setOpen((open2) => !open2);
    }, [isMobile, setOpen, setOpenMobile]);
    reactExports.useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          toggleSidebar();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);
    const state = open ? "expanded" : "collapsed";
    const contextValue = reactExports.useMemo(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          "--sidebar-width": SIDEBAR_WIDTH,
          "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
          ...style
        },
        className: cn(
          "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
          className
        ),
        ref,
        ...props,
        children
      }
    ) }) });
  }
);
SidebarProvider.displayName = "SidebarProvider";
const Sidebar = reactExports.forwardRef(
  ({
    side = "left",
    variant = "sidebar",
    collapsible = "offcanvas",
    className,
    children,
    ...props
  }, ref) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
    if (collapsible === "none") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: cn(
            "flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
            className
          ),
          ref,
          ...props,
          children
        }
      );
    }
    if (isMobile) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: openMobile, onOpenChange: setOpenMobile, ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        SheetContent,
        {
          "data-sidebar": "sidebar",
          "data-mobile": "true",
          className: "w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
          style: {
            "--sidebar-width": SIDEBAR_WIDTH_MOBILE
          },
          side,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "sr-only", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { children: "Sidebar" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SheetDescription, { children: "Displays the mobile sidebar." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full flex-col", children })
          ]
        }
      ) });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref,
        className: "group peer hidden text-sidebar-foreground md:block",
        "data-state": state,
        "data-collapsible": state === "collapsed" ? collapsible : "",
        "data-variant": variant,
        "data-side": side,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
                "group-data-[collapsible=offcanvas]:w-0",
                "group-data-[side=right]:rotate-180",
                variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
                side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
                // Adjust the padding for floating and inset variants.
                variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
                className
              ),
              ...props,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  "data-sidebar": "sidebar",
                  className: "flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow",
                  children
                }
              )
            }
          )
        ]
      }
    );
  }
);
Sidebar.displayName = "Sidebar";
const SidebarTrigger = reactExports.forwardRef(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      ref,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: cn("h-7 w-7", className),
      onClick: (event) => {
        onClick?.(event);
        toggleSidebar();
      },
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PanelLeft, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
SidebarTrigger.displayName = "SidebarTrigger";
const SidebarRail = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        ref,
        "data-sidebar": "rail",
        "aria-label": "Toggle Sidebar",
        tabIndex: -1,
        onClick: toggleSidebar,
        title: "Toggle Sidebar",
        className: cn(
          "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
          "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
          "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
          "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",
          "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
          "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
          className
        ),
        ...props
      }
    );
  }
);
SidebarRail.displayName = "SidebarRail";
const SidebarInset = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "main",
      {
        ref,
        className: cn(
          "relative flex w-full flex-1 flex-col bg-background",
          "md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
          className
        ),
        ...props
      }
    );
  }
);
SidebarInset.displayName = "SidebarInset";
const SidebarInput = reactExports.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Input,
    {
      ref,
      "data-sidebar": "input",
      className: cn(
        "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        className
      ),
      ...props
    }
  );
});
SidebarInput.displayName = "SidebarInput";
const SidebarHeader = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        "data-sidebar": "header",
        className: cn("flex flex-col gap-2 p-2", className),
        ...props
      }
    );
  }
);
SidebarHeader.displayName = "SidebarHeader";
const SidebarFooter = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        "data-sidebar": "footer",
        className: cn("flex flex-col gap-2 p-2", className),
        ...props
      }
    );
  }
);
SidebarFooter.displayName = "SidebarFooter";
const SidebarSeparator = reactExports.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Separator,
    {
      ref,
      "data-sidebar": "separator",
      className: cn("mx-2 w-auto bg-sidebar-border", className),
      ...props
    }
  );
});
SidebarSeparator.displayName = "SidebarSeparator";
const SidebarContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        "data-sidebar": "content",
        className: cn(
          "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
          className
        ),
        ...props
      }
    );
  }
);
SidebarContent.displayName = "SidebarContent";
const SidebarGroup = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        "data-sidebar": "group",
        className: cn("relative flex w-full min-w-0 flex-col p-2", className),
        ...props
      }
    );
  }
);
SidebarGroup.displayName = "SidebarGroup";
const SidebarGroupLabel = reactExports.forwardRef(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      ref,
      "data-sidebar": "group-label",
      className: cn(
        "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      ),
      ...props
    }
  );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";
const SidebarGroupAction = reactExports.forwardRef(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      ref,
      "data-sidebar": "group-action",
      className: cn(
        "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring cursor-pointer transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    }
  );
});
SidebarGroupAction.displayName = "SidebarGroupAction";
const SidebarGroupContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      "data-sidebar": "group-content",
      className: cn("w-full text-sm", className),
      ...props
    }
  )
);
SidebarGroupContent.displayName = "SidebarGroupContent";
const SidebarMenu = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "ul",
    {
      ref,
      "data-sidebar": "menu",
      className: cn("flex w-full min-w-0 flex-col gap-1", className),
      ...props
    }
  )
);
SidebarMenu.displayName = "SidebarMenu";
const SidebarMenuItem = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "li",
    {
      ref,
      "data-sidebar": "menu-item",
      className: cn("group/menu-item relative", className),
      ...props
    }
  )
);
SidebarMenuItem.displayName = "SidebarMenuItem";
const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring cursor-pointer transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const SidebarMenuButton = reactExports.forwardRef(
  ({
    asChild = false,
    isActive = false,
    variant = "default",
    size = "default",
    tooltip,
    className,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : "button";
    const { isMobile, state } = useSidebar();
    const button = /* @__PURE__ */ jsxRuntimeExports.jsx(
      Comp,
      {
        ref,
        "data-sidebar": "menu-button",
        "data-size": size,
        "data-active": isActive,
        className: cn(sidebarMenuButtonVariants({ variant, size }), className),
        ...props
      }
    );
    if (!tooltip) {
      return button;
    }
    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip
      };
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: button }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        TooltipContent,
        {
          side: "right",
          align: "center",
          hidden: state !== "collapsed" || isMobile,
          ...tooltip
        }
      )
    ] });
  }
);
SidebarMenuButton.displayName = "SidebarMenuButton";
const SidebarMenuAction = reactExports.forwardRef(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      ref,
      "data-sidebar": "menu-action",
      className: cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring cursor-pointer transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className
      ),
      ...props
    }
  );
});
SidebarMenuAction.displayName = "SidebarMenuAction";
const SidebarMenuBadge = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      "data-sidebar": "menu-badge",
      className: cn(
        "pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    }
  )
);
SidebarMenuBadge.displayName = "SidebarMenuBadge";
const SidebarMenuSkeleton = reactExports.forwardRef(({ className, showIcon = false, ...props }, ref) => {
  const width = reactExports.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref,
      "data-sidebar": "menu-skeleton",
      className: cn("flex h-8 items-center gap-2 rounded-md px-2", className),
      ...props,
      children: [
        showIcon && /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "size-4 rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Skeleton,
          {
            className: "h-4 max-w-(--skeleton-width) flex-1",
            "data-sidebar": "menu-skeleton-text",
            style: {
              "--skeleton-width": width
            }
          }
        )
      ]
    }
  );
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";
const SidebarMenuSub = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "ul",
    {
      ref,
      "data-sidebar": "menu-sub",
      className: cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    }
  )
);
SidebarMenuSub.displayName = "SidebarMenuSub";
const SidebarMenuSubItem = reactExports.forwardRef(
  ({ ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { ref, ...props })
);
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";
const SidebarMenuSubButton = reactExports.forwardRef(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      ref,
      "data-sidebar": "menu-sub-button",
      "data-size": size,
      "data-active": isActive,
      className: cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    }
  );
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";
const Collapsible = Root$1;
const CollapsibleTrigger = CollapsibleTrigger$1;
const CollapsibleContent = CollapsibleContent$1;
const Avatar = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root$2,
  {
    ref,
    className: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className),
    ...props
  }
));
Avatar.displayName = Root$2.displayName;
const AvatarImage = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = Image.displayName;
const AvatarFallback = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = Fallback.displayName;
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const navMain = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Products", url: "/admin/products", icon: Package },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: ShoppingCart,
    items: [
      { title: "All Orders", url: "/admin/orders" },
      { title: "Returns", url: "/admin/orders/returns" },
      { title: "Order Tracking", url: "/admin/orders/tracking" }
    ]
  },
  { title: "Customers", url: "/admin/customers", icon: Users },
  { title: "Analytics", url: "/admin/analytics", icon: ChartColumn }
];
const navSettings = [
  { title: "Settings", url: "/admin/website-settings", icon: Settings }
];
function NavItemComponent({ item, activePath }) {
  const isActive = item.url === "/admin" ? activePath === "/admin" : activePath.startsWith(item.url);
  const hasSubItems = item.items && item.items.length > 0;
  const isSubItemActive = hasSubItems && item.items.some((sub) => activePath.startsWith(sub.url));
  if (!hasSubItems) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuButton, { asChild: true, isActive: isActive || isSubItemActive, tooltip: item.title, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: item.url, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.title })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Collapsible, { defaultOpen: isActive || isSubItemActive, className: "group/collapsible", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarMenuItem, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarMenuButton, { isActive: isActive || isSubItemActive, tooltip: item.title, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuSub, { children: item.items.map((sub) => {
      const isSubActive = activePath.startsWith(sub.url);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuSubItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuSubButton, { asChild: true, isActive: isSubActive, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: sub.url, children: sub.title }) }) }, sub.title);
    }) }) })
  ] }) });
}
function AppSidebar() {
  const { location } = useRouterState();
  const activePath = location.pathname ?? "/admin";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Sidebar, { collapsible: "icon", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenu, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuButton, { size: "lg", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "size-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid flex-1 text-left text-sm leading-tight", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-semibold", children: "Peach Craft" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-xs text-muted-foreground", children: "Admin" })
      ] })
    ] }) }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarGroup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarGroupLabel, { children: "Main" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarGroupContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenu, { children: navMain.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(NavItemComponent, { item, activePath }, item.title)) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarGroup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarGroupLabel, { children: "Settings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarGroupContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenu, { children: navSettings.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(NavItemComponent, { item, activePath }, item.title)) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarFooter, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenu, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuButton, { size: "lg", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/website-settings", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-8 w-8 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "rounded-lg", children: "PC" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid flex-1 text-left text-sm leading-tight", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-xs text-muted-foreground", children: "Free Plan" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "ml-auto rounded-full px-1.5 py-0 text-[10px]", children: "PRO" })
    ] }) }) }) }) })
  ] });
}
const Breadcrumb = reactExports.forwardRef(({ ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { ref, "aria-label": "breadcrumb", ...props }));
Breadcrumb.displayName = "Breadcrumb";
const BreadcrumbList = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "ol",
    {
      ref,
      className: cn(
        "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
        className
      ),
      ...props
    }
  )
);
BreadcrumbList.displayName = "BreadcrumbList";
const BreadcrumbItem = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { ref, className: cn("inline-flex items-center gap-1.5", className), ...props })
);
BreadcrumbItem.displayName = "BreadcrumbItem";
const BreadcrumbLink = reactExports.forwardRef(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      ref,
      className: cn("transition-colors hover:text-foreground", className),
      ...props
    }
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";
const BreadcrumbPage = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      ref,
      role: "link",
      "aria-disabled": "true",
      "aria-current": "page",
      className: cn("font-normal text-foreground", className),
      ...props
    }
  )
);
BreadcrumbPage.displayName = "BreadcrumbPage";
const BreadcrumbSeparator = ({ children, className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "li",
  {
    role: "presentation",
    "aria-hidden": "true",
    className: cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className),
    ...props,
    children: children ?? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, {})
  }
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
const DropdownMenu = Root2;
const DropdownMenuTrigger = Trigger;
const DropdownMenuSubTrigger = reactExports.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SubTrigger2,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
const DropdownMenuSubContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SubContent2,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = SubContent2.displayName;
const DropdownMenuContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = Content2.displayName;
const DropdownMenuItem = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Item2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = Item2.displayName;
const DropdownMenuCheckboxItem = reactExports.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  CheckboxItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
const DropdownMenuRadioItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  RadioItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
const DropdownMenuLabel = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Label2,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = Label2.displayName;
const DropdownMenuSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Separator2,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = Separator2.displayName;
function getBreadcrumbs(pathname) {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs = [];
  if (segments[0] === "admin") {
    crumbs.push({ label: "Dashboard", href: "/admin" });
    if (segments.length > 1) {
      for (let i = 1; i < segments.length; i++) {
        const label = segments[i].charAt(0).toUpperCase() + segments[i].slice(1).replace(/-/g, " ");
        const href = "/" + segments.slice(0, i + 1).join("/");
        if (i === segments.length - 1) {
          crumbs.push({ label });
        } else {
          crumbs.push({ label, href });
        }
      }
    }
  } else {
    crumbs.push({ label: "Dashboard" });
  }
  return crumbs;
}
function Header() {
  const { location } = useRouterState();
  const navigate = useNavigate();
  const pathname = location.pathname ?? "/admin";
  const breadcrumbs = getBreadcrumbs(pathname);
  async function handleSignOut() {
    const supabase = getSupabaseClient();
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarTrigger, { className: "-ml-1" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical", className: "mr-2 h-4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumb, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbList, { children: breadcrumbs.map((crumb, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(BreadcrumbItem, { children: [
      crumb.href ? /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbLink, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: crumb.href, children: crumb.label }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbPage, { children: crumb.label }),
      i < breadcrumbs.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbSeparator, {})
    ] }, i)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative hidden md:flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search...",
            className: "h-9 w-64 rounded-lg pl-8 text-sm"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("kbd", { className: "absolute right-2.5 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "⌘" }),
          "K"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "icon", className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-5 w-5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-[10px] font-medium flex items-center justify-center", children: "3" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-8 w-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: "PC" }) }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-56", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Peach Craft" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal text-muted-foreground", children: "admin@peachcraft.com" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/website-settings", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "mr-2 h-4 w-4" }),
            "Settings"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: handleSignOut, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "mr-2 h-4 w-4" }),
            "Sign out"
          ] })
        ] })
      ] })
    ] })
  ] });
}
const Route$f = createFileRoute("/admin")({
  component: AdminLayout
});
Route$f.options.server = { middleware: [adminMiddleware] };
function AdminLayout() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppSidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarInset, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-[#F4F4F5] p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
    ] })
  ] });
}
const $$splitComponentImporter$e = () => import("./about-B_ZsRWEv.mjs");
const Route$e = createFileRoute("/about")({
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
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./index-BQWYoh2b.mjs");
const Route$d = createFileRoute("/")({
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
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./index-Beq-zfjT.mjs");
const Route$c = createFileRoute("/shop/")({
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
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./index-ibte7FIw.mjs");
const Route$b = createFileRoute("/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("../_id-DGX8U2ey.mjs");
const Route$a = createFileRoute("/shop/$id")({
  head: () => ({
    meta: [{
      title: "Product — Peach Craft"
    }, {
      name: "description",
      content: "View product details, pricing, and availability from Peach Craft."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./website-settings-RykpXwxd.mjs");
const Route$9 = createFileRoute("/admin/website-settings")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./analytics-9OejY9Sx.mjs");
const Route$8 = createFileRoute("/admin/analytics")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./index-CKwgN_8Y.mjs");
const Route$7 = createFileRoute("/admin/products/")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./index-CDwNYhZJ.mjs");
const Route$6 = createFileRoute("/admin/orders/")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./index-BoV7kmdE.mjs");
const Route$5 = createFileRoute("/admin/customers/")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./new-TDErKqEW.mjs");
const Route$4 = createFileRoute("/admin/products/new")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("../_id-CXR_2ohd.mjs");
const Route$3 = createFileRoute("/admin/products/$id")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./tracking-6JvtOxXr.mjs");
const Route$2 = createFileRoute("/admin/orders/tracking")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./returns-B4JjHXlx.mjs");
const Route$1 = createFileRoute("/admin/orders/returns")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("../_id-1v8m1sXj.mjs");
const Route = createFileRoute("/admin/orders/$id")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const VerifyEmailRoute = Route$o.update({
  id: "/verify-email",
  path: "/verify-email",
  getParentRoute: () => Route$p
});
const SignupRoute = Route$n.update({
  id: "/signup",
  path: "/signup",
  getParentRoute: () => Route$p
});
const ShopRoute = Route$m.update({
  id: "/shop",
  path: "/shop",
  getParentRoute: () => Route$p
});
const ShippingPolicyRoute = Route$l.update({
  id: "/shipping-policy",
  path: "/shipping-policy",
  getParentRoute: () => Route$p
});
const SearchRoute = Route$k.update({
  id: "/search",
  path: "/search",
  getParentRoute: () => Route$p
});
const LoginRoute = Route$j.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$p
});
const ContactRoute = Route$i.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$p
});
const CheckoutRoute = Route$h.update({
  id: "/checkout",
  path: "/checkout",
  getParentRoute: () => Route$p
});
const CartRoute = Route$g.update({
  id: "/cart",
  path: "/cart",
  getParentRoute: () => Route$p
});
const AdminRoute = Route$f.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$p
});
const AboutRoute = Route$e.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$p
});
const IndexRoute = Route$d.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$p
});
const ShopIndexRoute = Route$c.update({
  id: "/",
  path: "/",
  getParentRoute: () => ShopRoute
});
const AdminIndexRoute = Route$b.update({
  id: "/",
  path: "/",
  getParentRoute: () => AdminRoute
});
const ShopIdRoute = Route$a.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => ShopRoute
});
const AdminWebsiteSettingsRoute = Route$9.update({
  id: "/website-settings",
  path: "/website-settings",
  getParentRoute: () => AdminRoute
});
const AdminAnalyticsRoute = Route$8.update({
  id: "/analytics",
  path: "/analytics",
  getParentRoute: () => AdminRoute
});
const AdminProductsIndexRoute = Route$7.update({
  id: "/products/",
  path: "/products/",
  getParentRoute: () => AdminRoute
});
const AdminOrdersIndexRoute = Route$6.update({
  id: "/orders/",
  path: "/orders/",
  getParentRoute: () => AdminRoute
});
const AdminCustomersIndexRoute = Route$5.update({
  id: "/customers/",
  path: "/customers/",
  getParentRoute: () => AdminRoute
});
const AdminProductsNewRoute = Route$4.update({
  id: "/products/new",
  path: "/products/new",
  getParentRoute: () => AdminRoute
});
const AdminProductsIdRoute = Route$3.update({
  id: "/products/$id",
  path: "/products/$id",
  getParentRoute: () => AdminRoute
});
const AdminOrdersTrackingRoute = Route$2.update({
  id: "/orders/tracking",
  path: "/orders/tracking",
  getParentRoute: () => AdminRoute
});
const AdminOrdersReturnsRoute = Route$1.update({
  id: "/orders/returns",
  path: "/orders/returns",
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
  AdminOrdersReturnsRoute,
  AdminOrdersTrackingRoute,
  AdminProductsIdRoute,
  AdminProductsNewRoute,
  AdminCustomersIndexRoute,
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
  SearchRoute,
  ShippingPolicyRoute,
  ShopRoute: ShopRouteWithChildren,
  SignupRoute,
  VerifyEmailRoute
};
const routeTree = Route$p._addFileChildren(rootRouteChildren)._addFileTypes();
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
  Avatar as A,
  Badge as B,
  buttonVariants as C,
  DropdownMenu as D,
  createProduct as E,
  Route$3 as F,
  updateProduct as G,
  uploadProductImage as H,
  Input as I,
  Route as J,
  getOrderDetails as K,
  updateOrderStatus as L,
  router as M,
  Route$k as R,
  searchProducts as a,
  createOrder as b,
  checkEmailVerification as c,
  getFeaturedProducts as d,
  getAllProducts as e,
  createSsrRpc as f,
  getUserActiveOrderStatus as g,
  cn as h,
  Route$a as i,
  getProductById as j,
  useCartToast as k,
  getAnalyticsData as l,
  Button as m,
  AvatarImage as n,
  AvatarFallback as o,
  DropdownMenuTrigger as p,
  DropdownMenuContent as q,
  DropdownMenuItem as r,
  signUpWithProfile as s,
  DropdownMenuSeparator as t,
  useCart as u,
  verifyEmail as v,
  getAdminProducts as w,
  deleteProduct as x,
  toggleProductActive as y,
  getOrdersList as z
};
