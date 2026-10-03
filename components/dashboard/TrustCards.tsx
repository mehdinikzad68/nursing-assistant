"use client";

import Link from "next/link";

export default function TrustCards() {
  const openUploadModal = () => {
    const modal = document.getElementById("upload-modal");
    if (modal) modal.classList.toggle("hidden");
  };

  const openPrivacyModal = () => {
    const modal = document.getElementById("privacy-modal");
    if (modal) modal.classList.toggle("hidden");
  };

  return (
    <section aria-label="راهنمای ایمنی و شفافیت" className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* Card 1 */}
      <div className="flex flex-col justify-between rounded-2xl border border-app-border bg-app-card p-5">
        <div>
          <div className="mb-2 flex items-center gap-2 text-brand">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h3 className="text-sm font-bold text-ink">پاسخ قابل‌بررسی، تصمیم با شما</h3>
          </div>
          <p className="text-xs leading-relaxed text-ink-muted">
            این سیستم یک ابزار هوشمند برای تحلیل اولیه مواد قانونی و مستندسازی است، نه وکیل یا مرجع قضایی. نتایج ارائه شده جنبه مشورتی داشته و رأی رسمی به شمار نمی‌روند.
          </p>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-app-border pt-3 text-[11px] text-ink-subtle">
          <span>بدون ادعای وکالت حقوقی</span>
          <button className="text-brand hover:underline" onClick={openPrivacyModal} type="button">
            مطالعه منشور شفافیت
          </button>
        </div>
      </div>

      {/* Card 2 */}
      <div className="flex flex-col justify-between rounded-2xl border border-app-border bg-app-card p-5">
        <div>
          <div className="mb-2 flex items-center gap-2 text-brand">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h3 className="text-sm font-bold text-ink">ارجاع به کارشناس اداری یا حقوقی</h3>
          </div>
          <p className="text-xs leading-relaxed text-ink-muted">
            در مواردی که پرونده شما نیازمند بررسی تخصصی در تشکل‌های صنفی، نظام پرستاری یا دفاتر رسمی حقوقی باشد، پیش‌نویس مرتب‌شده را در اختیارتان می‌گذاریم تا به متخصص ارائه دهید.
          </p>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-app-border pt-3 text-[11px] text-ink-subtle">
          <span>آماده‌سازی مدارک استاندارد</span>
          <Link href="/expert" className="font-medium text-brand hover:underline">
            درخواست بررسی کارشناس
          </Link>
        </div>
      </div>

      {/* Card 3 */}
      <div className="flex flex-col justify-between rounded-2xl border border-chip-teal-border bg-app-card p-5">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-brand">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 className="text-sm font-bold text-ink">بارگذاری و تحلیل امن سند</h3>
            </div>
            <span className="rounded bg-chip-teal-bg px-2 py-0.5 font-mono text-[10px] text-chip-teal-fg">
              حذف خودکار هویت
            </span>
          </div>
          <p className="text-xs leading-relaxed text-ink-muted">
            متن فیش، حکم یا ابلاغیه را برای تطبیق با بخشنامه‌ها بررسی کنید. شما پیش از تحلیل هوش مصنوعی، متن استخراج‌شده را بازبینی و تأیید می‌کنید.
          </p>
        </div>
        <div className="mt-3 border-t border-app-border pt-3">
          <button
            className="w-full rounded-xl border border-chip-teal-border bg-chip-teal-bg px-3 py-2 text-center text-xs font-semibold text-chip-teal-fg transition hover:opacity-90"
            onClick={openUploadModal}
            type="button"
          >
            شروع بارگذاری امن مدارک
          </button>
        </div>
      </div>
    </section>
  );
}
