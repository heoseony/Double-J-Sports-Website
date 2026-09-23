import Header from "@/components/Header";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

const LEADER_KEYS = [
  { key: "jungYeonUng", photo: undefined as string | undefined },
  { key: "jungYeonHwang", photo: "/images/jung-yeonhwang-v2.png" },
] as const;

const COACH_KEYS = [
  { key: "jungChiHyun", photo: undefined as string | undefined },
  { key: "choHoon", photo: "/images/cho-hoon.png" },
  { key: "peter", photo: "/images/peter-coach-v2.png" },
] as const;

export default async function CoachesPage() {
  const t = await getTranslations("CoachesPage");

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
            {t("heroLine1")}
<br />
            {t("heroLine2")}
</h1>
</div>
</section>

<section className="grid grid-cols-1 gap-6 px-6 py-10 md:grid-cols-2 md:px-16">
        {LEADER_KEYS.map((leader) => {
          const career = t.raw(`leaders.${leader.key}.career`) as string[];
          return (
<div
            key={leader.key}
            className="flex gap-6 overflow-hidden rounded-2xl bg-gray-50 p-6"
>
<div className="relative aspect-square w-[32%] shrink-0 self-stretch overflow-hidden rounded-xl bg-gray-200">
              {leader.photo && (
                <Image src={leader.photo} alt={t(`leaders.${leader.key}.name`)} fill className="object-cover" />
              )}
</div>
<div className="flex flex-col justify-start">
<span className="inline-block w-fit rounded-full bg-brand-navy px-3 py-1 text-xs font-bold text-white">
                {t(`leaders.${leader.key}.role`)}
</span>
<h2 className="mt-2 text-2xl font-black text-gray-900">
                {t(`leaders.${leader.key}.name`)}
</h2>
<div className="mt-4"><span className="inline-block rounded-full border border-gray-300 px-3 py-1 text-xs font-bold text-gray-700">{t("credentialsLabel")}</span>
<ul className="mt-3 space-y-2 text-sm leading-relaxed text-gray-600">
                    {career.map((line) => (
<li key={line}>{line}</li>
                    ))}
</ul>
</div>
</div>
</div>
          );
        })}
</section>

<section className="border-t border-gray-100 px-6 py-10 md:px-16">
<p className="text-xs font-bold tracking-widest text-brand-blue">COACHING STAFF</p>
<h2 className="mt-1 text-xl font-black text-gray-900 md:text-2xl">
          {t("staffHeading")}
</h2>

<div className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
          {COACH_KEYS.map((coach) => (
<div key={coach.key}>
<div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-200">
              {coach.photo && (
                <Image src={coach.photo} alt={t(`coaches.${coach.key}.name`)} fill className="object-cover" />
              )}
</div>
<p className="mt-2 text-center text-sm font-bold text-gray-900">
                {t(`coaches.${coach.key}.name`)}
</p>
<p className="text-center text-xs text-gray-500">
                {t(`coaches.${coach.key}.role`)}
</p>
</div>
          ))}
</div>
</section>
</div>
  );
}
