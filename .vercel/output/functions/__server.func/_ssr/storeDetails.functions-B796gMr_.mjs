import { c as createServerRpc } from "./createServerRpc-C-96jpkR.mjs";
import { c as createServerFn } from "./server-BO7pyA8t.mjs";
import { g as getSupabaseServer } from "./supabase-BbYbDVIj.mjs";
import { v as verifyAdmin } from "./admin-auth-DUzTaow6.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/supabase__ssr.mjs";
import "../_libs/cookie.mjs";
const uploadStoreImage_createServerFn_handler = createServerRpc({
  id: "2096d130a286e3dfec5d2a1f28242a67bcb36445b791d215188e546a5f85f4ef",
  name: "uploadStoreImage",
  filename: "src/lib/api/storeDetails.functions.ts"
}, (opts) => uploadStoreImage.__executeServer(opts));
const uploadStoreImage = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  fileName: stringType().min(1),
  base64: stringType().min(1),
  accessToken: stringType().optional()
})).handler(uploadStoreImage_createServerFn_handler, async ({
  data
}) => {
  await verifyAdmin(void 0, data.accessToken);
  const {
    Buffer
  } = await import("node:buffer");
  const mimeType = data.base64.match(/^data:(.*);base64,/)?.[1] ?? "application/octet-stream";
  const base64String = data.base64.replace(/^data:.*;base64,/, "");
  const buffer = Buffer.from(base64String, "base64");
  const filePath = `public/${Date.now()}-${data.fileName}`;
  const encodeR2ObjectKey = (key) => key.split("/").map(encodeURIComponent).join("/");
  const r2AccountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID;
  const r2BucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME;
  const r2ApiToken = process.env.CLOUDFLARE_R2_API_TOKEN;
  if (!r2AccountId || !r2BucketName || !r2ApiToken) {
    throw new Error("Cloudflare R2 is not configured for image uploads.");
  }
  const encodedObjectKey = encodeR2ObjectKey(filePath);
  const uploadUrl = `https://api.cloudflare.com/client/v4/accounts/${r2AccountId}/r2/buckets/${r2BucketName}/objects/${encodedObjectKey}`;
  const response = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${r2ApiToken}`,
      "Content-Type": mimeType
    },
    body: buffer
  });
  const json = await response.json().catch(() => null);
  if (!response.ok || json?.success === false) {
    const message = json?.errors?.[0]?.message ?? `Cloudflare R2 upload failed with status ${response.status}`;
    throw new Error(message);
  }
  return {
    publicUrl: `/api/images/${encodeURIComponent(filePath)}`
  };
});
const getStoreDetails_createServerFn_handler = createServerRpc({
  id: "c1efde8f7b62c99682bf334c4daacec2d017d9c10b92c7930bc2a47e0e0848ac",
  name: "getStoreDetails",
  filename: "src/lib/api/storeDetails.functions.ts"
}, (opts) => getStoreDetails.__executeServer(opts));
const getStoreDetails = createServerFn({
  method: "GET"
}).handler(getStoreDetails_createServerFn_handler, async () => {
  const supabase = getSupabaseServer();
  const {
    data,
    error
  } = await supabase.from("website_settings").select("*").maybeSingle();
  if (error) {
    throw error;
  }
  return data ?? null;
});
const updateStoreDetails_createServerFn_handler = createServerRpc({
  id: "59a79d6f704facff26f36b652cb66d2fff0e4b7a343a79c87ae3c4938fd08949",
  name: "updateStoreDetails",
  filename: "src/lib/api/storeDetails.functions.ts"
}, (opts) => updateStoreDetails.__executeServer(opts));
const updateStoreDetails = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  store_name: stringType().min(1),
  store_logo: stringType().nullable(),
  store_description: stringType().nullable(),
  contact_email: stringType().nullable(),
  contact_number: stringType().min(1),
  address: stringType().nullable(),
  facebook_url: stringType().nullable(),
  instagram_url: stringType().nullable(),
  twitter_url: stringType().nullable(),
  footer_text: stringType().nullable(),
  hero_banner: stringType().nullable(),
  accessToken: stringType().optional()
})).handler(updateStoreDetails_createServerFn_handler, async ({
  data
}) => {
  await verifyAdmin(void 0, data.accessToken);
  const supabase = getSupabaseServer();
  const payload = {
    id: "singleton",
    store_name: data.store_name,
    store_logo: data.store_logo,
    store_description: data.store_description,
    contact_email: data.contact_email,
    contact_number: data.contact_number,
    address: data.address,
    facebook_url: data.facebook_url,
    instagram_url: data.instagram_url,
    twitter_url: data.twitter_url,
    footer_text: data.footer_text,
    hero_banner: data.hero_banner
  };
  const {
    error
  } = await supabase.from("website_settings").upsert(payload, {
    onConflict: "id"
  });
  if (error) {
    throw error;
  }
  return {
    id: "singleton"
  };
});
export {
  getStoreDetails_createServerFn_handler,
  updateStoreDetails_createServerFn_handler,
  uploadStoreImage_createServerFn_handler
};
