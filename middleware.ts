import { jwtVerify } from "jose";
import { NextResponse, type NextRequest } from "next/server";

const AUTH_COOKIE_NAME = "rca_auth";

async function hasValidSession(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const secret = process.env.AUTH_JWT_SECRET;

  if (!token || !secret) return false;

  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const isAuthenticated = await hasValidSession(request);
  if (isAuthenticated) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/alumni", "/alumni/:path*", "/profile", "/profile/:path*"],
};
