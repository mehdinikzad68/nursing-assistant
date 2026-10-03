"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { label: "خانه", href: "/" },
  { label: "گفتگوی تخصصی", href: "/chat" },
  { label: "آرشیو گفتگوها", href: "/archive" },
  { label: "پیگیری‌های من", href: "/case" },
  { label: "منابع مقررات", href: "/guide" },
  { label: "راهنما و پشتیبانی", href: "/expert" },
];

export default function DashboardHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const openPrivacyModal = () => {
    const modal = document.getElementById("privacy-modal");
    if (modal) modal.classList.toggle("hidden");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-app-border bg-app-surface/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-20 w-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        {/* Right: Brand */}
        <Link href="/" className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-chip-teal-border bg-chip-teal-bg text-brand">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight text-ink">دستیار حقوقی و اداری پرستاران</h1>
              <span className="hidden rounded-full border border-chip-teal-border bg-chip-teal-bg px-2.5 py-0.5 text-[11px] font-medium text-chip-teal-fg sm:inline-block">
                راهنمایی هوشمند و اولیه
              </span>
            </div>
            <p className="mt-0.5 hidden text-xs font-normal text-ink-subtle md:block">
              پشتیبانی مستند و اداری برای کادر شریف پرستاری کشور
            </p>
          </div>
        </Link>

        {/* Center: Desktop Nav */}
        <nav aria-label="ناوبری اصلی" className="hidden items-center rounded-xl border border-app-border bg-app-card p-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg border px-3.5 py-1.5 text-xs transition-colors ${
                  isActive
                    ? "border-chip-teal-border bg-chip-teal-bg font-semibold text-chip-teal-fg"
                    : "border-transparent text-ink-muted hover:bg-app-elevated hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Left: Utilities */}
        <div className="flex items-center gap-2.5">
          <button
            className="hidden items-center gap-1.5 rounded-xl border border-app-border bg-app-card px-3 py-1.5 text-xs text-ink-muted transition-colors hover:bg-app-elevated hover:text-brand xl:inline-flex"
            onClick={openPrivacyModal}
            type="button"
          >
            <svg className="h-4 w-4 text-brand" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>حریم خصوصی و داده‌ها</span>
          </button>

          <Link
            href="/case"
            aria-label="اعلان‌ها و پیگیری‌ها"
            className="relative hidden h-9 w-9 items-center justify-center rounded-xl border border-app-border bg-app-card text-ink-subtle transition hover:bg-app-elevated hover:text-ink sm:flex"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand" />
          </Link>

          <ThemeToggle />

          {/* Profile */}
          <Link
            href="/profile"
            className="hidden items-center gap-2 rounded-xl border border-app-border bg-app-card p-1 pr-2 text-ink transition hover:bg-app-elevated sm:flex"
          >
            <span className="text-xs font-semibold text-ink-muted">سارا رحیمی</span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-chip-teal-border bg-chip-teal-bg text-[10px] font-bold text-chip-teal-fg">
              پرستار
            </div>
          </Link>

          {/* Mobile hamburger */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-app-border bg-app-card text-ink-muted transition hover:bg-app-elevated hover:text-ink lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="منو"
            aria-expanded={mobileMenuOpen}
            type="button"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileMenuOpen && (
        <div className="border-t border-app-border bg-app-surface px-4 py-3 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-chip-teal-bg font-semibold text-chip-teal-fg"
                      : "text-ink-muted hover:bg-app-elevated hover:text-ink"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <button
              className="rounded-lg px-3 py-2 text-right text-sm text-ink-muted transition-colors hover:bg-app-elevated hover:text-brand"
              onClick={() => {
                setMobileMenuOpen(false);
                openPrivacyModal();
              }}
              type="button"
            >
              حریم خصوصی و داده‌ها
            </button>
            <Link
              href="/profile"
              className="rounded-lg px-3 py-2 text-sm text-ink-muted transition-colors hover:bg-app-elevated hover:text-ink"
              onClick={() => setMobileMenuOpen(false)}
            >
              پروفایل من (سارا رحیمی)
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
