import nodemailer from "nodemailer";

type MailConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
  allowArbitraryFrom?: boolean;
};

function required(name: string, v: string | undefined): string {
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export function getMailConfig(): MailConfig {
  const host = required("SMTP_HOST", process.env.SMTP_HOST);
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const secure = String(process.env.SMTP_SECURE || "true").toLowerCase() === "true";
  const user = required("SMTP_USER", process.env.SMTP_USER);
  const pass = required("SMTP_PASS", process.env.SMTP_PASS);
  const from = process.env.CONTACT_FROM_EMAIL || user;
  const to = process.env.CONTACT_TO_EMAIL || user;
  const allowArbitraryFrom = String(process.env.SMTP_ALLOW_ARBITRARY_FROM || "false").toLowerCase() === "true";
  return { host, port, secure, user, pass, from, to, allowArbitraryFrom };
}

export function createTransport() {
  const cfg = getMailConfig();
  return nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    auth: { user: cfg.user, pass: cfg.pass },
  });
}

export async function sendContactEmail(opts: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
}) {
  const cfg = getMailConfig();
  const transporter = createTransport();

  const subject = `New consultation request — ${opts.name}${opts.company ? ` (${opts.company})` : ""}`;
  const text = [
    `Name: ${opts.name}`,
    `Email: ${opts.email}`,
    opts.company ? `Company: ${opts.company}` : "",
    opts.phone ? `Phone: ${opts.phone}` : "",
    "",
    "Message:",
    opts.message || "(none)",
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="font-family: system-ui, -apple-system, Segoe UI, sans-serif; color:#0f172a;">
      <h2 style="margin:0 0 8px;">New consultation request</h2>
      <p style="margin:0 0 4px;"><strong>Name:</strong> ${escapeHtml(opts.name)}</p>
      <p style="margin:0 0 4px;"><strong>Email:</strong> ${escapeHtml(opts.email)}</p>
      ${opts.company ? `<p style="margin:0 0 4px;"><strong>Company:</strong> ${escapeHtml(opts.company)}</p>` : ""}
      ${opts.phone ? `<p style="margin:0 0 4px;"><strong>Phone:</strong> ${escapeHtml(opts.phone)}</p>` : ""}
      <p style="margin:12px 0 4px;"><strong>Message</strong></p>
      <pre style="white-space:pre-wrap; margin:0;">${escapeHtml(opts.message || "(none)")}</pre>
    </div>`;

  const from = cfg.allowArbitraryFrom ? `${opts.name} <${opts.email}>` : cfg.from;

  return transporter.sendMail({
    from,
    to: cfg.to,
    subject,
    text,
    html,
    replyTo: opts.email,
  });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

