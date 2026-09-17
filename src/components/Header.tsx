"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NAV_ITEMS = [
  {
    label: "ABOUT",
    href: "/about",
    children: [
      { label: "인사말", href: "/about/greeting" },
      { label: "비전&철학", href: "/about/vision" },
    ],
  },
  { label: "PROGRAM", href: "/programs", children: [] },
  { label: "COACH", href: "/coaches", children: [] },
  { label: "LOCATION", href: "/locations", children: [] },
  { label: "GALLERY", href: "/gallery", children: [] },
  { label: "NOTICE", href: "/notices", children: [] },
];

const INSTAGRAM_ACCOUNTS = [
  { label: "더블제이스포츠", handle: "@double_j_sports2021", href: "https://www.instagram.com/double_j_sports2021/" },
  { label: "더블제이스포츠아카데미", handle: "@double_j_academy", href: "https://www.instagram.com/double_j_academy/" },
  { label: "더블제이 맨즈", handle: "@fc_double_j", href: "https://www.instagram.com/fc_double_j/" },
];

const YOUTUBE_URL = "https://www.youtube.com/@Double_J_Sports";
const TIKTOK_URL = "https://www.tiktok.com/@double.j.sports";
const BOOKING_URL = "https://double-j-sports.vercel.app";

export default function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [lang, setLang] = useState<"ko" | "en" | "de" | "ja">("ko");
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const LANG_LABELS: Record<"ko" | "en" | "de" | "ja", string> = {
    ko: "한국어",
    en: "English",
    de: "Deutsch",
    ja: "日本語",
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-3 md:px-16">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="Double J Sports" width={40} height={40} />
          <div className="leading-tight">
            <p className="text-sm font-bold text-brand-navy">DOUBLE J</p>
            <p className="text-sm font-bold text-brand-navy">SPORTS ACADEMY</p>
          </div>
        </Link>

        <nav className="hidden gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => setOpenMenu(item.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <Link
                href={item.href}
                className="block py-2 text-sm font-bold text-gray-700 hover:text-brand-navy"
              >
                {item.label}
              </Link>

              {item.children.length > 0 && openMenu === item.label && (
                <div className="absolute left-0 top-full min-w-[160px] rounded-lg border border-gray-100 bg-white py-2 shadow-lg">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-navy"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Menu"
          className="flex flex-col gap-1.5 p-2 md:hidden"
        >
          <span className="h-0.5 w-6 bg-brand-navy"></span>
          <span className="h-0.5 w-6 bg-brand-navy"></span>
          <span className="h-0.5 w-6 bg-brand-navy"></span>
        </button>

        <div className="hidden items-center gap-4 md:flex">
          <div className="flex gap-3">
            <div
              className="relative flex items-center"
              onMouseEnter={() => setOpenMenu("instagram")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button aria-label="Instagram" className="text-gray-400 hover:text-brand-navy">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
                </svg>
              </button>

              {openMenu === "instagram" && (
                <div className="absolute right-0 top-full w-[230px] rounded-lg border border-gray-100 bg-white py-2 shadow-lg">
                  {INSTAGRAM_ACCOUNTS.map((acc, i) => (
                    <a
                      key={acc.href}
                      href={acc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex flex-col gap-0.5 px-4 py-2.5 hover:bg-gray-50 ${i !== 0 ? "border-t border-gray-100" : ""}`}
                    >
                      <span className="text-sm font-semibold text-gray-700">{acc.label}</span>
                      <span className="text-xs text-gray-400">{acc.handle}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-gray-400 hover:text-brand-navy">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" strokeWidth="2"/>
                <path d="M10 9L15 12L10 15V9Z" fill="currentColor"/>
              </svg>
            </a>

            <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-gray-400 hover:text-brand-navy">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 3C15.3 5.2 16.8 6.9 19 7.2V10C17.5 10 16.1 9.5 15 8.6V15.5C15 18.5 12.6 21 9.5 21C6.4 21 4 18.5 4 15.5C4 12.5 6.4 10 9.5 10C9.8 10 10.1 10 10.4 10.1V13.2C10.1 13.1 9.8 13 9.5 13C8.1 13 7 14.1 7 15.5C7 16.9 8.1 18 9.5 18C10.9 18 12 16.9 12 15.5V3H15Z" fill="currentColor"/>
              </svg>
            </a>
          </div>

          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1 rounded-full border border-gray-300 px-3 py-1.5 text-xs font-bold text-brand-navy hover:border-brand-navy"
            >
              <span>🌐</span>
              {LANG_LABELS[lang]}
              <span className={`text-[10px] transition-transform ${langOpen ? "rotate-180" : ""}`}>▾</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-32 overflow-hidden rounded-xl border border-gray-200 bg-white text-xs font-bold shadow-lg">
                {(["ko", "en", "de", "ja"] as const).map((code) => (
                  <button
                    key={code}
                    onClick={() => {
                      setLang(code);
                      setLangOpen(false);
                    }}
                    className={`block w-full px-4 py-2 text-left ${lang === code ? "bg-brand-navy text-white" : "text-gray-600 hover:bg-gray-50"}`}
                  >
                    {LANG_LABELS[code]}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-brand-navy px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            수업 예약하기 →
          </a>
        </div>
      </div>
    {mobileOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-white md:hidden">
          <div className="flex items-center justify-between px-6 py-3">
            <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
              <Image src="/images/logo.png" alt="Double J Sports" width={40} height={40} />
              <div className="leading-tight">
                <p className="text-sm font-bold text-brand-navy">DOUBLE J</p>
                <p className="text-sm font-bold text-brand-navy">SPORTS ACADEMY</p>
              </div>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close"
              className="p-2 text-2xl text-brand-navy"
            >
              ×
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 py-4">
            {NAV_ITEMS.map((item) => (
              <div key={item.href} className="border-b border-gray-100 py-2">
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 text-base font-bold text-gray-800"
                >
                  {item.label}
                </Link>
                {item.children.length > 0 && (
                  <div className="ml-3 flex flex-col gap-1 pb-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="py-1.5 text-sm text-gray-500"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex flex-col gap-3 border-t border-gray-100 px-6 py-4">
            <div className="flex items-center gap-4">
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-gray-400">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M10 9L15 12L10 15V9Z" fill="currentColor"/>
                </svg>
              </a>
              <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-gray-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 3C15.3 5.2 16.8 6.9 19 7.2V10C17.5 10 16.1 9.5 15 8.6V15.5C15 18.5 12.6 21 9.5 21C6.4 21 4 18.5 4 15.5C4 12.5 6.4 10 9.5 10C9.8 10 10.1 10 10.4 10.1V13.2C10.1 13.1 9.8 13 9.5 13C8.1 13 7 14.1 7 15.5C7 16.9 8.1 18 9.5 18C10.9 18 12 16.9 12 15.5V3H15Z" fill="currentColor"/>
                </svg>
              </a>
            </div>

            <div className="flex flex-wrap gap-2">
              {(["ko", "en", "de", "ja"] as const).map((code) => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-bold ${lang === code ? "border-brand-navy bg-brand-navy text-white" : "border-gray-300 text-gray-600"}`}
                >
                  {LANG_LABELS[code]}
                </button>
              ))}
            </div>

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-brand-navy px-4 py-3 text-center text-sm font-medium text-white"
            >
              수업 예약하기 →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
