"use client";

import { useState } from "react";
import { createLogger } from "@/lib/logger";

const log = createLogger("payroll-page");

const mockLines = [
  ["حقوق پایه", "۸۵,۰۰۰,۰۰۰"],
  ["اضافه‌کاری", "۱۲,۰۰۰,۰۰۰"],
  ["شیفت شب", "۸,۰۰۰,۰۰۰"],
  ["کسورات", "۳,۵۰۰,۰۰۰"],
  ["خالص پرداختی", "۱۰۱,۵۰۰,۰۰۰"],
];

export default function PayrollPage() {
  const [step, setStep] = useState<"upload" | "review" | "results">("upload");

  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-ink">بررسی فیش حقوقی</h1>
          <p className="mt-0.5 text-xs text-ink-subtle">تطبیق اقلام با تعرفه‌های مصوب (نمونه)</p>
        </div>
        <span className="rounded-full border border-chip-amber-border bg-chip-amber-bg px-2.5 py-0.5 text-[11px] text-chip-amber-fg">
          نسخه نمایشی
        </span>
      </header>

      {step === "upload" && (
        <div className="rounded-2xl border border-app-border bg-app-card p-5">
          <h2 className="mb-2 text-sm font-bold text-ink">آپلود فیش حقوقی</h2>
          <p className="mb-4 text-xs leading-relaxed text-ink-muted">
            عکس فیش حقوقی را آپلود کن. پیش از تحلیل، متن استخراج‌شده را خودت بازبینی و تأیید می‌کنی.
          </p>
          <button
            className="w-full rounded-2xl border-2 border-dashed border-app-border-light bg-app-surface p-10 text-center transition hover:border-brand/50"
            onClick={() => {
              setStep("review");
              log.info("Payroll upload area clicked (sample)");
            }}
            type="button"
          >
            <p className="mb-1 text-3xl">📄</p>
            <p className="text-sm text-ink-muted">کلیک کن یا فایل را اینجا رها کن</p>
            <p className="mt-1 text-[11px] text-ink-subtle">PDF, JPG, PNG</p>
          </button>
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-chip-amber-border bg-chip-amber-bg p-3 text-xs text-chip-amber-fg">
            <span>⚠️</span>
            <span>نام بیمار، کد ملی و شماره پرسنلی را وارد نکنید.</span>
          </div>
        </div>
      )}

      {step === "review" && (
        <div className="rounded-2xl border border-app-border bg-app-card p-5">
          <h2 className="mb-2 text-sm font-bold text-ink">تأیید متن استخراج‌شده</h2>
          <p className="mb-4 text-xs text-ink-muted">لطفاً متن استخراج‌شده را بررسی و تأیید کن.</p>
          <div className="mb-4 space-y-1 rounded-xl border border-app-border bg-app-surface p-4 font-mono text-xs text-ink-muted">
            <p className="text-ink">نمونه — فیش حقوقی شهریور ۱۴۰۵</p>
            {mockLines.map(([k, v]) => (
              <p key={k}>
                {k}: {v}
              </p>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              className="rounded-xl bg-brand px-4 py-2 text-xs font-bold text-app-on-primary transition hover:bg-brand-strong"
              onClick={() => {
                setStep("results");
                log.info("Payroll review confirmed (sample)");
              }}
              type="button"
            >
              تأیید و ادامه
            </button>
            <button
              className="rounded-xl border border-app-border bg-app-surface px-4 py-2 text-xs text-ink-muted transition hover:bg-app-elevated"
              onClick={() => setStep("upload")}
              type="button"
            >
              بازگشت
            </button>
          </div>
        </div>
      )}

      {step === "results" && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-app-border bg-app-card p-5">
            <h2 className="mb-3 text-sm font-bold text-ink">نتایج بررسی</h2>
            <div className="mb-4 rounded-xl border border-chip-amber-border bg-chip-amber-bg p-4">
              <p className="text-sm font-semibold text-chip-amber-fg">۱ مورد نیازمند بررسی یافت شد</p>
            </div>
            <div className="rounded-xl border border-app-border bg-app-surface p-4">
              <h3 className="mb-2 text-sm font-bold text-ink">کسر اضافه‌کاری</h3>
              <p className="text-xs text-ink-muted">مبلغ انتظاری: ۱۵,۰۰۰,۰۰۰ ریال</p>
              <p className="mt-1 text-xs text-ink-muted">مبلغ پرداختی: ۱۲,۰۰۰,۰۰۰ ریال</p>
              <p className="mt-2 text-xs font-semibold text-chip-rose-fg">تفاوت: ۳,۰۰۰,۰۰۰ ریال</p>
            </div>
          </div>

          <div className="rounded-2xl border border-app-border bg-app-card p-5">
            <h3 className="mb-2 text-sm font-bold text-ink">مسیرهای پیشنهادی پیگیری</h3>
            <p className="mb-3 text-xs text-ink-muted">
              می‌توانی یک پیش‌نویس نامه استعلام اداری آماده کنی و برای بررسی کارشناسی ارسال کنی.
            </p>
            <a
              href="/plan"
              className="inline-block rounded-xl bg-brand px-4 py-2 text-xs font-bold text-app-on-primary transition hover:bg-brand-strong"
            >
              تولید پیش‌نویس نامه
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
