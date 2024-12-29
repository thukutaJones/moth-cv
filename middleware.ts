import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("moth-cv-token");
  const currentPath = req.nextUrl.pathname;
  console.log(token);
  console.log(currentPath);

  const protectedRoutes: string[] = [
    "/home",
    "/cover-letter",
    "/mock-interview",
    "/mock-interview/[jobTitle]",
    "/upgrade",
    "/profile",
    "/cv-builder",
    "/cv-builder/work-experience",
    "/cv-builder/education-background",
    "/cv-builder/skills",
    "/cv-builder/objective",
    "/cv-builder/references",
    "/cv-builder/export-cv"
  ];

  if (!token && protectedRoutes?.includes(currentPath)) {
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
    "/mock-interview",
    "/mock-interview/[jobTitle]",
    "/upgrade",
    "/profile",
    "/cv-builder",
    "/cv-builder/work-experience",
    "/cv-builder/education-background",
    "/cv-builder/skills",
    "/cv-builder/objective",
    "/cv-builder/references",
    "/cv-builder/export-cv"
  ],
};
