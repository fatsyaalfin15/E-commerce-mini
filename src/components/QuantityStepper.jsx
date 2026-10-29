export default function QuantityStepper({ value, onChange, size = 'md' }) {
  const dims = size === 'sm' ? 'w-6 h-6 text-sm' : 'w-8 h-8 text-base';

  return (
    <div className="inline-flex items-center border border-line bg-paper-raised">
      <button
        type="button"
        className={`${dims} flex items-center justify-center text-ink-dim hover:text-ink hover:bg-paper transition-colors disabled:opacity-30`}
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="Kurangi jumlah"
      >
        −
      </button>
      <span className={`${dims} flex items-center justify-center font-mono text-sm border-x border-line`}>
        {value}
      </span>
      <button
        type="button"
        className={`${dims} flex items-center justify-center text-ink-dim hover:text-ink hover:bg-paper transition-colors`}
        onClick={() => onChange(value + 1)}
        aria-label="Tambah jumlah"
      >
        +
      </button>
    </div>
  );
}
