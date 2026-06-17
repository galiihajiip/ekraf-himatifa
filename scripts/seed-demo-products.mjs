/**
 * Seed demo products with real product images (downloaded to public/products/).
 * Run: node scripts/seed-demo-products.mjs
 */

import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const IMG_DIR = path.join(ROOT, "public", "products");
const DATA_FILE = path.join(ROOT, "data", "demo-products.json");

const CATALOG = [
  // Digital Services — aplikasi premium
  {
    id: "demo-prod-001",
    slug: "netflix-premium",
    name: "Netflix Premium 1 Bulan",
    price: 45000,
    category: "digital-services",
    description:
      "Akun sharing Netflix Premium UHD, garansi penuh 30 hari, support respon cepat.",
    image:
      "https://images.unsplash.com/photo-1522869635100-9123d77005eb?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-002",
    slug: "spotify-premium",
    name: "Spotify Premium 1 Bulan",
    price: 35000,
    category: "digital-services",
    description:
      "Spotify Premium individu, tanpa iklan, download offline, garansi 30 hari.",
    image:
      "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-003",
    slug: "youtube-premium",
    name: "YouTube Premium 1 Bulan",
    price: 40000,
    category: "digital-services",
    description:
      "YouTube Premium family slot, bebas iklan + YouTube Music, aktif 30 hari.",
    image:
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-004",
    slug: "disney-hotstar",
    name: "Disney+ Hotstar 1 Bulan",
    price: 35000,
    category: "digital-services",
    description:
      "Langganan Disney+ Hotstar sharing, akses film Marvel & Disney, garansi 30 hari.",
    image:
      "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-005",
    slug: "vidio-platinum",
    name: "Vidio Platinum 1 Bulan",
    price: 30000,
    category: "digital-services",
    description:
      "Vidio Platinum untuk streaming lokal & olahraga, slot sharing, 30 hari.",
    image:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-006",
    slug: "canva-pro",
    name: "Canva Pro 1 Bulan",
    price: 25000,
    category: "digital-services",
    description:
      "Canva Pro tim HIMATIFA, template premium & background remover, 30 hari.",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-007",
    slug: "microsoft-365",
    name: "Microsoft 365 Personal 1 Bulan",
    price: 30000,
    category: "digital-services",
    description:
      "Office 365 lengkap: Word, Excel, PowerPoint, OneDrive 1TB, 30 hari.",
    image:
      "https://images.unsplash.com/photo-1633114126764-2f8bc5e8ed83?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-008",
    slug: "chatgpt-plus",
    name: "ChatGPT Plus 1 Bulan",
    price: 150000,
    category: "digital-services",
    description:
      "Akun ChatGPT Plus GPT-4, prioritas akses & plugin, untuk kebutuhan akademik.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-009",
    slug: "capcut-pro",
    name: "CapCut Pro 1 Bulan",
    price: 20000,
    category: "digital-services",
    description:
      "CapCut Pro untuk editing konten HIMATIFA, efek premium & tanpa watermark.",
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-010",
    slug: "google-one",
    name: "Google One 100GB 1 Bulan",
    price: 25000,
    category: "digital-services",
    description:
      "Google One 100GB family slot, backup foto & dokumen kuliah, 30 hari.",
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-011",
    slug: "notion-plus",
    name: "Notion Plus 1 Bulan",
    price: 15000,
    category: "digital-services",
    description:
      "Notion Plus unlimited blocks & file upload, cocok untuk catatan kuliah.",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-012",
    slug: "zoom-pro",
    name: "Zoom Pro 1 Bulan",
    price: 28000,
    category: "digital-services",
    description:
      "Zoom Pro meeting tanpa batas 40 menit, untuk webinar & rapat HIMATIFA.",
    image:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80&auto=format&fit=crop",
  },

  // Apparel & Merchandise
  {
    id: "demo-prod-013",
    slug: "kaos-himatifa",
    name: "Kaos HIMATIFA Official",
    price: 85000,
    category: "apparel-merchandise",
    description:
      "Kaos eksklusif HIMATIFA, bahan combed 30s, sablon plastisol premium.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-014",
    slug: "jaket-informatika",
    name: "Jaket Jurusan Informatika",
    price: 250000,
    category: "apparel-merchandise",
    description:
      "Jaket hoodie jurusan Informatika, logo IF & HIMATIFA, bahan fleece premium.",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-015",
    slug: "hoodie-design-contest",
    name: "Hoodie Design Contest Edition",
    price: 150000,
    category: "apparel-merchandise",
    description:
      "Hoodie hasil Design Contest HIMATIFA 2025, edisi terbatas, unisex.",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-016",
    slug: "totebag-himatifa",
    name: "Totebag HIMATIFA Canvas",
    price: 45000,
    category: "apparel-merchandise",
    description:
      "Totebag kanvas premium sablon HIMATIFA, muat laptop 14 inch.",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-017",
    slug: "topi-himatifa",
    name: "Topi Trucker HIMATIFA",
    price: 55000,
    category: "apparel-merchandise",
    description: "Topi trucker mesh HIMATIFA, adjustable strap, one size.",
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-018",
    slug: "sticker-pack",
    name: "Sticker Pack HIMATIFA (10 pcs)",
    price: 15000,
    category: "apparel-merchandise",
    description:
      "Paket stiker vinyl HIMATIFA waterproof, 10 desain berbeda.",
    image:
      "https://images.unsplash.com/photo-1611532736368-fb79bbdad5f0?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-019",
    slug: "pin-badge",
    name: "Pin Badge Enamel HIMATIFA",
    price: 12000,
    category: "apparel-merchandise",
    description: "Pin enamel custom logo HIMATIFA, klip butterfly backing.",
    image:
      "https://images.unsplash.com/photo-1611085583911-1103079ffa9e?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-020",
    slug: "merch-contest-winner",
    name: "Merch Design Contest Winner 2025",
    price: 95000,
    category: "apparel-merchandise",
    description:
      "Paket merch pemenang Design Contest: kaos + pin + stiker limited edition.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-021",
    slug: "lanyard-himatifa",
    name: "Lanyard HIMATIFA Custom",
    price: 18000,
    category: "apparel-merchandise",
    description:
      "Lanyard sublim full print HIMATIFA + hook ID card, panjang 90cm.",
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-022",
    slug: "varsity-informatika",
    name: "Varsity Jacket Informatika",
    price: 320000,
    category: "apparel-merchandise",
    description:
      "Jaket varsity Informatika, bahan wool body + kulit lengan, bordir premium.",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-023",
    slug: "ospek-kit-lengkap",
    name: "Paket Ospek Kit Lengkap",
    price: 175000,
    category: "apparel-merchandise",
    description:
      "Ospek kit lengkap: kaos, celana training, topi, tali ID, dan tas string.",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-024",
    slug: "ospek-kit-basic",
    name: "Ospek Kit Basic (Kaos + Topi)",
    price: 95000,
    category: "apparel-merchandise",
    description: "Paket ospek basic: kaos angkatan + topi ospek sablon HIMATIFA.",
    image:
      "https://images.unsplash.com/photo-1622560480602-83bfaf0ad94b?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-025",
    slug: "kaos-ospek",
    name: "Kaos Ospek HIMATIFA 2025",
    price: 65000,
    category: "apparel-merchandise",
    description:
      "Kaos dryfit ospek angkatan baru, sablon nomor peserta & logo HIMATIFA.",
    image:
      "https://images.unsplash.com/photo-1583743814966-6a2473024225?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-026",
    slug: "hampers-lebaran",
    name: "Hampers Kit Ucapan Lebaran",
    price: 200000,
    category: "apparel-merchandise",
    description:
      "Hampers lebaran isi kue kering, teh, dan kartu ucapan custom HIMATIFA.",
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-027",
    slug: "hampers-snack",
    name: "Hampers Snack Premium HIMATIFA",
    price: 150000,
    category: "apparel-merchandise",
    description:
      "Hampers snack premium: keripik, coklat, minuman, dalam box custom logo.",
    image:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-028",
    slug: "hampers-custom",
    name: "Hampers Custom Logo Jurusan",
    price: 250000,
    category: "apparel-merchandise",
    description:
      "Hampers custom isi bebas + box premium sablon logo jurusan/kelas.",
    image:
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-029",
    slug: "hampers-goodie",
    name: "Hampers Goodie Bag Event",
    price: 85000,
    category: "apparel-merchandise",
    description:
      "Goodie bag event seminar HIMATIFA: snack, minuman, notes, dan pulpen.",
    image:
      "https://images.unsplash.com/photo-1513201099705-a9746e1e123f?w=800&q=80&auto=format&fit=crop",
  },

  // Printing Services
  {
    id: "demo-prod-030",
    slug: "print-a4-bw",
    name: "Print A4 Hitam Putih (per lembar)",
    price: 500,
    category: "printing-services",
    description: "Print dokumen A4 hitam putih, kertas HVS 80gr, hasil tajam.",
    image:
      "https://images.unsplash.com/photo-1612815154859-8bb0a4c2f55e?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-031",
    slug: "print-a4-color",
    name: "Print A4 Berwarna (per lembar)",
    price: 1500,
    category: "printing-services",
    description:
      "Print full color A4, cocok untuk poster, presentasi, dan modul kuliah.",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-032",
    slug: "print-foto-4r",
    name: "Print Foto 4R Glossy",
    price: 3000,
    category: "printing-services",
    description: "Cetak foto ukuran 4R kertas glossy premium, warna akurat.",
    image:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-033",
    slug: "laminating-a4",
    name: "Laminating A4",
    price: 5000,
    category: "printing-services",
    description:
      "Laminating dokumen A4 glossy/doff, anti air dan lebih awet.",
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-034",
    slug: "jilid-skripsi",
    name: "Jilid Skripsi Hardcover",
    price: 75000,
    category: "printing-services",
    description:
      "Jilid hardcover skripsi/tugas akhir, cover custom + hot print nama.",
    image:
      "https://images.unsplash.com/photo-1497633762305-f33a65f811dd?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-035",
    slug: "banner-spanduk",
    name: "Banner Spanduk (per m²)",
    price: 50000,
    category: "printing-services",
    description:
      "Cetak banner spanduk outdoor, tahan cuaca, untuk event kampus.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-036",
    slug: "stiker-vinyl",
    name: "Stiker Vinyl Custom",
    price: 25000,
    category: "printing-services",
    description:
      "Stiker vinyl cutting custom desain, waterproof untuk laptop & botol.",
    image:
      "https://images.unsplash.com/photo-1611532736368-fb79bbdad5f0?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-037",
    slug: "fotokopi-bw",
    name: "Fotokopi B/W A4 (per lembar)",
    price: 300,
    category: "printing-services",
    description: "Fotokopi hitam putih A4, hasil jelas, harga mahasiswa.",
    image:
      "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-038",
    slug: "materai-10000",
    name: "Materai Elektronik Rp 10.000",
    price: 10500,
    category: "printing-services",
    description:
      "Materai elektronik resmi Rp 10.000 untuk dokumen digital & surat.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-039",
    slug: "materai-5000",
    name: "Materai Elektronik Rp 5.000",
    price: 5500,
    category: "printing-services",
    description: "Materai elektronik resmi Rp 5.000, proses cepat via e-meterai.",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-040",
    slug: "materai-tempel",
    name: "Materai Tempel Rp 10.000",
    price: 11000,
    category: "printing-services",
    description: "Materai tempel fisik Rp 10.000, siap untuk dokumen hardcopy.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80&auto=format&fit=crop",
  },

  // F&B / Dana Usaha
  {
    id: "demo-prod-041",
    slug: "nasi-box-ayam",
    name: "Nasi Box Ayam Bakar",
    price: 15000,
    category: "fnb-danus",
    description:
      "Nasi box ayam bakar bumbu kecap, lalapan & sambal, fresh setiap hari.",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-042",
    slug: "nasi-box-rendang",
    name: "Nasi Box Rendang",
    price: 18000,
    category: "fnb-danus",
    description: "Nasi box rendang sapi khas, porsi mahasiswa, pedas sedang.",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-043",
    slug: "air-mineral",
    name: "Air Mineral 600ml",
    price: 3000,
    category: "fnb-danus",
    description: "Air mineral botol 600ml dingin, ready stock di kantin IF.",
    image:
      "https://images.unsplash.com/photo-1548839140-29a7492991bd?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-044",
    slug: "es-teh-manis",
    name: "Es Teh Manis Gelas",
    price: 5000,
    category: "fnb-danus",
    description: "Es teh manis segar gelas besar, cocok temani belajar.",
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-045",
    slug: "kopi-good-day",
    name: "Kopi Good Day Cappuccino",
    price: 4000,
    category: "fnb-danus",
    description: "Kopi siap minum Good Day Cappuccino, dingin & creamy.",
    image:
      "https://images.unsplash.com/photo-1514434753797-5718e53e4e2f?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-046",
    slug: "snack-mix",
    name: "Snack Mix Keripik & Wafer",
    price: 8000,
    category: "fnb-danus",
    description: "Paket snack mix keripik usus + wafer coklat, camilan kuliah.",
    image:
      "https://images.unsplash.com/photo-1613919113640-25732d5a2c4f?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-047",
    slug: "indomie-telur",
    name: "Indomie Goreng + Telur",
    price: 8000,
    category: "fnb-danus",
    description: "Indomie goreng original + telur ceplok, masak fresh order.",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-048",
    slug: "paket-jajanan-ospek",
    name: "Paket Jajanan Ospek (5 item)",
    price: 25000,
    category: "fnb-danus",
    description:
      "Paket jajanan ospek: snack, minuman, permen, biskuit, dan coklat.",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-049",
    slug: "donat-kampung",
    name: "Donat Kampung (3 pcs)",
    price: 12000,
    category: "fnb-danus",
    description: "Donat kampung gula halus, 3 pcs, fresh setiap pagi.",
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-050",
    slug: "pudding-coklat",
    name: "Pudding Coklat Cup",
    price: 6000,
    category: "fnb-danus",
    description: "Pudding coklat cup dingin, topping coklat chips.",
    image:
      "https://images.unsplash.com/photo-1488477181941-7818af4f1f4a?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-051",
    slug: "roti-bakar",
    name: "Roti Bakar Cokelat",
    price: 7000,
    category: "fnb-danus",
    description: "Roti bakar cokelat keju, hangat, cocok untuk sarapan cepat.",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80&auto=format&fit=crop",
  },
  {
    id: "demo-prod-052",
    slug: "susu-uht",
    name: "Minuman Susu UHT Coklat",
    price: 4500,
    category: "fnb-danus",
    description: "Susu UHT coklat 250ml, dingin, stok kantin dana usaha.",
    image:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&q=80&auto=format&fit=crop",
  },
];

