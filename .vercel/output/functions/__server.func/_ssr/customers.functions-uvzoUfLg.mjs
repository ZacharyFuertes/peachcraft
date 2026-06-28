import { c as createServerRpc } from "./createServerRpc-BAGuB7mL.mjs";
import { c as createServerFn } from "./server-COqVcV7o.mjs";
import { g as getSupabaseServer } from "./supabase-BbYbDVIj.mjs";
import { v as verifyAdmin } from "./admin-auth-DUzTaow6.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
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
const getCustomers_createServerFn_handler = createServerRpc({
  id: "fb1703cba41559b52c54b6b3eef2ea4d30b220b4e655707cba1496dfbfebb3b7",
  name: "getCustomers",
  filename: "src/lib/api/customers.functions.ts"
}, (opts) => getCustomers.__executeServer(opts));
const getCustomers = createServerFn({
  method: "GET"
}).handler(getCustomers_createServerFn_handler, async () => {
  await verifyAdmin();
  const supabase = getSupabaseServer();
  const {
    data: profiles,
    error
  } = await supabase.from("profiles").select("id, email, username, address, email_verified, created_at");
  if (error) throw error;
  const customerIds = profiles.map((p) => p.id);
  const {
    data: orders
  } = await supabase.from("orders").select("user_id, total_amount, created_at").in("user_id", customerIds).order("created_at", {
    ascending: false
  });
  const orderMap = /* @__PURE__ */ new Map();
  for (const order of orders ?? []) {
    const entry = orderMap.get(order.user_id);
    if (entry) {
      entry.count++;
      entry.total += order.total_amount;
    } else {
      orderMap.set(order.user_id, {
        count: 1,
        total: order.total_amount,
        lastDate: order.created_at
      });
    }
  }
  const customers = profiles.map((profile) => {
    const stats = orderMap.get(profile.id);
    return {
      id: profile.id,
      email: profile.email,
      username: profile.username,
      address: profile.address,
      email_verified: profile.email_verified ?? false,
      created_at: profile.created_at,
      order_count: stats?.count ?? 0,
      total_spent: stats?.total ?? 0,
      last_order_date: stats?.lastDate ?? null
    };
  });
  return customers;
});
export {
  getCustomers_createServerFn_handler
};
