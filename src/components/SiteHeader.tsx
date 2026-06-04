import { Link, useRouterState } from "@tanstack/react-router";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/shipping-policy", label: "Shipping & Policy" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <>
      {/* Announcement bars */}
      <div className="bg-primary text-primary-foreground text-sm py-2 text-center font-medium">
        <span aria-hidden>🍰</span> Shop is OPEN for all orders <span aria-hidden>🌸</span>
      </div>
      <div className="bg-blush text-blush-foreground text-sm py-2 text-center font-medium relative overflow-hidden">
        <span className="relative z-10">
          Free shipping on orders ₱1,000+ <span aria-hidden>🍑</span> mix &amp; match your fave crafts!
        </span>
        <span className="absolute inset-0 marquee-strip pointer-events-none" aria-hidden />
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300 backdrop-blur-md",
          scrolled
            ? "bg-background/85 border-b border-border shadow-soft"
            : "bg-background/60",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2 group" aria-label="Peach Craft home">
              <span
                className="grid place-items-center w-10 h-10 rounded-full bg-blush text-xl shadow-soft group-hover:animate-wiggle"
                aria-hidden
              >
                🎂
              </span>
              <span className="font-display text-2xl">
                <span className="text-brown">Peach</span>{" "}
                <span className="text-primary">Craft</span>
              </span>
            </Link>

            <nav aria-label="Primary" className="hidden lg:flex items-center gap-1">
              {nav.map((item) => {
                const active =
                  item.to === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium rounded-full transition-colors",
                      "hover:text-primary",
                      active ? "text-primary" : "text-foreground/80",
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-primary origin-left transition-transform duration-300",
                        active ? "scale-x-100" : "scale-x-0",
                      )}
                      aria-hidden
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Search"
                className="grid place-items-center w-11 h-11 rounded-full hover:bg-accent transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                type="button"
                aria-label="Cart, 0 items"
                className="grid place-items-center w-11 h-11 rounded-full hover:bg-accent transition-colors relative"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blush" aria-hidden />
              </button>
              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="lg:hidden grid place-items-center w-11 h-11 rounded-full hover:bg-accent"
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {open && (
          <nav
            aria-label="Mobile"
            className="lg:hidden border-t border-border bg-background/95 backdrop-blur animate-fade-in"
          >
            <ul className="px-4 py-2">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="block px-3 py-3 rounded-lg text-base font-medium hover:bg-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
