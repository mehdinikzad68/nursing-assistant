"use client";

import { BookOpen, GraduationCap, Megaphone } from "lucide-react";
import { useHami } from "./context";
import { PERSONAL_TOPICS, ROLE_COURSES, ROLE_RESOURCES } from "./personalized";
import TiltCard from "./TiltCard";
import { BODY, CARD, chipTone, DIVIDER, SUB, TITLE } from "./theme";

/**
 * جعبهٔ پیشنهادهای شخصی — متناسب با رشته و شغل کاربر واردشده.
 * Trace: T10 نقطه‌کور ۵ (تکثر استخدام) · تصمیم D2 (جداکردن فضای حقوقی از تجاری)
 *
 * بخش‌ها:
 *  ۱) درود شخصی + موضوعات مرتبط با رشته (پرسش برای بررسی، نه جواب قطعی)
 *  ۲) دوره‌های بازآموزی و زیبایی/گردشگری متناسب با رشته
 *  ۳) منابع و کتب تخصصی
 *  ۴) بخش «تبلیغات» با برچسب صریح — جدا از محتوای حقوقی
 */
export default function PersonalizedCard() {
  const { user, profile, role, calmMotion, submitQuestion, toast } = useHami();

  const topics = PERSONAL_TOPICS[role] ?? PERSONAL_TOPICS.nurse;
  const resources = ROLE_RESOURCES[role] ?? ROLE_RESOURCES.nurse;
  const courses = ROLE_COURSES[role] ?? ROLE_COURSES.nurse;
  const firstName = (user?.name ?? "").trim().split(" ")[0];

  return (
    <TiltCard calmMotion={calmMotion} className={`${CARD} p-5 md:col-span-2`}>
      {/* درود شخصی */}
      <div className="mb-4 flex items-start gap-3">
        <span className="hami-icon flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-hami-teal to-hami-blue text-base font-black text-white">
          {firstName ? firstName.charAt(0) : "؟"}
        </span>
        <div className="min-w-0">
          <h3 className={`${TITLE} leading-7`}>
            سلام{firstName ? ` ${firstName}` : ""}، داشبورد شخصی تو آماده است
          </h3>
          <p className={`${BODY} mt-1`}>
            بر اساس جایگاه «{profile.shortTitle}» پیشنهاد داده شد. هر موضوعی را لمس کنی تا در
            گفتگو با جزئیات بررسی شود.
          </p>
        </div>
      </div>

      {/* ۱) موضوعات مرتبط با رشته */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-extrabold text-hami-teal">
          <GraduationCap className="h-4 w-4" />
          <span>موضوعات مرتبط با رشتهٔ تو</span>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {topics.map((topic) => (
            <button
              key={topic.id}
              type="button"
              onClick={() => submitQuestion(topic.question)}
              className={`${SUB} hami-sensitive flex h-full flex-col justify-between p-3 text-right transition-colors hover:border-hami-teal/50`}
            >
              <span className="text-xs font-bold leading-6 text-hami-text">{topic.title}</span>
              <span className={`mt-2 rounded border-t px-1.5 py-0.5 text-[10px] ${DIVIDER} ${chipTone.teal}`}>
                {topic.domain}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ۲) دوره‌های بازآموزی و زیبایی/گردشگری */}
      <div className="mt-4">
        <div className="flex items-center gap-1.5 text-xs font-extrabold text-hami-teal">
          <GraduationCap className="h-4 w-4" />
          <span>دوره‌های پیشنهادی برای رشتهٔ تو</span>
        </div>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {courses.map((course) => (
            <div key={course.title} className={`${SUB} p-3`}>
              <span
                className={`mb-1 inline-block rounded px-1.5 py-0.5 text-[10px] font-bold ${
                  course.category === "retrain" ? chipTone.teal : chipTone.amber
                }`}
              >
                {course.category === "retrain" ? "بازآموزی (نمونه)" : "زیبایی و گردشگری (نمونه)"}
              </span>
              <p className="text-xs font-bold leading-6 text-hami-text">{course.title}</p>
              <p className="mt-1 text-[11px] leading-5 text-hami-muted">{course.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ۳) منابع و کتب */}
      <div className="mt-4">
        <div className="flex items-center gap-1.5 text-xs font-extrabold text-hami-teal">
          <BookOpen className="h-4 w-4" />
          <span>منابع و کتب تخصصی</span>
        </div>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {resources.map((resource) => (
            <button
              key={resource.title}
              type="button"
              onClick={() =>
                toast("این منبع در نسخهٔ نمایشی فقط عنوان دارد؛ اتصال به منبع واقعی فعال نیست.")
              }
              className={`${SUB} hami-sensitive p-3 text-right transition-colors hover:border-hami-teal/50`}
            >
              <span className="text-xs font-bold leading-6 text-hami-text">{resource.title}</span>
              <span className="mt-1 block text-[10px] text-hami-muted">{resource.kind}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ۴) بخش تبلیغات — با برچسب صریح، جدا از محتوای حقوقی */}
      <div className={`mt-4 rounded-2xl border-2 border-dashed border-hami-purple/40 p-3 ${chipTone.purple}`}>
        <div className="flex items-center gap-1.5 text-xs font-extrabold">
          <Megaphone className="h-4 w-4" />
          <span>تبلیغات — محتوای غیرِ حقوقی</span>
        </div>
        <p className={`${BODY} mt-1`}>
          این بخش تبلیغاتی است و ربطی به راهنمایی حقوقی ندارد. پیشنهادها بر اساس رشتهٔ تو انتخاب
          شده‌اند ولی تایید نهایی مالکیت دوره‌ها با برگزارکنندهٔ آن‌هاست.
        </p>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className={`${SUB} p-3`}>
            <p className="text-xs font-bold text-hami-text">باشگاه بازآموزی و مهارت‌های تخصصی</p>
            <p className="mt-1 text-[11px] text-hami-muted">پیشنهاد بر اساس رشتهٔ تو (نمونه)</p>
          </div>
          <div className={`${SUB} p-3`}>
            <p className="text-xs font-bold text-hami-text">زیبایی، گردشگری سلامت و IPD</p>
            <p className="mt-1 text-[11px] text-hami-muted">مسیر درآمدی (نمونه)</p>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}