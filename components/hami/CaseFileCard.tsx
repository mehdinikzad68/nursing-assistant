"use client";

import { Bell, EyeOff } from "lucide-react";
import { useHami } from "./context";
import TiltCard from "./TiltCard";
import { CARD, chipTone, SUB, TITLE } from "./theme";

const statusTone = {
  warning: "text-hami-amber",
  ready: "text-hami-teal",
  new: "text-hami-purple"
} as const;

/**
 * جعبهٔ ۴: پروندهٔ شخصی و یادآورها (فقط محلی — بدون سرور).
 * Trace: UI-2 BOX 4 · E3 (بدون ذخیره‌سازی حساس روی سرور)
 */
export default function CaseFileCard() {
  const { calmMotion, stealth, toggleStealth, reminders, addReminder } = useHami();

  return (
    <TiltCard calmMotion={calmMotion} className={`${CARD} p-5`}>
      <div>
        <div className="mb-2.5 flex items-center justify-between">
          <span className={`rounded-lg border px-2.5 py-1 text-xs font-extrabold ${chipTone.purple}`}>
            پروندهٔ شخصی و یادآور
          </span>
          <button
            type="button"
            onClick={toggleStealth}
            className="flex items-center gap-1 text-xs font-extrabold text-hami-amber hover:underline"
          >
            <EyeOff className="h-3.5 w-3.5" />
            <span>{stealth ? "نمایش عناوین" : "مخفی‌سازی عناوین"}</span>
          </button>
        </div>
        <h3 className={`${TITLE} mb-2`}>پیگیری‌های باز و مهلت‌های مهم</h3>

        <div className="space-y-2.5">
          {reminders.length === 0 && (
            <p className="text-xs text-hami-muted">هنوز یادآوری ثبت نشده است.</p>
          )}
          {reminders.map((reminder) => (
            <div key={reminder.id} className={`hami-sensitive ${SUB} p-3`}>
              <div className="flex items-center justify-between text-xs font-extrabold sm:text-sm">
                <span className={statusTone[reminder.status]}>{reminder.title}</span>
                <span className="hami-sub rounded px-2 py-0.5 text-xs tabular-nums">{reminder.badgeText}</span>
              </div>
              <p className="mt-1.5 text-xs leading-5 opacity-80">{reminder.nextStep}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={addReminder}
        className={`mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-extrabold transition-colors sm:text-sm ${chipTone.purple} hover:bg-hami-purple/25`}
      >
        <Bell className="h-4 w-4" />
        <span>+ ثبت یادآور پیگیری</span>
      </button>
    </TiltCard>
  );
}