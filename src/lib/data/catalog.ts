import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/actions/products";
import { DEMO_CATEGORIES, isDemoModeEnabled } from "@/lib/demo/constants";
import {
  getDemoProductById,
  getDemoProducts,
} from "@/lib/demo/store";

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export async function getCategories(): Promise<Category[]> {
  if (isDemoModeEnabled()) {
    return [...DEMO_CATEGORIES];
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching categories:", error.message);
    return [...DEMO_CATEGORIES];
  }

  return data ?? [];
}

export async function getCatalogProducts(
  category?: string
): Promise<Product[]> {
  if (isDemoModeEnabled()) {
    return getDemoProducts(category);
  }

  const supabase = createClient();

  let query = supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }

  return data ?? [];
}

export async function getCatalogProductById(
  id: string
): Promise<Product | null> {
  if (isDemoModeEnabled()) {
    return getDemoProductById(id);
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching product:", error.message);
    return null;
  }

  return data;
}
