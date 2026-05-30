"use client";

/**
 * Navbar Component
 *
 * Responsive navigation bar with:
 * - Department name/logo on the left
 * - Navigation links (Home, Produk, Tentang)
 * - Cart icon with dynamic item-count badge (opens CartDrawer)
 * - Mobile hamburger menu with slide-down nav
 */

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/produk", label: "Produk" },
  { href: "/tentang", label: "Tentang" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { itemCount, toggleCart } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-navy shadow-md">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Department Name */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="HIMATIFA Logo"
              width={36}
              height={36}
              className="h-9 w-9"
            />
            <span className="text-lg font-bold text-white sm:text-xl">
              Ekraf <span className="text-gold">HIMATIFA</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-200 transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ))}

            {/* Cart Icon — opens drawer */}
            <button
              onClick={toggleCart}
              className="relative"
              aria-label="Buka keranjang"
            >
              <ShoppingCart className="h-5 w-5 text-gray-200 transition-colors hover:text-gold" />
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-navy">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile: Cart + Hamburger */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleCart}
              className="relative"
              aria-label="Buka keranjang"
            >
              <ShoppingCart className="h-5 w-5 text-gray-200" />
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-navy">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-200 hover:text-gold"
              aria-label={isOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Menu */}
        {isOpen && (
          <div className="border-t border-white/10 pb-4 md:hidden">
            <div className="flex flex-col gap-2 pt-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-white/10 hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
