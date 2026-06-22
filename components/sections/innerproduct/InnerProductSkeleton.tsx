export default function InnerProductSkeleton() {
  return (
    <main className="bg-black min-h-screen">
      {/* Hero skeleton */}
      <div className="relative w-full h-[45vh] bg-white/5 animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: image gallery skeleton */}
          <div className="space-y-4">
            <div className="aspect-square bg-white/5 rounded-2xl animate-pulse" />
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-16 h-16 bg-white/5 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>

          {/* Right: product info skeleton */}
          <div className="space-y-6">
            <div className="h-8 w-48 bg-white/10 rounded animate-pulse" />
            <div className="h-5 w-32 bg-white/10 rounded animate-pulse" />
            <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-white/5 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-white/5 rounded animate-pulse" />
            <div className="pt-4 space-y-3">
              <div className="h-6 w-40 bg-white/10 rounded animate-pulse" />
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-10 bg-white/5 rounded-lg animate-pulse" />
                ))}
              </div>
            </div>
            <div className="pt-4 space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-between py-2 border-b border-white/5">
                  <div className="h-4 w-24 bg-white/5 rounded animate-pulse" />
                  <div className="h-4 w-32 bg-white/5 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
