/**
 * HeroBanner Component
 *
 * Dark navy hero with animated gradient orbs and dot pattern.
 * No 3D, just clean CSS animations.
 */

import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-gradient-to-br from-navy via-navy to-[#0f2a45] sm:min-h-[80vh]">
      {/* Animated gradient orbs */}
      <div className="absolute -left-32 -top-32 h-96 w-96 animate-pulse rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 animate-pulse rounded-full bg-accent-blue/10 blur-3xl" style={{ animationDelay: "1s" }} />
      <div className="absolute left-1/2 top-1/3 h-64 w-64 animate-pulse rounded-full bg-accent-green/5 blur-3xl" style={{ animationDelay: "2s" }} />

      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "radial-gradient(circle, #F5D000 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-navy/30" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl items-center px-4 sm:min-h-[80vh] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-gold" />
            <span className="text-xs font-medium text-gold">
              Ekraf HIMATIFA UPN Veteran Jatim
            </span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Satu Platform untuk{" "}
            <span className="bg-gradient-to-r from-gold to-yellow-300 bg-clip-text text-transparent">
              Semua Layanan
            </span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-gray-300 sm:mt-6 sm:text-lg">
            Aplikasi premium, merchandise eksklusif, dana usaha, hingga jasa
            print. Pesan mudah, langsung terhubung ke admin via WhatsApp.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:mt-10 sm:flex-row sm:justify-center">
            <Link
              href="#katalog"
              className="inline-flex items-center gap-2 rounded-xl bg-gold px-7 py-3.5 text-sm font-bold text-navy shadow-lg shadow-gold/20 transition-all hover:scale-105 hover:shadow-gold/30 sm:text-base"
            >
              Lihat Katalog
            </Link>
            <Link
              href="/produk"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-7 py-3.5 text-sm font-medium text-white transition-all hover:border-white/40 hover:bg-white/5 sm:text-base"
            >
              Semua Produk
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80L60 68C120 56 240 32 360 24C480 16 600 24 720 32C840 40 960 48 1080 44C1200 40 1320 24 1380 16L1440 8V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
