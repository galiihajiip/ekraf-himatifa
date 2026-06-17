"use server";

/**
 * Admin Server Actions
 *
 * Secure CRUD operations for products.
 * All actions validate the user session before executing.
 * Image uploads go to Supabase Storage "product-images" bucket.
 * In demo mode, data is stored locally and images go to /public/uploads/demo.
 */

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isDemoAuthenticated } from "@/lib/demo/auth";
import { isDemoModeEnabled } from "@/lib/demo/constants";
import {
  createDemoProduct,
  deleteDemoProduct,
  updateDemoProduct,
} from "@/lib/demo/store";
import { uploadDemoImage } from "@/lib/demo/upload";

/** Validate admin session — throws redirect if not authenticated */
async function requireAuth() {
  if (isDemoModeEnabled() && (await isDemoAuthenticated())) {
    return { mode: "demo" as const };
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return { mode: "supabase" as const, supabase, user };
}

/**
 * Upload an image to Supabase Storage and return the public URL.
 */
async function uploadImage(
  supabase: ReturnType<typeof createClient>,
  file: File
): Promise<string | null> {
  if (!file || file.size === 0) return null;

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `products/${fileName}`;

  const { error } = await supabase.storage
    .from("product-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Image upload error:", error.message);
    return null;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("product-images").getPublicUrl(filePath);

  return publicUrl;
}

/**
 * Create a new product.
 */
export async function createProduct(formData: FormData) {
  const auth = await requireAuth();

  const name = formData.get("name") as string;
  const price = parseInt(formData.get("price") as string, 10);
  const category = formData.get("category") as string;
  const description = (formData.get("description") as string) || null;
  const imageFile = formData.get("image") as File | null;

  let image_url: string | null = null;
  if (imageFile && imageFile.size > 0) {
    image_url =
      auth.mode === "demo"
        ? await uploadDemoImage(imageFile)
        : await uploadImage(auth.supabase, imageFile);
  }

  if (auth.mode === "demo") {
    await createDemoProduct({
      name,
      price,
      category,
      description,
      image_url,
    });
  } else {
    const { error } = await auth.supabase.from("products").insert({
      name,
      price,
      category,
      description,
      image_url,
    });

    if (error) {
      console.error("Create product error:", error.message);
      return { error: error.message };
    }
  }

  revalidatePath("/admin/produk");
  revalidatePath("/produk");
  revalidatePath("/");
  redirect("/admin/produk");
}

/**
 * Update an existing product.
 */
export async function updateProduct(id: string, formData: FormData) {
  const auth = await requireAuth();

  const name = formData.get("name") as string;
  const price = parseInt(formData.get("price") as string, 10);
  const category = formData.get("category") as string;
  const description = (formData.get("description") as string) || null;
  const imageFile = formData.get("image") as File | null;
  const existingImageUrl = formData.get("existing_image_url") as string | null;

  let image_url = existingImageUrl || null;
  if (imageFile && imageFile.size > 0) {
    const newUrl =
      auth.mode === "demo"
        ? await uploadDemoImage(imageFile)
        : await uploadImage(auth.supabase, imageFile);
    if (newUrl) image_url = newUrl;
  }

  if (auth.mode === "demo") {
    const updated = await updateDemoProduct(id, {
      name,
      price,
      category,
      description,
      image_url,
    });

    if (!updated) {
      return { error: "Produk tidak ditemukan." };
    }
  } else {
    const { error } = await auth.supabase
      .from("products")
      .update({
        name,
        price,
        category,
        description,
        image_url,
      })
      .eq("id", id);

    if (error) {
      console.error("Update product error:", error.message);
      return { error: error.message };
    }
  }

  revalidatePath("/admin/produk");
  revalidatePath("/produk");
  revalidatePath(`/produk/${id}`);
  revalidatePath("/");
  redirect("/admin/produk");
}

/**
 * Delete a product by ID.
 */
export async function deleteProduct(id: string) {
  const auth = await requireAuth();

  if (auth.mode === "demo") {
    const deleted = await deleteDemoProduct(id);
    if (!deleted) {
      return { error: "Produk tidak ditemukan." };
    }
  } else {
    const { error } = await auth.supabase.from("products").delete().eq("id", id);

    if (error) {
      console.error("Delete product error:", error.message);
      return { error: error.message };
    }
  }

  revalidatePath("/admin/produk");
  revalidatePath("/produk");
  revalidatePath("/");
}
