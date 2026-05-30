"use client";

/**
 * ProductCard Component
 *
 * Reusable card displaying product info with hover animation.
 * Uses CartContext for the "Tambah ke Keranjang" button.
 */

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/actions/products";

interface ProductCardProps {
  product: Product;
}

/** Format price to Indonesian Rupiah */
function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/** Map category slug to display label */
function getCategoryLabel(slug: string): string {
  const map: Record<string, string> = {
    "digital-services": "Digital Services",
    "apparel-merchandise": "Merchandise",
    "fnb-danus": "F&B / Danus",
    "printing-services": "Printing",
  };
  return map[slug] ?? slug;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url ?? undefined,
    });
  };

  return (
    <Link
      href={`/produk/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-lg"
    >
      {/* Product Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200">
            <span className="text-sm text-gray-400">No Image</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-4">
        {/* Category Badge */}
        <span className="mb-2 inline-block w-fit rounded-full bg-navy/5 px-2.5 py-0.5 text-xs font-medium text-navy">
          {getCategoryLabel(product.category)}
        </span>

        {/* Product Name */}
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-800 sm:text-base">
          {product.name}
        </h3>

        {/* Price + Cart Button */}
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-base font-bold text-gold sm:text-lg">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={handleAddToCart}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-white transition-colors hover:bg-navy/80"
            aria-label={`Tambah ${product.name} ke keranjang`}
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}
