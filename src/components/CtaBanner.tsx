export default function CtaBanner() {
  return (
    <section className="flex flex-col items-center justify-between gap-6 bg-brand-navy px-6 py-14 text-white md:flex-row md:px-16">
      <div>
        <p className="text-2xl font-extrabold md:text-3xl">MORE THAN FOOTBALL.</p>
        <p className="mt-2 text-sm text-gray-300">지금, 더블제이와 함께 시작하세요.</p>
      </div>
      <a
        href="https://double-j-sports.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="whitespace-nowrap rounded-full bg-white px-6 py-3 text-sm font-bold text-brand-navy hover:opacity-90"
      >
        수업 예약하기 →
      </a>
    </section>
  );
}
