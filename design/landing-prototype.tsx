import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Sparkles,
  Search,
  Lock,
  ArrowLeft,
  CheckCircle2,
  Globe,
  HelpCircle,
  Scale,
  GraduationCap,
  Calculator,
  Clock,
  HeartPulse,
  Stethoscope,
  Activity,
  FileText,
  UserCheck,
  Moon,
  Sun,
  X,
  RefreshCw,
  ChevronLeft,
  Building2,
  Briefcase,
  Award,
  MessageSquare,
  Send,
  Zap,
  WifiOff,
  Check
} from 'lucide-react';

type AuthTriggerMode = 'direct' | 'question';
type FlowStep = 'landing' | 'auth_phone' | 'auth_otp' | 'onboarding' | 'workspace';

interface RoleOption {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

interface EmploymentOption {
  id: string;
  title: string;
  badge: string;
}

interface QuickPrompt {
  id: string;
  label: string;
  fullQuestion: string;
  category: string;
  legalRef: string;
  shortAnswer: string;
}

const QUICK_PROMPTS: QuickPrompt[] = [
  {
    id: 'hardship',
    label: 'محاسبهٔ سنوات سختی کار',
    fullQuestion: 'نحوهٔ محاسبهٔ سنوات ارفاقی و بازنشستگی در مشاغل سخت و زیان‌آور پرستاری و کادر درمان چگونه است؟',
    category: 'حقوقی و کارگزینی',
    legalRef: 'استناد به قانون ارتقای بهره‌وری کارکنان بالینی نظام سلامت (مصوب ۱۳۸۸) و آیین‌نامهٔ اجرایی مشاغل سخت',
    shortAnswer: 'به ازای هر سال خدمت مستمر در بخش‌های بالینی بیمارستان‌ها و مراکز درمانی، ۶ ماه سنوات ارفاقی (حداکثر تا ۵ سال) به سابقهٔ خدمت شما اضافه می‌گردد و سقف ساعات کاری هفتگی با احتساب سابقه کاهش می‌یابد.'
  },
  {
    id: 'karaneh',
    label: 'فرمول جدید کارانه و اضافه‌کار',
    fullQuestion: 'فرمول محاسبهٔ اضافه‌کار و کارانهٔ مبتنی بر عملکرد در شیفت‌های شب و تعطیلات رسمی چیست؟',
    category: 'محاسبات مالی',
    legalRef: 'استناد به دستورالعمل جدید پرداخت مبتنی بر عملکرد (قاصدک) و بخشنامهٔ ترمیم ضریب اضافه‌کار وزارت بهداشت',
    shortAnswer: 'ساعات حضور در شیفت شب و ایام تعطیل با ضریب ۱.۵ در سقف ساعات موظفی محاسبه شده و امتیاز کارانه بر اساس «سابقه»، «بخش محل خدمت (ویژه/عادی)» و «رضایت‌سنجی» بدون کسر مالیات پلکانی مضاعف تا سقف مصوب قابل دریافت است.'
  },
  {
    id: 'tarh',
    label: 'قوانین طرح نیروی انسانی',
    fullQuestion: 'شرایط معافیت، تمدید یا جابه‌جایی محل خدمت در طرح نیروی انسانی پزشکان و پیراپزشکان چیست؟',
    category: 'قوانین طرح',
    legalRef: 'استناد به قانون خدمت پزشکان و پیراپزشکان و ضوابط کمیسیون موارد خاص معاونت درمان',
    shortAnswer: 'انتقال یا جابه‌جایی در دوران طرح با موافقت دانشگاه مبدأ و مقصد در صورت وجود «شرایط تاهل»، «بیماری صعب‌العلاج بستگان درجه یک» یا «قبولی در مقاطع بالاتر» از طریق سامانهٔ طرح قابل ثبت و پیگیری فوری است.'
  },
  {
    id: 'cme',
    label: 'امتیاز بازآموزی و توریسم سلامت',
    fullQuestion: 'حداقل امتیاز بازآموزی سالانه برای تمدید پروانه و شرایط فعالیت در مراکز توریسم سلامت (IPD) چیست؟',
    category: 'آموزشی و بین‌الملل',
    legalRef: 'استناد به ضوابط آموزش مداوم جامعهٔ پزشکی (CME) و آیین‌نامهٔ بخش بیماران بین‌الملل (IPD)',
    shortAnswer: 'کسب حداقل ۲۵ امتیاز بازآموزی سالانه (شامل ماژول‌های اخلاق پزشکی و احیا) الزامی است. همچنین فعالیت در بخش‌های IPD نیازمند گواهی صلاحیت حرفه‌ای معتبر و ثبت در کارتابل بیمارستان‌های دارای مجوز گردشگری سلامت است.'
  }
];

const ROLE_OPTIONS: RoleOption[] = [
  {
    id: 'nurse',
    title: 'پرستاری و مامایی',
    subtitle: 'پرستار، ماما، بهیار و سوپروایزر',
    icon: <HeartPulse className="w-5 h-5 text-teal-400" />
  },
  {
    id: 'doctor',
    title: 'پزشکی (عمومی / تخصص)',
    subtitle: 'پزشک عمومی، دستیار، متخصص و فوق‌تخصص',
    icon: <Stethoscope className="w-5 h-5 text-cyan-400" />
  },
  {
    id: 'paramedic',
    title: 'پیراپزشکی و تشخیصی',
    subtitle: 'آزمایشگاه، رادیولوژی، اتاق عمل، هوشبری، فوریت‌ها',
    icon: <Activity className="w-5 h-5 text-indigo-400" />
  },
  {
    id: 'behvarz',
    title: 'بهورزی و شبکهٔ بهداشت',
    subtitle: 'بهورز، مراقب سلامت و کارشناس بهداشت',
    icon: <Globe className="w-5 h-5 text-emerald-400" />
  },
  {
    id: 'admin',
    title: 'اداری و منابع انسانی',
    subtitle: 'کارگزینی، امور حقوقی و مدیریت بیمارستان',
    icon: <Scale className="w-5 h-5 text-amber-400" />
  }
];

const EMPLOYMENT_OPTIONS: EmploymentOption[] = [
  { id: 'tarhi', title: 'طرحی / شرکتی / قراردادی', badge: 'بیشترین ابهامات کارگزینی' },
  { id: 'rasmi', title: 'رسمی / پیمانی (وزارت بهداشت یا تأمین اجتماعی)', badge: 'مشمول آیین‌نامهٔ اداری و استخدامی' },
  { id: 'private', title: 'بخش خصوصی / مطب و کلینیک', badge: 'مشمول قانون کار و تعرفهٔ خصوصی' }
];

const toEnglishDigits = (str: string): string => {
  return str
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));
};

