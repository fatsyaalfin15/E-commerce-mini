import { formatUsd } from '../utils/format';

export default function PriceTag({ price, size = 'md', holeColor = '#f7f4ec' }) {
  const sizes = {
    sm: 'text-[0.78rem] pl-4 pr-2.5 py-0.5',
    md: 'text-base pl-5 pr-3 py-1',
    lg: 'text-2xl pl-7 pr-4 py-1.5',
  };
  const holeSize = size === 'lg' ? 6 : size === 'md' ? 5 : 4;
  const holeLeft = size === 'lg' ? 10 : size === 'md' ? 8 : 6;

  return (
    <span
      className={`relative inline-flex items-center font-serif font-medium text-forest-dark bg-mustard ${sizes[size]}`}
      style={{
        clipPath:
          'polygon(12px 0, 100% 0, 100% 100%, 12px 100%, 0 50%)',
      }}
    >
      <span
        aria-hidden="true"
        className="absolute rounded-full"
        style={{
          left: holeLeft,
          top: '50%',
          width: holeSize,
          height: holeSize,
          transform: 'translateY(-50%)',
          background: holeColor,
        }}
      />
      {formatUsd(price)}
    </span>
  );
}
