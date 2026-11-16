import { NextResponse } from "next/server";
import { checkNewsPassword, getAdminClient } from "@/lib/supabase-admin";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  const auth = checkNewsPassword(form.get("password"));
  if (auth === "unset") return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  if (auth === "bad") return NextResponse.json({ ok: false, error: "wrong_password" }, { status: 401 });

  const file = form.get("file");
  if (!(file instanceof File) || !["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ ok: false, error: "invalid_file" }, { status: 400 });
  }
  const db = getAdminClient();
  if (!db) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const path = `${new Date().getFullYear()}/${crypto.randomUUID()}.${ext}`;
  const { error } = await db.storage.from("news").upload(path, await file.arrayBuffer(), { contentType: file.type });
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  const { data } = db.storage.from("news").getPublicUrl(path);
  return NextResponse.json({ ok: true, url: data.publicUrl });
}
