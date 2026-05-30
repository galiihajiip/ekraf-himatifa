"use client";

/**
 * Error state for the product catalog page.
 * Shows a friendly error message with a retry button.
 */

import { AlertTriangle } from "lucide-react";

export default function ProdukError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
      <AlertTriangle className="h-16 w-16 text-gold" />
      <h2 className="mt-4 text-xl font-semibold text-gray-700">
        Terjadi Kesalahan
      </h2>
      <p className="mt-2 text-sm text-gray-500">
        Gagal memuat data produk. Silakan coba lagi.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy/90"
      >
        Coba Lagi
      </button>
    </section>
  );
}
