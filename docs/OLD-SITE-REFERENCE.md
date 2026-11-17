# 기존 사이트 = 참고용 / 지금 홈 = 최종 사이트

**최종 사이트는 `src/components/IntroHero.tsx` 가 만드는 홈 하나입니다.**
메뉴(ABOUT, PROGRAM, NEWS, LOCATION, NOTICE)를 누르면 홈은 그대로 두고 오른쪽에서 패널이 열려 그 페이지가 보입니다.
COACHES는 3D 카드가 열리고, 카드를 누르면 같은 패널에서 코치 상세가 열립니다.

## 이렇게 동작해요
- 홈이 아닌 주소(예: `/about/greeting`)를 주소창에 직접 입력해도 홈(`/?panel=/about/greeting`)으로 돌아와 패널로 열립니다.
  (`src/app/[locale]/layout.tsx`의 `dj-embed` 스크립트, `IntroHero.tsx`의 `?panel=` 처리)
- 예외: `news/admin`(글쓰기 화면)은 그대로 단독 페이지로 열립니다.
- 패널 안의 페이지에서 홈 주소로 가려고 하면 패널이 닫히고 홈으로 돌아옵니다.

## 참고용으로 남겨둔 기존 코드 (지우지 않음)
- 기존 홈 구성 요소: `src/components/Hero.tsx`, `Programs.tsx`, `Difference.tsx`, `Locations.tsx` 등 (현재 홈에서는 쓰지 않음)
- 기존 상단 메뉴/푸터: `src/components/Header.tsx`, `Footer.tsx` (패널 안에서는 숨김)
- 각 하위 페이지(`src/app/[locale]/about`, `programs`, `locations`, `news`, `notices`, `gallery`, `coaches`)는 패널 안에서 보여줄 "내용"으로 계속 사용됩니다.
- 라이브 사이트(main)는 아직 기존 모습 그대로이며, 이 정리는 `intro-redesign` 가지에만 있습니다.
