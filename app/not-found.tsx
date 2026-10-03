import Link from "next/link";

/**
 * صفحهٔ ۴۰۴ سفارشی — هیچ مسیری بن‌بست نیست.
 * Trace: PLAN.md بخش ۳ (M1: از / تا /app بدون بن‌بست)
 */
export default function NotFound() {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 p-6 text-center dark:border-slate-800">
      <h1 className="text-xl font-extrabold">صفحه پیدا نشد</h1>
      <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
        این نشانی در نسخهٔ نمایشی وجود ندارد یا جابه‌جا شده است.
      </p>
      <Link
        href="/"
        className="inline-block rounded-xl bg-teal-600 px-4 py-2 text-sm font-bold text-white"
      >
        ← بازگشت به صفحهٔ اصلی
      </Link>
    </section>
  );
}
