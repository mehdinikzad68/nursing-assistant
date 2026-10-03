/**
 * لاگر سادهٔ ساختگیفای پروژه — بدون وابستگی خارجی (قانون E1).
 * Trace: PLAN.md بخش ۴ (M0 زیرساخت) · RULES.md E6 (حالت خطا)
 *
 * خروجی به stdout می‌رود و در docker logs قابل مشاهده است:
 *   docker logs nurse-prototype-dev
 *
 * سطح‌ها: debug (فقط توسعه) / info / warn / error (همیشه)
 * ساختار خروجی JSON است تا بعداً در F4 (اعتماد/امنیت) قابل جمع‌آوری باشد.
 */

type Level = "debug" | "info" | "warn" | "error";

const LEVELS: Record<Level, number> = { debug: 10, info: 20, warn: 30, error: 40 };

const minLevel: Level =
  process.env.NODE_ENV === "production" ? "info" : "debug";

function emit(level: Level, scope: string, message: string, meta?: unknown) {
  if (LEVELS[level] < LEVELS[minLevel]) return;
  const entry = {
    ts: new Date().toISOString(),
    level,
    scope,
    message,
    ...(meta !== undefined ? { meta } : {}),
  };
  const line = JSON.stringify(entry);
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}

export function createLogger(scope: string) {
  return {
    debug: (message: string, meta?: unknown) => emit("debug", scope, message, meta),
    info: (message: string, meta?: unknown) => emit("info", scope, message, meta),
    warn: (message: string, meta?: unknown) => emit("warn", scope, message, meta),
    error: (message: string, meta?: unknown) => emit("error", scope, message, meta),
  };
}
