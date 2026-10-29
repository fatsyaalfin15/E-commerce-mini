# Kios Umum — Katalog & Keranjang

Aplikasi e-commerce mini (katalog + keranjang + checkout dummy) dibangun
dengan React, React Router, dan Tailwind CSS v4. Data produk diambil dari
[Fake Store API](https://fakestoreapi.com/).

## Konsep desain

"General store catalog" — kertas hangat, judul produk pakai serif editorial
(Fraunces), harga ditampilkan sebagai label gantung (price tag), dan
keranjang/struk pesanan bergaya struk kertas asli (monospace, garis
putus-putus).

## Fitur

- Katalog produk dengan filter kategori dan pencarian
- Halaman detail produk (`/produk/:id`)
- Keranjang belanja (slide-over drawer), tersimpan di localStorage
- Checkout dummy dengan form alamat & kartu (tidak ada pembayaran sungguhan)
- Halaman konfirmasi pesanan bergaya struk

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

## Build untuk produksi

```bash
npm run build
```

## Deploy ke Netlify

Sudah ada `netlify.toml` dan `public/_redirects` untuk routing SPA (React
Router). Tinggal push ke GitHub lalu import repo di Netlify — build command
dan publish directory sudah otomatis terbaca.

## Struktur

```
src/
├── components/   # Header, ProductCard, CartDrawer, PriceTag, dll.
├── context/      # CartContext (state keranjang + localStorage)
├── data/         # useProducts, useProduct (fetch Fake Store API)
├── pages/        # Catalog, ProductDetail, Checkout, Confirmation
├── utils/        # formatter harga & label kategori
└── App.jsx
```
