"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  DEMO_EMAIL_COOKIE,
  DEMO_SESSION_COOKIE,
  getDemoCredentials,
  isDemoModeEnabled,
} from "@/lib/demo/constants";

export async function isDemoAuthenticated() {
  if (!isDemoModeEnabled()) {
    return false;
  }

  const cookieStore = cookies();
  return cookieStore.get(DEMO_SESSION_COOKIE)?.value === "1";
}

export async function getDemoUserEmail() {
  if (!(await isDemoAuthenticated())) {
    return null;
  }

  const cookieStore = cookies();
  return cookieStore.get(DEMO_EMAIL_COOKIE)?.value ?? getDemoCredentials().email;
}

export async function loginDemo(email: string, password: string) {
  if (!isDemoModeEnabled()) {
    return { error: "Mode demo tidak aktif." };
  }

  const credentials = getDemoCredentials();

  if (email !== credentials.email || password !== credentials.password) {
    return { error: "Email atau password demo salah." };
  }

  const cookieStore = cookies();
  cookieStore.set(DEMO_SESSION_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  cookieStore.set(DEMO_EMAIL_COOKIE, credentials.email, {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin/dashboard");
}

export async function logoutDemo() {
  const cookieStore = cookies();
  cookieStore.delete(DEMO_SESSION_COOKIE);
  cookieStore.delete(DEMO_EMAIL_COOKIE);
}
