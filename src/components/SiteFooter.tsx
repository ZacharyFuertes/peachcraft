import { Link } from "@tanstack/react-router";
import { Instagram, Music2, Mail, Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer className="bg-sage-deep text-background mt-0">
      {/* Strong newsletter band */}
      <section className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-14 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-sm font-medium">
            <Sparkles className="w-4 h-4" aria-hidden /> New drops every month
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-display">
            Get notified when new crafts drop
          </h2>
          <p className="mt-3 text-background/75 max-w-xl mx-auto">
            Be the first to grab restocks and limited pieces before they sell out.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setDone(true);
            }}
            className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
          >
            <label htmlFor="newsletter" className="sr-only">Email address</label>
            <input
              id="newsletter"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@hello.com"
              className="flex-1 h-12 px-4 rounded-full bg-white/10 border border-white/20 placeholder:text-background/60 text-background focus:outline-none focus:ring-2 focus:ring-blush"
            />
            <button
              type="submit"
              className="h-12 px-6 rounded-full bg-blush text-blush-foreground font-semibold inline-flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-100 transition-transform shadow-soft"
            >
              {done ? "You're in! 🍑" : <>Join <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>
          <p className="mt-3 text-xs text-background/60">No spam, just shop updates.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 lg:grid-cols-3">
        <div>
          <div className="font-display text-2xl">
            <span>Peach</span> <span className="text-blush">Craft</span>
          </div>
          <p className="mt-3 text-background/75 max-w-xs">
            Handmade fake cakes, storage boxes &amp; clay crafts — made with love, one piece at a time. 🍑
          </p>
          <div className="mt-5 flex gap-2">
            {[
              { Icon: Instagram, label: "Instagram" },
              { Icon: Music2, label: "TikTok" },
              { Icon: Mail, label: "Email us" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid place-items-center w-11 h-11 rounded-full bg-white/10 hover:bg-blush hover:text-blush-foreground transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
          <div>
            <h3 className="font-semibold text-background mb-3">Shop</h3>
            <ul className="space-y-2 text-background/75">
              <li><Link to="/shop" className="hover:text-blush">All Crafts</Link></li>
              <li><Link to="/shop" className="hover:text-blush">Fake Cakes</Link></li>
              <li><Link to="/shop" className="hover:text-blush">Clay Figures</Link></li>
              <li><Link to="/shop" className="hover:text-blush">Storage Boxes</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-background mb-3">Support</h3>
            <ul className="space-y-2 text-background/75">
              <li><Link to="/shipping-policy" className="hover:text-blush">Shipping Policy</Link></li>
              <li><Link to="/shipping-policy" className="hover:text-blush">Refund Policy</Link></li>
              <li><Link to="/contact" className="hover:text-blush">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-background mb-3">Studio</h3>
            <ul className="space-y-2 text-background/75">
              <li><Link to="/about" className="hover:text-blush">About</Link></li>
              <li><a href="#" className="hover:text-blush">Process</a></li>
              <li><a href="#" className="hover:text-blush">Press</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-background/70">
          <p>© 2026 Peach Craft. All rights reserved. Made with 🍑 &amp; love.</p>
          <div className="flex gap-5">
            <Link to="/shipping-policy" className="hover:text-blush">Shipping Policy</Link>
            <Link to="/shipping-policy" className="hover:text-blush">Refund Policy</Link>
            <Link to="/contact" className="hover:text-blush">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
