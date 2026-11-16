/* eslint-disable @next/next/no-img-element */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export const revalidate = 60;

type News = {
  id: string;
  category: "transfer" | "national" | "etc";
  title: string;
  player_name: string | null;
  from_team: string | null;
  to_team: string | null;
  photos: string[];
  created_at: string;
};

const CATS = ["transfer", "national", "etc"] as const;

export default async function NewsPage({ searchParams }: { searchParams: Promise<{ c?: string }> }) {
  const { c } = await searchParams;
  const t = await getTranslations("News");
  const active = CATS.find((x) => x === c);

  let q = supabase
    .from("news")
    .select("id, category, title, player_name, from_team, to_team, photos, created_at")
    .order("created_at", { ascending: false });
  if (active) q = q.eq("category", active);
  const { data, error } = await q;
  if (error) console.error(error);
  const items = (data || []) as News[];

  const tab = (on: boolean) =>
    `rounded-full border px-4 py-2 text-sm font-semibold transition ${on ? "border-brand-blue bg-brand-blue text-white" : "border-gray-200 text-gray-600 hover:border-brand-blue hover:text-brand-blue"}`;

  return (
    <div>
      <Header />
      <section className="px-6 py-16 md:px-16 md:py-24">
        <p className="text-sm font-bold tracking-widest text-brand-blue">NEWS</p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-gray-900 md:text-5xl">{t("heading")}</h1>
        <div className="mt-8 flex flex-wrap gap-2">
          <Link href="/news" className={tab(!active)}>{t("categories.all")}</Link>
          {CATS.map((k) => (
            <Link key={k} href={`/news?c=${k}`} className={tab(active === k)}>{t(`categories.${k}`)}</Link>
          ))}
        </div>
      </section>

      <section className="px-6 pb-24 md:px-16">
        {items.length === 0 ? (
          <p className="py-16 text-center text-gray-400">{t("empty")}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((n) => (
              <Link key={n.id} href={`/news/${n.id}`} className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition hover:shadow-lg">
                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                  {n.photos[0] && (
                    <img src={n.photos[0]} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  )}
                </div>
                <div className="p-5">
                  <span className="text-xs font-bold tracking-wider text-brand-blue">{t(`categories.${n.category}`)}</span>
                  <h2 className="mt-2 text-lg font-bold leading-snug text-gray-900">{n.title}</h2>
                  {n.category === "transfer" && n.player_name && (
                    <p className="mt-2 text-sm text-gray-600">
                      {n.player_name}
                      {(n.from_team || n.to_team) && <> · {n.from_team || "?"} → {n.to_team || "?"}</>}
                    </p>
                  )}
                  <p className="mt-3 text-xs text-gray-400">{new Date(n.created_at).toLocaleDateString("ko-KR")}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
