import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Header() {
  const { count, openCart } = useCart();
  const { count: wishCount } = useWishlist();

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3 sm:gap-4">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-baseline gap-2 min-w-0 shrink"
        >
          <span className="font-serif text-lg sm:text-xl font-semibold text-ink tracking-tight truncate">
            Toko Online
          </span>
          <span className="hidden md:inline text-xs text-ink-faint whitespace-nowrap">
            Produk Berkualitas
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 shrink-0">
          <Link
            to="/wishlist"
            aria-label={`Wishlist${wishCount > 0 ? `, ${wishCount} item` : ''}`}
            className="relative flex items-center gap-2 border border-line bg-paper-raised px-2.5 sm:px-3.5 py-2 text-sm text-ink hover:border-ink-faint transition-colors"
          >
            <HeartIcon />
            <span className="hidden sm:inline">Wishlist</span>
            {wishCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-brick px-1 font-mono text-[0.68rem] text-paper">
                {wishCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            id="cart-icon-target"
            onClick={openCart}
            aria-label={`Keranjang${count > 0 ? `, ${count} item` : ''}`}
            className="relative flex items-center gap-2 border border-line bg-paper-raised px-2.5 sm:px-3.5 py-2 text-sm text-ink hover:border-ink-faint transition-colors"
          >
            <CartIcon />
            <span className="hidden sm:inline">Keranjang</span>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-forest px-1 font-mono text-[0.68rem] text-paper">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

function HeartIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 20.5s-7.5-4.6-10-9.3C.5 7.8 2.3 4.5 5.7 4c2-.3 3.8.6 5.3 2.6C12.5 4.6 14.3 3.7 16.3 4c3.4.5 5.2 3.8 3.7 7.2-2.5 4.7-10 9.3-10 9.3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L21 8H6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="21" r="1.4" fill="currentColor" />
      <circle cx="17" cy="21" r="1.4" fill="currentColor" />
    </svg>
  );
}