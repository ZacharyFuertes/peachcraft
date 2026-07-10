export type CurrencyCode = "PHP" | "USD" | "EUR" | "JPY" | "GBP" | "AUD" | "CAD" | "SGD" | "KRW" | "CNY";

export type CurrencyInfo = {
  code: CurrencyCode;
  label: string;
  symbol: string;
  locale: string;
};

export const CURRENCIES: CurrencyInfo[] = [
  { code: "PHP", label: "Philippine Peso", symbol: "₱", locale: "en-PH" },
  { code: "USD", label: "US Dollar", symbol: "$", locale: "en-US" },
  { code: "EUR", label: "Euro", symbol: "€", locale: "de-DE" },
  { code: "GBP", label: "British Pound", symbol: "£", locale: "en-GB" },
  { code: "JPY", label: "Japanese Yen", symbol: "¥", locale: "ja-JP" },
  { code: "KRW", label: "South Korean Won", symbol: "₩", locale: "ko-KR" },
  { code: "CNY", label: "Chinese Yuan", symbol: "¥", locale: "zh-CN" },
  { code: "AUD", label: "Australian Dollar", symbol: "A$", locale: "en-AU" },
  { code: "CAD", label: "Canadian Dollar", symbol: "C$", locale: "en-CA" },
  { code: "SGD", label: "Singapore Dollar", symbol: "S$", locale: "en-SG" },
];

const BASE_CURRENCY = "PHP" as const;

const CONVERSION_RATES: Record<CurrencyCode, number> = {
  PHP: 1,
  USD: 0.017,
  EUR: 0.016,
  GBP: 0.014,
  JPY: 2.64,
  KRW: 24.19,
  CNY: 0.12,
  AUD: 0.027,
  CAD: 0.024,
  SGD: 0.023,
};

export function convertPrice(priceInPHP: number, targetCurrency: CurrencyCode): number {
  const rate = CONVERSION_RATES[targetCurrency] ?? 1;
  return priceInPHP * rate;
}

export function formatConvertedPrice(priceInPHP: number, targetCurrency: CurrencyCode): string {
  const converted = convertPrice(priceInPHP, targetCurrency);
  const info = CURRENCIES.find((c) => c.code === targetCurrency) ?? CURRENCIES[0];

  if (targetCurrency === "JPY" || targetCurrency === "KRW") {
    return `${info.symbol}${Math.round(converted).toLocaleString(info.locale)}`;
  }

  return `${info.symbol}${converted.toLocaleString(info.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatBasePrice(price: number): string {
  return `₱${price.toLocaleString("en-PH")} PHP`;
}