const KEYWORDS = {
  "netflix-premium": "netflix,television",
  "spotify-premium": "spotify,music",
  "youtube-premium": "youtube,video",
  "disney-hotstar": "disney,movie",
  "vidio-platinum": "streaming,television",
  "canva-pro": "graphic,design",
  "microsoft-365": "microsoft,laptop",
  "chatgpt-plus": "artificial,intelligence",
  "capcut-pro": "video,editing",
  "google-one": "google,cloud",
  "notion-plus": "notebook,planning",
  "zoom-pro": "videoconference,meeting",
  "kaos-himatifa": "tshirt,white",
  "jaket-informatika": "hoodie,jacket",
  "hoodie-design-contest": "hoodie,fashion",
  "totebag-himatifa": "totebag,canvas",
  "topi-himatifa": "cap,hat",
  "sticker-pack": "sticker,colorful",
  "pin-badge": "pin,badge",
  "merch-contest-winner": "merchandise,retail",
  "lanyard-himatifa": "lanyard,id",
  "varsity-informatika": "varsity,jacket",
  "ospek-kit-lengkap": "backpack,kit",
  "ospek-kit-basic": "tshirt,hat",
  "kaos-ospek": "tshirt,team",
  "hampers-lebaran": "gift,basket",
  "hampers-snack": "snack,gift",
  "hampers-custom": "hamper,present",
  "hampers-goodie": "goodiebag,event",
  "print-a4-bw": "printer,document",
  "print-a4-color": "color,printer",
  "print-foto-4r": "photograph,print",
  "laminating-a4": "lamination,document",
  "jilid-skripsi": "book,thesis",
  "banner-spanduk": "banner,outdoor",
  "stiker-vinyl": "vinyl,sticker",
  "fotokopi-bw": "photocopy,paper",
  "materai-10000": "stamp,document",
  "materai-5000": "stamp,envelope",
  "materai-tempel": "postage,stamp",
  "nasi-box-ayam": "nasi,indonesian",
  "nasi-box-rendang": "rendang,rice",
  "air-mineral": "water,bottle",
  "es-teh-manis": "icedtea,drink",
  "kopi-good-day": "coffee,bottle",
  "snack-mix": "snacks,chips",
  "indomie-telur": "noodles,egg",
  "paket-jajanan-ospek": "snacks,package",
  "donat-kampung": "donut,sugar",
  "pudding-coklat": "pudding,chocolate",
  "roti-bakar": "toast,bread",
  "susu-uht": "milk,chocolate",
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function downloadImage(item, destPath) {
  const keywords = KEYWORDS[item.slug] ?? item.slug.replace(/-/g, ",");
  const sources = [
    `https://loremflickr.com/800/600/${keywords}?lock=${item.slug}`,
    `https://picsum.photos/seed/${item.slug}/800/600`,
  ];

  let lastError;

  for (const url of sources) {
    try {
      const response = await fetch(url, { redirect: "follow" });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      if (buffer.length < 5000) {
        throw new Error("File too small");
      }

      await writeFile(destPath, buffer);
      return;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error("Download failed");
}

async function main() {
  await mkdir(IMG_DIR, { recursive: true });
  await mkdir(path.dirname(DATA_FILE), { recursive: true });

  const baseTime = Date.now();
  const products = [];

  for (let i = 0; i < CATALOG.length; i++) {
    const item = CATALOG[i];
    const filename = `${item.slug}.jpg`;
    const dest = path.join(IMG_DIR, filename);

    process.stdout.write(`Downloading ${i + 1}/${CATALOG.length}: ${item.name}... `);
    try {
      await downloadImage(item, dest);
      console.log("OK");
      await sleep(400);
    } catch (error) {
      console.log(`FAIL (${error.message})`);
      throw error;
    }

    products.push({
      id: item.id,
      name: item.name,
      price: item.price,
      category: item.category,
      image_url: `/products/${filename}`,
      description: item.description,
      created_at: new Date(baseTime - i * 1000).toISOString(),
    });
  }

  await writeFile(
    DATA_FILE,
    JSON.stringify({ products }, null, 2),
    "utf-8"
  );

  console.log(`\nSeeded ${products.length} products -> ${DATA_FILE}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
