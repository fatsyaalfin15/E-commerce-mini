import { Link, Navigate, useLocation } from 'react-router-dom';
import { formatUsd } from '../utils/format';

export default function Confirmation() {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const date = new Date(order.date);

  return (
    <div className="mx-auto max-w-xl px-4 sm:px-6 py-12">
      <div className="relative border border-line bg-paper-raised px-5 sm:px-8 py-8 overflow-hidden">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
          <div>
            <p className="text-xs text-ink-faint mb-1">Nomor pesanan</p>
            <h1 className="font-serif text-2xl sm:text-3xl text-ink">
              {order.number}
            </h1>
          </div>
          <span
            aria-hidden="true"
            className="inline-block border-[3px] border-brick text-brick font-serif font-semibold text-xs sm:text-sm px-2.5 py-1 -rotate select-none shrink-0"
            style={{ opacity: 0.85 }}
          >
            Dikonfirmasi
          </span>
        </div>

        <dl className="font-mono text-sm text-ink-dim grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 mb-6 [&_dd]:wrap-break-">
          <dt>Tanggal</dt>
          <dd className="text-ink">
            {date.toLocaleDateString('id-ID', {
              dateStyle: 'long',
            })}
          </dd>
          <dt>Nama</dt>
          <dd className="text-ink">{order.name}</dd>
          <dt>Email</dt>
          <dd className="text-ink">{order.email}</dd>
          <dt>Alamat</dt>
          <dd className="text-ink">{order.address}</dd>
        </dl>

        <ul className="font-mono text-sm divide-y divide-dashed divide-line border-t border-dashed border-line">
          {order.items.map((item) => (
            <li key={item.id} className="py-2.5 flex justify-between gap-3">
              <span className="text-ink-dim line-clamp-1">
                {item.qty}× {item.title}
              </span>
              <span className="text-ink shrink-0">
                {formatUsd(item.price * item.qty)}
              </span>
            </li>
          ))}
        </ul>

        <div className="font-mono text-sm space-y-1.5 pt-3 border-t border-line mt-1">
          <div className="flex justify-between text-ink-dim">
            <span>Subtotal</span>
            <span>{formatUsd(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-ink-dim">
            <span>Pengiriman</span>
            <span>{formatUsd(order.shipping)}</span>
          </div>
          <div className="flex justify-between text-ink font-semibold text-base pt-2 border-t border-line mt-2">
            <span>Total dibayar</span>
            <span>{formatUsd(order.total)}</span>
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-ink-dim mt-6">
        Ini pesanan demo — tidak ada barang yang benar-benar dikirim.
      </p>

      <div className="text-center mt-4">
        <Link
          to="/"
          className="text-sm text-forest-dark underline underline-offset-4"
        >
          Kembali ke katalog
        </Link>
      </div>
    </div>
  );
}