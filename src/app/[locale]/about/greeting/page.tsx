import Header from "@/components/Header";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function GreetingPage() {
  const t = await getTranslations("GreetingPage");

  return (
    <div>
      <Header />

      {/* Section 1 */}
      <section className="grid grid-cols-1 items-start gap-10 px-6 pb-6 pt-16 md:grid-cols-2 md:px-16 md:pb-8 md:pt-20">
        <div>
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
        </div>

        <div className="relative mt-6 h-[420px] w-full max-w-[640px] overflow-hidden rounded-lg bg-gray-100 md:mt-10 md:h-[480px]">
          <Image
            src="/images/greeting-1.jpg"
            alt=""
            fill
            className="object-cover object-[center_75%]"
          />
        </div>
      </section>

      {/* Section 2 */}
      <section className="grid grid-cols-1 items-start gap-10 px-6 pt-6 pb-16 md:grid-cols-2 md:px-16 md:pt-8 md:pb-24">
        <div className="relative order-2 h-[320px] w-full overflow-hidden rounded-lg bg-gray-100 md:order-1 md:h-[380px]">
          <Image
            src="/images/greeting-2.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        <div className="order-1 md:order-2">
                    <h2 className="mt-3 text-3xl font-black leading-tight text-gray-900 md:text-4xl">
            {t("h2Line1")}
            <br />
            {t("h2Line2")}
            <br />
            <span className="text-brand-blue">{t("h2Line3")}</span>
          </h2>

          <div className="mt-6 whitespace-pre-line text-base leading-[1.8] text-gray-700">
            <p>{t("body2")}</p>
          </div>

          <div className="mt-6 h-px w-10 bg-gray-300" />
        </div>
      </section>

      {/* Closing */}
      <section className="relative overflow-hidden bg-brand-navy px-6 py-20 md:px-16 md:py-28">
        <div className="absolute inset-0">
          <Image
            src="/images/greeting-3.jpg"
            alt=""
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/80 to-transparent" />
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl font-black leading-tight text-white md:text-4xl">
            TRAIN LIKE A PRO.
            <br />
            <span className="text-blue-400">GROW YOUR WAY.</span>
          </h2>
          <div className="mt-5 h-px w-10 bg-white/40" />
          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-white/80 md:text-base">
            {t("closingBody")}
          </p>
        </div>

      </section>
    </div>
  );
}
