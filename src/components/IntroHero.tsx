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
  const [coachPick, setCoachPick] = useState<{ i: number; n: number } | null>(null);
  const [sceneOn, setSceneOn] = useState(false);
  const [coachSel, setCoachSel] = useState<number | null>(null); // eslint-disable-line @typescript-eslint/no-unused-vars
  const [panel, setPanel] = useState<string | null>(null);
  const closePanel = useCallback(() => {
    setPanel(null);
    try { if (window.location.search.includes("panel=")) window.history.replaceState(null, "", window.location.pathname); } catch {}
  }, []);
  const openPanel = (href: string) => {
    setCoachOpen(false); setCoachPick(null); // 코치 화면이 열려 있으면 닫고 이동
    const h = href === "/about" ? "/about/greeting" : href;
    // INTRO-PANEL-SCENE: 패널 뒤에는 항상 잔디 장면+왼쪽 메뉴가 보이도록, 첫 화면(검은 배경)에서 눌러도 잔디 장면으로 이동
    const rt = rootRef.current;
    if (rt) {
      const end = rt.offsetTop + rt.offsetHeight - window.innerHeight;
      if (window.scrollY < end - 4) window.scrollTo(0, end);
    }
    setPanel((cur) => (cur === h ? null : h));
  };
  const panelSrc = panel ? (locale === "ko" ? panel : `/${locale}${panel}`) : null;
  const activeKey = SIDE_LINKS.find((l) => panel && (l.href === panel.split("#")[0] || l.children?.some((c) => c.href === panel.split("#")[0]) || (l.key === "about" && panel === "/about/greeting")))?.key;
  const ct = useTranslations("CoachesPage");
  const closeCoach = useCallback(() => { setCoachOpen(false); setCoachPick(null); }, []);
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
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    // INTRO-FINAL: /?panel=/about/greeting 처럼 들어오면 홈 위에 그 페이지 패널을 바로 열기
    try {
      const q = new URLSearchParams(window.location.search).get("panel");
      if (q && /^\/[A-Za-z0-9\-_/#%]*$/.test(q) && !q.startsWith("//")) window.setTimeout(() => openPanel(q), 60);
    } catch {}
    let raf = 0;
    function update() {
      raf = 0;
      if (!root || !stage) return;
      const r = root.getBoundingClientRect();
      const total = root.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      root.style.setProperty("--p", p.toFixed(4));
      stage.dataset.scrolled = p > 0.25 ? "1" : "0";
      stage.dataset.scene = p > 0.58 ? "1" : "0";
      setSceneOn(p > 0.58); // INTRO-MENU-REVEAL: 잔디가 깔리면 메뉴가 시간 따라 위→아래로 나타남
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
      <section ref={rootRef} className="intro-root intro-hero" data-panel={panel ? "1" : "0"} data-coach={coachOpen ? "1" : "0"}>
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
            <button
              type="button"
              className="intro-logo-btn"
              aria-label="Double J Sports"
              onClick={() => {
                closePanel();
                closeCoach();
                const rt = rootRef.current;
                if (rt) {
                  const end = rt.offsetTop + rt.offsetHeight - window.innerHeight;
                  if (Math.abs(window.scrollY - end) > 4) window.scrollTo({ top: end, behavior: "smooth" });
                }
              }}
            >
              <img src="/images/intro/logo.webp" alt="Double J Sports" draggable={false} />
            </button>
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
              <div key={l.key} className={`intro-navitem${activeKey === l.key || (l.key === "coach" && coachOpen) ? " intro-navitem-on" : ""}`} style={{ "--i": i } as CSSProperties}>
                <Link
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); if (l.key === "coach") {
                      if (coachOpen) setCoachPick({ i: -1, n: Date.now() });
                      else { setPanel(null); setCoachOpen(true); }
                    } else openPanel(l.href); }}
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
            <div className="intro-navitem intro-social" style={{ "--i": SIDE_LINKS.length } as CSSProperties}>
              <a href="https://www.instagram.com/double_j_sports2021/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4.3" stroke="currentColor" strokeWidth="2" /><circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" /></svg>
              </a>
              <a href="https://www.youtube.com/@Double_J_Sports" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="4" fill="currentColor" /><path d="M10 9l5 3-5 3V9z" fill="#0b120d" /></svg>
              </a>
              <a href="https://blog.naver.com/doublejacademy" target="_blank" rel="noopener noreferrer" aria-label="Naver Blog">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="2" /><text x="12" y="16.6" textAnchor="middle" fontSize="12" fontWeight="700" fontFamily="Arial, sans-serif" fill="currentColor">B</text></svg>
              </a>
            </div>
          </nav>
          <div ref={freeRef} className="intro-rollfree">
            <div className="intro-rollball">
              <img className="intro-rc" src="/images/intro/ball-roll.webp" alt="" draggable={false} />
              <img className="intro-re" src="/images/intro/ball-end.webp" alt="" draggable={false} />
            </div>
          </div>
          <div className="intro-load" />
          <div className="intro-fade" />
          <div className="intro-scene">
            <div className="intro-scene-clouds" aria-hidden="true"><i /><i /><i /><i /><i /></div>
            <img className="intro-scene-art" src="/images/intro/academy.webp" alt="Double J Sports Academy" draggable={false} />
            <div className="intro-scene-copy">
              <h1 className="intro-scene-h">TRAIN LIKE A PRO<br />GROW YOUR WAY</h1>
              <p className="intro-scene-p">{t("bodyLine1")}<br />{t("bodyLine2")}</p>
            </div>
          </div>
          <div className="intro-hint">SCROLL</div>
        </div>
      </section>
      {/* 체험수업신청하기: 어떤 메뉴/패널이 열려도 그대로 위에 떠 있음 */}
      <button className="intro-cta intro-scene-cta intro-cta-top" data-on={sceneOn ? "1" : "0"} type="button" onClick={() => setModalOpen(true)}>{t("cta")}</button>
      <div className="intro-glow" data-mode={coachOpen ? "coach" : panel ? "panel" : "off"} aria-hidden="true" />
      <IntroPanel src={panelSrc} onClose={closePanel} closeLabel={ct("cardClose")} />
      <CoachCarousel
        open={coachOpen}
        onClose={closeCoach}
        items={coachItems}
        label={th("nav.coach")}
        hint={ct("cardHint")}
        credentials={ct("credentialsLabel")}
        closeLabel={ct("cardClose")}
        jump={coachPick}
        onView={setCoachSel}
      />
      <ApplyModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
