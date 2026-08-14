import { PRODUCT_IMAGES } from "@/content/data/productImages";
import { cctToColor, bodyColorToHex } from "@/lib/productColors";

export function mapProduct(product: any, familyProducts: any[]) {
  // Prefer real uploaded photos from Supabase (product.gallery_images); fall
  // back to the legacy hardcoded PRODUCT_IMAGES map for the handful of
  // models that predate the upload pipeline and don't have DB images yet.
  const staticImages = PRODUCT_IMAGES[product.model.toUpperCase()];
  const dbImages: string[] = product.gallery_images || [];
  const heroCarousel = dbImages.length > 0 ? dbImages : staticImages?.heroCarousel || [];
  const gallery = dbImages.length > 0 ? dbImages : staticImages?.gallery || [];

  // Check if product is flagged as a new launch
  const isNewLaunch = product.product_type?.toLowerCase() === "new";

  const categoryLabel = product.category || product.group_name || "General";

  return {
    category: categoryLabel,
    isNewLaunch, 
    series: product.model,
    group: product.group_name,
    collection: product.collection || "indoor",
    dimming: "Non - Dimming",

    hero: {
      category: categoryLabel,
      name: product.model,
      description: product.hero_description || "",
      images: heroCarousel,
    },

    config: {
      models: familyProducts.map((p) => p.model),
      dimensions: product.dimensions ? [product.dimensions] : [],
      watts: product.watts ? [product.watts] : [],
      cct: (product.cct || []).map((item: string) => ({
        label: item,
        color: cctToColor(item),
      })),
      bodyColors: (product.body_colors || []).map((item: string) => ({
        label: item,
        hex: bodyColorToHex(item),
      })),
      beamAngles: product.beam_angle ? [product.beam_angle] : [],
      ipRating: product.ip_rating ? [product.ip_rating] : [],
      cutoutSizes: product.cutout_size ? [product.cutout_size] : [],
      ledChip: product.led_chip ? [product.led_chip] : [],
      luminous: product.luminous ? [product.luminous] : [],
      cri: product.cri ? [product.cri] : [],
      extraSpecs: product.extra_specs || {},
    },

    gallery,
    permutations: [],
  };
}