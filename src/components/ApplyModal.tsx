"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

const PROGRAM_OPTION_KEYS = ["pro", "academy", "women", "men", "private"] as const;

type Status = "idle" | "sending" | "success" | "error" | "invalid";

export default function ApplyModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("ApplyModal");
  const locale = useLocale();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [country, setCountry] = useState("");
  const [program, setProgram] = useState<(typeof PROGRAM_OPTION_KEYS)[number]>(PROGRAM_OPTION_KEYS[0]);
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // 봇 방지용 숨김 칸
  const [status, setStatus] = useState<Status>("idle");

  if (!open) return null;

  function handleClose() {
    if (status === "success") {
      setName("");
      setContact("");
      setCountry("");
      setMessage("");
      setConsent(false);
      setProgram(PROGRAM_OPTION_KEYS[0]);
    }
    setStatus("idle");
    onClose();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    if (!name.trim() || contact.trim().length < 3 || !consent) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, country, program, message, locale, consent, website }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const inputCls =
    "rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-navy";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-brand-navy">{t("title")}</h2>
          <button onClick={handleClose} className="text-xl text-gray-400 hover:text-gray-700">
            ×
          </button>
        </div>

        {status === "success" ? (
          <div className="py-8 text-center">
            <p className="text-lg font-bold text-brand-navy">{t("successTitle")}</p>
            <p className="mt-2 text-sm text-gray-600">{t("successBody")}</p>
            <button
              onClick={handleClose}
              className="mt-6 rounded-md bg-brand-navy px-6 py-3 text-sm font-bold text-white hover:opacity-90"
            >
              {t("close")}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
            <input
              type="text"
              placeholder={t("namePlaceholder")}
              value={name}
              maxLength={100}
              onChange={(e) => setName(e.target.value)}
              className={inputCls}
            />
            <input
              type="text"
              placeholder={t("contactPlaceholder")}
              value={contact}
              maxLength={200}
              onChange={(e) => setContact(e.target.value)}
              className={inputCls}
            />
            <input
              type="text"
              placeholder={t("countryPlaceholder")}
              value={country}
              maxLength={100}
              onChange={(e) => setCountry(e.target.value)}
              className={inputCls}
            />
            <select
              value={program}
              onChange={(e) => setProgram(e.target.value as (typeof PROGRAM_OPTION_KEYS)[number])}
              className={inputCls}
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
              maxLength={2000}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className={`resize-none ${inputCls}`}
            />

            {/* 봇 방지: 사람 눈에는 보이지 않는 칸 */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
            />

            <label className="flex items-start gap-2 text-xs text-gray-600">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5"
              />
              <span>{t("consentLabel")}</span>
            </label>

            {status === "invalid" && <p className="text-xs text-red-600">{t("required")}</p>}
            {status === "error" && <p className="text-xs text-red-600">{t("error")}</p>}

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-2 rounded-md bg-brand-navy px-6 py-3 text-sm font-bold text-white hover:opacity-90 disabled:opacity-60"
            >
              {status === "sending" ? t("sending") : t("submit")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
