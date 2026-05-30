import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "EKraf HIMATIFA — E-Commerce Terpadu",
    template: "%s | EKraf HIMATIFA",
  },
  description:
    "Platform e-commerce terpadu Departemen Ekonomi Kreatif HIMATIFA UPN Veteran Jawa Timur. Digital services, merchandise, F&B, dan printing services.",
  openGraph: {
    title: "EKraf HIMATIFA — E-Commerce Terpadu",
    description:
      "Platform e-commerce terpadu Departemen Ekonomi Kreatif HIMATIFA UPN Veteran Jawa Timur.",
    siteName: "EKraf HIMATIFA",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
