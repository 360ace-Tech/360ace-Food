import { NextResponse, type NextRequest } from "next/server";

function buildCSP(nonce: string) {
  const dev = process.env.NODE_ENV !== "production";
  const scriptSrc = [
    "'self'",
    `'nonce-${nonce}'`,
    "'unsafe-inline'",
    dev ? "'unsafe-eval' 'wasm-unsafe-eval'" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const directives = {
    "default-src": "'self'",
    "script-src": scriptSrc,
    "script-src-elem": scriptSrc,
    "script-src-attr": "'none'",
    "style-src": "'self' 'unsafe-inline'",
    "img-src": "'self' data: blob:",
    "font-src": "'self' data:",
    "connect-src": "'self' https:",
    "frame-src": "'self'",
    "object-src": "'none'",
    "base-uri": "'self'",
    "form-action": "'self' mailto:",
    "frame-ancestors": "'self'",
    "upgrade-insecure-requests": "",
  } as const;

  return Object.entries(directives)
    .map(([k, v]) => (v ? `${k} ${v}` : k))
    .join("; ");
}

export function middleware(req: NextRequest) {
  if (process.env.NEXT_STATIC_EXPORT === "1") {
    return NextResponse.next();
  }
  try {
    const host = req.nextUrl.hostname || "";
    const isLocalHostname =
      host === "localhost" ||
      host === "127.0.0.1" ||
      host === "::1" ||
      host.endsWith(".local") ||
      host.endsWith(".lan");
    const isRFC1918 =
      /^10\./.test(host) ||
      /^192\.168\./.test(host) ||
      /^172\.(1[6-9]|2[0-9]|3[01])\./.test(host) ||
      /^169\.254\./.test(host);
    if (isLocalHostname || isRFC1918) {
      return NextResponse.next();
    }
  } catch {}
  if (req.nextUrl.pathname.startsWith("/server/app")) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  const nonce = btoa(String.fromCharCode(...bytes));
  if (process.env.DISABLE_CSP === "1") {
    return NextResponse.next();
  }
  const csp = buildCSP(nonce);

  const fwdHeaders = new Headers(req.headers);
  fwdHeaders.set("content-security-policy", csp);

  const res = NextResponse.next({
    request: { headers: fwdHeaders },
  });

  res.headers.set("Content-Security-Policy", csp);
  return res;
}

export const config = {
  matcher: "/:path*",
};
