"use client";

import { useState } from "react";
import { createLogger } from "@/lib/logger";

const log = createLogger("plan-page");

const steps = [
  { t: "جمع‌آوری مدارک", d: "فیش و ریز شیفت‌های همان ماه" },
  { t: "تنظیم نامهٔ درخواست توضیح", d: "پیش‌نویش نمونه" },
  { t: "ثبت در دبیرخانه", d: "نگهداری رسید" },
  { t: "پیگیری کتبی", d: "مهلت‌ها نمونه" },
];

export default function PlanPage() {
  const [done, setDone] = useState<number[]>([]);

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-extrabold">مسیر اقدام (نمونه)</h1>

      <ol className="space-y-3">
        {steps.map((s, i) => (
          <li key={s.t}>
            <button
              onClick={() => {
                const newDone = done.includes(i) ? done.filter((x) => x !== i) : [...done, i];
                setDone(newDone);
                log.info("Plan step toggled", { step: i, title: s.t, done: newDone.length });
              }}
              className={`w-full rounded-2xl border p-4 text-right ${
                done.includes(i)
                  ? "border-teal-600 bg-teal-50 dark:bg-teal-950"
                  : "border-app-border dark:border-app-border"
              }`}
            >
              <p className="text-sm font-bold">
                {done.includes(i) ? "✓ " : ""}
                مرحلهٔ {i + 1}: {s.t}
              </p>
              <p className="mt-1 text-xs text-ink-muted">{s.d}</p>
            </button>
          </li>
        ))}
      </ol>

      <div className="h-2 overflow-hidden rounded-full bg-app-elevated dark:bg-app-card">
        <div
          className="h-full rounded-full bg-brand-strong transition-all"
          style={{ width: `${(done.length / steps.length) * 100}%` }}
        />
      </div>
      <p className="text-xs text-ink-muted">
        پیشرفت: {done.length} از {steps.length} مرحله (نمونه)
      </p>
    </section>
  );
}
