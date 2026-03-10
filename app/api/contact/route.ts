import { NextResponse, NextRequest } from "next/server";
import { sendContactEmail } from "@/lib/mail";

async function verifyTurnstile(req: NextRequest) {
  const secret = process.env.TURNSTILE_SECRET_KEY || process.env.CLOUDFLARE_TURNSTILE_SECRET || "";
  const enabled = Boolean(secret);
  if (!enabled) return { ok: true } as const;

  const body = await req.clone().json().catch(() => ({} as any));
  const token = String(body["cf-turnstile-response"] || body.turnstile || "");
  if (!token) return { ok: false, error: "Turnstile token missing" } as const;

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token, remoteip: ip || "" }),
    // Avoid caching
    cache: "no-store",
  });
  const json = (await r.json()) as { success?: boolean; "error-codes"?: string[] };
  if (!json?.success) return { ok: false, error: `Turnstile failed: ${json?.["error-codes"]?.join(",") || "unknown"}` } as const;
  return { ok: true } as const;
}

function isValidEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return re.test(email);
}

function isValidPhone(phone: string) {
  if (!phone) return true; // optional
  const digits = (phone.match(/\d/g) || []).length;
  return digits >= 7 && digits <= 20;
}

export const runtime = "nodejs"; // ensure Node APIs for SMTP

function isAllowedOrigin(req: NextRequest) {
  const allowed = (process.env.CONTACT_ALLOWED_ORIGINS || "").split(/[,\s]+/).filter(Boolean);
  if (allowed.length === 0) return true; // local/dev default
  const origin = req.headers.get("origin") || req.headers.get("referer") || "";
  return allowed.some((o) => origin.startsWith(o));
}

export async function POST(req: NextRequest) {
  try {
    if (!isAllowedOrigin(req)) {
      return NextResponse.json({ ok: false, error: "Forbidden origin" }, { status: 403 });
    }

    const data = await req.json().catch(() => ({}));
    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim();
    const company = String(data.company || "").trim() || undefined;
    const phone = String(data.phone || "").trim() || undefined;
    const message = String(data.message || "").trim() || undefined;

    if (!name || !email) return NextResponse.json({ ok: false, error: "Name and email are required." }, { status: 400 });
    if (!isValidEmail(email)) return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
    if (!isValidPhone(phone || "")) return NextResponse.json({ ok: false, error: "Enter a valid phone number (optional)." }, { status: 400 });

    const v = await verifyTurnstile(req);
    if (!v.ok) return NextResponse.json({ ok: false, error: v.error }, { status: 400 });

    await sendContactEmail({ name, email, company, phone, message });

    return NextResponse.json({
      ok: true,
      message: "Thanks — we’ll reply within 1 business day.",
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unable to send message";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
