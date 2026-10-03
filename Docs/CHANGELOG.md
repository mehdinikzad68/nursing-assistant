# تاریخچهٔ تغییرات — دستیار حقوقی و اداری پرستاران

> همهٔ تاریخ‌ها شمسی است. هر ورودی باید به فایل‌های تغییریافته اشاره کند.

---

## ۱۴۰۵/۰۷/۱۲ — بازطراحی رنگ، جانمایی داشبورد، آرشیو گفتگو، و مستندسازی

### افزوده شد
- **`lib/chat-store.ts`** — مخزن گفتگو روی `localStorage`: ساخت، ذخیره، بازیابی، حذف، جستجو، سقف ۱۰۰ گفتگو، استخراج خودکار عنوان از اولین پیام کاربر.
- **`app/archive/page.tsx`** — صفحهٔ آرشیو گفتگوها با جستجو، ادامه، حذف تکی و پاک‌سازی کامل.
- **`lib/chat-store.test.ts`** — ۶ تست برای مخزن گفتگو.
- **`Docs/STATUS.md`** — سند وضعیت لحظه‌ای پروژه.
- **`Docs/CHANGELOG.md`** — همین فایل.
- **`Docs/DESIGN-SYSTEM.md`** — سند سیستم طراحی و پالت رنگ.
- **توکن‌های معنایی در `tailwind.config.ts`** — `info`, `warning`, `success`, `danger`, `error` و نسخهٔ `-soft` هرکدام.

### تغییر کرد
- **`app/globals.css`** — پالت رنگ کامل مطابق پالت تأییدشدهٔ مالک: Primary `#0F6E6B`/`#5EEAD4`، پس‌زمینه `#F7F8F6`/`#101418`، سطح `#FFFFFF`/`#1A222C`، متن `#18212B`/`#E7EEF4`، مرز `#D5DEE6`/`#354354`. افزودن رنگ‌های معنایی و حلقهٔ فوکوس سراسری.
- **`app/page.tsx`** — جانمایی مجدد: دو باکس «موعدها و یادآوری‌های من» و «تازه‌های مقررات» بلافاصله **بعد از بخش چت** و کنار هم در یک گرید دوستونه قرار گرفتند (درخواست مالک). `AssistantInsights` تنها در ستون کناری ماند.
- **`components/dashboard/RegulatoryNews.tsx`** — استایل هماهنگ با `DeadlinesSection` (سربرگ با خط جداکننده، `p-6`، سایه، عنوان `text-sm`، آیتم‌های هم‌ارتفاع).
- **`components/dashboard/HeroSection.tsx`**, **`PrivacyModal.tsx`**, **`UploadModal.tsx`** — دکمهٔ اصلی از `bg-teal-600` به `bg-brand` با متن `text-app-on-primary`.
- **`app/chat/page.tsx`** — بازنویسی کامل: ماندگاری گفتگو، دکمهٔ «گفتگوی جدید»، لینک آرشیو، خواندن `?q=` از URL، حذف توگل تم محلی.
- **`components/dashboard/DashboardHeader.tsx`** — افزودن «آرشیو گفتگوها» به منوی دسکتاپ و موبایل.
- **۱۱ فایل صفحه و کامپوننت** — مهاجرت کامل از رنگ‌های هاردکد (`bg-teal-*`, `bg-slate-*`, `text-white`) به توکن‌های تم.
- **`Docs/ARCH.md`** — بازنویسی: تفکیک صریح «پیاده‌سازی‌شده» از «معماری هدف». سند قبلی معماری FastAPI/RAG را توصیف می‌کرد که وجود ندارد.
- **`Docs/QA-REPORT.md`** — بازنویسی با اعداد واقعی اندازه‌گیری‌شده و بخش شواهد.
- **`components/ui/Button.test.tsx`** — به‌روزرسانی انتظار از `bg-teal-600` به `bg-brand`.

### حذف شد
- **`app/landing/`** — صفحهٔ تکراری بدون ارجاع.

### تأیید
- ۲۴ تست پاس · typecheck صفر خطا · build موفق (۱۷ صفحه) · کانتینر `healthy` · ۱۱ مسیر همه `200`.

---

## پیش از ۱۴۰۵/۰۷/۱۲ — ساخت پروتوتایپ

- راه‌اندازی Next.js 15 + React 19 + TypeScript + Tailwind.
- ۱۱ مسیر: `/`, `/chat`, `/archive`, `/case`, `/guide`, `/expert`, `/profile`, `/payroll`, `/transfer`, `/leave`, `/plan`.
- اتصال به UniRouter با مدل `gemini-3.6-flash:free` و system prompt چهاربخشی.
- سیستم تم با توکن‌های CSS و `ThemeToggle`.
- لاگر ساختاریافتهٔ JSON (`lib/logger.ts`).
- زیرساخت تست Vitest + Testing Library.
- استقرار Docker با `docker-compose.dev.windows.yml`.
- داشبورد بنتو با ۹ کامپوننت اختصاصی در `components/dashboard/`.
- حذف منوی قدیمی (`Navigation.tsx`) و کامپوننت‌های بی‌استفاده (`BackButton.tsx`, `TopicCard.tsx`, `TrustCard.tsx`).
