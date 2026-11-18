import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getTranslations } from "next-intl/server";

const PILLAR_KEYS = ["training", "match", "growth", "pro"] as const;

// 아이콘 그림: public/images/vision/pillar-<이름>.webp (같은 이름으로 바꾸면 됩니다)
const PILLAR_ICONS: Record<(typeof PILLAR_KEYS)[number], React.ReactNode> = Object.fromEntries(
  PILLAR_KEYS.map((k) => [
    k,
    // eslint-disable-next-line @next/next/no-img-element
    <img key={k} src={`/images/vision/pillar-${k}.webp`} alt="" width={30} height={30} className="h-[30px] w-[30px] object-contain" />,
  ]),
) as Record<(typeof PILLAR_KEYS)[number], React.ReactNode>;

export default async function VisionPage() {
  const t = await getTranslations("VisionPage");

  return (
    <div>
      <Header />

      {/* VISION-HERO: 왼쪽에 카피(왼쪽 정렬), 오른쪽에 수업 영상. 영상은 글씨 쪽으로 살짝 겹치며 그라데이션으로 번짐. 영상 교체: public/videos/vision-class.mp4 */}
      <section className="vision-hero relative overflow-hidden px-6 py-16 md:px-16 md:py-24">
        <div className="vision-video" aria-hidden="true">
          <video src="/videos/vision-class.mp4" autoPlay muted loop playsInline preload="auto" />
        </div>
        <div className="relative z-10 text-left md:max-w-[52%]">
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
      <Footer />
    </div>
  );
}
