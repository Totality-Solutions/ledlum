// components/blog/TechGrid.tsx
export default function TechGrid() {
  return (
    <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
      {/* 1. Subtle Background Grid */}
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* 2. Radial Glow (Mimicking the image glow) */}
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-orange-900/10 blur-[140px] pointer-events-none" />
    </div>
  );
}