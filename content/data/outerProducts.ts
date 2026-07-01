// @/content/data/outerProducts.ts
import { INDOOR_MODEL_DATABASE } from "./indoorCategoryMap";
import fs from "fs";
import path from "path";

export interface OuterProduct {
  id: string;
  title: string;
  image: string;
  heroBannerImage: string;
  collection: string;
  category: string;
  group: string;
  dimming: string;
  series: string;
}

function loadOutdoorProducts(): Record<string, OuterProduct> {
  const productsMap: Record<string, OuterProduct> = {};
  const dir = path.join(process.cwd(), "content", "data", "outdoor");

  if (!fs.existsSync(dir)) return productsMap;

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));

  for (const file of files) {
    const raw = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
    const category = raw.category || file.replace(".json", "");
    const products = raw.products || [];

    for (const product of products) {
      const model = product.item_number;
      if (!model) continue;

      const uniqueId = model.toLowerCase().replace(/[^a-z0-9]/g, "-");
      const extractedSeries = model.split("-")[0] || "General";

      let assignedDimming = "Non - Dimming";
      if (product.feature?.toLowerCase().includes("dali") || product.feature?.toLowerCase().includes("dimm")) {
        assignedDimming = "Dali";
      }

      productsMap[uniqueId] = {
        id: uniqueId,
        title: model,
        image: `https://placehold.co/800x800/1a1a1a/ffffff?text=${encodeURIComponent(model)}`,
        heroBannerImage: "/images/home/product/Outdoor.jpeg",
        collection: "outdoor",
        category,
        group: category,
        dimming: assignedDimming,
        series: extractedSeries,
      };
    }
  }

  return productsMap;
}

export function generateOuterPageData(collection: string): Record<string, OuterProduct> {
  const productsMap: Record<string, OuterProduct> = {};

  if (collection === "indoor") {
    Object.entries(INDOOR_MODEL_DATABASE).forEach(([categoryKey, subCategories]) => {
      Object.entries(subCategories).forEach(([_, modelsList]) => {
        modelsList.forEach((modelName) => {
          const uniqueId = modelName.toLowerCase().replace(/[^a-z0-9]/g, "-");
          const extractedSeries = modelName.split("-")[0] || "General";

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
            group: categoryKey,
            dimming: assignedDimming,
            series: extractedSeries,
          };
        });
      });
    });
  } else if (collection === "outdoor") {
    return loadOutdoorProducts();
  }

  return productsMap;
}