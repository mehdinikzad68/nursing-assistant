"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HamiContext } from "./context";
import type { AuthUser, HamiContextValue } from "./context";
import { USER_STORAGE_KEY } from "./context";
import {
  ANSWER_LEVELS,
  CHAT_ERROR_TEXT,
  INITIAL_MEMORY,
  INITIAL_REMINDERS,
  RATE_LIMIT_TEXT,
  ROLE_PROFILES,
  UPSTREAM_BUSY_TEXT,
  VOICE_FALLBACK_TRANSCRIPT,
  WELCOME_TEXT
} from "./data";
import { cancelSpeech, isTtsSupported, speak } from "./speech";
import type { ChatMessage, HamiModal, MemoryItem, OcrSummary, ReminderItem, RoleKey, WorkspaceMode } from "./types";

const DRAFT_STORAGE_KEY = "hami:chat-draft";
/** پرسشی که کاربر در لندینگ مطرح کرده و باید در داشبورد خودکار ارسال شود */
const PENDING_QUESTION_KEY = "hami:pending-question";
const TOAST_MS = 4200;

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome-msg",
  sender: "ai",
  timestamp: "هم‌اکنون",
  text: WELCOME_TEXT,
  levels: {
    known: ANSWER_LEVELS.known,
    needsEvidence: ANSWER_LEVELS.needsEvidence,
    similarCases: ANSWER_LEVELS.similarCases
  }
};

