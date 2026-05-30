/**
 * FeaturedProducts Component
 *
 * Placeholder section with skeleton loading cards.
 * Will be connected to real Supabase data in the next step.
 */

export default function FeaturedProducts() {
  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">
            Produk Unggulan
          </h2>
          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Produk terlaris dan paling diminati
          </p>
        </div>

        {/* Skeleton Grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
            >
              {/* Image skeleton */}
              <div className="h-40 w-full rounded-lg bg-gray-200 sm:h-48" />

              {/* Text skeletons */}
              <div className="mt-4 space-y-3">
                <div className="h-4 w-3/4 rounded bg-gray-200" />
                <div className="h-3 w-1/2 rounded bg-gray-200" />
                <div className="h-8 w-1/3 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
