/**
 * Admin — Edit Product Page
 */

import { notFound } from "next/navigation";
import { getCatalogProductById, getCategories } from "@/lib/data/catalog";
import ProductForm from "@/components/admin/ProductForm";

interface EditProductPageProps {
  params: { id: string };
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const [product, categories] = await Promise.all([
    getCatalogProductById(params.id),
    getCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Edit Produk</h1>
      <p className="mt-1 text-sm text-gray-500">
        Perbarui informasi produk di bawah
      </p>

      <div className="mt-6">
        <ProductForm categories={categories} product={product} />
      </div>
    </div>
  );
}
