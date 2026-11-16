import { NextResponse } from "next/server";
import { checkNewsPassword, getAdminClient } from "@/lib/supabase-admin";

export const runtime = "nodejs";

const CATS = ["transfer", "national", "etc"];

function clean(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const auth = checkNewsPassword(body.password);
  if (auth === "unset") return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  if (auth === "bad") return NextResponse.json({ ok: false, error: "wrong_password" }, { status: 401 });

  const db = getAdminClient();
  if (!db) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });

  const action = body.action;

  if (action === "verify") return NextResponse.json({ ok: true });

  if (action === "list") {
    const { data, error } = await db.from("news").select("*").order("created_at", { ascending: false });
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, items: data });
  }

  if (action === "delete") {
    const id = clean(body.id, 60);
    if (!id) return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
    const { data: row } = await db.from("news").select("photos").eq("id", id).single();
    const { error } = await db.from("news").delete().eq("id", id);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    // 올렸던 사진도 같이 정리
    const paths = ((row?.photos as string[]) || [])
      .map((u) => u.split("/storage/v1/object/public/news/")[1])
      .filter(Boolean);
    if (paths.length) await db.storage.from("news").remove(paths);
    return NextResponse.json({ ok: true });
  }

  if (action === "create" || action === "update") {
    const category = clean(body.category, 20);
    const title = clean(body.title, 200);
    if (!CATS.includes(category) || !title) {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }
    const photos = Array.isArray(body.photos)
      ? (body.photos as unknown[]).filter((u): u is string => typeof u === "string" && u.startsWith("https://")).slice(0, 12)
      : [];
    const row = {
      category,
      title,
      body: clean(body.body, 10000) || null,
      player_name: clean(body.player_name, 100) || null,
      from_team: clean(body.from_team, 100) || null,
      to_team: clean(body.to_team, 100) || null,
      photos,
      published: body.published !== false,
    };
    if (action === "create") {
      const { error } = await db.from("news").insert(row);
      if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    } else {
      const id = clean(body.id, 60);
      if (!id) return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
      const { error } = await db.from("news").update(row).eq("id", id);
      if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
}
