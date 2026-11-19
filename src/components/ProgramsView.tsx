"use client";

// PROGRAMS-VIEW: PROGRAM 페이지 본문(제목 + PRO/ACADEMY 아코디언 + 세부 프로그램 카드).
// 글은 서버에서 번역해서 dict 로 받고, 사진·구성은 src/data/programs.ts 에서 가져와요.

import { useState } from "react";
import Image from "next/image";
import { ACADEMY_PROGRAMS, PRO_IMAGE, type ProgramKey } from "@/data/programs";

const BOOKING_URL = "https://double-j-sports.vercel.app";
const GOLD = "#DDBB72";

export type ProgramsDict = {
  h1: string;
  h2: string;
  lead1: string;
  lead2: string;
  introLabel: string;
  targetLabel: string;
  cta: string;
  more: string;
  sub: string;
  pro: { title: string; head: string; desc: string; intro: string; target: string; cta: string };
  academy: { title: string; head: string; desc: string };
  programs: Record<ProgramKey, { title: string; desc: string; target?: string }>;
};

// 체험수업 신청: 홈 화면의 신청 창을 열어요. (홈 밖에서 열린 경우엔 예약 사이트로 이동)
function applyNow() {
  try {
    if (window.parent !== window) {
      window.parent.postMessage({ type: "dj-apply" }, window.location.origin);
      return;
    }
  } catch {
    /* 아래로 */
  }
  window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`order-2 shrink-0 text-white/80 transition-transform duration-300 md:order-4 ${open ? "rotate-180" : ""}`}
    >
      <path d="M5 9l7 7 7-7" />
    </svg>
  );
}

function Field({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.12em] text-[#DDBB72]">{label}</p>
      <p className="mt-1.5 break-keep text-[15px] leading-[1.8] text-white/85 md:text-base">{text}</p>
    </div>
  );
}

function CtaButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={applyNow}
      className="rounded-md border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:border-[#DDBB72] hover:text-[#DDBB72] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82C4]"
    >
      {label} →
    </button>
  );
}

