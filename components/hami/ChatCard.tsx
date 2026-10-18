"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  Camera,
  Check,
  Copy,
  FileSignature,
  FileText,
  Loader2,
  Mic,
  Send,
  Sparkles,
  UserCheck,
  Volume2,
  X
} from "lucide-react";
import { useHami } from "./context";
import { VOICE_FALLBACK_TRANSCRIPT } from "./data";
import { isDictationSupported, startDictation } from "./speech";
import type { DictationController } from "./speech";
import Orbit3D from "./Orbit3D";
import TiltCard from "./TiltCard";
import { BODY, CARD, chipTone, DIVIDER, SUB } from "./theme";

/**
 * قلب داشبورد: گفتگوی راهنما با سه سطح شفافیت + پیش‌نویس نامه + تحلیل سند.
 * Trace: UI-2 BOX 1 · app/api/chat/route.ts (پاسخ واقعی از مدل) · H1/H3/H5
 */
export default function ChatCard() {
  const {
    profile,
    messages,
    chatInput,
    setChatInput,
    pending,
    submitQuestion,
    generateDraft,
    speakingId,
    toggleSpeech,
    calmMotion,
    toggleCalmMotion,
    openModal,
    toast
  } = useHami();

  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [draftEdits, setDraftEdits] = useState<Record<string, string>>({});

  const dictationRef = useRef<DictationController | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages.length, pending]);

  const toggleListening = () => {
    if (listening) {
      dictationRef.current?.stop();
      return;
    }

    if (!isDictationSupported()) {
      // مرورگر پشتیبانی نمی‌کند: صریحاً «نمونه» را نشان می‌دهیم، نه یک متن جعلی واقعی
      setChatInput(VOICE_FALLBACK_TRANSCRIPT);
      return;
    }

    const controller = startDictation({
      onFinal: (transcript) => {
        setChatInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setInterim("");
      },
      onInterim: setInterim,
      onEnd: () => {
        setListening(false);
        setInterim("");
        dictationRef.current = null;
      },
      onError: (message) => toast(message)
    });

    if (controller) {
      dictationRef.current = controller;
      setListening(true);
    }
  };

  const copyDraft = async (messageId: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(messageId);
      toast("متن نامه کپی شد.");
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      toast("کپی خودکار در این مرورگر ممکن نشد؛ متن را دستی انتخاب کنید.");
    }
  };

  return (
    <TiltCard calmMotion={calmMotion} className={`${CARD} p-5 sm:p-6 md:col-span-2 lg:col-span-2 lg:row-span-2`}>
      <div>
        {/* سربرگ و منظومه */}
        <div className={`flex flex-col items-center justify-between gap-4 pb-4 sm:flex-row ${DIVIDER}`}>
          <div className="flex-1">
            <span
              className={`mb-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold ${chipTone.teal}`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>همراه تخصصی شما با هماهنگی بخش حقوقی نظام پرستاری</span>
            </span>
            <h2 className="text-lg font-black leading-relaxed sm:text-xl">{profile.greeting}</h2>
            <p className="mt-1 text-xs leading-relaxed opacity-80 sm:text-sm">{profile.subtext}</p>
          </div>

          <Orbit3D calmMotion={calmMotion} onToggleMotion={toggleCalmMotion} avatarEmoji={profile.avatarEmoji} />
        </div>

        {/* جریان گفتگو */}
        <div className="my-4 max-h-[420px] space-y-3.5 overflow-y-auto pl-1">
          {messages.map((message) => (
            <div key={message.id} className="hami-sensitive">
              {message.sender === "user" && (
                <div className="mr-auto max-w-[90%] rounded-2xl bg-gradient-to-br from-hami-teal to-hami-teal/80 p-3.5 text-sm leading-7 text-white shadow-md">
                  <div className="mb-0.5 text-xs font-bold opacity-85">پرسش شما:</div>
                  <div>{message.text}</div>
                </div>
              )}

              {message.sender === "ai" && (
                <div className={`${SUB} p-4 text-sm leading-7`}>
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 font-extrabold text-hami-teal">
                      🤖 راهنمای هوشمند (تفکیک قانون از تجربهٔ مشابه)
                    </span>

                    <button
                      type="button"
                      onClick={() => toggleSpeech(message.id, `${message.text ?? ""} ${message.levels?.known ?? ""}`)}
                      className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-extrabold transition-colors ${chipTone.teal} hover:bg-hami-teal/25`}
                    >
                      <Volume2 className="h-3.5 w-3.5" />
                      {speakingId === message.id ? "در حال خواندن صوتی" : "شنیدن صوتی پاسخ"}
                    </button>
                  </div>

                  {message.text && <p className="mb-3 whitespace-pre-line">{message.text}</p>}

                  {/* سه سطح شفافیت — بدون عدد یا آمار ساختگی */}
                  <div className="space-y-2 text-xs sm:text-sm">
                    {message.levels?.known && (
                      <div className={`rounded-xl border p-3 ${chipTone.teal}`}>
                        <span className="mb-0.5 block font-extrabold">
                          🟢 ۱. آنچه روشن است:
                        </span>
                        <span className="text-hami-text/85">{message.levels.known}</span>
                      </div>
                    )}
                    {message.levels?.needsEvidence && (
                      <div className={`rounded-xl border p-3 ${chipTone.amber}`}>
                        <span className="mb-0.5 block font-extrabold">
                          🟡 ۲. آنچه نیازمند بررسی مدرک است:
                        </span>
                        <span className="text-hami-text/85">{message.levels.needsEvidence}</span>
                      </div>
                    )}
                    {message.levels?.similarCases && (
                      <div className={`rounded-xl border p-3 ${chipTone.blue}`}>
                        <span className="mb-0.5 block font-extrabold">
                          ⚖️ ۳. تجربهٔ پرونده‌های مشابه (بدون وعدهٔ نتیجه):
                        </span>
                        <span className="text-hami-text/85">{message.levels.similarCases}</span>
                      </div>
                    )}
                  </div>

                  <div className={`mt-3 flex flex-wrap gap-2 border-t pt-2.5 ${DIVIDER}`}>
                    <button
                      type="button"
                      onClick={generateDraft}
                      className="flex items-center gap-1 rounded-xl bg-hami-teal px-3 py-1.5 text-xs font-extrabold text-hami-on-accent transition-opacity hover:opacity-90"
                    >
                      <FileSignature className="h-3.5 w-3.5" />
                      <span>پیش‌نویس نامهٔ اداری</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openModal("scanner")}
                      className={`flex items-center gap-1 rounded-xl border px-3 py-1.5 text-xs font-bold transition-colors ${chipTone.amber} hover:bg-hami-amber/25`}
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span>تطبیق چشمی با عکس فیش</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openModal("consult")}
                      className={`flex items-center gap-1 rounded-xl border px-3 py-1.5 text-xs font-bold transition-colors ${chipTone.blue} hover:bg-hami-blue/25`}
                    >
                      <UserCheck className="h-3.5 w-3.5" />
                      <span>ارجاع به کارشناس انسانی</span>
                    </button>
                  </div>
                </div>
              )}

              {message.sender === "error" && (
                <div className={`flex items-start gap-2 rounded-2xl border p-4 text-sm leading-7 ${chipTone.rose}`}>
                  <AlertTriangle className="mt-1 h-4 w-4 flex-shrink-0" />
                  <div>
                    <span className="mb-0.5 block font-extrabold">ارتباط برقرار نشد</span>
                    <span className="text-hami-text/85">{message.text}</span>
                  </div>
                </div>
              )}

              {message.sender === "draft" && (
                <div className={`space-y-2.5 rounded-2xl border p-4 text-xs sm:text-sm ${chipTone.amber}`}>
                  <div className="flex items-center justify-between gap-2 font-extrabold text-hami-amber">
                    <span>✍️ پیش‌نویس نامهٔ اداری (ویرایش و ارسال با شماست)</span>
                    <button
                      type="button"
                      onClick={() => copyDraft(message.id, draftEdits[message.id] ?? message.draftContent ?? "")}
                      className="flex items-center gap-1 rounded-xl bg-hami-amber px-3 py-1 text-xs font-extrabold text-slate-950"
                    >
                      {copiedId === message.id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedId === message.id ? "کپی شد" : "کپی متن نامه"}</span>
                    </button>
                  </div>
                  <textarea
                    value={draftEdits[message.id] ?? message.draftContent ?? ""}
                    onChange={(event) =>
                      setDraftEdits((prev) => ({ ...prev, [message.id]: event.target.value }))
                    }
                    className="h-28 w-full rounded-xl border border-hami-amber/30 bg-hami-card p-3 text-xs leading-7 focus:outline-none sm:text-sm"
                  />
                </div>
              )}

              {message.sender === "ocr" && message.ocrSummary && (
                <div className={`space-y-2 rounded-2xl border p-4 text-xs leading-7 sm:text-sm ${chipTone.teal}`}>
                  <div className="font-extrabold text-hami-teal">
                    ✅ تحلیل سند پس از تأیید چشمی شما ({message.ocrSummary.docType}):
                  </div>
                  <p className="text-hami-text/85">
                    ساعت اضافه‌کاری در فیش{" "}
                    <strong className="tabular-nums">{message.ocrSummary.recordedHours} ساعت</strong> و شیفت واقعی شما{" "}
                    <strong className="tabular-nums">{message.ocrSummary.actualHours} ساعت</strong> است ({" "}
                    <strong className="tabular-nums text-hami-amber">
                      {message.ocrSummary.diffHours} ساعت کسری ثبت
                    </strong>{" "}
                    ). کسور مالیات ثبت‌شده نیز{" "}
                    <strong className="tabular-nums">{message.ocrSummary.taxAmount} ریال</strong> است.
                  </p>
                  <p className="text-xs text-hami-muted">
                    <strong>مسیر گام‌به‌گام پیگیری:</strong> ۱. دریافت تصویر برنامهٔ شیفت ماهانه با امضای سرپرستار ← ۲.
                    ثبت نامهٔ درخواست بررسی کارکرد در اتوماسیون اداری پیش از بسته‌شدن لیست ماه بعد.{" "}
                    <span className="font-bold">این مسیر پیشنهاد اولیه است و به معنی نتیجهٔ قطعی نیست.</span>
                  </p>
                </div>
              )}
            </div>
          ))}

          {pending && (
            <div className={`${SUB} flex items-center gap-2 p-4 text-sm text-hami-muted`}>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>در حال آماده‌سازی پاسخ…</span>
            </div>
          )}

          <div ref={endRef} />
        </div>
      </div>

      {/* ورودی */}
      <div className={`pt-3 ${DIVIDER}`}>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold opacity-75">💡 پرتکرارترین مسائل همکاران هم‌رشتهٔ شما:</span>
          <span className="flex items-center gap-1 text-xs font-bold text-hami-teal">
            {chatInput.trim().length > 0
              ? "✅ پیش‌نویس شما فقط در همین مرورگر ذخیره می‌شود"
              : "💾 پیش‌نویس به‌صورت خودکار در مرورگر خودتان ذخیره می‌شود"}
          </span>
        </div>

        <div className="mb-3 flex flex-wrap gap-2">
          {profile.suggestedQuestions.map((question) => (
            <button
              key={question}
              type="button"
              onClick={() => submitQuestion(question)}
              className={`hami-sensitive rounded-2xl border px-3.5 py-2 text-right text-xs font-semibold transition-colors hover:bg-hami-teal/25 sm:text-sm ${chipTone.teal}`}
            >
              ✨ {question}
            </button>
          ))}
        </div>

        {listening && (
          <div className={`mb-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-3 ${chipTone.rose}`}>
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 animate-ping rounded-full bg-hami-rose" />
              <span className="text-xs font-extrabold text-hami-rose sm:text-sm">
                🎙️ در حال شنیدن صدای شما… {interim && <span className="opacity-80">({interim})</span>}
              </span>
            </div>
            <button
              type="button"
              onClick={() => dictationRef.current?.stop()}
              className="flex items-center gap-1 rounded-xl bg-hami-rose px-3.5 py-1.5 text-xs font-extrabold text-white"
            >
              <X className="h-3.5 w-3.5" />
              <span>پایان ضبط</span>
            </button>
          </div>
        )}

        <form
          onSubmit={(event) => {
            event.preventDefault();
            submitQuestion(chatInput);
          }}
          className="flex items-center gap-2"
        >
          <button
            type="button"
            onClick={() => openModal("scanner")}
            title="بررسی عکس فیش حقوقی، حکم کارگزینی یا نامهٔ اداری"
            className={`${SUB} flex flex-shrink-0 items-center justify-center rounded-2xl p-3.5 transition-colors hover:border-hami-teal/50`}
          >
            <Camera className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={toggleListening}
            title="خسته‌اید؟ به‌جای تایپ کردن، مشکلتان را صوتی بگویید"
            className={`flex flex-shrink-0 items-center gap-1.5 rounded-2xl border px-3.5 py-3.5 text-xs font-extrabold transition-colors ${chipTone.amber} hover:bg-hami-amber/25`}
          >
            <Mic className="h-4 w-4" />
            <span className="hidden sm:inline">{listening ? "در حال ضبط" : "بیان صوتی"}</span>
          </button>

          <label className="sr-only" htmlFor="hami-chat-input">
            پرسش شما
          </label>
          <input
            id="hami-chat-input"
            type="text"
            value={chatInput}
            onChange={(event) => setChatInput(event.target.value)}
            placeholder="بنویسید یا با دکمهٔ 🎙️ بگویید (مثلاً: برای اعتراض به این نامه از کجا شروع کنم؟)…"
            className="hami-sub flex-1 rounded-2xl border px-4 py-3.5 text-sm focus:border-hami-teal focus:outline-none"
          />

          <button type="submit" disabled={pending} className="hami-clay flex-shrink-0 px-5 py-3.5 text-sm disabled:opacity-60">
            <span>{pending ? "در حال ارسال" : "پرسش"}</span>
            <Send className="h-4 w-4 rotate-180" />
          </button>
        </form>
      </div>

      <p className={`${BODY} mt-3 text-[11px] text-hami-muted`}>
        پاسخ‌ها «نمونه» و راهنمای اولیه‌اند و جای مشاورهٔ حقوقی یا تصمیم کارگزینی را نمی‌گیرند.
      </p>
    </TiltCard>
  );
}