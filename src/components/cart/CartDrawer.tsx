"use client";

/**
 * CartDrawer Component
 *
 * Slide-in drawer from the right displaying cart items.
 * Features: item list with quantity stepper, delete button,
 * cart total, checkout button, and empty state.
 */

import { useEffect } from "react";
import Image from "next/image";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CheckoutButton from "./CheckoutButton";

/** Format price to Indonesian Rupiah */
function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export default function CartDrawer() {
  const {
    items,
    cartTotal,
    cartCount,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
  } = useCart();

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeCart]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Keranjang Belanja"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 sm:px-6">
          <h2 className="text-lg font-bold text-navy">
            Keranjang{" "}
            {cartCount > 0 && (
              <span className="text-sm font-normal text-gray-400">
                ({cartCount} item)
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            aria-label="Tutup keranjang"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
          {items.length === 0 ? (
            /* Empty State */
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="h-16 w-16 text-gray-200" />
              <h3 className="mt-4 text-base font-medium text-gray-600">
                Keranjang kosong
              </h3>
              <p className="mt-1 text-sm text-gray-400">
                Yuk, tambahkan produk ke keranjangmu!
              </p>
              <button
                onClick={closeCart}
                className="mt-6 rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy/90"
              >
                Lihat Produk
              </button>
            </div>
          ) : (
            /* Item List */
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 rounded-lg border border-gray-100 p-3"
                >
                  {/* Item Image */}
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <ShoppingBag className="h-5 w-5 text-gray-300" />
                      </div>
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="line-clamp-2 text-sm font-medium text-gray-800">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex-shrink-0 rounded p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                        aria-label={`Hapus ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gold">
                        {formatPrice(item.price)}
                      </span>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="flex h-7 w-7 items-center justify-center rounded border border-gray-200 text-gray-500 transition-colors hover:bg-gray-100"
                          aria-label="Kurangi jumlah"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-gray-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="flex h-7 w-7 items-center justify-center rounded border border-gray-200 text-gray-500 transition-colors hover:bg-gray-100"
                          aria-label="Tambah jumlah"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer with Total & Checkout */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-4 py-4 sm:px-6">
            {/* Total */}
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Total</span>
              <span className="text-lg font-bold text-navy">
                {formatPrice(cartTotal)}
              </span>
            </div>

            {/* Checkout Button */}
            <CheckoutButton />
          </div>
        )}
      </aside>
    </>
  );
}
