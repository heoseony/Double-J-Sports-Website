/* eslint-disable @next/next/no-img-element */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";

export const revalidate = 60;

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = await getTranslations("News");
  const { data: n } = await supabase.from("news").select("*").eq("id", id).maybeSingle();
  if (!n) notFound();
  const photos = (n.photos || []) as string[];

  return (
    <div>
      <Header />
      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <p className="text-sm font-bold tracking-widest text-brand-blue">{t(`categories.${n.category}`)}</p>
        <h1 className="mt-3 text-3xl font-black leading-tight text-gray-900 md:text-4xl">{n.title}</h1>
        <p className="mt-3 text-xs text-gray-400">{new Date(n.created_at).toLocaleDateString("ko-KR")}</p>

        {n.category === "transfer" && n.player_name && (
          <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-5">
            <p className="text-xs font-bold text-gray-400">{t("player")}</p>
            <p className="mt-1 text-xl font-bold text-gray-900">{n.player_name}</p>
            {(n.from_team || n.to_team) && (
              <p className="mt-3 flex flex-wrap items-center gap-3 text-base font-semibold text-gray-700">
                <span>{n.from_team || "-"}</span>
                <span className="text-brand-blue">→</span>
                <span>{n.to_team || "-"}</span>
              </p>
            )}
          </div>
        )}
        {n.category === "national" && n.player_name && (
          <p className="mt-8 text-xl font-bold text-gray-900">{n.player_name}{n.to_team ? ` · ${n.to_team}` : ""}</p>
        )}

        {photos.length > 0 && (
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {photos.map((u, i) => (
              <img key={u} src={u} alt="" className={`w-full rounded-lg object-cover ${photos.length % 2 === 1 && i === 0 ? "sm:col-span-2" : ""}`} />
            ))}
          </div>
        )}

        {n.body && (
          <div className="mt-10 whitespace-pre-line border-t border-gray-100 pt-10 text-base leading-relaxed text-gray-700">{n.body}</div>
        )}

        <Link href="/news" className="mt-14 inline-block text-sm font-semibold text-brand-blue hover:underline">← {t("back")}</Link>
      </article>
      <Footer />
    </div>
  );
}
