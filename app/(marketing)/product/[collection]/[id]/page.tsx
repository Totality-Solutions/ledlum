"use client";

import { useParams, useRouter } from "next/navigation";
import { PRODUCT_DATABASE } from "@/content/data/products";

import ProductInnerHero from "@/components/sections/innerproduct/InnerProductHero";
import ProductInfoSection from "@/components/sections/innerproduct/ProductInfo";
import ProductShowcaseGallery from "@/components/sections/innerproduct/ProductShowcaseGallery";

export default function InnerProductContent() {

  const params = useParams();
  const router = useRouter();

  const id = params.id as string;
  const collection = params.collection as string;

  const product = PRODUCT_DATABASE[id as keyof typeof PRODUCT_DATABASE];

  if (!product) {
    return (
      <div className="text-white bg-black h-screen flex items-center justify-center">
        Product Not Found
      </div>
    );
  }

  const handleModelChange = (newId: string) => {
    router.push(`/product/${collection}/${newId}`);
  };

  return (
    <main className="bg-black min-h-screen">

      <ProductInnerHero data={product.hero} />

      <ProductInfoSection
        config={product.config}
        activeId={id}
        onModelChange={handleModelChange}
        permutations={product.permutations}
        allModelIds={Object.keys(PRODUCT_DATABASE)}
      />

      <ProductShowcaseGallery images={product.gallery} />

    </main>
  );
}