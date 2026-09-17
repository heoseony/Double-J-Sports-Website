import Image from "next/image";

const LOCATIONS = [
  {
    nameKr: "프랑크푸르트점",
    nameEn: "FRANKFURT",
    address: "Burgwiesenhalle, Oberursel-Bommersheim, Germany",
    image: "/images/location-frankfurt.jpg",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("Burgwiesenhalle, Oberursel-Bommersheim, Germany"),
  },
  {
    nameKr: "뒤셀도르프점",
    nameEn: "DÜSSELDORF",
    address: "TuRU Düsseldorf 1880 e.V., Düsseldorf, Germany",
    image: "/images/location-dusseldorf.jpg",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("TuRU Düsseldorf 1880 e.V., Düsseldorf, Germany"),
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
            className="relative flex h-56 flex-col justify-end overflow-hidden rounded-2xl"
          >
            <div className="absolute inset-0 bg-gray-800">
              <Image src={loc.image} alt="" fill className="object-cover opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            </div>

            <div className="relative z-10 p-6 text-white">
              <p className="text-xs font-bold tracking-widest text-white/70">{loc.nameEn}</p>
              <p className="mt-1 text-xl font-bold">{loc.nameKr}</p>
              <p className="mt-1 text-xs text-white/80">{loc.address}</p>
              <a
                href={loc.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-gray-900 hover:opacity-90"
              >
                위치 보기 →
              </a>
            </div>
          </div>
        ))}
</div>
</section>
  );
}
