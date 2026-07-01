import { Container } from "@/components/layout/Container";

export default function ProductGridSkeleton() {
  return (
    <>
      <Container className="pt-12">
        <div className="hidden lg:flex gap-10 items-center border-b border-white/10 mb-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 w-20 bg-white/10 rounded animate-pulse my-6" />
          ))}
        </div>

        <div className="hidden lg:flex py-4">
          <div className="h-12 w-[400px] bg-white/10 rounded-lg animate-pulse" />
        </div>

        <div className="lg:hidden flex justify-between items-center py-4">
          <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
          <div className="h-11 w-11 bg-white/10 rounded-full animate-pulse" />
        </div>
      </Container>

      <Container className="py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="p-2 lg:p-3 border border-[#444444] rounded-[16px] lg:rounded-[25px] flex flex-col justify-between animate-pulse"
            >
              <div>
                <div className="aspect-square relative rounded-[12px] overflow-hidden bg-white/10 mb-4" />
                <div className="flex flex-col gap-2 p-1 lg:py-2 lg:px-4">
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-16 bg-white/10 rounded" />
                    <div className="h-8 w-8 rounded-full bg-white/10" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-24 bg-white/10 rounded" />
                    <div className="h-3 w-12 bg-white/10 rounded" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  )
}
