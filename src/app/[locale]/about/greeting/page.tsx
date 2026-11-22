import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function GreetingPage() {
  const t = await getTranslations("GreetingPage");

  return (
    <div className="bg-[rgba(7,16,31,0.9)]">
      <Header />

      <section className="relative grid grid-cols-1 items-start gap-14 px-6 pb-24 pt-16 md:px-16 md:pb-32 md:pt-24">
        <div className="relative z-10 md:max-w-[600px]">
          <p className="text-sm font-semibold tracking-[0.3em] text-white/55">{t("eyebrow")}</p>

          <h1 className="mt-8 text-[32px] font-black leading-[1.3] text-white md:text-[44px]">
            {t("h1Line1")} {t("h1Line2")}
            <br />
            <span className="text-[#DDBB72]">{t("h1Line3")}</span>
          </h1>

          <div className="mt-12 whitespace-pre-line text-base leading-[1.95] text-white/85 md:text-[17px]">
            {t("body1")}
          </div>

          <div className="mt-10 text-base leading-[1.95] text-white/85 md:text-[17px]">
            {t("h2Line1")}
            <br />
            {t("h2Line2")}
            <br />
            {t("h2Line3")}
          </div>

          <div className="mt-6 whitespace-pre-line text-base leading-[1.95] text-white/85 md:text-[17px]">
            {t("body2")}
          </div>
        </div>

        <div className="dj-team relative aspect-[1449/979] w-full overflow-hidden min-[1200px]:absolute min-[1200px]:bottom-auto min-[1200px]:left-[560px] min-[1200px]:right-0 min-[1200px]:top-28 min-[1200px]:w-auto">
          <Image src="/images/greeting-team.jpg" alt="" fill className="object-cover" style={{ objectPosition: "right center" }} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
