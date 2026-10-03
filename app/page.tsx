"use client";

import HeroSection from "@/components/dashboard/HeroSection";
import TrustCards from "@/components/dashboard/TrustCards";
import FollowUpsSection from "@/components/dashboard/FollowUpsSection";
import AssistantInsights from "@/components/dashboard/AssistantInsights";
import DeadlinesSection from "@/components/dashboard/DeadlinesSection";
import RegulatoryNews from "@/components/dashboard/RegulatoryNews";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-screen-2xl space-y-8 px-4 py-8 sm:px-6 lg:px-10">
      <HeroSection />

      {/* The two "at a glance" boxes, placed right after the chat section
          so they are visible as soon as the user lands on the dashboard. */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DeadlinesSection />
        <RegulatoryNews />
      </div>

      <TrustCards />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <FollowUpsSection />
        </div>
        <div className="lg:col-span-5">
          <AssistantInsights />
        </div>
      </div>

      <footer className="border-t border-app-border pt-6 text-xs text-ink-subtle">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-chip-teal-bg text-xs font-bold text-chip-teal-fg">
              د
            </div>
            <span>دستیار حقوقی و اداری پرستاران • سامانه راهنمایی هوشمند و مستندسازی اولیه اداری</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              className="transition hover:text-brand"
              onClick={() => {
                const modal = document.getElementById("privacy-modal");
                if (modal) modal.classList.toggle("hidden");
              }}
              type="button"
            >
              منشور حریم خصوصی
            </button>
            <span>•</span>
            <a className="transition hover:text-brand" href="/guide">
              قوانین و حدود مسئولیت
            </a>
            <span>•</span>
            <a className="transition hover:text-brand" href="/expert">
              پشتیبانی و ثبت نظر
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
