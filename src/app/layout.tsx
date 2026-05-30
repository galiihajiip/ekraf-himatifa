import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import ServiceWorkerRegister from "@/components/pwa/ServiceWorkerRegister";
import InstallPrompt from "@/components/pwa/InstallPrompt";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#F5D000",
};

export const metadata: Metadata = {
  title: {
    default: "Ekraf HIMATIFA | E-Commerce Terpadu",
    template: "%s | Ekraf HIMATIFA",
  },
  description:
    "Platform e-commerce terpadu Departemen Ekonomi Kreatif HIMATIFA UPN Veteran Jawa Timur. Digital services, merchandise, F&B, dan printing services.",
  manifest: "/manifest.json",
  openGraph: {
    title: "Ekraf HIMATIFA | E-Commerce Terpadu",
    description:
      "Platform e-commerce terpadu Departemen Ekonomi Kreatif HIMATIFA UPN Veteran Jawa Timur.",
    siteName: "Ekraf HIMATIFA",
    locale: "id_ID",
    type: "website",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ekraf HIMATIFA",
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
        <ServiceWorkerRegister />
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
          <InstallPrompt />
        </CartProvider>
      </body>
    </html>
  );
}
