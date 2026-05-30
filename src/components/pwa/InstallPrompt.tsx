"use client";

/**
 * InstallPrompt Component
 *
 * Shows a banner prompting users to install the PWA.
 * Only appears when the app is installable (beforeinstallprompt fires).
 */

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if already dismissed
    const dismissed = localStorage.getItem("pwa-install-dismissed");
    if (dismissed) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem("pwa-install-dismissed", "true");
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[80] mx-auto max-w-md animate-[slideUp_0.3s_ease-out] rounded-xl border border-gray-100 bg-white p-4 shadow-2xl sm:left-auto sm:right-6 sm:mx-0">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gold/10">
          <Download className="h-5 w-5 text-gold" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-navy">Install Ekraf HIMATIFA</h3>
          <p className="mt-0.5 text-xs text-gray-500">
            Install app untuk akses cepat dan notifikasi produk baru.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={handleInstall}
              className="rounded-lg bg-navy px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-navy/90"
            >
              Install
            </button>
            <button
              onClick={handleDismiss}
              className="rounded-lg px-3 py-2 text-xs font-medium text-gray-500 transition-colors hover:text-gray-700"
            >
              Nanti saja
            </button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 rounded p-1 text-gray-400 hover:text-gray-600"
          aria-label="Tutup"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
