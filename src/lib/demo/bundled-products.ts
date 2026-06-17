import type { Product } from "@/lib/actions/products";
import catalog from "../../../data/demo-products.json";

export const BUNDLED_DEMO_PRODUCTS = catalog.products as Product[];
