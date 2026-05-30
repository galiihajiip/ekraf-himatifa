/**
 * Admin — Create New Product Page
 */

import { createClient } from "@/lib/supabase/server";
import ProductForm from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const supabase = createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Tambah Produk Baru</h1>
      <p className="mt-1 text-sm text-gray-500">
        Isi form di bawah untuk menambahkan produk baru
      </p>

      <div className="mt-6">
        <ProductForm categories={categories ?? []} />
      </div>
    </div>
  );
}
