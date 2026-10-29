import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div
      key={toast.id}
      role="status"
      aria-live="polite"
      className="fixed z-50 bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 sm:bottom-6 flex justify-center sm:justify-end pointer-events-none"
    >
      <div className="toast-pop pointer-events-auto flex items-center gap-2.5 bg-ink text-paper px-4 py-3 shadow-lg max-w-sm w-full sm:w-auto">
        <span className="text-forest-dark bg-mustard w-5 h-5 shrink-0 flex items-center justify-center text-xs font-bold">
          ✓
        </span>
        <span className="text-sm">{toast.message}</span>
      </div>
    </div>
  );
}