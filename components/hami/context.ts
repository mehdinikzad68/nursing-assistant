"use client";

import { createContext, useContext } from "react";
import type {
  ChatMessage,
  HamiModal,
  MemoryItem,
  OcrSummary,
  ReminderItem,
  RoleKey,
  RoleProfile,
  WorkspaceMode
} from "./types";

/**
 * وضعیت مشترک داشبورد حامی‌درمان.
 * Trace: UI-2 · T06 (یکپارچگی تجربهٔ کاربری در یک صفحه)
 */
export interface HamiContextValue {
  /* نقش و حالت کاری */
  role: RoleKey;
  profile: RoleProfile;
  setRole: (role: RoleKey) => void;
  workspaceMode: WorkspaceMode;
  setWorkspaceMode: (mode: WorkspaceMode) => void;

  /* حالت‌های ارگونومیک */
  /** انیمیشن آرام (پیش‌فرض روشن) — ضد خستگی شیفت شب */
  calmMotion: boolean;
  toggleCalmMotion: () => void;
  /** حالت محرمانهٔ استیشن — محو کردن عناوین و مبالغ حساس */
  stealth: boolean;
  toggleStealth: () => void;
  showDevBar: boolean;
  toggleDevBar: () => void;

  /* پنجره‌ها */
  modal: HamiModal;
  openModal: (modal: HamiModal) => void;
  closeModal: () => void;

  /* گفتگو */
  messages: ChatMessage[];
  chatInput: string;
  setChatInput: React.Dispatch<React.SetStateAction<string>>;
  pending: boolean;
  /** ارسال پرسش به /api/chat و افزودن پاسخ واقعی به جریان گفتگو */
  submitQuestion: (text: string) => void;
  generateDraft: () => void;
  confirmOcr: (summary: OcrSummary) => void;
  speakingId: string | null;
  toggleSpeech: (messageId: string, text: string) => void;

  /* داده‌های محلی کاربر */
  reminders: ReminderItem[];
  addReminder: () => void;
  memory: MemoryItem[];
  removeMemory: (id: string) => void;
  clearMemory: () => void;

  /* اعلان */
  toastMessage: string | null;
  toast: (message: string) => void;
}

export const HamiContext = createContext<HamiContextValue | null>(null);

export function useHami(): HamiContextValue {
  const ctx = useContext(HamiContext);
  if (!ctx) throw new Error("useHami باید داخل HamiProvider استفاده شود");
  return ctx;
}