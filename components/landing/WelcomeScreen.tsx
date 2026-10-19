"use client";

import { useEffect } from "react";
import { HamiUser, copy } from "./data";
import { Logo } from "./Logo";

/**
 * صفحهٔ خوش‌آمد تمام‌صفحه که پس از ۳ ثانیه خودش بسته می‌شود.
 * Trace: Nursing Assistant-2/UI/hami-darman-hero-opus (WelcomeScreen.tsx)
 */
export function WelcomeScreen({ user, onFinish }: { user: HamiUser; onFinish: () => void }) {
  useEffect(() => {
    const t = setTimeout(onFinish, 3000);
    return () => clearTimeout(t);
  }, [onFinish]);

  return (
    <div
      className="hami-fade fixed inset-0 z-[60] grid place-items-center overflow-hidden bg-[#F4F7FB] transition-colors duration-300 dark:bg-[#0D1117]"
      role="status"
      aria-live="polite"
    >
      <div className="absolute h-[60vmin] w-[60vmin] rounded-full bg-[radial-gradient(closest-side,rgba(34,211,238,.25),transparent)] blur-2xl" />
      <div className="hami-ring absolute h-[44vmin] w-[44vmin] rounded-full border border-[#0E7490]/30 dark:border-[#22D3EE]/30" />
      <div className="hami-ring absolute h-[44vmin] w-[44vmin] rounded-full border border-[#B8860B]/25 dark:border-[#F5C76B]/25 [animation-delay:1s]" />
      <div className="hami-pop relative flex flex-col items-center px-6 text-center">
        <Logo className="hami-heartbeat h-20 w-20" />
        <h2 className="mt-6 text-4xl font-black text-slate-900 sm:text-5xl dark:text-white">
          خوش آمدی، <span className="text-[#0F766E] dark:text-[#5EEAD4]">{user.name}</span>
        </h2>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">{copy.welcome}</p>
        <svg viewBox="0 0 300 40" className="mt-8 h-10 w-72" aria-hidden="true">
          <path
            className="hami-pulse-line"
            d="M0 20h90l12-14 16 30 14-24 10 8h158"
            fill="none"
            stroke="url(#wl)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="wl">
              <stop offset="0" stopColor="#F5C76B" />
              <stop offset="1" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
        </svg>
        <div className="mt-6 h-1 w-56 overflow-hidden rounded-full bg-white/10">
          <div className="hami-progress h-full rounded-full bg-gradient-to-l from-[#22D3EE] to-[#F5C76B]" />
        </div>
      </div>
    </div>
  );
}