import { NextResponse, type NextRequest } from "next/server";

function buildCSP(nonce: string) {
  const dev = process.env.NODE_ENV !== "production";
  const scriptSrc = [
    "'self'",
    `'nonce-${nonce}'`,
    "'unsafe-inline'",
    dev ? "'unsafe-eval' 'wasm-unsafe-eval'" : "",
    "blob:",
    "data:",
  ]
    .filter(Boolean)
    .join(" ");

  const directives: Record<string, string> = {
    "default-src": "'self'",
    // Allow Cloudflare Turnstile script/iframe
    "script-src": `${scriptSrc} https://challenges.cloudflare.com`,
    "script-src-elem": `${scriptSrc} https://challenges.cloudflare.com`,
    "script-src-attr": "'none'",
    "style-src": "'self' 'unsafe-inline'",
    "img-src": "'self' data: blob:",
    "font-src": "'self' data:",
    "connect-src": "'self' https:",
    "worker-src": "'self' blob:",
    "frame-src": "'self' https://challenges.cloudflare.com",
    "object-src": "'none'",
    "base-uri": "'self'",
    "form-action": "'self' mailto:",
    "frame-ancestors": "'self'",
  };

  return Object.entries(directives)
    .map(([k, v]) => (v ? `${k} ${v}` : k))
    .join("; ");
}

export function proxy(req: NextRequest) {
  if (process.env.NEXT_STATIC_EXPORT === "1") {
    return NextResponse.next();
  }

  // Disable/relax CSP on Netlify previews to avoid blocking scripts
  const host = req.nextUrl.hostname || "";
  const isNetlify = process.env.NETLIFY === "true" || /netlify\.app$/.test(host);
  if (process.env.DISABLE_CSP === "1" || isNetlify) {
    return NextResponse.next();
  }

  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  const nonce = Buffer.from(bytes).toString("base64");

  const csp = buildCSP(nonce);
  const fwdHeaders = new Headers(req.headers);
  fwdHeaders.set("content-security-policy", csp);

  const res = NextResponse.next({ request: { headers: fwdHeaders } });
  res.headers.set("Content-Security-Policy", csp);
  return res;
}

export const config = {
  matcher: "/:path*",
};
