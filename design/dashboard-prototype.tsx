import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Eye,
  EyeOff,
  Mic,
  Volume2,
  Camera,
  Send,
  Sparkles,
  Scale,
  GraduationCap,
  FileText,
  Bell,
  BookOpen,
  Radio,
  Sun,
  Moon,
  Calculator,
  FileSignature,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  UserCheck,
  Lock,
  Trash2,
  Plus,
  Copy,
  Check,
  Terminal,
  ChevronDown,
  PauseCircle,
  PlayCircle,
  SlidersHorizontal,
  X,
  ArrowLeft,
  Layers
} from 'lucide-react';

export type RoleKey =
  | 'nurse'
  | 'or_midwife'
  | 'para'
  | 'behvarz'
  | 'admin_staff'
  | 'service_staff'
  | 'hr';

export type WorkspaceMode = 'all' | 'legal' | 'growth';

export type HighlightRowId = 'overtime_hours' | 'overtime_pay' | 'tax_deduction' | null;

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

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'draft' | 'ocr_result';
  timestamp: string;
  text?: string;
  knownRegulations?: string;
  needsEvidence?: string;
  similarCases?: string;
  draftContent?: string;
  ocrSummary?: {
    docType: string;
    recordedHours: number;
    actualHours: number;
    diffHours: number;
    taxAmount: string;
  };
}

export interface ReminderItem {
  id: string;
  title: string;
  badgeText: string;
  status: 'warning' | 'ready' | 'new';
  nextStep: string;
}

export interface CourseItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  category: 'retrain' | 'beauty';
  accent: 'teal' | 'blue' | 'amber';
}

export interface DemoCaseConfig {
  id: string;
  title: string;
  route: string;
  prompt: string;
  openModalOnLoad?: 'scanner' | 'consult';
}

const ROLE_PROFILES: Record<RoleKey, RoleProfile> = {
  nurse: {
    key: 'nurse',
    label: '👩‍⚕️ پرستار بالینی (عمومی / ویژه ICU و اورژانس)',
    shortTitle: 'پرستار بالینی',
    greeting: 'خسته نباشی سارا جان؛ امروز چه موضوع کاری، مالی یا اداری ذهنت را درگیر کرده؟',
    subtext: 'لازم نیست متن قانون را بلد باشی؛ به زبان ساده بنویس یا ویس بفرست تا قدم‌به‌قدم راهنمایی‌ات کنم.',
    avatarEmoji: '👩‍⚕️',
    badges: ['رسمی آزمایشی', 'بیمارستان دولتی', '۶ سال سابقه بالینی'],
    scienceTitle: 'منابع علمی، کتب حقوقی و انجمن‌های ویژه پرستاری بالینی (عمومی و ویژه)',
    suggestedQuestions: [
      'چرا مبلغ اضافه‌کاری و کارانه این ماهم کمتر از شیفت‌های ثبت‌شده است؟',
      'آیا سوپروایزر یا مترون می‌تواند بدون هماهنگی و ابلاغ کتبی، بخش من را تغییر دهد؟',
      'نحوه محاسبه سنوات ارفاقی و بازنشستگی طبق قانون سختی کار پرستاری چگونه است؟'
    ]
  },
  or_midwife: {
    key: 'or_midwife',
    label: '😷 کارشناس اتاق عمل، هوشبری و مامایی',
    shortTitle: 'اتاق عمل / هوشبری / مامایی',
    greeting: 'خسته نباشی همکار گرامی (اتاق عمل، هوشبری و مامایی)؛ در چه موردی راهنمایی‌ات کنم؟',
    subtext: 'پوشش تخصصی قوانین تعرفه‌گذاری خدمات، نوبت‌کاری، آنکالی اتاق عمل و حدود صلاحیت مامایی.',
    avatarEmoji: '😷',
    badges: ['اتاق عمل و مامایی', 'مشمول قانون بهره‌وری', '۵ سال سابقه'],
    scienceTitle: 'منابع علمی و انجمن‌های تخصصی اتاق عمل، هوشبری و مامایی ایران',
    suggestedQuestions: [
      'نحوه محاسبه ساعت آنکالی (On-call) و ضریب تعرفه در اتاق عمل چگونه است؟',
      'حدود صلاحیت قانونی و پوشش بیمه‌ای کارشناس مامایی در مراکز جراحی محدود چیست؟',
      'شرایط استفاده از کاهش ساعت کاری و مرخصی زایمان و شیردهی چگونه است؟'
    ]
  },
  para: {
    key: 'para',
    label: '☢️ کارشناس رادیولوژی، آزمایشگاه و توانبخشی',
    shortTitle: 'کارشناس پاراکلینیک و توانبخشی',
    greeting: 'خسته نباشی همکار عزیز (رادیولوژی، آزمایشگاه و توانبخشی)؛ چطور کمکت کنم؟',
    subtext: 'بررسی دقیق قوانین حق اشعه، سختی کار آزمایشگاه، فیزیوتراپی و کاردرمانی با استناد به بخشنامه‌ها.',
    avatarEmoji: '☢️',
    badges: ['کارشناس پاراکلینیک', 'مشمول حق اشعه / سختی کار', '۸ سال سابقه'],
    scienceTitle: 'رادار علمی و انجمن‌های رادیولوژی، علوم آزمایشگاهی، فیزیوتراپی و کاردرمانی',
    suggestedQuestions: [
      'نحوه محاسبه حق اشعه و مرخصی اجباری پرتوکاران در حکم جدید چگونه است؟',
      'شرایط بازنشستگی پیش از موعد (۲۰ سال خدمت) در آزمایشگاه و رادیولوژی چیست؟',
      'قوانین تعرفه‌گذاری و مسئولیت فنی در کلینیک‌های فیزیوتراپی و کاردرمانی چگونه است؟'
    ]
  },
  behvarz: {
    key: 'behvarz',
    label: '🏡 بهورز و مراقب سلامت (شبکه و خانه بهداشت)',
    shortTitle: 'بهورز و مراقب سلامت',
    greeting: 'خسته نباشی بهورز و مراقب سلامت گرامی؛ امروز چه سؤالی داری؟',
    subtext: 'راهنمایی ویژه بر اساس آیین‌نامه‌های خانه‌های بهداشت، شبکه‌های بهداشت و فوق‌العاده بهورزی.',
    avatarEmoji: '🏡',
    badges: ['بهورز / مراقب سلامت', 'شبکه بهداشت و درمان', '۷ سال سابقه'],
    scienceTitle: 'دستورالعمل‌های جامع سلامت خانواده، بهورزی و ارتقای پایه شغلی',
    suggestedQuestions: [
      'فوق‌العاده ویژه بهورزی و نحوه احتساب سنوات دوره آموزشگاه بهورزی چگونه است؟',
      'شرایط ادامه تحصیل بهورزان و تطبیق مدرک کارشناسی در حکم کارگزینی چیست؟',
      'نحوه پرداخت کارانه و اضافه‌کاری در خانه‌های بهداشت روستایی چگونه است؟'
    ]
  },
  admin_staff: {
    key: 'admin_staff',
    label: '🏢 کادر اداری، پذیرش، ترخیص و مدارک پزشکی',
    shortTitle: 'کادر اداری و پذیرش',
    greeting: 'خسته نباشی همکار گرامی (کادر اداری، پذیرش، ترخیص و مدارک پزشکی)؛ در خدمتم.',
    subtext: 'بررسی قوانین کارمندان اداری بیمارستان، نوبت‌کاری پذیرش، فوق‌العاده جذب و تبدیل وضعیت.',
    avatarEmoji: '🏢',
    badges: ['کادر اداری و پذیرش', 'پیمانی / قراردادی', '۶ سال سابقه'],
    scienceTitle: 'منابع آموزشی فناوری اطلاعات سلامت (HIT)، پذیرش، درآمد و امور اداری بیمارستان',
    suggestedQuestions: [
      'آیا نوبت‌کاری و سختی کار به پرسنل پذیرش و مدارک پزشکی شیفت شب تعلق می‌گیرد؟',
      'نحوه محاسبه کارانه کادر اداری و پشتیبانی بیمارستان طبق دستورالعمل جدید چیست؟',
      'شرایط تبدیل وضعیت نیروهای قراردادی و طرحی بخش‌های اداری چگونه است؟'
    ]
  },
  service_staff: {
    key: 'service_staff',
    label: '🛠️ نیروی خدمات، کمک‌بهیار و شرکتی بیمارستان',
    shortTitle: 'خدمات و کمک‌بهیار',
    greeting: 'خسته نباشی همکار زحمتکش (خدمات، کمک‌بهیار و نیروهای شرکتی)؛ چطور کمکت کنم؟',
    subtext: 'توضیح به زبان کاملاً ساده (همراه با پخش صوتی 🔊) بر اساس قانون کار، بیمه تامین اجتماعی و قراردادهای پیمانکاری.',
    avatarEmoji: '🛠️',
    badges: ['خدمات / کمک‌بهیار', 'قرارداد شرکتی (مشمول قانون کار)', '۴ سال سابقه'],
    scienceTitle: 'آموزش‌های ایمنی محیط بیمارستان، حقوق قانون کار و بیمه تامین اجتماعی',
    suggestedQuestions: [
      'شرکت پیمانکار بیمارستان عوض شده؛ تکلیف سنوات، عیدی و مرخصی‌های قبلی من چه می‌شود؟',
      'حق شیفت شب، تعطیل‌کاری و اضافه‌کاری در قانون کار چطور حساب می‌شود؟',
      'چطور بررسی کنم شرکت پیمانکار حق بیمه و عنوان شغلی سختی کارم را درست رد کرده؟'
    ]
  },
  hr: {
    key: 'hr',
    label: '💼 کارشناس منابع انسانی و کارگزینی (پنل HR)',
    shortTitle: 'کارشناس منابع انسانی (HR)',
    greeting: 'سلام کارشناس محترم منابع انسانی و کارگزینی (HR)؛ کدام بخشنامه را استعلام می‌کنید؟',
    subtext: 'پنل ویژه کارگزینی مراکز درمانی برای بررسی انطباق احکام، استعلام بخشنامه‌ها و پاسخ مستند به پرسنل.',
    avatarEmoji: '💼',
    badges: ['واحد منابع انسانی و کارگزینی', 'دسترسی بخشنامه‌های وزارتی', 'پنل سازمانی B2B'],
    scienceTitle: 'مجموعه مصوبات هیئت امنا، آیین‌نامه اداری استخدامی و رویه‌های دیوان عدالت اداری',
    suggestedQuestions: [
      'استعلام آخرین بخشنامه سقف اضافه‌کاری و معافیت مالیاتی فوق‌العاده خاص',
      'فرمول قانونی تنظیم ابلاغ جابجایی داخلی پرسنل جهت پیشگیری از شکایت در دیوان عدالت',
      'نحوه تطبیق احکام در زمان تبدیل وضعیت از شرکتی و پیمانی به رسمی'
    ]
  }
};

