import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ShoppingBag, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CartToastItem = {
  id: string;
  productName: string;
  productImage?: string | null;
  qty: number;
};

type CartToastContextValue = {
  notify: (item: Omit<CartToastItem, "id">) => void;
};

// ─── Context ──────────────────────────────────────────────────────────────────

const CartToastContext = createContext<CartToastContextValue | null>(null);

export function useCartToast() {
  const ctx = useContext(CartToastContext);
  if (!ctx) throw new Error("useCartToast must be used inside CartToastProvider");
  return ctx;
}

// ─── Individual toast card ────────────────────────────────────────────────────

function ToastCard({
  item,
  onDismiss,
}: {
  item: CartToastItem;
  onDismiss: (id: string) => void;
}) {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  // Slide in on mount
  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const dismiss = useCallback(() => {
    setLeaving(true);
    setTimeout(() => onDismiss(item.id), 350);
  }, [item.id, onDismiss]);

  // Auto-dismiss after 3.5 s
  useEffect(() => {
    const timer = setTimeout(dismiss, 3500);
    return () => clearTimeout(timer);
  }, [dismiss]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        "flex items-center gap-3 w-80 max-w-[calc(100vw-2rem)]",
        "rounded-2xl bg-card shadow-[0_8px_32px_-8px_rgba(0,0,0,0.18)] border border-border/60",
        "p-3 pr-4 backdrop-blur-sm",
        "transition-all duration-350 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
        visible && !leaving
          ? "opacity-100 translate-x-0 scale-100"
          : "opacity-0 translate-x-8 scale-95",
      )}
    >
      {/* Product thumbnail or bag icon */}
      <div className="relative shrink-0">
        {item.productImage ? (
          <img
            src={item.productImage}
            alt={item.productName}
            className="w-14 h-14 rounded-xl object-cover border border-border/40"
          />
        ) : (
          <div className="w-14 h-14 rounded-xl bg-blush/30 grid place-items-center">
            <ShoppingBag className="w-6 h-6 text-primary" />
          </div>
        )}
        {/* Green check badge */}
        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary grid place-items-center shadow-md">
          <Check className="w-3 h-3 text-primary-foreground stroke-[3]" />
        </span>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground leading-none mb-1">
          Added to cart
        </p>
        <p className="text-sm font-semibold text-foreground truncate leading-snug">
          {item.productName}
        </p>
        {item.qty > 1 && (
          <p className="text-xs text-muted-foreground mt-0.5">Qty: {item.qty}</p>
        )}
      </div>

      {/* Dismiss */}
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss notification"
        className="shrink-0 grid place-items-center w-7 h-7 rounded-full hover:bg-accent transition-colors"
      >
        <X className="w-3.5 h-3.5 text-muted-foreground" />
      </button>
    </div>
  );
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CartToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<CartToastItem[]>([]);
  const counterRef = useRef(0);

  const notify = useCallback((item: Omit<CartToastItem, "id">) => {
    const id = `cart-toast-${++counterRef.current}`;
    setToasts((prev) => [...prev, { ...item, id }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <CartToastContext.Provider value={{ notify }}>
      {children}

      {/* Toast stack — bottom-right */}
      <div
        aria-label="Cart notifications"
        className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2 items-end pointer-events-none"
      >
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <ToastCard item={t} onDismiss={dismiss} />
          </div>
        ))}
      </div>
    </CartToastContext.Provider>
  );
}
