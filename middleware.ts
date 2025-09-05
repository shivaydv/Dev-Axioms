import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const ProtectedRoutes = ["/playground"];
const AuthRoutes = ["/login"];

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  const isLoggedIn = !!sessionCookie;
  const isAuthRoute = AuthRoutes.some((route) => request.nextUrl.pathname.startsWith(route));
  const isProtectedRoute = ProtectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // matcher: ["/dashboard"],
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"], //all paths except /, /api, /_next/static, /_next/image and all png images
};
