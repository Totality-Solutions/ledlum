export default function GridOverlay() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Strictly solid black base */}
      <div className="absolute inset-0 bg-black" />
      {/* Ultra-subtle 60px technical grid (match for your screenshots) */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />
    </div>
  );
}