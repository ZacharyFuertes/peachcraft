import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const getClientEnv = () => {
  const url =
    import.meta.env.VITE_SUPABASE_URL ??
    (typeof process !== "undefined" ? process.env.SUPABASE_URL : undefined);

  const anonKey =
    import.meta.env.VITE_SUPABASE_ANON_KEY ??
    (typeof process !== "undefined" ? process.env.SUPABASE_ANON_KEY : undefined);

  return { url, anonKey };
};

let supabaseClient: SupabaseClient | null = null;

const createSupabaseClient = (): SupabaseClient => {
  if (supabaseClient) {
    return supabaseClient;
  }

  const { url, anonKey } = getClientEnv();

  if (!url || !anonKey) {
    throw new Error(
      "Missing Supabase client environment variables. Set VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY (for browser) or SUPABASE_URL / SUPABASE_ANON_KEY (for server-side usage).",
    );
  }

  supabaseClient = createClient(url, anonKey);
  return supabaseClient;
};

export function getSupabaseClient() {
  return createSupabaseClient();
}

export type Product = {
  id: string;
  name: string;
  price: number;
  description?: string | null;
  images?: string[] | null;
  soldOut?: boolean;
  tag?: string | null;
  swatch?: string | null;
  category?: string | null;
  stock_qty?: number | null;
  is_active?: boolean | null;
  created_at?: string | null;
};

export type Profile = {
  id: string;
  username: string;
  email: string;
  address?: string | null;
  email_verified?: boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
};

type SupabaseServerOptions = {
  authOnly?: boolean;
};

export function getSupabaseServer(request?: Request, options?: SupabaseServerOptions) {
  const SUPABASE_URL_SERVER = typeof process !== "undefined" ? process.env.SUPABASE_URL : undefined;
  const SUPABASE_SERVICE_ROLE_KEY = typeof process !== "undefined" ? process.env.SUPABASE_SERVICE_ROLE_KEY : undefined;
  const SUPABASE_ANON_KEY_SERVER = typeof process !== "undefined" ? process.env.SUPABASE_ANON_KEY : undefined;

  if (!SUPABASE_URL_SERVER) {
    throw new Error("Missing SUPABASE_URL environment variable on the server.");
  }

  const authOnly = options?.authOnly ?? false;
  const key = authOnly ? SUPABASE_ANON_KEY_SERVER : SUPABASE_SERVICE_ROLE_KEY ?? SUPABASE_ANON_KEY_SERVER;

  if (!key) {
    throw new Error(
      authOnly
        ? "Missing Supabase anon server key. Set SUPABASE_ANON_KEY in your .env.local."
        : "Missing Supabase server key. Set SUPABASE_SERVICE_ROLE_KEY (admin) or SUPABASE_ANON_KEY in your .env.local."
    );
  }

  // Auto-detect the request from TanStack Start's AsyncLocalStorage context
  // when called inside a server function handler without an explicit request.
  if (!request) {
    try {
      const storageKey = Symbol.for("tanstack-start:start-storage-context");
      const storage = (globalThis as any)[storageKey];
      if (storage) {
        const ctx = storage.getStore();
        if (ctx?.request) {
          request = ctx.request;
        }
      }
    } catch {
      // Not running inside a TanStack Start request context
    }
  }

  return createClient(SUPABASE_URL_SERVER, key, {
    global: {
      headers: {
        cookie: request?.headers.get("cookie") ?? "",
      },
    },
    auth: authOnly
      ? {
          autoRefreshToken: false,
          persistSession: false,
          detectSessionInUrl: false,
        }
      : undefined,
  });
}

export async function seedProductsFromStatic(products: Product[]) {
  // Run once then delete.
  const supabase = getSupabaseServer();
  const mappedProducts = products.map((product) => ({
    name: product.name,
    price: product.price,
    description: product.description ?? null,
    images: product.images ?? [],
    swatch: product.swatch ?? null,
    category: product.category ?? null,
    tag: product.tag ?? null,
    stock_qty: product.soldOut ? 0 : product.stock_qty ?? 10,
    is_active: product.soldOut ? false : true,
  }));

  const { error } = await supabase.from("products").insert(mappedProducts);
  if (error) {
    throw error;
  }

  return { inserted: mappedProducts.length };
}