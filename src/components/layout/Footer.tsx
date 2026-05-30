/**
 * Footer Component
 *
 * Gold/yellow background matching HIMATIFA branding.
 */

import Image from "next/image";

/** Custom Instagram icon */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const instagramLinks = [
  {
    handle: "@ekraf.himatifa",
    url: "https://instagram.com/ekraf.himatifa",
  },
  {
    handle: "@himatifaupnvjatim",
    url: "https://instagram.com/himatifaupnvjatim",
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Logo + Organization Name */}
          <div className="flex flex-col items-center gap-3">
            <Image
              src="/logo.png"
              alt="HIMATIFA Logo"
              width={56}
              height={56}
              className="h-14 w-14"
            />
            <div>
              <h3 className="text-lg font-bold text-white sm:text-xl">
                Ekraf <span className="text-gold">HIMATIFA</span>
              </h3>
              <p className="mt-1 text-sm text-gray-400">
                Departemen Ekonomi Kreatif HIMATIFA UPN &quot;Veteran&quot; Jawa Timur
              </p>
            </div>
          </div>

          {/* Instagram Links */}
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            {instagramLinks.map((ig) => (
              <a
                key={ig.handle}
                href={ig.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold/20"
              >
                <InstagramIcon className="h-4 w-4" />
                {ig.handle}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-3">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Ekraf HIMATIFA. All rights reserved.
            </p>
            <a
              href="/admin/login"
              className="text-xs text-gray-600 transition-colors hover:text-gold"
            >
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
