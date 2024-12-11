import { Route } from "./internals/enums";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token");

  if (!token) {
    return NextResponse.redirect(new URL(Route.login, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
