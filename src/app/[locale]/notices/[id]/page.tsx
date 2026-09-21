import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export const revalidate = 60;

async function getNotice(id: string) {
  const { data, error } = await supabase
    .from("notices")
    .select("id, title, content, created_at")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data;
}

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const notice = await getNotice(id);

  if (!notice) notFound();

  return (
<div>
<Header />

<section className="px-6 py-16 md:px-16">
<p className="text-sm font-bold tracking-widest text-brand-blue">NOTICE</p>
<h1 className="mt-3 text-3xl font-black leading-tight text-gray-900 md:text-4xl">
            {notice.title}
</h1>
<p className="mt-3 text-xs text-gray-400">
            {new Date(notice.created_at).toLocaleDateString("ko-KR")}
</p>

<div className="mt-10 whitespace-pre-line border-t border-gray-100 pt-10 text-base leading-relaxed text-gray-700">
            {notice.content}
</div>
</section>
</div>
  );
}
