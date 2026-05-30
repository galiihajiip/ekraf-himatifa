/**
 * Product Server Actions
 *
 * Server-side data fetching functions for products.
 * These run on the server and can be called from Server Components.
 */

import { createClient } from "@/lib/supabase/server";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image_url: string | null;
  description: string | null;
  created_at: string;
}

/**
 * Fetch all products, optionally filtered by category slug.
 */
export async function getProducts(category?: string): Promise<Product[]> {
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

/**
 * Fetch a single product by its ID.
 */
export async function getProductById(id: string): Promise<Product | null> {
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
