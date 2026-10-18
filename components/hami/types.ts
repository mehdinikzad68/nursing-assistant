/**
 * تایپ‌های داشبورد «حامی‌درمان» (نسخهٔ دوم رابط کاربری)
 * Trace: UI-2 code_artifact-react.tsx · T06 (رابط کاربری) · T10 نقطه‌کور ۵ (تکثر استخدام)
 */

export type RoleKey =
  | "nurse"
  | "or_midwife"
  | "para"
  | "behvarz"
  | "admin_staff"
  | "service_staff"
  | "hr";

/** جداسازی فضای حقوقی از فضای تجاری/رشد — تصمیم D2 در قالب اجرا */
export type WorkspaceMode = "all" | "legal" | "growth";

export type HighlightRowId = "overtime_hours" | "shift_hours" | "tax_deduction" | null;

export interface RoleProfile {
  key: RoleKey;
  label: string;
  shortTitle: string;
  greeting: string;
  subtext: string;
  avatarEmoji: string;
  badges: string[];
  scienceTitle: string;
  suggestedQuestions: string[];
}

/**
 * سه سطح شفافیت پاسخ — ترجمهٔ بصری قاعدهٔ T05/C1 و سه سطح قطعیت (H3).
 * سطح‌ها «آنچه قطعی است / آنچه نیازمند مدرک است / تجربهٔ پرونده‌های مشابه» هستند و
 * هرگز به «نتیجهٔ تضمین‌شده» اشاره نمی‌کنند (H1/H5).
 */
export interface AnswerLevels {
  /** 🟢 آنچه بر پایهٔ مقررات فعال روشن است */
  known: string;
  /** 🟡 آنچه بدون مدرک قابل‌تصمیم نیست */
  needsEvidence: string;
  /** ⚖️ تجربهٔ پرونده‌های مشابه — بدون وعدهٔ نتیجه */
  similarCases: string;
}

export type ChatSender = "user" | "ai" | "draft" | "ocr" | "error";

export interface OcrSummary {
  docType: string;
  recordedHours: number;
  actualHours: number;
  diffHours: number;
  taxAmount: string;
}

export interface ChatMessage {
  id: string;
  sender: ChatSender;
  timestamp: string;
  text?: string;
  levels?: AnswerLevels;
  draftContent?: string;
  ocrSummary?: OcrSummary;
  /** وضعیت در حال ارسال به مدل */
  pending?: boolean;
}

export interface ReminderItem {
  id: string;
  title: string;
  badgeText: string;
  status: "warning" | "ready" | "new";
  nextStep: string;
}

export interface CourseItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  category: "retrain" | "beauty";
  accent: "teal" | "blue" | "amber";
}

export interface MemoryItem {
  id: string;
  label: string;
  value: string;
}

/** سناریوی نمایشی نگاشت‌شده به مسیر واقعی ریپازیتوری + دادهٔ data/mock */
export interface DemoCaseConfig {
  id: string;
  title: string;
  /** مسیر واقعی در اپ (App Router) — فقط مسیرهای موجود */
  route: string;
  prompt: string;
  openModalOnLoad?: "scanner" | "consult";
}

export type HamiModal = "scanner" | "auth" | "consult" | "calc" | "memory" | null;