import { useCallback, useEffect, useMemo, useState } from "react";
import type { Product } from "./supabase";
import { getSupabaseClient } from "./supabase";
import {
  addCartItem,
  clearCartItems,
  getCartItemsForUser,
  mergeCartItems,
  removeCartItem as removeCartItemFromServer,
  updateCartItemQuantity,
} from "@/lib/api/supabase.functions";

const CART_STORAGE_KEY = "peachcraft-cart";
const CART_UPDATED_EVENT = "peachcraft-cart-updated";

export type CartItem = {
  item_cart_id?: string;
  product_id: string;
  name: string;
  price: number;
  qty: number;
  image?: string | null;
  swatch?: string | null;
  stock_qty?: number | null;
};

type PersistableCartItem = Omit<CartItem, "item_cart_id">;

type ServerCartResponse = { items: CartItem[] };

function isBrowser() {
  return typeof window !== "undefined";
}

function readCartStorage(): CartItem[] {
  if (!isBrowser()) return [];

  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function writeCartStorage(items: CartItem[]) {
  if (!isBrowser()) return;

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

export function getCartItems(): CartItem[] {
  return readCartStorage();
}

export function clearCart() {
  writeCartStorage([]);
}

export function getCartTotals(items: CartItem[]) {
  const itemCount = items.reduce((count, item) => count + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  return { itemCount, subtotal };
}

function makePersistableCartItem(item: CartItem): PersistableCartItem {
  return {
    product_id: item.product_id,
    name: item.name,
    price: item.price,
    qty: item.qty,
    image: item.image ?? null,
    swatch: item.swatch ?? null,
    stock_qty: item.stock_qty ?? null,
  };
}

async function fetchServerCartItems(): Promise<CartItem[]> {
  const response = await getCartItemsForUser();
  return Array.isArray((response as ServerCartResponse).items)
    ? (response as ServerCartResponse).items
    : [];
}

export function addToCart(product: Product, quantity = 1): CartItem[] {
  const currentItems = readCartStorage();
  const existing = currentItems.find((item) => item.product_id === product.id);
  const stockQuantity = product.stock_qty ?? Infinity;
  const desiredQuantity = Math.max(1, quantity);

  if (stockQuantity !== Infinity && existing && existing.qty + desiredQuantity > stockQuantity) {
    throw new Error(`Only ${stockQuantity} ${product.name} left in stock.`);
  }

  // Enforce max 25 units per product per user
  const MAX_ITEMS_PER_PRODUCT = 25;
  const newQty = existing ? existing.qty + desiredQuantity : desiredQuantity;
  if (newQty > MAX_ITEMS_PER_PRODUCT) {
    throw new Error(`You can only add up to ${MAX_ITEMS_PER_PRODUCT} units of ${product.name} in your cart.`);
  }

  const nextItems = existing
    ? currentItems.map((item) =>
        item.product_id === product.id
          ? { ...item, qty: item.qty + desiredQuantity }
          : item,
      )
    : [
        ...currentItems,
        {
          product_id: product.id,
          name: product.name,
          price: product.price,
          qty: Math.min(desiredQuantity, stockQuantity),
          image: product.images?.[0] ?? null,
          swatch: product.swatch ?? null,
          stock_qty: product.stock_qty ?? null,
        },
      ];

  writeCartStorage(nextItems);
  return nextItems;
}

export function updateCartQuantity(productId: string, qty: number): CartItem[] {
  const currentItems = readCartStorage();
  const normalizedQty = Math.max(0, Math.floor(qty));

  const nextItems = currentItems
    .map((item) =>
      item.product_id === productId
        ? { ...item, qty: normalizedQty }
        : item,
    )
    .filter((item) => item.qty > 0);

  writeCartStorage(nextItems);
  return nextItems;
}

export function removeCartItem(productId: string): CartItem[] {
  const nextItems = readCartStorage().filter((item) => item.product_id !== productId);
  writeCartStorage(nextItems);
  return nextItems;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const refreshServerCart = useCallback(async () => {
    try {
      const serverItems = await fetchServerCartItems();
      writeCartStorage(serverItems);
      setItems(serverItems);
    } catch {
      // ignore server refresh failures
    }
  }, []);

  const mergeLocalCartWithServer = useCallback(async (localItems: CartItem[]) => {
    try {
      console.log("[Cart] Merging local cart with server. Local items:", localItems.length);
      const serverItems = localItems.length
        ? await (async () => {
            console.log("[Cart] Sending local items to server for merge");
            await mergeCartItems({ data: { items: localItems.map(makePersistableCartItem) } });
            return fetchServerCartItems();
          })()
        : await fetchServerCartItems();

      console.log("[Cart] Merge complete. Server items:", serverItems.length);
      writeCartStorage(serverItems);
      setItems(serverItems);
    } catch (error) {
      console.error("[Cart] Failed to merge local cart with server:", error);
    }
  }, []);

  const syncAddItem = useCallback(
    async (item: PersistableCartItem) => {
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
    [refreshServerCart],
  );

  const syncUpdateCartItem = useCallback(
    async (itemCartId: string, qty: number) => {
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
    [refreshServerCart],
  );

  const syncRemoveCartItem = useCallback(
    async (itemCartId: string) => {
      try {
        const supabase = getSupabaseClient();
        const { data: authData } = await supabase.auth.getUser();
        if (!authData.user) {
          console.log("[Cart] Not authenticated, skipping server sync for remove");
          return;
        }

        console.log("[Cart] Removing item from server:", itemCartId);
        await removeCartItemFromServer({ data: { item_cart_id: itemCartId } });
        console.log("[Cart] Item removed successfully, refreshing cart");
        await refreshServerCart();
      } catch (error) {
        console.error("[Cart] Failed to sync remove item:", error);
      }
    },
    [refreshServerCart],
  );

  const syncClearCart = useCallback(async () => {
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

  useEffect(() => {
    setItems(readCartStorage());

    const handleStorageUpdate = () => {
      setItems(readCartStorage());
    };

    if (isBrowser()) {
      window.addEventListener(CART_UPDATED_EVENT, handleStorageUpdate);
      return () => window.removeEventListener(CART_UPDATED_EVENT, handleStorageUpdate);
    }

    return undefined;
  }, []);

  useEffect(() => {
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

  useEffect(() => {
    if (!isBrowser()) return undefined;

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

  const addItem = useCallback(
    (product: Product, quantity = 1) => {
      setItems((prevItems) => {
        const existing = prevItems.find((item) => item.product_id === product.id);
        const stockQuantity = product.stock_qty ?? Infinity;
        const desiredQuantity = Math.max(1, quantity);
        const nextQty = existing ? existing.qty + desiredQuantity : desiredQuantity;

        if (stockQuantity !== Infinity && nextQty > stockQuantity) {
          throw new Error(`Only ${stockQuantity} ${product.name} left in stock.`);
        }

        // Enforce max 25 units per product per user
        const MAX_ITEMS_PER_PRODUCT = 25;
        if (nextQty > MAX_ITEMS_PER_PRODUCT) {
          throw new Error(`You can only add up to ${MAX_ITEMS_PER_PRODUCT} units of ${product.name} in your cart.`);
        }

        const nextItems = existing
          ? prevItems.map((item) =>
              item.product_id === product.id
                ? { ...item, qty: item.qty + desiredQuantity }
                : item,
            )
          : [
              ...prevItems,
              {
                product_id: product.id,
                name: product.name,
                price: product.price,
                qty: Math.min(desiredQuantity, stockQuantity),
                image: product.images?.[0] ?? null,
                swatch: product.swatch ?? null,
                stock_qty: product.stock_qty ?? null,
              },
            ];

        writeCartStorage(nextItems);
        const itemToSync = nextItems.find((item) => item.product_id === product.id)!;
        void syncAddItem(makePersistableCartItem(itemToSync));
        return nextItems;
      });
    },
    [syncAddItem],
  );

  const updateQuantity = useCallback(
    (productId: string, qty: number) => {
      setItems((prevItems) => {
        const normalizedQty = Math.max(0, Math.floor(qty));

        const nextItems = prevItems
          .map((item) =>
            item.product_id === productId
              ? { ...item, qty: normalizedQty }
              : item,
          )
          .filter((item) => item.qty > 0);

        writeCartStorage(nextItems);

        const itemToUpdate = prevItems.find((item) => item.product_id === productId);
        if (itemToUpdate?.item_cart_id) {
          void syncUpdateCartItem(itemToUpdate.item_cart_id, normalizedQty);
        }

        return nextItems;
      });
    },
    [syncUpdateCartItem],
  );

  const removeItem = useCallback(
    (productId: string) => {
      setItems((prevItems) => {
        const itemToRemove = prevItems.find((item) => item.product_id === productId);
        const nextItems = prevItems.filter((item) => item.product_id !== productId);

        writeCartStorage(nextItems);

        // Only sync removal if item has an ID (meaning it was synced to server)
        if (itemToRemove?.item_cart_id) {
          void syncRemoveCartItem(itemToRemove.item_cart_id);
        }

        return nextItems;
      });
    },
    [syncRemoveCartItem],
  );

  const clear = useCallback(() => {
    writeCartStorage([]);
    setItems([]);
    void syncClearCart();
  }, [syncClearCart]);

  const totals = useMemo(() => getCartTotals(items), [items]);

  return {
    items,
    ...totals,
    addItem,
    updateQuantity,
    removeItem,
    clear,
  };
}
