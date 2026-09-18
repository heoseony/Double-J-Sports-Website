import Header from "@/components/Header";
import Image from "next/image";

const LEADERS = [
  {
    name: "정연웅 대표",
    career: [
      "전북현대 U12",
      "광명광덕초등",
      "포항스틸러스 U15",
      "대전시티즌 U18",
      "대전시즌(한국 K-1리그) 대전 유스1호 프로입단",
      "V-Varen Nagasaki (일본 J리그)",
      "KSV Hessen Kassel (독일 Regionalliga)",
      "Siegburg SV 04 (독일)",
      "TuRU Düsseldorf 1880 (독일)",
      "(현) 독일 분데스리가 프로선수 및 유스선수 개인레슨 트레이너",
      "독일 DFB C 라이센스",
    ],
  },
  {
    name: "정연황 감독",
    photo: "/images/jung-yeonhwang-v2.png",
    career: [
      "전북현대모터스 U-12 (한국 K-1리그)",
      "대전시티즌 U-15 (한국 K-1리그)",
      "대전시티즌 U-18 (한국 K-1리그)",
      "Syugakukan High School (일본)",
      "Soka University (일본)",
      "TuRU Düsseldorf 1880 (독일)",
      "(현) 독일 분데스리가 프로선수 및 유스선수 개인레슨 트레이너",
      "독일 DFB C 라이센스",
    ],
  },
];

const COACHES = [
  { name: "정치현 코치", tags: ["", ""], desc: "" },
  { name: "조훈 코치", tags: ["", ""], desc: "", photo: "/images/cho-hoon.png" },
  { name: "피터 코치", tags: ["", ""], desc: "", photo: "/images/peter-coach-v2.png" },
];

export default function CoachesPage() {
  return (
<div>
<Header />

<section className="relative flex h-[280px] items-center overflow-hidden bg-brand-navy px-6 py-12 md:h-[440px] md:px-16 md:py-16">

<Image
          src="/images/coaches-hero-v3.png"
          alt="Double J Sports Academy Coaches"
          fill
          className="object-cover"
          priority
        />
<div className="absolute inset-0 bg-gradient-to-r from-brand-navy/85 via-brand-navy/40 to-transparent"></div>
<div className="relative z-10 max-w-2xl">
<h1 className="mt-3 text-3xl font-black leading-tight text-white md:text-4xl">
            경험이 다른 코칭은,
<br />
            성장의 방향부터 다릅니다.
</h1>
</div>
</section>

<section className="grid grid-cols-1 gap-6 px-6 py-10 md:grid-cols-2 md:px-16">
        {LEADERS.map((leader) => (
<div
            key={leader.name}
            className="flex gap-6 overflow-hidden rounded-2xl bg-gray-50 p-6"
>
<div className="relative aspect-square w-[32%] shrink-0 self-stretch overflow-hidden rounded-xl bg-gray-200">
              {"photo" in leader && leader.photo && (
                <Image src={leader.photo} alt={leader.name} fill className="object-cover" />
              )}
</div>
<div className="flex flex-col justify-start">
<h2 className="mt-1 text-2xl font-black text-gray-900">
                {leader.name}
</h2>
              {"career" in leader && leader.career && (
<div className="mt-4"><span className="inline-block rounded-full border border-gray-300 px-3 py-1 text-xs font-bold text-gray-700">학력 및 경력</span>
<ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-600">
                    {leader.career.map((line) => (
<li key={line}>{line}</li>
                    ))}
</ul>
</div>
              )}
</div>
</div>
        ))}
</section>

<section className="border-t border-gray-100 px-6 py-10 md:px-16">
<p className="text-xs font-bold tracking-widest text-brand-blue">COACHING STAFF</p>
<h2 className="mt-1 text-xl font-black text-gray-900 md:text-2xl">
          코칭 스태프
</h2>

<div className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
          {COACHES.map((coach) => (
<div key={coach.name}>
<div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-200">
              {"photo" in coach && coach.photo && (
                <Image src={coach.photo} alt={coach.name} fill className="object-cover" />
              )}
</div>
<p className="mt-2 text-center text-sm font-bold text-gray-900">
                {coach.name}
</p>
</div>
          ))}
</div>
</section>
</div>
  );
}
