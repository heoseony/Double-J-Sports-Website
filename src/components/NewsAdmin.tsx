"use client";

// NEWS 작성 화면 (관리자 전용, 한국어). 주소: /news/admin  — 비밀번호는 Vercel 환경변수 NEWS_ADMIN_PASSWORD
/* eslint-disable @next/next/no-img-element */

import { useCallback, useState } from "react";

type Item = {
  id: string;
  category: "transfer" | "national" | "etc";
  title: string;
  body: string | null;
  player_name: string | null;
  from_team: string | null;
  to_team: string | null;
  photos: string[];
  published: boolean;
  created_at: string;
};

const CAT_LABEL = { transfer: "이적", national: "국가대표 발탁", etc: "기타" } as const;

type Form = {
  id: string | null;
  category: Item["category"];
  title: string;
  body: string;
  player_name: string;
  from_team: string;
  to_team: string;
  photos: string[];
  published: boolean;
};
const EMPTY: Form = { id: null, category: "transfer", title: "", body: "", player_name: "", from_team: "", to_team: "", photos: [], published: true };

// 사진을 가로 1600px 이하 JPEG로 줄여서 올립니다 (용량 제한·속도)
async function shrink(file: File): Promise<Blob> {
  const bmp = await createImageBitmap(file);
  const s = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
  const c = document.createElement("canvas");
  c.width = Math.round(bmp.width * s);
  c.height = Math.round(bmp.height * s);
  c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height);
  return await new Promise((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error("resize"))), "image/jpeg", 0.85));
}

