"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckCircle2, Eye, EyeOff, ShieldCheck, SlidersHorizontal } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { ROLE_PROFILES } from "./data";
import { useHami } from "./context";
import { CARD, chipTone, SUB } from "./theme";
import type { RoleKey } from "./types";

/** مسیرهای واقعی اپ — ناوبری داشبورد نسخهٔ دوم */
const navLinks = [
  { label: "گفتگوی تخصصی", href: "/chat" },
  { label: "آرشیو گفتگوها", href: "/archive" },
  { label: "پیگیری‌های من", href: "/case" },
  { label: "منابع مقررات", href: "/guide" },
  { label: "راهنما و پشتیبانی", href: "/expert" },
  { label: "پروفایل", href: "/profile" }
];

/**
 * نوار بالایی داشبورد: هویت، ناوبری، جایگاه شغلی، حالت محرمانه و تم.
 * Trace: UI-2 (TOP CONTEXT HEADER) · T10 نقطه‌کور ۵ (تکثر استخدام)
 */
export default function HamiHeader() {
  const { profile, setRole, stealth, toggleStealth, openModal } = useHami();
  const pathname = usePathname();

  const openPrivacyModal = () => {
    const node = document.getElementById("privacy-modal");
    if (node) node.classList.toggle("hidden");
  };

  return (
    <header className={`${CARD} mb-4 flex flex-wrap items-center justify-between gap-3 px-4 py-3.5`}>
      {/* هویت */}
      <div className="flex items-center gap-3">
        <div className="hami-icon flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[18px] bg-gradient-to-br from-hami-teal to-hami-blue text-white">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-base font-black tracking-tight sm:text-lg">حامی‌درمان</h1>
            <span
              className={`flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${chipTone.teal}`}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>راهنمای اولیه و مستند؛ تصمیم نهایی با شماست</span>
            </span>
          </div>
          <p className="mt-0.5 text-xs opacity-75 sm:text-sm">
            همراه حقوقی، اداری و شغلی کادر سلامت — بدون وعدهٔ نتیجه
          </p>
        </div>
      </div>

      {/* ناوبری به صفحات تخصصی اپ */}
      <nav
        aria-label="ناوبری اصلی"
        className="order-last flex w-full items-center gap-1 overflow-x-auto border-t border-hami-border/10 pt-2 lg:order-none lg:w-auto lg:border-0 lg:pt-0"
      >
        {navLinks.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`shrink-0 rounded-xl border px-3 py-1.5 text-xs font-bold transition-colors ${
                active
                  ? "border-hami-teal/40 bg-hami-teal/15 text-hami-teal"
                  : "border-transparent text-hami-muted hover:bg-hami-teal/10 hover:text-hami-text"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* جایگاه شغلی */}
      <div className={`${SUB} flex flex-wrap items-center gap-2 px-3.5 py-2`}>
        <span className="flex items-center gap-1 text-xs font-extrabold text-hami-teal">
          <span>🪪 شرایط شغلی من:</span>
        </span>

        <label className="sr-only" htmlFor="hami-role">
          انتخاب جایگاه شغلی
        </label>
        <select
          id="hami-role"
          value={profile.key}
          onChange={(event) => setRole(event.target.value as RoleKey)}
          className="hami-sub cursor-pointer rounded-xl border border-hami-teal/40 px-3 py-1.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-hami-teal sm:text-sm"
        >
          {Object.values(ROLE_PROFILES).map((role) => (
            <option key={role.key} value={role.key}>
              {role.label}
            </option>
          ))}
        </select>

        <div className="hami-sensitive hidden items-center gap-1.5 text-xs xl:flex">
          {profile.badges.map((badge) => (
            <span key={badge} className={`rounded-lg border px-2.5 py-1 font-bold ${chipTone.teal}`}>
              {badge}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => openModal("memory")}
          className="mr-1 text-xs font-extrabold text-hami-teal hover:underline"
        >
          ویرایش
        </button>
      </div>

      {/* کنترل‌ها */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={toggleStealth}
          title="مخفی‌سازی مبالغ و عنوان‌های حساس وقتی در استیشن یا کنار همکاران هستید"
          className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-extrabold transition-colors ${
            stealth
              ? "border-hami-amber bg-hami-amber text-slate-950"
              : "border-hami-amber/40 bg-hami-amber/15 text-hami-amber hover:bg-hami-amber/25"
          }`}
        >
          {stealth ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          <span>حالت محرمانهٔ استیشن: {stealth ? "روشن" : "خاموش"}</span>
        </button>

        <button
          type="button"
          onClick={openPrivacyModal}
          className="flex items-center gap-1.5 rounded-xl border border-hami-blue/40 bg-hami-blue/15 px-3 py-2 text-xs font-extrabold text-hami-blue transition-colors hover:bg-hami-blue/25"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">حریم خصوصی</span>
        </button>

        <button
          type="button"
          onClick={() => openModal("auth")}
          className="hami-clay-blue rounded-2xl px-3.5 py-2 text-xs font-extrabold"
        >
          ورود / ثبت‌نام
        </button>

        <ThemeToggle />
      </div>
    </header>
  );
}