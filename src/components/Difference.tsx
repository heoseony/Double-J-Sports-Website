const STEPS = [
  { label: "TRAIN", desc: "체계적인 훈련" },
  { label: "TRACK", desc: "데이터 기반 기록" },
  { label: "REPORT", desc: "월간 성장일지" },
  { label: "GROW", desc: "지속적인 성장" },
];

export default function Difference() {
  return (
    <section className="px-6 py-20 md:px-16">
      <p className="text-xs font-bold tracking-widest text-brand-blue">
        OUR DIFFERENCE
      </p>
      <h2 className="mt-3 text-3xl font-bold text-brand-navy md:text-4xl">
        훈련이 끝이 아닌, 성장까지 함께합니다.
      </h2>
      <p className="mt-4 max-w-xl text-sm text-gray-600">
        더블제이의 성장관리 시스템은 아이의 훈련, 기록, 피드백, 변화를 한눈에 확인할 수 있도록 설계되어 있습니다.
      </p>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-6 md:justify-between md:gap-6">
        {STEPS.map((step, i) => (
          <div key={step.label} className="flex items-center gap-6 md:gap-10">
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-brand-navy text-brand-navy">
                <span className="text-xs font-bold">{step.label[0]}</span>
              </div>
              <p className="text-sm font-bold text-brand-navy">{step.label}</p>
              <p className="text-xs text-gray-500">{step.desc}</p>
            </div>
            {i < STEPS.length - 1 && (
              <span className="hidden text-2xl text-gray-300 md:inline">—</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
