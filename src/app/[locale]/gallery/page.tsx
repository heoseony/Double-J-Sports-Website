import Image from "next/image";
import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export const revalidate = 60;

type PostWithThumbnail = {
  id: string;
  title: string | null;
  caption: string | null;
  created_at: string;
  thumbnail: string | null;
  category_id: string | null;
};

const CATEGORY_KEYS = [
  { id: null, key: "all", color: "bg-gray-400" },
  { id: "d1ad19a7-a579-48dd-8380-e16d478ebd2b", key: "kids", color: "bg-blue-500" },
  { id: "6f780863-7fa0-40ca-ba1c-d7d69ca7bc76", key: "elite", color: "bg-orange-500" },
  { id: "b2a8bc6f-aabc-4da4-bbe5-239d82be6475", key: "women", color: "bg-green-500" },
  { id: "4f1364d1-17f3-45f1-b7f1-ba4bcaa10c91", key: "men", color: "bg-purple-500" },
  { id: "59efee6c-12f4-478f-aff3-794930fb867d", key: "event", color: "bg-yellow-500" },
] as const;

async function getPosts(): Promise<PostWithThumbnail[]> {
  const { data: posts, error } = await supabase
    .from("photo_posts")
    .select("id, title, caption, created_at, category_id")
    .order("created_at", { ascending: false });

  if (error || !posts) {
    console.error(error);
    return [];
  }

  const { data: media } = await supabase
    .from("photo_post_media")
    .select("post_id, media_url, media_type, poster_url, order_index")
    .order("order_index", { ascending: true });

  return posts.map((post) => {
    const firstMedia = (media || []).find((m) => m.post_id === post.id);
    const thumbnail = firstMedia
      ? firstMedia.media_type === "video"
        ? firstMedia.poster_url
        : firstMedia.media_url
      : null;
    return { ...post, thumbnail };
  });
}

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const t = await getTranslations("Gallery");
  const posts = await getPosts();
  const params = await searchParams;
  const activeCategory = params.category || null;

  const filteredPosts = activeCategory
    ? posts.filter((post) => post.category_id === activeCategory)
    : posts;

  return (
<div>
<Header />

<section className="px-6 pt-10 pb-4 md:px-16">
<div className="flex flex-wrap gap-2">
          {CATEGORY_KEYS.map((cat) => (
<Link
              key={cat.key}
              href={cat.id ? `/gallery?category=${cat.id}` : "/gallery"}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition ${
                activeCategory === cat.id
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
              }`}
            >
              {cat.id && (
                <span className={`h-2 w-2 rounded-full ${cat.color}`} />
              )}
              {t(`categories.${cat.key}`)}
            </Link>
          ))}
</div>
</section>

<section className="px-6 pb-24 md:px-16">
        {filteredPosts.length === 0 && (
          <p className="py-12 text-sm text-gray-400">{t("noPosts")}</p>
        )}
<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/gallery/${post.id}`}
              className="group block"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                {post.thumbnail && (
                  <Image
                    src={post.thumbnail}
                    alt=""
                    fill
                    className="object-cover transition group-hover:scale-105"
                  />
                )}
              </div>
              <p className="mt-2 truncate text-sm font-medium text-gray-900">
                {post.title || post.caption || t("noTitle")}
              </p>
            </Link>
          ))}
</div>
</section>
</div>
  );
}
