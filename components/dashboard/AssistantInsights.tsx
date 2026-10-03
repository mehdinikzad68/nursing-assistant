"use client";

import Link from "next/link";

const layers = [
  {
    number: "۱",
    title: "وضعیت اولیه:",
    content: "از اطلاعات فعلی نمی‌توان با قطعیت نظر داد؛ بررسی منوط به تطبیق با حکم استخدامی و فرم رضایت است.",
  },
  {
    number: "۲",
    title: "برداشت از مسئله:",
    content: "ثبت شیفت‌های متوالی شبانه در بخش پرفشار بدون توافق مکتوب با پرستار.",
  },
  {
    number: "۳",
    title: "اطلاعات تکمیلی مورد نیاز:",
    content: "نوع رابطه کاری (رسمی، پیمانی، تبصره یا شرکتی) و آیا دستور کتبی یا جدول زمان‌بندی ابلاغ شده است؟",
  },
  {
    number: "۴",
    title: "مسیرهای پیشنهادی پیش‌رو:",
    content: null,
    bullets: [
      "استعلام متن آیین‌نامه بهره‌وری بالینی (ماده استراحت بین شیفت‌ها)",
      "دریافت فرم استاندارد نامه استعلام محترمانه از مترون بیمارستان",
      "امکان ارجاع پرونده به کارشناس صنفی در صورت بروز تنبیه اداری",
    ],
  },
];

export default function AssistantInsights() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-chip-teal-border bg-app-card p-6 shadow-lg">
      <div className="flex items-center justify-between border-b border-app-border pb-3">
        <div className="flex items-center gap-2">
          <span className="rounded-lg border border-chip-teal-border bg-chip-teal-bg p-1.5 text-brand">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <h3 className="text-sm font-bold text-ink">پاسخ اخیر دستیار (تحلیل لایه‌ای)</h3>
        </div>
        <span className="hidden rounded-full border border-app-border bg-app-surface px-2.5 py-0.5 text-xs font-medium text-ink-muted sm:inline-block">
          پاسخ اولیه • نیازمند تکمیل
        </span>
      </div>

      <div className="mt-3.5 rounded-xl border border-app-border bg-app-surface p-3 text-xs leading-relaxed text-ink-muted">
        <span className="mb-1 block text-[11px] font-semibold text-ink-subtle">پرسش مطرح‌شده:</span>
        «آیا سوپروایزر بدون رضایت می‌تواند سه شیفت شب متوالی برای من در بخش اورژانس ثبت کند؟»
      </div>

      <div className="mt-4 space-y-3.5 text-xs leading-relaxed text-ink-muted">
        {layers.map((layer) => (
          <div key={layer.number} className="flex items-start gap-2.5">
            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-chip-teal-border bg-chip-teal-bg font-mono text-[11px] font-bold text-chip-teal-fg">
              {layer.number}
            </div>
            <div>
              <strong className="mb-0.5 block font-semibold text-ink">{layer.title}</strong>
              {layer.content && <span>{layer.content}</span>}
              {layer.bullets && (
                <div className="mt-1 space-y-1">
                  {layer.bullets.map((bullet) => (
                    <p key={bullet}>• {bullet}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-app-border pt-3.5">
        <span className="text-[11px] text-ink-subtle">مستندات مرتبط پیوست شد</span>
        <Link
          href="/chat"
          className="rounded-xl border border-app-border bg-app-elevated px-3 py-1.5 text-xs font-medium text-brand transition hover:opacity-90"
        >
          تکمیل اطلاعات پرونده
        </Link>
      </div>
    </div>
  );
}
