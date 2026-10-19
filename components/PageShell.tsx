"use client";

import { usePathname } from "next/navigation";

/**
 * Dashboard ("/" لندینگ و "/dashboard" داشبورد) تمام‌صفحه است و خودش عرض را مدیریت می‌کند.
 * سایر مسیرها ظرف خوانایی مرکزی می‌گیرند.
 */
export default function PageShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/" || pathname === "/dashboard") {
    return <div className="w-full">{children}</div>;
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
  );
}
