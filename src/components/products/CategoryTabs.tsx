"use client";

/**
 * CategoryTabs Component
 *
 * Filter tabs for the product catalog page.
 * Uses URL search params for server-side filtering.
 */

import Link from "next/link";

const categories = [
  { label: "Semua", slug: "" },
  { label: "Digital Services", slug: "digital-services" },
  { label: "Apparel & Merchandise", slug: "apparel-merchandise" },
  { label: "F&B / Danus", slug: "fnb-danus" },
  { label: "Printing Services", slug: "printing-services" },
];

interface CategoryTabsProps {
  activeCategory: string;
}

export default function CategoryTabs({ activeCategory }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.slug;
        return (
          <Link
            key={cat.slug}
            href={cat.slug ? `/produk?category=${cat.slug}` : "/produk"}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-navy text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat.label}
          </Link>
        );
      })}
    </div>
  );
}
