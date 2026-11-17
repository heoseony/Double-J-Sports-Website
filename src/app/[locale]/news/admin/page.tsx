import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsAdmin from "@/components/NewsAdmin";

export const metadata = { title: "NEWS 관리", robots: { index: false, follow: false } };

export default function NewsAdminPage() {
  return (
    <div className="dj-own">
      <Header />
      <NewsAdmin />
      <Footer />
    </div>
  );
}
