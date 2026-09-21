import Header from "@/components/Header";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const t = await getTranslations("ComingSoon");
  return (
    <div>
      <Header />
      <main className="flex min-h-[400px] flex-col items-center justify-center gap-3 px-6 py-24 text-center">
        <p className="text-xs font-bold tracking-widest text-brand-blue">{t("pages.programsAcademy.category")}</p>
        <h1 className="text-2xl font-bold text-brand-navy">{t("pages.programsAcademy.title")}</h1>
        <p className="text-sm text-gray-500">{t("notice")}</p>
      </main>
    </div>
  );
}
