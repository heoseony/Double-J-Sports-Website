import { createClient } from "@supabase/supabase-js";
import { timingSafeEqual } from "crypto";

// 서버에서만 사용 (NEWS 작성/수정/삭제). 키는 Vercel 환경변수에 있고 브라우저로 나가지 않습니다.
export function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export function checkNewsPassword(input: unknown): "ok" | "bad" | "unset" {
  const real = process.env.NEWS_ADMIN_PASSWORD;
  if (!real) return "unset";
  if (typeof input !== "string") return "bad";
  const a = Buffer.from(input);
  const b = Buffer.from(real);
  if (a.length !== b.length) return "bad";
  return timingSafeEqual(a, b) ? "ok" : "bad";
}
