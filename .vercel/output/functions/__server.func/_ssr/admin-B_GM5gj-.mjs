import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useRouterState, e as useNavigate, L as Link, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { a as getSupabaseClient } from "./supabase-B6oNw5MC.mjs";
import { d as cn } from "./router-BoccmxA6.mjs";
import "../_libs/seroval.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./server-DGfOajJg.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/zod.mjs";
function AdminLayout() {
  const location = useRouterState((state) => state.location);
  const [activeSection, setActiveSection] = reactExports.useState("/admin");
  const [email, setEmail] = reactExports.useState(null);
  const [authChecked, setAuthChecked] = reactExports.useState(false);
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    let mounted = true;
    const supabase = getSupabaseClient();
    const adminEmail = "admin@peachcraft.com";
    supabase.auth.getUser().then(({
      data
    }) => {
      if (!mounted) return;
      const userEmail = data.user?.email ?? null;
      if (!userEmail || userEmail.toLowerCase() !== adminEmail.toLowerCase()) {
        navigate({
          to: "/login",
          search: {
            redirect: location.pathname
          }
        });
        return;
      }
      setEmail(userEmail);
      setAuthChecked(true);
    });
    return () => {
      mounted = false;
    };
  }, []);
  reactExports.useEffect(() => {
    const path = location?.pathname ?? "/admin";
    if (path === "/admin") {
      setActiveSection("/admin");
    } else if (path.startsWith("/admin/products")) {
      setActiveSection("/admin/products");
    } else if (path.startsWith("/admin/orders")) {
      setActiveSection("/admin/orders");
    } else if (path.startsWith("/admin/analytics")) {
      setActiveSection("/admin/analytics");
    }
  }, [location?.pathname]);
  location?.pathname ?? "/admin";
  const initial = email?.[0]?.toUpperCase() ?? "A";
  if (!authChecked) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full border-4 border-[var(--sage)] border-t-transparent animate-spin" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-h-screen lg:grid-cols-[280px_1fr]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "rounded-tr-[var(--radius)] rounded-br-[var(--radius)] bg-[var(--blush)] p-8 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 flex items-center gap-4 rounded-[var(--radius)] bg-[rgba(255,255,255,0.12)] p-4 shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-[var(--foreground)] text-[var(--background)]", children: initial }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-[var(--foreground)]", children: "Admin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[var(--foreground)]/80", children: "Peach Craft owner" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "space-y-2", children: [{
        to: "/admin",
        label: "Dashboard"
      }, {
        to: "/admin/products",
        label: "Products"
      }, {
        to: "/admin/orders",
        label: "Orders"
      }, {
        to: "/admin/analytics",
        label: "Analytics"
      }, {
        to: "/admin/website-settings",
        label: "Website Settings"
      }].map((item) => {
        const isActive = activeSection === item.to;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: item.to, onClick: () => setActiveSection(item.to), className: cn("block rounded-3xl px-4 py-3 text-sm font-semibold transition", isActive ? "bg-[var(--sage)] text-[var(--foreground)]" : "text-[var(--foreground)]/85 hover:bg-[var(--sage)] hover:text-[var(--foreground)]"), children: item.label }, item.to);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 border-t border-[var(--border)] pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: async () => {
        const supabase = getSupabaseClient();
        await supabase.auth.signOut();
        navigate({
          to: "/"
        });
      }, className: "inline-flex w-full items-center justify-center rounded-full bg-[var(--background)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] shadow-soft transition hover:bg-[var(--foreground)]/10", children: "Sign out" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "bg-[var(--background)] p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
  ] }) });
}
export {
  AdminLayout as component
};
