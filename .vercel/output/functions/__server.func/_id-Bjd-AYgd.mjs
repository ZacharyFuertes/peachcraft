import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { e as useNavigate } from "./_libs/tanstack__react-router.mjs";
import { u as useQuery } from "./_libs/tanstack__react-query.mjs";
<<<<<<<< HEAD:.vercel/output/functions/__server.func/_id-CXR_2ohd.mjs
import { P as ProductForm } from "./_ssr/ProductForm-BxxRizAj.mjs";
import { F as Route$3, G as updateProduct, j as getProductById } from "./_ssr/router-D98JWfRI.mjs";
========
import { P as ProductForm } from "./_ssr/ProductForm-Bi5Ss1oC.mjs";
import { H as Route$3, J as updateProduct, j as getProductById } from "./_ssr/router-CN-wybRF.mjs";
>>>>>>>> 8e9d1c4d806b4680033fc485fbb81fd36eb1433e:.vercel/output/functions/__server.func/_id-Bjd-AYgd.mjs
import "./_libs/browser-image-compression.mjs";
import "./_libs/seroval.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_libs/isbot.mjs";
import "./_libs/tanstack__query-core.mjs";
import "./_ssr/supabase-BbYbDVIj.mjs";
import "./_libs/supabase__supabase-js.mjs";
import "./_libs/supabase__postgrest-js.mjs";
import "./_libs/supabase__realtime-js.mjs";
import "./_libs/supabase__phoenix.mjs";
import "./_libs/supabase__storage-js.mjs";
import "./_libs/iceberg-js.mjs";
import "./_libs/supabase__auth-js.mjs";
import "tslib";
import "./_libs/supabase__functions-js.mjs";
import "./_libs/supabase__ssr.mjs";
import "./_libs/cookie.mjs";
import "./_libs/radix-ui__react-label.mjs";
import "./_libs/radix-ui__react-primitive.mjs";
import "./_libs/radix-ui__react-slot.mjs";
import "./_libs/radix-ui__react-compose-refs.mjs";
import "./_libs/class-variance-authority.mjs";
import "./_libs/clsx.mjs";
<<<<<<<< HEAD:.vercel/output/functions/__server.func/_id-CXR_2ohd.mjs
import "./_ssr/switch-DZd8otfg.mjs";
========
import "./_ssr/switch-C_Wt3iIf.mjs";
>>>>>>>> 8e9d1c4d806b4680033fc485fbb81fd36eb1433e:.vercel/output/functions/__server.func/_id-Bjd-AYgd.mjs
import "./_libs/radix-ui__react-switch.mjs";
import "./_libs/radix-ui__primitive.mjs";
import "./_libs/radix-ui__react-context.mjs";
import "./_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "./_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "./_libs/radix-ui__react-use-previous.mjs";
import "./_libs/radix-ui__react-use-size.mjs";
<<<<<<<< HEAD:.vercel/output/functions/__server.func/_id-CXR_2ohd.mjs
import "./_ssr/server-BWmwJzJ_.mjs";
========
import "./_ssr/productCategories-DYShMXc1.mjs";
import "./_ssr/server-BO7pyA8t.mjs";
>>>>>>>> 8e9d1c4d806b4680033fc485fbb81fd36eb1433e:.vercel/output/functions/__server.func/_id-Bjd-AYgd.mjs
import "node:async_hooks";
import "./_libs/h3-v2.mjs";
import "./_libs/rou3.mjs";
import "./_libs/srvx.mjs";
import "./_libs/tailwind-merge.mjs";
import "./_libs/radix-ui__react-separator.mjs";
import "./_libs/radix-ui__react-dialog.mjs";
import "./_libs/radix-ui__react-id.mjs";
import "./_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "./_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "./_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "./_libs/radix-ui__react-focus-scope.mjs";
import "./_libs/radix-ui__react-portal.mjs";
import "./_libs/radix-ui__react-presence.mjs";
import "./_libs/radix-ui__react-focus-guards.mjs";
import "./_libs/react-remove-scroll.mjs";
import "./_libs/react-remove-scroll-bar.mjs";
import "./_libs/react-style-singleton.mjs";
import "./_libs/get-nonce.mjs";
import "./_libs/use-sidecar.mjs";
import "./_libs/use-callback-ref.mjs";
import "./_libs/aria-hidden.mjs";
import "./_libs/radix-ui__react-tooltip.mjs";
import "./_libs/radix-ui__react-popper.mjs";
import "./_libs/floating-ui__react-dom.mjs";
import "./_libs/floating-ui__dom.mjs";
import "./_libs/floating-ui__core.mjs";
import "./_libs/floating-ui__utils.mjs";
import "./_libs/radix-ui__react-arrow.mjs";
import "./_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "./_libs/radix-ui__react-collapsible.mjs";
import "./_libs/radix-ui__react-avatar.mjs";
import "./_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "./_libs/use-sync-external-store.mjs";
import "./_libs/radix-ui__react-dropdown-menu.mjs";
import "./_libs/radix-ui__react-menu.mjs";
import "./_libs/radix-ui__react-collection.mjs";
import "./_libs/radix-ui__react-direction.mjs";
import "./_libs/radix-ui__react-roving-focus.mjs";
import "./_libs/lucide-react.mjs";
import "./_libs/zod.mjs";
function EditProductPage() {
  const params = Route$3.useParams();
  const navigate = useNavigate();
  const [error, setError] = reactExports.useState(null);
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const productId = params.id;
  const {
    data,
    isLoading,
    error: loadError
  } = useQuery({
    queryKey: ["admin-product", productId],
    queryFn: () => getProductById({
      data: {
        id: productId
      }
    }),
    enabled: Boolean(productId),
    retry: false
  });
  reactExports.useEffect(() => {
    if (loadError) {
      const message = loadError instanceof Error ? loadError.message : "Unable to load product.";
      if (message.includes("not found")) {
        navigate({
          to: "/admin/products"
        });
      }
      setError(message);
    }
  }, [loadError, navigate]);
  const handleUpdate = async (formData, accessToken) => {
    setError(null);
    setIsSaving(true);
    try {
      await updateProduct({
        data: {
          id: params.id,
          ...formData,
          accessToken
        }
      });
      navigate({
        to: "/admin/products",
        search: {
          updated: "true"
        }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update product.");
    } finally {
      setIsSaving(false);
    }
  };
  if (!productId) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6 rounded-3xl bg-[var(--card)] p-8 shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#f87171]", children: "Invalid product link. Please go back to the product list." }) });
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-96 rounded-3xl bg-[var(--card)] shadow-soft" });
  }
  if (loadError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6 rounded-3xl bg-[var(--card)] p-8 shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#f87171]", children: error ?? "Unable to load this product." }) });
  }
  if (!data) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#f87171]", children: "Product not found." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm uppercase tracking-[0.25em] text-[var(--foreground)]/70", children: "Products" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 text-4xl font-semibold text-[var(--foreground)]", children: "Edit product" })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl bg-[#f87171]/10 p-4 text-sm text-[#991b1b]", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl bg-[var(--card)] p-8 shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductForm, { initialData: data, onSubmit: handleUpdate, isLoading: isSaving }) })
  ] });
}
export {
  EditProductPage as component
};
