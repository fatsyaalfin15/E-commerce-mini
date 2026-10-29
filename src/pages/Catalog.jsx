import { useMemo, useState } from 'react';
import { useProducts } from '../data/useProducts';
import CategoryTabs from '../components/CategoryTabs';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import StatusMessage from '../components/StatusMessage';

export default function Catalog() {
  const { products, categories, status } = useProducts();
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('default');
  const [priceMax, setPriceMax] = useState('');

  const filtered = useMemo(() => {
    let list = products;
    if (category !== 'all') {
      list = list.filter((p) => p.category === category);
    }
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }
    if (priceMax !== '') {
      list = list.filter((p) => p.price <= Number(priceMax));
    }

    list = [...list];
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'name-asc') list.sort((a, b) => a.title.localeCompare(b.title));

    return list;
  }, [products, category, query, sort, priceMax]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-8">
      {/* Hero / Judul */}
      <div className="mb-6 sm:mb-8 max-w-xl">
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ink mb-2 sm:mb-3 wrap-break">
          Barang pilihan, harga jujur.
        </h1>
        <p className="text-ink-dim text-sm sm:text-[0.95rem] leading-relaxed">
          Katalog kecil berisi elektronik, perhiasan, dan pakaian — semuanya
          diambil langsung dari Fake Store API untuk keperluan demo.
        </p>
      </div>

      {/* Toolbar: Kategori + Search + Sort */}
      <div className="flex flex-col gap-4 mb-5 sm:mb-6">
        {/* Baris 1: CategoryTabs — full width, bisa di-scroll horizontal */}
        {status === 'ok' && (
          <div className="min-w-0 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
            <CategoryTabs
              categories={categories}
              active={category}
              onChange={setCategory}
            />
          </div>
        )}

        {/* Baris 2: Search + Sort — stack di mobile, sejajar di sm+ */}
        <div className="flex flex-col xs:flex-row gap-2.5 sm:gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="cari produk..."
            className="w-full xs:flex-1 min-w-0 border border-line bg-paper-raised px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:border-ink-faint"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full xs:w-auto xs:shrink-0 border border-line bg-paper-raised px-3 py-2 text-sm text-ink focus:outline-none focus:border-ink-faint"
          >
            <option value="default">Urutkan: Relevansi</option>
            <option value="price-asc">Harga: Rendah ke Tinggi</option>
            <option value="price-desc">Harga: Tinggi ke Rendah</option>
            <option value="name-asc">Nama: A–Z</option>
          </select>
        </div>
      </div>

      {/* Filter harga maksimal */}
      {status === 'ok' && (
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 text-sm">
          <label htmlFor="price-max" className="text-ink-dim shrink-0">
            Harga maksimal ($)
          </label>
          <input
            id="price-max"
            type="number"
            inputMode="decimal"
            min={0}
            placeholder="semua harga"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="w-28 sm:w-32 border border-line bg-paper-raised px-2.5 py-1.5 text-ink placeholder:text-ink-faint focus:outline-none focus:border-ink-faint"
          />
          {priceMax !== '' && (
            <button
              type="button"
              onClick={() => setPriceMax('')}
              className="text-xs text-ink-faint hover:text-brick underline underline-offset-4"
            >
              Reset
            </button>
          )}
        </div>
      )}

      {/* Grid produk (loading / error / empty / ok) */}
      {status === 'loading' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {status === 'error' && (
        <StatusMessage
          title="Gagal memuat produk"
          description="Periksa koneksi internetmu lalu muat ulang halaman."
        />
      )}

      {status === 'ok' && filtered.length === 0 && (
        <StatusMessage
          title="Tidak ada produk yang cocok"
          description="Coba ubah kata kunci pencarian atau pilih kategori lain."
        />
      )}

      {status === 'ok' && filtered.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}