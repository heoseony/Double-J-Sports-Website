import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function GreetingPage() {
  const t = await getTranslations("GreetingPage");

  return (
    <div className="bg-[rgba(7,16,31,0.9)]">
      <Header />

      {/* 1. 첫 화면: 제목 · 요약 본문 · 단체사진 */}
      <section className="relative grid grid-cols-1 items-start gap-14 px-6 pb-20 pt-16 md:grid-cols-1 md:px-16 md:pb-32 md:pt-24">
        <div className="relative z-10 md:max-w-[600px]">
          <p className="text-xs font-semibold tracking-[0.3em] text-white/55 md:text-sm">ABOUT DOUBLE J SPORTS</p>

          <h1 className="mt-8 text-[32px] font-black leading-[1.3] text-white md:text-[44px]">
            {t("h1Line1")} {t("h1Line2")}
            <br />
            <span className="text-[#DDBB72]">{t("h1Line3")}</span>
          </h1>

          <div className="mt-12 whitespace-pre-line text-base leading-[1.95] text-white/85 md:text-[17px]">
            {t("lead")}
          </div>

          <div className="mt-9 whitespace-pre-line text-base leading-[1.95] text-white/85 md:text-[17px]">
            {t("lead2")}
          </div>

          <p className="mt-12 text-xs font-semibold tracking-[0.28em] text-[#DDBB72]">
            EVERY PLAYER. EVERY POSSIBILITY.
          </p>
        </div>

        <div className="dj-fade-l dj-team relative aspect-[1449/979] w-full overflow-hidden min-[1280px]:absolute min-[1280px]:right-0 min-[1280px]:top-28 min-[1280px]:aspect-[1749/979] min-[1280px]:w-auto">
          <Image
            src="/images/greeting-team.jpg"
            alt=""
            fill
            className="object-cover" style={{ objectPosition: "right center" }}
          />
        </div>
      </section>

      {/* 2. 전체 인사말 (기존 원문) */}
      <section className="px-6 pb-24 pt-4 md:px-16 md:pb-36">
        <div className="md:max-w-[600px]">
          <p className="text-xs font-semibold tracking-[0.3em] text-white/55 md:text-sm">{t("fullTitle")}</p>

          <h2 className="mt-8 text-2xl font-black leading-[1.4] text-white md:text-[28px]">
            {t("h1Line1")} {t("h1Line2")}
            <br />
            {t("h1Line3")}
          </h2>

          <div className="mt-10 whitespace-pre-line text-base leading-[1.95] text-white/75">{t("body1")}</div>

          <div className="mt-10 text-base leading-[1.95] text-white/75">
            {t("h2Line1")}
            <br />
            {t("h2Line2")}
            <br />
            {t("h2Line3")}
          </div>

          <div className="mt-8 whitespace-pre-line text-base leading-[1.95] text-white/75">{t("body2")}</div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
