// Product data types and functions
export interface ProductLine {
  id: string;
  slug: string;
  name: string;
  description: string;
  variants: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

// Mock product data
const productLines: ProductLine[] = [
  {
    id: "1",
    slug: "led-lum-outdoor",
    name: "LED Lum Outdoor",
    description: "Professional outdoor lighting solutions",
    variants: [
      {
        id: "1-1",
        slug: "flood-light",
        name: "Flood Light",
        price: 299,
        image: "/images/products/flood-light.jpg",
        category: "Outdoor"
      }
    ]
  }
];

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
