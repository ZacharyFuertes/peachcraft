import { createMiddleware } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

/**
 * Admin middleware — runs on the server for every /admin route.
 *
 * We use the anon key (NOT the service-role key) so that Supabase reads
 * the user's session from the request cookies. The service-role key bypasses
 * auth entirely and makes getUser() return null for cookie sessions.
 */
export const adminMiddleware = createMiddleware().server(async ({ next, request }) => {
  const url = new URL(request.url);

  const supabaseUrl = process.env.SUPABASE_URL ?? "";
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ?? "";

  if (!supabaseUrl || !supabaseAnonKey) {
    // Missing env vars — redirect to login rather than crashing
    throw redirect({ to: `/login?redirect=${encodeURIComponent(url.pathname)}` });
  }

  // Create a per-request client that forwards the cookie header so Supabase
  // can read the stored session token.
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
    },
    auth: {
      // Disable auto-refresh and storage on the server — we only want to
      // read the session once from the request cookies.
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });

  const { data, error } = await supabase.auth.getUser();
  const user = data?.user;

  if (error || !user) {
    throw redirect({ to: `/login?redirect=${encodeURIComponent(url.pathname)}` });
  }

  const adminEmail = process.env.ADMIN_EMAIL ?? "";
  if (!adminEmail || user.email !== adminEmail) {
    // Not the admin — send them back to the homepage
    throw redirect({ to: "/" });
  }

  return next();
});
