import Header from "@/components/Header";
import Image from "next/image";

export default function GreetingPage() {
  return (
    <div>
      <Header />

      {/* Section 1 */}
      <section className="grid grid-cols-1 items-start gap-10 px-6 pb-6 pt-16 md:grid-cols-2 md:px-16 md:pb-8 md:pt-20">
        <div>
          <p className="text-sm font-bold tracking-widest text-brand-blue">ABOUT</p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-gray-900 md:text-5xl">
            축구를 좋아하는
            <br />
            누구에게나,
            <br />
            <span className="text-brand-blue">제대로 배울 수 있는 기회를.</span>
          </h1>

          <div className="mt-6 h-px w-10 bg-gray-300" />

          <div className="mt-6 space-y-1 text-base leading-[1.8] text-gray-700">
            <p>더블제이스포츠 아카데미는</p>
            <p>처음 공을 접하는 아이부터 축구를 더 잘하고 싶은 사람,</p>
            <p>그리고 프로 무대를 목표로 자신의 다음 단계를 준비하는 선수까지</p>
            <p>누구나 자신의 목표에 맞는 축구를 배울 수 있는 곳입니다.</p>
          </div>
        </div>

        <div className="relative mt-6 h-[420px] w-full overflow-hidden rounded-lg bg-gray-100 md:mt-10 md:h-[480px]">
          <Image
            src="/images/greeting-1.jpg"
            alt=""
            fill
            className="object-cover object-[center_75%]"
          />
        </div>
      </section>

      {/* Section 2 */}
      <section className="grid grid-cols-1 items-start gap-10 px-6 pt-6 pb-16 md:grid-cols-2 md:px-16 md:pt-8 md:pb-24">
        <div className="relative order-2 h-[320px] w-full overflow-hidden rounded-lg bg-gray-100 md:order-1 md:h-[380px]">
          <Image
            src="/images/greeting-2.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        <div className="order-1 md:order-2">
                    <h2 className="mt-3 text-3xl font-black leading-tight text-gray-900 md:text-4xl">
            출발점과 목표는 달라도,
            <br />
            좋은 훈련을 경험할 기회는
            <br />
            <span className="text-brand-blue">누구에게나 열려 있어야 합니다.</span>
          </h2>

          <div className="mt-6 text-base leading-[1.8] text-gray-700">
            <p>
              프로 선수 출신 감독진과 유럽 무대에서 뛰고 있는 현역 코치진의
              <br />
              경험을 바탕으로, 탄탄한 기본기부터 실전 중심의 트레이닝,
              <br />
              전문적인 선수 육성까지 각자의 수준과 목표에 필요한 축구를 가르칩니다.
            </p>
          </div>

          <div className="mt-6 h-px w-10 bg-gray-300" />
        </div>
      </section>

      {/* Closing */}
      <section className="relative overflow-hidden bg-brand-navy px-6 py-20 md:px-16 md:py-28">
        <div className="absolute inset-0">
          <Image
            src="/images/greeting-3.jpg"
            alt=""
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/80 to-transparent" />
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl font-black leading-tight text-white md:text-4xl">
            TRAIN LIKE A PRO.
            <br />
            <span className="text-blue-400">GROW YOUR WAY.</span>
          </h2>
          <div className="mt-5 h-px w-10 bg-white/40" />
          <p className="mt-4 text-sm leading-relaxed text-white/80 md:text-base">
            프로의 방식으로 훈련하고,
            <br />
            자신만의 축구로 성장합니다.
          </p>
        </div>

      </section>
    </div>
  );
}
