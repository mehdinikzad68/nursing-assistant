"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const quickTopics = [
  { label: "حقوق و شیفت", prompt: "حقوق، اضافه‌کاری و شیفت‌های شب در بخش درمانی", href: "/payroll" },
  { label: "قرارداد و استخدام", prompt: "بررسی وضعیت قرارداد کار معین، شرکتی یا تمدید طرح", href: "/guide" },
  { label: "مرخصی و بیمه", prompt: "قوانین مرخصی استعلاجی ناشی از کار، بارداری و بیمه تامین اجتماعی", href: "/leave" },
  { label: "نامه یا تصمیم اداری", prompt: "نحوه پاسخ یا اعتراض به نامه یا تصمیم اداری بیمارستان", href: "/plan" },
  { label: "انتقال و جابه‌جایی", prompt: "ضوابط جابه‌جایی ناخواسته بین بخش‌ها یا مراکز درمانی", href: "/transfer" },
  { label: "موضوع حرفه‌ای یا انتظامی", prompt: "شیوه‌نامه مواجهه با شکایات حرفه‌ای و رویه‌های انتظامی", href: "/case" },
];

export default function HeroSection() {
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const router = useRouter();

  const handleStartReview = () => {
    const text = inputValue.trim();
    router.push(text ? `/chat?q=${encodeURIComponent(text)}` : "/chat");
  };

  const handleVoiceToggle = () => {
    const next = !isRecording;
    setIsRecording(next);
    if (!next && !inputValue.trim()) {
      setInputValue("اعتراض به نحوه محاسبه اضافه‌کاری و کاهش ساعات موظفی قانون بهره‌وری در بخش CCU");
    }
  };

  const fillPrompt = (topic: string) => {
    setInputValue(`در ارتباط با: ${topic}، لطفاً قوانین و شیوه پیگیری اداری را بررسی کنید.`);
  };

  const openUploadModal = () => {
    const modal = document.getElementById("upload-modal");
    if (modal) modal.classList.toggle("hidden");
  };

  return (
    <section aria-labelledby="question-hero-title" className="space-y-4">
      <div className="relative overflow-hidden rounded-3xl border border-chip-teal-border bg-gradient-to-b from-app-card via-app-card to-app-surface p-6 shadow-xl md:p-8">
        <div className="pointer-events-none absolute -top-24 right-1/4 h-80 w-80 rounded-full bg-brand/5 blur-3xl" />

        <div className="relative max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-chip-teal-border bg-chip-teal-bg px-3 py-1 text-xs font-medium text-chip-teal-fg">
            <span>شنبه، ۱۲ مهر ۱۴۰۵</span>
            <span className="opacity-60">•</span>
            <span>راهنمای اداری، استخدامی و قوانین بالینی</span>
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight text-ink md:text-3xl" id="question-hero-title">
            سلام سارا، چه مسئله‌ای در محل کار برایت پیش آمده؟
          </h2>

          <p className="mt-2 text-sm font-normal leading-relaxed text-ink-muted md:text-base">
            مسئله‌ات را به زبان خودت بنویس. برای پاسخ دقیق‌تر ممکن است چند سؤال کوتاه بپرسیم تا مستندات و مقررات مربوطه را تطبیق دهیم.
          </p>
        </div>

        <div className="relative mt-6">
          <div className="rounded-2xl border border-app-border bg-app-surface p-3 shadow-inner transition-all focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
            <textarea
              className="w-full resize-none bg-transparent p-1 text-sm leading-relaxed text-ink placeholder:text-ink-subtle focus:ring-0 md:text-base"
              id="nurse-prompt-input"
              placeholder="مثلاً: در بخش اورژانس برای ماه آینده سه شیفت شب متوالی اجباری بدون رضایت من ثبت شده است. روال قانونی اعتراض و آیین‌نامه مربوطه چیست؟"
              rows={3}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />

            <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-app-border pt-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  className="inline-flex items-center gap-1.5 rounded-xl border border-app-border bg-app-elevated px-3 py-1.5 text-xs font-medium text-ink-muted transition hover:text-ink"
                  onClick={openUploadModal}
                  type="button"
                >
                  <svg className="h-4 w-4 text-brand" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M12 4.5v15m7.5-7.5h-15" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>افزودن سند (فیش، ابلاغ، قرارداد)</span>
                </button>

                <button
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition ${
                    isRecording
                      ? "border-brand bg-chip-teal-bg text-chip-teal-fg"
                      : "border-app-border bg-app-elevated text-ink-muted hover:text-brand"
                  }`}
                  id="voice-record-btn"
                  onClick={handleVoiceToggle}
                  type="button"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15a3 3 0 003-3V6a3 3 0 00-6 0v6a3 3 0 003 3z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{isRecording ? "در حال شنیدن... (صحبت کنید)" : "طرح صوتی سوال"}</span>
                </button>
              </div>

              <button
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-xs font-semibold text-app-on-primary shadow-md transition-colors hover:bg-brand-strong md:text-sm"
                onClick={handleStartReview}
                type="button"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>شروع بررسی اولیه</span>
              </button>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 px-1 text-xs text-ink-subtle">
            <svg className="h-4 w-4 shrink-0 text-brand" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>حفظ حریم خصوصی بیمار و پرسنل: لطفاً نام بیمار، کد ملی، شماره پرسنلی و اطلاعات حساس درمانی را در متن وارد نکنید.</span>
          </div>
        </div>

        <div className="mt-6 border-t border-app-border pt-5">
          <span className="mb-3 block text-xs font-medium text-ink-subtle">موضوعات پرتکرار و نیازمند راهنمایی:</span>
          <div className="flex flex-wrap gap-2">
            {quickTopics.map((topic) => (
              <button
                key={topic.label}
                className="rounded-xl border border-app-border bg-app-surface px-3.5 py-1.5 text-xs text-ink-muted transition hover:bg-app-elevated hover:text-ink"
                onClick={() => fillPrompt(topic.prompt)}
                type="button"
              >
                {topic.label}
              </button>
            ))}
            <button
              className="flex items-center gap-1.5 rounded-xl border border-chip-teal-border bg-chip-teal-bg px-3.5 py-1.5 text-xs text-chip-teal-fg transition hover:opacity-90"
              onClick={openUploadModal}
              type="button"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              بررسی فیش حقوقی یا تعرفه
            </button>
            <button
              className="flex items-center gap-1.5 rounded-xl border border-chip-teal-border bg-chip-teal-bg px-3.5 py-1.5 text-xs text-chip-teal-fg transition hover:opacity-90"
              onClick={openUploadModal}
              type="button"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              بررسی حکم یا قرارداد
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
