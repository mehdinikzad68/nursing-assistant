import data from "@/data/mock/responses/DC-05.json";

export default function CasePage() {
  const a = data.answer;

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-extrabold">پروندهٔ مشابه (نمونه)</h1>

      <div className="rounded-2xl border border-amber-300 bg-warning-soft p-4 text-xs dark:border-amber-800 dark:bg-amber-950">
        نتیجهٔ پروندهٔ دیگر، وعدهٔ نتیجهٔ پروندهٔ شما نیست. این کارت فقط شباهت‌ها و
        تفاوت‌ها را نشان می‌دهد.
      </div>

      {a.similarCases.map((c) => (
        <div
          key={c.id}
          className="space-y-3 rounded-2xl border border-app-border p-4 dark:border-app-border"
        >
          <p className="text-sm font-bold">{c.title}</p>

          <div>
            <p className="text-xs font-bold text-success dark:text-emerald-300">
              چرا شبیه است؟
            </p>
            <ul className="mt-1 list-disc pr-5 text-xs text-ink-muted dark:text-ink-subtle">
              {c.similar.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold text-warning dark:text-amber-300">
              تفاوت‌های کلیدی
            </p>
            <ul className="mt-1 list-disc pr-5 text-xs text-ink-muted dark:text-ink-subtle">
              {c.different.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      <div className="rounded-2xl border border-app-border p-4 dark:border-app-border">
        <p className="text-sm font-bold">قدم‌های ممکن</p>
        <ol className="mt-2 list-decimal pr-5 text-sm text-ink-muted dark:text-ink-subtle">
          {a.nextSteps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}
