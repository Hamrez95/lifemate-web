import { NextRequest, NextResponse } from "next/server";

const protectedDomains = new Set(["lifematefamily.ir", "www.lifematefamily.ir", "lifemateone.ir", "www.lifemateone.ir"]);
const locales = new Set(["fa", "en"]);

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();
  const url = request.nextUrl.clone();

  if (host && protectedDomains.has(host)) {
    url.protocol = "https:";
    url.host = "mylifemate.ir";
    return NextResponse.redirect(url, 301);
  }

  const firstSegment = url.pathname.split("/").filter(Boolean)[0];
  if (!firstSegment || !locales.has(firstSegment)) {
    url.pathname = `/fa${url.pathname === "/" ? "" : url.pathname}`;
    return NextResponse.redirect(url, 307);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt|sitemap.xml|images|fonts).*)"]
};
