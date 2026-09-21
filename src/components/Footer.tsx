import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const FOOTER_LINK_KEYS = [
  { key: "about", href: "/about" },
  { key: "program", href: "/programs" },
  { key: "coach", href: "/coaches" },
  { key: "location", href: "/locations" },
  { key: "gallery", href: "/gallery" },
  { key: "notice", href: "/notices" },
] as const;

export default async function Footer() {
  const t = await getTranslations("Header");
  const tf = await getTranslations("Footer");

  return (
    <footer className="bg-white px-6 py-10 md:px-16">
      <div className="flex flex-col items-center justify-between gap-6 border-t border-gray-100 pt-8 md:flex-row">
        <div className="text-sm font-bold text-brand-navy">
          {tf("tagline")}
        </div>

        <nav className="flex flex-wrap justify-center gap-4">
          {FOOTER_LINK_KEYS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-semibold text-gray-500 hover:text-brand-navy"
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>
      </div>

      <p className="mt-6 text-center text-[11px] text-gray-400">
        {tf("copyright")}
      </p>
    </footer>
  );
}
