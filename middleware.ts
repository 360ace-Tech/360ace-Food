import { NextResponse, type NextRequest } from "next/server";

function buildCSP(nonce: string) {
  const dev = process.env.NODE_ENV !== "production";
  const scriptSrc = [
    "'self'",
    `'nonce-${nonce}'`,
    "'unsafe-inline'",
    // Allow eval in dev only; allow blob for Next workers in preview/production
    dev ? "'unsafe-eval' 'wasm-unsafe-eval'" : "",
    "blob:",
    "data:",
  ]
    .filter(Boolean)
    .join(" ");

  const directives: Record<string, string> = {
    "default-src": "'self'",
    "script-src": scriptSrc,
    "script-src-elem": scriptSrc,
    "script-src-attr": "'none'",
    "style-src": "'self' 'unsafe-inline'",
    "img-src": "'self' data: blob:",
    "font-src": "'self' data:",
    "connect-src": "'self' https:",
    "worker-src": "'self' blob:",
    "frame-src": "'self'",
    "object-src": "'none'",
    "base-uri": "'self'",
    "form-action": "'self' mailto:",
    "frame-ancestors": "'self'",
  };

  return Object.entries(directives)
    .map(([k, v]) => (v ? `${k} ${v}` : k))
    .join("; ");
}

export function middleware(req: NextRequest) {
  // Skip on static export builds
  if (process.env.NEXT_STATIC_EXPORT === "1") {
    return NextResponse.next();
  }

  // Skip CSP on Netlify previews or when explicitly disabled
  const host = req.nextUrl.hostname || "";
  const isNetlify = process.env.NETLIFY === "true" || /netlify\.app$/.test(host);
  if (process.env.DISABLE_CSP === "1" || isNetlify) {
    return NextResponse.next();
  }

  // Generate nonce and attach CSP
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

