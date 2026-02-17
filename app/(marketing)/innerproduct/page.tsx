import ProductInnerHero from "@/components/sections/innerproduct/InnerProductHero"; 
import { ProductInfoSection } from "@/components/sections/innerproduct/ProductInfo"; 
import { ProductShowcaseGallery } from "@/components/sections/innerproduct/ProductShowcaseGallery";

export default function InnerProductPage() {
  return (
    <div>
        <ProductInnerHero />
        <ProductInfoSection />
        <ProductShowcaseGallery />
    </div>
  );
}