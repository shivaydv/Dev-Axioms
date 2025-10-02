import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const ProtectedRoutes = ["/practice/"];
const AuthRoutes = ["/login"];

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  const isLoggedIn = !!sessionCookie;
  const isAuthRoute = AuthRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );
  const isProtectedRoute = ProtectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );
  // ✅ Allow non-document requests (like metadata/head/images)
  const secFetchDest = request.headers.get("sec-fetch-dest");
  if (isProtectedRoute && !isLoggedIn && secFetchDest !== "document") {
    return NextResponse.next();
  }

  // block login if already logged in
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  // protect /practice/* pages for users only
  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set(
      "from",
      encodeURIComponent(request.nextUrl.pathname),
    );
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // matcher: ["/dashboard"],
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"], //all paths except /, /api, /_next/static, /_next/image and all png images
};
