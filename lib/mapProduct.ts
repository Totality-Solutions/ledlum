import { PRODUCT_IMAGES } from "@/content/data/productImages";

export function mapProduct(
  product: any,
  familyProducts: any[]
) {
  const images =
    PRODUCT_IMAGES[
      product.model.toUpperCase()
    ];

  return {
    category: product.category,

    series: product.model,

    group: product.group_name,

    collection: "indoor",

    dimming: "Non - Dimming",

    hero: {
      category: product.category,
      name: product.model,
      description:
        product.hero_description || "",
        
      images:
        images?.heroCarousel || [],
    },

    config: {
      models: familyProducts.map(
        (p) => p.model
      ),

      dimensions:
        product.dimensions
          ? [product.dimensions]
          : [],

      watts:
        product.watts
          ? [product.watts]
          : [],

      cct: (product.cct || []).map(
        (item: string) => ({
          label: item,
          color:
            item === "3000K"
              ? "#F5D68C"
              : item === "4000K"
              ? "#F5F5F5"
              : "#D6E4F0",
        })
      ),

      bodyColors:
        product.body_colors || [],

      beamAngles:
        product.beam_angle
          ? [product.beam_angle]
          : [],

      ipRating:
        product.ip_rating
          ? [product.ip_rating]
          : [],

      cutoutSizes:
        product.cutout_size
          ? [product.cutout_size]
          : [],

      ledChip:
        product.led_chip
          ? [product.led_chip]
          : [],

      luminous:
        product.luminous
          ? [product.luminous]
          : [],

      cri:
        product.cri
          ? [product.cri]
          : [],
    },

    gallery:
      images?.gallery || [],

    permutations: [],
  };
}