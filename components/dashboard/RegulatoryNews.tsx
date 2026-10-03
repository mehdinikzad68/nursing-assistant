"use client";

import Link from "next/link";

const news = [
  {
    title: "دستورالعمل نظارت بر ساعات کار و استراحت کادر درمان در بخش‌های ویژه",
    source: "ابلاغیه معاونت درمان وزارت بهداشت • مهر ۱۴۰۵",
  },
  {
    title: "شیوه‌نامه پرداخت فوق‌العاده خاص و بسته‌های تعرفه‌گذاری جدید",
    source: "مصوبه کارگروه مشترک نظام پرستاری و سازمان برنامه • شهریور ۱۴۰۵",
  },
];

export default function RegulatoryNews() {
  return (
    <div className="flex flex-col rounded-2xl border border-app-border bg-app-card p-6 shadow">
      <div className="flex items-center justify-between border-b border-app-border pb-2">
        <h3 className="flex items-center gap-2 text-sm font-bold text-ink">
          <svg className="h-4 w-4 text-brand" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>تازه‌های مقررات و بخشنامه‌های پرستاری</span>
        </h3>
        <Link href="/guide" className="shrink-0 text-[11px] text-brand hover:underline">
          همه بخشنامه‌ها
        </Link>
      </div>

      <div className="mt-4 flex flex-1 flex-col gap-3">
        {news.map((item) => (
          <Link
            key={item.title}
            href="/guide"
            className="flex flex-1 flex-col justify-center rounded-xl border border-app-border bg-app-surface p-3 transition hover:border-brand/40"
          >
            <span className="text-xs font-bold text-ink">{item.title}</span>
            <span className="mt-1 text-[11px] text-ink-subtle">{item.source}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
