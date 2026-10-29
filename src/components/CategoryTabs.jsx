import { categoryLabel } from '../utils/format';

export default function CategoryTabs({ categories, active, onChange }) {
  const tabs = ['all', ...categories];

  return (
    <div className="relative">
      {/* Container scrollable */}
      <div
        role="tablist"
        aria-label="Kategori produk"
        className="flex gap-4 sm:gap-6 overflow-x-auto border-b border-line scrollbar-none [-ms-overflow-style:none] scrollbar-width:none [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((tab) => {
          const isActive = active === tab;
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onChange(tab)}
              className={`relative shrink-0 whitespace-nowrap pb-3 text-sm transition-colors ${
                isActive ? 'text-ink' : 'text-ink-dim hover:text-ink'
              }`}
            >
              {tab === 'all' ? 'Semua produk' : categoryLabel(tab)}
              {isActive && (
                <span className="absolute left-0 right-0 -bottom-px h-2px bg-forest" />
              )}
            </button>
          );
        })}
      </div>

      {/* Gradient fade kanan — hanya tampil di mobile, hint bahwa bisa di-scroll */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-linear-to-l from-paper to-transparent sm:hidden"
      />
    </div>
  );
}