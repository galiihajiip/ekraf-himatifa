"use client";

/**
 * Navbar Component
 *
 * Responsive navigation bar with yellow (gold) background matching HIMATIFA logo.
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
    <header className="sticky top-0 z-50 bg-gold shadow-md">
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
            <span className="text-lg font-bold text-navy sm:text-xl">
              Ekraf <span className="text-accent-green">HIMATIFA</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-navy/80 transition-colors hover:text-navy"
              >
                {link.label}
              </Link>
            ))}

            {/* Cart Icon */}
            <button
              onClick={toggleCart}
              className="relative"
              aria-label="Buka keranjang"
            >
              <ShoppingCart className="h-5 w-5 text-navy/80 transition-colors hover:text-navy" />
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent-red text-[10px] font-bold text-white">
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
              <ShoppingCart className="h-5 w-5 text-navy" />
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent-red text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-navy hover:text-navy/70"
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
          <div className="border-t border-navy/10 pb-4 md:hidden">
            <div className="flex flex-col gap-2 pt-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-semibold text-navy/80 transition-colors hover:bg-navy/10 hover:text-navy"
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
