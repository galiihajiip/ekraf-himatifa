/**
 * Admin — Create New Product Page
 */

import { getCategories } from "@/lib/data/catalog";
import ProductForm from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Tambah Produk Baru</h1>
      <p className="mt-1 text-sm text-gray-500">
        Isi form di bawah untuk menambahkan produk baru
      </p>

      <div className="mt-6">
        <ProductForm categories={categories} />
      </div>
    </div>
  );
}
