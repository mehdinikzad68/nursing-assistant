# دستیار پرستار — Nursing Assistant

> 🔶 **این نسخه نمایشی است** — پاسخ‌ها نمونه‌اند و مبنای حقوقی ندارند.

دستیار حقوقی و اداری پرستاران ایران — وب‌اپلیکیشن فارسی راست‌به‌چپ با داشبورد «حامی‌درمان».

## ویژگی‌ها

### صفحهٔ فرود و ورود/ثبت‌نام (`/`)
- ✅ طراحی سینمایی hero-opus با تصویر کیهانی، ذرات شناور و انیمیشن‌های کامل (Ken Burns، درخشش دکمه، ضربان لوگو، خط پالس)
- ✅ حالت روشن و تیره — همگام با تم بقیهٔ اپ (کلید `theme` در `localStorage`)
- ✅ ثبت‌نام سه‌مرحله‌ای: موبایل ← کد تأیید ← نام و نقش شغلی
- ✅ صفحهٔ خوش‌آمد ۳ ثانیه‌ای با ضربان و نوار پیشرفت
- ✅ حفظ پرسش کاربر در مسیر ورود و ارسال خودکار آن در گفتگوی داشبورد

### داشبورد «حامی‌درمان» (`/dashboard`)
- ✅ ۷ جعبهٔ بنتو: چت راهنما، اتاق مشاوره، فیش‌خوان، پروندهٔ شخصی، بازآموزی، منابع علمی، رادار حقوقی
- ✅ گفتگوی واقعی با مدل + قالب پاسخ ۴ بخشی و سه سطح شفافیت
- ✅ انتخاب جایگاه شغلی (۷ نقش: پرستار، اتاق عمل/مامایی، پاراکلینیک، بهورز، اداری، خدمات، HR)
- ✅ حالت محرمانهٔ استیشن (محو شدن مبالغ حساس)
- ✅ حالت آرام پیش‌فرض (ضد خستگی بصری شیفت شب)
- ✅ فیش‌خوان با تطبیق چشمی کاربر
- ✅ پیش‌نویس نامهٔ اداری قابل ویرایش
- ✅ پخش صوتی پاسخ و ورودی صوتی (در مرورگرهای پشتیبان)
- ✅ نمایش نام و نقش کاربر و امکان خروج

### صفحات تخصصی
`/chat` · `/payroll` · `/leave` · `/transfer` · `/plan` · `/expert` · `/guide` · `/archive` · `/case` · `/profile`

### عمومی
- ✅ تم روشن/تیره در همهٔ مسیرها
- ✅ راست‌به‌چپ با فونت Vazirmatn
- ✅ آرشیو گفتگو روی `localStorage`
- ✅ بدون ثبت‌نام اجباری (نسخهٔ نمایشی)

## شروع

```bash
npm install
npm run dev
```

سپس به `http://localhost:3000` برو.

اجرای داخل داکر (ویندوز):

```bash
docker compose -f docker-compose.dev.windows.yml up -d --build
```

> **نکتهٔ مهم داکر:** در کانتینر فقط پوشه‌های `app`, `components`, `data`, `lib`, `public` زنده mount می‌شوند و پوشهٔ `.next` یک volume نام‌دارِ جداست. بنابراین:
> - تغییر کد → hot-reload خودکار، بدون rebuild
> - تغییر `package.json` → یک‌بار `--build` لازم است
> - `npm run dev` و `npm run build` را هم‌زمان روی یک پوشه اجرا نکنید (کش `.next` خراب می‌شود)

## ساختار پروژه

```
app/                       # صفحات و مسیرهای API نکست
  page.tsx                 # صفحهٔ فرود (اسمبل components/landing)
  dashboard/page.tsx       # داشبورد شخصی (گارد ورود + داشبورد V2)
  chat/ payroll/ leave/ transfer/ plan/ expert/ guide/
  archive/ case/ profile/ home/
  api/chat/route.ts        # تنها قابلیت واقعی: اتصال به UniRouter
components/
  landing/                 # صفحهٔ فرود hero-opus (LandingPage، SignupModal، WelcomeScreen، Illustration، Logo، data)
  hami/                    # داشبورد V2 (Header، ModeBar، ۷ کارت، Modals، Toast، data، theme، speech، context)
  auth/                    # پروتوتایپ ورود (HeroSection، AuthFlow، DemoChat) — فعلاً سوار نیست
  dashboard/               # اجزای داشبورد نسخهٔ اول — فعلاً سوار نیست
  ui/                      # کامپوننت‌های پایهٔ طراحی (Button، Card، Input، ChatBubble)
  AppShell.tsx             # پوستهٔ اپ + ناوبری
  PageShell.tsx            # ظرف تمام‌عرض برای / و /dashboard
  ThemeToggle.tsx          # کلید تم روشن/تیره
data/                      # داده‌های نمونه (mock/، knowledge-base.json)
lib/                       # chat-store، logger
public/images/             # دارایی‌های بصری (scene.jpg، grain.svg، medical-cosmos.webp)
design/                    # مواد مرجع طراحی (پروتوتایپ‌ها، تصاویر، آرشیو شخصی‌سازی v1)
Docs/                      # مستندات پروژه (STATUS، ARCH، DESIGN-SYSTEM، CHANGELOG، QA-REPORT، نقشهٔ راه)
ai-agents/                 # تعریف نقش‌های ایجنت‌ها
scripts/                   # اسکریپت‌های کمکی (check-encoding)
```

## اسکریپت‌ها

| فرمان | کار |
|---|---|
| `npm run dev` | اجرای محیط توسعه |
| `npm run build` | بیلد تولید |
| `npm run typecheck` | بررسی تایپ (`tsc --noEmit`) |
| `npm test` | اجرای تست‌ها (۳۱ تست) |
| `npm run lint` | ESLint روی `app` + `components` + `lib` |
| `npm run check:encoding` | بررسی کدگذاری UTF-8 فایل‌ها |

## قوانین پروژه

- هر پاسخ باید برچسب «نمونه» داشته باشد
- هیچ ادعای وکالت نمی‌شود
- سه سطح قطعیت الزامی است
- بدون دارک‌پترن
- بدون آمار ساختگی (هر عدد باید منبع واقعی داشته باشد)
- رنگ خام در کامپوننت‌ها ممنوع است — فقط توکن‌های `app/globals.css` و `tailwind.config.ts`

## تیم توسعه

| نقش | مسئولیت |
|---|---|
| LEAD | هماهنگی و یکپارچه‌سازی |
| ARCH | معماری و پایگاه دانش |
| DESIGN | طراحی سیستم |
| MOCK | داده‌های نمونه |
| QA | کنترل کیفیت |
| REVIEW | بازبین حقوقی |

## وضعیت فعلی

- مرحله: **پروتوتایپ نمایشی** — آمادهٔ نمایش، آمادهٔ انتشار عمومی نیست
- جزئیات کامل: [`Docs/STATUS.md`](Docs/STATUS.md)
- تاریخچهٔ تغییرات: [`Docs/CHANGELOG.md`](Docs/CHANGELOG.md)

## مجوز

MIT
