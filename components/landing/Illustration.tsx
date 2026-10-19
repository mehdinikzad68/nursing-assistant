"use client";

import { useMemo } from "react";

/**
 * تصویر سینمایی «پزشکی-کیهانی»: تصویر مرجع + لایه‌های زنده
 * (ذرات شناور، پرتو نور، شیشه‌های شناور).
 * Trace: Nursing Assistant-2/UI/hami-darman-hero-opus (Illustration.tsx)
 */
export function Illustration() {
  const sparks = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => ({
        left: 8 + ((i * 37) % 78),
        top: 6 + ((i * 53) % 70),
        size: 2 + (i % 3),
        delay: (i * 0.37) % 6,
        dur: 4 + (i % 5),
        gold: i % 3 === 0,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <img
        src="/images/scene.jpg"
        alt=""
        className="hami-kenburns absolute inset-0 h-full w-full object-cover object-[30%_50%]"
        draggable={false}
      />
      {/* پرتو نور روی موبایل → جریان کیهان */}
      <div className="hami-beam absolute left-[18%] top-[30%] h-[44%] w-[34%] rounded-full bg-[radial-gradient(closest-side,rgba(56,232,236,.28),transparent)] mix-blend-screen blur-2xl" />
      <div className="hami-beam absolute left-[30%] top-[18%] h-[30%] w-[30%] rounded-full bg-[radial-gradient(closest-side,rgba(245,199,107,.18),transparent)] mix-blend-screen blur-2xl [animation-delay:2s]" />
      {sparks.map((s, i) => (
        <span
          key={i}
          className={`hami-spark absolute rounded-full ${s.gold ? "bg-[#F5C76B]" : "bg-[#7CF6F2]"}`}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
            boxShadow: `0 0 ${s.size * 4}px ${s.gold ? "#F5C76B" : "#38E8EC"}`,
          }}
        />
      ))}
      {/* محوشدگی در جهت پنل متن (پنل در RTL سمت راست است) */}
      <div className="absolute inset-y-0 right-0 hidden w-[42%] bg-gradient-to-l from-[#F4F7FB] from-[22%] via-[#F4F7FB]/75 to-transparent lg:block dark:from-[#0D1117] dark:via-[#0D1117]/75" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#F4F7FB] to-transparent lg:hidden dark:from-[#0D1117]" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#F4F7FB]/70 to-transparent dark:from-[#0D1117]/70" />
    </div>
  );
}