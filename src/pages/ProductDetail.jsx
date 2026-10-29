import { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProduct } from '../data/useProduct';
import { useProducts } from '../data/useProducts';
import { useCart } from '../context/CartContext';
import { categoryLabel } from '../utils/format';
import { flyToCart } from '../utils/flyToCart';
import PriceTag from '../components/PriceTag';
import QuantityStepper from '../components/QuantityStepper';
import StatusMessage from '../components/StatusMessage';
import WishlistButton from '../components/WishlistButton';
import StarRating from '../components/StarRating';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const { product, status } = useProduct(id);
  const { products: allProducts } = useProducts();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const imgRef = useRef(null);

  if (status === 'loading') {
    return (
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
        <div className="h-4 w-32 bg-line/70 animate-pulse mb-6" />
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 animate-pulse">
          <div className="aspect-square bg-paper-raised border border-line p-10">
            <div className="w-full h-full bg-line/70" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="h-2.5 w-20 bg-line/70" />
            <div className="h-7 w-full bg-line/70" />
            <div className="h-7 w-2/3 bg-line/70 mb-2" />
            <div className="h-4 w-28 bg-line/70 mb-2" />
            <div className="h-8 w-24 bg-line/70 mb-4" />
            <div className="h-3 w-full bg-line/70" />
            <div className="h-3 w-full bg-line/70" />
            <div className="h-3 w-3/4 bg-line/70 mb-6" />
            <div className="h-11 w-full sm:w-40 bg-line/70 mt-auto" />
          </div>
        </div>
      </div>
    );
  }

  if (status === 'error' || !product) {
    return (
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10">
        <StatusMessage
          title="Produk tidak ditemukan"
          description="Produk ini mungkin sudah tidak tersedia."
          action={
            <Link
              to="/"
              className="text-sm text-forest-dark underline underline-offset-4"
            >
              Kembali ke katalog
            </Link>
          }
        />
      </div>
    );
  }

  function handleAdd() {
    flyToCart(imgRef.current);
    addItem(product, qty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  }

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-1.5 text-sm text-ink-dim mb-6"
      >
        <Link to="/" className="hover:text-ink">
          Katalog
        </Link>
        <span className="text-ink-faint">/</span>
        <Link to="/" className="hover:text-ink">
          {categoryLabel(product.category)}
        </Link>
        <span className="text-ink-faint">/</span>
        <span className="text-ink truncate max-w-140px sm:max-w-xs" title={product.title}>
          {product.title}
        </span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="aspect-square bg-paper-raised border border-line flex items-center justify-center p-10">
          <img
            ref={imgRef}
            src={product.image}
            alt={product.title}
            className="max-w-full max-h-full object-contain mix-blend-multiply"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-xs text-ink-dim mb-2">
            {categoryLabel(product.category)}
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-ink leading-snug mb-3">
            {product.title}
          </h1>

          {product.rating && (
            <div className="mb-4">
              <StarRating
                rate={product.rating.rate}
                count={product.rating.count}
                size="lg"
              />
            </div>
          )}

          <div className="mb-5">
            <PriceTag price={product.price} size="lg" holeColor="#efebe2" />
          </div>

          <p className="text-ink-dim text-[0.95rem] leading-relaxed mb-8 max-w-prose">
            {product.description}
          </p>

          <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <QuantityStepper value={qty} onChange={setQty} />
              <WishlistButton product={product} />
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className="w-full sm:w-auto bg-forest hover:bg-forest-dark transition-colors text-paper font-medium px-6 py-3 text-sm"
            >
              {justAdded ? 'Ditambahkan ✓' : 'Tambah ke keranjang'}
            </button>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-14 sm:mt-16">
          <h2 className="font-serif text-xl sm:text-2xl text-ink mb-4 sm:mb-5">
            Produk serupa
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}