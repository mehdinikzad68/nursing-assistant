"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createLogger } from "@/lib/logger";
import {
  GREETING,
  createConversation,
  getActiveId,
  getConversation,
  saveMessages,
  setActiveId,
  type ChatMessage,
  type Conversation,
} from "@/lib/chat-store";

const log = createLogger("chat-page");

const suggestions = ["شیفت شب داشتی؟", "اضافه‌کاری", "مرخصی", "انتقال بخش"];

function ChatView() {
  const searchParams = useSearchParams();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const bootstrapped = useRef(false);

  /** Persist current messages and keep local state in sync. */
  const persist = useCallback(
    (convId: string, next: ChatMessage[]) => {
      const updated = saveMessages(convId, next);
      if (updated) setConversation(updated);
    },
    [],
  );

  const send = useCallback(
    async (raw: string, convId: string) => {
      const text = raw.trim();
      if (!text) return;

      setLoading(true);
      log.info("User message sent", { messageLength: text.length, convId });

      setMessages((prev) => [...prev, { role: "user", content: text, ts: Date.now() }]);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
        });
        const data = await res.json();
        const reply: ChatMessage =
          res.ok
            ? { role: "assistant", content: data.content, ts: Date.now() }
            : {
                role: "assistant",
                content: `خطا: ${data.error || "خطای ناشناخته"}`,
                ts: Date.now(),
              };
        if (res.ok) {
          log.info("Assistant response received", { contentLength: data.content?.length });
        } else {
          log.error("Chat request failed", { status: res.status, error: data.error });
        }

        setMessages((prev) => {
          const next = [...prev, reply];
          persist(convId, next);
          return next;
        });
      } catch (error) {
        log.error("Chat network error", {
          error: error instanceof Error ? error.message : String(error),
        });
        setMessages((prev) => {
          const next = [
            ...prev,
            { role: "assistant" as const, content: "خطا در ارتباط با سرور", ts: Date.now() },
          ];
          persist(convId, next);
          return next;
        });
      } finally {
        setLoading(false);
      }
    },
    [persist],
  );

  /** On mount: resume the active conversation, or start a new one. */
  useEffect(() => {
    if (bootstrapped.current) return;
    bootstrapped.current = true;

    const q = searchParams.get("q");

    if (q) {
      const conv = createConversation();
      setActiveId(conv.id);
      setConversation(conv);
      setMessages([]);
      setReady(true);
      void send(q, conv.id);
      return;
    }

    const activeId = getActiveId();
    const existing = activeId ? getConversation(activeId) : null;
    if (existing) {
      log.info("Conversation restored", { id: existing.id, count: existing.messages.length });
      setConversation(existing);
      setMessages(existing.messages);
    } else {
      const conv = createConversation();
      setActiveId(conv.id);
      setConversation(conv);
      setMessages([]);
    }
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const startNew = () => {
    const conv = createConversation();
    setActiveId(conv.id);
    setConversation(conv);
    setMessages([]);
    setInput("");
    log.info("New conversation started", { id: conv.id });
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <section className="flex h-[calc(100vh-9rem)] flex-col rounded-2xl border border-app-border bg-app-card">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-app-border px-5 py-3.5">
        <div className="min-w-0">
          <h1 className="truncate text-sm font-bold text-ink">
            {conversation ? conversation.title : "گفتگوی تخصصی"}
          </h1>
          <p className="mt-0.5 text-[11px] text-ink-subtle">
            پاسخ اولیه • نیازمند تکمیل اطلاعات • ذخیره‌شده در همین مرورگر
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            className="rounded-xl border border-app-border bg-app-surface px-3 py-1.5 text-xs text-ink-muted transition hover:bg-app-elevated hover:text-ink"
            onClick={startNew}
            type="button"
          >
            گفتگوی جدید
          </button>
          <Link
            href="/archive"
            className="rounded-xl border border-chip-teal-border bg-chip-teal-bg px-3 py-1.5 text-xs font-medium text-chip-teal-fg transition hover:opacity-90"
          >
            آرشیو گفتگوها
          </Link>
        </div>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 sm:px-5">
        {ready && messages.length === 0 && (
          <div className="flex justify-end">
            <div className="max-w-[85%] rounded-2xl border border-chip-teal-border bg-chip-teal-bg px-4 py-2.5 text-sm leading-relaxed text-ink sm:max-w-[75%]">
              <span className="mb-1 block text-[10px] font-semibold text-brand">دستیار</span>
              <p className="whitespace-pre-line">{GREETING}</p>
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}>
            <div
              className={`max-w-[85%] rounded-2xl border px-4 py-2.5 text-sm leading-relaxed sm:max-w-[75%] ${
                msg.role === "user"
                  ? "border-app-border bg-app-surface text-ink"
                  : "border-chip-teal-border bg-chip-teal-bg text-ink"
              }`}
            >
              {msg.role === "assistant" && (
                <span className="mb-1 block text-[10px] font-semibold text-brand">دستیار</span>
              )}
              <p className="whitespace-pre-line">{msg.content}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-end">
            <div className="rounded-2xl border border-app-border bg-app-surface px-4 py-2.5 text-sm text-ink-muted">
              در حال پاسخ‌دهی...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-app-border px-4 py-3 sm:px-5">
        <div className="mb-2.5 flex flex-wrap gap-1.5">
          {suggestions.map((s) => (
            <button
              key={s}
              className="rounded-xl border border-app-border bg-app-surface px-2.5 py-1 text-[11px] text-ink-muted transition hover:bg-app-elevated hover:text-ink"
              onClick={() => setInput(s)}
              type="button"
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex items-end gap-2">
          <textarea
            rows={1}
            placeholder="سؤالت را بنویس..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (conversation) {
                  const text = input;
                  setInput("");
                  void send(text, conversation.id);
                }
              }
            }}
            className="max-h-32 min-h-[44px] flex-1 resize-none rounded-xl border border-app-border bg-app-surface px-3 py-2.5 text-sm text-ink placeholder:text-ink-subtle focus:border-brand focus:ring-0"
          />
          <button
            className="h-[44px] shrink-0 rounded-xl bg-brand px-5 text-sm font-semibold text-app-on-primary transition hover:bg-brand-strong disabled:opacity-50"
            onClick={() => {
              if (!conversation) return;
              const text = input;
              setInput("");
              void send(text, conversation.id);
            }}
            disabled={loading || !input.trim()}
            type="button"
          >
            ارسال
          </button>
        </div>
        <p className="mt-2 text-[11px] text-ink-subtle">
          این سامانه راهنمایی اولیه و مستند ارائه می‌دهد و جای بررسی انسانی یا مشاوره رسمی را نمی‌گیرد.
        </p>
      </div>
    </section>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-ink-muted">در حال بارگذاری...</div>}>
      <ChatView />
    </Suspense>
  );
}
