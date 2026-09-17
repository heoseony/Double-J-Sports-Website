import Header from "@/components/Header";

const PROGRAMS = [
  {
    title: "프로",
    subtitle: "PRO",
    desc: "프로가 만드는 프로.\n프로 무대를 목표로 하는 선수를 위한 전문 트레이닝 프로그램입니다.",
  },
  {
    title: "아카데미",
    subtitle: "ACADEMY",
    desc: "기본기부터 실전까지, 체계적인 커리큘럼으로 성장하는 유소년 축구 프로그램입니다.",
  },
  {
    title: "여성 취미반",
    subtitle: "WOMEN",
    desc: "부담 없이 즐기면서 배우는 여성 전용 축구 클래스입니다.",
  },
  {
    title: "남성 취미반",
    subtitle: "MEN",
    desc: "취미로 즐기되 훈련의 디테일은 타협하지 않는 남성 축구 클래스입니다.",
  },
  {
    title: "1:1 개인 코칭",
    subtitle: "PRIVATE",
    desc: "개인의 수준과 목표에 맞춘 1:1 맞춤형 트레이닝입니다.",
  },
];

export default function ProgramsPage() {
  return (
    <div>
      <Header />

      <section className="px-6 py-16 md:px-16">
        <p className="text-sm font-bold tracking-widest text-brand-blue">PROGRAM</p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-gray-900 md:text-5xl">
          수준과 목표에 맞는
          <br />
          더블제이의 프로그램
        </h1>
      </section>

      <section className="divide-y divide-gray-100 border-t border-gray-100">
        {PROGRAMS.map((program) => (
          <div
            key={program.title}
            className="grid grid-cols-1 gap-4 px-6 py-12 md:grid-cols-[260px_1fr] md:gap-10 md:px-16 md:py-16"
          >
            <div>
              <p className="text-xs font-bold tracking-widest text-gray-400">
                {program.subtitle}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <h2 className="text-2xl font-black text-brand-navy md:text-3xl">
                  {program.title}
                </h2>
                {program.badge && (
                  <span className="rounded-full bg-brand-red px-2 py-0.5 text-xs font-bold text-white">
                    {program.badge}
                  </span>
                )}
              </div>
            </div>
            <p className="whitespace-pre-line text-base leading-relaxed text-gray-600 md:text-lg">
              {program.desc}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
