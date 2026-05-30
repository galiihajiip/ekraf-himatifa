# EKraf HIMATIFA — E-Commerce Terpadu

**Digitalisasi Layanan Penjualan dan Katalogisasi Terpadu Departemen Ekonomi Kreatif (Ekraf) HIMATIFA Melalui Pengembangan Website E-Commerce Terintegrasi**

Platform e-commerce terpadu untuk Departemen Ekonomi Kreatif HIMATIFA UPN "Veteran" Jawa Timur. Menyediakan layanan digital (aplikasi premium), apparel & merchandise, F&B / dana usaha, dan printing services dalam satu platform tersentralisasi.

## Project Kepemimpinan

- **Mata Kuliah:** MKU Kepemimpinan — Kelas G415
- **Dosen Pengampu:** Ir. Bambang Wahyudi M.S.
- **Kelompok 1:**
  - Daffa Najwan Fadhilah (24081010172)
  - Fidelia Hahas Asabela (24081010113)
  - Galih Aji Pangestu (24081010123)
  - Evrillia Kurniawati (24081010141)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Backend:** Supabase (Auth + Database + Storage)
- **Icons:** Lucide React
- **Language:** TypeScript
- **Deployment:** Vercel

## Features

- Responsive homepage with hero banner, project narrative, and category grid
- Product catalog with dynamic category filtering (Digital Services, Apparel & Merchandise, F&B/Danus, Printing Services)
- Product detail pages with SEO metadata
- Shopping cart with localStorage persistence
- WhatsApp checkout with auto-filled order message format
- Admin panel with Supabase Auth protection
- Full product CRUD (create, read, update, delete)
- Image upload to Supabase Storage
- Loading skeletons and error states
- Custom 404 page

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/galiihajiip/ekraf-himatifa.git
cd ekraf-himatifa
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_WHATSAPP_NUMBER=6281234567890
```

Get your Supabase URL and anon key from:
**Supabase Dashboard → Project Settings → API**

### 4. Run Supabase SQL schema

Go to **Supabase Dashboard → SQL Editor** and run the contents of `supabase/schema.sql`. This creates the `products` and `categories` tables with pre-populated category data (Digital Services, Apparel & Merchandise, F&B / Dana Usaha, Printing Services).

### 5. Create Supabase Storage bucket

1. Go to **Supabase Dashboard → Storage**
2. Create a new bucket named `product-images`
3. Set it to **Public**
4. Add a policy: Allow authenticated users to upload (INSERT)

### 6. Create admin user

1. Go to **Supabase Dashboard → Authentication → Users**
2. Click **"Add user" → "Create new user"**
3. Enter email and password
4. Check **"Auto Confirm User"**
5. Click **"Create user"**
6. Use those credentials at `/admin/login`

### 7. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── admin/          # Admin panel (protected)
│   │   ├── dashboard/
│   │   ├── login/
│   │   └── produk/    # Product CRUD
│   ├── produk/         # Public product pages
│   │   └── [id]/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── not-found.tsx
│   └── globals.css
├── components/
│   ├── admin/          # Admin components
│   ├── cart/           # Cart drawer & checkout
│   ├── home/           # Homepage sections
│   ├── layout/         # Navbar & Footer
│   └── products/       # Product card & tabs
├── context/
│   └── CartContext.tsx  # Global cart state
├── lib/
│   ├── actions/        # Server actions
│   ├── supabase/       # Supabase clients
│   └── utils/          # Utilities (WhatsApp)
└── middleware.ts       # Admin route protection
```

## Deploy to Vercel

### 1. Connect repository

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"New Project"**
3. Import the `galiihajiip/ekraf-himatifa` repository
4. Framework preset will auto-detect as **Next.js**

### 2. Add environment variables

Add these in **Vercel → Project Settings → Environment Variables**:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number (format: 62xxx) |

### 3. Deploy

Click **"Deploy"** — Vercel will build and deploy automatically.

## License

Project ini dibuat untuk keperluan akademis sebagai tugas Project Kepemimpinan di Universitas Pembangunan Nasional "Veteran" Jawa Timur.
