/**
 * Next.js Middleware — Admin Route Protection
 *
 * Protects all /admin/* routes (except /admin/login).
 * Uses Supabase server client to verify active session via cookies.
 * Demo mode uses a separate cookie when DEMO_MODE=true.
 *
 * - No session + accessing /admin/* → redirect to /admin/login
 * - Active session + accessing /admin/login → redirect to /admin/dashboard
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import {
  DEMO_SESSION_COOKIE,
  isDemoModeEnabled,
} from "@/lib/demo/constants";

function hasDemoSession(request: NextRequest) {
  return (
    isDemoModeEnabled() &&
    request.cookies.get(DEMO_SESSION_COOKIE)?.value === "1"
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only run on /admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const isLoginPage = pathname === "/admin/login";
  const demoAuthenticated = hasDemoSession(request);

  if (demoAuthenticated) {
    if (isLoginPage) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/dashboard";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response = NextResponse.next({
              request: { headers: request.headers },
            });
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is logged in and on login page, redirect to dashboard
  if (user && isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/dashboard";
    return NextResponse.redirect(url);
  }

  // If user is NOT logged in and NOT on login page, redirect to login
  if (!user && !isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
