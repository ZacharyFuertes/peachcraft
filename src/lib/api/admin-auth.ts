import { getSupabaseServer } from "@/lib/supabase";

export async function verifyAdmin(request?: Request, accessToken?: string) {
  const supabase = getSupabaseServer(request, { authOnly: true });

  let user = null;
  let error = null;

  if (accessToken) {
    const tokenResult = await (supabase.auth as any).getUser(accessToken);
    user = tokenResult?.data?.user ?? null;
    error = tokenResult?.error ?? null;
  }

  if (error || !user || user.email !== process.env.ADMIN_EMAIL) {
    throw new Error("Unauthorized");
  }

  return user;
}

function getMagicBytes(buffer: { subarray(start: number, end: number): Uint8Array }) {
  return buffer.subarray(0, 12);
}

export function validateImageBuffer(buffer: { length: number; subarray(start: number, end: number): Uint8Array }) {
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  if (buffer.length > MAX_FILE_SIZE) {
    throw new Error("File too large. Maximum size is 5MB.");
  }

  if (buffer.length < 4) {
    throw new Error("File is empty or too small to be a valid image.");
  }

  const magic = getMagicBytes(buffer);
  const isValidImage =
    (magic[0] === 0xFF && magic[1] === 0xD8 && magic[2] === 0xFF) ||
    (magic[0] === 0x89 && magic[1] === 0x50 && magic[2] === 0x4E && magic[3] === 0x47 && magic[4] === 0x0D && magic[5] === 0x0A && magic[6] === 0x1A && magic[7] === 0x0A) ||
    (magic[0] === 0x52 && magic[1] === 0x49 && magic[2] === 0x46 && magic[3] === 0x46 && magic[8] === 0x57 && magic[9] === 0x45 && magic[10] === 0x42 && magic[11] === 0x50) ||
    (magic[0] === 0x47 && magic[1] === 0x49 && magic[2] === 0x46 && magic[3] === 0x38 && (magic[4] === 0x37 || magic[4] === 0x39) && magic[5] === 0x61);

  if (!isValidImage) {
    throw new Error("Invalid image file. Only JPEG, PNG, WebP, and GIF images are allowed.");
  }
}
