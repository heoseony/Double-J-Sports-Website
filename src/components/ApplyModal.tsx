"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const PROGRAM_OPTION_KEYS = ["pro", "academy", "women", "men", "private"] as const;

export default function ApplyModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("ApplyModal");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [country, setCountry] = useState("");
  const [program, setProgram] = useState<(typeof PROGRAM_OPTION_KEYS)[number]>(PROGRAM_OPTION_KEYS[0]);
  const [message, setMessage] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-brand-navy">{t("title")}</h2>
          <button onClick={onClose} className="text-xl text-gray-400 hover:text-gray-700">
            ×
          </button>
        </div>

        <form className="mt-4 flex flex-col gap-3">
          <input
            type="text"
            placeholder={t("namePlaceholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-navy"
          />
          <input
            type="text"
            placeholder={t("contactPlaceholder")}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-navy"
          />
          <input
            type="text"
            placeholder={t("countryPlaceholder")}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-navy"
          />
          <select
            value={program}
            onChange={(e) => setProgram(e.target.value as (typeof PROGRAM_OPTION_KEYS)[number])}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-navy"
          >
            {PROGRAM_OPTION_KEYS.map((key) => (
              <option key={key} value={key}>
                {t(`programs.${key}`)}
              </option>
            ))}
          </select>
          <textarea
            placeholder={t("messagePlaceholder")}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-navy"
          />

          <button
            type="submit"
            className="mt-2 rounded-full bg-brand-navy px-6 py-3 text-sm font-bold text-white hover:opacity-90"
          >
            {t("submit")}
          </button>
        </form>
      </div>
    </div>
  );
}
