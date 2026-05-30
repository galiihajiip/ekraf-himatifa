"use client";

/**
 * AddToCartButton Component
 *
 * Client-side button that adds a product to the cart via CartContext.
 * Separated from the server-rendered product detail page.
 */

import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

interface AddToCartButtonProps {
  id: string;
  name: string;
  price: number;
  image_url?: string;
}

export default function AddToCartButton({
  id,
  name,
  price,
  image_url,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem({ id, name, price, image_url });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleClick}
      disabled={added}
      className={`flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all sm:w-auto sm:text-base ${
        added
          ? "bg-green-500 text-white"
          : "bg-navy text-white hover:bg-navy/90"
      }`}
    >
      {added ? (
        <>
          <Check className="h-5 w-5" />
          Ditambahkan
        </>
      ) : (
        <>
          <ShoppingCart className="h-5 w-5" />
          Tambah ke Keranjang
        </>
      )}
    </button>
  );
}
