"use client";

import { ArrowLeft } from "lucide-react";
import { useHami } from "./context";
import TiltCard from "./TiltCard";
import { BODY, CARD, chipTone, SUB, TITLE } from "./theme";

/**
 * جعبهٔ ۲: اتاق مشاوره و ارجاع به کارشناس انسانی.
 * Trace: UI-2 BOX 2 · H4 (ممنوعیت اطمینان کاذب در پرونده‌های حساس)
 */
export default function ConsultCard() {
  const { profile, calmMotion, openModal } = useHami();

  return (
    <TiltCard calmMotion={calmMotion} className={`${CARD} p-5`}>
      <div>
        <div className="mb-2.5 flex items-center justify-between">
          <span className={`rounded-lg border px-2.5 py-1 text-xs font-extrabold ${chipTone.blue}`}>
            همراهی کارشناس انسانی
          </span>
          <span className="text-xs font-bold opacity-70">موارد حساس</span>
        </div>
        <h3 className={`${TITLE} mb-1`}>اتاق مشاوره و ارجاع به کارشناس</h3>
        <p className={BODY}>
          وقتی موضوع حساس است (هیئت تخلفات، دیوان عدالت یا کسر حقوق سنگین) و نیاز به بررسی کارشناس حقوقی داری.
        </p>
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={() => openModal("consult")}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") openModal("consult");
        }}
        className={`${SUB} my-4 flex cursor-pointer items-center justify-around p-3.5 transition-colors hover:border-hami-blue/50`}
      >
        <div className="flex flex-col items-center">
          <div className="hami-icon flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-hami-blue to-hami-purple text-2xl">
            👨‍⚖️
          </div>
          <span className="mt-1.5 text-xs font-bold text-hami-blue">کارشناس حقوقی</span>
        </div>

        <div className="flex flex-col items-center px-2">
          <span className="mb-1 text-[11px] font-bold text-hami-teal">بررسی رو در رو</span>
          <div className="flex h-6 w-16 items-center justify-center rounded-t-xl border-t-2 border-hami-amber/80 bg-hami-sub text-xs shadow-inner">
            <span>📋⚖️</span>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="hami-icon flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-hami-teal to-hami-teal/70 text-2xl">
            {profile.avatarEmoji}
          </div>
          <span className="mt-1.5 text-xs font-bold text-hami-teal">شما</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => openModal("consult")}
        className="hami-clay-blue w-full gap-2"
      >
        <span>درخواست بررسی توسط کارشناس</span>
        <ArrowLeft className="h-4 w-4" />
      </button>
    </TiltCard>
  );
}