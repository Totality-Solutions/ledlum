"use client";

import {
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  memo,
  useEffect,
  useState,
} from "react";

import ProductInnerHero from "@/components/sections/innerproduct/InnerProductHero";
import ProductInfoSection from "@/components/sections/innerproduct/ProductInfo";
import ProductShowcaseGallery from "@/components/sections/innerproduct/ProductShowcaseGallery";

import {
  getProduct,
  getFamilyProducts,
  getCategoryProducts,
  getAllProducts,
} from "@/lib/products";

import { mapProduct } from "@/lib/mapProduct";

const InnerProductPage = memo(function InnerProductPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const collection = params.collection as string;
  const familyId = params.id as string;

  const [product, setProduct] = useState<any>(null);
  const [relatedModelIds, setRelatedModelIds] = useState<string[]>([]);
  const [modelFamilies, setModelFamilies] = useState<any[]>([]);

  const [activeModel, setActiveModel] =
    useState(
      (searchParams.get("model") || familyId).replace(/\s+/g, "+").toUpperCase()
    );

  useEffect(() => {
    const modelFromUrl = searchParams.get("model");
    if (modelFromUrl) {
      setActiveModel(modelFromUrl.replace(/\s+/g, "+").toUpperCase());
    }
  }, [searchParams]);

  useEffect(() => {
    let cancelled = false;

    async function loadProduct() {
      if (!activeModel) return;

      const rawProduct = await getProduct(activeModel);
      if (!rawProduct || cancelled) return;

      const [familyProducts, categoryProducts] = await Promise.all([
        rawProduct.family ? getFamilyProducts(rawProduct.family) : Promise.resolve([]),
        rawProduct.category
          ? getCategoryProducts(rawProduct.category)
          : getAllProducts().then(all => all.filter((p: any) => p.group_name === rawProduct.group_name)),
      ]);

      if (cancelled) return;

      const relatedModels = familyProducts.length > 0 ? familyProducts : categoryProducts;
      setRelatedModelIds(relatedModels.map((p: any) => p.model));

      const familyMap: any = {};
      if (familyProducts.length > 0) {
        categoryProducts.forEach((item: any) => {
          if (!familyMap[item.family]) {
            familyMap[item.family] = { familyName: item.family, models: [] };
          }
          familyMap[item.family].models.push(item.model);
        });
      } else {
        categoryProducts.forEach((item: any) => {
          const key = item.group_name || "General";
          if (!familyMap[key]) {
            familyMap[key] = { familyName: key, models: [] };
          }
          familyMap[key].models.push(item.model);
        });
      }

      setModelFamilies(Object.values(familyMap));
      setProduct(mapProduct(rawProduct, familyProducts.length > 0 ? familyProducts : categoryProducts));
    }

    loadProduct();

    return () => { cancelled = true; };
  }, [activeModel]);

  if (!product) {
    return (
      <div className="text-white bg-black h-screen flex items-center justify-center">
        Loading Product...
      </div>
    );
  }

  const handleModelChange = (newId: string) => {
    setActiveModel(newId.toUpperCase());
    router.replace(
      `/product/${collection}/${familyId}?model=${newId.toLowerCase()}`,
      { scroll: false }
    );
  };

  return (
    <main className="bg-black min-h-screen">
      <ProductInnerHero data={product.hero} />
      <ProductInfoSection
        config={product.config}
        activeId={activeModel}
        onModelChange={handleModelChange}
        permutations={product.permutations}
        allModelIds={relatedModelIds}
        modelFamilies={modelFamilies}
      />
      <ProductShowcaseGallery images={product.gallery} />
    </main>
  );
});

export default InnerProductPage;
