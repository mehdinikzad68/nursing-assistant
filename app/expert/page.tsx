export default function ExpertPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-xl font-extrabold">مشاورهٔ انسانی (نمونه)</h1>

      <div className="rounded-2xl border border-app-border p-4 dark:border-app-border">
        <p className="text-sm font-bold">خلاصهٔ پرونده‌ای که کارشناس می‌بیند (نمونه)</p>
        <ul className="mt-2 list-disc pr-5 text-xs text-ink-muted dark:text-ink-subtle">
          <li>موضوع: کسر اضافه‌کاری و مانور در فیش نمونه</li>
          <li>سند: یک فیش نمونه (بدون اطلاعات هویتی)</li>
          <li>تحلیل اولیهٔ سامانه: نیازمند بررسی کارشناس</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {[
          { n: "کارشناس نمونه ۱", s: "حقوق و مزایا" },
          { n: "کارشناس نمونه ۲", s: "قراردادهای پیمانی" },
        ].map((e) => (
          <div
            key={e.n}
            className="rounded-2xl border border-app-border p-4 dark:border-app-border"
          >
            <p className="font-bold">{e.n}</p>
            <p className="mt-1 text-xs text-ink-muted">تخصص: {e.s}</p>
            <button className="mt-3 w-full rounded-xl border border-app-border px-3 py-2 text-xs dark:border-app-border">
              رزرو وقت (نمایشی)
            </button>
          </div>
        ))}
      </div>

      <p className="rounded-2xl bg-warning-soft p-3 text-xs dark:bg-amber-950">
        در نسخهٔ نمایشی هیچ رزرو یا پرداختی انجام نمی‌شود.
      </p>
    </section>
  );
}
