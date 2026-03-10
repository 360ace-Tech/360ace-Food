import { NextResponse, NextRequest } from "next/server";
import { sendContactEmail } from "@/lib/mail";

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

    if (!name || !email) {
      return NextResponse.json({ ok: false, error: "Name and email are required." }, { status: 400 });
    }

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

