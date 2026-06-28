import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function getSecurityHeaders(): Record<string, string> {
  const supabaseUrl = process.env.SUPABASE_URL ?? "";
  const supabaseOrigin = supabaseUrl ? new URL(supabaseUrl).origin : "https://xbfimdcxrombepkthigx.supabase.co";
  const supabaseWss = supabaseOrigin.replace("https://", "wss://");

  const csp = [
    "default-src 'self'",
    `connect-src 'self' ${supabaseOrigin} ${supabaseWss}/realtime/v1 https://api.cloudflare.com https://api.ipify.org https://cdn.jsdelivr.net`,
    "script-src 'self' 'unsafe-inline' blob: https://cdn.jsdelivr.net",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    `img-src 'self' data: blob: ${supabaseOrigin}`,
    "worker-src 'self' blob: https://cdn.jsdelivr.net",
    "form-action 'self'",
    "base-uri 'self'",
  ].join("; ");

  return {
    "Content-Security-Policy": csp,
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  };
}

function withSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(getSecurityHeaders())) {
    headers.set(key, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);

      // Image proxy: Intercept R2 image requests and serve from server (bypasses ORB)
      if (url.pathname.startsWith("/api/images/")) {
        const encodedPath = url.pathname.replace("/api/images/", "");
        const filePath = decodeURIComponent(encodedPath);

        const r2AccountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID;
        const r2BucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME;
        const r2ApiToken = process.env.CLOUDFLARE_R2_API_TOKEN;

        const encodeR2ObjectKey = (key: string) => key.split("/").map(encodeURIComponent).join("/");

        if (r2AccountId && r2BucketName && r2ApiToken) {
          try {
            const encodedFilePath = encodeR2ObjectKey(filePath);
            const r2Url = `https://api.cloudflare.com/client/v4/accounts/${r2AccountId}/r2/buckets/${r2BucketName}/objects/${encodedFilePath}`;

            const r2Response = await fetch(r2Url, {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${r2ApiToken}`,
              },
            });

            if (r2Response.ok) {
              const buffer = await r2Response.arrayBuffer();
              const contentType = r2Response.headers.get("content-type") || "image/jpeg";

              return withSecurityHeaders(new Response(buffer, {
                status: 200,
                headers: {
                  "Content-Type": contentType,
                  "Cache-Control": "public, max-age=31536000",
                  "Access-Control-Allow-Origin": "*",
                },
              }));
            } else {
              return withSecurityHeaders(new Response("Image not found", { status: 404 }));
            }
          } catch (error) {
            console.error("[Image Proxy] Error fetching from R2:", error);
            return withSecurityHeaders(new Response("Error loading image", { status: 500 }));
          }
        }

        return withSecurityHeaders(new Response("R2 not configured", { status: 500 }));
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return withSecurityHeaders(await normalizeCatastrophicSsrResponse(response));
    } catch (error) {
      console.error(error);
      return withSecurityHeaders(new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      }));
    }
  },
};
