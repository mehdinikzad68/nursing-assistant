import Link from "next/link";

export default function Home() {
  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
        <h1 className="text-2xl font-extrabold leading-9">
          حقوقت رو حساب کن، حق‌ت رو بخواه
        </h1>
        <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
          این صفحهٔ شروع پروتوتایپ نمایشی است. فیش حقوقی، اضافه‌کاری،
          مرخصی و قرارداد خود را در چند گام ساده بررسی کنید.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/"
            className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-bold text-white"
          >
            ورود به نسخه نمایشی
          </Link>
          <Link
            href="/chat"
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm dark:border-slate-700"
          >
            شروع گفت‌وگو
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { t: "بررسی فیش حقوقی", d: "آپلود نمونه و مشاهده خطاها", h: "/payroll" },
          { t: "نمونه نامه اعتراض", d: "پیش‌نویس آماده با هایلایت", h: "/payroll/letter" },
          { t: "حقوق و اضافه‌کاری", d: "محاسبه‌گر نمایشی", h: "/leave" },
        ].map((c) => (
          <Link
            key={c.t}
            href={c.h}
            className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800"
          >
            <div className="font-bold">{c.t}</div>
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {c.d}
            </div>
          </Link>
        ))}
      </div>

      <p className="text-xs leading-6 text-slate-500 dark:text-slate-400">
        توجه: این نسخه صرفاً نمایشی است و همهٔ اعداد و متون آن دادهٔ
        نمونه‌اند؛ جایگزین مشاوره حقوقی نیست.
      </p>
    </section>
  );
}