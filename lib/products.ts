import { supabase } from "@/lib/supabase";

export async function getProduct(model?: string) {
  if (!model) return null;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("model", model.trim().toUpperCase())
    .maybeSingle();

  if (error) {
    console.log(error);
    return null;
  }

  return data;
}

export async function getFamilyProducts(
  family?: string
) {
  if (!family) return [];

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("family", family)
    .order("model");

  if (error) {
    console.log(error);
    return [];
  }

  return data || [];
}

export async function getCategoryFamilies(
  category?: string
) {
  if (!category) return [];

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category);

  if (error) {
    console.log(error);
    return [];
  }

  return data || [];
}

// Add this to your existing Supabase actions file
export async function getAllProductsForCatalog() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("model"); // Alphabetical sorting by model code

  if (error) {
    console.error("Error fetching catalog database records:", error);
    return [];
  }

  return data || [];
}