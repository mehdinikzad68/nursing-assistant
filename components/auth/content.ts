export const copy = {
  brand: 'حامی درمان',
  badge: 'دستیار هوشمند حقوقی، اداری و آموزشی کادر درمان',
  subtitle: 'از بهورز در دورافتاده‌ترین مراکز پزشکان و پرستاران در شلوغ‌ترین بخش‌ها؛ «حامی درمان» پیچیده‌ترین قوانین اداری، محاسبات کارانه، سختی کار و امتیازها را به پاسخ‌های فوری تبدیل می‌کنند.',
  placeholder: 'سؤالت رو بپرس؛ مثلاً: نحوه محاسبهٔ سنوات سختی کار...',
  questions: ['محاسبه اضافه کار', 'امتیاز بازآموزی', 'قوانین طرح'],
  cta: 'شروع گفت‌وگو با حامی درمان',
  footer: '🔒 کاملاً محرمانه و مستقل | ⚡ عضویت ۳۰ ثانیه‌ای با شماره موبایل',
} as const;

export const DEMO_CODE = '123456';
export const WELCOME_DURATION_MS = 3000;
export const MAX_QUESTION_LENGTH = 1500;

export function normalizeDigits(value: string): string {
  return value.replace(/[۰-۹]/g, digit => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
    .replace(/[٠-٩]/g, digit => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)));
}

export function formatPersian(value: number): string {
  return value.toLocaleString('fa-IR');
}
