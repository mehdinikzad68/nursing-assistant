"use client";

import { usePathname } from "next/navigation";

/**
 * Dashboard ("/") is full-bleed and manages its own width.
 * Every other route gets a readable centered container.
 */
export default function PageShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return <div className="w-full">{children}</div>;
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
  );
}
