import Header from "@/components/Header";
import { getTranslations } from "next-intl/server";

const PROGRAM_KEYS = ["pro", "academy", "women", "men", "private"] as const;

export default async function ProgramsPage() {
  const t = await getTranslations("ProgramsPage");

  return (
    <div>
      <Header />

      <section className="px-6 py-16 md:px-16">
        <p className="text-sm font-bold tracking-widest text-brand-blue">PROGRAM</p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-gray-900 md:text-5xl">
          {t("heading1")}
          <br />
          {t("heading2")}
        </h1>
      </section>

      <section className="divide-y divide-gray-100 border-t border-gray-100">
        {PROGRAM_KEYS.map((key) => (
          <div
            key={key}
            className="grid grid-cols-1 gap-4 px-6 py-12 md:grid-cols-[260px_1fr] md:gap-10 md:px-16 md:py-16"
          >
            <div>
              <p className="text-xs font-bold tracking-widest text-gray-400">
                {t(`items.${key}.subtitle`)}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <h2 className="text-2xl font-black text-brand-navy md:text-3xl">
                  {t(`items.${key}.title`)}
                </h2>
              </div>
            </div>
            <p className="whitespace-pre-line text-base leading-relaxed text-gray-600 md:text-lg">
              {t(`items.${key}.desc`)}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
