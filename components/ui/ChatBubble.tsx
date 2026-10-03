import { type ReactNode } from "react";

interface ChatBubbleProps {
  role: "user" | "assistant";
  children: ReactNode;
}

export function ChatBubble({ role, children }: ChatBubbleProps) {
  const isUser = role === "user";
  return (
    <div className={`chat-bubble flex ${isUser ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[85%] rounded-2xl border px-4 py-2.5 text-sm leading-relaxed sm:max-w-[75%] ${
          isUser
            ? "border-app-border bg-app-surface text-ink"
            : "border-chip-teal-border bg-chip-teal-bg text-ink"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
