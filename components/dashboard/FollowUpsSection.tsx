"use client";

import { useState } from "react";
import Link from "next/link";

const followUps = [
  {
    id: "#NL-1405-218",
    urgent: "مهلت پاسخ نزدیک: ۳ روز",
    status: "نیازمند تکمیل اطلاعات",
    statusKind: "amber",
    title: "بررسی دعوت‌نامه هیئت رسیدگی به تخلفات یا موضوع انتظامی",
    description:
      "دریافت ابلاغیه برای جلسه بررسی عملکرد شیفت در بخش جراحی. پیشنهاد می‌شود پیش از حضور، لایحه توضیحی مکتوب و مستند به گزارش شیفت تهیه فرمایید.",
    nextLabel: "اقدام بعدی:",
    nextValue: "تأیید پیش‌نویس متن پاسخ یا الصاق گزارش بالینی",
    href: "/case",
    primaryLabel: "مشاهده پیش‌نویس توضیحات",
    secondaryLabel: "الصاق برگه ابلاغیه",
  },
  {
    id: "#NL-1405-194",
    urgent: null,
    status: "آماده بازبینی شما",
    statusKind: "teal",
    title: "بررسی ابلاغ جابه‌جایی شیفت در بخش اورژانس و شیفت‌های فشرده",
    description:
      "تطبیق انجام شد با آیین‌نامه ارتقای بهره‌وری بالینی و دستورالعمل استراحت شیفت‌های شبانه کادر درمان.",
    nextLabel: "مستند استخراج‌شده:",
    nextValue: "بند ۳ ماده ۲ آیین‌نامه بهره‌وری بالینی",
    href: "/transfer",
    primaryLabel: "دریافت متن استعلام اداری",
    secondaryLabel: null,
  },
  {
    id: "#NL-1405-171",
    urgent: null,
    status: "در انتظار ارسال مدارک",
    statusKind: "slate",
    title: "بررسی مغایرت اقلام تعرفه‌گذاری خدمات پرستاری در فیش شهریور",
    description:
      "برای مقایسه با جدول ضرایب k و بسته‌های خدماتی مصوب شورای عالی بیمه سلامت، تصویر فیش بدون نام ارسال شود.",
    nextLabel: "اقدام:",
    nextValue: "بارگذاری بخش ردیف‌های مالی فیش حقوقی",
    href: "/payroll",
    primaryLabel: "بارگذاری فیش",
    secondaryLabel: null,
  },
];

const educationalSamples = [
  { title: "رویه مرسوم اداری در خصوص سقف اضافه‌کار اجباری در شرایط کمبود نیرو", href: "/guide" },
  { title: "چارچوب قانونی ثبت مستندات بالینی هنگام دستورات شفاهی یا تلفنی پزشک", href: "/guide" },
];

const statusChip: Record<string, string> = {
  amber: "border-chip-amber-border bg-chip-amber-bg text-chip-amber-fg",
  teal: "border-chip-teal-border bg-chip-teal-bg text-chip-teal-fg",
  slate: "border-chip-slate-border bg-chip-slate-bg text-chip-slate-fg",
};

export default function FollowUpsSection() {
  const [filter, setFilter] = useState<"all" | "action" | "archive">("all");

  const openUploadModal = () => {
    const modal = document.getElementById("upload-modal");
    if (modal) modal.classList.toggle("hidden");
  };

  const filters: { key: "all" | "action" | "archive"; label: string }[] = [
    { key: "all", label: "همه" },
    { key: "action", label: "نیازمند اقدام" },
    { key: "archive", label: "آرشیو" },
  ];

  return (
    <section aria-labelledby="followups-title" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-1">
        <div className="flex items-center gap-2.5">
          <h3 className="text-lg font-bold text-ink" id="followups-title">
            پیگیری‌های من
          </h3>
          <span className="rounded-full border border-app-border bg-app-card px-2 py-0.5 text-xs font-semibold text-ink-muted">
            ۳ مورد در جریان
          </span>
        </div>

        <div className="flex items-center gap-1 rounded-xl border border-app-border bg-app-surface p-1 text-xs">
          {filters.map((f) => (
            <button
              key={f.key}
              className={`rounded-lg border px-3 py-1 font-medium transition ${
                filter === f.key
                  ? "border-chip-teal-border bg-chip-teal-bg text-chip-teal-fg"
                  : "border-transparent text-ink-subtle hover:text-ink"
              }`}
              onClick={() => setFilter(f.key)}
              type="button"
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {followUps.map((item) => (
        <article
          key={item.id}
          className="rounded-2xl border border-app-border bg-app-card p-5 shadow-sm transition duration-200 hover:border-brand/40"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-ink-subtle">{item.id}</span>
                {item.urgent && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-chip-rose-border bg-chip-rose-bg px-2.5 py-0.5 text-[11px] font-medium text-chip-rose-fg">
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {item.urgent}
                  </span>
                )}
                <span
                  className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${statusChip[item.statusKind]}`}
                >
                  {item.status}
                </span>
              </div>
              <h4 className="mt-2.5 text-base font-bold text-ink">{item.title}</h4>
              <p className="mt-1 text-xs leading-relaxed text-ink-muted">{item.description}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-app-border pt-3.5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-ink-subtle">
              <span className="font-medium text-ink-muted">{item.nextLabel}</span>
              <span>{item.nextValue}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {item.secondaryLabel && (
                <button
                  className="rounded-xl border border-app-border bg-app-surface px-3 py-1.5 text-xs text-ink-muted transition hover:bg-app-elevated hover:text-ink"
                  onClick={openUploadModal}
                  type="button"
                >
                  {item.secondaryLabel}
                </button>
              )}
              <Link
                href={item.href}
                className="rounded-xl border border-chip-teal-border bg-chip-teal-bg px-3 py-1.5 text-xs font-medium text-chip-teal-fg transition hover:opacity-90"
              >
                {item.primaryLabel}
              </Link>
            </div>
          </div>
        </article>
      ))}

      <div className="rounded-2xl border border-app-border bg-app-surface p-5">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="flex items-center gap-2 text-sm font-bold text-ink">
            <svg className="h-4 w-4 text-brand" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>نمونه‌های آموزشی و رویه‌های متداول</span>
          </h4>
          <span className="text-[11px] text-ink-subtle">مرجع آگاهی‌بخشی</span>
        </div>
        <p className="mb-3 text-xs leading-relaxed text-ink-muted">
          بررسی تصمیمات اداری پیشین، بخشنامه‌های تفسیری وزارت بهداشت و رویه‌های هیئت‌های حل اختلاف:
        </p>
        <div className="space-y-2">
          {educationalSamples.map((sample) => (
            <Link
              key={sample.title}
              href={sample.href}
              className="flex items-center justify-between gap-3 rounded-xl border border-app-border bg-app-card p-3 text-xs transition hover:border-brand/40"
            >
              <span className="text-ink-muted">{sample.title}</span>
              <span className="shrink-0 text-brand">مطالعه خلاصه</span>
            </Link>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-ink-subtle">
          * یادآوری اخلاقی و حقوقی: این نمونه‌ها صرفاً برای شناخت رویه‌هاست و نتیجه وضعیت پرونده شما را تعیین یا تضمین نمی‌کند.
        </p>
      </div>
    </section>
  );
}
