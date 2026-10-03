import Link from "next/link";

const faq = [
  {
    q: "آیا این سامانه جای وکیل را می‌گیرد؟",
    a: "خیر. این یک ابزار نمایشی است و مشاورهٔ حقوقی ارائه نمی‌کند.",
  },
  {
    q: "اعداد و پاسخ‌ها واقعی‌اند؟",
    a: "خیر. همهٔ داده‌ها نمونه‌اند و مبنای حقوقی ندارند.",
  },
  {
    q: "اطلاعات من کجا ذخیره می‌شود؟",
    a: "در این نسخه هیچ اطلاعاتی ذخیره نمی‌شود.",
  },
];

export default function GuidePage() {
  return (
    <section className="space-y-4">
      <h1 className="text-xl font-extrabold">راهنما و منابع</h1>

      <div className="rounded-2xl border border-app-border p-4 dark:border-app-border">
        <p className="text-sm font-bold">این نسخه چه می‌کند و چه نمی‌کند؟</p>
        <ul className="mt-2 list-disc pr-5 text-sm text-ink-muted dark:text-ink-subtle">
          <li>نمایش ساختار یک پاسخ حقوقی خوب (نمونه)</li>
          <li>نمایش مسیر پیگیری و قدم بعدی</li>
          <li>بدون تحلیل اسناد واقعی، بدون پایگاه دادهٔ مقررات</li>
        </ul>
      </div>

      <div className="space-y-2">
        {faq.map((f) => (
          <details
            key={f.q}
            className="rounded-2xl border border-app-border p-4 dark:border-app-border"
          >
            <summary className="cursor-pointer text-sm font-bold">{f.q}</summary>
            <p className="mt-2 text-sm text-ink-muted dark:text-ink-subtle">{f.a}</p>
          </details>
        ))}
      </div>

      <Link
        href="/"
        className="inline-block rounded-xl border border-app-border px-4 py-2 text-sm dark:border-app-border"
      >
        بازگشت به صفحهٔ اصلی
      </Link>
    </section>
  );
}
