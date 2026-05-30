/**
 * CategoryGrid Component
 *
 * Responsive grid displaying three clickable category cards.
 * Each card links to the product page filtered by category.
 */

import Link from "next/link";
import { Monitor, Shirt, Printer } from "lucide-react";

const categories = [
  {
    name: "Aplikasi Premium",
    slug: "aplikasi-premium",
    description: "Netflix, Spotify, YouTube Premium, dan layanan digital lainnya.",
    icon: Monitor,
  },
  {
    name: "Merchandise HIMATIFA",
    slug: "merchandise-himatifa",
    description: "Ospek Kit, Hampers, Jaket, dan merchandise eksklusif lainnya.",
    icon: Shirt,
  },
  {
    name: "Jasa Print",
    slug: "jasa-print",
    description: "Cetak dokumen, poster, stiker, dan kebutuhan print lainnya.",
    icon: Printer,
  },
];

export default function CategoryGrid() {
  return (
    <section id="katalog" className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">
            Kategori Produk
          </h2>
          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Pilih kategori yang kamu butuhkan
          </p>
        </div>

        {/* Grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                href={`/produk?category=${cat.slug}`}
                className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-gold/30 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy/5 transition-colors group-hover:bg-gold/10">
                  <Icon className="h-6 w-6 text-navy transition-colors group-hover:text-gold" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-navy">
                  {cat.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{cat.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
