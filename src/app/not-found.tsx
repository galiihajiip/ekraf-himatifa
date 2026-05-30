/**
 * Custom 404 Page
 */

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-extrabold text-navy">404</h1>
      <h2 className="mt-4 text-xl font-semibold text-gray-700">
        Halaman Tidak Ditemukan
      </h2>
      <p className="mt-2 text-sm text-gray-500">
        Maaf, halaman yang kamu cari tidak ada atau sudah dipindahkan.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy/90"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
