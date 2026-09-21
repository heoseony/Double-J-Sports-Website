import Header from "@/components/Header";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

export const revalidate = 60;

async function getPost(id: string) {
  const { data: post, error } = await supabase
    .from("photo_posts")
    .select("id, title, caption, created_at")
    .eq("id", id)
    .single();

  if (error || !post) return null;

  const { data: media } = await supabase
    .from("photo_post_media")
    .select("id, media_url, media_type, poster_url, order_index")
    .eq("post_id", id)
    .order("order_index", { ascending: true });

  return { post, media: media || [] };
}

export default async function GalleryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const t = await getTranslations("Gallery");
  const { id } = await params;
  const result = await getPost(id);

  if (!result) notFound();

  const { post, media } = result;

  return (
<div>
<Header />

<section className="px-6 py-16 md:px-16">
<p className="text-xs text-gray-400">
          {new Date(post.created_at).toLocaleDateString("ko-KR")}
</p>
<h1 className="mt-2 text-2xl font-black text-gray-900 md:text-3xl">
          {post.title || post.caption || t("noTitle")}
</h1>
        {post.caption && post.title && (
          <p className="mt-3 text-sm text-gray-600">{post.caption}</p>
        )}
</section>

<section className="px-6 pb-24 md:px-16">
<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {media.map((m) => (
            <div key={m.id} className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
              {m.media_type === "video" ? (
                <video
                  src={m.media_url}
                  poster={m.poster_url || undefined}
                  controls
                  className="h-full w-full object-cover"
                />
              ) : (
                <Image src={m.media_url} alt="" fill className="object-cover" />
              )}
            </div>
          ))}
</div>
        {media.length === 0 && (
          <p className="py-12 text-sm text-gray-400">{t("noMedia")}</p>
        )}
</section>
</div>
  );
}
