/**
 * Product Server Actions
 *
 * Server-side data fetching functions for products.
 * These run on the server and can be called from Server Components.
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image_url: string | null;
  description: string | null;
  created_at: string;
}

export {
  getCatalogProductById as getProductById,
  getCatalogProducts as getProducts,
} from "@/lib/data/catalog";
