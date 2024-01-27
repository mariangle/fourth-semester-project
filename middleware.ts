import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import { auth } from "@/lib/auth";
import authConfig from "@/auth.config";

export const { auth: middleware } = NextAuth(authConfig);

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

export default auth((req) => {
  const isLoggedIn = !!req.auth;

  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-url", req.url);

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  });

  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
