import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import StatusMessage from '../components/StatusMessage';

export default function Wishlist() {
  const { items } = useWishlist();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
      <h1 className="font-serif text-2xl sm:text-3xl text-ink mb-1">
        Wishlist
      </h1>
      <p className="text-sm text-ink-dim mb-8">
        Produk yang kamu simpan untuk dilihat lagi nanti.
      </p>

      {items.length === 0 ? (
        <StatusMessage
          title="Wishlist masih kosong"
          description="Tap ikon hati pada produk untuk menyimpannya di sini."
          action={
            <Link
              to="/"
              className="text-sm text-forest-dark underline underline-offset-4"
            >
              Lihat katalog
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}