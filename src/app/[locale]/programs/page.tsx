import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProgramsView, { type ProgramsDict } from "@/components/ProgramsView";
import { getTranslations } from "next-intl/server";

export default async function ProgramsPage() {
  const t = await getTranslations("ProgramsPage");
  const v = (k: string) => t(`view.${k}`);

  const dict: ProgramsDict = {
    h1: t("heading1"),
    h2: t("heading2"),
    lead1: v("lead1"),
    lead2: v("lead2"),
    introLabel: v("introLabel"),
    targetLabel: v("targetLabel"),
    cta: v("cta"),
    more: v("more"),
    sub: v("sub"),
    pro: {
      title: v("pro.title"),
      head: v("pro.head"),
      desc: v("pro.desc"),
      intro: v("pro.intro"),
      target: v("pro.target"),
      cta: v("pro.cta"),
    },
    academy: { title: v("academy.title"), head: v("academy.head"), desc: v("academy.desc") },
    hobby: { title: v("hobby.title"), head: v("hobby.head"), desc: v("hobby.desc") },
    programs: {
      kids: { title: v("kids.title"), desc: v("kids.desc"), target: v("kids.target") },
      elite: { title: v("elite.title"), desc: v("elite.desc") },
      women: { title: v("women.title"), desc: v("women.desc"), target: v("women.target") },
      men: { title: v("men.title"), desc: v("men.desc"), target: v("men.target") },
    },
  };

  return (
    <div>
      <Header />
      <ProgramsView dict={dict} />
      <Footer />
    </div>
  );
}
