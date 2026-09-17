import Header from "@/components/Header";
import Image from "next/image";

const PILLARS = [
  {
    title: "SYSTEM",
    desc: "목표와 수준에 맞춘\n체계적인 트레이닝",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="13" rx="1" />
        <path d="M3 8h18" />
        <circle cx="8" cy="13" r="1.1" fill="currentColor" stroke="none" />
        <circle cx="16" cy="11" r="1.1" fill="currentColor" stroke="none" />
        <path d="M8 13c2-1 5-3 8-2" />
        <path d="M16 21v-4M8 21v-4" />
      </svg>
    ),
  },
  {
    title: "MATCH",
    desc: "훈련과 실전을 연결하는\n다양한 경기 경험",
    icon: (
      <img src="/images/match-icon.png" alt="" className="h-6 w-6 rounded-full object-cover" />
    ),
  },
  {
    title: "GROWTH",
    desc: "선수 한 명 한 명의\n성장 과정을 함께하는 관리",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17 9 11l4 4 8-8" />
        <path d="M15 7h6v6" />
      </svg>
    ),
  },
  {
    title: "PRO",
    desc: "프로의 경험으로 완성한\n차별화된 커리큘럼",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 4h10v5a5 5 0 0 1-10 0V4z" />
        <path d="M7 5H4a3 3 0 0 0 3 5" />
        <path d="M17 5h3a3 3 0 0 1-3 5" />
        <path d="M12 14v3" />
        <path d="M8.5 20.5h7" />
        <path d="M9.5 17.5h5l1 3h-7l1-3z" />
      </svg>
    ),
  },
];

export default function VisionPage() {
  return (
    <div>
      <Header />

      <section className="relative h-[560px] overflow-hidden px-6 py-20 md:px-16">
        <div className="absolute inset-0">
          <Image
            src="/images/vision-hero.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[80%_50%]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white from-15% via-white/85 via-55% to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white" />
        </div>

        <div className="relative z-10 flex h-full flex-col justify-center">
          <h1 className="text-5xl font-black leading-tight text-gray-900 [text-shadow:0_2px_16px_rgba(255,255,255,0.9)] md:text-6xl">
            축구를 넘어,
            <br />
            <span className="text-brand-blue">더 큰 성장을 만듭니다.</span>
          </h1>

          <div className="mt-8 max-w-[600px] leading-[1.6] text-[#1B3A5C] [text-shadow:0_2px_12px_rgba(255,255,255,0.9)]">
            <p className="text-lg font-extrabold">더블제이스포츠 아카데미는 수준과 경험에 관계없이,<br />
            누구나 제대로 축구를 배울 수 있도록 지도합니다.</p>
            <p className="mt-5 text-base font-medium">프로 선수 출신 감독진과 현역 코치진의 경험을 바탕으로<br />
            기본기부터 실전, 전문적인 선수 트레이닝까지<br />
            수준과 목표에 맞춰 지도합니다.</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-14 md:px-16">
        <div className="grid grid-cols-1 gap-10 divide-y divide-gray-100 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {PILLARS.map((pillar) => (
            <div key={pillar.title} className="flex flex-col items-center gap-3 pt-8 text-center first:pt-0 sm:pt-0 lg:px-6 lg:first:pl-0 lg:last:pr-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-brand-blue">
                {pillar.icon}
              </div>
              <p className="text-sm font-bold tracking-wide text-brand-navy">{pillar.title}</p>
              <p className="whitespace-pre-line text-sm leading-relaxed text-gray-500">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
