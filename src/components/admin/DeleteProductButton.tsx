"use client";

/**
 * DeleteProductButton Component
 *
 * Shows a confirmation dialog before deleting a product.
 * Calls the deleteProduct server action and refreshes the page.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/lib/actions/admin";

interface DeleteProductButtonProps {
  id: string;
  name: string;
}

export default function DeleteProductButton({
  id,
  name,
}: DeleteProductButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Yakin ingin menghapus "${name}"? Tindakan ini tidak bisa dibatalkan.`
    );

    if (!confirmed) return;

    setLoading(true);
    await deleteProduct(id);
    router.refresh();
    setLoading(false);
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="rounded-md bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100 disabled:opacity-50"
    >
      {loading ? "..." : "Hapus"}
    </button>
  );
}
