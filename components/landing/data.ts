/**
 * محتوای صفحهٔ فرود «حامی‌درمان».
 * Trace: Nursing Assistant-2/UI/hami-darman-hero-opus (data.ts)
 * قاعده: متن‌ها را اینجا ویرایش کنید، نه در کامپوننت‌ها.
 */
export type QuickChip = { id: string; label: string; question: string };

export const quickChips: QuickChip[] = [
  { id: "overtime", label: "محاسبه اضافه کار", question: "اضافه‌کار شیفت شب در بیمارستان دولتی چطور محاسبه می‌شود؟" },
  { id: "cme", label: "امتیاز بازآموزی", question: "برای تمدید پروانه چند امتیاز بازآموزی لازم دارم؟" },
  { id: "tarh", label: "قوانین طرح", question: "شرایط کسر خدمت طرح نیروی انسانی در مناطق محروم چیست؟" },
];

export const roles = ["پرستار", "پزشک", "بهورز", "ماما", "کادر اداری درمان", "سایر"] as const;
export type Role = (typeof roles)[number];

export type HamiUser = { name: string; mobile: string; role: Role };

export const copy = {
  brand: "حامی درمان",
  login: "ورود / عضویت سریع",
  badge: "دستیار هوشمند حقوقی، اداری و آموزشی کادر درمان",
  titleA: "شما نبضِ درمان",
  titleB: " را نگه دارید؛",
  titleC: "جوابِ سؤال‌های پیچیده",
  titleD: " با ما.",
  subtitle:
    "از بهورز در دورافتاده‌ترین مراکز تا پزشکان و پرستاران در شلوغ‌ترین بخش‌ها؛ «حامی درمان» پیچیده‌ترین قوانین اداری، محاسبات کارانه، سختی کار و امتیازها را به پاسخ‌های فوری تبدیل می‌کند.",
  placeholder: "سؤالت رو بپرس؛ مثلاً: نحوهٔ محاسبهٔ سنوات سختی کار...",
  cta: "شروع گفت‌وگو با حامی درمان",
  footA: "کاملاً محرمانه و مستقل",
  footB: "عضویت ۳۰ ثانیه‌ای با شماره موبایل",
  welcome: "حامی درمان در هر شیفت کنار شماست؛ گفت‌وگو را آماده می‌کنیم…",
};

const fa = "۰۱۲۳۴۵۶۷۸۹";
export const toFa = (s: string) => s.replace(/\d/g, (d) => fa[Number(d)]);
export const toEn = (s: string) =>
  s
    .replace(/[۰-۹]/g, (d) => String(fa.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));