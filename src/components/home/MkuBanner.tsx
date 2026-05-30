/**
 * MkuBanner Component
 *
 * Academic narrative section explaining the project context.
 * Displays the MKU Kepemimpinan project information per proposal.
 */

import { Shield } from "lucide-react";

export default function MkuBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Subtle decorative elements */}
      <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-navy/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Icon */}
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-navy/10">
            <Shield className="h-6 w-6 text-navy" />
          </div>

          {/* Title */}
          <h2 className="text-lg font-bold text-navy sm:text-xl lg:text-2xl">
            Digitalisasi Layanan Penjualan dan Katalogisasi Terpadu Departemen
            Ekonomi Kreatif (Ekraf) HIMATIFA
          </h2>

          {/* Supervision Info */}
          <p className="mt-4 text-sm text-gray-500 sm:text-base">
            Project Kepemimpinan | Kelompok 1, Kelas G415
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Dosen Pengampu:{" "}
            <span className="font-medium text-navy">
              Ir. Bambang Wahyudi M.S.
            </span>
          </p>

          {/* Team Members */}
          <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-400 sm:text-sm">
            <span>Daffa Najwan Fadhilah</span>
            <span>Fidelia Hahas Asabela</span>
            <span>Galih Aji Pangestu</span>
            <span>Evrillia Kurniawati</span>
          </div>

          {/* Description */}
          <div className="mt-6 space-y-3 text-sm leading-relaxed text-gray-600 sm:text-base">
            <p>
              Platform ini hadir sebagai solusi atas pengelolaan transaksi dan
              promosi Departemen Ekraf yang masih berjalan secara konvensional
              dan terfragmentasi melalui pesan instan. Dengan website e-commerce
              terintegrasi, seluruh lini bisnis Ekraf tersentralisasi dalam
              satu platform yang mudah diakses.
            </p>
            <p>
              Transformasi digital ini bertujuan memangkas alur birokrasi
              pemesanan, meminimalisir kesalahan pencatatan manual, serta
              merepresentasikan kompetensi mahasiswa Informatika dalam
              menerapkan ilmu teknologi ke penyelesaian masalah nyata di
              organisasinya.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
