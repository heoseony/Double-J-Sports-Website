import Header from "@/components/Header";

export default function Page() {
  return (
    <div>
      <Header />
      <main className="flex min-h-[400px] flex-col items-center justify-center gap-3 px-6 py-24 text-center">
        <p className="text-xs font-bold tracking-widest text-brand-blue">"LOCATION"</p>
        <h1 className="text-2xl font-bold text-brand-navy">"뒤셀도르프점"</h1>
        <p className="text-sm text-gray-500">페이지 준비중입니다.</p>
      </main>
    </div>
  );
}
