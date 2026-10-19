"use client";

import { GraduationCap, Layers, PauseCircle, PlayCircle, Scale } from "lucide-react";
import { useHami } from "./context";
import { CARD, SUB } from "./theme";
import type { WorkspaceMode } from "./types";

const MODES: { key: WorkspaceMode; label: string; hint: string; icon: typeof Layers }[] = [
  { key: "all", label: "🍱 نمای کامل (همهٔ جعبه‌ها)", hint: "", icon: Layers },
  { key: "legal", label: "فقط میز کار حقوقی و فیش", hint: "بخش‌های بازآموزی و زیبایی پنهان می‌شوند.", icon: Scale },
  { key: "growth", label: "باشگاه بازآموزی، زیبایی و مقالات", hint: "باشگاه بازآموزی و منابع علمی باز شد.", icon: GraduationCap }
];

/**
 * نوار حالت کاری + کنترل انیمیشن.
 * Trace: UI-2 (EMOTIONAL WORKSPACE FILTER BAR) · تصمیم D2 (جداسازی فضای حقوقی از تجاری)
 */
export default function ModeBar() {
  const { workspaceMode, setWorkspaceMode, calmMotion, toggleCalmMotion, toast } = useHami();

  return (
    <>
      <div className={`${CARD} mb-5 flex flex-wrap items-center justify-between gap-3 px-4 py-3`}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="ml-1 flex items-center gap-1 text-xs font-bold text-hami-muted">
            <Layers className="h-4 w-4 text-hami-teal" />
            <span>حالت نمایش صفحه:</span>
          </span>

          {MODES.map((mode) => {
            const active = workspaceMode === mode.key;
            const Icon = mode.icon;
            return (
              <button
                key={mode.key}
                type="button"
                onClick={() => {
                  setWorkspaceMode(mode.key);
                  if (mode.hint) toast(mode.hint);
                }}
                aria-pressed={active}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-extrabold transition sm:text-sm ${
                  active
                    ? mode.key === "growth"
                      ? "bg-hami-amber text-slate-950"
                      : "hami-clay rounded-xl"
                    : `${SUB} hover:border-hami-teal/40`
                }`}
              >
                {mode.key !== "all" && <Icon className="h-4 w-4" />}
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={toggleCalmMotion}
            aria-pressed={!calmMotion}
            className={`${SUB} flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold`}
          >
            {calmMotion ? (
              <>
                <PlayCircle className="h-4 w-4 text-hami-teal" />
                <span>انیمیشن سه‌بعدی: آرام (ضد خستگی شیفت شب)</span>
              </>
            ) : (
              <>
                <PauseCircle className="h-4 w-4 text-hami-amber" />
                <span>انیمیشن سه‌بعدی: فعال</span>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}