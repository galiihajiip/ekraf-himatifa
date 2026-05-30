/**
 * CategoryGrid Component
 *
 * Polished category cards with colored icon backgrounds.
 */

import Link from "next/link";
import { Monitor, Shirt, Coffee, Printer } from "lucide-react";

const categories = [
  {
    name: "Digital Services",
    slug: "digital-services",
    description:
      "Netflix, Spotify, YouTube Premium, dan layanan aplikasi prabayar lainnya.",
    icon: Monitor,
    color: "bg-accent-blue/10 text-accent-blue",
    border: "hover:border-accent-blue/30",
  },
  {
    name: "Apparel & Merchandise",
    slug: "apparel-merchandise",
    description:
      "Jaket himpunan, merchandise maba, ospek kit, hampers, dan desain eksklusif.",
    icon: Shirt,
    color: "bg-gold/10 text-gold",
    border: "hover:border-gold/30",
  },
  {
    name: "F&B / Dana Usaha",
    slug: "fnb-danus",
    description:
      "Makanan, minuman, dan produk dana usaha untuk mendukung kegiatan himpunan.",
    icon: Coffee,
    color: "bg-accent-green/10 text-accent-green",
    border: "hover:border-accent-green/30",
  },
  {
    name: "Printing Services",
    slug: "printing-services",
    description:
      "Jasa print dokumen, poster, stiker, materai, dan kebutuhan cetak lainnya.",
    icon: Printer,
    color: "bg-accent-red/10 text-accent-red",
    border: "hover:border-accent-red/30",
  },
];

export default function CategoryGrid() {
  return (
    <section id="katalog" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-gold">
            Kategori
          </span>
          <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl lg:text-4xl">
            Layanan Kami
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-500 sm:text-base">
            Pilih kategori produk atau layanan yang kamu butuhkan
          </p>
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                href={`/produk?category=${cat.slug}`}
                className={`group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${cat.border}`}
              >
                {/* Decorative corner */}
                <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gray-50 transition-colors group-hover:bg-gray-100" />

                <div className={`relative flex h-12 w-12 items-center justify-center rounded-xl ${cat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="relative mt-4 text-base font-bold text-navy sm:text-lg">
                  {cat.name}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-gray-500">
                  {cat.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
