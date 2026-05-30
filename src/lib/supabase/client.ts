/**
 * Supabase Browser Client
 * 
 * This client is used in Client Components (components with "use client" directive).
 * It creates a singleton Supabase client for browser-side operations.
 */

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
