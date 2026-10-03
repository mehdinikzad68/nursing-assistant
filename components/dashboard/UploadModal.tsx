"use client";

import { useState } from "react";
import { createLogger } from "@/lib/logger";

const log = createLogger("upload-modal");

const docTypes = [
  { id: "payslip", label: "فیش حقوقی / تعرفه" },
  { id: "verdict", label: "حکم کارگزینی" },
  { id: "notice", label: "ابلاغیه یا نامه اداری" },
  { id: "contract", label: "قرارداد کار / تمدید طرح" },
  { id: "schedule", label: "جدول شیفت ماهانه" },
  { id: "other", label: "سایر مکاتبات" },
];

export default function UploadModal() {
  const [selectedType, setSelectedType] = useState("payslip");
  const [ocrText, setOcrText] = useState("");

  const closeModal = () => {
    const modal = document.getElementById("upload-modal");
    if (modal) modal.classList.add("hidden");
  };

  return (
    <div
      className="fixed inset-0 z-50 hidden items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      id="upload-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="upload-modal-title"
    >
      <div className="max-h-[90vh] w-full max-w-xl space-y-5 overflow-y-auto rounded-3xl border border-app-border-light bg-app-card p-6 text-right shadow-2xl">
        <div className="flex items-start justify-between border-b border-app-border pb-3">
          <div>
            <h3 id="upload-modal-title" className="flex items-center gap-2 text-base font-bold text-ink">
              <svg className="h-5 w-5 text-brand" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>بارگذاری و تحلیل امن سند اداری</span>
            </h3>
            <p className="mt-1 text-xs text-ink-muted">متن سند بدون ذخیره نام و مشخصات هویتی بررسی می‌شود.</p>
          </div>
          <button
            className="rounded-lg p-1 text-ink-subtle transition hover:bg-app-elevated hover:text-ink"
            onClick={closeModal}
            aria-label="بستن"
            type="button"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="flex items-start gap-2.5 rounded-xl border border-chip-teal-border bg-chip-teal-bg p-3 text-xs leading-relaxed text-chip-teal-fg">
          <svg className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>
            <strong>توصیه اکید امنیتی:</strong> پیش از بارگذاری، نام بیماران، شماره پرونده درمانی و کد ملی خود را پوشش دهید. سامانه نیز به صورت خودکار داده‌های عددی هویتی را فیلتر می‌کند.
          </span>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold text-ink">نوع مدرک اداری یا شغلی را مشخص کنید:</label>
          <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-3">
            {docTypes.map((type) => (
              <label
                key={type.id}
                className={`flex cursor-pointer items-center gap-2 rounded-xl border p-2.5 transition ${
                  selectedType === type.id
                    ? "border-chip-teal-border bg-app-surface text-chip-teal-fg"
                    : "border-app-border bg-app-surface text-ink-muted hover:border-app-border-light"
                }`}
              >
                <input
                  checked={selectedType === type.id}
                  className="h-3.5 w-3.5 accent-brand"
                  name="doctype"
                  type="radio"
                  onChange={() => setSelectedType(type.id)}
                />
                <span>{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border-2 border-dashed border-app-border-light bg-app-surface/60 p-6 text-center transition hover:border-brand/50">
          <svg className="mx-auto mb-2 h-10 w-10 text-brand" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-xs font-semibold text-ink">فایل تصویر یا PDF را اینجا بکشید یا انتخاب کنید</p>
          <p className="mt-1 text-[11px] text-ink-subtle">فرمت‌های مجاز: PDF, JPG, PNG (حداکثر ۱۰ مگابایت)</p>
          <button
            className="mt-3 rounded-xl border border-app-border bg-app-elevated px-4 py-1.5 text-xs font-medium text-brand transition hover:opacity-90"
            type="button"
          >
            انتخاب فایل از دستگاه
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="text-xs font-semibold text-ink">پیش‌نمایش متن استخراج‌شده (OCR جهت بازبینی شما):</label>
            <span className="text-[10px] text-brand">امکان ویرایش دستی قبل از ارسال به هوش مصنوعی</span>
          </div>
          <textarea
            className="w-full rounded-xl border border-app-border bg-app-surface p-3 text-xs leading-relaxed text-ink-muted focus:border-brand focus:ring-0"
            placeholder="متن سند پس از انتخاب در اینجا نمایش داده می‌شود تا صحت آن را تایید کنید..."
            rows={3}
            value={ocrText}
            onChange={(e) => setOcrText(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-app-border pt-3">
          <button
            className="rounded-xl border border-app-border bg-app-surface px-4 py-2 text-xs font-medium text-ink-muted transition hover:bg-app-elevated"
            onClick={closeModal}
            type="button"
          >
            انصراف
          </button>
          <button
            className="rounded-xl bg-brand px-5 py-2 text-xs font-bold text-app-on-primary shadow transition hover:bg-brand-strong"
            onClick={() => {
              log.info("OCR text confirmed", { docType: selectedType, chars: ocrText.length });
              closeModal();
            }}
            type="button"
          >
            تأیید متن و شروع تحلیل مقررات
          </button>
        </div>
      </div>
    </div>
  );
}
