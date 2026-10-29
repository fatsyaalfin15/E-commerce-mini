import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatUsd, orderNumber } from '../utils/format';

const initialForm = {
  name: '',
  email: '',
  address: '',
  city: '',
  postal: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvc: '',
};

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0) {
    return <Navigate to="/" replace />;
  }

  const shipping = 4.5;
  const total = subtotal + shipping;

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    const order = {
      number: orderNumber(Math.floor(Date.now() / 1000) % 1000000),
      name: form.name,
      email: form.email,
      address: `${form.address}, ${form.city} ${form.postal}`,
      items,
      subtotal,
      shipping,
      total,
      date: new Date().toISOString(),
    };

    // Simulasi proses pembayaran dummy
    setTimeout(() => {
      clearCart();
      navigate('/checkout/selesai', { state: { order } });
    }, 700);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
      <h1 className="font-serif text-2xl sm:text-3xl text-ink mb-1">
        Checkout
      </h1>
      <p className="text-sm text-ink-dim mb-8">
        Ini adalah checkout demo — tidak ada pembayaran asli yang diproses.
      </p>

      <div className="grid lg:grid-cols-[1fr_360px] gap-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <fieldset className="flex flex-col gap-3">
            <legend className="font-serif text-lg text-ink mb-1">
              Alamat pengiriman
            </legend>
            <Field label="Nama lengkap" value={form.name} onChange={update('name')} required />
            <Field label="Email" type="email" value={form.email} onChange={update('email')} required />
            <Field label="Alamat" value={form.address} onChange={update('address')} required />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Kota" value={form.city} onChange={update('city')} required />
              <Field label="Kode pos" value={form.postal} onChange={update('postal')} required />
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-3">
            <legend className="font-serif text-lg text-ink mb-1">
              Pembayaran <span className="text-xs text-ink-faint font-sans">(dummy, tidak diproses sungguhan)</span>
            </legend>
            <Field
              label="Nomor kartu"
              value={form.cardNumber}
              onChange={update('cardNumber')}
              placeholder="4242 4242 4242 4242"
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Berlaku hingga"
                value={form.cardExpiry}
                onChange={update('cardExpiry')}
                placeholder="MM/YY"
                required
              />
              <Field
                label="CVC"
                value={form.cardCvc}
                onChange={update('cardCvc')}
                placeholder="123"
                required
              />
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={submitting}
            className="bg-forest hover:bg-forest-dark disabled:opacity-60 transition-colors text-paper font-medium py-3.5 text-sm"
          >
            {submitting ? 'Memproses pesanan...' : `Buat pesanan — ${formatUsd(total)}`}
          </button>
        </form>

        <aside className="border border-line bg-paper-raised h-fit">
          <div className="px-5 py-4 border-b border-line">
            <h2 className="font-serif text-ink">Ringkasan pesanan</h2>
          </div>
          <ul className="px-5 py-4 divide-y divide-dashed divide-line font-mono text-sm">
            {items.map((item) => (
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
          <div className="px-5 py-4 border-t border-line font-mono text-sm space-y-1.5">
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
        </aside>
      </div>
    </div>
  );
}

function Field({ label, type = 'text', ...props }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="text-ink-dim">{label}</span>
      <input
        type={type}
        className="border border-line bg-paper-raised px-3 py-2.5 text-ink placeholder:text-ink-faint focus:outline-none focus:border-ink-faint"
        {...props}
      />
    </label>
  );
}
