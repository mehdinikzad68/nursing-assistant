import { type CSSProperties, type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Card({ children, className = "", style }: CardProps) {
  return (
    <div
      style={style}
      className={`rounded-2xl border border-app-border bg-app-card p-5 ${className}`}
    >
      {children}
    </div>
  );
}
