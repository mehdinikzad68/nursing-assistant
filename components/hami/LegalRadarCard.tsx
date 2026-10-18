"use client";

import { Radio } from "lucide-react";
import { useHami } from "./context";
import TiltCard from "./TiltCard";
import { CARD, chipTone, DIVIDER, SUB } from "./theme";

const TOPICS = [
  {
    tone: "teal" as const,
    title: "💰 مالیات، حقوق و کارانه",
    body: "نحوهٔ محاسبهٔ مالیات روی کارانه، تعرفه‌گذاری و اضافه‌کاری در فیش‌های جدید",
    question: "جزئیات بخشنامهٔ جدید مالیات روی کارانه و اضافه‌کاری کادر درمان چیست؟"
  },
  {
    tone: "amber" as const,
    title: "⏳ بازنشستگی و سختی کار",
    body: "احتساب سنوات ارفاقی برای سال‌های خدمت بالینی و نحوهٔ ثبت درخواست",
    question: "شرایط بازنشستگی با سابقهٔ بالینی برای مشاغل سخت و زیان‌آور بیمارستانی چگونه است؟"
  },
  {
    tone: "blue" as const,
    title: "📋 قوانین اداری و مرخصی",
    body: "سقف ذخیرهٔ مرخصی استحقاقی و ضوابط ابلاغ کتبی در جابه‌جایی بخش‌ها",
    question: "ضوابط تبدیل وضعیت، ذخیرهٔ مرخصی و جابه‌جایی بخش در آیین‌نامهٔ اداری چیست؟"
  }
];

const toneText = {
  teal: "text-hami-teal",
  amber: "text-hami-amber",
  blue: "text-hami-blue"
} as const;

const toneHover = {
  teal: "hover:border-hami-teal",
  amber: "hover:border-hami-amber",
  blue: "hover:border-hami-blue"
} as const;

/**
 * جعبهٔ ۷: رادار حقوقی — موضوعات پرتکرار که مستقیم به گفتگو می‌روند.
 * Trace: UI-2 BOX 7 · بدون تبلیغ (برخلاف نسخهٔ HTML اولیه)
 */
export default function LegalRadarCard() {
  const { calmMotion, submitQuestion } = useHami();

  return (
    <TiltCard calmMotion={calmMotion} className={`${CARD} p-5 md:col-span-2`}>
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-extrabold ${chipTone.rose}`}>
            <Radio className="h-3.5 w-3.5" />
            <span>موضوعات پرتکرار حقوقی، مالی و اداری</span>
          </span>
          <span className="text-xs font-bold opacity-75">بدون تبلیغ • هر پرسش با منبعش بررسی می‌شود</span>
        </div>

        <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-3">
          {TOPICS.map((topic) => (
            <button
              key={topic.title}
              type="button"
              onClick={() => submitQuestion(topic.question)}
              className={`${SUB} flex flex-col justify-between p-3.5 text-right transition-colors ${toneHover[topic.tone]}`}
            >
              <span className="text-xs leading-6 sm:text-sm">
                <span className={`mb-1 block font-extrabold ${toneText[topic.tone]}`}>{topic.title}</span>
                <span className="text-hami-text/80">{topic.body}</span>
              </span>
              <span
                className={`mt-2.5 inline-block border-t pt-2 text-xs font-extrabold ${DIVIDER} ${toneText[topic.tone]}`}
              >
                پرسیدن دربارهٔ شرایط من ←
              </span>
            </button>
          ))}
        </div>
      </div>
    </TiltCard>
  );
}