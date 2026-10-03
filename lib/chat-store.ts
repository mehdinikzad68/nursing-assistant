import { createLogger } from "./logger";

const log = createLogger("chat-store");

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
  ts: number;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: ChatMessage[];
}

const STORAGE_KEY = "nurse_chat_conversations_v1";
const ACTIVE_KEY = "nurse_chat_active_id";
const MAX_CONVERSATIONS = 100;
const TITLE_MAX = 60;

export const GREETING =
  "سلام! من دستیار حقوقی و اداری پرستاران هستم. مسئله‌ات را به زبان ساده بنویس تا با هم بررسی کنیم؛ پاسخ اولیه بر پایه منابع موجود ارائه می‌شود و در موضوعات حساس به بررسی انسانی ارجاع می‌دهم.";

function hasStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readAll(): Conversation[] {
  if (!hasStorage()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (c): c is Conversation =>
        !!c && typeof c.id === "string" && Array.isArray(c.messages),
    );
  } catch (error) {
    log.error("Failed to read conversations", {
      error: error instanceof Error ? error.message : String(error),
    });
    return [];
  }
}

function writeAll(list: Conversation[]): void {
  if (!hasStorage()) return;
  try {
    const trimmed = [...list]
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(0, MAX_CONVERSATIONS);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch (error) {
    log.error("Failed to write conversations", {
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

function newId(): string {
  return `c_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

/** First line of the first user message, trimmed for display. */
export function deriveTitle(text: string): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) return "گفتگوی بدون عنوان";
  return clean.length > TITLE_MAX ? `${clean.slice(0, TITLE_MAX)}…` : clean;
}

export function listConversations(): Conversation[] {
  return readAll().sort((a, b) => b.updatedAt - a.updatedAt);
}

export function getConversation(id: string): Conversation | null {
  return readAll().find((c) => c.id === id) ?? null;
}

export function createConversation(): Conversation {
  const now = Date.now();
  const conv: Conversation = {
    id: newId(),
    title: "گفتگوی جدید",
    createdAt: now,
    updatedAt: now,
    messages: [],
  };
  writeAll([conv, ...readAll()]);
  log.info("Conversation created", { id: conv.id });
  return conv;
}

/**
 * Replace the message list of a conversation and re-derive its title
 * from the first user message. Returns the updated conversation.
 */
export function saveMessages(id: string, messages: ChatMessage[]): Conversation | null {
  const all = readAll();
  const idx = all.findIndex((c) => c.id === id);
  if (idx === -1) return null;

  const firstUser = messages.find((m) => m.role === "user");
  const conv: Conversation = {
    ...all[idx],
    messages,
    updatedAt: Date.now(),
    title: firstUser ? deriveTitle(firstUser.content) : all[idx].title,
  };
  all[idx] = conv;
  writeAll(all);
  return conv;
}

export function renameConversation(id: string, title: string): void {
  const all = readAll();
  const idx = all.findIndex((c) => c.id === id);
  if (idx === -1) return;
  all[idx] = { ...all[idx], title: deriveTitle(title), updatedAt: Date.now() };
  writeAll(all);
}

export function deleteConversation(id: string): void {
  writeAll(readAll().filter((c) => c.id !== id));
  if (getActiveId() === id) setActiveId(null);
  log.info("Conversation deleted", { id });
}

export function clearConversations(): void {
  writeAll([]);
  setActiveId(null);
  log.info("All conversations cleared");
}

export function getActiveId(): string | null {
  if (!hasStorage()) return null;
  try {
    return window.localStorage.getItem(ACTIVE_KEY);
  } catch {
    return null;
  }
}

export function setActiveId(id: string | null): void {
  if (!hasStorage()) return;
  try {
    if (id) window.localStorage.setItem(ACTIVE_KEY, id);
    else window.localStorage.removeItem(ACTIVE_KEY);
  } catch {
    /* ignore */
  }
}

export function messageCount(): number {
  return listConversations().reduce((n, c) => n + c.messages.length, 0);
}
