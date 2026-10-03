"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createLogger } from "@/lib/logger";
import {
  clearConversations,
  deleteConversation,
  listConversations,
  setActiveId,
  type Conversation,
} from "@/lib/chat-store";

const log = createLogger("archive-page");

function formatDate(ts: number): string {
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(ts));
  } catch {
    return new Date(ts).toLocaleString();
  }
}

export default function ArchivePage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const refresh = () => setConversations(listConversations());

  useEffect(() => {
    refresh();
    setLoaded(true);
    log.info("Archive opened");
  }, []);

  const openConversation = (id: string) => {
    setActiveId(id);
    log.info("Conversation opened from archive", { id });
    router.push("/chat");
  };

  const remove = (id: string) => {
    if (!window.confirm("این گفتگو برای همیشه حذف شود؟")) return;
    deleteConversation(id);
    refresh();
  };

  const clearAll = () => {
    if (!window.confirm("همهٔ گفتگوهای ذخیره‌شده حذف شوند؟ این کار بازگشت‌پذیر نیست.")) return;
    clearConversations();
    refresh();
  };

  const filtered = conversations.filter((c) =>
    query.trim() ? c.title.includes(query.trim()) : true,
  );

  const totalMessages = conversations.reduce((n, c) => n + c.messages.length, 0);

  return (
    <section className="space-y-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold text-ink">آرشیو گفتگوها</h1>
          <p className="mt-0.5 text-xs text-ink-subtle">
            {loaded ? `${conversations.length} گفتگو • ${totalMessages} پیام` : "در حال بارگذاری..."}
            {" • "}
            ذخیره‌شده در همین مرورگر
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/chat"
            className="rounded-xl bg-brand px-4 py-2 text-xs font-bold text-app-on-primary transition hover:bg-brand-strong"
          >
            گفتگوی جدید
          </Link>
          {conversations.length > 0 && (
            <button
              className="rounded-xl border border-chip-rose-border bg-chip-rose-bg px-4 py-2 text-xs font-medium text-chip-rose-fg transition hover:opacity-90"
              onClick={clearAll}
              type="button"
            >
              پاک کردن همه
            </button>
          )}
        </div>
      </header>

      <div className="rounded-2xl border border-chip-teal-border bg-chip-teal-bg p-3 text-xs leading-relaxed text-chip-teal-fg">
        <strong>حریم خصوصی:</strong> گفتگوها فقط در حافظهٔ محلی همین مرورگر ذخیره می‌شوند و به هیچ سروری فرستاده نمی‌شوند. با پاک کردن دادهٔ مرورگر از بین می‌روند.
      </div>

      {conversations.length > 3 && (
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="جستجو در عنوان گفتگوها..."
          className="min-h-[44px] w-full rounded-xl border border-app-border bg-app-surface px-3 py-2 text-sm text-ink placeholder:text-ink-subtle focus:border-brand focus:ring-0"
        />
      )}

      {loaded && conversations.length === 0 && (
        <div className="rounded-2xl border border-app-border bg-app-card p-10 text-center">
          <p className="mb-2 text-3xl">🗂️</p>
          <p className="text-sm font-semibold text-ink">هنوز گفتگویی ذخیره نشده است</p>
          <p className="mt-1 text-xs text-ink-muted">
            با ارسال اولین پیام در صفحهٔ گفتگو، تاریخچه به‌صورت خودکار اینجا ذخیره می‌شود.
          </p>
          <Link
            href="/chat"
            className="mt-4 inline-block rounded-xl bg-brand px-4 py-2 text-xs font-bold text-app-on-primary transition hover:bg-brand-strong"
          >
            شروع گفتگو
          </Link>
        </div>
      )}

      <div className="space-y-3">
        {filtered.map((conv) => {
          const last = conv.messages[conv.messages.length - 1];
          return (
            <article
              key={conv.id}
              className="rounded-2xl border border-app-border bg-app-card p-4 transition hover:border-brand/40"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <button
                  className="min-w-0 flex-1 text-right"
                  onClick={() => openConversation(conv.id)}
                  type="button"
                >
                  <h2 className="truncate text-sm font-bold text-ink">{conv.title}</h2>
                  <p className="mt-1 text-[11px] text-ink-subtle">
                    {formatDate(conv.updatedAt)} • {conv.messages.length} پیام
                  </p>
                  {last && (
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink-muted">
                      {last.role === "user" ? "شما: " : "دستیار: "}
                      {last.content}
                    </p>
                  )}
                </button>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    className="rounded-xl border border-chip-teal-border bg-chip-teal-bg px-3 py-1.5 text-xs font-medium text-chip-teal-fg transition hover:opacity-90"
                    onClick={() => openConversation(conv.id)}
                    type="button"
                  >
                    ادامه
                  </button>
                  <button
                    className="rounded-xl border border-app-border bg-app-surface px-3 py-1.5 text-xs text-ink-muted transition hover:bg-app-elevated"
                    onClick={() => remove(conv.id)}
                    aria-label="حذف گفتگو"
                    type="button"
                  >
                    حذف
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {loaded && conversations.length > 0 && filtered.length === 0 && (
        <p className="py-6 text-center text-sm text-ink-muted">گفتگویی با این عنوان پیدا نشد.</p>
      )}
    </section>
  );
}
