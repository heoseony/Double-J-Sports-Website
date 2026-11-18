"use client";

// COACH-CAROUSEL: 홈 왼쪽 메뉴의 COACHES를 누르면 잔디가 어두워지면서 나오는 3D 회전 카드.
// INTRO-COACH-SPIN: 카드를 누르면 360도 넘게 빙글 돌면서 뒷면(학력/경력)이 나오고, 다시 누르면 또 돌면서 앞면으로 돌아옵니다. (페이지 이동 없음)
// 사진은 public/images/coach-card/<이름>.jpg (같은 이름으로 바꾸면 됩니다).
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";

export type CoachCardItem = { key: string; name: string; role: string; career: string[]; photo: string };

type Props = {
  open: boolean;
  onClose: () => void;
  items: CoachCardItem[];
  label: string;
  hint: string;
  credentials: string;
  closeLabel: string;
  jump?: { i: number; n: number } | null; // 바깥(왼쪽 메뉴 COACHES 재클릭 등)에서 카드 화면으로 되돌리기
  onView?: (i: number | null) => void;
};

const STEP = 46; // 카드 사이 각도

export default function CoachCarousel({ open, onClose, items, label, hint, credentials, closeLabel, jump, onView }: Props) {
  const N = items.length;
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  // INTRO-COACH-GRID: 처음엔 카드 5장이 나란히(grid), 카드를 누르면 360도 돌아가는 캐러셀(spin)
  const [mode, setMode] = useState<"grid" | "spin">("grid");
  const startRef = useRef(0);
  const [sel, setSel] = useState(0);
  const onViewRef = useRef(onView);
  onViewRef.current = onView;
  const spin = open && mode === "spin";
  const backRef = useRef<() => void>(() => {});
  backRef.current = () => { if (mode === "spin") setMode("grid"); else onClose(); };
  useEffect(() => { if (open) setMode("grid"); }, [open]);
  useEffect(() => { onViewRef.current?.(open && mode === "spin" ? sel : null); }, [open, mode, sel]);
  useEffect(() => {
    if (!open || !jump) return;
    if (jump.i < 0) { setMode("grid"); return; }
    startRef.current = jump.i;
    setSel(jump.i);
    if (mode !== "spin") { setMode("spin"); return; }
    const s = st.current;
    const P = N * STEP;
    const d = ((((jump.i * STEP - s.angle + P / 2) % P) + P) % P) - P / 2;
    s.hold = 99; s.hotT = -1;
    s.flipT = s.flipT.map((v) => (v === 540 ? 720 : v));
    s.anim = { from: s.angle, to: s.angle + d, t0: performance.now(), dur: 600 };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jump]);
  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = ""; };
  }, [open]);
  useEffect(() => {
    if (!open || mode !== "grid") return;
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onCloseRef.current(); };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, mode]);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const st = useRef({ angle: 0, hold: 0, hotT: -1, over: -1, hot: [] as number[], flipA: [] as number[], flipT: [] as number[], anim: null as null | { from: number; to: number; t0: number; dur: number; done?: () => void }, going: false });

  useEffect(() => {
    if (!open || mode !== "spin") return;
    const s = st.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover:hover)").matches;
    s.angle = startRef.current * STEP; s.hold = 2.5; s.hotT = -1; s.over = -1; s.anim = null; s.going = false;
    s.hot = Array.from({ length: N }, () => 0);
    s.flipA = Array.from({ length: N }, () => 0);
    s.flipT = Array.from({ length: N }, () => 0);
    const P = N * STEP;
    const wd = (v: number) => ((((v + P / 2) % P) + P) % P) - P / 2;
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

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
        // 누르면 앞면(0) → 뒷면(540도=한 바퀴 반), 다시 누르면 뒷면 → 앞면(720도)
        s.flipA[i] += (s.flipT[i] - s.flipA[i]) * 0.075;
        if (Math.abs(s.flipT[i] - s.flipA[i]) < 0.1) {
          s.flipA[i] = s.flipT[i];
          if (s.flipT[i] === 720) { s.flipA[i] = 0; s.flipT[i] = 0; }
        }
        if (flip) flip.style.transform = `rotateY(${s.flipA[i].toFixed(1)}deg)`;
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
      if (e.key === "Escape") backRef.current();
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
        if (s.hotT === i && s.flipT[i] !== 540) s.hotT = -1;
        if (!s.flipT.some((v) => v === 540)) s.hold = 0.8;
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
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, mode, N]);

  // 누른 카드를 한 바퀴 넘게 돌려서 앞/뒤를 바꿈. 다른 카드는 원래대로.
  const toggleFlip = (i: number) => {
    const s = st.current;
    const on = s.flipT[i] !== 540;
    s.flipT = s.flipT.map((v, j) => (j === i ? (on ? 540 : 720) : v === 540 ? 720 : v));
    s.hotT = i;
    s.hold = on ? 99 : 0.8;
  };

  const pick = (e: React.MouseEvent, i: number) => {
    e.preventDefault();
    setSel(i);
    const s = st.current;
    const P = N * STEP;
    const d = ((((i * STEP - s.angle + P / 2) % P) + P) % P) - P / 2;
    s.hold = 99;
    if (Math.abs(d) < 2) toggleFlip(i);
    else s.anim = { from: s.angle, to: s.angle + d, t0: performance.now(), dur: 600, done: () => toggleFlip(i) };
  };

  return (
    <div
      className={`intro-cc${open ? " intro-cc-on" : ""}${spin ? " intro-cc-spin" : ""}`}
      aria-hidden={!open}
      onClick={(e) => {
        const c = (e.target as HTMLElement).classList;
        if (e.target === e.currentTarget || c.contains("intro-cc-stage") || c.contains("intro-cg") || c.contains("intro-cg-row")) backRef.current();
      }}
    >
      <div className="intro-cc-label">{label}</div>
      <button type="button" className="intro-cc-x" onClick={() => backRef.current()} aria-label={closeLabel}>✕</button>
      <div className="intro-cg" aria-hidden={!open || spin}>
        {[items.slice(0, Math.floor(N / 2)), items.slice(Math.floor(N / 2))].map((row, r) => (
          <div className="intro-cg-row" key={r}>
            {row.map((c) => {
              const i = items.indexOf(c);
              return (
                <button
                  key={c.key}
                  type="button"
                  className="intro-cg-card"
                  style={{ "--i": i } as React.CSSProperties}
                  tabIndex={open && !spin ? 0 : -1}
                  aria-label={`${c.name} ${c.role}`}
                  onClick={() => { startRef.current = i; setSel(i); setMode("spin"); }}
                >
                  <div className="intro-cg-flip">
                    <div className="intro-cc-front">
                      <img src={c.photo} alt="" draggable={false} />
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
                        <ul>{c.career.map((l) => <li key={l}>{l}</li>)}</ul>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div className="intro-cc-stage">
        <div className="intro-cc-track">
          {items.map((c, i) => (
            <a
              key={c.key}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="intro-cc-card"
              role="button"
              aria-label={`${c.name} ${c.role}`}
              tabIndex={spin ? 0 : -1}
              onClick={(e) => pick(e, i)}
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