/** برچسب زمان پیام — ساعت و دقیقهٔ محلی */
function nowLabel(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function buildDraftLetter(roleTitle: string): string {
  return [
    "مدیریت محترم منابع انسانی و کارگزینی / سرپرستار محترم",
    "با سلام و احترام؛",
    `احتراماً به استحضار می‌رساند اینجانب (${roleTitle}) شاغل در آن مرکز، با بررسی فیش حقوقی ماه جاری متوجه مغایرت میان ساعات شیفت انجام‌شده در برنامهٔ رسمی بخش و ساعات اضافه‌کاری ثبت‌شده در فیش گردیده‌ام.`,
    "خواهشمند است دستور فرمایید ضمن بررسی لیست حضور و غیاب و تایم‌شیت بخش، ریزِ محاسبات کارکرد به اینجانب اعلام و در صورت وجود کسری، اصلاح آن در کارکرد ماه آتی اعمال گردد.",
    "پیشاپیش از توجه و دستور مساعد جنابعالی سپاسگزارم."
  ].join("\n");
}

/**
 * نگاشت نقش انتخابی در فرم ثبت‌نام (فارسی) به نقش‌های محتوایی داشبورد.
 * Trace: T10 نقطه‌کور ۵ (تکثر استخدام) · شخصی‌سازی داشبورد
 *
 * اگر نقشی در فهرست نبود، null برمی‌گردد تا نقش پیش‌فرض حفظ شود.
 */
export function authRoleToRoleKey(authRole: string): RoleKey | null {
  const normalized = authRole.trim();
  const map: Record<string, RoleKey> = {
    پرستار: "nurse",
    پرستاری: "nurse",
    ماما: "or_midwife",
    مامایی: "or_midwife",
    اتاق_عمل: "or_midwife",
    بهورز: "behvarz",
    بهورزی: "behvarz",
    "کادر اداری درمان": "admin_staff",
    "کادر اداری": "admin_staff",
    پزشک: "nurse",
    سایر: "nurse"
  };
  return map[normalized] ?? null;
}

export default function HamiProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [role, setRoleState] = useState<RoleKey>("nurse");
  const [workspaceMode, setWorkspaceMode] = useState<WorkspaceMode>("all");
  const [calmMotion, setCalmMotion] = useState(true);
  const [stealth, setStealth] = useState(false);
  const [modal, setModal] = useState<HamiModal>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [chatInput, setChatInput] = useState("");
  const [pending, setPending] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [memory, setMemory] = useState<MemoryItem[]>(INITIAL_MEMORY);
  const [reminders, setReminders] = useState<ReminderItem[]>(INITIAL_REMINDERS);

  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ---------- اعلان ---------- */
  const toast = useCallback((message: string) => {
    setToastMessage(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(null), TOAST_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  /* ---------- پیش‌نویس ورودی: ذخیرهٔ خودکار محلی (نه سرور) ---------- */
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(DRAFT_STORAGE_KEY);
      if (stored) setChatInput(stored);
    } catch {
      /* حافظه در دسترس نیست — بی‌اثر رد می‌شویم */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(DRAFT_STORAGE_KEY, chatInput);
    } catch {
      /* ignore */
    }
  }, [chatInput]);

  /* ---------- خواندن کاربر واردشده از حافظهٔ مرورگر ---------- */
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(USER_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as AuthUser;
        setUser(parsed);
        // شخصی‌سازی: نقش انتخابی کاربر در ثبت‌نام، نقش داشبورد را تعیین می‌کند
        const mapped = authRoleToRoleKey(parsed.role);
        if (mapped) setRoleState(mapped);
      }
    } catch {
      /* حافظه خراب یا در دسترس نیست — بی‌اثر */
    }
    setHydrated(true);
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    try {
      window.localStorage.removeItem(USER_STORAGE_KEY);
    } catch {
      /* ignore */
    }
    toast("از حساب خارج شدید.");
  }, [toast]);

  /* ---------- نقش ---------- */
  const setRole = useCallback(
    (next: RoleKey) => {
      setRoleState(next);
      toast(`شرایط شغلی و محتوای داشبورد مطابق جایگاه «${ROLE_PROFILES[next].shortTitle}» تنظیم شد.`);
    },
    [toast]
  );

  const toggleCalmMotion = useCallback(() => {
    setCalmMotion((prev) => {
      toast(
        prev
          ? "انیمیشن سه‌بعدی فعال شد (مدار چرخان و کارت‌های سه‌بعدی)."
          : "انیمیشن سه‌بعدی روی حالت آرام تنظیم شد — ضد خستگی شیفت شب."
      );
      return !prev;
    });
  }, [toast]);

  const toggleStealth = useCallback(() => {
    setStealth((prev) => {
      const next = !prev;
      toast(
        next
          ? "حالت محرمانهٔ استیشن روشن شد: مبالغ و عنوان‌های حساس تا لمس یا نگه‌داشتن موس محو می‌مانند."
          : "حالت محرمانهٔ استیشن خاموش شد."
      );
      return next;
    });
  }, [toast]);

  const openModal = useCallback((next: HamiModal) => setModal(next), []);
  const closeModal = useCallback(() => setModal(null), []);

  /* ---------- گفتگو با /api/chat واقعی ---------- */
  const submitQuestion = useCallback(
    (questionText: string) => {
      const trimmed = questionText.trim();
      if (!trimmed || pending) return;

      if (workspaceMode === "growth") setWorkspaceMode("all");

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        sender: "user",
        timestamp: "هم‌اکنون",
        text: trimmed
      };

      setMessages((prev) => [...prev, userMessage]);
      setChatInput("");
      setPending(true);

      void (async () => {
        try {
          const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: trimmed })
          });
          const data = (await response.json()) as { content?: string; error?: string };

          if (!response.ok || typeof data.content !== "string") {
            // ۴۲۹ = محدودیت نرخ · ۵۰۳ = شلوغی سرویس بالادستی — هر دو با پیام اختصاصی
            const friendlyText =
              response.status === 429
                ? RATE_LIMIT_TEXT
                : response.status === 503 || response.status === 502
                  ? UPSTREAM_BUSY_TEXT
                  : null;

            if (friendlyText) {
              const serviceMessage: ChatMessage = {
                id: `err-${Date.now()}`,
                sender: "error",
                timestamp: nowLabel(),
                text: friendlyText
              };
              setMessages((prev) => [...prev, serviceMessage]);
              setChatInput(trimmed);
              setPending(false);
              return;
            }
            throw new Error(data.error || "پاسخی دریافت نشد");
          }

          const aiMessage: ChatMessage = {
            id: `ai-${Date.now()}`,
            sender: "ai",
            timestamp: nowLabel(),
            text: data.content,
            levels: {
              known: ANSWER_LEVELS.known,
              needsEvidence: ANSWER_LEVELS.needsEvidence,
              similarCases: ANSWER_LEVELS.similarCases
            }
          };
          setMessages((prev) => [...prev, aiMessage]);
        } catch {
          const errorMessage: ChatMessage = {
            id: `err-${Date.now()}`,
            sender: "error",
            timestamp: nowLabel(),
            text: CHAT_ERROR_TEXT
          };
          setMessages((prev) => [...prev, errorMessage]);
        } finally {
          setPending(false);
        }
      })();
    },
    [pending, workspaceMode]
  );

  /* ---------- ارسال خودکار پرسشی که از لندینگ آمده ---------- */
  const pendingQuestionRef = useRef<string | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(PENDING_QUESTION_KEY);
      if (stored) {
        window.localStorage.removeItem(PENDING_QUESTION_KEY);
        pendingQuestionRef.current = stored;
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const question = pendingQuestionRef.current;
    if (!question || !hydrated) return;
    pendingQuestionRef.current = null;
    submitQuestion(question);
  }, [hydrated, submitQuestion]);

  const generateDraft = useCallback(() => {
    const draftMessage: ChatMessage = {
      id: `draft-${Date.now()}`,
      sender: "draft",
      timestamp: "پیش‌نویس قابل ویرایش",
      draftContent: buildDraftLetter(ROLE_PROFILES[role].shortTitle)
    };
    setMessages((prev) => [...prev, draftMessage]);
    toast("پیش‌نویس نامهٔ اداری آماده شد؛ متن را ویرایش و کپی کنید.");
  }, [role, toast]);

  const confirmOcr = useCallback(
    (summary: OcrSummary) => {
      const ocrMessage: ChatMessage = {
        id: `ocr-${Date.now()}`,
        sender: "ocr",
        timestamp: "تأیید چشمی کاربر",
        ocrSummary: summary
      };
      setMessages((prev) => [...prev, ocrMessage]);
      setModal(null);
      toast("تحلیل سند پس از تأیید چشمی شما در گفتگو ثبت شد.");
    },
    [toast]
  );

  /* ---------- پخش صوتی واقعی (Web Speech API) ---------- */
  const toggleSpeech = useCallback(
    (messageId: string, text: string) => {
      if (speakingId === messageId) {
        cancelSpeech();
        setSpeakingId(null);
        return;
      }

      if (!isTtsSupported()) {
        toast("مرورگر شما از پخش صوتی پشتیبانی نمی‌کند؛ متن پاسخ را می‌توانید بخوانید.");
        return;
      }

      const started = speak(text, () => setSpeakingId(null));
      if (started) {
        setSpeakingId(messageId);
        toast("پخش صوتی پاسخ با لحن آرام و شمرده آغاز شد.");
      }
    },
    [speakingId, toast]
  );

  /* ---------- داده‌های محلی کاربر ---------- */
  const addReminder = useCallback(() => {
    const newReminder: ReminderItem = {
      id: `rem-${Date.now()}`,
      title: "🔔 یادآور پیگیری پاسخ کارگزینی",
      badgeText: "ثبت شد",
      status: "new",
      nextStep:
        "این یادآور فقط در همین مرورگر و به‌صورت نمونه نگهداری می‌شود؛ ارسال پیامک واقعی در این نسخه فعال نیست."
    };
    setReminders((prev) => [newReminder, ...prev].slice(0, 3));
    toast("یادآور نمونه در پروندهٔ شخصی شما ثبت شد.");
  }, [toast]);

  const removeMemory = useCallback(
    (id: string) => {
      setMemory((prev) => prev.filter((item) => item.id !== id));
      toast("این مورد از حافظهٔ شغلی شما حذف شد.");
    },
    [toast]
  );

  const clearMemory = useCallback(() => {
    setMemory([]);
    toast("همهٔ سوابق ذخیره‌شده در این مرورگر پاک شد.");
  }, [toast]);

  const value = useMemo<HamiContextValue>(
    () => ({
      user,
      hydrated,
      signOut,
      role,
      profile: ROLE_PROFILES[role],
      setRole,
      workspaceMode,
      setWorkspaceMode,
      calmMotion,
      toggleCalmMotion,
      stealth,
      toggleStealth,
      modal,
      openModal,
      closeModal,
      messages,
      chatInput,
      setChatInput,
      pending,
      submitQuestion,
      generateDraft,
      confirmOcr,
      speakingId,
      toggleSpeech,
      reminders,
      addReminder,
      memory,
      removeMemory,
      clearMemory,
      toastMessage,
      toast
    }),
    [
      addReminder,
      chatInput,
      calmMotion,
      clearMemory,
      closeModal,
      confirmOcr,
      generateDraft,
      memory,
      messages,
      modal,
      openModal,
      pending,
      removeMemory,
      reminders,
      role,
      setRole,
      signOut,
      user,
      hydrated,
      speakingId,
      stealth,
      submitQuestion,
      toast,
      toggleCalmMotion,
      toggleSpeech,
      toggleStealth,
      toastMessage,
      workspaceMode
    ]
  );

  return <HamiContext.Provider value={value}>{children}</HamiContext.Provider>;
}