// DARK-PAGES: 페이지를 옮길 때마다 오른쪽에서 어두운 그라데이션이 밀려나가며 내용이 나타납니다.
// (홈과 코치 페이지는 자체 디자인이라 효과가 꺼져 있어요: globals.css 의 .dj-own 참고)
import type { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="dj-wipe" aria-hidden="true" />
      <div className="dj-enter">{children}</div>
    </>
  );
}
