import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("moth-cv-token");
  const currentPath = req.nextUrl.pathname;

  console.log("Token:", token);
  console.log("Current Path:", currentPath);

  const isProtectedRoute =
    currentPath.startsWith("/cv-builder") ||
    ["/home", "/cover-letter", "/mock-interview", "/upgrade", "/profile"].includes(currentPath);

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (token && currentPath === "/sign-in") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/sign-in",
    "/home",
    "/cover-letter",
    "/mock-interview(/.*)?",
    "/upgrade",
    "/profile",
    "/cv-builder(/.*)?",
  ],
};
