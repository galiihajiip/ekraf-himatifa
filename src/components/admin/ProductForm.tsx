"use client";

/**
 * ProductForm Component
 *
 * Shared form for creating and editing products.
 * Handles image upload with preview.
 */

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Upload, X } from "lucide-react";
import { createProduct, updateProduct } from "@/lib/actions/admin";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string | null;
  image_url: string | null;
}

interface ProductFormProps {
  categories: Category[];
  product?: Product;
}

export default function ProductForm({ categories, product }: ProductFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    product?.image_url ?? null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditing = !!product;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    // Add existing image URL for edit mode
    if (isEditing && product.image_url && !formData.get("image")) {
      formData.set("existing_image_url", product.image_url);
    }

    try {
      if (isEditing) {
        const result = await updateProduct(product.id, formData);
        if (result?.error) {
          setError(result.error);
          setLoading(false);
        }
      } else {
        const result = await createProduct(formData);
        if (result?.error) {
          setError(result.error);
          setLoading(false);
        }
      }
    } catch {
      // redirect throws NEXT_REDIRECT which is caught here — that's expected
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
    >
      {/* Error */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Product Name */}
      <div className="mb-4">
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          Nama Produk *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={product?.name ?? ""}
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-navy focus:ring-1 focus:ring-navy"
          placeholder="Contoh: Netflix Premium 1 Bulan"
        />
      </div>

      {/* Price */}
      <div className="mb-4">
        <label
          htmlFor="price"
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          Harga (Rp) *
        </label>
        <input
          id="price"
          name="price"
          type="number"
          required
          min={0}
          defaultValue={product?.price ?? ""}
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-navy focus:ring-1 focus:ring-navy"
          placeholder="Contoh: 50000"
        />
      </div>

      {/* Category */}
      <div className="mb-4">
        <label
          htmlFor="category"
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          Kategori *
        </label>
        <select
          id="category"
          name="category"
          required
          defaultValue={product?.category ?? ""}
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-navy focus:ring-1 focus:ring-navy"
        >
          <option value="" disabled>
            Pilih kategori
          </option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div className="mb-4">
        <label
          htmlFor="description"
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          Deskripsi
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={product?.description ?? ""}
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-navy focus:ring-1 focus:ring-navy"
          placeholder="Deskripsi produk (opsional)"
        />
      </div>

      {/* Image Upload */}
      <div className="mb-6">
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Gambar Produk
        </label>

        {imagePreview ? (
          <div className="relative inline-block">
            <div className="relative h-40 w-40 overflow-hidden rounded-lg border border-gray-200">
              <Image
                src={imagePreview}
                alt="Preview"
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>
            <button
              type="button"
              onClick={clearImage}
              className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white shadow-sm hover:bg-red-600"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <label
            htmlFor="image"
            className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 px-6 py-8 transition-colors hover:border-navy/30"
          >
            <Upload className="h-8 w-8 text-gray-400" />
            <span className="mt-2 text-sm text-gray-500">
              Klik untuk upload gambar
            </span>
            <span className="mt-1 text-xs text-gray-400">
              PNG, JPG, WEBP (max 5MB)
            </span>
          </label>
        )}

        <input
          ref={fileInputRef}
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Hidden field for existing image URL */}
        {isEditing && product.image_url && (
          <input
            type="hidden"
            name="existing_image_url"
            value={product.image_url}
          />
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-navy px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Menyimpan..."
            : isEditing
            ? "Simpan Perubahan"
            : "Tambah Produk"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/produk")}
          className="rounded-lg border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
