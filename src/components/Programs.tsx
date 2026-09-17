const PROGRAMS = [
  {
    title: "프로",
    subtitle: "프로 선수 지망",
    description: "프로가 만드는 프로",
  },
  {
    title: "아카데미",
    subtitle: "유소년 육성",
    description: "축구를 처음 만나는 아이들부터 전문 육성까지",
  },
  {
    title: "여성 취미반",
    subtitle: "성인 여성 클래스",
    description: "축구를 즐기는 모든 여성분들을 위해",
  },
  {
    title: "남성 취미반",
    subtitle: "성인 남성 클래스",
    description: "축구를 통한 건강한 라이프스타일",
  },
  {
    title: "1:1 개인 코칭",
    subtitle: "맞춤 트레이닝",
    description: "나에게 집중하는 프리미엄 레슨",
    badge: "NEW",
  },
];

export default function Programs() {
  return (
    <section className="px-6 py-20 md:px-16">
      <p className="text-xs font-bold tracking-widest text-brand-blue">
        OUR PROGRAMS
      </p>
      <h2 className="mt-3 text-3xl font-bold text-brand-navy md:text-4xl">
        모든 가능성을 위한 맞춤형 프로그램
      </h2>
      <p className="mt-4 max-w-xl text-sm text-gray-600">
        연령과 목표에 맞춘 체계적인 커리큘럼으로 축구를 통해 한 단계 더 성장할 수 있도록 지도합니다.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {PROGRAMS.map((program) => (
          <div
            key={program.title}
            className="relative rounded-2xl border border-gray-200 p-5"
          >
            {program.badge && (
              <span className="absolute right-3 top-3 rounded-full bg-brand-red px-2 py-1 text-[10px] font-bold text-white">
                {program.badge}
              </span>
            )}
            <p className="text-lg font-bold text-brand-navy">{program.title}</p>
            <p className="mt-1 text-xs font-semibold text-gray-500">{program.subtitle}</p>
            <p className="mt-3 text-xs text-gray-600">{program.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
