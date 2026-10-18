"use client";

import { useRef, useState } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  calmMotion: boolean;
}

/**
 * کارت بنتو با افکت سه‌بعدی اختیاری و نورافکن ملایم.
 * Trace: UI-2 (TiltBentoCard) · T07 (کاهش خستگی بصری در شیفت شب)
 *
 * نکته: انیمیشن فقط وقتی اجرا می‌شود که کاربر «حالت آرام» را خاموش کرده باشد
 * تا حالت پیش‌فرض شیفت شب کم‌تحرک بماند.
 */
export default function TiltCard({ children, className = "", calmMotion }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");
  const [glowPos, setGlowPos] = useState<{ x: number; y: number; active: boolean }>({
    x: 50,
    y: 50,
    active: false
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const node = cardRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, active: true });

    if (calmMotion) return;
    const rotateY = (x / rect.width - 0.5) * 5;
    const rotateX = (0.5 - y / rect.height) * 5;
    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.005, 1.005, 1.005)`
    );
  };

  const handleMouseLeave = () => {
    setGlowPos((prev) => ({ ...prev, active: false }));
    setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle, transition: "transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)" }}
      className={`hami-glass relative overflow-hidden ${className}`}
    >
      {glowPos.active && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(380px circle at ${glowPos.x}% ${glowPos.y}%, rgb(var(--hami-teal) / 0.12), transparent 70%)`
          }}
        />
      )}
      <div className="relative z-10 flex h-full flex-col justify-between">{children}</div>
    </div>
  );
}