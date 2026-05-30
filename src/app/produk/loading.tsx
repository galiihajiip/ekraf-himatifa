/**
 * Loading state for the product catalog page.
 * Shows a skeleton grid while data is being fetched.
 */

export default function ProdukLoading() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Header skeleton */}
      <div className="mb-6 sm:mb-8">
        <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
        <div className="mt-2 h-4 w-64 animate-pulse rounded bg-gray-200" />
      </div>

      {/* Tabs skeleton */}
      <div className="mb-6 flex gap-2 sm:mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-9 w-28 animate-pulse rounded-full bg-gray-200"
          />
        ))}
      </div>

      {/* Product grid skeleton */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="animate-pulse rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            <div className="aspect-[4/3] w-full rounded-lg bg-gray-200" />
            <div className="mt-4 space-y-3">
              <div className="h-3 w-16 rounded bg-gray-200" />
              <div className="h-4 w-3/4 rounded bg-gray-200" />
              <div className="h-5 w-1/3 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
