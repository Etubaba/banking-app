import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateToken } from "./helper/validateToken";

export async function middleware(request: NextRequest, response: NextResponse) {
  const token = request.cookies.get("_t4t5wm")?.value as string;
  const serviceRes = await validateToken(token);

  const pathname = request.nextUrl.pathname;

  const loginPath = pathname.startsWith("/auth");
  if (pathname.includes("/admin")) {
    if (!serviceRes?.isValid) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }
  if (pathname.includes("/user")) {
    if (!serviceRes?.isValid) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  if (loginPath || pathname.includes("/auth/login")) {
    if (serviceRes?.isValid) {
      return NextResponse.redirect(new URL("/user", request.url));
    }
  }
}
export const config = {
  matcher: ["/auth", "/admin/:path*", "/user/:path*"],
};
