import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { CURRENCIES, formatConvertedPrice, type CurrencyCode } from "./currency";

type CurrencyContextValue = {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (priceInPHP: number) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

const STORAGE_KEY = "peachcraft-currency";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    if (typeof window === "undefined") return "PHP";
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored && CURRENCIES.some((c) => c.code === stored)) return stored as CurrencyCode;
    } catch {}
    return "PHP";
  });

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {}
  };

  const formatPrice = (priceInPHP: number) => formatConvertedPrice(priceInPHP, currency);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used inside CurrencyProvider");
  return ctx;
}
