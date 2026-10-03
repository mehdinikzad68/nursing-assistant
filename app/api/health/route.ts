import { createLogger } from "@/lib/logger";

const log = createLogger("api/health");

export async function GET() {
  log.info("health check");
  return Response.json({
    ok: true,
    app: "nurse-assistant-prototype",
    mode: "demo",
    ts: new Date().toISOString(),
  });
}
