/**
 * HeroBanner Component
 *
 * Full-width hero section with gold/yellow primary background.
 */

import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gold">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold via-gold/95 to-yellow-400/80" />
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-navy/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl lg:text-5xl">
            Satu Platform untuk Semua{" "}
            <span className="text-accent-green">Layanan Ekraf</span>
          </h1>
          <p className="mt-4 text-base text-navy/70 sm:mt-6 sm:text-lg">
            Aplikasi premium, merchandise eksklusif, dana usaha, hingga jasa
            print, semua tersedia di satu tempat. Pesan mudah, langsung
            terhubung ke admin via WhatsApp.
          </p>
          <div className="mt-8 sm:mt-10">
            <Link
              href="#katalog"
              className="inline-block rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-navy/90 sm:px-8 sm:py-3.5 sm:text-base"
            >
              Lihat Katalog
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
