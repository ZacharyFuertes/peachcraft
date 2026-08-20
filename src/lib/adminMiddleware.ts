import { createMiddleware } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

/** Parse a raw Cookie header into name→value pairs. */
function parseCookieHeader(header: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const part of header.split(";")) {
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    const name = part.slice(0, eq).trim();
    const value = part.slice(eq + 1).trim();
    if (name) map[name] = decodeURIComponent(value);
  }
  return map;
}

export const adminMiddleware = createMiddleware({
  type: "request",
}).server(async ({ request, next }) => {
  const url = new URL(request.url);

  const supabaseUrl = process.env.SUPABASE_URL ?? "";
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ?? "";

  if (!supabaseUrl || !supabaseAnonKey) {
    throw redirect({ to: "/login", search: { redirect: url.pathname } as any });
  }

  // The browser Supabase client stores sessions in localStorage (not HTTP cookies),
  // so the old createServerClient / cookie approach always got an empty cookie jar.
  // Instead, the login page writes a lightweight "sb-admin-token" cookie containing
  // the access_token, and we verify it here with supabase.auth.getUser(token).
  const cookieHeader = request.headers.get("cookie") ?? "";
  const cookies = parseCookieHeader(cookieHeader);
  const accessToken = cookies["sb-admin-token"] ?? "";

  if (!accessToken) {
    throw redirect({ to: "/login", search: { redirect: url.pathname } as any });
  }

  // Use a plain createClient (anon key) and verify the JWT directly.
  // getUser(jwt) validates the token server-side without needing cookies.
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  });

  const { data, error } = await supabase.auth.getUser(accessToken);
  const user = data?.user;

  if (error || !user) {
    throw redirect({ to: "/login", search: { redirect: url.pathname } as any });
  }

  const adminEmail = process.env.ADMIN_EMAIL ?? "";
  if (!adminEmail || user.email !== adminEmail) {
    throw redirect({ to: "/" });
  }

  return next();
});
