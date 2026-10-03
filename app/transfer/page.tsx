"use client";

import { useState } from "react";
import { createLogger } from "@/lib/logger";

const log = createLogger("transfer-page");

export default function TransferPage() {
  const [choice, setChoice] = useState<string | null>(null);

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-extrabold">انتقال به بخش دیگر (نمونه)</h1>

      <div className="rounded-2xl border border-amber-300 bg-warning-soft p-4 dark:border-amber-800 dark:bg-amber-950">
        <p className="text-sm font-bold">⚠️ این مورد نیاز به بررسی بیشتر دارد</p>
        <p className="mt-1 text-xs">
          سامانه نمی‌تواند تأیید کند که انتقال شما قانونی است یا نیست. آنچه می‌تواند
          بگوید: قدم بعدی شما چیست.
        </p>
      </div>

      <div className="rounded-2xl border border-app-border p-4 dark:border-app-border">
        <p className="text-sm font-bold">مقایسهٔ وضعیت (نمونه)</p>
        <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-app-surface p-3 dark:bg-app-bg">
            <p className="text-xs text-ink-muted">وضعیت فعلی</p>
            <ul className="mt-1 list-disc pr-4 text-xs">
              <li>بخش داخلی</li>
              <li>شیفت ثابت صبح</li>
            </ul>
          </div>
          <div className="rounded-xl bg-warning-soft p-3 dark:bg-amber-950">
            <p className="text-xs text-ink-muted">وضعیت جدید</p>
            <ul className="mt-1 list-disc pr-4 text-xs">
              <li>اورژانس</li>
              <li>شیفت شب (افزایش بار کاری)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-bold">قدم بعدی شما:</p>
        {[
          { id: "accept", t: "پذیرش شرکت در جلسه" },
          { id: "review", t: "درخواست بازنگری کتبی" },
          { id: "expert", t: "مشورت با کارشناس حقوقی" },
        ].map((o) => (
          <button
            key={o.id}
            onClick={() => {
              setChoice(o.id);
              log.info("Transfer choice selected", { choice: o.id, label: o.t });
            }}
            className={`block w-full rounded-xl border px-4 py-2 text-right text-sm ${
              choice === o.id
                ? "border-teal-600 bg-teal-50 dark:bg-teal-950"
                : "border-app-border dark:border-app-border"
            }`}
          >
            {o.t}
          </button>
        ))}
      </div>

      {choice && (
        <p className="rounded-xl bg-app-surface p-3 text-xs dark:bg-app-bg">
          انتخاب شما ثبت شد (نمونه). در نسخهٔ واقعی، هر اقدام پیگیری کتبی می‌خواهد.
        </p>
      )}
    </section>
  );
}
