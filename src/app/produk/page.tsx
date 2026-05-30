/**
 * Product Catalog Page
 *
 * Server-side rendered page that fetches products from Supabase.
 * Supports category filtering via URL search params.
 */

import { getProducts } from "@/lib/actions/products";
import ProductCard from "@/components/products/ProductCard";
import CategoryTabs from "@/components/products/CategoryTabs";
import { PackageOpen } from "lucide-react";

interface ProdukPageProps {
  searchParams: { category?: string };
}

export default async function ProdukPage({ searchParams }: ProdukPageProps) {
  const category = searchParams.category ?? "";
  const products = await getProducts(category || undefined);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold text-navy sm:text-3xl">
          Katalog Produk
        </h1>
        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          Temukan produk yang kamu butuhkan
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="mb-6 sm:mb-8">
        <CategoryTabs activeCategory={category} />
      </div>

      {/* Product Grid or Empty State */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <PackageOpen className="h-16 w-16 text-gray-300" />
          <h3 className="mt-4 text-lg font-medium text-gray-600">
            Belum ada produk
          </h3>
          <p className="mt-1 text-sm text-gray-400">
            Produk untuk kategori ini belum tersedia. Cek kembali nanti.
          </p>
        </div>
      )}
    </section>
  );
}
