import type { Metadata } from "next";
import "./globals.css";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PageShell from "@/components/PageShell";
import UploadModal from "@/components/dashboard/UploadModal";
import PrivacyModal from "@/components/dashboard/PrivacyModal";

export const metadata: Metadata = {
  title: "دستیار حقوقی و اداری پرستاران | راهنمایی هوشمند و اولیه",
  description:
    "راهنمایی اولیه، مستند و قابل پیگیری در مسائل اداری، مالی، استخدامی و حرفه‌ای پرستاران",
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&d)){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-app-bg text-ink antialiased">
        <DashboardHeader />
        <PageShell>{children}</PageShell>
        <UploadModal />
        <PrivacyModal />
      </body>
    </html>
  );
}
