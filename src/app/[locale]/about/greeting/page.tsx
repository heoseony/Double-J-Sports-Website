import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function GreetingPage() {
  const t = await getTranslations("GreetingPage");

  return (
    <div>
      <Header />

      {/* Section 1 */}
      <section className="relative grid grid-cols-1 items-start gap-10 px-6 pb-16 pt-16 md:grid-cols-1 md:px-16 md:pb-24 md:pt-20">
        <div className="relative z-10 md:max-w-[540px]">
          <p className="text-sm font-bold tracking-widest text-brand-blue">ABOUT</p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-gray-900 md:text-5xl">
            {t("h1Line1")}
            <br />
            {t("h1Line2")}
            <br />
            <span className="text-brand-blue">{t("h1Line3")}</span>
          </h1>

          <div className="mt-6 h-px w-10 bg-gray-300" />

          <div className="mt-6 whitespace-pre-line text-base leading-[1.8] text-gray-700">
            {t("body1")}
          </div>

          {/* 이어지는 두 번째 카피 */}
          <div className="mt-10 text-base leading-[1.8] text-gray-700">
            <p>
              {t("h2Line1")}
              <br />
              {t("h2Line2")}
              <br />
              {t("h2Line3")}
            </p>
          </div>

          <div className="mt-6 whitespace-pre-line text-base leading-[1.8] text-gray-700">
            <p>{t("body2")}</p>
          </div>
        </div>

        <div className="dj-fade-l dj-team relative mt-6 aspect-[1749/979] w-full overflow-hidden md:absolute md:right-0 md:top-24 md:mt-0 md:w-auto">
          <Image
            src="/images/greeting-team.jpg"
            alt=""
            fill
            className="object-cover object-center"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
