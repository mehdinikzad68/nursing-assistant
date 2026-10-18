"use client";

import { usePathname } from "next/navigation";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PageShell from "@/components/PageShell";

/**
 * پوستهٔ اپ.
 * Trace: T06 (یکپارچگی رابط) · UI-2
 *
 * روی مسیر «/» (داشبورد حامی‌درمان) هدر ناوبری قدیمی نمایش داده نمی‌شود،
 * چون خود داشبورد هدر زمینه‌ای با ناوبری کامل دارد تا دو نوار روی هم انباشته نشوند.
 */
export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname === "/";

  return (
    <>
      {!isDashboard && <DashboardHeader />}
      <PageShell>{children}</PageShell>
    </>
  );
}