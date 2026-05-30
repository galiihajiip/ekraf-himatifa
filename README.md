# EKraf HIMATIFA — Toko Digital & Merchandise

Platform e-commerce resmi Departemen Ekonomi Kreatif HIMATIFA UPN "Veteran" Jawa Timur. Menyediakan aplikasi premium, merchandise eksklusif, dan jasa print.

Proyek ini merupakan bagian dari tugas akhir MKU Kepemimpinan Kelas G429 dengan tema **"Klik Bijak, Klik Aman: Mewujudkan Generasi Tangguh Digital"** di bawah bimbingan Dr. Ir. Indra Tjahaja Amir, M.P.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Backend:** Supabase (Auth + Database + Storage)
- **Icons:** Lucide React
- **Language:** TypeScript
- **Deployment:** Vercel

## Features

- Responsive homepage with hero banner, MKU narrative, and category grid
- Product catalog with category filtering
- Product detail pages with SEO metadata
- Shopping cart with localStorage persistence
- WhatsApp checkout with pre-filled order message
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

Copy `.env.local.example` or create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_WHATSAPP_NUMBER=6281234567890
```

Get your Supabase URL and anon key from:
**Supabase Dashboard → Project Settings → API**

### 4. Run Supabase SQL schema

Go to **Supabase Dashboard → SQL Editor** and run the contents of `supabase/schema.sql`. This creates the `products` and `categories` tables with pre-populated category data.

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

This project is for educational purposes as part of the MKU Kepemimpinan course at UPN "Veteran" Jawa Timur.
