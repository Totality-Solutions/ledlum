"use client";

import {
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  memo,
  useMemo,
  useEffect,
  useState,
} from "react";

import ProductInnerHero from "@/components/sections/innerproduct/InnerProductHero";
import ProductInfoSection from "@/components/sections/innerproduct/ProductInfo";
import ProductShowcaseGallery from "@/components/sections/innerproduct/ProductShowcaseGallery";

import { getProductInnerDetails } from "@/content/data/innerProductDetails";
import { INDOOR_MODEL_DATABASE } from "@/content/data/indoorCategoryMap";

const InnerProductPage = memo(function InnerProductPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const collection = params.collection as string;
  const familyId = params.id as string;

  const relatedModelIds = useMemo(() => {
  const currentModel = familyId.toUpperCase();

  for (const category of Object.values(INDOOR_MODEL_DATABASE)) {
    for (const modelsArray of Object.values(category)) {
      const found = modelsArray.some(
        model => model.toUpperCase() === currentModel
      );

      if (found) {
        return modelsArray;
      }
    }
  }

  return [currentModel];
}, [familyId]);

  const modelFamilies = useMemo(() => {
  const matchedCategory = Object.values(
    INDOOR_MODEL_DATABASE
  ).find((subCatGroup) =>
    Object.values(subCatGroup).some((modelsArray) =>
      modelsArray.some(
        (m) =>
          m.toLowerCase() === familyId.toLowerCase()
      )
    )
  );

  if (!matchedCategory) {
    return [];
  }

  return Object.entries(matchedCategory).map(
    ([familyName, models]) => ({
      familyName,
      models,
    })
  );
}, [familyId]);

  const initialModel =
    searchParams.get("model")?.toUpperCase() ||
    relatedModelIds[0];

  const [activeModel, setActiveModel] =
    useState(initialModel);

  useEffect(() => {
    const modelFromUrl =
      searchParams.get("model")?.toUpperCase();

    if (modelFromUrl) {
      setActiveModel(modelFromUrl);
    }
  }, [searchParams]);

  const product = useMemo(() => {
    return getProductInnerDetails(activeModel);
  }, [activeModel]);

  if (!product) {
    return (
      <div className="text-white bg-black h-screen flex items-center justify-center font-pop">
        Product Not Found
      </div>
    );
  }

  const handleModelChange = (newId: string) => {
    setActiveModel(newId.toUpperCase());

    router.replace(
      `/product/${collection}/${familyId}?model=${newId.toLowerCase()}`,
      {
        scroll: false,
      }
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

      <ProductShowcaseGallery
        images={product.gallery}
      />
    </main>
  );
});

export default InnerProductPage;