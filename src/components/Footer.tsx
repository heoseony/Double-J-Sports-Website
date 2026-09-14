import Link from "next/link";

const FOOTER_LINKS = [
  { label: "ABOUT", href: "/about" },
  { label: "PROGRAM", href: "/programs" },
  { label: "COACH", href: "/coaches" },
  { label: "LOCATION", href: "/locations" },
  { label: "GALLERY", href: "/gallery" },
  { label: "NOTICE", href: "/notices" },
];

export default function Footer() {
  return (
    <footer className="bg-white px-6 py-10 md:px-16">
      <div className="flex flex-col items-center justify-between gap-6 border-t border-gray-100 pt-8 md:flex-row">
        <div className="text-sm font-bold text-brand-navy">
          DOUBLE J SPORTS ACADEMY
        </div>

        <nav className="flex flex-wrap justify-center gap-4">
          {FOOTER_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-semibold text-gray-500 hover:text-brand-navy"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <p className="mt-6 text-center text-[11px] text-gray-400">
        © 2026 DOUBLE J SPORTS ACADEMY. All rights reserved.
      </p>
    </footer>
  );
}
