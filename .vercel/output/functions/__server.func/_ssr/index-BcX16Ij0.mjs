import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { I as Input, A as Avatar, o as AvatarFallback, B as Badge, f as createSsrRpc } from "./router-yrh6O6LQ.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, P as Pagination, e as PaginationContent, f as PaginationItem, g as PaginationPrevious, h as PaginationLink, i as PaginationNext } from "./pagination-BS36P03Y.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-CgbbcQJd.mjs";
import { c as createServerFn } from "./server-COqVcV7o.mjs";
import "../_libs/seroval.mjs";
import { S as Search, K as ArrowUpDown, O as CircleCheck, Q as CircleX, a as ShoppingBag } from "../_libs/lucide-react.mjs";
import { f as format } from "../_libs/date-fns.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./supabase-BbYbDVIj.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/supabase__ssr.mjs";
import "../_libs/cookie.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-separator.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
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
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/radix-ui__react-collapsible.mjs";
import "../_libs/radix-ui__react-avatar.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
const getCustomers = createServerFn({
  method: "GET"
}).handler(createSsrRpc("fb1703cba41559b52c54b6b3eef2ea4d30b220b4e655707cba1496dfbfebb3b7"));
function getInitials(name) {
  return name.split(/\s+/).map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}
function formatPrice(price) {
  return `₱${price.toLocaleString("en-PH")}`;
}
function AdminCustomersPage() {
  const {
    data,
    isLoading,
    error
  } = useQuery({
    queryKey: ["admin-customers"],
    queryFn: getCustomers
  });
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [sortBy, setSortBy] = reactExports.useState("newest");
  const [page, setPage] = reactExports.useState(1);
  const pageSize = 10;
  const filtered = reactExports.useMemo(() => {
    if (!data) return [];
    let result = [...data];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((c) => c.username.toLowerCase().includes(q) || c.email.toLowerCase().includes(q));
    }
    result.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.username.localeCompare(b.username);
        case "orders_desc":
          return b.order_count - a.order_count;
        case "orders_asc":
          return a.order_count - b.order_count;
        case "spent_desc":
          return b.total_spent - a.total_spent;
        case "spent_asc":
          return a.total_spent - b.total_spent;
        case "newest":
        default:
          return new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime();
      }
    });
    return result;
  }, [data, searchQuery, sortBy]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);
  if (safePage !== page) setPage(safePage);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-gray-500", children: "Customers" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1 text-2xl font-bold text-gray-900", children: "All customers" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-gray-200" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-72", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Search customers...", value: searchQuery, onChange: (e) => {
          setSearchQuery(e.target.value);
          setPage(1);
        }, className: "pl-9 h-9" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: sortBy, onValueChange: (v) => {
        setSortBy(v);
        setPage(1);
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectTrigger, { className: "h-9 w-36", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "h-3.5 w-3.5 mr-1 text-gray-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Sort" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "newest", children: "Newest" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "name", children: "Name A-Z" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "spent_desc", children: "Spent ↓" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "spent_asc", children: "Spent ↑" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "orders_desc", children: "Orders ↓" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "orders_asc", children: "Orders ↑" })
        ] })
      ] }) })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl shadow-sm border p-6 space-y-4", children: Array.from({
      length: 5
    }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 bg-gray-100 rounded-md animate-pulse" }, i)) }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl shadow-sm border p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-600", children: error instanceof Error ? error.message : "Could not load customers." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-xl shadow-sm border", children: paginated.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-16 px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-6 w-6 text-gray-400" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "No customers found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Try adjusting your search" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-gray-50 border-b border-gray-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs uppercase tracking-wider text-gray-500 font-semibold h-10 px-4", children: "Customer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs uppercase tracking-wider text-gray-500 font-semibold h-10 px-4", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs uppercase tracking-wider text-gray-500 font-semibold h-10 px-4", children: "Orders" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs uppercase tracking-wider text-gray-500 font-semibold h-10 px-4", children: "Total spent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs uppercase tracking-wider text-gray-500 font-semibold h-10 px-4", children: "Last order" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs uppercase tracking-wider text-gray-500 font-semibold h-10 px-4", children: "Joined" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: paginated.map((customer) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "hover:bg-gray-50 transition-colors border-b border-gray-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-9 w-9", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-gray-100 text-gray-600 text-xs", children: getInitials(customer.username) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-gray-900", children: customer.username }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: customer.email })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "px-4 py-3", children: customer.email_verified ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
            "Verified"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "bg-amber-100 text-amber-700 hover:bg-amber-100 gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3 w-3" }),
            "Unverified"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm text-gray-700", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-3.5 w-3.5 text-gray-400" }),
            customer.order_count
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "px-4 py-3 text-sm text-gray-700 tabular-nums", children: customer.total_spent > 0 ? formatPrice(customer.total_spent) : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "px-4 py-3 text-sm text-gray-700", children: customer.last_order_date ? format(new Date(customer.last_order_date), "MMM d, yyyy") : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "px-4 py-3 text-sm text-gray-500", children: customer.created_at ? format(new Date(customer.created_at), "MMM d, yyyy") : "—" })
        ] }, customer.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-t border-gray-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500", children: [
          "Showing ",
          filtered.length === 0 ? 0 : (safePage - 1) * pageSize + 1,
          " ",
          "to",
          " ",
          Math.min(safePage * pageSize, filtered.length),
          " ",
          "of ",
          filtered.length,
          " customers"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Pagination, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PaginationContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationPrevious, { href: "#", onClick: (e) => {
            e.preventDefault();
            setPage(Math.max(1, safePage - 1));
          }, className: safePage <= 1 ? "pointer-events-none opacity-50" : "" }) }),
          Array.from({
            length: totalPages
          }, (_, i) => i + 1).filter((p) => {
            if (totalPages <= 7) return true;
            if (p === 1 || p === totalPages) return true;
            if (Math.abs(p - safePage) <= 1) return true;
            return false;
          }).map((p, idx, arr) => {
            const nodes = [];
            if (idx > 0 && p - arr[idx - 1] > 1) {
              nodes.push(/* @__PURE__ */ jsxRuntimeExports.jsx(PaginationItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-9 w-9 items-center justify-center text-sm text-gray-400", children: "..." }) }, `ellipsis-${p}`));
            }
            nodes.push(/* @__PURE__ */ jsxRuntimeExports.jsx(PaginationItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationLink, { href: "#", isActive: p === safePage, onClick: (e) => {
              e.preventDefault();
              setPage(p);
            }, children: p }) }, p));
            return nodes;
          }).flat(),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationNext, { href: "#", onClick: (e) => {
            e.preventDefault();
            setPage(Math.min(totalPages, safePage + 1));
          }, className: safePage >= totalPages ? "pointer-events-none opacity-50" : "" }) })
        ] }) })
      ] })
    ] }) }) })
  ] });
}
export {
  AdminCustomersPage as component
};
