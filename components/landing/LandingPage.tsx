"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { copy, HamiUser, quickChips } from "@/components/landing/data";
import { Illustration } from "@/components/landing/Illustration";
import { Logo } from "@/components/landing/Logo";
import { SignupModal } from "@/components/landing/SignupModal";
import { WelcomeScreen } from "@/components/landing/WelcomeScreen";

/** کلید ذخیرهٔ کاربر — باید با USER_STORAGE_KEY در components/hami/context.ts یکی باشد */
const USER_STORAGE_KEY = "hami:user";
/** کلید پرسشِ باقی‌مانده از لندینگ، تا در داشبورد خودکار ارسال شود */
const PENDING_QUESTION_KEY = "hami:pending-question";

/**
 * صفحهٔ فرود «حامی درمان» — جایگزین صفحهٔ لندینگ قبلی.
 * Trace: Nursing Assistant-2/UI/hami-darman-hero-opus (HeroSection.tsx)
 *
 * جریان: لندینگ → ثبت‌نام (موبایل → کد → پروفایل) → صفحهٔ خوش‌آمد ۳ ثانیه‌ای
 * → هدایت به داشبورد شخصی. پرسش کاربر هم حفظ می‌شود و در داشبورد ارسال می‌گردد.
 */
export default function LandingPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeChip, setActiveChip] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState<HamiUser | null>(null);
  const [welcoming, setWelcoming] = useState(false);

  const closeModal = useCallback(() => setModalOpen(false), []);

  /** پایان انیمیشن خوش‌آمد → ذخیرهٔ کاربر و پرسش، سپس ورود به داشبورد */
  const finishWelcome = useCallback(() => {
    setWelcoming(false);
    try {
      if (user) window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      const pending = query.trim();
      if (pending) window.localStorage.setItem(PENDING_QUESTION_KEY, pending);
    } catch {
      /* حافظه در دسترس نیست — کاربر بدون ذخیره وارد داشبورد می‌شود */
    }
    router.replace("/dashboard");
  }, [query, router, user]);

  /** اگر کاربر از قبل وارد شده، مستقیم به داشبورد می‌رود */
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(USER_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored) as HamiUser);
        router.replace("/dashboard");
      }
    } catch {
      /* ignore */
    }
  }, [router]);

  const pickChip = (id: string) => {
    const chip = quickChips.find((c) => c.id === id)!;
    if (activeChip === id) {
      setActiveChip(null);
      setQuery("");
      return;
    }
    setActiveChip(id);
    setQuery(chip.question);
  };

  /** پرسش را ذخیره و به داشبورد می‌رود (برای کاربرِ از قبل واردشده) */
  const goToDashboard = useCallback(
    (questionText: string) => {
      try {
        const pending = questionText.trim();
        if (pending) window.localStorage.setItem(PENDING_QUESTION_KEY, pending);
      } catch {
        /* ignore */
      }
      router.replace("/dashboard");
    },
    [router]
  );

  const start = (e?: FormEvent) => {
    e?.preventDefault();
    if (user) {
      goToDashboard(query);
      return;
    }
    setModalOpen(true);
  };

  return (
    <section
      dir="rtl"
      className="hami-grain relative isolate min-h-screen overflow-hidden bg-[#F4F7FB] font-[Vazirmatn] text-slate-800 transition-colors duration-300 dark:bg-[#0D1117] dark:text-slate-100"
    >
      {/* ambient glows */}
      <div className="pointer-events-none absolute -top-48 right-[22%] z-10 h-[420px] w-[520px] rounded-full bg-[#C9A13B]/20 opacity-70 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-0 z-10 h-[380px] w-[520px] rounded-full bg-[#0E7C86]/25 blur-[120px]" />

      {/* top bar */}
      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-5 sm:px-10">
        <a href="#" className="flex items-center gap-2.5 text-xl font-extrabold text-slate-900 dark:text-white">
          <Logo className="h-9 w-9" /> {copy.brand}
        </a>
        <div className="flex items-center gap-2.5">
          {user ? (
            <span className="flex items-center gap-2 rounded-xl border border-slate-300/70 bg-white/70 px-4 py-2.5 text-sm font-bold backdrop-blur-md dark:border-white/10 dark:bg-white/[.06]">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#22D3EE]/20 text-[#0E7490] dark:text-[#5EEAD4]">
                {user.name[0]}
              </span>
              {user.name} · {user.role}
            </span>
          ) : (
            <button
              onClick={() => setModalOpen(true)}
              className="rounded-xl border border-slate-300/70 bg-white/70 px-5 py-2.5 text-sm font-bold text-slate-700 backdrop-blur-md transition hover:border-[#22D3EE]/60 hover:text-[#0E7490] hover:shadow-[0_0_24px_-6px_#22D3EE] dark:border-white/15 dark:bg-[#0D1117]/60 dark:text-slate-100 dark:hover:text-white"
            >
              {copy.login}
            </button>
          )}
          <ThemeToggle />
        </div>
      </header>

      <div className="relative grid min-h-screen grid-cols-1 lg:grid-cols-[minmax(0,47fr)_minmax(0,53fr)]">
        {/* RIGHT (first in RTL): copy + UI */}
        <div className="relative z-20 order-2 flex items-center px-5 pb-14 pt-4 sm:px-10 lg:order-1 lg:py-24 lg:pl-6 xl:pr-16">
          <div className="w-full max-w-[660px]">
            <span className="hami-badge inline-flex items-center gap-2 rounded-full border border-[#B8860B]/30 bg-[#F5C76B]/[.12] px-4 py-2 text-sm font-medium text-[#8A6100] shadow-[0_0_24px_-8px_#F5C76B] dark:border-[#F5C76B]/30 dark:bg-[#F5C76B]/[.07] dark:text-[#F3E3BC]">
              <span className="hami-twinkle text-[#B8860B] dark:text-[#F5C76B]">✦</span> {copy.badge}
            </span>

            <h1 className="mt-6 text-[1.8rem] font-black leading-[1.55] tracking-tight text-slate-900 sm:text-[2.9rem] sm:leading-[1.45] lg:text-[clamp(2.1rem,3.3vw,3.3rem)] dark:text-white">
              <span className="bg-gradient-to-l from-[#0E7490] to-[#0F766E] bg-clip-text text-transparent dark:from-[#38E8EC] dark:to-[#5EEAD4] [text-shadow:0_0_40px_rgba(56,232,236,.25)]">
                {copy.titleA}
              </span>
              {copy.titleB}
              <br />
              <span className="bg-gradient-to-l from-[#B8860B] to-[#C2410C] bg-clip-text text-transparent dark:from-[#F5C76B] dark:to-[#E0A94A]">
                {copy.titleC}
              </span>
              {copy.titleD}
            </h1>

            <p className="mt-4 max-w-[600px] text-lg leading-8 text-slate-600 dark:text-slate-300/90">{copy.subtitle}</p>

            <form onSubmit={start} className="mt-7">
              <label className="group flex items-center gap-3 rounded-2xl border border-slate-300/70 bg-white/70 px-5 py-4 backdrop-blur-md transition focus-within:border-[#22D3EE]/60 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(34,211,238,.12)] dark:border-white/12 dark:bg-white/[.04] dark:focus-within:bg-white/[.06]">
                <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-slate-400 transition group-focus-within:text-[#0E7490] dark:group-focus-within:text-[#5EEAD4]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" strokeLinecap="round" />
                </svg>
                <span className="sr-only">سؤال شما</span>
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActiveChip(null);
                  }}
                  placeholder={copy.placeholder}
                  className="min-w-0 flex-1 bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400 sm:text-lg dark:text-white dark:placeholder:text-slate-500"
                />
                {query && (
                  <button
                    type="button"
                    aria-label="پاک کردن"
                    onClick={() => {
                      setQuery("");
                      setActiveChip(null);
                    }}
                    className="grid h-7 w-7 place-items-center rounded-full text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    ×
                  </button>
                )}
              </label>

              <div className="mt-4 flex flex-wrap gap-2.5">
                {quickChips.map((c) => (
                  <button
                    type="button"
                    key={c.id}
                    onClick={() => pickChip(c.id)}
                    aria-pressed={activeChip === c.id}
                    className={`rounded-full border px-4 py-2 text-[15px] font-medium transition ${activeChip === c.id
                      ? "border-[#0E7490] bg-[#0E7490]/10 text-[#0E7490] shadow-[0_0_20px_-4px_#22D3EE] dark:border-[#22D3EE] dark:bg-[#22D3EE]/15 dark:text-[#A5F3FC]"
                      : "border-slate-300/70 bg-white/70 text-slate-600 hover:border-slate-400/70 hover:bg-white dark:border-white/12 dark:bg-white/[.05] dark:text-slate-200 dark:hover:border-white/30 dark:hover:bg-white/[.09]"}`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                className="hami-cta group mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-l from-[#0E7490] via-[#0F766E] to-[#14B8A6] py-4 text-xl font-extrabold text-white transition hover:brightness-110 active:scale-[.99] dark:from-[#2EE6EA] dark:via-[#22D3EE] dark:to-[#5EEAD4] dark:text-[#062126]"
              >
                {copy.cta}
                <span className="transition-transform group-hover:-translate-x-1.5">←</span>
              </button>
            </form>

            <p className="mt-5 text-[15px] text-slate-500 dark:text-slate-400">
              🔒 {copy.footA} <span className="mx-1.5 text-slate-400 dark:text-slate-600">|</span> ⚡ {copy.footB}
            </p>
          </div>
        </div>

        {/* LEFT: cinematic illustration */}
        <div className="relative order-1 h-[58vh] min-h-[380px] lg:order-2 lg:-mr-[14%] lg:h-auto">
          <Illustration />
        </div>
      </div>

      <SignupModal
        open={modalOpen}
        question={query.trim()}
        onClose={closeModal}
        onDone={(u) => {
          setUser(u);
          setModalOpen(false);
          setWelcoming(true);
        }}
      />
      {welcoming && user && <WelcomeScreen user={user} onFinish={finishWelcome} />}
    </section>
  );
}
