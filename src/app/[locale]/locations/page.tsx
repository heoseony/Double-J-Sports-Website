import Header from "@/components/Header";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

const LOCATION_KEYS = [
  {
    key: "frankfurt",
    nameEn: "FRANKFURT",
    address: "Burgwiesenhalle, Oberursel-Bommersheim, Germany",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("Burgwiesenhalle, Oberursel-Bommersheim, Germany"),
    image: "/images/location-frankfurt.jpg",
  },
  {
    key: "dusseldorf",
    nameEn: "DÜSSELDORF",
    address: "TuRU Düsseldorf 1880 e.V., Düsseldorf, Germany",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("TuRU Düsseldorf 1880 e.V., Düsseldorf, Germany"),
    image: "/images/location-dusseldorf.jpg",
  },
] as const;

export default async function LocationsPage() {
  const t = await getTranslations("LocationsPage");

  return (
    <div>
      <Header />

      <section className="px-6 py-16 md:px-16">
        <p className="text-sm font-bold tracking-widest text-brand-blue">LOCATION</p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-gray-900 md:text-5xl">
          {t("heading1")}
          <br />
          {t("heading2")}
        </h1>
      </section>

      <section className="grid grid-cols-1 gap-6 px-6 pb-20 md:grid-cols-2 md:px-16">
        {LOCATION_KEYS.map((loc) => (
          <div
            key={loc.key}
            className="relative flex h-[420px] flex-col justify-end overflow-hidden rounded-2xl"
          >
            <div className="absolute inset-0 bg-gray-800">
              <Image src={loc.image} alt="" fill className="object-cover opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>

            <div className="relative z-10 p-6 text-white">
              <p className="text-xs font-bold tracking-widest text-white/70">
                {loc.nameEn}
              </p>
              <h2 className="mt-1 text-2xl font-black">{t(`items.${loc.key}.name`)}</h2>

              <p className="mt-4 text-xs font-bold tracking-widest text-white/60">{t("addressLabel")}</p>
              <p className="mt-1 text-sm text-white/90">{loc.address}</p>

              <a
                href={loc.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-gray-900 hover:opacity-90"
              >
                {t("viewButton")}
              </a>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
