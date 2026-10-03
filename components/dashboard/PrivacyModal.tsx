"use client";

const privacyPrinciples = [
  {
    title: "۱. عدم ارائه خدمات وکالت مستقیم:",
    content:
      "این پلتفرم صرفاً یک دستیار اداری و مشاوره‌ای مبتنی بر متن قوانین است و هیچ‌گونه ادعای وکالت در محاکم یا صدور احکام قضایی قطعی ندارد.",
  },
  {
    title: "۲. حفاظت از داده‌های بیماران و درمانگاه:",
    content:
      "سیستم به صورت خودکار از ذخیره‌سازی نام اشخاص، مشخصات بالینی بیمار و ارقام هویتی جلوگیری می‌کند. مسئولیت عدم وارد نمودن اطلاعات محرمانه برعهده کاربر است.",
  },
  {
    title: "۳. تصمیم نهایی با شماست:",
    content:
      "اطلاعات این سامانه به شما کمک می‌کند با آگاهی و مستند به بخشنامه‌ها صحبت کنید. در شرایط بحرانی، همواره با وکلای پایه یک یا مسئولین تشکل‌های صنفی پرستاری مشورت فرمایید.",
  },
];

export default function PrivacyModal() {
  const closeModal = () => {
    const modal = document.getElementById("privacy-modal");
    if (modal) modal.classList.add("hidden");
  };

  return (
    <div
      className="fixed inset-0 z-50 hidden items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      id="privacy-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
    >
      <div className="max-h-[90vh] w-full max-w-lg space-y-4 overflow-y-auto rounded-3xl border border-app-border-light bg-app-card p-6 text-right shadow-2xl">
        <div className="flex items-center justify-between border-b border-app-border pb-3">
          <h3 id="privacy-modal-title" className="flex items-center gap-2 text-base font-bold text-ink">
            <svg className="h-5 w-5 text-brand" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>اصول حریم خصوصی، شفافیت و حدود اختیارات</span>
          </h3>
          <button
            className="rounded-lg p-1 text-ink-subtle transition hover:bg-app-elevated hover:text-ink"
            onClick={closeModal}
            aria-label="بستن"
            type="button"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="max-h-[60vh] space-y-3 overflow-y-auto pr-1 text-xs leading-relaxed text-ink-muted">
          {privacyPrinciples.map((principle) => (
            <div key={principle.title} className="rounded-xl border border-app-border bg-app-surface p-3">
              <strong className="mb-1 block text-ink">{principle.title}</strong>
              <p className="text-ink-muted">{principle.content}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-end border-t border-app-border pt-3">
          <button
            className="rounded-xl bg-brand px-5 py-2 text-xs font-bold text-app-on-primary transition hover:bg-brand-strong"
            onClick={closeModal}
            type="button"
          >
            متوجه شدم و می‌پذیرم
          </button>
        </div>
      </div>
    </div>
  );
}
