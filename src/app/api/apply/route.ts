import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { supabase } from "../../../lib/supabase";

export const runtime = "nodejs";

const PROGRAMS = ["pro", "academy", "women", "men", "private"];
const PROGRAM_KO: Record<string, string> = {
  pro: "프로",
  academy: "아카데미",
  women: "여성 취미반",
  men: "남성 취미반",
  private: "1:1 개인 코칭",
};

function clean(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}
function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // 봇 방지: 숨겨진 칸이 채워져 있으면 성공처럼 응답하고 저장하지 않음
  if (clean(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 100);
  const contact = clean(body.contact, 200);
  const country = clean(body.country, 100);
  const program = clean(body.program, 20);
  const message = clean(body.message, 2000);
  const locale = clean(body.locale, 10);
  const consent = body.consent === true;

  if (!name || contact.length < 3 || !PROGRAMS.includes(program) || !consent) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const { error } = await supabase.from("trial_applications").insert({
    name,
    contact,
    country: country || null,
    program,
    message: message || null,
    locale: locale || null,
  });

  if (error) {
    console.error("trial_applications insert failed", error.message);
    return NextResponse.json({ ok: false, error: "save_failed" }, { status: 500 });
  }

  // 이메일 알림 (실패해도 신청은 이미 저장됨)
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (user && pass) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user, pass },
      });
      const rows: [string, string][] = [
        ["이름", name],
        ["연락처", contact],
        ["국가", country || "-"],
        ["희망 프로그램", PROGRAM_KO[program] || program],
        ["문의 내용", message || "-"],
        ["언어", locale || "-"],
      ];
      const html =
        `<div style="font-family:sans-serif;max-width:520px">` +
        `<h2 style="color:#0A1F44">새 체험수업 신청이 들어왔어요</h2>` +
        `<table style="border-collapse:collapse;width:100%">` +
        rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:8px;border-bottom:1px solid #eee;color:#666;width:110px">${k}</td>` +
              `<td style="padding:8px;border-bottom:1px solid #eee">${esc(v).replace(/\n/g, "<br>")}</td></tr>`
          )
          .join("") +
        `</table><p style="color:#888;font-size:12px">앱 관리자 화면 &gt; 체험 신청에서도 확인할 수 있어요.</p></div>`;
      await transporter.sendMail({
        from: `"Double J Sports" <${user}>`,
        to: process.env.NOTIFY_EMAIL || user,
        subject: `[체험수업 신청] ${name} / ${PROGRAM_KO[program] || program}`,
        html,
      });
    } catch (e) {
      console.error("notify email failed", e);
    }
  }

  return NextResponse.json({ ok: true });
}
