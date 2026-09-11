import { NextResponse } from 'next/server';

const LANGS = new Set(['zh', 'en']);
const CHINESE_COUNTRIES = new Set(['CN', 'HK', 'MO', 'TW']);
const PUBLIC_FILE = /\.[a-z0-9]+$/i;

function firstSegment(pathname) {
  return pathname.split('/').filter(Boolean)[0] || '';
}

function shouldSkip(pathname) {
  return (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/brand/') ||
    pathname.startsWith('/hero/') ||
    pathname.startsWith('/og/') ||
    pathname.startsWith('/wasm/') ||
    PUBLIC_FILE.test(pathname)
  );
}

function prefersChineseLanguage(header) {
  const [primary] = header
    .split(',')
    .map((part) => {
      const [tag, qPart] = part.trim().split(';');
      const q = qPart?.startsWith('q=') ? Number(qPart.slice(2)) : 1;
      return { tag: tag.toLowerCase(), q: Number.isFinite(q) ? q : 1 };
    })
    .filter((item) => item.q > 0)
    .sort((a, b) => b.q - a.q);

  return primary?.tag === 'zh' || primary?.tag.startsWith('zh-');
}

function preferredLang(request) {
  const country =
    request.headers.get('x-vercel-ip-country') ||
    request.headers.get('cf-ipcountry') ||
    request.geo?.country ||
    '';

  if (CHINESE_COUNTRIES.has(country.toUpperCase())) return 'zh';
  if (prefersChineseLanguage(request.headers.get('accept-language') || '')) return 'zh';
  return 'en';
}

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const segment = firstSegment(pathname);

  if (LANGS.has(segment) || shouldSkip(pathname)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  const lang = preferredLang(request);
  url.pathname = pathname === '/' ? `/${lang}` : `/${lang}${pathname}`;

  const response = NextResponse.redirect(url, 307);
  response.headers.set('Cache-Control', 'private, no-store');
  response.headers.set('Vary', 'Accept-Language, x-vercel-ip-country, cf-ipcountry');
  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
