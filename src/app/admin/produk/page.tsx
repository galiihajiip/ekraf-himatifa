/**
 * Admin Products List Page
 *
 * Table listing all products with edit/delete actions.
 */

import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { getCatalogProducts } from "@/lib/data/catalog";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

const categoryLabels: Record<string, string> = {
  "digital-services": "Digital Services",
  "apparel-merchandise": "Apparel & Merchandise",
  "fnb-danus": "F&B / Danus",
  "printing-services": "Printing Services",
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export default async function AdminProductsPage() {
  const products = await getCatalogProducts();

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy">Produk</h1>
          <p className="mt-1 text-sm text-gray-500">
            Kelola semua produk di toko
          </p>
        </div>
        <Link
          href="/admin/produk/new"
          className="flex items-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy/90"
        >
          <Plus className="h-4 w-4" />
          Tambah Produk
        </Link>
      </div>

      {/* Products Table */}
      <div className="mt-6 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-100 bg-gray-50">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-600">Gambar</th>
                <th className="px-4 py-3 font-medium text-gray-600">Nama</th>
                <th className="px-4 py-3 font-medium text-gray-600">Kategori</th>
                <th className="px-4 py-3 font-medium text-gray-600">Harga</th>
                <th className="px-4 py-3 font-medium text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products && products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-md bg-gray-100">
                        {product.image_url ? (
                          <Image
                            src={product.image_url}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                            —
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {product.name}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {categoryLabels[product.category] ?? product.category}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/produk/${product.id}/edit`}
                          className="rounded-md bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-100"
                        >
                          Edit
                        </Link>
                        <DeleteProductButton
                          id={product.id}
                          name={product.name}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-gray-400"
                  >
                    Belum ada produk. Klik &quot;Tambah Produk&quot; untuk memulai.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
