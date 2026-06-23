import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
const getClientEnv = () => {
  const url = "https://xbfimdcxrombepkthigx.supabase.co";
  const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhiZmltZGN4cm9tYmVwa3RoaWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3MTkzMjcsImV4cCI6MjA5NjI5NTMyN30.OU1h4CUN6w_9-GTNwEYqFAmWCADAvSAkPLiOok4fRBU";
  return { url, anonKey };
};
let supabaseClient = null;
const createSupabaseClient = () => {
  if (supabaseClient) {
    return supabaseClient;
  }
  const { url, anonKey } = getClientEnv();
  supabaseClient = createClient(url, anonKey);
  return supabaseClient;
};
function getSupabaseClient() {
  return createSupabaseClient();
}
function getSupabaseServer(request, options) {
  const SUPABASE_URL_SERVER = typeof process !== "undefined" ? process.env.SUPABASE_URL : void 0;
  const SUPABASE_SERVICE_ROLE_KEY = typeof process !== "undefined" ? process.env.SUPABASE_SERVICE_ROLE_KEY : void 0;
  const SUPABASE_ANON_KEY_SERVER = typeof process !== "undefined" ? process.env.SUPABASE_ANON_KEY : void 0;
  if (!SUPABASE_URL_SERVER) {
    throw new Error("Missing SUPABASE_URL environment variable on the server.");
  }
  const authOnly = options?.authOnly ?? false;
  const key = authOnly ? SUPABASE_ANON_KEY_SERVER : SUPABASE_SERVICE_ROLE_KEY ?? SUPABASE_ANON_KEY_SERVER;
  if (!key) {
    throw new Error(
      authOnly ? "Missing Supabase anon server key. Set SUPABASE_ANON_KEY in your .env.local." : "Missing Supabase server key. Set SUPABASE_SERVICE_ROLE_KEY (admin) or SUPABASE_ANON_KEY in your .env.local."
    );
  }
  if (!request) {
    try {
      const storageKey = /* @__PURE__ */ Symbol.for("tanstack-start:start-storage-context");
      const storage = globalThis[storageKey];
      if (storage) {
        const ctx = storage.getStore();
        if (ctx?.request) {
          request = ctx.request;
        }
      }
    } catch {
    }
  }
  return createClient(SUPABASE_URL_SERVER, key, {
    global: {
      headers: {
        cookie: request?.headers.get("cookie") ?? ""
      }
    },
    auth: authOnly ? {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false
    } : void 0
  });
}
export {
  getSupabaseClient as a,
  getSupabaseServer as g
};
