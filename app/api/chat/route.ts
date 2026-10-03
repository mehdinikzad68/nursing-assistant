import { NextRequest, NextResponse } from "next/server";
import { createLogger } from "@/lib/logger";

const log = createLogger("chat-api");

const UNOROUTER_BASE_URL = process.env.UNOROUTER_BASE_URL || "https://api.unorouter.com/v1";
const UNOROUTER_API_KEY = process.env.UNOROUTER_API_KEY;
const MODEL = "gemini-3.6-flash:free";

const SYSTEM_PROMPT = `تو دستیار حقوقی و اداری پرستاران ایران هستت. به سؤالات پرستاران در مورد حقوق، دستمزد، مرخصی، اضافه‌کاری، انتقال بخش، کمیسیون‌های انضباطی و سایر مسائل اداری پاسخ می‌دهی.

قوانین پاسخ‌دهی:
1. پاسخ را در ۴ بخش بده: فهمیدم / چه لازم است / مبنا / قدم‌های ممکن
2. هر پاسخ باید برچسب «نمونه» داشته باشد
3. بدون ادعای وکالت
4. لحن آرامش‌بخش، کاربرمحور، غیرترساننده
5. اگر اطلاعات کافی نیست، بگو «نیازمند بررسی بیشتر»
6. به زبان ساده و محاوره‌ای پاسخ بده`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "پیام الزامی است" },
        { status: 400 }
      );
    }

    if (!UNOROUTER_API_KEY) {
      return NextResponse.json(
        { error: "کلید API تنظیم نشده است" },
        { status: 500 }
      );
    }

    const response = await fetch(`${UNOROUTER_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${UNOROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      log.error("Chat API upstream error", {
        status: response.status,
        error: errorData.error?.message || "خطا در ارتباط با سرویس",
      });
      return NextResponse.json(
        { error: errorData.error?.message || "خطا در ارتباط با سرویس" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "پاسخی دریافت نشد";

    log.info("Chat response received", {
      model: MODEL,
      contentLength: content.length,
      usage: data.usage,
    });

    return NextResponse.json({
      content,
      model: MODEL,
      sample: true,
    });
  } catch (error) {
    log.error("Chat API error", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      { error: "خطای داخلی سرور" },
      { status: 500 }
    );
  }
}