const COURSES_DATA: CourseItem[] = [
  {
    id: 'c-1',
    title: 'مسئولیت‌های حقوقی در اورژانس و ICU',
    badge: '۴ امتیاز بازآموزی',
    description: 'دارای مجوز سامانه آموزش مداوم • نحوه نوشتن گزارش پرستاری مستند برای پیشگیری از شکایات.',
    category: 'retrain',
    accent: 'teal'
  },
  {
    id: 'c-2',
    title: 'ایمنی پرتوها و قوانین حفاظت رادیولوژی و آزمایشگاه',
    badge: '۳ امتیاز بازآموزی',
    description: 'مستند به آخرین دستورالعمل حفاظت در برابر اشعه و استانداردهای ایمنی زیستی.',
    category: 'retrain',
    accent: 'blue'
  },
  {
    id: 'c-3',
    title: 'ضوابط قانونی و مهارت‌های کلینیک‌های زیبایی',
    badge: 'گواهی معتبر',
    description: 'حدود صلاحیت قانونی پرستار و ماما در مراکز زیبایی + قراردادهای استاندارد همکاری.',
    category: 'beauty',
    accent: 'amber'
  },
  {
    id: 'c-4',
    title: 'دوره هماهنگ‌کننده گردشگری سلامت (IPD)',
    badge: 'ارتقای درآمد',
    description: 'مهارت پذیرش، مستندسازی و پیگیری بیماران بین‌الملل برای بخش‌های بیمارستانی.',
    category: 'beauty',
    accent: 'teal'
  }
];

const DEMO_CASES: DemoCaseConfig[] = [
  {
    id: 'DC-01',
    title: 'DC-01: کسورات کارانه و اضافه‌کاری (payslip-sara.json)',
    route: '/payroll',
    prompt: 'سناریوی DC-01 (فیش سارا): چرا با وجود ۸۴ ساعت شیفت واقعی در بخش ویژه، در فیش حقوقی فقط ۶۵ ساعت اضافه‌کاری ثبت شده و مالیات افزایش یافته است؟',
    openModalOnLoad: 'scanner'
  },
  {
    id: 'DC-02',
    title: 'DC-02: جابجایی اجباری بخش بدون ابلاغ کتبی',
    route: '/transfer',
    prompt: 'سناریوی DC-02: ابلاغ شفاهی جابجایی فوری از بخش ویژه به بخش جنرال بدون رضایت پرستار؛ روند پیگیری اداری چیست؟'
  },
  {
    id: 'DC-03',
    title: 'DC-03: عدم موافقت با مرخصی استحقاقی و استعلاجی',
    route: '/leave',
    prompt: 'سناریوی DC-03: عدم تایید مرخصی استحقاقی به علت کمبود نیرو و نحوه ثبت درخواست رسمی جهت جلوگیری از سوخت شدن مرخصی.'
  },
  {
    id: 'DC-04',
    title: 'DC-04: ابهام در قرارداد، بیمه و تبدیل وضعیت',
    route: '/plan',
    prompt: 'سناریوی DC-04: بررسی بندهای قرارداد کار معین و نحوه پیگیری حق بیمه و ضریب سختی کار.'
  },
  {
    id: 'DC-05',
    title: 'DC-05: پرونده حساس نیازمند ارجاع به کارشناس (/expert)',
    route: '/expert',
    prompt: 'سناریوی DC-05: دریافت اخطار کتبی و ارجاع به هیئت رسیدگی به تخلفات اداری که نیازمند بررسی کارشناس انسانی است.',
    openModalOnLoad: 'consult'
  }
];

interface TiltBentoCardProps {
  children: React.ReactNode;
  className?: string;
  calmMotion: boolean;
}

const TiltBentoCard: React.FC<TiltBentoCardProps> = ({
  children,
  className = '',
  calmMotion
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>('perspective(1000px) rotateX(0deg) rotateY(0deg)');
  const [glowPos, setGlowPos] = useState<{ x: number; y: number; active: boolean }>({
    x: 50,
    y: 50,
    active: false
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pctX = (x / rect.width) * 100;
    const pctY = (y / rect.height) * 100;

    setGlowPos({ x: pctX, y: pctY, active: true });

    // Only apply 3D tilt if user enabled active motion, keeping night-shift mode ultra-calm by default
    if (!calmMotion) {
      const rotateY = ((x / rect.width) - 0.5) * 5;
      const rotateX = ((0.5 - (y / rect.height))) * 5;
      setTransformStyle(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.005, 1.005, 1.005)`);
    }
  };

  const handleMouseLeave = () => {
    setGlowPos((prev) => ({ ...prev, active: false }));
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: 'transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)'
      }}
      className={`relative rounded-[24px] backdrop-blur-xl border transition-colors duration-300 overflow-hidden shadow-[0_18px_36px_-14px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.14)] ${className}`}
    >
      {/* Dynamic subtle spotlight glow on hover */}
      {glowPos.active && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(380px circle at ${glowPos.x}% ${glowPos.y}%, rgba(20, 184, 166, 0.11), transparent 70%)`
          }}
        />
      )}
      <div className="relative z-10 h-full flex flex-col justify-between">{children}</div>
    </div>
  );
};

interface HealthcareOrbit3DProps {
  calmMotion: boolean;
  onToggleMotion: () => void;
  avatarEmoji: string;
}

