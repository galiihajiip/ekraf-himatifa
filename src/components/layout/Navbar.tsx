"use client";

/**
 * Navbar Component
 *
 * Clean white navbar with gold top accent strip.
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
    <header className="sticky top-0 z-50">
      {/* Gold accent strip */}
      <div className="h-1 bg-gradient-to-r from-gold via-gold to-accent-blue" />

      <nav className="border-b border-gray-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="HIMATIFA Logo"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <div className="flex flex-col">
                <span className="text-base font-bold leading-tight text-navy sm:text-lg">
                  Ekraf HIMATIFA
                </span>
                <span className="hidden text-[10px] text-gray-400 sm:block">
                  UPN Veteran Jawa Timur
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-navy"
                >
                  {link.label}
                </Link>
              ))}

              {/* Cart Icon */}
              <button
                onClick={toggleCart}
                className="relative rounded-lg bg-navy/5 p-2 transition-colors hover:bg-navy/10"
                aria-label="Buka keranjang"
              >
                <ShoppingCart className="h-5 w-5 text-navy" />
                {itemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-navy">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile: Cart + Hamburger */}
            <div className="flex items-center gap-3 md:hidden">
              <button
                onClick={toggleCart}
                className="relative rounded-lg bg-navy/5 p-2"
                aria-label="Buka keranjang"
              >
                <ShoppingCart className="h-5 w-5 text-navy" />
                {itemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-navy">
                    {itemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
                aria-label={isOpen ? "Tutup menu" : "Buka menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="border-t border-gray-100 pb-4 md:hidden">
              <div className="flex flex-col gap-1 pt-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-navy"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
