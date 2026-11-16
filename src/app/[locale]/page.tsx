import IntroHero from "@/components/IntroHero";
import Footer from "@/components/Footer";

// 홈 = 공 → 잔디 스크롤 인트로. 메뉴(ABOUT/PROGRAM/COACHES/LOCATION/GALLERY/NOTICE)는 기존 페이지로 연결됩니다.
// 예전 홈 구성(Header + Hero + Programs + Locations)은 src/components 에 그대로 남아 있어요.
export default function Home() {
  return (
    <div>
      <IntroHero />
      <Footer />
    </div>
  );
}
