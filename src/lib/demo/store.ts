import { promises as fs } from "fs";
import path from "path";
import type { Product } from "@/lib/actions/products";
import { BUNDLED_DEMO_PRODUCTS } from "@/lib/demo/bundled-products";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "demo-products.json");

async function ensureStore(): Promise<Product[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw) as { products?: Product[] };
    if (parsed.products?.length) {
      return parsed.products;
    }
  } catch {
    // Fall back to bundled catalog (works on Vercel without writable data/)
  }

  return BUNDLED_DEMO_PRODUCTS;
}

async function writeProducts(products: Product[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(
    DATA_FILE,
    JSON.stringify({ products }, null, 2),
    "utf-8"
  );
}

export async function getDemoProducts(category?: string): Promise<Product[]> {
  const products = await ensureStore();
  const sorted = [...products].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  if (!category) {
    return sorted;
  }

  return sorted.filter((product) => product.category === category);
}

export async function getDemoProductById(id: string): Promise<Product | null> {
  const products = await ensureStore();
  return products.find((product) => product.id === id) ?? null;
}

export async function createDemoProduct(
  input: Omit<Product, "id" | "created_at">
): Promise<Product> {
  const products = await ensureStore();
  const product: Product = {
    ...input,
    id: `demo-prod-${Date.now()}`,
    created_at: new Date().toISOString(),
  };

  products.unshift(product);
  await writeProducts(products);
  return product;
}

export async function updateDemoProduct(
  id: string,
  input: Partial<Omit<Product, "id" | "created_at">>
): Promise<Product | null> {
  const products = await ensureStore();
  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return null;
  }

  products[index] = { ...products[index], ...input };
  await writeProducts(products);
  return products[index];
}

export async function deleteDemoProduct(id: string): Promise<boolean> {
  const products = await ensureStore();
  const nextProducts = products.filter((product) => product.id !== id);

  if (nextProducts.length === products.length) {
    return false;
  }

  await writeProducts(nextProducts);
  return true;
}
