"use client";

import { useHami } from "./context";
import CaseFileCard from "./CaseFileCard";
import ChatCard from "./ChatCard";
import ConsultCard from "./ConsultCard";
import DocumentCard from "./DocumentCard";
import Header from "./Header";
import HamiProvider from "./HamiProvider";
import LegalRadarCard from "./LegalRadarCard";
import Modals from "./Modals";
import ModeBar from "./ModeBar";
import RetrainingCard from "./RetrainingCard";
import ScienceCard from "./ScienceCard";
import Toast from "./Toast";

/**
 * داشبورد «حامی‌درمان» — رابط اصلی نسخهٔ دوم.
 * Trace: UI-2 code_artifact-react.tsx → app/page.tsx · T06 · DESIGN-SYSTEM.md §9
 *
 * چیدمان: شبکهٔ بنتوی ۴ ستونه با ۷ جعبه:
 *   ۱) چت راهنما (۲×۲) · ۲) اتاق مشاوره · ۳) فیش‌خوان · ۴) پروندهٔ شخصی
 *   ۵) بازآموزی · ۶) منابع علمی (۲×۱) · ۷) رادار حقوقی (۲×۱)
 *
 * دو حالت کاری وجود دارد: «نمای کامل» و «فقط حقوقی» یا «فقط رشد/آموزش»
 * تا فضای حقوقی از فضای تجاری جدا بماند (تصمیم D2).
 */
function DashboardGrid() {
  const { workspaceMode } = useHami();
  const showLegal = workspaceMode === "all" || workspaceMode === "legal";
  const showGrowth = workspaceMode === "all" || workspaceMode === "growth";

  return (
    <main className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {showLegal && <ChatCard />}
      {showLegal && <ConsultCard />}
      {showLegal && <DocumentCard />}
      {showLegal && <CaseFileCard />}
      {showGrowth && <RetrainingCard />}
      {showGrowth && <ScienceCard />}
      {showLegal && <LegalRadarCard />}
    </main>
  );
}

export default function HamiDashboard() {
  return (
    <HamiProvider>
      <PageShell />
    </HamiProvider>
  );
}

/** بدنهٔ داشبورد — داخل Provider تا بتواند به حالت محرمانه دسترسی داشته باشد */
function PageShell() {
  const { stealth } = useHami();

  return (
    <div
      /* کلاس فعال‌کنندهٔ حالت محرمانه: همهٔ عناصر حساس (هدر، کارت‌ها، پیام‌ها) محو می‌مانند */
      className={`relative min-h-screen bg-hami-canvas pb-16 text-hami-text ${
        stealth ? "stealth-active" : ""
      }`}
    >
      {/* هالهٔ کم‌نور پس‌زمینه — بدون انیمیشن (ضد خستگی شیفت شب) */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-36 -top-36 h-96 w-96 rounded-full bg-hami-teal/10 blur-3xl" />
        <div className="absolute -left-36 top-1/3 h-96 w-96 rounded-full bg-hami-blue/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-3 pt-3 sm:px-6 sm:pt-5">
        <Header />
        <ModeBar />
        <DashboardGrid />
      </div>

      <Modals />
      <Toast />
    </div>
  );
}