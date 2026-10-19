"use client";

import HamiDashboard from "@/components/hami/HamiDashboard";

/**
 * داشبورد شخصی «حامی‌درمان».
 * Trace: UI-2 · شخصی‌سازی بر اساس رشته و شغل کاربر
 *
 * بررسی ورود (و هدایت به لندینگ در صورت خروج) داخل خود داشبورد انجام می‌شود
 * تا با کلیک «خروج» بلافاصله به صفحهٔ ورود برگردد.
 */
export default function DashboardPage() {
  return <HamiDashboard />;
}