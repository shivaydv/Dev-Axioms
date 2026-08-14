import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
const { rewrite: rewriteLLM } = rewritePath('/docs{/*path}', '/llms.mdx/docs{/*path}');

const ProtectedRoutes: string[] = [];
const AuthRoutes = ["/login"];

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  const isLoggedIn = !!sessionCookie;
  const isAuthRoute = AuthRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );
  const isProtectedRoute = ProtectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  if (isMarkdownPreferred(request)) {
    const result = rewriteLLM(request.nextUrl.pathname);
    if (result) {
      return NextResponse.rewrite(new URL(result, request.nextUrl));
    }
  }


  
  // ✅ Auth check happens for both full page loads and Next.js client-side navigations

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
