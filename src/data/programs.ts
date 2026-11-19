// PROGRAMS-DATA: 프로그램 페이지에 나오는 사진/구성 데이터입니다.
// 글(제목·소개 등)은 messages/*.json 의 ProgramsPage.view 에 4개 언어로 들어 있어요.
// PRO 와 엘리트반 구분이 바뀌면 이 파일과 messages 의 해당 항목만 고치면 됩니다.

export type ProgramKey = "kids" | "elite" | "adult";

export type ProgramMeta = {
  key: ProgramKey;
  image: string | null; // 없으면 사진 자리가 어두운 색으로 표시됩니다
  objectPosition: string;
  detailImage?: { src: string; objectPosition: string }; // 자세히 보기를 펼쳤을 때 쓰는 사진 (없으면 위의 image 사용)
  hasTarget: boolean; // "교육 대상" 문구가 확정된 경우에만 true
};

export const PRO_IMAGE = { src: "/images/program-pro.jpg", objectPosition: "50% 62%" };

export const ACADEMY_PROGRAMS: ProgramMeta[] = [
  { key: "kids", image: "/images/greeting-1.jpg", objectPosition: "50% 35%", detailImage: { src: "/images/program-kids.jpg", objectPosition: "50% 60%" }, hasTarget: true },
  { key: "elite", image: "/images/greeting-kid.jpg", objectPosition: "50% 28%", hasTarget: false },
  { key: "adult", image: "/images/program-adult.jpg", objectPosition: "50% 40%", hasTarget: true },
];

// ──────────────────────────────────────────────────────────────
// 확인 필요 (아직 확정된 정보가 없어서 공개 화면에는 표시하지 않아요)
// - 수업 일정, 수강료, 연령대, 훈련 횟수 (키즈반 · 엘리트반 · 성인 취미반)
// - 엘리트반의 교육 대상
// - PRO: 훈련 목표, 주요 훈련 구성, 상담 및 신청 안내 세부 내용
// 확정되면 messages 에 문구를 넣고, 이 파일의 hasTarget 등을 true 로 바꾸면 됩니다.
// ──────────────────────────────────────────────────────────────
