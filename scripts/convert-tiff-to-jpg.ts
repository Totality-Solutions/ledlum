// Run in its own process per file (spawned from upload-klewe-images.ts).
// libtiff tracks a cumulative memory-allocation counter across sharp/vips
// calls within one process; several of these TIFFs together exceed its
// safety cap even though each is fine alone in a fresh process.
import sharp from "sharp";

const [, , inputPath, outputPath] = process.argv;

sharp(inputPath, { limitInputPixels: false })
  .jpeg({ quality: 85 })
  .toFile(outputPath)
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