const HealthcareOrbit3D: React.FC<HealthcareOrbit3DProps> = ({
  calmMotion,
  onToggleMotion,
  avatarEmoji
}) => {
  return (
    <div
      onClick={onToggleMotion}
      title="کلیک برای چرخش یا توقف منظومه سه‌بعدی سلامت (جلوگیری از خستگی چشم در شیفت شب)"
      className="relative w-40 h-36 flex-shrink-0 flex items-center justify-center select-none cursor-pointer group"
    >
      {/* Outer 3D Orbit Ring */}
      <div
        className={`absolute w-32 h-32 rounded-full border border-dashed transition-all duration-700 ${
          calmMotion
            ? 'border-teal-400/35'
            : 'border-teal-400/80 shadow-[0_0_25px_rgba(20,184,166,0.25)] animate-spin'
        }`}
        style={{ animationDuration: '28s' }}
      />

      {/* Inner tilted 3D ellipse ring */}
      <div className="absolute w-24 h-24 rounded-full border border-blue-400/25 transform rotate-45 scale-y-75" />

      {/* Central 3D Glassmorphic Globe + Question Mark Spark + Healthcare Team */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Floating 3D Question Mark Orb turning into AI insight */}
        <div
          className={`-mb-1.5 w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 via-orange-400 to-yellow-300 shadow-[0_4px_12px_rgba(245,158,11,0.5),inset_0_2px_3px_rgba(255,255,255,0.8)] flex items-center justify-center text-slate-950 font-black text-xs border border-white/80 transition-transform duration-500 ${
            !calmMotion ? 'animate-bounce' : 'group-hover:scale-110'
          }`}
        >
          ؟
        </div>

        {/* 3D Glassmorphic Earth Sphere */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-400 via-blue-600 to-indigo-950 shadow-[0_10px_25px_-4px_rgba(20,184,166,0.55),inset_0_3px_6px_rgba(255,255,255,0.55),inset_0_-4px_8px_rgba(0,0,0,0.6)] border border-white/40 flex items-center justify-center relative overflow-hidden">
          <svg className="w-8 h-8 text-teal-200/90 drop-shadow" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
          {/* Specular 3D highlight */}
          <div className="absolute top-1 right-2 w-4 h-2 rounded-full bg-white/40 blur-[1px] rotate-[-25deg]" />
        </div>

        {/* Healthcare Team Avatars Unified at Base */}
        <div className="flex items-center -space-x-2 space-x-reverse -mt-2.5 z-20">
          <div className="w-7 h-7 rounded-full bg-gradient-to-b from-teal-400 to-teal-700 border-2 border-slate-900 flex items-center justify-center text-xs shadow-md">
            {avatarEmoji}
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-b from-blue-400 to-indigo-700 border-2 border-slate-900 flex items-center justify-center text-sm shadow-lg scale-110">
            🤖
          </div>
          <div className="w-7 h-7 rounded-full bg-gradient-to-b from-purple-400 to-purple-700 border-2 border-slate-900 flex items-center justify-center text-xs shadow-md">
            👨‍⚕️
          </div>
        </div>
      </div>

      {/* Orbiting 3D Clay Spheres (Law, Retraining, Global Health) */}
      <div
        className={`absolute inset-0 transition-transform duration-1000 ${
          !calmMotion ? 'animate-spin' : ''
        }`}
        style={{ animationDuration: '22s' }}
      >
        <div
          title="مدار قوانین و بخشنامه‌ها"
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-gradient-to-br from-amber-300 to-amber-600 shadow-[0_4px_10px_rgba(245,158,11,0.45),inset_0_2px_2px_rgba(255,255,255,0.6)] flex items-center justify-center text-xs border border-white/60"
        >
          ⚖️
        </div>
        <div
          title="مدار بازآموزی و ارتقای شغلی"
          className="absolute bottom-2 right-1 w-7 h-7 rounded-full bg-gradient-to-br from-emerald-300 to-teal-600 shadow-[0_4px_10px_rgba(20,184,166,0.45),inset_0_2px_2px_rgba(255,255,255,0.6)] flex items-center justify-center text-xs border border-white/60"
        >
          🎓
        </div>
        <div
          title="مدار سلامت و گردشگری پزشکی"
          className="absolute bottom-2 left-1 w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-rose-600 shadow-[0_4px_10px_rgba(244,63,94,0.45),inset_0_2px_2px_rgba(255,255,255,0.6)] flex items-center justify-center text-xs border border-white/60"
        >
          🌍
        </div>
      </div>
    </div>
  );
};

export default function App() {
  // Theme & Ergonomic States
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [stealthMode, setStealthMode] = useState<boolean>(false);
  const [calmMotion, setCalmMotion] = useState<boolean>(true); // Paused by default to prevent ICU Alarm Fatigue
  const [workspaceMode, setWorkspaceMode] = useState<WorkspaceMode>('all');
  const [currentRole, setCurrentRole] = useState<RoleKey>('nurse');
  const [showDevRepoBar, setShowDevRepoBar] = useState<boolean>(false);

  // Chat, Voice & TTS States
  const [chatInput, setChatInput] = useState<string>('');
  const [isRecordingVoice, setIsRecordingVoice] = useState<boolean>(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [copiedDraftId, setCopiedDraftId] = useState<string | null>(null);

  // Modals State
  const [activeModal, setActiveModal] = useState<
    'scanner' | 'auth' | 'consult' | 'calc' | 'memory' | null
  >(null);

  // Interactive Side-by-Side Payslip OCR State
  const [ocrDocType, setOcrDocType] = useState<string>('فیش حقوقی و کارانه (مهر ۱۴۰۵)');
  const [ocrOvertimeHours, setOcrOvertimeHours] = useState<number>(65);
  const [ocrActualHours, setOcrActualHours] = useState<number>(84);
  const [ocrTaxAmount, setOcrTaxAmount] = useState<string>('28,500,000');
  const [activeHighlightRow, setActiveHighlightRow] = useState<HighlightRowId>('overtime_hours');

  // Hardship Calculator & Course Tabs State
  const [serviceYears, setServiceYears] = useState<number>(12);
  const [courseTab, setCourseTab] = useState<'retrain' | 'beauty'>('retrain');
  const [regPhone, setRegPhone] = useState<string>('');
  const [regRole, setRegRole] = useState<RoleKey>('nurse');

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [memoryItems, setMemoryItems] = useState<Array<{ id: string; label: string; value: string }>>([
    { id: 'm-1', label: 'بخش محل خدمت', value: 'ICU جنرال (شیفت در گردش)' },
    { id: 'm-2', label: 'وضعیت استخدام', value: 'رسمی آزمایشی • بیمارستان دولتی' },
    { id: 'm-3', label: 'سابقه بالینی', value: '۶ سال سابقه مشمول قانون بهره‌وری' }
  ]);

  const [reminders, setReminders] = useState<ReminderItem[]>([
    {
      id: 'rem-1',
      title: '⏳ پیگیری کسورات اضافه‌کار مهر',
      badgeText: '۴ روز مانده',
      status: 'warning',
      nextStep: 'گام بعدی: تحویل نامه درخواست ریزِ کارکرد به دبیرخانه و گرفتن شماره ثبت.'
    },
    {
      id: 'rem-2',
      title: '✅ تطبیق سنوات سختی کار',
      badgeText: 'آماده تحویل',
      status: 'ready',
      nextStep: 'مدارک لازم لیست شد؛ هر زمان مایل بودید می‌توانید از پوشه شخصی حذفش کنید.'
    }
  ]);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'ai',
      timestamp: 'هم‌اکنون',
      text: 'من شرایط کاری شما را در نظر دارم تا سؤالات تکراری نپرسم. می‌توانید با دکمهٔ 🎙️ میکروفون صحبت کنید، عکس فیش یا نامه را بفرستید، یا یکی از پرسش‌های پیشنهادی زیر را لمس کنید:',
      knownRegulations:
        'فقط بخشنامه‌های معتبر و فعال وزارت بهداشت، قانون ارتقای بهره‌وری و قانون کار مبنا قرار می‌گیرند و بخشنامه‌های منسوخ خودکار فیلتر می‌شوند.',
      needsEvidence:
        'در مسائل مالی و اداری، پیش از دیدن مستنداتی مثل تایم‌شیت بخش یا ابلاغ کتبی کارگزینی، هیچ پیش‌داوری قطعی انجام نمی‌شود.',
      similarCases:
        'مشابهت‌ها و تفاوت‌های موضوع شما با پرونده‌های قبلیِ بخش حقوقی نظام پرستاری توضیح داده می‌شود، اما هرگز به معنای تضمین قطعی نتیجه نیست.'
    }
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 4200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const scrollToLatestMessage = () => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  const handleRoleChange = (newRole: RoleKey) => {
    setCurrentRole(newRole);
    setRegRole(newRole);
    triggerToast(`شرایط شغلی و محتوای Bento Box مطابق جایگاه «${ROLE_PROFILES[newRole].shortTitle}» تنظیم شد.`);
  };

  const handleToggleStealth = () => {
    setStealthMode((prev) => {
      const next = !prev;
      triggerToast(
        next
          ? 'حالت محرمانه در استیشن فعال شد: عناوین حساس و مبالغ تا زمان لمس یا نگه‌داشتن موس محو شدند.'
          : 'حالت محرمانه در استیشن غیرفعال شد.'
      );
      return next;
    });
  };

  const handleToggleSpeech = (msgId: string) => {
    if (speakingMessageId === msgId) {
      setSpeakingMessageId(null);
      return;
    }
    setSpeakingMessageId(msgId);
    triggerToast('پخش صوتی پاسخ با لحن آرام و شمرده آغاز شد.');
    setTimeout(() => {
      setSpeakingMessageId((curr) => (curr === msgId ? null : curr));
    }, 4000);
  };

  const submitQuestion = (questionText: string) => {
    const trimmed = questionText.trim();
    if (!trimmed) return;

    if (workspaceMode === 'growth') {
      setWorkspaceMode('all');
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: 'هم‌اکنون',
      text: trimmed
    };

    const aiMsg: ChatMessage = {
      id: `ai-${Date.now() + 1}`,
      sender: 'ai',
      timestamp: 'هم‌اکنون',
      text: `بررسی اولیه برای «${ROLE_PROFILES[currentRole].shortTitle}» انجام شد:`,
      knownRegulations:
        'طبق قانون ارتقای بهره‌وری و آیین‌نامه اداری استخدامی، هرگونه تغییر در ساعات کارکرد ثبت‌شده یا جابجایی واحد سازمانی نیازمند مستندسازی در اتوماسیون و ابلاغ رسمی است.',
      needsEvidence:
        'باید مشخص شود آیا کسری ساعت یا تغییر ابلاغ، به دلیل سقف بودجه ماهانه بخش به ماه آتی منتقل شده یا در ثبت اولیه کارگزینی مغایرت وجود دارد.',
      similarCases:
        'در پرونده‌های مشابه بررسی‌شده در بخش حقوقی نظام پرستاری، ثبت درخواست مکتوب «استعلام ریزِ کارکرد و مستندات» در دبیرخانه، در بیش از ۸۰٪ موارد بدون نیاز به شکایت بیرونی مسئله را حل کرده است.'
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setChatInput('');
    scrollToLatestMessage();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitQuestion(chatInput);
  };

  const handleFinishVoiceRecording = () => {
    setIsRecordingVoice(false);
    const transcribed =
      'من این ماه ۸۴ ساعت شیفت اضافه‌کار رفتم ولی توی فیش حقوقی فقط ۶۵ ساعت برام رد شده و مالیاتم هم خیلی زیاد کم شده؛ از کجا پیگیری کنم؟';
    setChatInput(transcribed);
    triggerToast('صدای شما با موفقیت به متن تبدیل شد. دکمه «پرسش» را بزنید.');
  };

  const handleGenerateDraftLetter = () => {
    const draftMsg: ChatMessage = {
      id: `draft-${Date.now()}`,
      sender: 'draft',
      timestamp: 'پیش‌نویس قابل ویرایش',
      draftContent: `مدیریت محترم منابع انسانی و کارگزینی / مترون محترم بیمارستان\nبا سلام و احترام؛\nاحتراماً به استحضار می‌رساند اینجانب (${ROLE_PROFILES[currentRole].shortTitle}) شاغل در آن مرکز، با بررسی فیش حقوقی ماه جاری متوجه مغایرت میان ساعات شیفت انجام‌شده در برنامه رسمی بخش و ساعات اضافه‌کاری ثبت‌شده در فیش گردیده‌ام. خواهشمند است دستور فرمایید ضمن بررسی لیست حضور و غیاب، ریزِ محاسبات کارکرد به اینجانب اعلام یا در کارکرد ماه آتی اعمال گردد.`
    };
    setMessages((prev) => [...prev, draftMsg]);
    scrollToLatestMessage();
    triggerToast('پیش‌نویس نامه اداری در پنجره گفت‌وگو آماده شد.');
  };

  const handleConfirmOcr = () => {
    const diff = Math.max(0, ocrActualHours - ocrOvertimeHours);
    const ocrMsg: ChatMessage = {
      id: `ocr-${Date.now()}`,
      sender: 'ocr_result',
      timestamp: 'تایید چشمی کاربر',
      ocrSummary: {
        docType: ocrDocType,
        recordedHours: ocrOvertimeHours,
        actualHours: ocrActualHours,
        diffHours: diff,
        taxAmount: ocrTaxAmount
      }
    };
    setMessages((prev) => [...prev, ocrMsg]);
    setActiveModal(null);
    scrollToLatestMessage();
    triggerToast('تحلیل فیش حقوقی پس از تایید چشمی شما در گفت‌وگو ثبت شد.');
  };

  const activeProfile = ROLE_PROFILES[currentRole];
  const stealthBlurClass = stealthMode
    ? 'blur-[6px] hover:blur-none focus:blur-none active:blur-none transition-all duration-200 select-none cursor-pointer'
    : 'transition-all duration-200';

  const cardThemeClass = darkMode
    ? 'bg-[#131C2E]/80 border-white/10 hover:border-teal-500/40 text-slate-100'
    : 'bg-white/90 border-slate-200/90 hover:border-teal-500/50 text-slate-800';

  const subCardThemeClass = darkMode
    ? 'bg-[#080D17]/90 border-white/10 text-slate-200'
    : 'bg-slate-100/90 border-slate-300/70 text-slate-700';

  const bonusYears = Math.min(serviceYears * 0.5, 10).toFixed(1);
  const totalEffectiveYears = (serviceYears + parseFloat(bonusYears)).toFixed(1);

  return (
    <div
      dir="rtl"
      className={`min-h-screen font-sans transition-colors duration-300 pb-16 ${
        darkMode ? 'bg-[#0B111E] text-slate-100' : 'bg-slate-100 text-slate-800'
      }`}
      style={{
        fontFamily: "'Vazirmatn', system-ui, -apple-system, sans-serif",
        fontFeatureSettings: '"ss01", "tnum"'
      }}
    >
      {/* Load Vazirmatn Persian Font */}
      <link
        href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css"
        rel="stylesheet"
        type="text/css"
      />

      {/* Ambient Low-Glare Night Shift Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-36 -right-36 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-36 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main Responsive Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-3 sm:px-6 pt-3 sm:pt-5">
        {/* =====================================================================
            TOP CONTEXT HEADER: IDENTITY, SOCIOLOGICAL ROLES & STEALTH MODE
           ===================================================================== */}
        <header
          className={`rounded-[24px] backdrop-blur-xl border px-4 py-3.5 mb-4 flex flex-wrap items-center justify-between gap-3 shadow-lg ${cardThemeClass}`}
        >
          {/* Brand Logo & Trust Badge */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-[18px] bg-gradient-to-br from-teal-400 to-blue-600 shadow-[0_8px_16px_-4px_rgba(20,184,166,0.5),inset_0_2px_3px_rgba(255,255,255,0.4)] flex items-center justify-center text-white flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-black text-base sm:text-lg tracking-tight">حامی‌درمان</h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 dark:text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>متصل به بخشنامه‌های وزارت بهداشت و نظام پرستاری</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm opacity-75 mt-0.5">
                همراه حقوقی، اداری و شغلی کادر سلامت (پاسخ مستند و قابل بررسی، بدون ایجاد اطمینان کاذب)
              </p>
            </div>
          </div>

          {/* Sociological Role Switcher & Active Memory Context */}
          <div
            className={`flex flex-wrap items-center gap-2 px-3.5 py-2 rounded-2xl border ${subCardThemeClass}`}
          >
            <span className="text-xs font-extrabold text-teal-500 flex items-center gap-1">
              <span>🪪 شرایط شغلی من:</span>
            </span>

            <select
              value={currentRole}
              onChange={(e) => handleRoleChange(e.target.value as RoleKey)}
              className={`text-xs sm:text-sm font-bold px-3 py-1.5 rounded-xl border border-teal-500/40 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer ${
                darkMode ? 'bg-[#131C2E] text-white' : 'bg-white text-slate-800'
              }`}
            >
              {Object.values(ROLE_PROFILES).map((role) => (
                <option key={role.key} value={role.key}>
                  {role.label}
                </option>
              ))}
            </select>

            <div className={`hidden xl:flex items-center gap-1.5 text-xs ${stealthBlurClass}`}>
              {activeProfile.badges.map((badge, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-teal-500/15 text-teal-600 dark:text-teal-300 border border-teal-500/25 font-bold"
                >
                  {badge}
                </span>
              ))}
            </div>

            <button
              onClick={() => setActiveModal('memory')}
              className="text-xs font-extrabold text-teal-500 hover:underline mr-1"
            >
              ویرایش
            </button>
          </div>

          {/* Right Controls: Station Stealth Mode, Auth & Night Shift Theme */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleStealth}
              title="مخفی‌سازی عناوین حساس پرونده و اعداد فیش وقتی در استیشن پرستاری یا کنار همکاران هستید"
              className={`px-3 py-2 rounded-xl border text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                stealthMode
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                  : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-500 border-amber-500/40'
              }`}
            >
              {stealthMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>حالت محرمانه در استیشن: {stealthMode ? 'روشن' : 'خاموش'}</span>
            </button>

            <button
              onClick={() => setActiveModal('auth')}
              className="px-3.5 py-2 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 text-white text-xs font-extrabold shadow-[0_6px_16px_-3px_rgba(59,130,246,0.45),inset_0_2px_4px_rgba(255,255,255,0.35)] transition"
            >
              ورود / ثبت‌نام
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              title="تغییر حالت شب (مناسب شیفت شب) و روز"
              className={`p-2.5 rounded-xl border transition hover:scale-105 ${subCardThemeClass}`}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-amber-300" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>
          </div>
        </header>

        {/* =====================================================================
            EMOTIONAL WORKSPACE FILTER BAR + CALM MOTION & DEV REPO SWITCH
           ===================================================================== */}
        <div
          className={`rounded-[22px] backdrop-blur-xl border px-4 py-3 mb-5 flex flex-wrap items-center justify-between gap-3 ${cardThemeClass}`}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold opacity-75 flex items-center gap-1 ml-1">
              <Layers className="w-4 h-4 text-teal-400" />
              <span>حالت نمایش صفحه:</span>
            </span>

            <button
              onClick={() => setWorkspaceMode('all')}
              className={`text-xs sm:text-sm font-extrabold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 ${
                workspaceMode === 'all'
                  ? 'bg-teal-500 text-slate-950 shadow-[0_4px_12px_rgba(20,184,166,0.4)]'
                  : `${subCardThemeClass} hover:border-teal-500/40`
              }`}
            >
              <span>🍱 نمای کامل (همه جعبه‌های Bento)</span>
            </button>

            <button
              onClick={() => {
                setWorkspaceMode('legal');
                triggerToast('حالت تمرکز حقوقی فعال شد: بخش‌های بازآموزی و زیبایی موقتاً پنهان شدند.');
              }}
              className={`text-xs sm:text-sm font-extrabold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 ${
                workspaceMode === 'legal'
                  ? 'bg-teal-500 text-slate-950 shadow-[0_4px_12px_rgba(20,184,166,0.4)]'
                  : `${subCardThemeClass} hover:border-teal-500/40`
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>فقط میز کار حقوقی و فیش (بدون تبلیغ دوره)</span>
            </button>

            <button
              onClick={() => {
                setWorkspaceMode('growth');
                triggerToast('باشگاه بازآموزی، زیبایی، گردشگری سلامت و منابع علمی باز شد.');
              }}
              className={`text-xs sm:text-sm font-extrabold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 ${
                workspaceMode === 'growth'
                  ? 'bg-amber-500 text-slate-950 shadow-[0_4px_12px_rgba(245,158,11,0.4)]'
                  : `${subCardThemeClass} hover:border-amber-500/40`
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>باشگاه بازآموزی، زیبایی، گردشگری و مقالات</span>
            </button>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Calm Motion Toggle for ICU Night Shift */}
            <button
              onClick={() => setCalmMotion(!calmMotion)}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition flex items-center gap-1.5 ${subCardThemeClass}`}
            >
              {calmMotion ? (
                <>
                  <PlayCircle className="w-4 h-4 text-teal-400" />
                  <span>انیمیشن سه‌بعدی: آرام (ضد خستگی شیفت شب)</span>
                </>
              ) : (
                <>
                  <PauseCircle className="w-4 h-4 text-amber-400" />
                  <span>انیمیشن سه‌بعدی: فعال (مدار چرخان + کارت 3D)</span>
                </>
              )}
            </button>

            {/* Developer Next.js Repository Inspector Drawer */}
            <button
              onClick={() => setShowDevRepoBar(!showDevRepoBar)}
              className="text-xs font-bold px-3 py-1.5 rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/25 transition flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>پنل تست ریپازیتوری Next.js</span>
            </button>
          </div>
        </div>

        {/* COLLAPSIBLE NEXT.JS REPOSITORY INSPECTOR */}
        {showDevRepoBar && (
          <div className="rounded-[22px] p-4 mb-5 border-2 border-indigo-500/40 bg-indigo-950/40 backdrop-blur-xl text-slate-100 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-extrabold text-indigo-300">
                  🗂️ شبیه‌ساز مسیرهای ریپازیتوری (mehdinikzad68/nursing-assistant):
                </span>
                {DEMO_CASES.map((dc) => (
                  <button
                    key={dc.id}
                    onClick={() => {
                      if (dc.openModalOnLoad === 'scanner') setActiveModal('scanner');
                      if (dc.openModalOnLoad === 'consult') setActiveModal('consult');
                      submitQuestion(dc.prompt);
                    }}
                    className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-teal-500/25 text-teal-300 border border-teal-500/30 transition"
                  >
                    {dc.route} ({dc.id})
                  </button>
                ))}
              </div>
              <span className="text-xs text-indigo-200/80 font-mono">
                data/mock/payslip-sara.json • DC-01..DC-05
              </span>
            </div>
          </div>
        )}

        {/* =====================================================================
            MAIN BENTO BOX GRID (4-Column Responsive Architecture)
           ===================================================================== */}
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* =================================================================
              BOX 1: HEART OF THE SYSTEM (2x2 Span) - 3D ORBIT + GUIDED AI CHAT
             ================================================================= */}
          {(workspaceMode === 'all' || workspaceMode === 'legal') && (
            <TiltBentoCard
              calmMotion={calmMotion}
              className={`md:col-span-2 lg:col-span-2 lg:row-span-2 p-5 sm:p-6 ${cardThemeClass}`}
            >
              <div>
                {/* Top Hero Header + 3D Orbit Scene */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-300/40 dark:border-white/10">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/15 text-teal-500 dark:text-teal-300 text-xs font-extrabold mb-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>همراه تخصصی شما با هماهنگی بخش حقوقی نظام پرستاری</span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-black leading-relaxed">
                      {activeProfile.greeting}
                    </h2>
                    <p className="text-xs sm:text-sm opacity-80 mt-1 leading-relaxed">
                      {activeProfile.subtext}
                    </p>
                  </div>

                  {/* Interactive 3D Healthcare Orbit */}
                  <HealthcareOrbit3D
                    calmMotion={calmMotion}
                    onToggleMotion={() => setCalmMotion(!calmMotion)}
                    avatarEmoji={activeProfile.avatarEmoji}
                  />
                </div>

                {/* Chat Messages Stream */}
                <div className="my-4 space-y-3.5 max-h-[370px] overflow-y-auto pl-1">
                  {messages.map((msg) => (
                    <div key={msg.id} className={stealthBlurClass}>
                      {msg.sender === 'user' && (
                        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 text-white text-sm mr-auto max-w-[90%] shadow-md leading-7">
                          <div className="text-xs font-bold opacity-85 mb-0.5">پرسش شما:</div>
                          <div>{msg.text}</div>
                        </div>
                      )}

                      {msg.sender === 'ai' && (
                        <div className={`p-4 rounded-2xl border text-sm leading-7 ${subCardThemeClass}`}>
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <span className="font-extrabold text-teal-500 flex items-center gap-1.5">
                              <span>🤖 راهنمای هوشمند (تفکیک قانون از تجربه مشابه)</span>
                            </span>

                            {/* Audio TTS Button with Animated Equalizer when active */}
                            <button
                              onClick={() => handleToggleSpeech(msg.id)}
                              className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-teal-500/15 hover:bg-teal-500/25 text-teal-500 dark:text-teal-300 border border-teal-500/30 flex items-center gap-1.5 transition"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                              {speakingMessageId === msg.id ? (
                                <span className="flex items-center gap-1">
                                  <span>در حال خواندن صوتی</span>
                                  <span className="inline-flex items-end gap-0.5 h-3">
                                    <span className="w-0.5 h-3 bg-teal-400 animate-pulse" />
                                    <span className="w-0.5 h-2 bg-teal-400 animate-bounce" />
                                    <span className="w-0.5 h-3 bg-teal-400 animate-pulse" />
                                  </span>
                                </span>
                              ) : (
                                <span>شنیدن صوتی پاسخ</span>
                              )}
                            </button>
                          </div>

                          <p className="mb-3">{msg.text}</p>

                          {/* 3-Tier Legal Transparency Cards */}
                          <div className="space-y-2 text-xs sm:text-sm">
                            {msg.knownRegulations && (
                              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25">
                                <span className="font-extrabold text-emerald-500 block mb-0.5">
                                  🟢 ۱. آنچه طبق مقررات و بخشنامه‌های معتبر مشخص است:
                                </span>
                                <span>{msg.knownRegulations}</span>
                              </div>
                            )}

                            {msg.needsEvidence && (
                              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25">
                                <span className="font-extrabold text-amber-500 block mb-0.5">
                                  🟡 ۲. آنچه هنوز مشخص نیست و نیاز به بررسی مدارک دارد:
                                </span>
                                <span>{msg.needsEvidence}</span>
                              </div>
                            )}

                            {msg.similarCases && (
                              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/25">
                                <span className="font-extrabold text-blue-400 block mb-0.5">
                                  ⚖️ ۳. تجربه پرونده‌های مشابه در بخش حقوقی نظام پرستاری:
                                </span>
                                <span>{msg.similarCases}</span>
                              </div>
                            )}
                          </div>

                          {/* Quick Action Triggers inside AI Response */}
                          <div className="flex flex-wrap gap-2 mt-3 pt-2.5 border-t border-slate-300/30 dark:border-white/10">
                            <button
                              onClick={handleGenerateDraftLetter}
                              className="px-3 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs flex items-center gap-1 transition"
                            >
                              <FileSignature className="w-3.5 h-3.5" />
                              <span>پیش‌نویس نامه اداری</span>
                            </button>
                            <button
                              onClick={() => setActiveModal('scanner')}
                              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-500 dark:text-amber-300 border border-amber-500/30 font-bold text-xs flex items-center gap-1 transition"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>تطبیق چشمی با عکس فیش</span>
                            </button>
                            <button
                              onClick={() => setActiveModal('consult')}
                              className="px-3 py-1.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-500 dark:text-blue-300 border border-blue-500/30 font-bold text-xs flex items-center gap-1 transition"
                            >
                              <UserCheck className="w-3.5 h-3.5" />
                              <span>ارجاع به کارشناس انسانی</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {msg.sender === 'draft' && (
                        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-xs sm:text-sm space-y-2.5">
                          <div className="flex items-center justify-between font-extrabold text-amber-500">
                            <span>✍️ پیش‌نویس نامه اداری (تصمیم نهایی برای ویرایش و ارسال با شماست)</span>
                            <button
                              onClick={() => {
                                navigator.clipboard?.writeText(msg.draftContent || '');
                                setCopiedDraftId(msg.id);
                                triggerToast('متن نامه در حافظه کپی شد.');
                                setTimeout(() => setCopiedDraftId(null), 2500);
                              }}
                              className="px-3 py-1 rounded-xl bg-amber-500 text-slate-950 text-xs font-extrabold flex items-center gap-1"
                            >
                              {copiedDraftId === msg.id ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>کپی شد</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>کپی متن نامه</span>
                                </>
                              )}
                            </button>
                          </div>
                          <textarea
                            defaultValue={msg.draftContent}
                            className={`w-full h-28 p-3 rounded-xl border border-amber-500/30 text-xs sm:text-sm leading-7 focus:outline-none ${
                              darkMode ? 'bg-[#080D17] text-slate-100' : 'bg-white text-slate-800'
                            }`}
                          />
                        </div>
                      )}

                      {msg.sender === 'ocr_result' && msg.ocrSummary && (
                        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-xs sm:text-sm space-y-2 leading-7">
                          <div className="font-extrabold text-emerald-500">
                            ✅ تحلیل سند پس از تایید چشمی شما ({msg.ocrSummary.docType}):
                          </div>
                          <p>
                            ساعت اضافه‌کاری در فیش{' '}
                            <strong className="tabular-nums">{msg.ocrSummary.recordedHours} ساعت</strong> و
                            شیفت واقعی شما{' '}
                            <strong className="tabular-nums">{msg.ocrSummary.actualHours} ساعت</strong> است (
                            <strong className="tabular-nums text-amber-400">
                              {msg.ocrSummary.diffHours} ساعت کسری ثبت
                            </strong>
                            ). کسور مالیات ثبت‌شده نیز{' '}
                            <strong className="tabular-nums">{msg.ocrSummary.taxAmount} ریال</strong> است.
                          </p>
                          <p className="text-xs opacity-85">
                            <strong>مسیر گام‌به‌گام پیگیری:</strong> ۱. دریافت تصویر برنامه شیفت ماهانه با امضای
                            سرپرستار ← ۲. ثبت نامه درخواست بررسی کارکرد در اتوماسیون اداری پیش از بسته شدن
                            لیست ماه بعد.
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
              </div>

              {/* Bottom Guided Chips + Voice Whisper Input + Offline Auto-Save */}
              <div className="pt-3 border-t border-slate-300/40 dark:border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold opacity-75">
                    💡 پرتکرارترین مسائل همکاران هم‌رشته شما (به سبک پیشنهادهای جمینای):
                  </span>
                  <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                    <span>
                      {chatInput.trim().length > 0
                        ? '✅ پیش‌نویس در حافظه گوشی ذخیره شد (مقاوم در برابر قطع آنتن بخش)'
                        : '💾 ذخیره خودکار در نقاط کور آنتن‌دهی بیمارستان'}
                    </span>
                  </span>
                </div>

                {/* Gemini-style Follow-up Suggestion Chips */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {activeProfile.suggestedQuestions.map((q, index) => (
                    <button
                      key={index}
                      onClick={() => submitQuestion(q)}
                      className="text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-2xl bg-teal-500/15 hover:bg-teal-500/25 text-teal-600 dark:text-teal-200 border border-teal-500/30 transition text-right"
                    >
                      ✨ {q}
                    </button>
                  ))}
                </div>

                {/* Active Voice Whisper Waveform Banner */}
                {isRecordingVoice && (
                  <div className="mb-3 p-3 rounded-2xl bg-rose-500/15 border border-rose-500/40 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                      <span className="text-xs sm:text-sm font-extrabold text-rose-400">
                        🎙️ در حال شنیدن صدای شما (حالت صدای آهسته مخصوص استیشن پرستاری)...
                      </span>
                      {/* Animated Equalizer Bars */}
                      <div className="hidden sm:flex items-end gap-1 h-4">
                        <span className="w-1 h-2 bg-rose-400 rounded animate-pulse" />
                        <span className="w-1 h-4 bg-rose-400 rounded animate-bounce" />
                        <span className="w-1 h-3 bg-rose-400 rounded animate-pulse" />
                        <span className="w-1 h-4 bg-rose-400 rounded animate-bounce" />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleFinishVoiceRecording}
                      className="px-3.5 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white text-xs font-extrabold transition"
                    >
                      تبدیل به متن ✓
                    </button>
                  </div>
                )}

                {/* Input Form */}
                <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveModal('scanner')}
                    title="ارسال عکس فیش حقوقی، حکم کارگزینی یا نامه اداری"
                    className={`p-3.5 rounded-2xl border transition flex-shrink-0 hover:border-teal-400 ${subCardThemeClass}`}
                  >
                    <Camera className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsRecordingVoice(!isRecordingVoice)}
                    title="خسته‌اید؟ به جای تایپ کردن، مشکلتان را صوتی بگویید"
                    className="px-3.5 py-3.5 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-500 dark:text-amber-300 border border-amber-500/40 transition flex items-center gap-1.5 flex-shrink-0 font-extrabold text-xs"
                  >
                    <Mic className="w-4 h-4" />
                    <span className="hidden sm:inline">بیان صوتی</span>
                  </button>

                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="بنویسید یا با دکمه 🎙️ بگویید (مثلاً: برای اعتراض به این نامه از کجا شروع کنم؟)..."
                    className={`flex-1 text-sm px-4 py-3.5 rounded-2xl border focus:outline-none focus:border-teal-400 ${
                      darkMode
                        ? 'bg-[#060A12] border-white/15 text-white'
                        : 'bg-white border-slate-300 text-slate-800'
                    }`}
                  />

                  <button
                    type="submit"
                    className="px-5 py-3.5 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 hover:from-teal-300 hover:to-teal-500 text-slate-950 font-black text-sm shadow-[0_6px_16px_-3px_rgba(20,184,166,0.45),inset_0_2px_4px_rgba(255,255,255,0.45)] flex items-center gap-1.5 flex-shrink-0 transition"
                  >
                    <span>پرسش</span>
                    <Send className="w-4 h-4 rotate-180" />
                  </button>
                </form>
              </div>
            </TiltBentoCard>
          )}

          {/* =================================================================
              BOX 2: SPECIALIZED 3D CONSULTATION ROOM (1x1)
             ================================================================= */}
          {(workspaceMode === 'all' || workspaceMode === 'legal') && (
            <TiltBentoCard calmMotion={calmMotion} className={`p-5 ${cardThemeClass}`}>
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    همراهی کارشناس انسانی
                  </span>
                  <span className="text-xs opacity-70 font-bold">موارد حساس</span>
                </div>
                <h3 className="font-black text-base sm:text-lg mb-1">
                  اتاق مشاوره و ارجاع به کارشناس
                </h3>
                <p className="text-xs sm:text-sm opacity-80 leading-6">
                  وقتی موضوع حساس است (هیئت تخلفات، دیوان عدالت یا کسر حقوق سنگین) و نیاز به بررسی کارشناس
                  حقوقی نظام پرستاری دارد.
                </p>
              </div>

              {/* 3D Scene: Legal Advisor sitting across from Nurse Avatar */}
              <div
                onClick={() => setActiveModal('consult')}
                className="my-4 p-3.5 rounded-2xl bg-gradient-to-br from-blue-950/90 via-indigo-950/80 to-slate-900 border border-blue-500/30 flex items-center justify-around cursor-pointer group"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-[18px] bg-gradient-to-br from-blue-400 to-indigo-600 shadow-[0_8px_16px_rgba(0,0,0,0.4),inset_0_2px_3px_rgba(255,255,255,0.35)] flex items-center justify-center text-2xl group-hover:scale-105 transition">
                    👨‍⚖️
                  </div>
                  <span className="text-xs font-bold text-blue-200 mt-1.5">کارشناس حقوقی</span>
                </div>

                <div className="flex flex-col items-center px-2">
                  <span className="text-[11px] text-teal-300 font-bold mb-1">بررسی رو در رو</span>
                  <div className="w-16 h-6 rounded-t-xl bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 border-t-2 border-amber-400/80 flex items-center justify-center shadow-inner">
                    <span className="text-xs">📋⚖️</span>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-[18px] bg-gradient-to-br from-teal-400 to-teal-700 shadow-[0_8px_16px_rgba(0,0,0,0.4),inset_0_2px_3px_rgba(255,255,255,0.35)] flex items-center justify-center text-2xl group-hover:scale-105 transition">
                    {activeProfile.avatarEmoji}
                  </div>
                  <span className="text-xs font-bold text-teal-200 mt-1.5">شما</span>
                </div>
              </div>

              <button
                onClick={() => setActiveModal('consult')}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 text-white text-xs sm:text-sm font-extrabold shadow-[0_6px_16px_-3px_rgba(59,130,246,0.45),inset_0_2px_4px_rgba(255,255,255,0.35)] flex items-center justify-center gap-2 transition"
              >
                <span>درخواست بررسی توسط کارشناس</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </TiltBentoCard>
          )}

          {/* =================================================================
              BOX 3: SMART DOCUMENT READER & CALCULATORS (1x1)
             ================================================================= */}
          {(workspaceMode === 'all' || workspaceMode === 'legal') && (
            <TiltBentoCard calmMotion={calmMotion} className={`p-5 ${cardThemeClass}`}>
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-teal-500/20 text-teal-500 dark:text-teal-300 border border-teal-500/30">
                    فیش‌خوان و حکم‌خوان
                  </span>
                  <span className="text-xs text-emerald-500 font-extrabold">تایید چشمی دوطرفه</span>
                </div>
                <h3 className="font-black text-base sm:text-lg mb-1">
                  بررسی عکس فیش، حکم و قرارداد
                </h3>
                <p className="text-xs sm:text-sm opacity-80 leading-6">
                  عکس فیش یا حکم را کنار فرم می‌گذاریم تا ابتدا اعداد خوانده‌شده را به چشم خودتان تایید
                  کنید و بعد تحلیل دقیق بگیرید.
                </p>
              </div>

              <div
                onClick={() => setActiveModal('scanner')}
                className={`my-3.5 p-3.5 rounded-2xl border-2 border-dashed border-teal-500/50 hover:border-teal-400 cursor-pointer transition group ${subCardThemeClass}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-[18px] bg-gradient-to-br from-teal-400 to-emerald-600 shadow-[0_8px_16px_rgba(0,0,0,0.3),inset_0_2px_3px_rgba(255,255,255,0.35)] flex items-center justify-center text-2xl text-white flex-shrink-0 group-hover:scale-105 transition">
                    📑
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black group-hover:text-teal-400 transition">
                      باز کردن فیش‌خوان و حکم‌خوان
                    </div>
                    <div className="text-xs opacity-75 mt-0.5">
                      نمایش همزمان عکس فیش + هایلایت ردیف‌ها
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setActiveModal('calc')}
                  className={`text-xs font-extrabold py-2.5 px-2.5 rounded-xl border hover:border-teal-400 transition flex items-center justify-center gap-1.5 ${subCardThemeClass}`}
                >
                  <Calculator className="w-4 h-4 text-teal-400" />
                  <span>محاسبه سختی کار</span>
                </button>
                <button
                  onClick={handleGenerateDraftLetter}
                  className={`text-xs font-extrabold py-2.5 px-2.5 rounded-xl border hover:border-teal-400 transition flex items-center justify-center gap-1.5 ${subCardThemeClass}`}
                >
                  <FileSignature className="w-4 h-4 text-amber-400" />
                  <span>پیش‌نویس نامه</span>
                </button>
              </div>
            </TiltBentoCard>
          )}

          {/* =================================================================
              BOX 4: PERSONAL CASE FILE & STEALTH REMINDERS (1x1)
             ================================================================= */}
          {(workspaceMode === 'all' || workspaceMode === 'legal') && (
            <TiltBentoCard calmMotion={calmMotion} className={`p-5 ${cardThemeClass}`}>
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
                    پرونده شخصی و یادآور
                  </span>
                  <button
                    onClick={handleToggleStealth}
                    className="text-xs text-amber-500 hover:underline font-extrabold flex items-center gap-1"
                  >
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>{stealthMode ? 'نمایش عناوین' : 'مخفی‌سازی عناوین'}</span>
                  </button>
                </div>
                <h3 className="font-black text-base sm:text-lg mb-2">
                  پیگیری‌های باز و مهلت‌های مهم
                </h3>

                <div className="space-y-2.5">
                  {reminders.map((rem) => (
                    <div
                      key={rem.id}
                      className={`p-3 rounded-xl border ${subCardThemeClass} ${stealthBlurClass}`}
                    >
                      <div className="flex items-center justify-between text-xs sm:text-sm font-extrabold">
                        <span
                          className={
                            rem.status === 'warning'
                              ? 'text-amber-500'
                              : rem.status === 'ready'
                              ? 'text-emerald-500'
                              : 'text-purple-400'
                          }
                        >
                          {rem.title}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-white/10 tabular-nums">
                          {rem.badgeText}
                        </span>
                      </div>
                      <p className="text-xs opacity-80 mt-1.5 leading-5">{rem.nextStep}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  const newRem: ReminderItem = {
                    id: `rem-${Date.now()}`,
                    title: '🔔 یادآور پیامکی پیگیری پاسخ کارگزینی',
                    badgeText: 'ثبت شد',
                    status: 'new',
                    nextStep: 'در تاریخ انتخابی شما، پیامک یادآوری به شماره همراهتان ارسال می‌شود.'
                  };
                  setReminders((prev) => [newRem, ...prev.slice(0, 2)]);
                  triggerToast('یادآور پیامکی جدید در پرونده شخصی شما ذخیره شد.');
                }}
                className="mt-3 w-full py-2.5 px-3 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-400 border border-purple-500/30 text-xs sm:text-sm font-extrabold transition flex items-center justify-center gap-1.5"
              >
                <Bell className="w-4 h-4" />
                <span>+ ثبت یادآور پیامکی برای تاریخ مهم</span>
              </button>
            </TiltBentoCard>
          )}

          {/* =================================================================
              BOX 5: RETRAINING (CME), AESTHETICS & MEDICAL TOURISM (1x1)
             ================================================================= */}
          {(workspaceMode === 'all' || workspaceMode === 'growth') && (
            <TiltBentoCard calmMotion={calmMotion} className={`p-5 ${cardThemeClass}`}>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    بازآموزی و ارتقای شغلی
                  </span>
                  <span className="text-xs font-black text-amber-400 tabular-nums">
                    🎓 ۱۵ از ۲۰ امتیاز سالانه
                  </span>
                </div>

                {/* Tab Switcher: Retraining is Default to Maintain Professional Trust */}
                <div
                  className={`grid grid-cols-2 gap-1.5 p-1 rounded-xl my-2 text-xs font-extrabold ${subCardThemeClass}`}
                >
                  <button
                    onClick={() => setCourseTab('retrain')}
                    className={`py-2 rounded-lg transition ${
                      courseTab === 'retrain'
                        ? 'bg-teal-500 text-slate-950 shadow'
                        : 'opacity-75 hover:opacity-100'
                    }`}
                  >
                    🏅 امتیاز بازآموزی
                  </button>
                  <button
                    onClick={() => setCourseTab('beauty')}
                    className={`py-2 rounded-lg transition ${
                      courseTab === 'beauty'
                        ? 'bg-amber-500 text-slate-950 shadow'
                        : 'opacity-75 hover:opacity-100'
                    }`}
                  >
                    ✨ زیبایی و گردشگری
                  </button>
                </div>

                <div className="space-y-2.5 mt-2">
                  {COURSES_DATA.filter((c) => c.category === courseTab).map((course) => (
                    <div
                      key={course.id}
                      className={`p-3 rounded-xl border ${subCardThemeClass}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs sm:text-sm font-extrabold text-teal-400">
                          {course.title}
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-bold tabular-nums flex-shrink-0">
                          {course.badge}
                        </span>
                      </div>
                      <p className="text-xs opacity-80 mt-1 leading-5">{course.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() =>
                  triggerToast('دوره‌های دارای امتیاز بازآموزی و مهارت‌های تخصصی منطبق با رشته شما نمایش داده شد.')
                }
                className="mt-3 w-full py-2.5 px-3 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 text-xs sm:text-sm font-black shadow-[0_6px_16px_-3px_rgba(245,158,11,0.4),inset_0_2px_4px_rgba(255,255,255,0.4)] flex items-center justify-center gap-1.5 transition"
              >
                <GraduationCap className="w-4 h-4" />
                <span>مشاهده دوره‌های معتبر رشته من</span>
              </button>
            </TiltBentoCard>
          )}

          {/* =================================================================
              BOX 6: SCIENTIFIC RADAR, BOOKS & ASSOCIATIONS (2x1 Span)
             ================================================================= */}
          {(workspaceMode === 'all' || workspaceMode === 'growth') && (
            <TiltBentoCard
              calmMotion={calmMotion}
              className={`md:col-span-2 p-5 ${cardThemeClass}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div>
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    📚 کتب مرجع، مقالات علمی و انجمن‌های تخصصی
                  </span>
                  <h3 className="font-black text-base sm:text-lg mt-1.5">
                    {activeProfile.scienceTitle}
                  </h3>
                </div>
                <button
                  onClick={() =>
                    triggerToast('جستجوی زنده در منابع علمی معتبر و مجلات مصوب انجام شد.')
                  }
                  className="text-xs font-extrabold px-3.5 py-2 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 text-teal-400 border border-teal-500/30 transition flex items-center gap-1.5"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>جستجو در منابع علمی معتبر</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className={`p-3.5 rounded-2xl border flex flex-col justify-between ${subCardThemeClass}`}>
                  <div>
                    <span className="text-xs font-extrabold text-teal-400">📄 مقاله کاربردی</span>
                    <h4 className="text-xs sm:text-sm font-bold mt-1 leading-6">
                      استاندارد نسبت پرستار به بیمار و تاثیر نوبت‌کاری شب بر سلامت شغلی
                    </h4>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-slate-300/30 dark:border-white/10 flex items-center justify-between text-xs opacity-80">
                    <span>مجله پرستاری ایران</span>
                    <button
                      onClick={() => triggerToast('خلاصه فارسی مقاله در گفت‌وگو درج شد.')}
                      className="text-teal-400 font-extrabold hover:underline"
                    >
                      مطالعه خلاصه ←
                    </button>
                  </div>
                </div>

                <div className={`p-3.5 rounded-2xl border flex flex-col justify-between ${subCardThemeClass}`}>
                  <div>
                    <span className="text-xs font-extrabold text-blue-400">📘 کتاب مرجع حقوقی</span>
                    <h4 className="text-xs sm:text-sm font-bold mt-1 leading-6">
                      راهنمای جامع حقوق، قوانین اداری و مسئولیت‌های حرفه‌ای کادر درمان
                    </h4>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-slate-300/30 dark:border-white/10 flex items-center justify-between text-xs opacity-80">
                    <span>ویرایش ۱۴۰۵</span>
                    <button
                      onClick={() => triggerToast('سرفصل‌های کتاب مرتبط با موضوع شما باز شد.')}
                      className="text-blue-400 font-extrabold hover:underline"
                    >
                      مشاهده فصول ←
                    </button>
                  </div>
                </div>

                <div className={`p-3.5 rounded-2xl border flex flex-col justify-between ${subCardThemeClass}`}>
                  <div>
                    <span className="text-xs font-extrabold text-purple-400">🏛️ انجمن‌های علمی</span>
                    <h4 className="text-xs sm:text-sm font-bold mt-1 leading-6">
                      انجمن علمی پرستاری • انجمن پرستاری ویژه • انجمن اتاق عمل و مامایی
                    </h4>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-slate-300/30 dark:border-white/10 flex items-center justify-between text-xs opacity-80">
                    <span>رویدادها و کارگاه‌ها</span>
                    <button
                      onClick={() => triggerToast('اطلاعیه‌های انجمن‌های علمی رشته شما بارگذاری شد.')}
                      className="text-purple-400 font-extrabold hover:underline"
                    >
                      تقویم انجمن ←
                    </button>
                  </div>
                </div>
              </div>
            </TiltBentoCard>
          )}

          {/* =================================================================
              BOX 7: LIVE LEGAL RADAR (2x1 Span - No Ads, Pure Legal Circulars)
             ================================================================= */}
          {(workspaceMode === 'all' || workspaceMode === 'legal') && (
            <TiltBentoCard
              calmMotion={calmMotion}
              className={`md:col-span-2 p-5 ${cardThemeClass}`}
            >
              <div className="w-full space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5" />
                    <span>آخرین بخشنامه‌های مالیاتی، سختی کار، اداری و بازنشستگی</span>
                  </span>
                  <span className="text-xs opacity-75 font-bold">
                    فیلتر خودکار بخشنامه‌های منسوخ‌شده
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div
                    onClick={() =>
                      submitQuestion(
                        'جزئیات بخشنامه جدید مالیات پلکانی روی کارانه و اضافه‌کاری کادر درمان چیست؟'
                      )
                    }
                    className={`p-3.5 rounded-2xl border hover:border-teal-400 cursor-pointer transition flex flex-col justify-between ${subCardThemeClass}`}
                  >
                    <div className="text-xs sm:text-sm leading-6">
                      <span className="font-extrabold text-teal-400 block mb-1">
                        💰 مالیات، حقوق و کارانه
                      </span>
                      <span>نحوه محاسبه مالیات روی کارانه، تعرفه‌گذاری و اضافه‌کاری در فیش‌های جدید</span>
                    </div>
                    <span className="text-xs text-teal-400 font-extrabold mt-2.5 pt-2 border-t border-slate-300/30 dark:border-white/10 inline-block">
                      پرسیدن درباره شرایط من ←
                    </span>
                  </div>

                  <div
                    onClick={() =>
                      submitQuestion(
                        'شرایط بازنشستگی با ۲۰ سال سابقه برای مشاغل سخت و زیان‌آور بیمارستانی چگونه است؟'
                      )
                    }
                    className={`p-3.5 rounded-2xl border hover:border-amber-400 cursor-pointer transition flex flex-col justify-between ${subCardThemeClass}`}
                  >
                    <div className="text-xs sm:text-sm leading-6">
                      <span className="font-extrabold text-amber-400 block mb-1">
                        ⏳ بازنشستگی و سختی کار
                      </span>
                      <span>احتساب ضریب ۱.۵ سال به ازای هر سال خدمت بالینی و نحوه ثبت درخواست</span>
                    </div>
                    <span className="text-xs text-amber-400 font-extrabold mt-2.5 pt-2 border-t border-slate-300/30 dark:border-white/10 inline-block">
                      پرسیدن درباره شرایط من ←
                    </span>
                  </div>

                  <div
                    onClick={() =>
                      submitQuestion(
                        'ضوابط تبدیل وضعیت، ذخیره مرخصی و جابجایی بخش در آیین‌نامه اداری چیست؟'
                      )
                    }
                    className={`p-3.5 rounded-2xl border hover:border-blue-400 cursor-pointer transition flex flex-col justify-between ${subCardThemeClass}`}
                  >
                    <div className="text-xs sm:text-sm leading-6">
                      <span className="font-extrabold text-blue-400 block mb-1">
                        📋 قوانین اداری و مرخصی
                      </span>
                      <span>سقف ذخیره مرخصی استحقاقی و ضوابط ابلاغ کتبی در جابجایی بخش‌ها</span>
                    </div>
                    <span className="text-xs text-blue-400 font-extrabold mt-2.5 pt-2 border-t border-slate-300/30 dark:border-white/10 inline-block">
                      پرسیدن درباره شرایط من ←
                    </span>
                  </div>
                </div>
              </div>
            </TiltBentoCard>
          )}
        </main>
      </div>

      {/* =====================================================================
          MODAL 1: INTERACTIVE SIDE-BY-SIDE PAYSLIP OCR VERIFIER
          (Hovering or focusing on form inputs highlights the exact payslip row!)
         ===================================================================== */}
      {activeModal === 'scanner' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
          <div
            dir="rtl"
            className={`rounded-[26px] max-w-4xl w-full p-5 sm:p-6 border border-teal-500/50 max-h-[92vh] overflow-y-auto shadow-2xl ${
              darkMode ? 'bg-[#0F172A] text-slate-100' : 'bg-white text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-300/30 dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">📑</span>
                <div>
                  <h3 className="font-black text-base sm:text-lg">
                    تطبیق چشمی تصویر فیش با اعداد خوانده‌شده (Interactive OCR)
                  </h3>
                  <p className="text-xs opacity-75">
                    روی هر کادر عددی در سمت چپ کلیک کنید تا سطر مربوط به آن روی تصویر فیش سمت راست برجسته شود
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-xl hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs sm:text-sm leading-6 text-emerald-400 flex items-center gap-2">
              <Lock className="w-4 h-4 flex-shrink-0" />
              <span>
                <strong>حفاظت از محرمانگی شما:</strong> نام، کد ملی و شماره حساب روی تصویر فیش به صورت
                خودکار پوشانده (Mask) شده است.
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-4">
              {/* Right Column: Simulated Visual Payslip with Interactive Bounding Boxes */}
              <div
                className={`p-4 rounded-2xl border-2 text-xs space-y-2.5 font-mono ${
                  darkMode ? 'bg-[#060A12] border-white/15' : 'bg-slate-100 border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-300/30 dark:border-white/10">
                  <span className="font-extrabold">🏥 تصویر فیش حقوقی (مهر ۱۴۰۵)</span>
                  <span className="px-2 py-0.5 rounded bg-slate-500/20 text-[11px]">
                    کد ملی: *********۰
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 opacity-80 py-1">
                  <div>
                    نام: <span className="bg-slate-500/30 px-2 rounded select-none">سارا [بی‌نام‌شده]</span>
                  </div>
                  <div>واحد: بخش ویژه (ICU)</div>
                </div>

                {/* Highlightable Row 1: Overtime Hours */}
                <div
                  onClick={() => setActiveHighlightRow('overtime_hours')}
                  className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 flex items-center justify-between ${
                    activeHighlightRow === 'overtime_hours'
                      ? 'bg-teal-500/30 border-teal-400 scale-[1.02] shadow-[0_0_20px_rgba(20,184,166,0.35)]'
                      : 'bg-teal-500/10 border-teal-500/30 opacity-80'
                  }`}
                >
                  <span className="font-bold text-teal-400">🔍 ردیف ۱: ساعت اضافه‌کاری در فیش</span>
                  <span className="font-black text-sm tabular-nums text-teal-300">
                    {ocrOvertimeHours} ساعت
                  </span>
                </div>

                {/* Highlightable Row 2: Overtime Pay */}
                <div
                  onClick={() => setActiveHighlightRow('overtime_pay')}
                  className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 flex items-center justify-between ${
                    activeHighlightRow === 'overtime_pay'
                      ? 'bg-amber-500/30 border-amber-400 scale-[1.02] shadow-[0_0_20px_rgba(245,158,11,0.35)]'
                      : 'bg-amber-500/10 border-amber-500/30 opacity-80'
                  }`}
                >
                  <span className="font-bold text-amber-400">🔍 ردیف ۲: مقایسه با شیفت واقعی شما</span>
                  <span className="font-black text-sm tabular-nums text-amber-300">
                    شیفت بخش: {ocrActualHours} ساعت
                  </span>
                </div>

                {/* Highlightable Row 3: Tax Deduction */}
                <div
                  onClick={() => setActiveHighlightRow('tax_deduction')}
                  className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 flex items-center justify-between ${
                    activeHighlightRow === 'tax_deduction'
                      ? 'bg-rose-500/30 border-rose-400 scale-[1.02] shadow-[0_0_20px_rgba(244,63,94,0.35)]'
                      : 'bg-rose-500/10 border-rose-500/30 opacity-80'
                  }`}
                >
                  <span className="font-bold text-rose-400">🔍 ردیف ۳: کسور مالیات ماه جاری</span>
                  <span className="font-black text-sm tabular-nums text-rose-300">
                    {ocrTaxAmount} ریال
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-500/10 opacity-75 text-[11px] flex justify-between">
                  <span>حقوق ثابت و فوق‌العاده‌های حکمی:</span>
                  <span className="tabular-nums">142,000,000 ریال</span>
                </div>
              </div>

              {/* Left Column: Editable Verification Form */}
              <div className="space-y-3 flex flex-col justify-between">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs sm:text-sm font-extrabold mb-1">نوع سند:</label>
                    <select
                      value={ocrDocType}
                      onChange={(e) => setOcrDocType(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-bold ${subCardThemeClass}`}
                    >
                      <option>فیش حقوقی و کارانه (مهر ۱۴۰۵)</option>
                      <option>حکم کارگزینی (تطبیق سالانه)</option>
                      <option>نامه اداری / ابلاغ جابجایی بخش</option>
                      <option>قرارداد کار معین / شرکتی</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-extrabold mb-1 text-teal-400">
                        ساعت اضافه‌کار خوانده‌شده از فیش:
                      </label>
                      <input
                        type="number"
                        value={ocrOvertimeHours}
                        onFocus={() => setActiveHighlightRow('overtime_hours')}
                        onChange={(e) => setOcrOvertimeHours(Number(e.target.value))}
                        className={`w-full px-3.5 py-2.5 rounded-xl border-2 border-teal-500/60 text-sm font-black tabular-nums ${subCardThemeClass}`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold mb-1 text-amber-400">
                        ساعت واقعی شیفت شما (برنامه بخش):
                      </label>
                      <input
                        type="number"
                        value={ocrActualHours}
                        onFocus={() => setActiveHighlightRow('overtime_pay')}
                        onChange={(e) => setOcrActualHours(Number(e.target.value))}
                        className={`w-full px-3.5 py-2.5 rounded-xl border-2 border-amber-500/60 text-sm font-black tabular-nums ${subCardThemeClass}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold mb-1 text-rose-400">
                      مبلغ مالیات خوانده‌شده از فیش (ریال):
                    </label>
                    <input
                      type="text"
                      value={ocrTaxAmount}
                      onFocus={() => setActiveHighlightRow('tax_deduction')}
                      onChange={(e) => setOcrTaxAmount(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border-2 border-rose-500/50 text-sm font-black tabular-nums ${subCardThemeClass}`}
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs leading-6">
                  💡 اگر عددی در عکس فیش کمرنگ بوده و اشتباه خوانده شده، کافی است در کادر بالا عدد درست را
                  تایپ کنید تا محاسبه بر اساس عدد تاییدشدهٔ شما انجام شود.
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2.5 pt-3 border-t border-slate-300/30 dark:border-white/10">
              <button
                onClick={() => setActiveModal(null)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold ${subCardThemeClass}`}
              >
                بستن
              </button>
              <button
                onClick={handleConfirmOcr}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 text-slate-950 text-xs sm:text-sm font-black shadow-lg"
              >
                ✅ اعداد درست است؛ معنی و راه پیگیری را بگو
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 2: CONSULTATION ROOM & HUMAN EXPERT REFERRAL
         ===================================================================== */}
      {activeModal === 'consult' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            dir="rtl"
            className={`rounded-[26px] max-w-xl w-full p-6 border border-blue-500/40 shadow-2xl ${
              darkMode ? 'bg-[#0F172A] text-slate-100' : 'bg-white text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-300/30 dark:border-white/10">
              <h3 className="font-black text-base sm:text-lg flex items-center gap-2">
                <span>👨‍⚖️</span>
                <span>ارجاع پرونده به کارشناس انسانی (بخش حقوقی نظام پرستاری)</span>
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-rose-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-4 space-y-3 text-xs sm:text-sm leading-7">
              <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/30">
                <div className="font-extrabold text-blue-400 mb-1">چرا بررسی انسانی در این مرحله مهم است؟</div>
                <p className="opacity-90">
                  هوش مصنوعی هرگز نباید در پرونده‌های حساس (مثل هیئت رسیدگی به تخلفات اداری، دیوان عدالت یا
                  کسر حقوق سنگین) به شما اطمینان کاذب بدهد. سامانه ابتدا خلاصهٔ ساختاریافتهٔ پرونده را آماده
                  می‌کند تا کارشناس انسانی سریع‌تر راهنمایی‌تان کند.
                </p>
              </div>

              <div className={`p-3.5 rounded-2xl border space-y-1.5 ${subCardThemeClass}`}>
                <div className="font-extrabold text-teal-400">
                  📋 خلاصه آماده‌شده برای ارسال به کارشناس (با اجازه شما):
                </div>
                <ul className="list-disc list-inside opacity-90 space-y-1 text-xs sm:text-sm">
                  <li>
                    <strong>جایگاه شغلی:</strong> {activeProfile.shortTitle} ({activeProfile.badges.join(' • ')})
                  </li>
                  <li>
                    <strong>مقررات مرتبط یافت‌شده:</strong> قانون ارتقای بهره‌وری و آیین‌نامه اداری استخدامی
                  </li>
                  <li>
                    <strong>موارد نیازمند بررسی کارشناس:</strong> انطباق ابلاغ داخلی بیمارستان با بخشنامه وزارتی
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setActiveModal(null)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold ${subCardThemeClass}`}
              >
                بازگشت
              </button>
              <button
                onClick={() => {
                  setActiveModal(null);
                  triggerToast('پرونده شما به همراه خلاصه مستندات برای بررسی کارشناس حقوقی ارسال شد.');
                }}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white text-xs sm:text-sm font-extrabold shadow-lg"
              >
                ارسال برای بررسی کارشناس حقوقی
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 3: HYBRID AUTHENTICATION (GOOGLE + SMS OTP)
         ===================================================================== */}
      {activeModal === 'auth' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            dir="rtl"
            className={`rounded-[26px] max-w-lg w-full p-6 border border-blue-500/40 shadow-2xl ${
              darkMode ? 'bg-[#0F172A] text-slate-100' : 'bg-white text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-300/30 dark:border-white/10">
              <h3 className="font-black text-base sm:text-lg">ورود آسان و تنظیم اولیه دستیار</h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-rose-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 my-4">
              <button
                onClick={() => {
                  setCurrentRole(regRole);
                  setActiveModal(null);
                  triggerToast('ورود با حساب گوگل (Gmail) انجام شد و صفحه شما شخصی‌سازی گردید.');
                }}
                className="w-full py-3 px-4 rounded-xl bg-white text-slate-800 border border-slate-300 shadow-sm hover:bg-slate-50 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition"
              >
                <span>🌐 ورود یک‌کلیکی با جیمیل (Google Sign-In)</span>
              </button>

              <div className="flex items-center gap-2 text-xs opacity-60">
                <div className="flex-1 h-px bg-current" />
                <span>یا ورود با پیامک تایید (OTP)</span>
                <div className="flex-1 h-px bg-current" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="tel"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="شماره همراه (۰۹۱۲...)"
                  className={`sm:col-span-2 px-3.5 py-2.5 rounded-xl border text-sm tabular-nums ${subCardThemeClass}`}
                />
                <button
                  onClick={() => triggerToast('کد پیامکی ۵ رقمی ارسال شد: ۴۸۲۹۱')}
                  className="py-2.5 px-3 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 text-xs font-extrabold"
                >
                  دریافت کد پیامکی
                </button>
              </div>

              <div className={`p-4 rounded-2xl border space-y-3 ${subCardThemeClass}`}>
                <div className="text-xs sm:text-sm font-extrabold text-teal-400">
                  🪪 فقط جایگاه شغلی را مشخص کنید تا سوالات تکراری نپرسیم:
                </div>
                <select
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value as RoleKey)}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold border ${
                    darkMode ? 'bg-[#131C2E] border-white/10 text-white' : 'bg-white border-slate-300'
                  }`}
                >
                  {Object.values(ROLE_PROFILES).map((r) => (
                    <option key={r.key} value={r.key}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setActiveModal(null)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold ${subCardThemeClass}`}
              >
                انصراف
              </button>
              <button
                onClick={() => {
                  handleRoleChange(regRole);
                  setActiveModal(null);
                }}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 text-slate-950 text-xs sm:text-sm font-black"
              >
                ذخیره و شخصی‌سازی صفحه من
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 4 & 5: HARDSHIP CALCULATOR & USER MEMORY PRIVACY CONTROL
         ===================================================================== */}
      {activeModal === 'calc' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            dir="rtl"
            className={`rounded-[26px] max-w-md w-full p-6 border border-teal-500/40 shadow-2xl ${
              darkMode ? 'bg-[#0F172A] text-slate-100' : 'bg-white text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-300/30 dark:border-white/10">
              <h3 className="font-black text-base sm:text-lg">
                🧮 محاسبه‌گر سنوات ارفاقی (قانون سختی کار)
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-rose-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="my-4 space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block font-bold mb-1.5">سابقه خدمت واقعی شما تا امروز (سال):</label>
                <input
                  type="number"
                  value={serviceYears}
                  onChange={(e) => setServiceYears(Math.max(0, Number(e.target.value)))}
                  className={`w-full px-3.5 py-2.5 rounded-xl border border-teal-500/50 font-black text-base tabular-nums ${subCardThemeClass}`}
                />
              </div>
              <div className="p-3.5 rounded-2xl bg-teal-500/15 border border-teal-500/30 space-y-1 leading-6">
                <div className="font-extrabold text-teal-400">
                  برآورد اولیه (نیازمند تطبیق با حکم کارگزینی):
                </div>
                <p>
                  با <strong className="tabular-nums">{serviceYears} سال</strong> سابقه بالینی، تا{' '}
                  <strong className="tabular-nums">{bonusYears} سال</strong> سنوات ارفاقی به شما تعلق
                  می‌گیرد (مجموع سابقه موثر جهت بازنشستگی:{' '}
                  <strong className="tabular-nums">{totalEffectiveYears} سال</strong>).
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 rounded-2xl bg-teal-500 text-slate-950 text-xs sm:text-sm font-black"
              >
                متوجه شدم
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'memory' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            dir="rtl"
            className={`rounded-[26px] max-w-md w-full p-6 border border-teal-500/40 shadow-2xl ${
              darkMode ? 'bg-[#0F172A] text-slate-100' : 'bg-white text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-300/30 dark:border-white/10">
              <h3 className="font-black text-base sm:text-lg">
                🪪 مدیریت اطلاعات شغلی و حریم خصوصی
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-rose-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs sm:text-sm opacity-80 my-3 leading-6">
              این موارد فقط برای جلوگیری از تکرار سؤالات ذخیره شده‌اند. هر زمان بخواهید می‌توانید آن‌ها را
              حذف کنید:
            </p>
            <div className="space-y-2.5 text-xs sm:text-sm mb-4">
              {memoryItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-3 rounded-xl border ${subCardThemeClass}`}
                >
                  <span>
                    {item.label}: <strong>{item.value}</strong>
                  </span>
                  <button
                    onClick={() => {
                      setMemoryItems((prev) => prev.filter((m) => m.id !== item.id));
                      triggerToast('این مورد از پرونده شغلی شما حذف شد.');
                    }}
                    className="text-rose-400 font-bold hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>حذف</span>
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-300/30 dark:border-white/10">
              <button
                onClick={() => {
                  setMemoryItems([]);
                  setActiveModal(null);
                  triggerToast('تمام سوابق و اسناد موقت شما از حافظه پاک شد.');
                }}
                className="text-xs font-extrabold text-rose-400 hover:underline"
              >
                🗑️ پاک کردن کل سابقه من
              </button>
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 rounded-2xl bg-teal-500 text-slate-950 text-xs sm:text-sm font-black"
              >
                تایید
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Non-Intrusive Toast Notification */}
      {toastMessage && (
        <div
          dir="rtl"
          className="fixed bottom-5 left-5 z-50 max-w-md rounded-2xl px-4 py-3.5 bg-slate-950/95 border-2 border-teal-400 text-white text-xs sm:text-sm font-extrabold shadow-2xl flex items-center gap-2.5 animate-bounce"
          style={{ animationIterationCount: 1 }}
        >
          <Sparkles className="w-5 h-5 text-teal-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}