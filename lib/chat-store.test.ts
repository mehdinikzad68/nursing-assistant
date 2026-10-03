import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock localStorage for jsdom environment
const store = new Map<string, string>();
Object.defineProperty(globalThis, "localStorage", {
  value: {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => void store.set(key, String(value)),
    removeItem: (key: string) => void store.delete(key),
    clear: () => store.clear(),
    get length() { return store.size; },
    key: (index: number) => Array.from(store.keys())[index] ?? null,
  },
  writable: true,
  configurable: true,
});

// Also mock window.localStorage since chat-store checks window.localStorage
Object.defineProperty(window, "localStorage", {
  value: globalThis.localStorage,
  writable: true,
  configurable: true,
});

import {
  createConversation,
  deleteConversation,
  getActiveId,
  getConversation,
  listConversations,
  saveMessages,
  setActiveId,
  type ChatMessage,
} from "./chat-store";

const msg = (role: "user" | "assistant", content: string): ChatMessage => ({
  role,
  content,
  ts: Date.now(),
});

describe("chat-store", () => {
  beforeEach(() => {
  });

  it("creates a conversation with a generated id", () => {
    const conv = createConversation();
    expect(conv.id).toMatch(/^c_/);
    expect(conv.messages).toEqual([]);
    expect(listConversations()).toHaveLength(1);
  });

  it("persists messages and derives the title from the first user message", () => {
    const conv = createConversation();
    const updated = saveMessages(conv.id, [
      msg("user", "اضافه‌کاری ام را بررسی کن"),
      msg("assistant", "پاسخ اولیه..."),
    ]);
    expect(updated?.title).toBe("اضافه‌کاری ام را بررسی کن");
    expect(getConversation(conv.id)?.messages).toHaveLength(2);
  });

  it("restores the active conversation after a reload", () => {
    const conv = createConversation();
    saveMessages(conv.id, [msg("user", "مرخصی")]);
    setActiveId(conv.id);

    // simulate a fresh read
    const active = getActiveId();
    const restored = active ? getConversation(active) : null;
    expect(restored?.messages).toHaveLength(1);
    expect(restored?.messages[0].content).toBe("مرخصی");
  });

  it("deletes a conversation and clears the active id if it was active", () => {
    const conv = createConversation();
    setActiveId(conv.id);
    deleteConversation(conv.id);
    expect(getConversation(conv.id)).toBeNull();
    expect(getActiveId()).toBeNull();
  });

  it("keeps at most 100 conversations", () => {
    for (let i = 0; i < 105; i++) createConversation();
    expect(listConversations().length).toBe(100);
  });

  it("truncates long titles", () => {
    const conv = createConversation();
    const long = "سوال ".repeat(40);
    const updated = saveMessages(conv.id, [msg("user", long)]);
    expect(updated?.title.length).toBeLessThanOrEqual(61);
  });
});
