"use client";

import { Sparkles } from "lucide-react";
import { useHami } from "./context";

/**
 * اعلان کوتاه و غیرمزاحم.
 * Trace: UI-2 (Custom Non-Intrusive Toast) · RULES.md C4 (لحن آرام، بدون ترساندن)
 */
export default function Toast() {
  const { toastMessage } = useHami();
  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="hami-fade-in fixed bottom-5 left-5 z-50 flex max-w-md items-center gap-2.5 rounded-2xl border-2 border-hami-teal bg-hami-card/95 px-4 py-3.5 text-xs font-extrabold text-hami-text shadow-2xl sm:text-sm"
    >
      <Sparkles className="h-5 w-5 flex-shrink-0 text-hami-teal" />
      <span>{toastMessage}</span>
    </div>
  );
}