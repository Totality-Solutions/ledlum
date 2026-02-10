import { productLines, type ProductLine, type ProductVariant } from "@/content/data/products";

export function getAllProductLines(): ProductLine[] {
  return productLines;
}

export function getProductLineBySlug(slug: string): ProductLine | undefined {
  return productLines.find((product) => product.slug === slug);
}

export function getProductVariant(slug: string, variantSlug: string): ProductVariant | undefined {
  const product = getProductLineBySlug(slug);
  return product?.variants.find((variant) => variant.slug === variantSlug);
}
