```
peachcraft/
├── .env.example
├── .env.local
├── .gitignore
├── .prettierignore
├── .prettierrc
├── bun.lock
├── bunfig.toml
├── components.json
├── eslint.config.js
├── package-lock.json
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md
├── REGISTRATION_SETUP_GUIDE.md
├── CART_AND_CHECKOUT_GUIDE.md
├── improvements.md
├── website-details.md
├── supabase-current-schema.md
│
├── .tanstack/
├── .vercel/
├── dist/
├── node_modules/
├── testing
│
├── sql/
│   └── migrations/
│       ├── 001_create_signup_attempts_and_carts.sql
│       ├── 002_create_cart_items_and_add_attempts.sql
│       └── 003_enable_rls_carts.sql
│
├── src/
│   ├── router.tsx
│   ├── routeTree.gen.ts
│   ├── server.ts
│   ├── start.ts
│   ├── styles.css
│   │
│   ├── assets/
│   │   └── icons/
│   │       └── logo.svg
│   │
│   ├── components/
│   │   ├── CartToast.tsx
│   │   ├── illustrations.tsx
│   │   ├── ProductCard.tsx
│   │   ├── SiteFooter.tsx
│   │   ├── SiteHeader.tsx
│   │   │
│   │   ├── admin/
│   │   │   └── ProductForm.tsx
│   │   │
│   │   └── ui/
│   │       ├── accordion.tsx
│   │       ├── alert-dialog.tsx
│   │       ├── alert.tsx
│   │       ├── aspect-ratio.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── breadcrumb.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── chart.tsx
│   │       ├── checkbox.tsx
│   │       ├── collapsible.tsx
│   │       ├── command.tsx
│   │       ├── context-menu.tsx
│   │       ├── dialog.tsx
│   │       ├── drawer.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── hover-card.tsx
│   │       ├── input-otp.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── menubar.tsx
│   │       ├── navigation-menu.tsx
│   │       ├── pagination.tsx
│   │       ├── popover.tsx
│   │       ├── progress.tsx
│   │       ├── radio-group.tsx
│   │       ├── resizable.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── slider.tsx
│   │       ├── sonner.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── toggle-group.tsx
│   │       ├── toggle.tsx
│   │       └── tooltip.tsx
│   │
│   ├── hooks/
│   │   └── use-mobile.tsx
│   │
│   ├── lib/
│   │   ├── adminMiddleware.ts
│   │   ├── cart.ts
│   │   ├── config.server.ts
│   │   ├── error-capture.ts
│   │   ├── error-page.ts
│   │   ├── supabase.ts
│   │   ├── utils.ts
│   │   └── api/
│   │       ├── example.functions.ts
│   │       ├── storeDetails.functions.ts
│   │       └── supabase.functions.ts
│   │
│   └── routes/
│       ├── __root.tsx
│       ├── about.tsx
│       ├── admin.tsx
│       ├── cart.tsx
│       ├── checkout.tsx
│       ├── contact.tsx
│       ├── index.tsx
│       ├── login.tsx
│       ├── shipping-policy.tsx
│       ├── shop.tsx
│       ├── signup.tsx
│       ├── verify-email.tsx
│       ├── README.md
│       │
│       └── admin/
│           ├── analytics.tsx
│           ├── index.tsx
│           ├── website-settings.tsx
│           ├── orders/
│           │   ├── $id.tsx
│           │   └── index.tsx
│           └── products/
│               ├── $id.tsx
│               ├── index.tsx
│               └── new.tsx
```
