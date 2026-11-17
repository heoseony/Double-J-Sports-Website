"use client";

// INTRO-PANEL: 홈 왼쪽 메뉴(ABOUT, PROGRAM, NEWS, LOCATION, NOTICE)를 누르면
// 홈 화면은 그대로 두고, 오른쪽에서 어두운 남색 그라데이션 패널이 열리며 그 페이지 내용이 보입니다.
// 닫기: 오른쪽 위 ✕ / ESC / 같은 메뉴 한 번 더 누르기.

import { useEffect } from "react";

type Props = { src: string | null; onClose: () => void; closeLabel: string };

export default function IntroPanel({ src, onClose, closeLabel }: Props) {
  const open = !!src;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    // 스크롤 잠금은 body가 아니라 html에 걸어야 함 (body에 걸면 홈의 sticky 화면이 풀려 까맣게 사라짐)
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      html.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <div className={`intro-panel${open ? " intro-panel-on" : ""}`} aria-hidden={!open}>
      <button type="button" className="intro-panel-x" onClick={onClose} aria-label={closeLabel}>
        ✕
      </button>
      {src && <iframe key={src} className="intro-panel-frame" src={src} title="page" />}
    </div>
  );
}
