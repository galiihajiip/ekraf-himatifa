/**
 * WhatsApp Checkout Utility
 *
 * Generates a pre-filled WhatsApp message URL with order details.
 */

import type { CartItem } from "@/context/CartContext";

/** Format price to Indonesian Rupiah */
function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Generate a WhatsApp URL with a pre-filled order message.
 * Opens wa.me with the encoded message for the admin to read.
 */
export function generateWhatsAppUrl(
  cartItems: CartItem[],
  cartTotal: number
): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "6281234567890";

  // Build the order message
  const lines: string[] = [
    "🛒 *PESANAN BARU | Ekraf HIMATIFA*",
    "",
    "Halo kak, saya ingin memesan:",
    "",
  ];

  // Numbered item list
  cartItems.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    lines.push(
      `${index + 1}. ${item.name}`,
      `   ${item.quantity}x ${formatPrice(item.price)} = ${formatPrice(subtotal)}`,
      ""
    );
  });

  // Total
  lines.push("─────────────────────");
  lines.push(`*Total: ${formatPrice(cartTotal)}*`);
  lines.push("");
  lines.push("Mohon konfirmasi ketersediaan dan metode pembayarannya ya kak. Terima kasih! 🙏");

  const message = lines.join("\n");
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${phone}?text=${encodedMessage}`;
}
