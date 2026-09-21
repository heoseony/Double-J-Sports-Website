import Header from "@/components/Header";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

const PILLAR_KEYS = ["training", "match", "growth", "pro"] as const;

const PILLAR_ICONS: Record<(typeof PILLAR_KEYS)[number], React.ReactNode> = {
  training: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16v4H4z" />
      <path d="M4 10h10v4H4z" />
      <path d="M4 16h7v4H4z" />
    </svg>
  ),
  match: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18M3 12h18" />
    </svg>
  ),
  growth: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20V15" />
      <path d="M9 20V11" />
      <path d="M14 20V7" />
      <path d="M19 20V4" />
    </svg>
  ),
  pro: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 4h8l-1 6a3 3 0 0 1-6 0z" />
      <path d="M12 13v4" />
      <path d="M9 20h6" />
    </svg>
  ),
};

export default async function VisionPage() {
  const t = await getTranslations("VisionPage");

  return (
    <div>
      <Header />

      <section className="relative overflow-hidden px-6 py-16 md:px-16">
        <div className="absolute inset-0">
          <Image
            src="/images/vision-hero.png"
            alt=""
            fill
            className="object-cover object-[10%_60%]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/40" />
        </div>

        <div className="relative z-10">
          <h1 className="text-4xl font-black leading-tight text-gray-900 md:text-5xl">
            {t("titleLine1")}
            <br />
            <span className="text-brand-blue">{t("titleLine2")}</span>
          </h1>

          <div className="mt-5 max-w-xl text-base leading-relaxed text-gray-700">
            <p className="whitespace-pre-line">{t("body")}</p>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 px-6 py-14 md:px-16">
        <div className="grid grid-cols-1 gap-10 divide-y divide-gray-100 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {PILLAR_KEYS.map((key) => (
            <div key={key} className="flex flex-col items-center gap-3 pt-8 text-center first:pt-0 sm:pt-0 lg:px-6 lg:first:pl-0 lg:last:pr-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-brand-blue">
                {PILLAR_ICONS[key]}
              </div>
              <p className="text-xs font-bold tracking-wide text-brand-navy">{t(`pillars.${key}.title`)}</p>
              <p className="whitespace-pre-line text-xs leading-relaxed text-gray-500">
                {t(`pillars.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
