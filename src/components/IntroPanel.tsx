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
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
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
