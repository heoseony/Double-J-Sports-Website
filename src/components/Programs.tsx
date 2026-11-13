import { getTranslations } from "next-intl/server";

const PROGRAM_KEYS = ["pro", "academy", "women", "men", "private"] as const;

export default async function Programs() {
  const t = await getTranslations("HomePrograms");

  return (
    <section className="px-6 py-20 md:px-16 md:py-32">
      <p className="text-xs font-bold tracking-widest text-brand-blue">
        OUR PROGRAMS
      </p>
      <h2 className="mt-3 text-3xl font-bold text-brand-navy md:text-4xl">
        {t("heading")}
      </h2>
      <p className="mt-4 max-w-xl text-sm text-gray-600">
        {t("intro")}
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {PROGRAM_KEYS.map((key) => (
          <div
            key={key}
            className="relative rounded-md border border-gray-200 border-t-2 border-t-brand-blue bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <p className="text-xl font-bold text-brand-navy">{t(`items.${key}.title`)}</p>
            <p className="mt-1 text-xs font-semibold tracking-wide text-gray-500">{t(`items.${key}.subtitle`)}</p>
            <p className="mt-4 text-sm leading-relaxed text-gray-600">{t(`items.${key}.description`)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
