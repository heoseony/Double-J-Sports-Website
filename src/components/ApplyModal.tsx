"use client";

import { useState } from "react";

const PROGRAM_OPTIONS = ["프로", "아카데미", "여성 취미반", "남성 취미반", "1:1 개인 코칭"];

export default function ApplyModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [country, setCountry] = useState("");
  const [program, setProgram] = useState(PROGRAM_OPTIONS[0]);
  const [message, setMessage] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-brand-navy">체험수업 신청</h2>
          <button onClick={onClose} className="text-xl text-gray-400 hover:text-gray-700">
            ×
          </button>
        </div>

        <form className="mt-4 flex flex-col gap-3">
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-navy"
          />
          <input
            type="text"
            placeholder="연락처 (전화번호 또는 이메일)"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-navy"
          />
          <input
            type="text"
            placeholder="국가 (예: 대한민국, Germany)"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-navy"
          />
          <select
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-navy"
          >
            {PROGRAM_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <textarea
            placeholder="문의 내용 (선택)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-navy"
          />

          <button
            type="submit"
            className="mt-2 rounded-full bg-brand-navy px-6 py-3 text-sm font-bold text-white hover:opacity-90"
          >
            신청하기
          </button>
        </form>
      </div>
    </div>
  );
}
