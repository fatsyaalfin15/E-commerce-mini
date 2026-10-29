import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { categoryLabel, formatUsd } from '../utils/format';
import QuantityStepper from './QuantityStepper';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem, subtotal } =
    useCart();

  if (!isOpen) return null;

  const shipping = items.length > 0 ? 4.5 : 0;
  const total = subtotal + shipping;

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      <button
        type="button"
        aria-label="Tutup keranjang"
        onClick={closeCart}
        className="absolute inset-0 bg-ink/30"
      />

      <aside className="relative w-full max-w-sm h-full bg-paper-raised border-l border-line flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-line">
          <h2 className="font-serif text-lg text-ink">Keranjang</h2>
          <button
            type="button"
            onClick={closeCart}
            className="w-8 h-8 flex items-center justify-center text-ink-dim hover:text-ink border border-line"
            aria-label="Tutup"
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <p className="font-serif text-ink mb-1">Keranjang masih kosong</p>
            <p className="text-sm text-ink-dim mb-5">
              Produk yang kamu tambahkan akan muncul di sini.
            </p>
            <button
              type="button"
              onClick={closeCart}
              className="text-sm text-forest-dark underline underline-offset-4"
            >
              Lihat katalog
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 font-mono text-sm">
              <ul className="divide-y divide-dashed divide-line">
                {items.map((item) => (
                  <li key={item.id} className="py-4 flex gap-3">
                    <div className="w-14 h-14 shrink-0 bg-paper flex items-center justify-center border border-line">
                      <img
                        src={item.image}
                        alt=""
                        className="max-w-full max-h-full object-contain mix-blend-multiply"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-[0.85rem] text-ink line-clamp-2 leading-snug mb-1">
                        {item.title}
                      </p>
                      <p className="text-[0.7rem] text-ink-faint mb-2">
                        {categoryLabel(item.category)}
                      </p>
                      <div className="flex items-center justify-between gap-2">
                        <QuantityStepper
                          value={item.qty}
                          onChange={(q) => updateQty(item.id, q)}
                          size="sm"
                        />
                        <span className="text-ink">
                          {formatUsd(item.price * item.qty)}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-ink-faint hover:text-brick text-xs self-start"
                      aria-label={`Hapus ${item.title}`}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-dashed border-line px-5 py-4 font-mono text-sm space-y-1.5">
              <div className="flex justify-between text-ink-dim">
                <span>Subtotal</span>
                <span>{formatUsd(subtotal)}</span>
              </div>
              <div className="flex justify-between text-ink-dim">
                <span>Pengiriman</span>
                <span>{formatUsd(shipping)}</span>
              </div>
              <div className="flex justify-between text-ink font-semibold text-base pt-2 border-t border-line mt-2">
                <span>Total</span>
                <span>{formatUsd(total)}</span>
              </div>
            </div>

            <div className="px-5 pb-5 pt-1">
              <Link
                to="/checkout"
                onClick={closeCart}
                className="block w-full text-center bg-forest hover:bg-forest-dark transition-colors text-paper font-medium py-3 text-sm"
              >
                Lanjut ke checkout
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
