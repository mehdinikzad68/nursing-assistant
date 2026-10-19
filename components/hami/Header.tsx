"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { CheckCircle2, Eye, EyeOff, Menu, ShieldCheck, SlidersHorizontal, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { ROLE_PROFILES } from "./data";
import { useHami } from "./context";
import { CARD, chipTone, SUB } from "./theme";
import type { RoleKey, RoleProfile } from "./types";

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
 * انتخاب جایگاه شغلی — در دسکتاپ و پنل موبایل دوبار رندر نمی‌شود،
 * بلکه یک نمونه در یک ظرف مشترک قرار می‌گیرد.
 */
function RoleSelector({ id, profile, setRole, onEdit }: {
  id: string;
  profile: RoleProfile;
  setRole: (role: RoleKey) => void;
  onEdit: () => void;
}) {
  return (
    <div className={`${SUB} flex flex-wrap items-center gap-2 px-3 py-2`}>
      <span className="flex items-center gap-1 text-xs font-extrabold text-hami-teal">
        <span>🪪 شرایط شغلی من:</span>
      </span>

      <label className="sr-only" htmlFor={id}>
        انتخاب جایگاه شغلی
      </label>
      <select
        id={id}
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

      <div className="hami-sensitive hidden items-center gap-1.5 text-xs 2xl:flex">
        {profile.badges.map((badge) => (
          <span key={badge} className={`rounded-lg border px-2.5 py-1 font-bold ${chipTone.teal}`}>
            {badge}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={onEdit}
        className="mr-1 text-xs font-extrabold text-hami-teal hover:underline"
      >
        ویرایش
      </button>
    </div>
  );
}

/**
 * نوار بالایی داشبورد: هویت، ناوبری، جایگاه شغلی، کاربر و حالت محرمانه.
 * Trace: UI-2 (TOP CONTEXT HEADER) · T10 نقطه‌کور ۵ (تکثر استخدام)
 *
 * چیدمان واکنش‌گرا: در دسکتاپ ناوبری و انتخاب نقش در همان نوار می‌نشینند؛
 * در موبایل همه در یک پنل جمع‌شونده در دسترس‌اند تا هدر بلند نشود.
 * ناوبری و انتخاب نقش یک‌بار رندر می‌شوند تا در DOM تکرار نشوند.
 */
export default function HamiHeader() {
  const { profile, setRole, stealth, toggleStealth, openModal, user, signOut } = useHami();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const openPrivacyModal = () => {
    const node = document.getElementById("privacy-modal");
    if (node) node.classList.toggle("hidden");
  };

  return (
    <header className={`${CARD} mb-4 px-3 py-3 sm:px-4`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* هویت */}
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="hami-icon flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[16px] bg-gradient-to-br from-hami-teal to-hami-blue text-white">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-base font-black tracking-tight sm:text-lg">حامی‌درمان</h1>
              <span
                className={`hidden items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold md:inline-flex ${chipTone.teal}`}
              >
                <CheckCircle2 className="h-3 w-3" />
                <span>راهنمای اولیه و مستند</span>
              </span>
            </div>
            <p className="hidden truncate text-xs opacity-75 sm:block">
              همراه حقوقی، اداری و شغلی کادر سلامت
            </p>
          </div>
        </div>

        {/* ناوبری + انتخاب نقش — یک نمونه، دو حالت چیدمان */}
        <div
          className={
            menuOpen
              ? "order-last mt-3 flex w-full flex-wrap items-center gap-3 border-t border-hami-border/10 pt-3"
              : "order-last mt-3 hidden w-full flex-wrap items-center gap-3 border-t border-hami-border/10 pt-3 lg:order-none lg:mt-0 lg:flex lg:w-auto lg:border-0 lg:pt-0"
          }
        >
          <nav aria-label="ناوبری اصلی" className="flex flex-wrap items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
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

          <RoleSelector
            id="hami-role"
            profile={profile}
            setRole={setRole}
            onEdit={() => openModal("memory")}
          />
        </div>

        {/* کنترل‌ها */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={toggleStealth}
            title="مخفی‌سازی مبالغ و عنوان‌های حساس وقتی در استیشن یا کنار همکاران هستید"
            aria-pressed={stealth}
            className={`flex items-center gap-1.5 rounded-xl border px-2.5 py-2 text-xs font-extrabold transition-colors ${
              stealth
                ? "border-hami-amber bg-hami-amber text-slate-950"
                : "border-hami-amber/40 bg-hami-amber/15 text-hami-amber hover:bg-hami-amber/25"
            }`}
          >
            {stealth ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span className="hidden xl:inline">حالت محرمانهٔ استیشن: {stealth ? "روشن" : "خاموش"}</span>
          </button>

          <button
            type="button"
            onClick={openPrivacyModal}
            className="flex items-center gap-1.5 rounded-xl border border-hami-blue/40 bg-hami-blue/15 px-2.5 py-2 text-xs font-extrabold text-hami-blue transition-colors hover:bg-hami-blue/25"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">حریم خصوصی</span>
          </button>

          {/* ورود/ثبت‌نام یا کاربر واردشده */}
          {user ? (
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-2 rounded-xl border border-hami-border/20 bg-hami-sub px-2.5 py-1.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-hami-teal to-hami-blue text-[11px] font-black text-white">
                  {user.name.trim().charAt(0) || "؟"}
                </span>
                <span className="text-xs font-extrabold">{user.name}</span>
                <span className="hidden text-[11px] text-hami-muted md:inline">({user.role})</span>
              </div>
              <button
                type="button"
                onClick={signOut}
                title="خروج از حساب"
                className="rounded-xl border border-hami-border/20 px-2.5 py-2 text-xs font-extrabold text-hami-muted transition-colors hover:border-hami-rose/50 hover:text-hami-rose"
              >
                خروج
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => openModal("auth")}
              className="hami-clay-blue rounded-2xl px-3 py-2 text-xs font-extrabold"
            >
              ورود / ثبت‌نام
            </button>
          )}

          <ThemeToggle />

          {/* منوی موبایل */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-hami-border/20 text-hami-text transition-colors hover:border-hami-teal/50 lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}