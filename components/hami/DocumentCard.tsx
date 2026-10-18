"use client";

import { Calculator, FileSignature } from "lucide-react";
import { useHami } from "./context";
import TiltCard from "./TiltCard";
import { BODY, CARD, chipTone, SUB, TITLE } from "./theme";

/**
 * جعبهٔ ۳: فیش‌خوان و حکم‌خوان با تطبیق چشمی.
 * Trace: UI-2 BOX 3 · قاعدهٔ C4 (کاربر باید عدد خوانده‌شده را خودش تأیید کند)
 */
export default function DocumentCard() {
  const { calmMotion, openModal, generateDraft } = useHami();

  return (
    <TiltCard calmMotion={calmMotion} className={`${CARD} p-5`}>
      <div>
        <div className="mb-2.5 flex items-center justify-between">
          <span className={`rounded-lg border px-2.5 py-1 text-xs font-extrabold ${chipTone.teal}`}>فیش‌خوان و حکم‌خوان</span>
          <span className="text-xs font-extrabold text-hami-teal">تأیید چشمی دوطرفه</span>
        </div>
        <h3 className={`${TITLE} mb-1`}>بررسی عکس فیش، حکم و قرارداد</h3>
        <p className={BODY}>
          عکس فیش یا حکم را کنار فرم می‌گذاریم تا ابتدا اعداد خوانده‌شده را به چشم خودتان تأیید کنید و بعد تحلیل
          دقیق بگیرید.
        </p>
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={() => openModal("scanner")}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") openModal("scanner");
        }}
        className={`${SUB} my-3.5 cursor-pointer rounded-2xl border-2 border-dashed border-hami-teal/50 p-3.5 transition-colors hover:border-hami-teal`}
      >
        <div className="flex items-center gap-3">
          <div className="hami-icon flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[18px] bg-gradient-to-br from-hami-teal to-hami-teal/70 text-2xl">
            📑
          </div>
          <div className="text-right">
            <div className="text-sm font-black">باز کردن فیش‌خوان و حکم‌خوان</div>
            <div className="mt-0.5 text-xs opacity-75">نمایش همزمان عکس فیش + برجسته‌سازی ردیف‌ها</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => openModal("calc")}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-hami-border/20 px-2.5 py-2.5 text-xs font-extrabold transition-colors hover:border-hami-teal/50"
        >
          <Calculator className="h-4 w-4 text-hami-teal" />
          <span>محاسبهٔ سختی کار</span>
        </button>
        <button
          type="button"
          onClick={generateDraft}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-hami-border/20 px-2.5 py-2.5 text-xs font-extrabold transition-colors hover:border-hami-teal/50"
        >
          <FileSignature className="h-4 w-4 text-hami-amber" />
          <span>پیش‌نویس نامه</span>
        </button>
      </div>
    </TiltCard>
  );
}