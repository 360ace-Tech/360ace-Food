import { NextResponse, NextRequest } from "next/server";
import { sendContactEmail } from "@/lib/mail";

async function verifyTurnstile(req: NextRequest) {
  const secret = process.env.TURNSTILE_SECRET_KEY || process.env.CLOUDFLARE_TURNSTILE_SECRET || "";
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || process.env.TURNSTILE_SITE_KEY || "";
  const enabled = Boolean(secret);
  if (!enabled) return { ok: true } as const;

  // Bypass verification for trusted preview/dev hosts where the widget may not render
  const host = req.headers.get("host") || req.nextUrl.hostname || "";
  const isPreview = /\.netlify\.app$/i.test(host) || /localhost(:\d+)?$/i.test(host);

  const body = await req.clone().json().catch(() => ({} as any));
  const token = String(body["cf-turnstile-response"] || body.turnstile || "");

  if ((!token || !siteKey) && isPreview) {
    return { ok: true } as const;
  }
  if (!token) return { ok: false, error: "Turnstile token missing" } as const;

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token, remoteip: ip || "" }),
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
  const origin = req.headers.get("origin") || req.headers.get("referer") || "";
  if (!origin) return true;
  try {
    const host = new URL(origin).hostname;
    const isNetlify = /\.netlify\.app$/i.test(host);
    if (isNetlify || process.env.NETLIFY === "true") return true;
  } catch {}
  if (allowed.length === 0) return true; // default allow if none specified
  return allowed.some((o) => origin.startsWith(o));
}

function withCors(res: NextResponse, req: NextRequest, allowed: boolean) {
  const origin = req.headers.get("origin") || "*";
  if (allowed) {
    res.headers.set("Access-Control-Allow-Origin", origin);
  }
  res.headers.set("Vary", "Origin");
  res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "content-type");
  return res;
}

export async function OPTIONS(req: NextRequest) {
  const allowed = isAllowedOrigin(req);
  return withCors(new NextResponse(null, { status: 204 }), req, allowed);
}

export async function POST(req: NextRequest) {
  try {
    const allowed = isAllowedOrigin(req);
    if (!allowed) {
      return withCors(NextResponse.json({ ok: false, error: "Forbidden origin" }, { status: 403 }), req, false);
    }

    // Verify Turnstile BEFORE consuming the body — req.clone() throws if the
    // body stream has already been read, causing the cryptic "unusable" 500.
    const v = await verifyTurnstile(req);
    if (!v.ok) return withCors(NextResponse.json({ ok: false, error: v.error }, { status: 400 }), req, allowed);

    const data = await req.json().catch(() => ({}));
    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim();
    const company = String(data.company || "").trim() || undefined;
    const phone = String(data.phone || "").trim() || undefined;
    const message = String(data.message || "").trim() || undefined;

    if (!name || !email) return withCors(NextResponse.json({ ok: false, error: "Name and email are required." }, { status: 400 }), req, allowed);
    if (!isValidEmail(email)) return withCors(NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 }), req, allowed);
    if (!isValidPhone(phone || "")) return withCors(NextResponse.json({ ok: false, error: "Enter a valid phone number (optional)." }, { status: 400 }), req, allowed);

    await sendContactEmail({ name, email, company, phone, message });

    return withCors(NextResponse.json({
      ok: true,
      message: "Thanks — we’ll reply within 1 business day.",
    }), req, allowed);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unable to send message";
    return withCors(NextResponse.json({ ok: false, error: msg }, { status: 500 }), req, true);
  }
}
