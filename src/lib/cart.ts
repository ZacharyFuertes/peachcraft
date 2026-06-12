import { useCallback, useEffect, useMemo, useState } from "react";
import type { Product } from "./supabase";

const CART_STORAGE_KEY = "peachcraft-cart";
const CART_UPDATED_EVENT = "peachcraft-cart-updated";

export type CartItem = {
  product_id: string;
  name: string;
  price: number;
  qty: number;
  image?: string | null;
  swatch?: string | null;
  stock_qty?: number | null;
};

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

export function addToCart(product: Product, quantity = 1): CartItem[] {
  const currentItems = readCartStorage();
  const existing = currentItems.find((item) => item.product_id === product.id);
  const stockQuantity = product.stock_qty ?? Infinity;
  const desiredQuantity = Math.max(1, quantity);

  if (stockQuantity !== Infinity && existing && existing.qty + desiredQuantity > stockQuantity) {
    throw new Error(`Only ${stockQuantity} ${product.name} left in stock.`);
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

  const setCartItems = useCallback((nextItems: CartItem[]) => {
    writeCartStorage(nextItems);
    setItems(nextItems);
  }, []);

  const addItem = useCallback(
    (product: Product, quantity = 1) => {
      setItems((prevItems) => {
        const existing = prevItems.find((item) => item.product_id === product.id);
        const stockQuantity = product.stock_qty ?? Infinity;
        const nextQty = existing ? existing.qty + quantity : quantity;

        if (stockQuantity !== Infinity && nextQty > stockQuantity) {
          throw new Error(`Only ${stockQuantity} ${product.name} left in stock.`);
        }

        const nextItems = existing
          ? prevItems.map((item) =>
              item.product_id === product.id
                ? { ...item, qty: item.qty + quantity }
                : item,
            )
          : [
              ...prevItems,
              {
                product_id: product.id,
                name: product.name,
                price: product.price,
                qty: Math.min(quantity, stockQuantity),
                image: product.images?.[0] ?? null,
                swatch: product.swatch ?? null,
                stock_qty: product.stock_qty ?? null,
              },
            ];

        writeCartStorage(nextItems);
        return nextItems;
      });
    },
    [],
  );

  const updateQuantity = useCallback((productId: string, qty: number) => {
    setItems((prevItems) => {
      const nextItems = prevItems
        .map((item) =>
          item.product_id === productId
            ? { ...item, qty: Math.max(0, Math.floor(qty)) }
            : item,
        )
        .filter((item) => item.qty > 0);

      writeCartStorage(nextItems);
      return nextItems;
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prevItems) => {
      const nextItems = prevItems.filter((item) => item.product_id !== productId);
      writeCartStorage(nextItems);
      return nextItems;
    });
  }, []);

  const clear = useCallback(() => {
    writeCartStorage([]);
    setItems([]);
  }, []);

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
