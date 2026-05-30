"use server";

/**
 * Admin Server Actions
 *
 * Secure CRUD operations for products.
 * All actions validate the user session before executing.
 * Image uploads go to Supabase Storage "product-images" bucket.
 */

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/** Validate admin session — throws redirect if not authenticated */
async function requireAuth() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return { supabase, user };
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
  const { supabase } = await requireAuth();

  const name = formData.get("name") as string;
  const price = parseInt(formData.get("price") as string, 10);
  const category = formData.get("category") as string;
  const description = (formData.get("description") as string) || null;
  const imageFile = formData.get("image") as File | null;

  // Upload image if provided
  let image_url: string | null = null;
  if (imageFile && imageFile.size > 0) {
    image_url = await uploadImage(supabase, imageFile);
  }

  const { error } = await supabase.from("products").insert({
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

  revalidatePath("/admin/produk");
  revalidatePath("/produk");
  revalidatePath("/");
  redirect("/admin/produk");
}

/**
 * Update an existing product.
 */
export async function updateProduct(id: string, formData: FormData) {
  const { supabase } = await requireAuth();

  const name = formData.get("name") as string;
  const price = parseInt(formData.get("price") as string, 10);
  const category = formData.get("category") as string;
  const description = (formData.get("description") as string) || null;
  const imageFile = formData.get("image") as File | null;
  const existingImageUrl = formData.get("existing_image_url") as string | null;

  // Upload new image or keep existing
  let image_url = existingImageUrl || null;
  if (imageFile && imageFile.size > 0) {
    const newUrl = await uploadImage(supabase, imageFile);
    if (newUrl) image_url = newUrl;
  }

  const { error } = await supabase
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
  const { supabase } = await requireAuth();

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error("Delete product error:", error.message);
    return { error: error.message };
  }

  revalidatePath("/admin/produk");
  revalidatePath("/produk");
  revalidatePath("/");
}
