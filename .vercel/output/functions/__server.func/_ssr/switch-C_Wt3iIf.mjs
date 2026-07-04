import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { R as Root, T as Thumb } from "../_libs/radix-ui__react-switch.mjs";
<<<<<<<< HEAD:.vercel/output/functions/__server.func/_ssr/switch-DZd8otfg.mjs
import { h as cn } from "./router-D98JWfRI.mjs";
========
import { h as cn } from "./router-CN-wybRF.mjs";
>>>>>>>> 8e9d1c4d806b4680033fc485fbb81fd36eb1433e:.vercel/output/functions/__server.func/_ssr/switch-C_Wt3iIf.mjs
const Switch = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    className: cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Thumb,
      {
        className: cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = Root.displayName;
export {
  Switch as S
};
