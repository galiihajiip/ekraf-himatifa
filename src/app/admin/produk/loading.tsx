/**
 * Loading state for the admin products page.
 */

export default function AdminProductsLoading() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-32 animate-pulse rounded bg-gray-200" />
          <div className="mt-2 h-4 w-48 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="h-10 w-36 animate-pulse rounded-lg bg-gray-200" />
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="p-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex items-center gap-4 border-b border-gray-50 py-4 last:border-0"
            >
              <div className="h-10 w-10 animate-pulse rounded-md bg-gray-200" />
              <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
              <div className="ml-auto flex gap-2">
                <div className="h-7 w-14 animate-pulse rounded bg-gray-200" />
                <div className="h-7 w-14 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
