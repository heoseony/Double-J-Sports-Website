import Header from "@/components/Header";

const PILLARS = [
  {
    title: "SYSTEMATIC TRAINING",
    desc: "목표와 수준에 맞춘\n체계적인 트레이닝",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16v4H4z" />
        <path d="M4 10h10v4H4z" />
        <path d="M4 16h7v4H4z" />
      </svg>
    ),
  },
  {
    title: "MATCH EXPERIENCE",
    desc: "훈련과 실전을 연결하는\n다양한 경기 경험",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v18M3 12h18" />
      </svg>
    ),
  },
  {
    title: "PERSONAL GROWTH",
    desc: "선수 한 명 한 명의\n성장 과정을 함께하는 관리",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20V15" />
        <path d="M9 20V11" />
        <path d="M14 20V7" />
        <path d="M19 20V4" />
      </svg>
    ),
  },
  {
    title: "PRO EXPERIENCE",
    desc: "프로의 경험으로 완성한\n차별화된 커리큘럼",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 4h8l-1 6a3 3 0 0 1-6 0z" />
        <path d="M12 13v4" />
        <path d="M9 20h6" />
      </svg>
    ),
  },
];

export default function VisionPage() {
  return (
    <div>
      <Header />

      <section className="px-6 py-16 md:px-16">
        <h1 className="text-4xl font-black leading-tight text-gray-900 md:text-5xl">
          축구를 넘어,
          <br />
          <span className="text-brand-blue">더 큰 성장을 만듭니다.</span>
        </h1>

        <div className="mt-5 max-w-xl text-base leading-relaxed text-gray-700">
          <p>처음 시작한다고 가볍게 가르치지 않고,<br />
          취미로 즐긴다고 훈련의 디테일을 타협하지 않습니다.<br />
          누구나 시작할 수 있는 환경 안에서,<br />
          프로의 경험과 전문 지도자의 코칭을 바탕으로<br />
          높은 수준의 훈련을 경험할 수 있도록.<br />
          기술을 배우는 것을 넘어 스스로 판단하고 도전하며,<br />
          자신만의 플레이를 만들어갈 수 있도록 함께합니다.</p>
        </div>
      </section>

      <section className="border-t border-gray-100 px-6 py-14 md:px-16">
        <div className="grid grid-cols-1 gap-10 divide-y divide-gray-100 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {PILLARS.map((pillar) => (
            <div key={pillar.title} className="flex flex-col items-center gap-3 pt-8 text-center first:pt-0 sm:pt-0 lg:px-6 lg:first:pl-0 lg:last:pr-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-brand-blue">
                {pillar.icon}
              </div>
              <p className="text-xs font-bold tracking-wide text-brand-navy">{pillar.title}</p>
              <p className="whitespace-pre-line text-xs leading-relaxed text-gray-500">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
