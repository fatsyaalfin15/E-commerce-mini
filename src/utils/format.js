export function formatUsd(value) {
  if (value == null) return '—';
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const CATEGORY_LABELS = {
  electronics: 'Elektronik',
  jewelery: 'Perhiasan',
  "men's clothing": 'Pakaian Pria',
  "women's clothing": 'Pakaian Wanita',
};

export function categoryLabel(category) {
  return CATEGORY_LABELS[category] || category;
}

export function orderNumber(seed) {
  return `OS-${String(seed).padStart(6, '0')}`;
}
