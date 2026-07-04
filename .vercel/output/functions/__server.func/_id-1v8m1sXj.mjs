import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { e as useNavigate } from "./_libs/tanstack__react-router.mjs";
import { u as useQuery } from "./_libs/tanstack__react-query.mjs";
import { J as Route, h as cn, L as updateOrderStatus, K as getOrderDetails } from "./_ssr/router-D98JWfRI.mjs";
import "./_libs/seroval.mjs";
import { f as format } from "./_libs/date-fns.mjs";
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
import "./_ssr/server-BWmwJzJ_.mjs";
import "node:async_hooks";
import "./_libs/h3-v2.mjs";
import "./_libs/rou3.mjs";
import "./_libs/srvx.mjs";
import "./_libs/clsx.mjs";
import "./_libs/tailwind-merge.mjs";
import "./_libs/radix-ui__react-slot.mjs";
import "./_libs/radix-ui__react-compose-refs.mjs";
import "./_libs/class-variance-authority.mjs";
import "./_libs/radix-ui__react-separator.mjs";
import "./_libs/radix-ui__react-primitive.mjs";
import "./_libs/radix-ui__react-dialog.mjs";
import "./_libs/radix-ui__primitive.mjs";
import "./_libs/radix-ui__react-context.mjs";
import "./_libs/radix-ui__react-id.mjs";
import "./_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "./_libs/@radix-ui/react-use-controllable-state+[...].mjs";
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
import "./_libs/radix-ui__react-use-size.mjs";
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
const statusOptions = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
const statusColors = {
  pending: "bg-[var(--blush)] text-[var(--foreground)]",
  confirmed: "bg-[var(--sage)] text-[var(--foreground)]",
  shipped: "bg-[var(--sage-deep)] text-[var(--foreground)]",
  delivered: "bg-[var(--cream)] text-[var(--foreground)]",
  cancelled: "bg-[#f87171] text-[var(--foreground)]"
};
function AdminOrderDetailPage() {
  const params = Route.useParams();
  const navigate = useNavigate();
  const [status, setStatus] = reactExports.useState(statusOptions[0]);
  const [error, setError] = reactExports.useState(null);
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const {
    data,
    isLoading,
    error: loadError
  } = useQuery({
    queryKey: ["admin-order", params.id],
    queryFn: () => getOrderDetails({
      data: {
        id: params.id
      }
    }),
    enabled: Boolean(params.id)
  });
  reactExports.useEffect(() => {
    if (data) {
      setStatus(data.status);
    }
  }, [data]);
  reactExports.useEffect(() => {
    if (loadError) {
      const message = loadError instanceof Error ? loadError.message : "Unable to load order.";
      if (message.includes("not found")) {
        navigate({
          to: "/admin/orders"
        });
      }
      setError(message);
    }
  }, [loadError, navigate]);
  const handleStatusUpdate = async () => {
    if (!data) return;
    setError(null);
    setIsSaving(true);
    try {
      await updateOrderStatus({
        data: {
          id: data.id,
          status
        }
      });
      navigate({
        to: "/admin/orders"
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status.");
    } finally {
      setIsSaving(false);
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-96 rounded-3xl bg-[var(--card)] shadow-soft" });
  }
  if (!data) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#f87171]", children: "Order not found." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm uppercase tracking-[0.25em] text-[var(--foreground)]/70", children: [
          "Order #",
          data.id.slice(0, 8)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 text-4xl font-semibold text-[var(--foreground)]", children: "Order details" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl bg-[var(--card)] px-5 py-3 shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("inline-flex rounded-full px-3 py-1 text-sm font-semibold", statusColors[data.status] ?? "bg-[var(--foreground)] text-[var(--background)]"), children: data.status }) })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl bg-[#f87171]/10 p-4 text-sm text-[#991b1b]", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[1.3fr_0.7fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-[var(--card)] p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[var(--foreground)]/70", children: "Customer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-lg font-semibold text-[var(--foreground)]", children: data.customer.name ?? "Customer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[var(--foreground)]/80", children: data.customer.email })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[var(--foreground)]/70", children: "Order placed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-lg font-semibold text-[var(--foreground)]", children: format(new Date(data.created_at), "MMM d, yyyy") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-[var(--foreground)]/80", children: [
              "Total: ₱",
              data.total_amount.toLocaleString("en-PH")
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-3xl bg-[var(--background)] p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[var(--foreground)]/70", children: "Shipping address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-[var(--foreground)]", children: data.shipping_address?.street ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-[var(--foreground)]/80", children: [
            data.shipping_address?.city ?? "",
            ", ",
            data.shipping_address?.province ?? "",
            " ",
            data.shipping_address?.zip ?? ""
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-[var(--card)] p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-[var(--foreground)]", children: "Update status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mt-4 block text-sm font-semibold text-[var(--foreground)]/80", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: status, onChange: (event) => setStatus(event.target.value), className: "mt-2 w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-4 py-3 font-sans text-[var(--foreground)] outline-none", children: statusOptions.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: option, className: "bg-[var(--card)] text-[var(--foreground)]", children: option.charAt(0).toUpperCase() + option.slice(1) }, option)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleStatusUpdate, disabled: isSaving, className: "mt-5 inline-flex w-full items-center justify-center rounded-full bg-[var(--sage)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] shadow-soft hover:bg-[var(--sage-deep)] disabled:opacity-50", children: isSaving ? "Updating..." : "Update status" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-[var(--card)] p-6 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-[var(--foreground)]", children: "Items" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 overflow-hidden rounded-3xl border border-[var(--border)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[var(--background)] text-[var(--foreground)]/75", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-4", children: "Product" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-4", children: "Qty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-4", children: "Price" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-4", children: "Line total" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: data.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-[var(--border)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-4 flex items-center gap-3 text-[var(--foreground)]", children: [
            item.product_image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.product_image, alt: item.product_name, className: "h-12 w-12 rounded-3xl object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-3xl bg-[var(--background)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.product_name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 text-[var(--foreground)]", children: item.qty }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-4 text-[var(--foreground)]", children: [
            "₱",
            item.price_at_purchase.toLocaleString("en-PH")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-4 text-[var(--foreground)]", children: [
            "₱",
            (item.qty * item.price_at_purchase).toLocaleString("en-PH")
          ] })
        ] }, item.id)) })
      ] }) })
    ] })
  ] });
}
export {
  AdminOrderDetailPage as component
};
