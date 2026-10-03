"use client";

import { useEffect } from "react";
import Link from "next/link";
import { createLogger } from "@/lib/logger";

const log = createLogger("error-boundary");

/**
 * مرز خطای سراسری — هر خطای رندر را ثبت و پیام آرام نمایش می‌دهد.
 * Trace: RULES.md E6 (حالت خطا) · C4 (لحن غیرترساننده)
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    log.error("render error", {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });
  }, [error]);

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 p-6 text-center dark:border-slate-800">
      <h1 className="text-xl font-extrabold">مشکلی پیش آمد</h1>
      <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
        در نمایش این صفحه خطایی رخ داد. می‌توانید دوباره تلاش کنید یا به صفحهٔ
        اصلی برگردید. (نسخهٔ نمایشی — دادهٔ نمونه)
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={reset}
          className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-bold text-white"
        >
          تلاش دوباره
        </button>
        <Link
          href="/"
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold dark:border-slate-700"
        >
          ← بازگشت به صفحهٔ اصلی
        </Link>
      </div>
    </section>
  );
}
