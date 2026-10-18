import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import {
  ANSWER_LEVELS,
  COURSES_DATA,
  DEMO_CASES,
  INITIAL_MEMORY,
  INITIAL_REMINDERS,
  REPO_ROUTE_PROMPTS,
  ROLE_KEYS,
  ROLE_PROFILES
} from "./data";

const APP_DIR = path.join(process.cwd(), "app");

describe("پروفایل نقش‌ها", () => {
  it("هر ۷ وضعیت استخدامی تعریف‌شده در سند نقطه‌کور ۵ را پوشش می‌دهد", () => {
    expect(ROLE_KEYS).toHaveLength(7);
    expect(ROLE_KEYS).toEqual([
      "nurse",
      "or_midwife",
      "para",
      "behvarz",
      "admin_staff",
      "service_staff",
      "hr"
    ]);
  });

  it("هر نقش خوش‌آمد، سه سؤال پیشنهادی و سه برچسب دارد", () => {
    for (const key of ROLE_KEYS) {
      const profile = ROLE_PROFILES[key];
      expect(profile.key).toBe(key);
      expect(profile.greeting.length).toBeGreaterThan(10);
      expect(profile.subtext.length).toBeGreaterThan(10);
      expect(profile.suggestedQuestions).toHaveLength(3);
      expect(profile.badges).toHaveLength(3);
    }
  });
});

describe("مسیرهای سناریوهای نمونه", () => {
  it("همهٔ مسیرهای سناریو و پنل توسعه در اپ وجود دارند", () => {
    const routes = [
      ...DEMO_CASES.map((item) => item.route),
      ...REPO_ROUTE_PROMPTS.map((item) => item.route)
    ];
    const unique = Array.from(new Set(routes));

    for (const route of unique) {
      // مسیرهایی که پوشهٔ page.tsx ندارند نباید در فهرست بمانند
      const pageFile = path.join(APP_DIR, route.replace(/^\//, ""), "page.tsx");
      expect(existsSync(pageFile), `مسیر نامعتبر در داده: ${route}`).toBe(true);
    }
  });

  it("هیچ مسیر مرده‌ای مثل /payroll/letter وارد داده نشده باشد", () => {
    const routes = [...DEMO_CASES, ...REPO_ROUTE_PROMPTS].map((item) => item.route);
    expect(routes).not.toContain("/payroll/letter");
  });
});

describe("محتوای نمونه و قواعد انطباق", () => {
  it("سه سطح شفافیت پاسخ هیچ عدد یا درصد ساختگی ندارد", () => {
    const allText = [ANSWER_LEVELS.known, ANSWER_LEVELS.needsEvidence, ANSWER_LEVELS.similarCases].join(" ");
    expect(allText).not.toMatch(/٪|%/);
    expect(allText).not.toMatch(/\d+/);
  });

  it("برچسب دوره‌ها «نمونه» است و امتیاز تأییدنشده ندارد", () => {
    for (const course of COURSES_DATA) {
      expect(course.badge).toContain("نمونه");
      expect(course.badge).not.toMatch(/[۰-۹]|[0-9]/);
    }
  });

  it("یادآورها و حافظهٔ اولیه خالی نیستند", () => {
    expect(INITIAL_REMINDERS.length).toBeGreaterThan(0);
    expect(INITIAL_MEMORY.length).toBeGreaterThan(0);
  });
});