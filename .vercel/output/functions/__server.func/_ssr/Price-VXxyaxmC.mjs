import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { l as useCurrency, m as fetchPhpExchangeRates } from "./router-CN-wybRF.mjs";
function Price({ amountPHP, className }) {
  const { currency } = useCurrency();
  const [rates, setRates] = reactExports.useState(null);
  reactExports.useEffect(() => {
    let isMounted = true;
    async function loadRates() {
      if (currency.currencyCode === "PHP") {
        if (isMounted) {
          setRates({ PHP: 1 });
        }
        return;
      }
      try {
        const payload = await fetchPhpExchangeRates([currency.currencyCode]);
        if (isMounted) {
          setRates(payload);
        }
      } catch {
        if (isMounted) {
          setRates({ PHP: 1 });
        }
      }
    }
    void loadRates();
    return () => {
      isMounted = false;
    };
  }, [currency.currencyCode]);
  const isPhp = currency.currencyCode === "PHP";
  const rate = rates?.[currency.currencyCode] ?? 1;
  const convertedAmount = isPhp ? amountPHP : amountPHP * rate;
  const previewText = new Intl.NumberFormat(currency.locale ?? "en-US", {
    style: "currency",
    currency: currency.currencyCode,
    maximumFractionDigits: currency.currencyCode === "JPY" ? 0 : 2
  }).format(convertedAmount);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: previewText }),
    !isPhp && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-foreground/60", children: [
      "₱",
      amountPHP.toLocaleString("en-PH", { minimumFractionDigits: 2 }),
      " PHP actual charge"
    ] }),
    !isPhp && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] text-foreground/55", children: "Prices in other currencies are estimates only. You will be charged in PHP (₱) at checkout." })
  ] });
}
export {
  Price as P
};
