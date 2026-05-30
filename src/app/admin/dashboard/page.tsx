/**
 * Admin Dashboard Page
 *
 * Shows summary stats: total products and products per category.
 */

import { createClient } from "@/lib/supabase/server";

async function getStats() {
  const supabase = createClient();

  const { data: products } = await supabase
    .from("products")
    .select("id, category");

  const total = products?.length ?? 0;

  const perCategory: Record<string, number> = {};
  products?.forEach((p) => {
    perCategory[p.category] = (perCategory[p.category] || 0) + 1;
  });

  return { total, perCategory };
}

const categoryLabels: Record<string, string> = {
  "aplikasi-premium": "Aplikasi Premium",
  "merchandise-himatifa": "Merchandise HIMATIFA",
  "jasa-print": "Jasa Print",
};

export default async function AdminDashboardPage() {
  const { total, perCategory } = await getStats();

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Dashboard</h1>
      <p className="mt-2 text-gray-500">
        Selamat datang di Admin Panel EKraf HIMATIFA.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Products */}
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Produk</p>
          <p className="mt-1 text-2xl font-bold text-navy">{total}</p>
        </div>

        {/* Per Category */}
        {Object.entries(categoryLabels).map(([slug, label]) => (
          <div
            key={slug}
            className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-gray-500">{label}</p>
            <p className="mt-1 text-2xl font-bold text-navy">
              {perCategory[slug] ?? 0}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
