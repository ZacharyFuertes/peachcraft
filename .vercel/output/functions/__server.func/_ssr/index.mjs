let lastCapturedError;
const TTL_MS = 5e3;
function record(error) {
  lastCapturedError = { error, at: Date.now() };
}
if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => record(event.error ?? event));
  globalThis.addEventListener(
    "unhandledrejection",
    (event) => record(event.reason)
  );
}
function consumeLastCapturedError() {
  if (!lastCapturedError) return void 0;
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = void 0;
    return void 0;
  }
  const { error } = lastCapturedError;
  lastCapturedError = void 0;
  return error;
}
function renderErrorPage() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
let serverEntryPromise;
async function getServerEntry() {
  if (!serverEntryPromise) {
    serverEntryPromise = import("./server-COqVcV7o.mjs").then((n) => n.s).then(
      (m) => m.default ?? m
    );
  }
  return serverEntryPromise;
}
async function normalizeCatastrophicSsrResponse(response) {
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
    headers: { "content-type": "text/html; charset=utf-8" }
  });
}
function getSecurityHeaders() {
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
    "base-uri 'self'"
  ].join("; ");
  return {
    "Content-Security-Policy": csp,
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  };
}
function withSecurityHeaders(response) {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(getSecurityHeaders())) {
    headers.set(key, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}
const server = {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      if (url.pathname.startsWith("/api/images/")) {
        const encodedPath = url.pathname.replace("/api/images/", "");
        const filePath = decodeURIComponent(encodedPath);
        const r2AccountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID;
        const r2BucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME;
        const r2ApiToken = process.env.CLOUDFLARE_R2_API_TOKEN;
        const encodeR2ObjectKey = (key) => key.split("/").map(encodeURIComponent).join("/");
        if (r2AccountId && r2BucketName && r2ApiToken) {
          try {
            const encodedFilePath = encodeR2ObjectKey(filePath);
            const r2Url = `https://api.cloudflare.com/client/v4/accounts/${r2AccountId}/r2/buckets/${r2BucketName}/objects/${encodedFilePath}`;
            const r2Response = await fetch(r2Url, {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${r2ApiToken}`
              }
            });
            if (r2Response.ok) {
              const buffer = await r2Response.arrayBuffer();
              const contentType = r2Response.headers.get("content-type") || "image/jpeg";
              return withSecurityHeaders(new Response(buffer, {
                status: 200,
                headers: {
                  "Content-Type": contentType,
                  "Cache-Control": "public, max-age=31536000",
                  "Access-Control-Allow-Origin": "*"
                }
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
        headers: { "content-type": "text/html; charset=utf-8" }
      }));
    }
  }
};
export {
  server as default,
  renderErrorPage as r
};
