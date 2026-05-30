/**
 * HeroBanner Component
 *
 * Full-width hero section with headline, subheadline, and CTA button.
 * Uses navy/gold color scheme.
 */

import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-navy">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-navy/80" />
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-gold/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Satu Platform untuk Semua{" "}
            <span className="text-gold">Layanan Ekraf</span>
          </h1>
          <p className="mt-4 text-base text-gray-300 sm:mt-6 sm:text-lg">
            Aplikasi premium, merchandise eksklusif, dana usaha, hingga jasa
            print — semua tersedia di satu tempat. Pesan mudah, langsung
            terhubung ke admin via WhatsApp.
          </p>
          <div className="mt-8 sm:mt-10">
            <Link
              href="#katalog"
              className="inline-block rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-navy shadow-lg transition-all hover:bg-gold/90 hover:shadow-gold/25 sm:px-8 sm:py-3.5 sm:text-base"
            >
              Lihat Katalog
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
