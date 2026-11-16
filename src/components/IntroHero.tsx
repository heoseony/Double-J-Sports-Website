"use client";

// INTRO-HOME: 홈 첫 화면. 스크롤하면 공이 잔디 위로 내려앉고 메뉴가 왼쪽에 나타나는 인트로.
// 이미지는 public/images/intro/ 안에 있고, 바꾸려면 같은 이름으로 교체하면 됩니다.
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import ApplyModal from "./ApplyModal";

const BOOKING_URL = "https://double-j-sports.vercel.app";
const LOCALES = ["ko", "en", "de", "ja"] as const;
const LANG_SHORT: Record<(typeof LOCALES)[number], string> = { ko: "KO", en: "EN", de: "DE", ja: "JA" };

// 공 위 글씨(이미지에 박혀 있음)의 클릭 영역 위치 — 이미지를 바꾸면 이 좌표도 맞춰야 합니다.
const BALL_LINKS = [
  { key: "about", href: "/about", left: "50.2%", top: "30.6%" },
  { key: "program", href: "/programs", left: "59.8%", top: "43.8%" },
  { key: "gallery", href: "/gallery", left: "59.0%", top: "64.2%" },
  { key: "location", href: "/locations", left: "50.1%", top: "74.5%" },
  { key: "notice", href: "/notices", left: "41.1%", top: "63.9%" },
  { key: "coach", href: "/coaches", left: "39.9%", top: "43.8%" },
] as const;

const SIDE_LINKS = [
  { key: "about", href: "/about" },
  { key: "program", href: "/programs" },
  { key: "coach", href: "/coaches" },
  { key: "location", href: "/locations" },
  { key: "gallery", href: "/gallery" },
  { key: "notice", href: "/notices" },
] as const;

export default function IntroHero() {
  const th = useTranslations("Header");
  const t = useTranslations("Hero");
  const locale = useLocale() as (typeof LOCALES)[number];
  const pathname = usePathname();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    function update() {
      raf = 0;
      if (!root || !stage) return;
      const r = root.getBoundingClientRect();
      const total = root.offsetHeight - window.innerHeight;
      const p = reduce ? 1 : total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      root.style.setProperty("--p", p.toFixed(4));
      stage.dataset.scrolled = p > 0.25 ? "1" : "0";
    }
    function onScroll() {
      if (!raf) raf = requestAnimationFrame(update);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <section ref={rootRef} className="intro-root intro-hero">
        <div ref={stageRef} className="intro-stage" data-scrolled="0">
          <div className="intro-util">
            {LOCALES.map((code) => (
              <button
                key={code}
                type="button"
                aria-current={locale === code}
                onClick={() => router.replace(pathname, { locale: code })}
              >
                {LANG_SHORT[code]}
              </button>
            ))}
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              {th("booking")}
            </a>
          </div>
          <div className="intro-top">
            <img src="/images/intro/logo.webp" alt="Double J Sports" />
          </div>

          <div className="intro-gwrap">
            <img className="intro-bg intro-grass" src="/images/intro/hero-grass.jpg" alt="" draggable={false} />
            <img className="intro-endball" src="/images/intro/ball-end.webp" alt="" draggable={false} />
          </div>

          <div className="intro-wrap">
            <img className="intro-bg intro-black" src="/images/intro/hero-black.jpg" alt="" draggable={false} />
            <div className="intro-bshadow">
              <i className="intro-w" />
              <i className="intro-c" />
            </div>
            <img className="intro-ball" src="/images/intro/ball.webp" alt="Double J Sports" draggable={false} />
            <img className="intro-ball intro-ball-lab" src="/images/intro/ball-labels.webp" alt="" draggable={false} />

            <div className="intro-labels">
              {BALL_LINKS.map((l) => (
                <Link key={l.key} href={l.href} aria-label={th(`nav.${l.key}`)} style={{ left: l.left, top: l.top }}>
                  {th(`nav.${l.key}`)}
                </Link>
              ))}
            </div>

            <div className="intro-word intro-l">DOUBLE</div>
            <div className="intro-word intro-r">SPORTS</div>
          </div>

          <nav className="intro-sidenav" aria-label="menu">
            {SIDE_LINKS.map((l, i) => (
              <Link key={l.key} href={l.href} style={{ "--i": i } as CSSProperties}>
                {th(`nav.${l.key}`)}
              </Link>
            ))}
          </nav>
          <div className="intro-title">DOUBLE J SPORTS</div>
          <button className="intro-cta" type="button" onClick={() => setModalOpen(true)}>
            {t("cta")}
          </button>
          <div className="intro-hint">SCROLL</div>
        </div>
      </section>
      <ApplyModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
