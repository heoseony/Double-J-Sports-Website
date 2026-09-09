import Image from "next/image";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "ABOUT", href: "/about" },
  { label: "PROGRAMS", href: "/programs" },
  { label: "COACHES", href: "/coaches" },
  { label: "LOCATIONS", href: "/locations" },
  { label: "GALLERY", href: "/gallery" },
  { label: "NOTICE", href: "/notices" },
];

const BOOKING_URL = "https://double-j-sports.vercel.app";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-white px-6 py-3 shadow-sm">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/images/logo.png" alt="Double J Sports" width={40} height={40} />
        <div className="leading-tight">
          <p className="text-sm font-bold text-brand-navy">DOUBLE J</p>
          <p className="text-sm font-bold text-brand-navy">SPORTS ACADEMY</p>
        </div>
      </Link>

      <nav className="hidden gap-6 md:flex">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-sm font-bold text-gray-700 hover:text-brand-navy"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <button className="rounded-full border border-gray-300 px-3 py-1 text-sm text-gray-700">
          KR
        </button>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-brand-navy px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          수업 예약하기 →
        </a>
      </div>
    </header>
  );
}
