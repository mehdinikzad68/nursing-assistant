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

/** کلید ذخیرهٔ کاربر در حافظهٔ مرورگر — باید با صفحهٔ لندینگ یکی باشد */
export const USER_STORAGE_KEY = "hami:user";

/** اطلاعات کاربر واردشده — فقط در مرورگر کاربر نگهداری می‌شود */
export interface AuthUser {
  name: string;
  mobile: string;
  role: string;
}

/**
 * وضعیت مشترک داشبورد حامی‌درمان.
 * Trace: UI-2 · T06 (یکپارچگی تجربهٔ کاربری در یک صفحه)
 */
export interface HamiContextValue {
  /* کاربر واردشده از طریق صفحهٔ ورود/ثبت‌نام */
  user: AuthUser | null;
  /** آیا حافظهٔ مرورگر خوانده شد؟ تا پیش از این، نباید به لندینگ هدایت شود */
  hydrated: boolean;
  signOut: () => void;

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