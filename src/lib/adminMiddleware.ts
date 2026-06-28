import { createMiddleware } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";
import { createServerClient } from "@supabase/ssr";

export const adminMiddleware = createMiddleware({
  type: "request",
}).server(async ({ request, next }) => {
  const url = new URL(request.url);

  const supabaseUrl = process.env.SUPABASE_URL ?? "";
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ?? "";

  if (!supabaseUrl || !supabaseAnonKey) {
    throw redirect({ to: "/login", search: { redirect: url.pathname } as any });
  }

  const cookiesToSet: { name: string; value: string; options: Record<string, any> }[] = [];

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        const cookie = request.headers.get("cookie") ?? "";
        if (!cookie) return [];
        return cookie.split("; ").filter(Boolean).map((c) => {
          const eq = c.indexOf("=");
          if (eq === -1) return { name: c.trim(), value: "" };
          return { name: c.slice(0, eq).trim(), value: c.slice(eq + 1).trim() };
        });
      },
      setAll(cookies) {
        cookiesToSet.push(...cookies);
      },
    },
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });

  const { data, error } = await supabase.auth.getUser();
  const user = data?.user;

  if (error || !user) {
    throw redirect({ to: "/login", search: { redirect: url.pathname } as any });
  }

  const adminEmail = process.env.ADMIN_EMAIL ?? "";
  if (!adminEmail || user.email !== adminEmail) {
    throw redirect({ to: "/" });
  }

  const result = await next();

  if (cookiesToSet.length > 0 && result?.response) {
    const response = result.response as Response;
    for (const { name, value, options } of cookiesToSet) {
      let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
      if (options.path) cookieStr += `; Path=${options.path}`;
      if (options.maxAge !== undefined) cookieStr += `; Max-Age=${options.maxAge}`;
      if (options.sameSite) {
        const v = typeof options.sameSite === "boolean" ? "strict" : options.sameSite;
        cookieStr += `; SameSite=${v}`;
      }
      if (options.secure) cookieStr += `; Secure`;
      if (options.httpOnly) cookieStr += `; HttpOnly`;
      response.headers.append("Set-Cookie", cookieStr);
    }
  }

  return result;
});
