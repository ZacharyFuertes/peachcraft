import { createServerFn } from "@tanstack/react-start";
import { getSupabaseServer } from "@/lib/supabase";
import { verifyAdmin } from "./admin-auth";

export type CustomerRow = {
  id: string;
  email: string;
  username: string;
  address: string | null;
  email_verified: boolean;
  created_at: string | null;
  order_count: number;
  total_spent: number;
  last_order_date: string | null;
};

export const getCustomers = createServerFn({ method: "GET" }).handler(async () => {
  await verifyAdmin();
  const supabase = getSupabaseServer();

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("id, email, username, address, email_verified, created_at");

  if (error) throw error;

  const customerIds = profiles.map((p) => p.id);

  const { data: orders } = await supabase
    .from("orders")
    .select("user_id, total_amount, created_at")
    .in("user_id", customerIds)
    .order("created_at", { ascending: false });

  const orderMap = new Map<string, { count: number; total: number; lastDate: string | null }>();

  for (const order of orders ?? []) {
    const entry = orderMap.get(order.user_id);
    if (entry) {
      entry.count++;
      entry.total += order.total_amount;
    } else {
      orderMap.set(order.user_id, {
        count: 1,
        total: order.total_amount,
        lastDate: order.created_at,
      });
    }
  }

  const customers: CustomerRow[] = profiles.map((profile) => {
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
      last_order_date: stats?.lastDate ?? null,
    };
  });

  return customers;
});
