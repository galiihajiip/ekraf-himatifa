/**
 * Admin Login Page
 *
 * HOW TO CREATE AN ADMIN USER:
 * 1. Go to your Supabase Dashboard → Authentication → Users
 * 2. Click "Add user" → "Create new user"
 * 3. Enter email (e.g., admin@ekraf-himatifa.com) and a strong password
 * 4. Check "Auto Confirm User" so the account is immediately active
 * 5. Click "Create user"
 * 6. Use those credentials to log in here at /admin/login
 *
 * DEMO MODE (DEMO_MODE=true in .env.local):
 * - Email: demo@ekraf.local
 * - Password: demo123456
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { loginDemo } from "@/lib/demo/auth";
import {
  DEFAULT_DEMO_EMAIL,
  DEFAULT_DEMO_PASSWORD,
} from "@/lib/demo/constants";

const demoModeEnabled = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
const demoEmail =
  process.env.NEXT_PUBLIC_DEMO_EMAIL ?? DEFAULT_DEMO_EMAIL;
const demoPassword =
  process.env.NEXT_PUBLIC_DEMO_PASSWORD ?? DEFAULT_DEMO_PASSWORD;

function getLoginErrorMessage(message: string) {
  const normalizedMessage = message.toLowerCase();

  if (
    normalizedMessage.includes("failed to fetch") ||
    normalizedMessage.includes("fetch failed") ||
    normalizedMessage.includes("networkerror")
  ) {
    return "Tidak bisa terhubung ke Supabase. Gunakan akun demo di bawah atau periksa NEXT_PUBLIC_SUPABASE_URL di .env.local.";
  }

  return message;
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(demoModeEnabled ? demoEmail : "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDemoLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const result = await loginDemo(demoEmail, demoPassword);
      if (result?.error) {
        setError(result.error);
        setLoading(false);
      }
    } catch {
      router.push("/admin/dashboard");
      router.refresh();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (demoModeEnabled && email === demoEmail && password === demoPassword) {
      try {
        const result = await loginDemo(email, password);
        if (result?.error) {
          setError(result.error);
          setLoading(false);
        }
      } catch {
        router.push("/admin/dashboard");
        router.refresh();
      }
      return;
    }

    try {
      const supabase = createClient();

      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(getLoginErrorMessage(authError.message));
        setLoading(false);
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login gagal.";
      setError(getLoginErrorMessage(message));
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-navy">Admin Panel</h1>
          <p className="mt-1 text-sm text-gray-500">
            Ekraf HIMATIFA | Login untuk mengelola produk
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
        >
          {/* Error Message */}
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 outline-none transition-colors focus:border-navy focus:ring-1 focus:ring-navy"
              placeholder="admin@ekraf-himatifa.com"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 outline-none transition-colors focus:border-navy focus:ring-1 focus:ring-navy"
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-navy px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Login"}
          </button>
        </form>

        {demoModeEnabled && (
          <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50 p-4">
            <p className="text-sm font-medium text-amber-900">Akun Demo</p>
            <p className="mt-1 text-xs text-amber-800">
              Email: <span className="font-mono">{demoEmail}</span>
              <br />
              Password: <span className="font-mono">{demoPassword}</span>
            </p>
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="mt-3 w-full rounded-lg border border-amber-200 bg-white px-4 py-2.5 text-sm font-semibold text-amber-900 transition-colors hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Memproses..." : "Masuk sebagai Demo"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
