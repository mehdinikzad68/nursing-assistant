/**
 * پل ارتباطی با قابلیت‌های صوتی مرورگر (TTS و تبدیل گفتار به متن).
 * Trace: UI-2 (ورودی صوتی / پخش صوتی) · RULES.md C3 (بدون وعدهٔ بی‌پشتوانه)
 *
 * قاعده: اگر مرورگر قابلیتی را نداشته باشد، هرگ وانمودش نمی‌کنیم —
 * رابط کاربری مسیر جایگزین و صریح («نمونه») را نشان می‌دهد.
 */

export interface DictationController {
  /** پایان دادن به ضبط و گرفتن نتیجهٔ نهایی */
  stop: () => void;
  /** لغو کامل ضبط */
  abort: () => void;
}

interface RecognitionAlternative {
  transcript: string;
}

interface RecognitionResult {
  0: RecognitionAlternative;
  isFinal: boolean;
}

interface RecognitionEvent {
  results: ArrayLike<RecognitionResult>;
}

interface RecognitionErrorEvent {
  error?: string;
}

interface RecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: RecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: RecognitionErrorEvent) => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

type RecognitionCtor = new () => RecognitionLike;

function getRecognitionCtor(): RecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const scope = window as unknown as {
    SpeechRecognition?: RecognitionCtor;
    webkitSpeechRecognition?: RecognitionCtor;
  };
  return scope.SpeechRecognition ?? scope.webkitSpeechRecognition ?? null;
}

/** آیا مرورگر از تبدیل گفتار به متن پشتیبانی می‌کند؟ */
export function isDictationSupported(): boolean {
  return getRecognitionCtor() !== null;
}

/**
 * شروع ضبط صدا با زبان فارسی. اگر مرورگر پشتیبانی نکند `null` برمی‌گرداند
 * تا رابط کاربری پیام «نمونه» را نشان دهد، نه یک متن جعلی.
 */
export function startDictation(handlers: {
  onFinal: (transcript: string) => void;
  onInterim?: (transcript: string) => void;
  onEnd: () => void;
  onError?: (message: string) => void;
}): DictationController | null {
  const Ctor = getRecognitionCtor();
  if (!Ctor) return null;

  const recognition = new Ctor();
  recognition.lang = "fa-IR";
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  let finalText = "";
  let settled = false;

  const finish = () => {
    if (settled) return;
    settled = true;
    handlers.onEnd();
  };

  recognition.onresult = (event) => {
    let interim = "";
    for (let i = 0; i < event.results.length; i += 1) {
      const result = event.results[i];
      const text = result[0]?.transcript ?? "";
      if (result.isFinal) {
        finalText += text;
      } else {
        interim += text;
      }
    }
    if (interim) handlers.onInterim?.(interim);
  };

  recognition.onerror = (event) => {
    if (!settled) {
      const code = event.error ?? "unknown";
      const messages: Record<string, string> = {
        "not-allowed": "دسترسی به میکروفون داده نشد؛ می‌توانید سوال را بنویسید.",
        "no-speech": "صدایی شنیده نشد؛ دوباره تلاش کنید یا بنویسید.",
        network: "سرویس تبدیل گفتار به متن در دسترس نبود؛ لطفاً بنویسید."
      };
      handlers.onError?.(messages[code] ?? "تبدیل صدا به متن ممکن نشد؛ لطفاً بنویسید.");
    }
  };

  recognition.onend = () => {
    if (finalText.trim()) handlers.onFinal(finalText.trim());
    finish();
  };

  try {
    recognition.start();
  } catch {
    return null;
  }

  return {
    stop: () => recognition.stop(),
    abort: () => {
      settled = true;
      try {
        recognition.abort();
      } catch {
        /* ignore */
      }
      handlers.onEnd();
    }
  };
}

/** آیا مرورگر از تبدیل متن به گفتار پشتیبانی می‌کند؟ */
export function isTtsSupported(): boolean {
  if (typeof window === "undefined") return false;
  return typeof window.speechSynthesis !== "undefined";
}

/**
 * خواندن متن با صدای فارسی. خروجی، تابع لغو است تا دکمهٔ «توقف» کار کند.
 * اگر مرورگر پشتیبانی نکند، `false` برمی‌گرداند و رابط کاربری
 * پیام صریح «مرورگر شما از پخش صوتی پشتیبانی نمی‌کند» نشان می‌دهد.
 */
export function speak(text: string, onEnd: () => void): boolean {
  if (!isTtsSupported()) return false;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "fa-IR";
  utterance.rate = 0.95; // آرام و شمرده — مناسب شیفت شب
  utterance.onend = onEnd;
  utterance.onerror = onEnd;
  window.speechSynthesis.speak(utterance);
  return true;
}

export function cancelSpeech(): void {
  if (!isTtsSupported()) return;
  window.speechSynthesis.cancel();
}