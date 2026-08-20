"use client";

import { Fragment, useState, useEffect, useCallback, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Bell, LogOut, Settings, ShoppingCart, Package, AlertTriangle, LayoutDashboard, Users, BarChart3, Globe, CreditCard, Loader2 } from "lucide-react";
import { useRouterState, useNavigate, Link } from "@tanstack/react-router";
import { clearAuthCookies, getSupabaseClient } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { getAdminNotifications, type AdminNotificationsResponse } from "@/lib/api/supabase.functions";
import { toast } from "sonner";

function getBreadcrumbs(pathname: string): { label: string; href?: string }[] {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs: { label: string; href?: string }[] = [];

  if (segments[0] === "admin") {
    crumbs.push({ label: "Dashboard", href: "/admin" });
    if (segments.length > 1) {
      for (let i = 1; i < segments.length; i++) {
        const label = segments[i].charAt(0).toUpperCase() + segments[i].slice(1).replace(/-/g, " ");
        const href = "/" + segments.slice(0, i + 1).join("/");
        if (i === segments.length - 1) {
          crumbs.push({ label });
        } else {
          crumbs.push({ label, href });
        }
      }
    }
  } else {
    crumbs.push({ label: "Dashboard" });
  }

  return crumbs;
}

const notificationIcons: Record<string, typeof Bell> = {
  new_order: ShoppingCart,
  pending_order: AlertTriangle,
  low_stock: Package,
};

function NotificationDot() {
  return <span className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-red-500" />;
}

const searchPages = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Order Tracking", href: "/admin/orders/tracking", icon: ShoppingCart },
  { label: "Returns", href: "/admin/orders/returns", icon: AlertTriangle },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Payments", href: "/admin/payments", icon: CreditCard },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Website Settings", href: "/admin/website-settings", icon: Globe },
];

export function Header() {
  const { location } = useRouterState();
  const navigate = useNavigate();
  const pathname = location.pathname ?? "/admin";
  const breadcrumbs = getBreadcrumbs(pathname);
  const [searchOpen, setSearchOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const { user: authUser } = useAuth();
  const sessionUser = authUser;
  const user = sessionUser
    ? {
        name: sessionUser.user_metadata?.full_name ?? sessionUser.email?.split("@")[0] ?? "Admin",
        email: sessionUser.email ?? "admin@peachcraft.com",
        initials: (sessionUser.user_metadata?.full_name ?? sessionUser.email?.split("@")[0] ?? "Admin")
          .split(" ")
          .map((n: string) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase(),
      }
    : null;

  const { data: notifData } = useQuery<AdminNotificationsResponse>({
    queryKey: ["admin-notifications"],
    queryFn: getAdminNotifications,
    refetchInterval: 30_000,
  });

  const totalCount = notifData?.totalCount ?? 0;

  const handleSignOut = () => {
    // 1. Clear local session FIRST — synchronously, before any network call.
    const prefixes = ["sb-", "supabase-"];
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key && prefixes.some((p) => key.startsWith(p))) {
        localStorage.removeItem(key);
      }
    }
    // Clear the admin token cookie used by adminMiddleware
    document.cookie = "sb-admin-token=; path=/; max-age=0; SameSite=Lax";
    clearAuthCookies();

    // 2. Fire best-effort server revocation — detached, no await, no timeout.
    //    The UI must never wait on this or change behavior based on its outcome.
    getSupabaseClient().auth.signOut().catch(() => {});

    // 3. Discard the cached client so the next getSupabaseClient() call
    //    constructs a fresh instance with a fresh internal lock.
    delete (window as any).__peachcraft_supabase;

    // 4. Notify AuthProvider to sync its context.
    window.dispatchEvent(new Event("peachcraft-auth-cleared"));

    // 5. Navigate away — the user is always logged out locally regardless
    //    of whether the server revocation call ever completes.
    setSigningOut(false);
    navigate({ to: "/" });
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
      <SidebarTrigger className="-ml-1" />

      <Separator orientation="vertical" className="mr-2 h-4" />

      <div className="min-w-0 flex-1 truncate">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, i) => (
            <Fragment key={i}>
              <BreadcrumbItem>
                {crumb.href ? (
                  <BreadcrumbLink asChild>
                    <Link to={crumb.href}>{crumb.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="truncate">{crumb.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {i < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      </div>

      <div className="ml-auto flex items-center gap-1 sm:gap-3">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSearchOpen(true)}>
          <Search className="h-5 w-5" />
        </Button>
        <Popover open={searchOpen} onOpenChange={setSearchOpen}>
          <PopoverTrigger asChild>
            <div className="relative hidden md:flex items-center cursor-pointer" onClick={() => setSearchOpen(!searchOpen)}>
              <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="h-9 w-48 lg:w-64 rounded-lg pl-8 text-sm cursor-pointer"
                readOnly
              />
              <kbd className="absolute right-2.5 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end" sideOffset={8} onOpenAutoFocus={(e) => e.preventDefault()}>
            <Command>
              <CommandInput placeholder="Search pages..." />
              <CommandList>
                <CommandEmpty>No pages found.</CommandEmpty>
                <CommandGroup heading="Pages">
                  {searchPages.map((page) => {
                    const Icon = page.icon;
                    return (
                      <CommandItem
                        key={page.href}
                        value={page.label}
                        onSelect={() => {
                          setSearchOpen(false);
                          navigate({ to: page.href as any });
                        }}
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        {page.label}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {totalCount > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-[10px] font-medium flex items-center justify-center">
                  {totalCount > 99 ? "99+" : totalCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              {totalCount > 0 && (
                <span className="text-xs font-normal text-muted-foreground">{totalCount} total</span>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ScrollArea className="max-h-[60vh]">
              {notifData && notifData.notifications.length > 0 ? (
                notifData.notifications.map((n) => {
                  const Icon = notificationIcons[n.type] ?? Bell;
                  const safeLink = n.link?.startsWith("/") ? n.link : "/admin";
                  return (
                    <DropdownMenuItem key={n.id} asChild className="cursor-pointer">
                      <Link to={safeLink as any} className="flex items-start gap-3 px-3 py-2.5">
                        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted">
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{n.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{n.subtitle}</p>
                        </div>
                        {n.type === "pending_order" && <NotificationDot />}
                      </Link>
                    </DropdownMenuItem>
                  );
                })
              ) : (
                <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                  No new notifications
                </div>
              )}
            </ScrollArea>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/admin/orders" className="justify-center text-xs text-muted-foreground">
                View all orders
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{user?.initials ?? "PC"}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>{user?.name ?? "Peach Craft"}</span>
                <span className="text-xs font-normal text-muted-foreground">{user?.email ?? "admin@peachcraft.com"}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/admin/website-settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} disabled={signingOut}>
              {signingOut ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="mr-2 h-4 w-4" />
              )}
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
