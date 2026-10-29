import { useWishlist } from '../context/WishlistContext';

export default function WishlistButton({ product, size = 'md', className = '' }) {
  const { isSaved, toggle } = useWishlist();
  const saved = isSaved(product.id);
  const dims = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';
  const iconSize = size === 'sm' ? 15 : 17;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(product);
      }}
      aria-label={saved ? 'Hapus dari wishlist' : 'Simpan ke wishlist'}
      aria-pressed={saved}
      className={`${dims} flex items-center justify-center border transition-colors ${
        saved
          ? 'bg-brick border-brick text-paper'
          : 'bg-paper-raised/90 border-line text-ink-dim hover:text-brick hover:border-brick'
      } ${className}`}
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill={saved ? 'currentColor' : 'none'}
        aria-hidden="true"
      >
        <path
          d="M12 20.5s-7.5-4.6-10-9.3C.5 7.8 2.3 4.5 5.7 4c2-.3 3.8.6 5.3 2.6C12.5 4.6 14.3 3.7 16.3 4c3.4.5 5.2 3.8 3.7 7.2-2.5 4.7-10 9.3-10 9.3Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}