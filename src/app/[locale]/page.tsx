import IntroHero from "@/components/IntroHero";
import Footer from "@/components/Footer";

// 홈 = 공 → 잔디 스크롤 인트로. 메뉴(ABOUT/PROGRAM/COACHES/LOCATION/GALLERY/NOTICE)는 기존 페이지로 연결됩니다.
// 인트로 끝 → 검정 그라데이션 → 검정 푸터 (다른 페이지의 푸터는 기존 남색 그대로)
export default function Home() {
  return (
    <div>
      <IntroHero />
      <div className="intro-footer">
        <Footer />
      </div>
    </div>
  );
}
