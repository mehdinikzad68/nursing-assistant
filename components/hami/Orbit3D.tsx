"use client";

interface Orbit3DProps {
  calmMotion: boolean;
  onToggleMotion: () => void;
  avatarEmoji: string;
}

/**
 * منظومهٔ سه‌بعدی سلامت — نماد بصری «همراهِ همیشه حاضر».
 * Trace: UI-2 (HealthcareOrbit3D) · T07 (حالت آرام برای شیفت شب)
 */
export default function Orbit3D({ calmMotion, onToggleMotion, avatarEmoji }: Orbit3DProps) {
  return (
    <button
      type="button"
      onClick={onToggleMotion}
      title="کلیک برای چرخش یا توقف منظومهٔ سه‌بعدی (پیشگیری از خستگی چشم در شیفت شب)"
      className="group relative flex h-36 w-40 flex-shrink-0 select-none items-center justify-center"
      aria-label="تغییر حالت انیمیشن سه‌بعدی"
    >
      {/* حلقهٔ بیرونی */}
      <span
        className={`absolute h-32 w-32 rounded-full border border-dashed transition-all duration-700 ${
          calmMotion ? "border-hami-teal/35" : "animate-spin border-hami-teal/70"
        }`}
        style={{ animationDuration: "28s" }}
      />

      {/* حلقهٔ داخلی مایل */}
      <span className="absolute h-24 w-24 scale-y-75 rotate-45 rounded-full border border-hami-blue/25" />

      {/* هسته: پرسش + کرهٔ شیشه‌ای + تیم درمان */}
      <span className="relative z-10 flex flex-col items-center">
        <span
          className={`-mb-1.5 flex h-7 w-7 items-center justify-center rounded-full border border-white/60 bg-gradient-to-tr from-hami-amber to-hami-amber/70 text-xs font-black text-slate-950 ${
            calmMotion ? "group-hover:scale-110" : "animate-bounce"
          }`}
        >
          ؟
        </span>

        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-gradient-to-br from-hami-teal via-hami-blue to-hami-blue/70">
          <svg className="h-8 w-8 text-white/90 drop-shadow" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </span>

        <span className="-mt-2.5 z-20 flex items-center -space-x-2 space-x-reverse">
          <span className="hami-icon flex h-7 w-7 items-center justify-center rounded-full border-2 border-hami-card bg-gradient-to-b from-hami-teal to-hami-teal/70 text-xs">
            {avatarEmoji}
          </span>
          <span className="hami-icon flex h-8 w-8 scale-110 items-center justify-center rounded-full border-2 border-hami-card bg-gradient-to-b from-hami-blue to-hami-blue/70 text-sm">
            🤖
          </span>
          <span className="hami-icon flex h-7 w-7 items-center justify-center rounded-full border-2 border-hami-card bg-gradient-to-b from-hami-purple to-hami-purple/70 text-xs">
            👨‍⚕️
          </span>
        </span>
      </span>

      {/* کره‌های مداری: قوانین، بازآموزی، سلامت جهانی */}
      <span
        className={`absolute inset-0 transition-transform duration-1000 ${calmMotion ? "" : "animate-spin"}`}
        style={{ animationDuration: "22s" }}
      >
        <span
          title="مدار قوانین و بخشنامه‌ها"
          className="hami-icon absolute -top-1 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full border border-white/60 bg-gradient-to-br from-hami-amber to-hami-amber/70 text-xs"
        >
          ⚖️
        </span>
        <span
          title="مدار بازآموزی و ارتقای شغلی"
          className="hami-icon absolute bottom-2 right-1 flex h-7 w-7 items-center justify-center rounded-full border border-white/60 bg-gradient-to-br from-hami-teal to-hami-teal/70 text-xs"
        >
          🎓
        </span>
        <span
          title="مدار سلامت و گردشگری پزشکی"
          className="hami-icon absolute bottom-2 left-1 flex h-7 w-7 items-center justify-center rounded-full border border-white/60 bg-gradient-to-br from-hami-purple to-hami-purple/70 text-xs"
        >
          🌍
        </span>
      </span>
    </button>
  );
}