export default function NewsAdmin() {
  const [pw, setPw] = useState("");
  const [authed, setAuthed] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState<Form | null>(null);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const call = useCallback(async (password: string, payload: Record<string, unknown>) => {
    const r = await fetch("/api/news", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password, ...payload }) });
    const j = await r.json().catch(() => ({ ok: false, error: "network" }));
    return { status: r.status, ...j } as { status: number; ok: boolean; error?: string; items?: Item[] };
  }, []);

  async function load(password: string) {
    const j = await call(password, { action: "list" });
    if (j.ok) setItems(j.items || []);
  }

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    setBusy(true);
    const j = await call(pw, { action: "verify" });
    setBusy(false);
    if (j.ok) {
      setAuthed(true);
      load(pw);
    } else if (j.error === "not_configured") {
      setMsg("서버 설정이 아직 안 됐어요. Vercel 환경변수(NEWS_ADMIN_PASSWORD, SUPABASE_SERVICE_ROLE_KEY)를 먼저 넣어주세요.");
    } else {
      setMsg("비밀번호가 맞지 않아요.");
    }
  }

  async function addPhotos(files: FileList | null) {
    if (!files || !form) return;
    setBusy(true);
    setMsg("사진 올리는 중...");
    const urls: string[] = [];
    for (const f of Array.from(files)) {
      try {
        const blob = await shrink(f);
        const fd = new FormData();
        fd.append("password", pw);
        fd.append("file", new File([blob], "p.jpg", { type: "image/jpeg" }));
        const r = await fetch("/api/news/upload", { method: "POST", body: fd });
        const j = await r.json();
        if (j.ok) urls.push(j.url);
        else setMsg("사진 올리기 실패: " + (j.error || ""));
      } catch {
        setMsg("사진 올리기 실패 (지원하지 않는 파일일 수 있어요)");
      }
    }
    setForm((f) => (f ? { ...f, photos: [...f.photos, ...urls].slice(0, 12) } : f));
    setBusy(false);
    if (urls.length) setMsg("");
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    if (!form.title.trim()) return setMsg("제목을 입력해주세요.");
    setBusy(true);
    const { id, ...rest } = form;
    const j = await call(pw, id ? { action: "update", id, ...rest } : { action: "create", ...rest });
    setBusy(false);
    if (j.ok) {
      setForm(null);
      setMsg("저장됐어요. (홈페이지에는 1분 안에 반영돼요)");
      load(pw);
    } else setMsg("저장 실패: " + (j.error || ""));
  }

  async function remove(it: Item) {
    if (!confirm(`'${it.title}' 소식을 삭제할까요? 되돌릴 수 없어요.`)) return;
    const j = await call(pw, { action: "delete", id: it.id });
    if (j.ok) load(pw);
    else setMsg("삭제 실패: " + (j.error || ""));
  }

  const inp = "w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-brand-blue";
  const lab = "mb-1 block text-xs font-bold text-gray-500";

  if (!authed) {
    return (
      <section className="mx-auto max-w-sm px-6 py-24">
        <h1 className="text-2xl font-black text-gray-900">NEWS 관리</h1>
        <form onSubmit={login} className="mt-6 space-y-3">
          <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="관리자 비밀번호" className={inp} autoFocus />
          <button disabled={busy || !pw} className="w-full rounded-md bg-brand-blue px-4 py-2 text-sm font-bold text-white disabled:opacity-50">들어가기</button>
          {msg && <p className="text-sm text-red-600">{msg}</p>}
        </form>
      </section>
    );
  }

  if (form) {
    const nat = form.category === "national";
    return (
      <section className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-2xl font-black text-gray-900">{form.id ? "소식 수정" : "새 소식 쓰기"}</h1>
        <form onSubmit={save} className="mt-8 space-y-5">
          <div>
            <label className={lab}>분류</label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(CAT_LABEL) as Item["category"][]).map((k) => (
                <button type="button" key={k} onClick={() => setForm({ ...form, category: k })} className={`rounded-full border px-4 py-2 text-sm font-semibold ${form.category === k ? "border-brand-blue bg-brand-blue text-white" : "border-gray-300 text-gray-600"}`}>
                  {CAT_LABEL[k]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={lab}>제목 *</label>
            <input className={inp} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder={nat ? "예) 김OO 선수, U-17 대표팀 발탁" : "예) 김OO 선수, OO FC 이적"} />
          </div>
          {form.category !== "etc" && (
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className={lab}>선수 이름</label>
                <input className={inp} value={form.player_name} onChange={(e) => setForm({ ...form, player_name: e.target.value })} />
              </div>
              {!nat && (
                <div>
                  <label className={lab}>이전 소속팀</label>
                  <input className={inp} value={form.from_team} onChange={(e) => setForm({ ...form, from_team: e.target.value })} />
                </div>
              )}
              <div>
                <label className={lab}>{nat ? "대표팀 (예: U-17)" : "새 소속팀"}</label>
                <input className={inp} value={form.to_team} onChange={(e) => setForm({ ...form, to_team: e.target.value })} />
              </div>
            </div>
          )}
          <div>
            <label className={lab}>본문</label>
            <textarea className={inp + " min-h-[160px]"} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
          </div>
          <div>
            <label className={lab}>사진 (첫 번째 사진이 목록 대표 사진, 최대 12장)</label>
            <input type="file" accept="image/*" multiple onChange={(e) => { addPhotos(e.target.files); e.target.value = ""; }} className="text-sm" />
            {form.photos.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {form.photos.map((u, i) => (
                  <div key={u} className="relative">
                    <img src={u} alt="" className="aspect-square w-full rounded object-cover" />
                    {i === 0 && <span className="absolute left-1 top-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-white">대표</span>}
                    <div className="absolute right-1 top-1 flex gap-1">
                      {i > 0 && <button type="button" title="앞으로" onClick={() => setForm({ ...form, photos: [form.photos[i], ...form.photos.filter((_, j) => j !== i)] })} className="rounded bg-white/90 px-1.5 text-xs">★</button>}
                      <button type="button" title="삭제" onClick={() => setForm({ ...form, photos: form.photos.filter((_, j) => j !== i) })} className="rounded bg-white/90 px-1.5 text-xs">✕</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
            홈페이지에 공개 (끄면 임시저장)
          </label>
          {msg && <p className="text-sm text-gray-600">{msg}</p>}
          <div className="flex gap-3">
            <button disabled={busy} className="rounded-md bg-brand-blue px-6 py-2.5 text-sm font-bold text-white disabled:opacity-50">{busy ? "처리 중..." : "저장"}</button>
            <button type="button" onClick={() => { setForm(null); setMsg(""); }} className="rounded-md border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-600">취소</button>
          </div>
        </form>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-gray-900">NEWS 관리</h1>
        <button onClick={() => { setForm({ ...EMPTY }); setMsg(""); }} className="rounded-md bg-brand-blue px-4 py-2 text-sm font-bold text-white">+ 새 소식</button>
      </div>
      {msg && <p className="mt-4 text-sm text-green-700">{msg}</p>}
      <ul className="mt-8 divide-y divide-gray-100 rounded-lg border border-gray-200">
        {items.length === 0 && <li className="px-4 py-12 text-center text-gray-400">아직 소식이 없어요.</li>}
        {items.map((it) => (
          <li key={it.id} className="flex items-center gap-3 px-4 py-3">
            {it.photos[0] ? <img src={it.photos[0]} alt="" className="h-12 w-12 rounded object-cover" /> : <div className="h-12 w-12 rounded bg-gray-100" />}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-gray-900">{it.title}</p>
              <p className="text-xs text-gray-400">{CAT_LABEL[it.category]} · {new Date(it.created_at).toLocaleDateString("ko-KR")}{!it.published && " · 비공개"}</p>
            </div>
            <button onClick={() => { setForm({ id: it.id, category: it.category, title: it.title, body: it.body || "", player_name: it.player_name || "", from_team: it.from_team || "", to_team: it.to_team || "", photos: it.photos, published: it.published }); setMsg(""); }} className="text-sm font-semibold text-brand-blue">수정</button>
            <button onClick={() => remove(it)} className="text-sm text-red-500">삭제</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
