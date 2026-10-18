"use client";

import { BookOpen } from "lucide-react";
import { useHami } from "./context";
import TiltCard from "./TiltCard";
import { CARD, chipTone, DIVIDER, SUB, TITLE } from "./theme";

const toneText = {
  teal: "text-hami-teal",
  blue: "text-hami-blue",
  purple: "text-hami-purple"
} as const;

const RESOURCES = [
  {
    tag: "📄 مقالهٔ کاربردی",
    tone: "teal" as const,
    title: "استاندارد نسبت پرستار به بیمار و تأثیر نوبت‌کاری شب بر سلامت شغلی",
    source: "نمونه — منبع اصلی در دسترس نیست",
    action: "مطالعهٔ خلاصه"
  },
  {
    tag: "📘 کتاب مرجع حقوقی",
    tone: "blue" as const,
    title: "راهنمای جامع حقوق، قوانین اداری و مسئولیت‌های حرفه‌ای کادر درمان",
    source: "نمونه — نسخهٔ نمایشی",
    action: "مشاهدهٔ فصول"
  },
  {
    tag: "🏛️ انجمن‌های علمی",
    tone: "purple" as const,
    title: "انجمن علمی پرستاری • انجمن پرستاری ویژه • انجمن اتاق عمل و مامایی",
    source: "نمونه — تقویم رویدادها",
    action: "تقویم انجمن"
  }
];

/**
 * جعبهٔ ۶: منابع علمی، کتب و انجمن‌های تخصصی.
 * Trace: UI-2 BOX 6 · C3 (هر منبع باید قابل ارجاع باشد — اینجا عمداً «نمونه» برچسب خورده)
 */
export default function ScienceCard() {
  const { calmMotion, profile, toast } = useHami();

  return (
    <TiltCard calmMotion={calmMotion} className={`${CARD} p-5 md:col-span-2`}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className={`rounded-lg border px-2.5 py-1 text-xs font-extrabold ${chipTone.teal}`}>
            📚 کتب مرجع، مقالات علمی و انجمن‌های تخصصی
          </span>
          <h3 className={`${TITLE} mt-1.5`}>{profile.scienceTitle}</h3>
        </div>
        <button
          type="button"
          onClick={() => toast("جست‌وجوی زندهٔ منابع هنوز متصل نشده است؛ این نسخه فهرست نمونه را نشان می‌دهد.")}
          className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-extrabold transition-colors ${chipTone.teal} hover:bg-hami-teal/25`}
        >
          <BookOpen className="h-4 w-4" />
          <span>جست‌وجو در منابع علمی</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {RESOURCES.map((resource) => (
          <div key={resource.tag} className={`${SUB} flex flex-col justify-between p-3.5`}>
            <div>
              <span className={`text-xs font-extrabold ${toneText[resource.tone]}`}>{resource.tag}</span>
              <h4 className="mt-1 text-xs font-bold leading-6 sm:text-sm">{resource.title}</h4>
            </div>
            <div className={`mt-2.5 flex items-center justify-between border-t pt-2 text-xs opacity-80 ${DIVIDER}`}>
              <span>{resource.source}</span>
              <button
                type="button"
                onClick={() => toast("این مورد در نسخهٔ نمایشی فقط عنوان و توضیح دارد و سند کامل ندارد.")}
                className="font-extrabold text-hami-teal hover:underline"
              >
                {resource.action} ←
              </button>
            </div>
          </div>
        ))}
      </div>
    </TiltCard>
  );
}