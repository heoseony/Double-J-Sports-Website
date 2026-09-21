"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import ApplyModal from "./ApplyModal";
import Image from "next/image";

export default function Hero() {
  const t = useTranslations("Hero");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
    <section className="relative flex h-[400px] flex-col justify-center overflow-hidden bg-brand-navy px-6 py-16 text-white md:h-[520px] md:px-16">
      <Image
        src="/images/hero-main-v2.png"
        alt="Double J Sports Academy"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/70 to-brand-navy/20"></div>
      <div className="relative z-10 flex flex-col">
      <p className="text-xs font-bold tracking-widest text-blue-400">
        DOUBLE J SPORTS ACADEMY
      </p>

      <h1 className="mt-4 text-4xl font-black leading-none tracking-tight md:text-7xl">
        TRAIN LIKE A PRO
        <br />
        <span className="text-blue-400">GROW YOUR WAY</span>
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
          className="rounded-full bg-white px-6 py-3 text-sm font-bold text-brand-navy hover:opacity-90"
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
