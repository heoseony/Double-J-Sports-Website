export default function Hero() {
  return (
    <section className="relative flex min-h-[520px] flex-col justify-center overflow-hidden bg-brand-navy px-6 py-16 text-white md:px-16">
      <p className="text-xs font-bold tracking-widest text-brand-blue">
        DOUBLE J SPORTS ACADEMY
      </p>

      <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-6xl">
        TRAIN LIKE A PRO
        <br />
        GROW YOUR WAY
      </h1>

      <p className="mt-4 text-base text-gray-200 md:text-lg">
        축구를 통해, 더 큰 가능성을 만납니다.
      </p>
      <p className="mt-2 whitespace-nowrap text-sm text-gray-300">
        더블제이는 단순한 기술 지도가 아닌, 아이의 성장을 함께 만드는 축구 아카데미입니다.
      </p>

      <div className="mt-8 flex gap-3">
        <a
          href="https://double-j-sports.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-white px-6 py-3 text-sm font-bold text-brand-navy hover:opacity-90"
        >
          체험수업신청하기 →
        </a>
      </div>

      <div className="absolute right-8 top-16 hidden flex-col items-center gap-3 text-xs text-gray-300 md:flex">
        <span className="font-bold text-white">01</span>
        <span>02</span>
        <span>03</span>
      </div>
    </section>
  );
}
