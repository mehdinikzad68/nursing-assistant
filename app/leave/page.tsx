"use client";

import { useState } from "react";
import { createLogger } from "@/lib/logger";

const log = createLogger("leave-page");

export default function LeavePage() {
  const [requested, setRequested] = useState(false);

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-extrabold">مرخصی‌ها (نمونه)</h1>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { t: "استحقاقی باقی‌مانده", v: "۵ روز", tone: "text-warning" },
          { t: "استفاده‌شده", v: "۱۰ روز", tone: "text-ink dark:text-ink-subtle" },
          { t: "مهلت انقضا", v: "۱۵ آبان", tone: "text-danger" },
        ].map((c) => (
          <div
            key={c.t}
            className="rounded-2xl border border-app-border p-4 dark:border-app-border"
          >
            <p className="text-xs text-ink-muted">{c.t}</p>
            <p className={`mt-1 text-lg font-extrabold ${c.tone}`}>{c.v}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-app-border p-4 dark:border-app-border">
        <p className="text-sm font-bold">تحلیل وضعیت مرخصی شما (نمونه)</p>
        <p className="mt-2 text-sm leading-7 text-ink-muted dark:text-ink-subtle">
          طبق برنامهٔ شیفت‌های نمونه، ماه آینده ۴ روز تعطیل دارید. پیشنهاد می‌شود یکی از
          آن روزها را برای مرخصی استحقاقی ثبت کنید.
        </p>
        <p className="mt-2 text-xs text-ink-muted">
          سطح قطعیت: نیازمند بررسی — این محاسبه بر اساس دادهٔ نمونه است.
        </p>
        <button
          onClick={() => {
            setRequested(true);
            log.info("Leave request submitted (sample)");
          }}
          className="mt-3 rounded-xl bg-brand px-4 py-2 text-sm font-bold text-app-on-primary"
        >
          ثبت درخواست نمونه
        </button>
        {requested && (
          <p className="mt-3 rounded-xl bg-warning-soft p-3 text-xs dark:bg-amber-950">
            درخواست شما ثبت شد (نمونه). در نسخهٔ واقعی، نتیجه به تأیید واحد کارگزینی
            بستگی دارد و سامانه به‌جای شما اقدامی انجام نمی‌دهد.
          </p>
        )}
      </div>

      <div className="rounded-2xl border border-amber-300 bg-warning-soft p-4 text-xs dark:border-amber-800 dark:bg-amber-950">
        ارقام و پیشنهاد این صفحه دادهٔ نمونه‌اند و مبنای حقوقی ندارند.
      </div>
    </section>
  );
}
