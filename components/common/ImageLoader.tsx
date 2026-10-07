// Loading indicator shown over images while they load (see SmartImage).
// Two outlined squares chase each other around a square box; the keyframes
// live in app/globals.css (.image-loader-square) so they're defined once,
// not once per image.
export default function ImageLoader() {
  return (
    <span className="relative block w-[30px] aspect-square">
      <span className="image-loader-square absolute rounded-[50px] shadow-[inset_0_0_0_3px] shadow-white" />
      <span className="image-loader-square image-loader-square--delayed absolute rounded-[50px] shadow-[inset_0_0_0_3px] shadow-white" />
    </span>
  );
}
