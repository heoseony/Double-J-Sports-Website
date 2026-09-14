const LOCATIONS = [
  {
    nameKr: "프랑크푸르트점",
    nameEn: "FRANKFURT",
    address: "주소 입력 예정, Frankfurt, Germany",
  },
  {
    nameKr: "뒤셀도르프점",
    nameEn: "DÜSSELDORF",
    address: "주소 입력 예정, Düsseldorf, Germany",
  },
];

export default function Locations() {
  return (
    <section className="px-6 py-20 md:px-16">
      <p className="text-xs font-bold tracking-widest text-brand-blue">
        OUR LOCATIONS
      </p>
      <h2 className="mt-3 text-3xl font-bold text-brand-navy md:text-4xl">
        프랑크푸르트와 뒤셀도르프에서 만날 수 있습니다.
      </h2>
      <p className="mt-4 max-w-xl text-sm text-gray-600">
        두 도시에서 더블제이의 전문적인 코칭을 경험하세요.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {LOCATIONS.map((loc) => (
          <div
            key={loc.nameEn}
            className="flex h-56 flex-col justify-end rounded-2xl bg-gray-200 p-6"
          >
            <p className="text-xs font-bold tracking-widest text-gray-500">{loc.nameEn}</p>
            <p className="mt-1 text-xl font-bold text-brand-navy">{loc.nameKr}</p>
            <p className="mt-1 text-xs text-gray-500">{loc.address}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
