/**
 * Admin Dashboard Page
 *
 * Placeholder dashboard for the admin panel.
 */

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Dashboard</h1>
      <p className="mt-2 text-gray-500">
        Selamat datang di Admin Panel EKraf HIMATIFA.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder Stats Cards */}
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Produk</p>
          <p className="mt-1 text-2xl font-bold text-navy">—</p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Kategori</p>
          <p className="mt-1 text-2xl font-bold text-navy">3</p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Status</p>
          <p className="mt-1 text-2xl font-bold text-green-600">Aktif</p>
        </div>
      </div>
    </div>
  );
}