export default function ProgramsView({ dict }: { dict: ProgramsDict }) {
  const [open, setOpen] = useState<"pro" | "academy" | null>("academy");
  const [sel, setSel] = useState<ProgramKey | null>(null);
  const [shown, setShown] = useState<ProgramKey>("kids"); // 접히는 동안에도 내용 유지

  const toggle = (k: "pro" | "academy") => setOpen((cur) => (cur === k ? null : k));
  const pick = (k: ProgramKey) => {
    if (sel === k) {
      setSel(null);
    } else {
      setSel(k);
      setShown(k);
    }
  };

  const ring =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82C4]";
  const shell = (on: boolean) =>
    `rounded-lg border backdrop-blur-[2px] transition-colors duration-300 ${
      on ? "border-[#DDBB72]/55 bg-[rgba(14,28,56,0.72)]" : "border-white/15 bg-[rgba(10,22,46,0.55)] hover:border-white/35"
    }`;
  const body = (on: boolean) =>
    `grid transition-[grid-template-rows] duration-300 ease-out ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`;
  const inner = (on: boolean) => `overflow-hidden ${on ? "visible" : "invisible delay-300"}`;

  const sp = dict.programs[shown];
  const spMeta = ACADEMY_PROGRAMS.find((p) => p.key === shown)!;

  return (
    <main className="text-white">
      <section className="relative px-6 pb-10 pt-14 md:px-16 md:pb-14 md:pt-20">
        <div className="relative z-10 max-w-[640px]">
          <h1 className="text-[32px] font-black leading-[1.3] text-white md:text-[46px]">
            {dict.h1}
            <br />
            <span style={{ color: GOLD }}>{dict.h2}</span>
          </h1>
          <p className="mt-6 text-sm leading-[1.9] text-white/75 md:text-base">
            {dict.lead1}
            <br />
            {dict.lead2}
          </p>
        </div>
        <div className="pointer-events-none absolute right-[4%] top-1/2 hidden h-[260px] w-[300px] -translate-y-1/2 md:block lg:right-[8%]" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_85%,rgba(96,150,44,0.38),transparent_68%)]" />
          <Image src="/images/intro/ball.webp" alt="" fill sizes="300px" className="object-contain" />
        </div>
      </section>

      <section className="space-y-4 px-6 pb-24 md:px-16 md:pb-32">
        {/* PRO */}
        <div className={shell(open === "pro")}>
          <button
            type="button"
            id="prog-pro-btn"
            aria-expanded={open === "pro"}
            aria-controls="prog-pro-panel"
            onClick={() => toggle("pro")}
            className={`flex w-full flex-wrap items-center gap-x-5 gap-y-3 rounded-lg px-6 py-6 text-left md:flex-nowrap md:gap-8 md:px-8 ${ring}`}
          >
            <span className="order-1 flex-1 text-[22px] font-black text-white md:w-[170px] md:flex-none md:shrink-0 md:text-[28px]">{dict.pro.title}</span>
            <span className="order-2 hidden h-12 w-px shrink-0 bg-white/20 md:block" />
            <span className="order-3 min-w-0 basis-full break-keep md:flex-1 md:basis-auto">
              <span className="block text-base font-bold md:text-xl" style={{ color: GOLD }}>{dict.pro.head}</span>
              <span className="mt-1 block text-[13px] leading-relaxed text-white/70 md:text-[15px]">{dict.pro.desc}</span>
            </span>
            <Chevron open={open === "pro"} />
          </button>
          <div id="prog-pro-panel" role="region" aria-labelledby="prog-pro-btn" className={body(open === "pro")}>
            <div className={inner(open === "pro")}>
              <div className="mx-6 border-t border-white/10 pb-8 pt-6 md:mx-8">
                <div className="grid gap-6 md:grid-cols-[minmax(0,340px)_1fr] md:gap-10">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-md">
                    <Image src={PRO_IMAGE.src} alt="" fill sizes="(min-width: 768px) 340px, 100vw" className="object-cover" style={{ objectPosition: PRO_IMAGE.objectPosition }} />
                  </div>
                  <div className="flex min-w-0 flex-col justify-center gap-5">
                    <Field label={dict.introLabel} text={dict.pro.intro} />
                    <Field label={dict.targetLabel} text={dict.pro.target} />
                    <div>
                      <CtaButton label={dict.pro.cta} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ACADEMY */}
        <div className={shell(open === "academy")}>
          <button
            type="button"
            id="prog-academy-btn"
            aria-expanded={open === "academy"}
            aria-controls="prog-academy-panel"
            onClick={() => toggle("academy")}
            className={`flex w-full flex-wrap items-center gap-x-5 gap-y-3 rounded-lg px-6 py-6 text-left md:flex-nowrap md:gap-8 md:px-8 ${ring}`}
          >
            <span className="order-1 flex-1 text-[22px] font-black text-white md:w-[170px] md:flex-none md:shrink-0 md:text-[28px]">{dict.academy.title}</span>
            <span className="order-2 hidden h-12 w-px shrink-0 bg-white/20 md:block" />
            <span className="order-3 min-w-0 basis-full break-keep md:flex-1 md:basis-auto">
              <span className="block text-base font-bold md:text-xl" style={{ color: GOLD }}>{dict.academy.head}</span>
              <span className="mt-1 block text-[13px] leading-relaxed text-white/70 md:text-[15px]">{dict.academy.desc}</span>
            </span>
            <Chevron open={open === "academy"} />
          </button>
          <div id="prog-academy-panel" role="region" aria-labelledby="prog-academy-btn" className={body(open === "academy")}>
            <div className={inner(open === "academy")}>
              <div className="mx-6 border-t border-white/10 pb-8 pt-6 md:mx-8">
                <div className="mb-4 flex items-center gap-4">
                  <span className="text-sm font-bold text-white">{dict.sub}</span>
                  <span className="h-px flex-1 bg-white/15" />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {ACADEMY_PROGRAMS.map((p) => {
                    const on = sel === p.key;
                    const d = dict.programs[p.key];
                    return (
                      <button
                        key={p.key}
                        type="button"
                        aria-expanded={on}
                        aria-controls="prog-detail"
                        onClick={() => pick(p.key)}
                        className={`group flex min-h-[112px] overflow-hidden rounded-md border text-left transition-colors duration-200 ${ring} ${
                          on ? "border-[#DDBB72]/60 bg-[rgba(18,36,70,0.9)]" : "border-white/15 bg-[rgba(10,22,46,0.7)] hover:border-white/40"
                        }`}
                      >
                        <span className="relative block w-[36%] shrink-0 bg-gradient-to-br from-[#16305c] to-[#0b1a33]">
                          {p.image && (
                            <Image src={p.image} alt="" fill sizes="(min-width: 768px) 140px, 36vw" className="object-cover" style={{ objectPosition: p.objectPosition }} />
                          )}
                        </span>
                        <span className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 px-4 py-4">
                          <span className="text-lg font-black text-white">{d.title}</span>
                          <span className="break-keep text-[13px] leading-[1.6] text-white/70">{d.desc}</span>
                          <span className="mt-1 text-xs font-semibold text-white/55 transition-colors group-hover:text-[#DDBB72]">{dict.more} →</span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div id="prog-detail" role="region" aria-label={dict.programs[shown].title} className={`${body(sel !== null)}`}>
                  <div className={inner(sel !== null)}>
                    <div className="mt-4 rounded-md border border-white/15 bg-[rgba(10,22,46,0.7)] p-6 md:p-8">
                      <div className="grid gap-6 md:grid-cols-[minmax(0,260px)_1fr] md:gap-10">
                        <div className="relative hidden aspect-[4/3] overflow-hidden rounded-md bg-gradient-to-br from-[#16305c] to-[#0b1a33] md:block">
                          {spMeta.image && (
                            <Image src={spMeta.image} alt="" fill sizes="260px" className="object-cover" style={{ objectPosition: spMeta.objectPosition }} />
                          )}
                        </div>
                        <div className="flex min-w-0 flex-col justify-center gap-5">
                          <p className="text-xl font-black text-white">{sp.title}</p>
                          <Field label={dict.introLabel} text={sp.desc} />
                          {spMeta.hasTarget && sp.target && <Field label={dict.targetLabel} text={sp.target} />}
                          <div>
                            <CtaButton label={dict.cta} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
