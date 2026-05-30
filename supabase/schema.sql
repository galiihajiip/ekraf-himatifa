-- ===========================================
-- E-Commerce EKRAF HIMATIFA - Database Schema
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- ===========================================

-- Enable UUID extension (usually enabled by default in Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===========================================
-- Categories Table
-- Stores product categories for the e-commerce store
-- ===========================================
CREATE TABLE categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- Products Table
-- Stores all products available in the store
-- ===========================================
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL, -- Price in IDR (Rupiah), stored as integer
  category TEXT NOT NULL, -- References category slug
  image_url TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- Pre-populate Categories
-- ===========================================
INSERT INTO categories (name, slug) VALUES
  ('Aplikasi Premium', 'aplikasi-premium'),
  ('Merchandise HIMATIFA', 'merchandise-himatifa'),
  ('Jasa Print', 'jasa-print');

-- ===========================================
-- Enable Row Level Security (RLS)
-- Public read access, admin-only write access
-- ===========================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access to categories
CREATE POLICY "Allow public read access on categories"
  ON categories FOR SELECT
  USING (true);

-- Allow public read access to products
CREATE POLICY "Allow public read access on products"
  ON products FOR SELECT
  USING (true);
