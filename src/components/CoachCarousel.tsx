"use client";

// COACH-CAROUSEL: 홈 왼쪽 메뉴의 COACHES를 누르면 잔디가 어두워지면서 나오는 3D 회전 카드.
// 카드에 마우스를 올리면 뒤집혀서 학력/경력이 보이고, 누르면 그 코치 프로필로 이동합니다.
// 사진은 public/images/coach-card/<이름>.jpg (같은 이름으로 바꾸면 됩니다).
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef } from "react";
import { useRouter } from "@/i18n/navigation";

export type CoachCardItem = { key: string; name: string; role: string; career: string[]; photo: string };

type Props = {
  open: boolean;
  onClose: () => void;
  items: CoachCardItem[];
  label: string;
  hint: string;
  credentials: string;
  closeLabel: string;
  onPick?: (key: string) => void; // INTRO-FINAL: 주어지면 페이지 이동 대신 이 함수로 열기
};

const STEP = 46; // 카드 사이 각도

export default function CoachCarousel({ open, onClose, items, label, hint, credentials, closeLabel, onPick }: Props) {
  const router = useRouter();
  const N = items.length;
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const st = useRef({ angle: 0, hold: 0, hotT: -1, over: -1, hot: [] as number[], anim: null as null | { from: number; to: number; t0: number; dur: number; done?: () => void }, going: false });

  useEffect(() => {
    if (!open) return;
    const s = st.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover:hover)").matches;
    s.angle = 0; s.hold = 0; s.hotT = -1; s.over = -1; s.anim = null; s.going = false;
    s.hot = Array.from({ length: N }, () => 0);
    const P = N * STEP;
    const wd = (v: number) => ((((v + P / 2) % P) + P) % P) - P / 2;
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    document.body.style.overflow = "hidden";

    const render = () => {
      const first = cardRefs.current[0];
      if (!first) return;
      const W = first.offsetWidth;
      const R = W * 1.25;
      for (let i = 0; i < N; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        s.hot[i] += ((i === s.hotT ? 1 : 0) - s.hot[i]) * 0.12;
        let h = s.hot[i];
        if (h < 0.003) h = s.hot[i] = 0;
        const th = wd(i * STEP - s.angle);
        const at = Math.abs(th);
        el.style.transform = `translateZ(${-R}px) rotateY(${th.toFixed(2)}deg) translateZ(${(R + W * 0.28 * h).toFixed(1)}px) scale(${(1 + 0.12 * h).toFixed(3)})`;
        el.style.opacity = Math.max(0, Math.min(1, (102 - at) / 30)).toFixed(3);
        el.style.pointerEvents = at > 80 ? "none" : "auto";
        const shade = el.querySelector<HTMLElement>(".intro-cc-shade");
        if (shade) shade.style.opacity = (Math.min(1, at / 80) * 0.6 * (1 - h)).toFixed(3);
        const flip = el.querySelector<HTMLElement>(".intro-cc-flip");
        if (flip) flip.style.transform = `rotateY(${(180 * h).toFixed(1)}deg)`;
        el.classList.toggle("intro-cc-hot", h > 0.5);
      }
    };

    let last = performance.now();
    let raf = 0;
    const frame = (ts: number) => {
      const dt = Math.min(0.05, (ts - last) / 1000);
      last = ts;
      if (s.anim) {
        const k = Math.min(1, (ts - s.anim.t0) / s.anim.dur);
        s.angle = s.anim.from + (s.anim.to - s.anim.from) * ease(k);
        if (k >= 1) {
          const d = s.anim.done;
          s.anim = null;
          if (d) d();
        }
      } else if (s.hold > 0) s.hold -= dt;
      else if (!reduce) s.angle += dt * 10;
      render();
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const dir = e.key === "ArrowRight" ? 1 : -1;
        s.anim = { from: s.angle, to: Math.round(s.angle / STEP + dir) * STEP, t0: performance.now(), dur: 500 };
        s.hold = 3;
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", render);

    // 마우스: 가운데 카드에 올리면 뒤집기, 옆 카드에 올리면 먼저 가운데로 돌려옴
    const cleanups: (() => void)[] = [];
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const enter = () => {
        if (!canHover) return;
        s.over = i;
        s.hold = 99;
        const d = wd(i * STEP - s.angle);
        if (Math.abs(d) < 12) s.hotT = i;
        else s.anim = { from: s.angle, to: s.angle + d, t0: performance.now(), dur: 650, done: () => { if (s.over === i) s.hotT = i; } };
      };
      const leave = () => {
        if (!canHover) return;
        if (s.over === i) s.over = -1;
        if (s.hotT === i) s.hotT = -1;
        s.hold = 0.8;
      };
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      cleanups.push(() => { el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave); });
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", render);
      cleanups.forEach((f) => f());
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, N]);

  const go = (key: string) => {
    const s = st.current;
    if (s.going) return;
    s.going = true;
    if (onPick) { onPick(key); s.going = false; return; }
    router.push(`/coaches#${key}`);
  };

  const pick = (e: React.MouseEvent, i: number, key: string) => {
    e.preventDefault();
    const s = st.current;
    if (s.going) return;
    const P = N * STEP;
    const d = ((((i * STEP - s.angle + P / 2) % P) + P) % P) - P / 2;
    const canHover = window.matchMedia("(hover:hover)").matches;
    // 터치: 첫 번째 탭은 카드를 앞으로 돌려서 뒤집고, 두 번째 탭에서 이동
    if (!canHover && s.hotT !== i) {
      s.hold = 99;
      if (Math.abs(d) < 12) s.hotT = i;
      else { s.hotT = -1; s.anim = { from: s.angle, to: s.angle + d, t0: performance.now(), dur: 600, done: () => { s.hotT = i; } }; }
      return;
    }
    if (Math.abs(d) < 2) go(key);
    else s.anim = { from: s.angle, to: s.angle + d, t0: performance.now(), dur: 600, done: () => go(key) };
  };

  return (
    <div
      className={`intro-cc${open ? " intro-cc-on" : ""}`}
      aria-hidden={!open}
      onClick={(e) => { if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains("intro-cc-stage")) onClose(); }}
    >
      <div className="intro-cc-label">{label}</div>
      <button type="button" className="intro-cc-x" onClick={onClose} aria-label={closeLabel}>✕</button>
      <div className="intro-cc-stage">
        <div className="intro-cc-track">
          {items.map((c, i) => (
            <a
              key={c.key}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="intro-cc-card"
              href={`/coaches#${c.key}`}
              aria-label={`${c.name} ${c.role}`}
              tabIndex={open ? 0 : -1}
              onClick={(e) => pick(e, i, c.key)}
              onContextMenu={(e) => e.preventDefault()}
            >
              <div className="intro-cc-flip">
                <div className="intro-cc-front">
                  <img src={c.photo} alt="" draggable={false} />
                  <div className="intro-cc-shade" />
                  <div className="intro-cc-cap">
                    <div className="intro-cc-role">{c.role}</div>
                    <div className="intro-cc-name">{c.name}</div>
                  </div>
                </div>
                <div className="intro-cc-back">
                  <div className="intro-cc-info">
                    <div className="intro-cc-role">{c.role}</div>
                    <div className="intro-cc-name">{c.name}</div>
                    <div className="intro-cc-ln" />
                    <div className="intro-cc-hd">{credentials}</div>
                    <ul>
                      {c.career.map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="intro-cc-hint">{hint}</div>
    </div>
  );
}
