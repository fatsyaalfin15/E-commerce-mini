import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { categoryLabel } from '../utils/format';
import { flyToCart } from '../utils/flyToCart';
import PriceTag from './PriceTag';
import WishlistButton from './WishlistButton';
import StarRating from './StarRating';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const imgRef = useRef(null);

  return (
    <Link
      to={`/produk/${product.id}`}
      className="group relative flex flex-col border border-line bg-paper-raised hover:border-ink-faint transition-colors"
    >
      <WishlistButton
        product={product}
        size="sm"
        className="absolute top-2 right-2 z-10"
      />

      <div className="aspect-square p-4 sm:p-6 flex items-center justify-center bg-paper-raised">
        <img
          ref={imgRef}
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-[1.03] transition-transform duration-300"
          loading="lazy"
        />
      </div>

      <div className="flex-1 flex flex-col gap-2 px-3 sm:px-4 pb-3 sm:pb-4">
        <span className="text-[0.68rem] sm:text-[0.72rem] text-ink-dim">
          {categoryLabel(product.category)}
        </span>
        <h3 className="font-serif text-[0.92rem] sm:text-[1.05rem] leading-snug text-ink line-clamp-2 flex-1">
          {product.title}
        </h3>
        {product.rating && (
        <StarRating rate={product.rating.rate} count={product.rating.count} />
        )}
        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5 pt-1">
          <PriceTag price={product.price} size="sm" />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              flyToCart(imgRef.current);
              addItem(product, 1);
            }}
            className="text-xs text-ink-dim hover:text-forest-dark underline decoration-line underline-offset-4 hover:decoration-forest-dark transition-colors shrink-0"
          >
            + Keranjang
          </button>
        </div>
      </div>
    </Link>
  );
}