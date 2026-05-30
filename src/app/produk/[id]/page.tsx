/**
 * Product Detail Page
 *
 * Server-side rendered page displaying full product information.
 * The "Tambah ke Keranjang" button is a client component.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProductById } from "@/lib/actions/products";
import AddToCartButton from "./AddToCartButton";

interface ProductDetailPageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const product = await getProductById(params.id);

  if (!product) {
    return { title: "Produk Tidak Ditemukan" };
  }

  return {
    title: product.name,
    description:
      product.description ??
      `Beli ${product.name} di EKraf HIMATIFA dengan harga terjangkau.`,
    openGraph: {
      title: `${product.name} | EKraf HIMATIFA`,
      description:
        product.description ??
        `Beli ${product.name} di EKraf HIMATIFA.`,
      images: product.image_url ? [product.image_url] : undefined,
    },
  };
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
    "apparel-merchandise": "Apparel & Merchandise",
    "fnb-danus": "F&B / Dana Usaha",
    "printing-services": "Printing Services",
  };
  return map[slug] ?? slug;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Back Button */}
      <Link
        href="/produk"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-navy"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Katalog
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Product Image */}
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200">
              <span className="text-lg text-gray-400">No Image</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          {/* Category Badge */}
          <span className="mb-3 inline-block w-fit rounded-full bg-navy/5 px-3 py-1 text-xs font-medium text-navy">
            {getCategoryLabel(product.category)}
          </span>

          {/* Name */}
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {product.name}
          </h1>

          {/* Price */}
          <p className="mt-3 text-2xl font-bold text-gold sm:text-3xl">
            {formatPrice(product.price)}
          </p>

          {/* Description */}
          {product.description && (
            <div className="mt-6 border-t border-gray-100 pt-6">
              <h2 className="text-sm font-semibold text-gray-700">Deskripsi</h2>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-gray-600 sm:text-base">
                {product.description}
              </p>
            </div>
          )}

          {/* Add to Cart Button */}
          <div className="mt-8">
            <AddToCartButton
              id={product.id}
              name={product.name}
              price={product.price}
              image_url={product.image_url ?? undefined}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
