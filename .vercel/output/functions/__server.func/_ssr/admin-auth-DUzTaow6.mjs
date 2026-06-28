import { g as getSupabaseServer } from "./supabase-BbYbDVIj.mjs";
async function verifyAdmin(request, accessToken) {
  const supabase = getSupabaseServer(request, { authOnly: true });
  let user = null;
  let error = null;
  if (accessToken) {
    const tokenResult = await supabase.auth.getUser(accessToken);
    user = tokenResult?.data?.user ?? null;
    error = tokenResult?.error ?? null;
  }
  if (!user) {
    const cookieResult = await supabase.auth.getUser();
    user = cookieResult.data?.user ?? null;
    error = cookieResult.error ?? error;
  }
  if (error || !user || user.email !== process.env.ADMIN_EMAIL) {
    throw new Error("Unauthorized");
  }
  return user;
}
export {
  verifyAdmin as v
};
