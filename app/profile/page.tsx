"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [status, setStatus] = useState("پیمانی");

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-extrabold">شناسنامهٔ شغلی (نمونه)</h1>

      <div className="rounded-2xl border border-app-border p-4 dark:border-app-border">
        <label className="text-xs text-ink-muted" htmlFor="emp">
          وضعیت استخدامی
        </label>
        <select
          id="emp"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 w-full rounded-xl border border-app-border p-3 text-sm dark:border-app-border dark:bg-app-bg"
        >
          {["رسمی", "پیمانی", "شرکتی", "ساعتی", "آزاد"].map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <p className="mt-2 text-xs leading-6 text-ink-muted">
          مقررات مرخصی و اضافه‌کاری برای هر وضعیت متفاوت است؛ سامانه پاسخ را بر همین اساس
          محدود می‌کند.
        </p>
      </div>

      <div className="rounded-2xl border border-app-border p-4 dark:border-app-border">
        <p className="text-sm font-bold">ترجیحات پاسخ</p>
        <label className="mt-3 flex items-center gap-2 text-sm">
          <input type="checkbox" defaultChecked className="h-4 w-4" />
          فقط خلاصه بگو، جزئیات را در صورت نیاز باز کن
        </label>
        <label className="mt-2 flex items-center gap-2 text-sm">
          <input type="checkbox" className="h-4 w-4" />
          هر هفته خلاصهٔ وضعیت مرخصی‌ام را یادآوری کن
        </label>
      </div>

      <p className="rounded-2xl bg-warning-soft p-3 text-xs dark:bg-amber-950">
        این پروفایل نمونه است و در نسخهٔ نمایشی ذخیره نمی‌شود.
      </p>
    </section>
  );
}
