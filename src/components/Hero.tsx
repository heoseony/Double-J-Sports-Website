"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import ApplyModal from "./ApplyModal";

export default function Hero() {
  const t = useTranslations("Hero");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
    <section className="relative flex h-[400px] flex-col justify-center overflow-hidden bg-brand-navy px-6 py-16 text-white md:h-[520px] md:px-16">
      {/* TEMP-HERO: 실제 사진이 정해질 때까지 쓰는 임시 배경 (사진 넣을 땐 이 블록을 <Image>로 교체) */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 85% 20%, rgba(59,130,196,0.35), transparent 60%), linear-gradient(135deg, #0A1F44 0%, #0d2a5c 55%, #0A1F44 100%)",
        }}
      />
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-[0.07]"
        viewBox="0 0 1200 520"
        preserveAspectRatio="xMaxYMid slice"
        fill="none"
        stroke="white"
        strokeWidth="2"
      >
        <circle cx="900" cy="260" r="140" />
        <line x1="900" y1="0" x2="900" y2="520" />
        <rect x="1020" y="150" width="260" height="220" />
        <rect x="1130" y="215" width="150" height="90" />
        <circle cx="900" cy="260" r="5" fill="white" />
      </svg>
      <div className="relative z-10 flex flex-col">
      <p className="text-xs font-bold tracking-widest text-brand-gold">
        DOUBLE J SPORTS ACADEMY
      </p>

      <h1 className="mt-4 text-4xl font-black leading-none tracking-tight md:text-7xl">
        TRAIN LIKE A PRO
        <br />
        <span className="text-brand-gold">GROW YOUR WAY</span>
      </h1>

      <p className="mt-4 text-base text-gray-200 md:text-lg">
        {t("bodyLine1")}
      </p>
      <p className="mt-2 text-sm text-gray-300">
        {t("bodyLine2")}
      </p>

      <div className="mt-8 flex gap-3">
        <button
          onClick={() => setModalOpen(true)}
          className="rounded-md bg-white px-8 py-3.5 text-sm font-bold tracking-wide text-brand-navy transition hover:bg-brand-gold"
        >
          {t("cta")}
        </button>
      </div>

          </div>
    </section>

      <ApplyModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
