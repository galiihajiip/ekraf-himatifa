/**
 * MkuBanner Component
 *
 * Academic narrative section explaining the project context.
 * Displays the MKU Kepemimpinan final project information.
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
          <h2 className="text-xl font-bold text-navy sm:text-2xl lg:text-3xl">
            Klik Bijak, Klik Aman: Mewujudkan Generasi Tangguh Digital
          </h2>

          {/* Supervision Info */}
          <p className="mt-3 text-sm text-gray-500 sm:text-base">
            Proyek Akhir MKU Kepemimpinan — Kelas G429
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Di bawah bimbingan{" "}
            <span className="font-medium text-navy">
              Dr. Ir. Indra Tjahaja Amir, M.P.
            </span>
          </p>

          {/* Description */}
          <div className="mt-6 space-y-3 text-sm leading-relaxed text-gray-600 sm:text-base">
            <p>
              Inisiatif ini hadir sebagai upaya nyata dalam mendorong literasi
              digital di kalangan mahasiswa. Melalui layanan digital yang
              praktis, kami membangun kesadaran akan pentingnya keamanan siber
              dalam aktivitas sehari-hari.
            </p>
            <p>
              Dengan mengedepankan prinsip transaksi yang aman dan transparan,
              platform ini menjadi wadah edukasi sekaligus praktik langsung
              dalam mewujudkan budaya digital yang sehat dan bertanggung jawab.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
