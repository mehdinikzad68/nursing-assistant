"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { HamiUser, Role, roles, toEn, toFa } from "./data";
import { Logo } from "./Logo";

type Step = "mobile" | "otp" | "profile";
type Props = { open: boolean; question: string; onClose: () => void; onDone: (u: HamiUser) => void };

const steps: Step[] = ["mobile", "otp", "profile"];

/**
 * پنجرهٔ ورود/عضویت سه‌مرحله‌ای.
 * Trace: Nursing Assistant-2/UI/hami-darman-hero-opus (SignupModal.tsx)
 *
 * توجه: نسخهٔ نمایشی است — پیامک واقعی ارسال نمی‌شود و هر کد ۵ رقمی پذیرفته می‌شود.
 */
export function SignupModal({ open, question, onClose, onDone }: Props) {
  const [step, setStep] = useState<Step>("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<Role>("پرستار");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);
  const firstField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setStep("mobile");
    setOtp("");
    setError("");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) setTimeout(() => firstField.current?.focus(), 60);
  }, [open, step]);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  if (!open) return null;
  const idx = steps.indexOf(step);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (step === "mobile") {
      const m = toEn(mobile).replace(/\s/g, "");
      if (!/^09\d{9}$/.test(m)) return setError("شماره باید ۱۱ رقم باشد و با ۰۹ شروع شود.");
      setMobile(m);
      setStep("otp");
      setTimer(60);
    } else if (step === "otp") {
      if (toEn(otp).length !== 5) return setError("کد ۵ رقمی را کامل وارد کن.");
      setStep("profile");
    } else {
      if (name.trim().length < 2) return setError("نامت را بنویس تا حامی صدایت کند.");
      onDone({ name: name.trim(), mobile, role });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="hami-modal-title"
    >
      <button
        aria-label="بستن"
        onClick={onClose}
        className="hami-fade absolute inset-0 bg-[#05080D]/75 backdrop-blur-md"
      />
      <form
        onSubmit={submit}
        className="hami-pop relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white/95 p-7 shadow-[0_30px_120px_-20px_rgba(34,211,238,.25)] backdrop-blur-xl dark:border-white/10 dark:bg-[#111824]/90 dark:shadow-[0_30px_120px_-20px_rgba(34,211,238,.35)]"
      >
        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-[#22D3EE]/20 blur-3xl" />
        <button
          type="button"
          onClick={onClose}
          aria-label="بستن"
          className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-full text-xl text-slate-400 transition hover:bg-slate-200/70 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white"
        >
          ×
        </button>

        <div className="relative flex items-center gap-3">
          <Logo className="h-10 w-10" />
          <div>
            <h2 id="hami-modal-title" className="text-xl font-extrabold text-slate-900 dark:text-white">
              {step === "mobile" ? "عضویت سریع در حامی درمان" : step === "otp" ? "کد تأیید" : "یک قدم تا شروع"}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">مرحلهٔ {toFa(String(idx + 1))} از ۳</p>
          </div>
        </div>

        <div className="relative mt-5 flex gap-1.5">
          {steps.map((s, i) => (
            <span
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                i <= idx
                  ? "bg-gradient-to-l from-[#22D3EE] to-[#5EEAD4] shadow-[0_0_12px_#22D3EE]"
                  : "bg-white/10"
              }`}
            />
          ))}
        </div>

        {question && step === "mobile" && (
          <p className="relative mt-5 rounded-2xl border border-[#B8860B]/25 bg-[#F5C76B]/[.10] px-4 py-3 text-sm leading-7 text-[#8A6100] dark:border-[#F5C76B]/25 dark:bg-[#F5C76B]/[.07] dark:text-[#F7D894]">
            سؤالت آماده است: «{question}»
          </p>
        )}

        <div key={step} className="hami-step relative mt-5 space-y-4">
          {step === "mobile" && (
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">شماره موبایل</span>
              <input
                ref={firstField}
                inputMode="numeric"
                dir="ltr"
                placeholder="۰۹۱۲ ۳۴۵ ۶۷۸۹"
                value={toFa(mobile)}
                onChange={(e) => setMobile(toEn(e.target.value).replace(/[^\d]/g, "").slice(0, 11))}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-center text-lg tracking-[.2em] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0E7490] focus:shadow-[0_0_0_4px_rgba(34,211,238,.15)] dark:border-white/10 dark:bg-black/30 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-[#22D3EE]/70"
              />
            </label>
          )}
          {step === "otp" && (
            <>
              <p className="text-base leading-7 text-slate-600 dark:text-slate-300">
                کد ۵ رقمی ارسال‌شده به <span dir="ltr" className="font-bold text-slate-900 dark:text-white">{toFa(mobile)}</span> را وارد کن.
              </p>
              <input
                ref={firstField}
                inputMode="numeric"
                dir="ltr"
                autoComplete="one-time-code"
                placeholder="– – – – –"
                value={toFa(otp)}
                onChange={(e) => setOtp(toEn(e.target.value).replace(/[^\d]/g, "").slice(0, 5))}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-center text-2xl tracking-[.6em] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0E7490] focus:shadow-[0_0_0_4px_rgba(34,211,238,.15)] dark:border-white/10 dark:bg-black/30 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-[#22D3EE]/70"
              />
              <div className="flex items-center justify-between text-sm">
                <button type="button" onClick={() => setStep("mobile")} className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white">
                  ویرایش شماره
                </button>
                <button
                  type="button"
                  disabled={timer > 0}
                  onClick={() => setTimer(60)}
                  className="font-bold text-[#5EEAD4] disabled:font-normal disabled:text-slate-500"
                >
                  {timer > 0 ? `ارسال دوباره تا ${toFa(String(timer))} ثانیه` : "ارسال دوبارهٔ کد"}
                </button>
              </div>
            </>
          )}
          {step === "profile" && (
            <>
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">نام شما</span>
                <input
                  ref={firstField}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثلاً: مریم احمدی"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0E7490] focus:shadow-[0_0_0_4px_rgba(34,211,238,.15)] dark:border-white/10 dark:bg-black/30 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-[#22D3EE]/70"
                />
              </label>
              <div>
                <span className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">نقش شما در درمان</span>
                <div className="flex flex-wrap gap-2">
                  {roles.map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => setRole(r)}
                      aria-pressed={role === r}
                      className={`rounded-full border px-3.5 py-2 text-sm transition ${
                        role === r
                          ? "border-[#0E7490] bg-[#0E7490]/10 text-[#0E7490] shadow-[0_0_16px_-4px_#22D3EE] dark:border-[#22D3EE] dark:bg-[#22D3EE]/15 dark:text-[#A5F3FC]"
                          : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-400 dark:border-white/10 dark:bg-white/[.03] dark:text-slate-300 dark:hover:border-white/25"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
          {error && <p role="alert" className="text-sm text-rose-300">{error}</p>}
        </div>

        <button
          type="submit"
          className="hami-cta relative mt-6 w-full rounded-2xl bg-gradient-to-l from-[#0E7490] to-[#14B8A6] py-3.5 text-lg font-extrabold text-white transition hover:brightness-110 active:scale-[.99] dark:from-[#22D3EE] dark:to-[#5EEAD4] dark:text-[#062126]"
        >
          {step === "mobile" ? "دریافت کد تأیید" : step === "otp" ? "تأیید کد" : "ورود به حامی درمان"}
        </button>
        <p className="relative mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
          نسخهٔ نمایشی: هیچ اطلاعاتی ارسال یا ذخیره نمی‌شود؛ هر کد ۵ رقمی پذیرفته است.
        </p>
      </form>
    </div>
  );
}