const toPersianDigits = (str: string | number): string => {
  const s = String(str);
  return s.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
};

export default function App() {
  // Theme state: Night-shift friendly dark mode by default (crucial for hospital staff)
  const [isDark, setIsDark] = useState<boolean>(true);

  // Flow & Modal states
  const [flowStep, setFlowStep] = useState<FlowStep>('landing');
  const [authTriggerMode, setAuthTriggerMode] = useState<AuthTriggerMode>('direct');

  // Question & Interaction states (State Persistence across signup!)
  const [questionInput, setQuestionInput] = useState<string>('');
  const [activePrompt, setActivePrompt] = useState<QuickPrompt>(QUICK_PROMPTS[0]);
  const [hoveredOrbitItem, setHoveredOrbitItem] = useState<number | null>(null);

  // Auth states
  const [phoneInput, setPhoneInput] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState<number>(30);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  // 3-Second Onboarding states
  const [selectedRole, setSelectedRole] = useState<RoleOption | null>(null);
  const [selectedEmployment, setSelectedEmployment] = useState<EmploymentOption | null>(null);
  const [isSavingProfile, setIsSavingProfile] = useState<boolean>(false);

  // Workspace chat states
  const [chatHistory, setChatHistory] = useState<
    Array<{ sender: 'user' | 'ai'; text: string; legalRef?: string; tag?: string }>
  >([]);
  const [newChatQuestion, setNewChatQuestion] = useState<string>('');

  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (flowStep === 'auth_otp' && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [flowStep, otpTimer]);

  // Trigger Auth Modal from Hero input or quick chip
  const handleAskQuestionTrigger = (customQuestion?: string, promptObj?: QuickPrompt) => {
    const finalQuestion = customQuestion ?? questionInput.trim();
    if (promptObj) {
      setActivePrompt(promptObj);
    }
    if (!finalQuestion) {
      // If user clicked the main button without typing, populate with the highlighted prompt
      setQuestionInput(activePrompt.fullQuestion);
    } else {
      setQuestionInput(finalQuestion);
    }
    setAuthTriggerMode('question');
    setFlowStep('auth_phone');
    setPhoneError('');
  };

  // Trigger Auth Modal from Header button
  const handleDirectAuthTrigger = () => {
    setAuthTriggerMode('direct');
    setFlowStep('auth_phone');
    setPhoneError('');
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = toEnglishDigits(phoneInput).replace(/\D/g, '');
    if (cleanPhone.length < 10 || (!cleanPhone.startsWith('09') && !cleanPhone.startsWith('9'))) {
      setPhoneError('لطفاً یک شمارهٔ همراه معتبر وارد کنید (مثلاً ۰۹۱۲۱۲۳۴۵۶۷)');
      return;
    }
    setPhoneError('');
    setOtpValues(['', '', '', '', '']);
    setOtpTimer(30);
    setFlowStep('auth_otp');
    setTimeout(() => {
      otpRefs.current[0]?.focus();
    }, 100);
  };

  const handleOtpChange = (index: number, value: string) => {
    const cleanVal = toEnglishDigits(value).replace(/\D/g, '').slice(-1);
    const updated = [...otpValues];
    updated[index] = cleanVal;
    setOtpValues(updated);

    // Move focus to next input
    if (cleanVal && index < 4) {
      otpRefs.current[index + 1]?.focus();
    }

    // Auto-submit when 5th digit is entered!
    if (updated.every((digit) => digit !== '')) {
      triggerOtpSuccess();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // Simulate instant one-click demo OTP fill or Google Auth fallback
  const triggerOtpSuccess = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setFlowStep('onboarding');
    }, 650);
  };

  const handleEmploymentSelect = (emp: EmploymentOption) => {
    setSelectedEmployment(emp);
    setIsSavingProfile(true);
    setTimeout(() => {
      completeOnboarding(selectedRole || ROLE_OPTIONS[0], emp);
    }, 600);
  };

  const completeOnboarding = (role: RoleOption, emp: EmploymentOption) => {
    setIsSavingProfile(false);
    const initialQuery = questionInput.trim() || activePrompt.fullQuestion;
    const matchedPrompt =
      QUICK_PROMPTS.find((p) => initialQuery.includes(p.label) || initialQuery === p.fullQuestion) || activePrompt;

    setChatHistory([
      {
        sender: 'user',
        text: initialQuery
      },
      {
        sender: 'ai',
        tag: `پاسخ اختصاصی تنظیم‌شده برای: ${role.title} (${emp.title})`,
        legalRef: matchedPrompt.legalRef,
        text: `همکار گرامی، بر اساس آخرین بخشنامه‌های مربوط به رستهٔ «${role.title}» با وضعیت استخدامی «${emp.title}»:\n\n${matchedPrompt.shortAnswer}\n\nهمچنین در کارتابل شخصی شما، فرم محاسبهٔ دقیق و نمونهٔ نامهٔ اداری مربوط به این بند قانونی آمادهٔ دانلود است.`
      }
    ]);
    setFlowStep('workspace');
  };

  const handleWorkspaceSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatQuestion.trim()) return;
    const userQ = newChatQuestion.trim();
    setNewChatQuestion('');
    const roleTitle = selectedRole?.title || 'کادر درمان';
    const empTitle = selectedEmployment?.title || 'بخش بالینی';

    setChatHistory((prev) => [
      ...prev,
      { sender: 'user', text: userQ },
      {
        sender: 'ai',
        tag: `استعلام آنی از پایگاه قوانین (${roleTitle})`,
        legalRef: 'استناد به مجموعه قوانین و آیین‌نامه‌های اداری و استخدامی وزارت بهداشت و نظام پزشکی',
        text: `پرسش شما دربارهٔ «${userQ}» با تطبیق وضعیت «${empTitle}» بررسی شد. بر اساس ضوابط جاری، شما مشمول حمایت‌های قانونی این بند هستید و جزئیات محاسباتی آن در پروندهٔ شما ثبت گردید.`
      }
    ]);
  };

  return (
    <div
      dir="rtl"
      className={`min-h-screen font-sans transition-colors duration-300 selection:bg-teal-500 selection:text-white ${
        isDark ? 'bg-[#070E1A] text-slate-100' : 'bg-[#F4F7FB] text-slate-800'
      }`}
      style={{
        fontFamily: "'Vazirmatn', 'IRANSans', 'Tahoma', system-ui, -apple-system, sans-serif"
      }}
    >
      {}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className={`absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-[130px] transition-opacity duration-500 ${
            isDark ? 'bg-teal-500/15' : 'bg-teal-400/20'
          }`}
        />
        <div
          className={`absolute top-1/3 -left-32 w-[550px] h-[550px] rounded-full blur-[140px] transition-opacity duration-500 ${
            isDark ? 'bg-indigo-600/15' : 'bg-cyan-400/20'
          }`}
        />
      </div>

      {}
      <header
        className={`sticky top-0 z-30 backdrop-blur-xl border-b transition-colors ${
          isDark ? 'bg-[#070E1A]/80 border-slate-800/80' : 'bg-white/80 border-slate-200/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div
            onClick={() => setFlowStep('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-teal-500/25 group-hover:scale-105 transition-transform">
              <HeartPulse className="w-6 h-6 text-slate-950 stroke-[2.2]" />
              <span className="absolute -top-1 -left-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#070E1A] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight bg-gradient-to-l from-teal-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                  حامی درمان
                </span>
                <span
                  className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${
                    isDark
                      ? 'bg-teal-500/10 text-teal-300 border-teal-500/30'
                      : 'bg-teal-50 text-teal-700 border-teal-200'
                  }`}
                >
                  نسخهٔ هوشمند
                </span>
              </div>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                قطب‌نمای حقوقی، اداری و آموزشی کادر سلامت
              </p>
            </div>
          </div>

          {/* Navigation Links & Actions */}
          <div className="flex items-center gap-3">
            {/* Night-shift friendly theme switcher */}
            <button
              onClick={() => setIsDark(!isDark)}
              title="تغییر حالت نور (مناسب شیفت شب)"
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                isDark
                  ? 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-teal-500/40'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {isDark ? (
                <>
                  <Moon className="w-4 h-4 text-teal-400" />
                  <span className="hidden sm:inline">حالت شیفت شب</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span className="hidden sm:inline">حالت روز</span>
                </>
              )}
            </button>

            {flowStep === 'workspace' ? (
              <div className="flex items-center gap-2">
                <div
                  className={`hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs border ${
                    isDark
                      ? 'bg-teal-500/10 border-teal-500/30 text-teal-300'
                      : 'bg-teal-50 border-teal-200 text-teal-800'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>
                    {selectedRole?.title || 'کادر درمان'} • {selectedEmployment?.title.split(' ')[0] || 'فعال'}
                  </span>
                </div>
                <button
                  onClick={() => setFlowStep('landing')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition ${
                    isDark
                      ? 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  بازگشت به لندینگ
                </button>
              </div>
            ) : (
              /* Entry Point #1: Direct Login / Signup in Header */
              <button
                onClick={handleDirectAuthTrigger}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                  isDark
                    ? 'bg-slate-800/90 hover:bg-slate-700 text-white border border-slate-700'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                <span>ورود / عضویت سریع</span>
                <ArrowLeft className="w-4 h-4 text-teal-400" />
              </button>
            )}
          </div>
        </div>
      </header>

      {}
      {flowStep === 'workspace' ? (
        /* ==========================================
           AHA! MOMENT: PERSONALIZED WORKSPACE VIEW
           ========================================== */
        <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8">
          {/* Personalized Welcome Banner */}
          <div
            className={`mb-6 p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              isDark
                ? 'bg-gradient-to-l from-teal-950/60 via-slate-900/90 to-slate-900/90 border-teal-500/30'
                : 'bg-gradient-to-l from-teal-50 via-white to-white border-teal-200 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-teal-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-bold text-base sm:text-lg">
                    میز کار اختصاصی شما آماده شد!
                  </h2>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    حافظهٔ قوانین فعال شد
                  </span>
                </div>
                <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  تمام پاسخ‌ها از این لحظه بر اساس آیین‌نامه‌های{' '}
                  <strong className="text-teal-400 font-bold">
                    {selectedRole?.title || 'کادر درمان'}
                  </strong>{' '}
                  و وضعیت{' '}
                  <strong className="text-cyan-400 font-bold">
                    {selectedEmployment?.title || 'بالینی'}
                  </strong>{' '}
                  فیلتر می‌شوند.
                </p>
              </div>
            </div>
            <button
              onClick={() => setFlowStep('onboarding')}
              className={`text-xs px-3 py-2 rounded-xl border shrink-0 transition ${
                isDark
                  ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              تغییر رستهٔ شغلی
            </button>
          </div>

          {/* Chat & Legal Response Box */}
          <div
            className={`rounded-3xl border overflow-hidden shadow-2xl ${
              isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="p-4 sm:p-6 space-y-5 max-h-[520px] overflow-y-auto">
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-3xl rounded-2xl p-4 sm:p-5 ${
                      msg.sender === 'user'
                        ? isDark
                          ? 'bg-slate-800/90 text-slate-100 border border-slate-700'
                          : 'bg-slate-100 text-slate-800'
                        : isDark
                        ? 'bg-gradient-to-br from-teal-950/80 to-slate-900 border border-teal-500/30 text-slate-100'
                        : 'bg-teal-50/70 border border-teal-200 text-slate-800'
                    }`}
                  >
                    {msg.tag && (
                      <div className="flex items-center gap-2 text-xs font-bold text-teal-400 mb-2">
                        <Sparkles className="w-4 h-4" />
                        <span>{msg.tag}</span>
                      </div>
                    )}
                    <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line">
                      {msg.text}
                    </p>
                    {msg.legalRef && (
                      <div
                        className={`mt-4 pt-3 border-t flex items-start gap-2 text-xs ${
                          isDark
                            ? 'border-teal-500/20 text-amber-300/90'
                            : 'border-teal-200 text-amber-800'
                        }`}
                      >
                        <Scale className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{msg.legalRef}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Follow-up Input inside Workspace */}
            <form
              onSubmit={handleWorkspaceSend}
              className={`p-3 sm:p-4 border-t flex items-center gap-2 ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <input
                type="text"
                value={newChatQuestion}
                onChange={(e) => setNewChatQuestion(e.target.value)}
                placeholder="سؤال بعدی خود را دربارهٔ کارانه، مرخصی، بازآموزی یا قوانین طرح بپرسید..."
                className={`flex-1 px-4 py-3 rounded-xl text-sm focus:outline-none ${
                  isDark
                    ? 'bg-slate-900 text-white placeholder-slate-500 border border-slate-800 focus:border-teal-500'
                    : 'bg-white text-slate-800 placeholder-slate-400 border border-slate-200 focus:border-teal-500'
                }`}
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-gradient-to-l from-teal-500 to-cyan-500 text-slate-950 font-bold text-sm hover:opacity-95 transition flex items-center gap-2 shrink-0"
              >
                <span>ارسال پرسش</span>
                <Send className="w-4 h-4 rotate-180" />
              </button>
            </form>
          </div>
        </main>
      ) : (
        /* ==========================================
           HERO SECTION & CONVERSION FUNNEL LANDING
           ========================================== */
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
          {/* HERO GRID: 12 Columns (7 Right for Copy & Interactive Trap, 5 Left for Cosmic-Clinical Visual) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {}
            <div className="lg:col-span-7 space-y-6 text-right">
              {/* Top Badge */}
              <div
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium border ${
                  isDark
                    ? 'bg-teal-500/10 border-teal-500/30 text-teal-300'
                    : 'bg-teal-50 border-teal-200 text-teal-800'
                }`}
              >
                <Sparkles className="w-4 h-4 text-teal-400 animate-pulse" />
                <span>دستیار هوشمند حقوقی، اداری، محاسباتی و آموزشی کادر سلامت</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black leading-[1.35] tracking-tight">
                شما{' '}
                <span className="relative inline-block text-teal-400">
                  نبضِ درمان
                  <svg
                    className="absolute -bottom-2 right-0 w-full h-2.5 text-teal-500/50"
                    viewBox="0 0 120 12"
                    fill="none"
                  >
                    <path
                      d="M2 6H35L43 1L51 11L59 3L65 6H118"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>{' '}
                را نگه دارید؛
                <br />
                <span className="bg-gradient-to-l from-cyan-300 via-teal-200 to-indigo-300 bg-clip-text text-transparent">
                  جوابِ سؤال‌های پیچیده با ما.
                </span>
              </h1>

              {/* Sub-headline */}
              <p
                className={`text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                از <strong className="font-bold text-teal-400">بهورز</strong> در دورافتاده‌ترین مراکز تا{' '}
                <strong className="font-bold text-teal-400">پرستار، پیراپزشک و پزشک</strong> در
                شلوغ‌ترین بخش‌ها؛ «حامی درمان» سیارهٔ ناشناختهٔ بخشنامه‌ها، محاسبات کارانه، سختی کار و
                امتیازهای بازآموزی را به پاسخ‌های فوری و مستند تبدیل می‌کند.
              </p>

              {/* Entry Point #2: Interactive Micro-Commitment Search Trap */}
              <div
                className={`p-3 sm:p-4 rounded-3xl border shadow-2xl transition-all ${
                  isDark
                    ? 'bg-slate-900/90 border-teal-500/30 shadow-teal-950/30'
                    : 'bg-white border-teal-200 shadow-slate-200/70'
                }`}
              >
                <div className="flex items-center justify-between mb-2.5 px-1">
                  <span className="text-xs font-bold flex items-center gap-1.5 text-teal-400">
                    <Zap className="w-3.5 h-3.5" />
                    امتحان کنید: سؤالتان را بنویسید یا از دغدغه‌های پرتکرار انتخاب کنید
                  </span>
                  <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    پاسخ با ذکر دقیق مادهٔ قانونی
                  </span>
                </div>

                {/* Search Input Box */}
                <div className="relative flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Search className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={questionInput}
                      onChange={(e) => setQuestionInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAskQuestionTrigger();
                        }
                      }}
                      placeholder="مثلاً: نحوهٔ محاسبهٔ سنوات سختی کار پرستاران یا قوانین طرح..."
                      className={`w-full pr-11 pl-4 py-3.5 rounded-2xl text-sm sm:text-base transition focus:outline-none ${
                        isDark
                          ? 'bg-slate-950/90 text-white placeholder-slate-500 border border-slate-800 focus:border-teal-400'
                          : 'bg-slate-50 text-slate-900 placeholder-slate-400 border border-slate-200 focus:border-teal-500'
                      }`}
                    />
                  </div>

                  {/* Primary Action Button */}
                  <button
                    onClick={() => handleAskQuestionTrigger()}
                    className="px-6 py-3.5 rounded-2xl bg-gradient-to-l from-teal-500 to-cyan-400 hover:from-teal-400 hover:to-cyan-300 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2 shrink-0 transition-transform active:scale-95 cursor-pointer"
                  >
                    <span>دریافت پاسخ فوری (رایگان)</span>
                    <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>

                {/* Quick Prompts (Chips) */}
                <div className="mt-3.5 flex items-center gap-2 flex-wrap">
                  <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    پرسش‌های پرتکرار شیفت:
                  </span>
                  {QUICK_PROMPTS.map((item) => {
                    const isSelected = activePrompt.id === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setActivePrompt(item);
                          setQuestionInput(item.fullQuestion);
                          handleAskQuestionTrigger(item.fullQuestion, item);
                        }}
                        className={`text-xs px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? isDark
                              ? 'bg-teal-500/20 border-teal-400/60 text-teal-200 font-semibold'
                              : 'bg-teal-50 border-teal-400 text-teal-900 font-semibold'
                            : isDark
                            ? 'bg-slate-800/70 border-slate-700/80 text-slate-300 hover:border-teal-500/40 hover:text-white'
                            : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronLeft className="w-3 h-3 opacity-70" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Hidden Angle #1: Psychological Security & Confidentiality Guarantee */}
              <div
                className={`p-3.5 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${
                  isDark
                    ? 'bg-emerald-950/25 border-emerald-500/25 text-emerald-200'
                    : 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                }`}
              >
                <div className="flex items-center gap-2.5 text-xs sm:text-sm">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                    <Lock className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span>
                    <strong className="font-bold">تضمین محرمانگی شغلی:</strong> پرسش‌ها و اطلاعات شما{' '}
                    <span className="underline decoration-emerald-400/60 underline-offset-4">
                      ۱۰۰٪ رمزنگاری‌شده و مستقل
                    </span>{' '}
                    است و به هیچ مرکز درمانی، کارگزینی یا سازمانی ارسال نمی‌شود.
                  </span>
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 mr-auto">
                  ⚡ عضویت ۳۰ ثانیه‌ای بدون کد نظام پزشکی
                </span>
              </div>
            </div>

            {}
            <div className="lg:col-span-5">
              <div
                className={`relative rounded-[32px] border p-5 sm:p-6 overflow-hidden shadow-2xl ${
                  isDark
                    ? 'bg-gradient-to-b from-[#0C192E] via-[#091324] to-[#0B172A] border-slate-800'
                    : 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 border-slate-700 text-white'
                }`}
              >
                {/* Cosmic Starfield & Hologram Beam Effect */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-35"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 50% 22%, rgba(45, 212, 191, 0.35), transparent 60%), radial-gradient(circle at 80% 75%, rgba(99, 102, 241, 0.25), transparent 55%)'
                  }}
                />

                {/* Top Visual Layer: Earth, Planets & Question Marks Turning Into Legal Answers */}
                <div className="relative z-10 flex flex-col items-center pt-2 pb-6">
                  <div className="text-[11px] font-medium px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-cyan-300 mb-4 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-teal-400" />
                    <span>مدار هوشمند حامی درمان: تبدیل ابهامات کلان به پاسخ‌های شفاف</span>
                  </div>

                  {/* Orbit & Globe SVG Canvas */}
                  <div className="relative w-full h-64 flex items-center justify-center">
                    {/* Hologram Light Cone projecting from the Nurse/Doctor's Tablet at the bottom up to the Globe */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      viewBox="0 0 400 260"
                      fill="none"
                    >
                      <defs>
                        <linearGradient id="hologramBeam" x1="200" y1="250" x2="200" y2="20" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.45" />
                          <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.18" />
                          <stop offset="100%" stopColor="#6366F1" stopOpacity="0.0" />
                        </linearGradient>
                        <linearGradient id="ivToOrbit" x1="70" y1="240" x2="330" y2="90" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#2DD4BF" />
                          <stop offset="50%" stopColor="#38BDF8" />
                          <stop offset="100%" stopColor="#818CF8" />
                        </linearGradient>
                      </defs>

                      {/* Light Cone from Device */}
                      <polygon points="165,245 235,245 345,35 55,35" fill="url(#hologramBeam)" />

                      {/* Outer Planet Orbit Ring */}
                      <ellipse
                        cx="200"
                        cy="110"
                        rx="165"
                        ry="62"
                        stroke="url(#ivToOrbit)"
                        strokeWidth="1.5"
                        strokeDasharray="6 6"
                        opacity="0.6"
                      />

                      {/* Continuous Line: IV Tube & ECG Pulse morphing into the Planetary Orbit */}
                      <path
                        d="M 62 235 C 62 185, 35 140, 65 95 C 95 50, 305 50, 335 95 C 360 132, 310 175, 235 190 L 220 190 L 214 178 L 206 204 L 198 184 L 192 190 L 165 190"
                        stroke="url(#ivToOrbit)"
                        strokeWidth="2.2"
                        fill="none"
                        strokeLinecap="round"
                      />

                      {/* Distant small planets representing unknown regulations */}
                      <circle cx="55" cy="52" r="9" fill="#334155" stroke="#64748B" strokeWidth="1.5" />
                      <circle cx="345" cy="48" r="12" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
                      <ellipse cx="345" cy="48" rx="18" ry="5" stroke="#64748B" strokeWidth="1.2" transform="rotate(-20 345 48)" />
                    </svg>

                    {/* Central Stylized Earth (National & Global Healthcare Coverage) */}
                    <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-tr from-teal-900 via-cyan-800 to-indigo-900 border-2 border-teal-400/60 shadow-[0_0_40px_rgba(20,184,166,0.4)] flex flex-col items-center justify-center text-center p-2">
                      <Globe className="w-9 h-9 text-teal-300 mb-0.5 animate-pulse" />
                      <span className="text-[10px] font-bold text-cyan-100 leading-tight">
                        پوشش سراسری قوانین سلامت
                      </span>
                    </div>

                    {/* Right Side of Orbit: Unresolved Question Marks (Before Hami Darman Filter) */}
                    <div
                      onMouseEnter={() => setHoveredOrbitItem(1)}
                      onMouseLeave={() => setHoveredOrbitItem(null)}
                      onClick={() => handleAskQuestionTrigger(QUICK_PROMPTS[0].fullQuestion, QUICK_PROMPTS[0])}
                      className="absolute top-3 right-3 sm:right-6 z-20 cursor-pointer group"
                    >
                      <div className="px-3 py-2 rounded-2xl bg-slate-900/90 border border-amber-500/40 text-amber-300 text-xs flex items-center gap-2 shadow-lg group-hover:scale-105 transition">
                        <span className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center font-black text-sm">
                          ؟
                        </span>
                        <div className="text-right">
                          <div className="font-bold text-[11px]">ابهام: سنوات سختی کار؟</div>
                          <div className="text-[10px] text-amber-200/80">کلیک برای رمزگشایی ←</div>
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => handleAskQuestionTrigger(QUICK_PROMPTS[2].fullQuestion, QUICK_PROMPTS[2])}
                      className="absolute bottom-14 right-1 sm:right-4 z-20 cursor-pointer group"
                    >
                      <div className="px-2.5 py-1.5 rounded-xl bg-slate-900/85 border border-rose-500/40 text-rose-300 text-[11px] flex items-center gap-1.5 shadow-md group-hover:scale-105 transition">
                        <HelpCircle className="w-4 h-4 text-rose-400" />
                        <span>قوانین طرح و جابه‌جایی؟</span>
                      </div>
                    </div>

                    {/* Left Side of Orbit: Resolved Glassmorphic Answer Cards (After Hami Darman Filter!) */}
                    <div
                      onClick={() => handleAskQuestionTrigger(QUICK_PROMPTS[0].fullQuestion, QUICK_PROMPTS[0])}
                      className="absolute top-2 left-2 sm:left-4 z-20 cursor-pointer group"
                    >
                      <div className="px-3 py-2 rounded-2xl bg-teal-950/90 backdrop-blur-md border border-teal-400/60 text-teal-100 text-xs flex items-center gap-2 shadow-xl shadow-teal-950/50 group-hover:scale-105 transition">
                        <div className="w-6 h-6 rounded-full bg-teal-400/20 border border-teal-400 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-teal-300" />
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-[11px] text-teal-300">پاسخ مستند: مادهٔ قانون بهره‌وری</div>
                          <div className="text-[10px] text-slate-300">+۶ ماه سنوات ارفاقی به ازای هر سال</div>
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => handleAskQuestionTrigger(QUICK_PROMPTS[1].fullQuestion, QUICK_PROMPTS[1])}
                      className="absolute bottom-12 left-1 sm:left-3 z-20 cursor-pointer group"
                    >
                      <div className="px-3 py-1.5 rounded-xl bg-cyan-950/90 backdrop-blur-md border border-cyan-400/50 text-cyan-100 text-[11px] flex items-center gap-1.5 shadow-lg group-hover:scale-105 transition">
                        <Calculator className="w-3.5 h-3.5 text-cyan-300" />
                        <span>فرمول کارانه و اضافه‌کار: ضریب ۱.۵ ✅</span>
                      </div>
                    </div>
                  </div>

                  {/* Foreground Layer: Clinical Bedside (IV Stand, Patient Bed, and Healthcare Team with Smart Tablet) */}
                  <div className="relative z-20 w-full mt-1 pt-4 border-t border-slate-800/90">
                    <div className="flex items-center justify-between gap-2 bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5">
                      {/* Right: IV Stand & Patient Care Context */}
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-10 h-12 rounded-xl bg-slate-900 border border-teal-500/40 flex flex-col items-center justify-center shrink-0">
                          {/* Stylized IV Bag */}
                          <div className="w-5 h-6 rounded-t-md rounded-b-lg border border-teal-400 bg-teal-500/20 flex items-center justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-ping" />
                          </div>
                          <div className="w-0.5 h-2.5 bg-teal-400/70" />
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            <span>آرامش در بالین بیمار</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-300">
                              نبض منظم درمان
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            پرستار، پزشک، پیراپزشک و بهورز؛ متصل به پایگاه دانش قوانین
                          </p>
                        </div>
                      </div>

                      {/* Left: Interactive Team Avatar Badge */}
                      <button
                        onClick={() => handleAskQuestionTrigger()}
                        className="px-3 py-2 rounded-xl bg-gradient-to-l from-teal-500/20 to-cyan-500/20 border border-teal-400/40 text-teal-300 text-xs font-bold hover:bg-teal-500/30 transition shrink-0 cursor-pointer"
                      >
                        تبلت حامی درمان ✦
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {}
          <section className="mt-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-black">
                  چرا بیش از هر تصمیم اداری، باید از «حامی درمان» بپرسید؟
                </h2>
                <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  پیش‌نمایش شفاف از آنچه بلافاصله پس از عضویت ۳۰ ثانیه‌ای در اختیار شماست:
                </p>
              </div>
              <span className="text-xs font-medium text-teal-400">
                مبتنی بر آخرین بخشنامه‌های وزارت بهداشت و سازمان نظام پزشکی
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Bento Card 1: Real Legal Citation Proof (Combats "Clueless Chatbot Syndrome") */}
              <div
                onClick={() => handleAskQuestionTrigger(QUICK_PROMPTS[0].fullQuestion, QUICK_PROMPTS[0])}
                className={`p-6 rounded-3xl border transition-all cursor-pointer group ${
                  isDark
                    ? 'bg-slate-900/70 border-slate-800 hover:border-teal-500/50'
                    : 'bg-white border-slate-200 hover:border-teal-400 shadow-sm'
                }`}
              >
                <div className="w-11 h-11 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center mb-4">
                  <Scale className="w-5 h-5 text-teal-400" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-base">پاسخ مستند با ذکر دقیق مادهٔ قانونی</h3>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-teal-500/15 text-teal-400">
                    حقوقی و کارگزینی
                  </span>
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  به جای جواب‌های کلی و غیرقابل استناد، دقیقاً ببینید کدام بند از قانون ارتقای بهره‌وری یا آیین‌نامهٔ استخدامی شامل حال شماست.
                </p>
                <div
                  className={`p-3 rounded-2xl text-xs border ${
                    isDark ? 'bg-slate-950/80 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <span className="text-teal-400 font-bold block mb-1">نمونهٔ خروجی واقعی:</span>
                  «طبق مادهٔ ۱ آیین‌نامهٔ اجرایی قانون ارتقای بهره‌وری، ساعات کاری هفتگی مشمولین با احتساب سنوات تا ۸ ساعت کاهش می‌یابد...»
                </div>
              </div>

              {/* Bento Card 2: Financial & CME Calculators */}
              <div
                onClick={() => handleAskQuestionTrigger(QUICK_PROMPTS[1].fullQuestion, QUICK_PROMPTS[1])}
                className={`p-6 rounded-3xl border transition-all cursor-pointer group ${
                  isDark
                    ? 'bg-slate-900/70 border-slate-800 hover:border-cyan-500/50'
                    : 'bg-white border-slate-200 hover:border-cyan-400 shadow-sm'
                }`}
              >
                <div className="w-11 h-11 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center mb-4">
                  <Calculator className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-base">محاسبه‌گر کارانه، اضافه‌کار و بازآموزی</h3>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-cyan-500/15 text-cyan-400">
                    مالی و آموزشی
                  </span>
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  فرمول‌های پیچیدهٔ قاصدک، ضریب شیفت‌های شب و تعطیلات، و امتیازهای بازآموزی لازم برای تمدید پروانه و توریسم سلامت را در چند ثانیه محاسبه کنید.
                </p>
                <div
                  className={`p-3 rounded-2xl text-xs border flex items-center justify-between ${
                    isDark ? 'bg-slate-950/80 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <span>ضریب شیفت شب و تعطیلات:</span>
                  <span className="font-bold text-cyan-400">۱.۵ برابر ساعت موظفی ✅</span>
                </div>
              </div>

              {/* Bento Card 3: Why Sign Up? (Sells the Gated Access logically!) */}
              <div
                onClick={handleDirectAuthTrigger}
                className={`p-6 rounded-3xl border transition-all cursor-pointer group ${
                  isDark
                    ? 'bg-gradient-to-br from-indigo-950/40 to-slate-900/90 border-indigo-500/30 hover:border-indigo-400/60'
                    : 'bg-indigo-50/40 border-indigo-200 hover:border-indigo-400 shadow-sm'
                }`}
              >
                <div className="w-11 h-11 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center mb-4">
                  <Award className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-base">چرا با شمارهٔ همراه وارد می‌شویم؟</h3>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300">
                    حافظهٔ شخصی
                  </span>
                </div>
                <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  قوانین یک «پرستار طرحی» با «پزشک رسمی» یا «بهورز» کاملاً متفاوت است! با یک بار ورود، حامی درمان رسته و سابقهٔ شما را به خاطر می‌سپارد تا هر بار مجبور به توضیح نباشید.
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 group-hover:translate-x-[-4px] transition-transform">
                  <span>ساخت پروفایل در کمتر از ۳۰ ثانیه</span>
                  <ArrowLeft className="w-4 h-4" />
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* =====================================================================
          STREAMING_CHUNK:Building the Smart Dynamic Auth & 3-Second Onboarding Modal...
         ===================================================================== */}
      {(flowStep === 'auth_phone' || flowStep === 'auth_otp' || flowStep === 'onboarding') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
          <div
            className={`relative w-full max-w-lg rounded-3xl border p-6 sm:p-8 shadow-2xl transition-all ${
              isDark
                ? 'bg-[#0B1526] border-slate-700/80 text-slate-100'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Close Button */}
            <button
              onClick={() => setFlowStep('landing')}
              className={`absolute top-5 left-5 w-9 h-9 rounded-xl flex items-center justify-center border transition ${
                isDark
                  ? 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                  : 'border-slate-200 text-slate-500 hover:bg-slate-100'
              }`}
              title="بستن پنجره"
            >
              <X className="w-4 h-4" />
            </button>

            {/* --------------------------------------------------
                MODAL STEP 1: PHONE INPUT + GOOGLE FALLBACK
               -------------------------------------------------- */}
            {flowStep === 'auth_phone' && (
              <div className="space-y-5">
                {/* Dynamic Header depending on whether user asked a question or clicked Direct Login */}
                {authTriggerMode === 'question' ? (
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-3">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>پاسخ به پرسش شما آمادهٔ پردازش است</span>
                    </div>

                    {/* Display User's Saved Question */}
                    <div
                      className={`p-3.5 rounded-2xl border text-xs sm:text-sm mb-3 flex items-start gap-2.5 ${
                        isDark
                          ? 'bg-slate-900/90 border-slate-800 text-slate-200'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <MessageSquare className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                      <div className="line-clamp-2 font-medium">
                        «{questionInput || activePrompt.fullQuestion}»
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black">
                      برای مشاهدهٔ پاسخ مستند و ذخیره در پرونده، وارد شوید:
                    </h3>
                  </div>
                ) : (
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-bold mb-3">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>ورود / عضویت یکپارچه</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black">
                      به حامی درمان خوش آمدید 👋
                    </h3>
                    <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      دستیار هوشمند حقوقی، اداری و آموزشیِ اختصاصیِ شما در تمام شیفت‌ها.
                    </p>
                  </div>
                )}

                {/* Phone Form */}
                <form onSubmit={handlePhoneSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold mb-2">
                      شمارهٔ همراه خود را وارد کنید (پشتیبانی از اعداد فارسی و انگلیسی):
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      dir="ltr"
                      autoFocus
                      value={phoneInput}
                      onChange={(e) => {
                        setPhoneInput(e.target.value);
                        if (phoneError) setPhoneError('');
                      }}
                      placeholder="0912xxxxxxx"
                      className={`w-full px-4 py-3.5 rounded-2xl text-left text-base sm:text-lg font-mono tracking-wider border focus:outline-none transition ${
                        isDark
                          ? 'bg-slate-950 border-slate-700 text-white focus:border-teal-400'
                          : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-teal-500'
                      }`}
                    />
                    {phoneError && (
                      <p className="text-xs text-rose-400 mt-1.5 font-medium">{phoneError}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-l from-teal-500 to-cyan-400 hover:from-teal-400 hover:to-cyan-300 text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 cursor-pointer transition"
                  >
                    <span>
                      {authTriggerMode === 'question'
                        ? 'دریافت کد تأیید و مشاهدهٔ پاسخ'
                        : 'ادامه و دریافت کد تأیید'}
                    </span>
                    <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </form>

                {/* Hidden Angle #4: Weak Hospital Signal Fallback (Google One-Click) */}
                <div className="relative flex py-1 items-center">
                  <div className={`flex-grow border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`} />
                  <span className={`shrink-0 mx-3 text-[11px] flex items-center gap-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                    یا ورود بدون پیامک (مناسب بخش‌های با آنتن‌دهی ضعیف)
                  </span>
                  <div className={`flex-grow border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`} />
                </div>

                <button
                  type="button"
                  onClick={triggerOtpSuccess}
                  className={`w-full py-3 px-4 rounded-2xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 transition cursor-pointer ${
                    isDark
                      ? 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
                      : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-white text-slate-900 font-black flex items-center justify-center text-xs shadow">
                    G
                  </span>
                  <span>ورود سریع با حساب گوگل (بدون نیاز به پیامک)</span>
                </button>

                {/* Reassuring Confidentiality Footer */}
                <div
                  className={`p-3 rounded-2xl border text-[11px] leading-relaxed flex items-start gap-2 ${
                    isDark
                      ? 'bg-slate-900/60 border-slate-800 text-slate-400'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <Lock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-teal-400">تضمین محرمانگی:</strong> شمارهٔ شما نزد «حامی درمان» امانت است، کاملاً رمزنگاری می‌شود و هیچ‌گونه پیامک تبلیغاتی برایتان ارسال نخواهد شد.
                  </span>
                </div>
              </div>
            )}

            {/* --------------------------------------------------
                MODAL STEP 2: FRICTIONLESS OTP VERIFICATION
               -------------------------------------------------- */}
            {flowStep === 'auth_otp' && (
              <div className="space-y-5 text-center">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-6 h-6 text-teal-400" />
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-black">
                    کد ۵ رقمی ارسال‌شده به {toPersianDigits(phoneInput || '09123456789')} را وارد کنید
                  </h3>
                  <button
                    type="button"
                    onClick={() => setFlowStep('auth_phone')}
                    className="text-xs text-teal-400 hover:underline mt-1 inline-block"
                  >
                    ویرایش شمارهٔ همراه
                  </button>
                </div>

                {/* 5-Digit Auto-Submit OTP Boxes */}
                <div dir="ltr" className="flex items-center justify-center gap-2.5 sm:gap-3 py-2">
                  {otpValues.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => {
                        otpRefs.current[idx] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={toPersianDigits(digit)}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className={`w-12 h-14 sm:w-14 sm:h-16 rounded-2xl text-center text-xl font-black border transition focus:outline-none ${
                        isDark
                          ? 'bg-slate-950 border-slate-700 text-teal-300 focus:border-teal-400'
                          : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-teal-500'
                      }`}
                    />
                  ))}
                </div>

                {isVerifying ? (
                  <div className="flex items-center justify-center gap-2 text-sm text-teal-400 font-bold py-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>در حال آماده‌سازی میز کار شما...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setOtpValues(['1', '2', '3', '4', '5']);
                        triggerOtpSuccess();
                      }}
                      className="text-xs px-3.5 py-2 rounded-xl bg-teal-500/15 border border-teal-500/30 text-teal-300 hover:bg-teal-500/25 transition cursor-pointer"
                    >
                      ⚡ شبیه‌سازی دریافت خودکار پیامک (WebOTP Demo)
                    </button>

                    <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {otpTimer > 0 ? (
                        <span>ارسال مجدد کد تا {toPersianDigits(otpTimer)} ثانیهٔ دیگر</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setOtpTimer(30)}
                          className="text-teal-400 font-bold hover:underline"
                        >
                          ارسال مجدد کد تأیید
                        </button>
                      )}
                    </p>
                  </div>
                )}

                {/* Hospital Weak Signal Escape Hatch */}
                <div
                  className={`pt-4 border-t text-xs ${
                    isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  در بخش یا مرکز درمانی آنتن ندارید؟{' '}
                  <button
                    type="button"
                    onClick={triggerOtpSuccess}
                    className="text-cyan-400 font-bold hover:underline"
                  >
                    با حساب گوگل وارد شوید ←
                  </button>
                </div>
              </div>
            )}

            {/* --------------------------------------------------
                MODAL STEP 3: 3-SECOND MICRO-ONBOARDING (ZERO TYPING!)
               -------------------------------------------------- */}
            {flowStep === 'onboarding' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-teal-500/15 text-teal-300 border border-teal-500/30">
                    🌱 تنظیم ۳ ثانیه‌ای حافظهٔ قوانین
                  </span>

                  {/* Crucial Escape Hatch (Skip button reduces psychological resistance) */}
                  <button
                    type="button"
                    onClick={() => completeOnboarding(ROLE_OPTIONS[0], EMPLOYMENT_OPTIONS[0])}
                    className={`text-xs font-medium hover:underline flex items-center gap-1 ${
                      isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <span>رد کردن و نمایش مستقیم پاسخ</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-black">
                    همکار گرامی، خوش آمدید!
                  </h3>
                  <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    برای اینکه قوانین و بخشنامه‌های دقیقِ خودتان را بگویم، فقط این ۲ مورد را لمس کنید (بدون نیاز به تایپ یا کد نظام پزشکی):
                  </p>
                </div>

                {/* Question 1: Role Selection (Single Tap) */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-teal-400">
                    ۱. رستهٔ شغلی خود را لمس کنید:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {ROLE_OPTIONS.map((role) => {
                      const isSelected = selectedRole?.id === role.id;
                      return (
                        <button
                          key={role.id}
                          type="button"
                          onClick={() => setSelectedRole(role)}
                          className={`p-3 rounded-2xl border text-right flex items-center gap-3 transition cursor-pointer ${
                            isSelected
                              ? isDark
                                ? 'bg-teal-500/20 border-teal-400 text-white shadow-lg shadow-teal-950/50'
                                : 'bg-teal-50 border-teal-500 text-slate-900'
                              : isDark
                              ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <div className="w-9 h-9 rounded-xl bg-slate-950/60 flex items-center justify-center shrink-0">
                            {role.icon}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs sm:text-sm font-bold truncate">{role.title}</div>
                            <div className={`text-[11px] truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                              {role.subtitle}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Question 2: Smoothly expands as soon as Role is tapped */}
                {selectedRole && (
                  <div className="space-y-2 pt-2 border-t border-slate-800/80 animate-fadeIn">
                    <div className="text-xs font-bold text-cyan-400">
                      ۲. وضعیت استخدامی / محل خدمت (با لمس گزینه، پاسخ شما باز می‌شود):
                    </div>
                    <div className="space-y-2">
                      {EMPLOYMENT_OPTIONS.map((emp) => {
                        const isEmpSelected = selectedEmployment?.id === emp.id;
                        return (
                          <button
                            key={emp.id}
                            type="button"
                            onClick={() => handleEmploymentSelect(emp)}
                            className={`w-full p-3 rounded-2xl border text-right flex items-center justify-between transition cursor-pointer ${
                              isEmpSelected
                                ? 'bg-gradient-to-l from-teal-500/25 to-cyan-500/25 border-teal-400 text-white'
                                : isDark
                                ? 'bg-slate-900/90 border-slate-800 text-slate-200 hover:border-teal-500/50'
                                : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-teal-400'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <Briefcase className="w-4 h-4 text-cyan-400" />
                              <span className="text-xs sm:text-sm font-bold">{emp.title}</span>
                            </div>
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                              {emp.badge}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {isSavingProfile && (
                  <div className="p-3 rounded-2xl bg-teal-500/20 border border-teal-400/50 text-teal-200 text-xs font-bold flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-300 animate-bounce" />
                    <span>حافظهٔ هوشمند حامی درمان برای رستهٔ شما تنظیم شد ✅</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}