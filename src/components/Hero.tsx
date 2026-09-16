"use client";

import { useState } from "react";
import ApplyModal from "./ApplyModal";

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
    <section className="relative flex min-h-[520px] flex-col justify-center overflow-hidden bg-brand-navy px-6 py-16 text-white md:px-16">
      <p className="text-xs font-bold tracking-widest text-blue-400">
        DOUBLE J SPORTS ACADEMY
      </p>

      <h1 className="mt-4 text-4xl font-black leading-none tracking-tight md:text-7xl">
        TRAIN LIKE A PRO
        <br />
        <span className="text-blue-400">GROW YOUR WAY</span>
      </h1>

      <p className="mt-4 text-base text-gray-200 md:text-lg">
        축구를 처음 시작하는 순간부터, 프로 무대를 향해 다음 단계를 준비하는 선수까지.
      </p>
      <p className="mt-2 text-sm text-gray-300">
        더블제이는 각자의 목표와 수준에 맞는 트레이닝을 제공합니다.
      </p>

      <div className="mt-8 flex gap-3">
        <button
          onClick={() => setModalOpen(true)}
          className="rounded-full bg-white px-6 py-3 text-sm font-bold text-brand-navy hover:opacity-90"
        >
          체험수업신청하기 →
        </button>
      </div>

    </section>

      <ApplyModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
