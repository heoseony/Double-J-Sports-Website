"use client";

// INTRO-HOME: 홈 첫 화면. 스크롤하면 공이 잔디 위로 내려앉고 메뉴가 왼쪽에 나타나는 인트로.
// 이미지는 public/images/intro/ 안에 있고, 바꾸려면 같은 이름으로 교체하면 됩니다.
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import ApplyModal from "./ApplyModal";
import CoachCarousel from "./CoachCarousel";
import IntroPanel from "./IntroPanel";

const LOCALES = ["ko", "en", "de", "ja"] as const;
const LANG_SHORT: Record<(typeof LOCALES)[number], string> = { ko: "KO", en: "EN", de: "DE", ja: "JA" };

type SideLink = { key: string; href: string; children?: { key: string; href: string }[] };
const SIDE_LINKS: SideLink[] = [
  {
    key: "about",
    href: "/about",
    children: [
      { key: "greeting", href: "/about/greeting" },
      { key: "vision", href: "/about/vision" },
    ],
  },
  { key: "program", href: "/programs" },
  { key: "news", href: "/news" },
  { key: "location", href: "/locations" },
  { key: "notice", href: "/notices" },
  { key: "coach", href: "/coaches" },
];

export default function IntroHero() {
  const th = useTranslations("Header");
  const t = useTranslations("Hero");
  const locale = useLocale() as (typeof LOCALES)[number];
  const pathname = usePathname();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [coachOpen, setCoachOpen] = useState(false);
  const [panel, setPanel] = useState<string | null>(null);
  const closePanel = useCallback(() => setPanel(null), []);
  const openPanel = (href: string) => {
    const h = href === "/about" ? "/about/greeting" : href;
    setPanel((cur) => (cur === h ? null : h));
  };
  const panelSrc = panel ? (locale === "ko" ? panel : `/${locale}${panel}`) : null;
  const activeKey = SIDE_LINKS.find((l) => panel && (l.href === panel || l.children?.some((c) => c.href === panel) || (l.key === "about" && panel === "/about/greeting")))?.key;
  const ct = useTranslations("CoachesPage");
  const closeCoach = useCallback(() => setCoachOpen(false), []);
  const coachItems = useMemo(
    () => [
      ...["jungYeonUng", "jungYeonHwang"].map((k) => ({
        key: k, name: ct(`leaders.${k}.name`), role: ct(`leaders.${k}.role`),
        career: ct.raw(`leaders.${k}.career`) as string[], photo: `/images/coach-card/${k}.jpg`,
      })),
      ...["jungChiHyun", "choHoon", "peter"].map((k) => ({
        key: k, name: ct(`coaches.${k}.name`), role: ct(`coaches.${k}.role`),
        career: ct.raw(`coaches.${k}.career`) as string[], photo: `/images/coach-card/${k}.jpg`,
      })),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locale],
  );
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const freeRef = useRef<HTMLDivElement>(null);

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
      // 잔디에 나타나는 공은 기울어지는 잔디 밖에 따로 그려서(찌그러짐 방지), 잔디 위 표식 위치를 따라가게 함
      const m = markRef.current;
      const f = freeRef.current;
      if (m && f) {
        const sr = stage.getBoundingClientRect();
        const mr = m.getBoundingClientRect();
        const w = mr.width;
        const h = w * 1.25;
        f.style.width = w + "px";
        f.style.height = h + "px";
        f.style.left = mr.left - sr.left + "px";
        f.style.top = mr.top + mr.height * 0.48 - sr.top - h * 0.48 + "px";
      }
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
      <section ref={rootRef} className="intro-root intro-hero" data-panel={panel ? "1" : "0"}>
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
          </div>
          <div className="intro-top">
            <img src="/images/intro/logo.webp" alt="Double J Sports" />
          </div>

          <div className="intro-gwrap">
            <img className="intro-bg intro-grass" src="/images/intro/hero-grass.jpg" alt="" draggable={false} />
            <div className="intro-rollshadow">
              <i className="intro-w" />
              <i className="intro-c" />
            </div>
            <div ref={markRef} className="intro-roll" />
          </div>

          <div className="intro-wrap">
            <img className="intro-bg intro-black" src="/images/intro/hero-black.jpg" alt="" draggable={false} />
            <div className="intro-bshadow">
              <i className="intro-w" />
              <i className="intro-c" />
            </div>
            <img className="intro-ball" src="/images/intro/ball.webp" alt="Double J Sports" draggable={false} />
            <img className="intro-ball intro-ball-lab" src="/images/intro/ball-labels.webp" alt="" draggable={false} />
            <div className="intro-ballshade" />

            <div className="intro-word intro-l">DOUBLE</div>
            <div className="intro-word intro-r">SPORTS</div>
          </div>

          <nav className="intro-sidenav" aria-label="menu">
            {SIDE_LINKS.map((l, i) => (
              <div key={l.key} className={`intro-navitem${activeKey === l.key ? " intro-navitem-on" : ""}`} style={{ "--i": i } as CSSProperties}>
                <Link
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); if (l.key === "coach") { setPanel(null); setCoachOpen(true); } else openPanel(l.href); }}
                >
                  {th(`nav.${l.key}`)}
                </Link>
                {l.children && (
                  <div className="intro-sub">
                    {l.children.map((c) => (
                      <Link key={c.key} href={c.href} onClick={(e) => { e.preventDefault(); openPanel(c.href); }}>
                        {th(`aboutChildren.${c.key}`)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div ref={freeRef} className="intro-rollfree">
            <div className="intro-rollball">
              <img className="intro-rc" src="/images/intro/ball-roll.webp" alt="" draggable={false} />
              <img className="intro-re" src="/images/intro/ball-end.webp" alt="" draggable={false} />
            </div>
          </div>
          <div className="intro-load" />
          <div className="intro-fade" />
          <div className="intro-title">DOUBLE J SPORTS</div>
          <button className="intro-cta" type="button" onClick={() => setModalOpen(true)}>
            {t("cta")}
          </button>
          <div className="intro-hint">SCROLL</div>
        </div>
      </section>
      <IntroPanel src={panelSrc} onClose={closePanel} closeLabel={ct("cardClose")} />
      <CoachCarousel
        open={coachOpen}
        onClose={closeCoach}
        items={coachItems}
        label={th("nav.coach")}
        hint={ct("cardHint")}
        credentials={ct("credentialsLabel")}
        closeLabel={ct("cardClose")}
      />
      <ApplyModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
