/**
 * کلاس‌های پایهٔ بصری داشبورد «حامی‌درمان».
 * Trace: DESIGN-SYSTEM.md §9 (توکن‌های V2) · RULES.md B3 (بدون رنگ خام در کامپوننت)
 *
 * قاعده: کامپوننت‌ها رنگ خام (bg-teal-600، #0F6E6B و…) نمی‌نویسند؛
 * فقط از توکن‌های تعریف‌شده در app/globals.css استفاده می‌کنند تا
 * حالت روشن/تیره و قاعدهٔ «تم تیره نشکند» حفظ شود.
 */

/** سطح بیرونی کارت بنتو (گلس) */
export const CARD = "hami-glass text-hami-text";

/** سطح درونی: فرم، ردیف و کادر */
export const SUB = "hami-sub rounded-2xl";

/** خط جداکنندهٔ نرم */
export const DIVIDER = "border-hami-border/15";

/** برچسب کوچک رنگی بالای کارت */
export const chipTone = {
  teal: "bg-hami-teal/15 text-hami-teal border-hami-teal/30",
  amber: "bg-hami-amber/15 text-hami-amber border-hami-amber/30",
  blue: "bg-hami-blue/15 text-hami-blue border-hami-blue/30",
  purple: "bg-hami-purple/15 text-hami-purple border-hami-purple/30",
  rose: "bg-hami-rose/15 text-hami-rose border-hami-rose/30"
} as const;

export type ChipTone = keyof typeof chipTone;

/** دکمهٔ ثانویه (outline) */
export const BTN_SUB =
  "text-xs sm:text-sm font-extrabold px-3 py-2 rounded-xl border border-hami-border/20 hover:border-hami-teal/50 transition-colors";

/** دکمهٔ کلی ۳بعدی سبز-آبی */
export const BTN_CLAY = "hami-clay px-4 py-2.5 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5";

/** دکمهٔ کلی کهربایی */
export const BTN_CLAY_AMBER =
  "hami-clay-amber px-4 py-2.5 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5";

/** دکمهٔ کلی آبی */
export const BTN_CLAY_BLUE =
  "hami-clay-blue px-4 py-2.5 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5";

/** متن کمکی کوچک */
export const MUTED = "text-xs text-hami-muted leading-6";

/** متن بدنهٔ کارت */
export const BODY = "text-xs sm:text-sm text-hami-text/85 leading-7";

export const TITLE = "font-black text-base sm:text-lg";