// @/content/data/outerProducts.ts
import { INDOOR_MODEL_DATABASE } from "./indoorCategoryMap";

export interface OuterProduct {
  id: string;
  title: string;
  image: string;
  heroBannerImage: string;
  collection: string;
  category: string;
  group: string; // Dynamic Group String
  dimming: string;
  series: string;
}

export function generateOuterPageData(collection: string): Record<string, OuterProduct> {
  const productsMap: Record<string, OuterProduct> = {};

  if (collection !== "indoor") return productsMap;

  // Object entries loop pure headings ko dynamic groups mein transform karega
  Object.entries(INDOOR_MODEL_DATABASE).forEach(([categoryKey, subCategories]) => {
    Object.entries(subCategories).forEach(([subCategoryKey, modelsList]) => {
      modelsList.forEach((modelName) => {
        const uniqueId = modelName.toLowerCase().replace(/[^a-z0-9]/g, "-");
        const extractedSeries = modelName.split("-")[0] || "General";

        // Dynamic dimming string detection rule
        let assignedDimming = "Non - Dimming";
        if (modelName.includes("A") || modelName.includes("TR") || categoryKey.includes("IP54") || categoryKey.includes("Vision")) {
          assignedDimming = "Dali";
        } else if (categoryKey.includes("Magnetic") || modelName.startsWith("LMT") || modelName.startsWith("LRT")) {
          assignedDimming = "DP";
        }

        productsMap[uniqueId] = {
          id: uniqueId,
          title: modelName,
          image: `https://placehold.co/800x800/1a1a1a/ffffff?text=${encodeURIComponent(modelName)}`,
          heroBannerImage: "/images/home/product/Indoor.jpeg",
          collection: "indoor",
          category: categoryKey, 
          group: categoryKey, // Category heading hi group ban gayi -> Poori tarah dynamic!
          dimming: assignedDimming,
          series: extractedSeries
        };
      });
    });
  });

  return productsMap;
}