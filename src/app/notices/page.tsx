import Link from "next/link";
import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

type Notice = {
  id: string;
  title: string;
  created_at: string;
};

async function getNotices() {
  const { data, error } = await supabase
    .from("notices")
    .select("id, title, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }
  return data as Notice[];
}

export default async function NoticesPage() {
  const notices = await getNotices();
  const total = notices.length;

  return (
<div>
<Header />

<section className="px-6 py-16 md:px-16">
<p className="text-sm font-bold tracking-widest text-brand-blue">NOTICE</p>
<h1 className="mt-3 text-4xl font-black leading-tight text-gray-900 md:text-5xl">
          공지사항
</h1>
</section>

<section className="px-6 pb-24 md:px-16">
<div className="overflow-hidden rounded-lg border border-gray-200">
<table className="w-full text-sm">
<thead>
<tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-bold text-gray-500">
<th className="w-20 px-4 py-3 text-center">No.</th>
<th className="px-4 py-3">제목</th>
<th className="w-32 px-4 py-3 text-center">등록일</th>
</tr>
</thead>
<tbody>
                {notices.length === 0 && (
<tr>
<td colSpan={3} className="px-4 py-12 text-center text-gray-400">
                      등록된 공지사항이 없습니다.
</td>
</tr>
                )}
                {notices.map((notice, i) => (
<tr
                    key={notice.id}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
>
<td className="px-4 py-4 text-center text-gray-400">
                      {total - i}
</td>
<td className="px-4 py-4">
<Link
                        href={`/notices/${notice.id}`}
                        className="font-medium text-gray-900 hover:text-brand-blue"
>
                        {notice.title}
</Link>
</td>
<td className="px-4 py-4 text-center text-gray-400">
                      {new Date(notice.created_at).toLocaleDateString("ko-KR")}
</td>
</tr>
                ))}
</tbody>
</table>
</div>
</section>
</div>
  );
}
