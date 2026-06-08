import { useEffect, useState } from "react";
import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { adminMiddleware } from "@/lib/adminMiddleware";
import { getSupabaseClient } from "@/lib/supabase";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  middleware: [adminMiddleware],
  component: AdminLayout,
});

function AdminLayout() {
  const location = useRouterState((state) => state.location);
  const [activeSection, setActiveSection] = useState("/admin");
  const [email, setEmail] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const supabase = getSupabaseClient();
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL ?? "";

    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;

      const userEmail = data.user?.email ?? null;

      // If no session or not the admin email, redirect to login
      if (!userEmail || (adminEmail && userEmail.toLowerCase() !== adminEmail.toLowerCase())) {
        navigate({ to: "/login", search: { redirect: location.pathname } });
        return;
      }

      setEmail(userEmail);
      setAuthChecked(true);
    });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
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
  }, [location]);

  const activePath = location?.pathname ?? "/admin";
  const initial = email?.[0]?.toUpperCase() ?? "A";

  // Show nothing while checking auth to avoid flash of admin UI
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-[var(--sage)] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="rounded-tr-[var(--radius)] rounded-br-[var(--radius)] bg-[var(--blush)] p-8 shadow-soft">
          <div className="mb-10 flex items-center gap-4 rounded-[var(--radius)] bg-[rgba(255,255,255,0.12)] p-4 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--foreground)] text-[var(--background)]">
              {initial}
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--foreground)]">Admin</p>
              <p className="text-xs text-[var(--foreground)]/80">Peach Craft owner</p>
            </div>
          </div>

          <nav className="space-y-2">
            {[
              { to: "/admin", label: "Dashboard" },
              { to: "/admin/products", label: "Products" },
              { to: "/admin/orders", label: "Orders" },
              { to: "/admin/analytics", label: "Analytics" },
            ].map((item) => {
              const isActive = activeSection === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setActiveSection(item.to)}
                  className={cn(
                    "block rounded-3xl px-4 py-3 text-sm font-semibold transition",
                    isActive
                      ? "bg-[var(--sage)] text-[var(--foreground)]"
                      : "text-[var(--foreground)]/85 hover:bg-[var(--foreground)]/10",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-10 border-t border-[var(--border)] pt-6">
            <button
              type="button"
              onClick={async () => {
                const supabase = getSupabaseClient();
                await supabase.auth.signOut();
                navigate({ to: "/" });
              }}
              className="inline-flex w-full items-center justify-center rounded-full bg-[var(--background)] px-4 py-3 text-sm font-semibold text-[var(--foreground)] shadow-soft transition hover:bg-[var(--foreground)]/10"
            >
              Sign out
            </button>
          </div>
        </aside>

        <main className="bg-[var(--background)] p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
