import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Route } from "./internals/enums";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL(Route.login, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/board/:path*"],
};
