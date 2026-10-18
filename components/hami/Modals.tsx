"use client";

import { useEffect, useState } from "react";
import { Lock, X } from "lucide-react";
import { MOCK_PAYSLIP, ROLE_PROFILES } from "./data";
import { useHami } from "./context";
import type { HighlightRowId } from "./types";

/** پوستهٔ مشترک پنجره‌ها */
function ModalShell({
  title,
  subtitle,
  icon,
  tone,
  onClose,
  children,
  wide = false
}: {
  title: string;
  subtitle?: string;
  icon: string;
  tone: "teal" | "blue";
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className={`hami-glass max-h-[92vh] w-full overflow-y-auto border p-5 sm:p-6 ${
          wide ? "max-w-4xl" : "max-w-xl"
        } ${tone === "teal" ? "border-hami-teal/50" : "border-hami-blue/40"}`}
      >
        <div className="flex items-start justify-between gap-3 border-b border-hami-border/15 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{icon}</span>
            <div>
              <h3 className="text-base font-black sm:text-lg">{title}</h3>
              {subtitle && <p className="mt-0.5 text-xs text-hami-muted">{subtitle}</p>}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="بستن"
            className="rounded-xl p-1.5 text-hami-muted transition-colors hover:bg-hami-rose/20 hover:text-hami-rose"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

/**
 * پنجرهٔ ۱: تطبیق چشمی فیش — کاربر خودش اعداد خوانده‌شده را تأیید می‌کند.
 * Trace: UI-2 MODAL 1 · data/mock/payslip-sara.json · قاعدهٔ C4 (تأیید انسانی پیش از تحلیل)
 *
 * توجه: در این نسخه «تصویر فیش» یک نمایش متنیِ نمونه است؛
 * هنوز OCR واقعی یا بارگذاری فایل پیاده‌سازی نشده است.
 */
function ScannerModal() {
  const { closeModal, confirmOcr, toast } = useHami();
  const [docType, setDocType] = useState<string>(MOCK_PAYSLIP.docTypes[0]);
  const [payslipHours, setPayslipHours] = useState<number>(MOCK_PAYSLIP.overtimeHours);
  const [actualHours, setActualHours] = useState<number>(MOCK_PAYSLIP.actualHours);
  const [taxAmount, setTaxAmount] = useState<string>(MOCK_PAYSLIP.taxAmount);
  const [activeRow, setActiveRow] = useState<HighlightRowId>("overtime_hours");

  const rows: { id: Exclude<HighlightRowId, null>; label: string; value: string; tone: string }[] = [
    {
      id: "overtime_hours",
      label: "🔍 ردیف ۱: ساعت اضافه‌کاری در فیش",
      value: `${payslipHours} ساعت`,
      tone: "teal"
    },
    {
      id: "shift_hours",
      label: "🔍 ردیف ۲: مقایسه با شیفت واقعی شما",
      value: `شیفت بخش: ${actualHours} ساعت`,
      tone: "amber"
    },
    {
      id: "tax_deduction",
      label: "🔍 ردیف ۳: کسور مالیات ماه جاری",
      value: `${taxAmount} ریال`,
      tone: "rose"
    }
  ];

  const rowTone = {
    teal: activeRow === "overtime_hours" ? "bg-hami-teal/30 border-hami-teal" : "bg-hami-teal/10 border-hami-teal/30 opacity-80",
    amber:
      activeRow === "shift_hours" ? "bg-hami-amber/30 border-hami-amber" : "bg-hami-amber/10 border-hami-amber/30 opacity-80",
    rose:
      activeRow === "tax_deduction" ? "bg-hami-rose/30 border-hami-rose" : "bg-hami-rose/10 border-hami-rose/30 opacity-80"
  } as const;

  const textTone = { teal: "text-hami-teal", amber: "text-hami-amber", rose: "text-hami-rose" } as const;

  return (
    <ModalShell
      wide
      icon="📑"
      tone="teal"
      title="تطبیق چشمی تصویر فیش با اعداد خوانده‌شده"
      subtitle="روی هر ردیف کلیک کنید تا سطر متناظر در تصویر فیش برجسته شود"
      onClose={closeModal}
    >
      <div className="my-3 flex items-center gap-2 rounded-xl border border-hami-teal/30 bg-hami-teal/10 p-3 text-xs leading-6 sm:text-sm">
        <Lock className="h-4 w-4 flex-shrink-0" />
        <span>
          <strong>حفاظت از محرمانگی:</strong> نام، کد ملی و شمارهٔ حساب در نمونهٔ نمایشی با نشانهٔ «بی‌نام‌شده» پوشانده شده
          است.
        </span>
      </div>

      <div className="my-4 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* نمایش متنی فیش با ردیف‌های قابل برجسته‌سازی */}
        <div className="hami-sub space-y-2.5 rounded-2xl border-2 p-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-hami-border/15 pb-2">
            <span className="font-extrabold">🏥 تصویر فیش حقوقی — {MOCK_PAYSLIP.month}</span>
            <span className="hami-sub rounded px-2 py-0.5 text-[11px]">کد ملی: ***۰</span>
          </div>

          <div className="grid grid-cols-2 gap-2 py-1 opacity-80">
            <div>
              نام: <span className="hami-sub select-none px-2">سارا [بی‌نام‌شده]</span>
            </div>
            <div>واحد: بخش ویژه (ICU)</div>
          </div>

          {rows.map((row) => (
            <button
              key={row.id}
              type="button"
              onClick={() => setActiveRow(row.id)}
              className={`flex w-full items-center justify-between rounded-xl border-2 p-3 text-right transition-all ${rowTone[row.tone as keyof typeof rowTone]}`}
            >
              <span className={`font-bold ${textTone[row.tone as keyof typeof textTone]}`}>{row.label}</span>
              <span className={`text-sm font-black tabular-nums ${textTone[row.tone as keyof typeof textTone]}`}>
                {row.value}
              </span>
            </button>
          ))}

          <div className="flex justify-between rounded-lg bg-hami-sub p-2.5 text-[11px] opacity-75">
            <span>حقوق ثابت و فوق‌العاده‌های حکمی:</span>
            <span className="tabular-nums">{MOCK_PAYSLIP.fixedPay} ریال</span>
          </div>
        </div>

        {/* فرم تأیید کاربر */}
        <div className="flex flex-col justify-between space-y-3">
          <div className="space-y-3">
            <div>
              <label htmlFor="ocr-doctype" className="mb-1 block text-xs font-extrabold sm:text-sm">
                نوع سند:
              </label>
              <select
                id="ocr-doctype"
                value={docType}
                onChange={(event) => setDocType(event.target.value)}
                className="hami-sub w-full rounded-xl border px-3.5 py-2.5 text-sm font-bold"
              >
                {MOCK_PAYSLIP.docTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="ocr-payslip-hours" className="mb-1 block text-xs font-extrabold text-hami-teal">
                  ساعت اضافه‌کار خوانده‌شده از فیش:
                </label>
                <input
                  id="ocr-payslip-hours"
                  type="number"
                  value={payslipHours}
                  onFocus={() => setActiveRow("overtime_hours")}
                  onChange={(event) => setPayslipHours(Number(event.target.value))}
                  className="tabular-nums w-full rounded-xl border-2 border-hami-teal/60 px-3.5 py-2.5 text-sm font-black"
                />
              </div>
              <div>
                <label htmlFor="ocr-actual-hours" className="mb-1 block text-xs font-extrabold text-hami-amber">
                  ساعت واقعی شیفت شما (برنامهٔ بخش):
                </label>
                <input
                  id="ocr-actual-hours"
                  type="number"
                  value={actualHours}
                  onFocus={() => setActiveRow("shift_hours")}
                  onChange={(event) => setActualHours(Number(event.target.value))}
                  className="tabular-nums w-full rounded-xl border-2 border-hami-amber/60 px-3.5 py-2.5 text-sm font-black"
                />
              </div>
            </div>

            <div>
              <label htmlFor="ocr-tax" className="mb-1 block text-xs font-extrabold text-hami-rose">
                مبلغ مالیات خوانده‌شده از فیش (ریال):
              </label>
              <input
                id="ocr-tax"
                type="text"
                value={taxAmount}
                onFocus={() => setActiveRow("tax_deduction")}
                onChange={(event) => setTaxAmount(event.target.value)}
                className="tabular-nums w-full rounded-xl border-2 border-hami-rose/50 px-3.5 py-2.5 text-sm font-black"
              />
            </div>
          </div>

          <div className="rounded-xl border border-hami-blue/30 bg-hami-blue/10 p-3 text-xs leading-6">
            💡 اگر عددی در تصویر کم‌رنگ بوده و اشتباه خوانده شده، کافی است عدد درست را در کادر بالا اصلاح کنید تا محاسبه بر
            اساس عدد تأییدشدهٔ شما انجام شود.
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2.5 border-t border-hami-border/15 pt-3">
        <button type="button" onClick={closeModal} className="hami-sub rounded-xl px-4 py-2.5 text-xs font-bold sm:text-sm">
          بستن
        </button>
        <button
          type="button"
          onClick={() => {
            if (Number.isNaN(payslipHours) || Number.isNaN(actualHours)) {
              toast("لطفاً اعداد را به‌درستی وارد کنید.");
              return;
            }
            confirmOcr({
              docType,
              recordedHours: payslipHours,
              actualHours,
              diffHours: Math.max(0, actualHours - payslipHours),
              taxAmount
            });
          }}
          className="hami-clay px-5 py-2.5 text-sm font-black"
        >
          ✅ اعداد درست است؛ معنی و راه پیگیری را بگو
        </button>
      </div>
    </ModalShell>
  );
}

/** پنجرهٔ ۲: ارجاع به کارشناس انسانی */
function ConsultModal() {
  const { closeModal, toast, profile } = useHami();

  return (
    <ModalShell
      icon="👨‍⚖️"
      tone="blue"
      title="ارجاع پرونده به کارشناس انسانی"
      subtitle="بخش حقوقی نظام پرستاری"
      onClose={closeModal}
    >
      <div className="my-4 space-y-3 text-xs leading-7 sm:text-sm">
        <div className="rounded-2xl border border-hami-blue/30 bg-hami-blue/10 p-3.5">
          <div className="mb-1 font-extrabold text-hami-blue">چرا بررسی انسانی در این مرحله مهم است؟</div>
          <p className="opacity-90">
            سامانه هرگز نباید در پرونده‌های حساس (هیئت رسیدگی به تخلفات اداری، دیوان عدالت یا کسر حقوق سنگین) اطمینان
            کاذب بدهد. کاری که این سامانه انجام می‌دهد: آماده‌سازی خلاصهٔ ساختاریافته تا کارشناس انسانی سریع‌تر راهنمایی
            کند.
          </p>
        </div>

        <div className="hami-sub space-y-1.5 rounded-2xl border p-3.5">
          <div className="font-extrabold text-hami-teal">📋 خلاصهٔ آماده‌شده برای ارسال به کارشناس (با اجازهٔ شما):</div>
          <ul className="list-inside list-disc space-y-1 text-xs opacity-90 sm:text-sm">
            <li>
              <strong>جایگاه شغلی:</strong> {profile.shortTitle} ({profile.badges.join(" • ")})
            </li>
            <li>
              <strong>موضوع مورد پرسش:</strong> موضوعی که در گفتگو مطرح کرده‌اید.
            </li>
            <li>
              <strong>موارد نیازمند بررسی کارشناس:</strong> انطباق مدارک شما با ضوابط ابلاغ و پرداخت.
            </li>
          </ul>
        </div>

        <p className="text-xs text-hami-muted">
          در این نسخه، ارسال واقعی پرونده به کارشناس فعال نیست؛ برای ثبت درخواست واقعی از صفحهٔ «راهنما و پشتیبانی» استفاده
          کنید.
        </p>
      </div>

      <div className="flex justify-end gap-2">
        <button type="button" onClick={closeModal} className="hami-sub rounded-xl px-4 py-2 text-xs font-bold sm:text-sm">
          بازگشت
        </button>
        <button
          type="button"
          onClick={() => {
            closeModal();
            toast("خلاصهٔ پرونده آماده شد. ارسال آن به کارشناس در این نسخه فعال نیست.");
          }}
          className="hami-clay-blue px-5 py-2.5 text-sm font-extrabold"
        >
          ارسال برای بررسی کارشناس حقوقی
        </button>
      </div>
    </ModalShell>
  );
}

/** پنجرهٔ ۳: ورود و شخصی‌سازی — بدون ادعای اتصال به سرویس واقعی */
function AuthModal() {
  const { closeModal, role, setRole, toast } = useHami();
  const [phone, setPhone] = useState("");
  const [selectedRole, setSelectedRole] = useState(role);

  return (
    <ModalShell
      icon="🔐"
      tone="blue"
      title="ورود و شخصی‌سازی اولیهٔ دستیار"
      subtitle="در این نسخه ورود واقعی پیاده‌سازی نشده است"
      onClose={closeModal}
    >
      <div className="my-4 space-y-4">
        <button
          type="button"
          onClick={() => toast("ورود با حساب گوگل در این نسخه فعال نیست.")}
          className="hami-sub w-full rounded-xl border px-4 py-3 text-xs font-extrabold transition-colors hover:border-hami-blue/40 sm:text-sm"
        >
          🌐 ورود با حساب گوگل (غیرفعال در این نسخه)
        </button>

        <div className="flex items-center gap-2 text-xs text-hami-muted">
          <div className="h-px flex-1 bg-hami-border/20" />
          <span>یا تنظیم جایگاه شغلی بدون ورود</span>
          <div className="h-px flex-1 bg-hami-border/20" />
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <label className="sr-only" htmlFor="auth-phone">
            شمارهٔ همراه
          </label>
          <input
            id="auth-phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="شمارهٔ همراه (۰۹۱۲…)"
            className="tabular-nums sm:col-span-2"
          />
          <button
            type="button"
            onClick={() => toast("ارسال کد پیامکی در این نسخه فعال نیست.")}
            className={`rounded-xl border px-3 py-2.5 text-xs font-extrabold ${"border-hami-teal/30 bg-hami-teal/10 text-hami-teal"}`}
          >
            ارسال کد
          </button>
        </div>

        <div className="hami-sub space-y-3 rounded-2xl border p-4">
          <div className="text-xs font-extrabold text-hami-teal sm:text-sm">
            🪪 فقط جایگاه شغلی را مشخص کنید تا سؤال‌های تکراری نپرسیم:
          </div>
          <label className="sr-only" htmlFor="auth-role">
            جایگاه شغلی
          </label>
          <select
            id="auth-role"
            value={selectedRole}
            onChange={(event) => setSelectedRole(event.target.value as typeof selectedRole)}
            className="hami-sub w-full rounded-xl border px-3 py-2.5 text-xs font-bold sm:text-sm"
          >
            {Object.values(ROLE_PROFILES).map((item) => (
              <option key={item.key} value={item.key}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button type="button" onClick={closeModal} className="hami-sub rounded-xl px-4 py-2 text-xs font-bold sm:text-sm">
          انصراف
        </button>
        <button
          type="button"
          onClick={() => {
            setRole(selectedRole);
            closeModal();
          }}
          className="hami-clay px-5 py-2.5 text-sm font-black"
        >
          ذخیره و شخصی‌سازی صفحهٔ من
        </button>
      </div>
    </ModalShell>
  );
}

/** پنجرهٔ ۴: محاسبه‌گر سنوات ارفاقی — برآورد اولیه با برچسب «نیازمند تطبیق با حکم» */
function CalcModal() {
  const { closeModal } = useHami();
  const [serviceYears, setServiceYears] = useState(12);

  const bonusYears = Math.min(serviceYears * 0.5, 10).toFixed(1);
  const totalEffectiveYears = (serviceYears + Number(bonusYears)).toFixed(1);

  return (
    <ModalShell
      icon="🧮"
      tone="teal"
      title="محاسبه‌گر سنوات ارفاقی (سختی کار)"
      subtitle="برآورد اولیه — نه تصمیم نهایی"
      onClose={closeModal}
    >
      <div className="my-4 space-y-3 text-xs sm:text-sm">
        <div>
          <label htmlFor="calc-years" className="mb-1.5 block font-bold">
            سابقهٔ خدمت واقعی شما تا امروز (سال):
          </label>
          <input
            id="calc-years"
            type="number"
            min={0}
            value={serviceYears}
            onChange={(event) => setServiceYears(Math.max(0, Number(event.target.value)))}
            className="tabular-nums w-full rounded-xl border border-hami-teal/50 px-3.5 py-2.5 text-base font-black"
          />
        </div>

        <div className="space-y-1 rounded-2xl border border-hami-teal/30 bg-hami-teal/10 p-3.5 leading-6">
          <div className="font-extrabold text-hami-teal">برآورد اولیه (نیازمند تطبیق با حکم کارگزینی):</div>
          <p className="text-hami-text/85">
            با <strong className="tabular-nums">{serviceYears} سال</strong> سابقه، برآورد اولیه حدود{" "}
            <strong className="tabular-nums">{bonusYears} سال</strong> سنوات ارفاقی است (مجموع سابقهٔ مؤثر برای بازنشستگی:{" "}
            <strong className="tabular-nums">{totalEffectiveYears} سال</strong>).
          </p>
          <p className="text-[11px] text-hami-muted">
            این محاسبه بر پایهٔ ضریب نمونهٔ نمایشی است و مبنای قانونی قطعی ندارد؛ ملاک نهایی، حکم و ابلاغ کارگزینی و
            تأیید کارشناس است.
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <button type="button" onClick={closeModal} className="hami-clay px-5 py-2 text-sm font-black">
          متوجه شدم
        </button>
      </div>
    </ModalShell>
  );
}

/** پنجرهٔ ۵: مدیریت حافظهٔ شغلی و حذف داده‌ها */
function MemoryModal() {
  const { closeModal, memory, removeMemory, clearMemory } = useHami();

  return (
    <ModalShell
      icon="🪪"
      tone="teal"
      title="مدیریت اطلاعات شغلی و حریم خصوصی"
      subtitle="همه‌چیز فقط در مرورگر خودتان ذخیره می‌شود"
      onClose={closeModal}
    >
      <p className="my-3 text-xs leading-6 text-hami-muted sm:text-sm">
        این موارد فقط برای جلوگیری از تکرار سؤال‌ها نگهداری می‌شوند. هر زمان بخواهید می‌توانید آن‌ها را حذف کنید.
      </p>

      <div className="mb-4 space-y-2.5 text-xs sm:text-sm">
        {memory.length === 0 && <p className="text-hami-muted">حافظه‌ای ذخیره نشده است.</p>}
        {memory.map((item) => (
          <div key={item.id} className="hami-sub flex items-center justify-between rounded-xl border p-3">
            <span>
              {item.label}: <strong>{item.value}</strong>
            </span>
            <button
              type="button"
              onClick={() => removeMemory(item.id)}
              className="flex items-center gap-1 font-bold text-hami-rose hover:underline"
            >
              حذف
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-hami-border/15 pt-2">
        <button
          type="button"
          onClick={() => {
            clearMemory();
            closeModal();
          }}
          className="text-xs font-extrabold text-hami-rose hover:underline"
        >
          🗑️ پاک کردن کل حافظهٔ من
        </button>
        <button type="button" onClick={closeModal} className="hami-clay px-5 py-2 text-sm font-black">
          تأیید
        </button>
      </div>
    </ModalShell>
  );
}

/** نمایش پنجرهٔ فعال */
export default function Modals() {
  const { modal, closeModal } = useHami();

  // بستن پنجره با کلید Escape
  useEffect(() => {
    if (!modal) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeModal, modal]);

  if (!modal) return null;

  if (modal === "scanner") return <ScannerModal />;
  if (modal === "consult") return <ConsultModal />;
  if (modal === "auth") return <AuthModal />;
  if (modal === "calc") return <CalcModal />;
  return <MemoryModal />;
}