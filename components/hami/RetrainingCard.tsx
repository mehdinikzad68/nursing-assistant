"use client";

import { useState } from "react";
import { GraduationCap } from "lucide-react";
import { COURSES_DATA } from "./data";
import { useHami } from "./context";
import TiltCard from "./TiltCard";
import { CARD, chipTone, SUB } from "./theme";

/** رنگ متن هر دسته — کلاس‌ها باید ایستا باشند تا Tailwind آن‌ها را تولید کند */
const accentText = {
  teal: "text-hami-teal",
  blue: "text-hami-blue",
  amber: "text-hami-amber"
} as const;

/**
 * جعبهٔ ۵: بازآموزی، زیبایی و گردشگری سلامت.
 * Trace: UI-2 BOX 5 · T11 (مونتایز) · قانون ۰ (هیچ عدد یا امتیاز تأییدنشده‌ای نمایش داده نمی‌شود)
 */
export default function RetrainingCard() {
  const [courseTab, setCourseTab] = useState<"retrain" | "beauty">("retrain");
  const { calmMotion, toast } = useHami();

  return (
    <TiltCard calmMotion={calmMotion} className={`${CARD} p-5`}>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className={`rounded-lg border px-2.5 py-1 text-xs font-extrabold ${chipTone.amber}`}>
            بازآموزی و ارتقای شغلی
          </span>
          <span className="text-xs font-bold text-hami-amber">اطلاعات نمونه</span>
        </div>

        <div className={`${SUB} my-2 grid grid-cols-2 gap-1.5 p-1 text-xs font-extrabold`}>
          <button
            type="button"
            onClick={() => setCourseTab("retrain")}
            aria-pressed={courseTab === "retrain"}
            className={`rounded-lg py-2 transition-colors ${
              courseTab === "retrain" ? "bg-hami-teal text-hami-on-accent shadow" : "opacity-75 hover:opacity-100"
            }`}
          >
            🏅 دوره‌های بازآموزی
          </button>
          <button
            type="button"
            onClick={() => setCourseTab("beauty")}
            aria-pressed={courseTab === "beauty"}
            className={`rounded-lg py-2 transition-colors ${
              courseTab === "beauty" ? "bg-hami-amber text-slate-950 shadow" : "opacity-75 hover:opacity-100"
            }`}
          >
            ✨ زیبایی و گردشگری
          </button>
        </div>

        <div className="mt-2 space-y-2.5">
          {COURSES_DATA.filter((course) => course.category === courseTab).map((course) => (
            <div key={course.id} className={`${SUB} p-3`}>
              <div className="flex items-center justify-between gap-2">
                <span className={`text-xs font-extrabold sm:text-sm ${accentText[course.accent]}`}>{course.title}</span>
                <span className="flex-shrink-0 rounded bg-hami-sub px-2 py-0.5 text-[11px] font-bold tabular-nums text-hami-muted">
                  {course.badge}
                </span>
              </div>
              <p className="mt-1 text-xs leading-5 opacity-80">{course.description}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => toast("فهرست دوره‌های نمونه نمایش داده شد؛ اتصال به سامانهٔ آموزش مداوم در این نسخه فعال نیست.")}
        className="hami-clay-amber mt-3 w-full"
      >
        <GraduationCap className="h-4 w-4" />
        <span>مشاهدهٔ دوره‌های رشتهٔ من</span>
      </button>
    </TiltCard>
  );
}