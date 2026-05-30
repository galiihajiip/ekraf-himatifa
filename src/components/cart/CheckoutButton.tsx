"use client";

/**
 * CheckoutButton Component
 *
 * Opens WhatsApp with a pre-filled order message.
 * Clears the cart after a short delay.
 */

import { MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { generateWhatsAppUrl } from "@/lib/utils/whatsapp";

export default function CheckoutButton() {
  const { items, cartTotal, cartCount, clearCart, closeCart } = useCart();

  const handleCheckout = () => {
    if (cartCount === 0) return;

    const url = generateWhatsAppUrl(items, cartTotal);
    window.open(url, "_blank");

    // Clear cart and close drawer after a short delay
    setTimeout(() => {
      clearCart();
      closeCart();
    }, 1000);
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={cartCount === 0}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <MessageCircle className="h-5 w-5" />
      Pesan via WhatsApp
    </button>
  );
}
