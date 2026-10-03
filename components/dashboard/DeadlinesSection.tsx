"use client";

import Link from "next/link";

const deadlines = [
  {
    day: "۱۵",
    month: "مهر",
    title: "مهلت ارسال لایحه توضیحی اداری",
    description: "مربوط به استعلام شیفت بیمارستان (۳ روز مانده)",
    urgent: true,
    action: "اقدام",
    href: "/plan",
  },
  {
    day: "۲۰",
    month: "مهر",
    title: "ارسال اعتراض کارشناسی تعرفه‌گذاری",
    description: "سامانه امور مالی دانشگاه علوم پزشکی",
    urgent: false,
    action: "بررسی",
    href: "/payroll",
  },
];

export default function DeadlinesSection() {
  return (
    <div className="space-y-4 rounded-2xl border border-app-border bg-app-card p-6 shadow">
      <div className="flex items-center justify-between border-b border-app-border pb-2">
        <h3 className="flex items-center gap-2 text-sm font-bold text-ink">
          <svg className="h-4 w-4 text-brand" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>موعدها و یادآوری‌های من</span>
        </h3>
        <span className="text-[11px] text-ink-subtle">تقویم اداری مهر ۱۴۰۵</span>
      </div>

      {deadlines.map((item) => (
        <div
          key={item.title}
          className={`flex items-center justify-between gap-3 rounded-xl border p-3 ${
            item.urgent ? "border-chip-rose-border bg-app-surface" : "border-app-border bg-app-surface"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 flex-col items-center justify-center rounded-xl border leading-none ${
                item.urgent
                  ? "border-chip-rose-border bg-chip-rose-bg text-chip-rose-fg"
                  : "border-chip-teal-border bg-chip-teal-bg text-chip-teal-fg"
              }`}
            >
              <span className="font-mono text-xs font-bold">{item.day}</span>
              <span className="text-[9px]">{item.month}</span>
            </div>
            <div>
              <p className="text-xs font-bold text-ink">{item.title}</p>
              <p className="mt-0.5 text-[11px] text-ink-subtle">{item.description}</p>
            </div>
          </div>
          <Link
            href={item.href}
            className="shrink-0 rounded-lg border border-app-border bg-app-elevated px-2.5 py-1 text-xs text-ink-muted transition hover:text-ink"
          >
            {item.action}
          </Link>
        </div>
      ))}
    </div>
  );
}
