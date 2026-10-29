export default function StarRating({ rate = 0, count = 0, size = 'sm' }) {
  const starSize = size === 'lg' ? 16 : 12;
  const textSize = size === 'lg' ? 'text-sm' : 'text-[0.72rem]';
  const stars = [0, 1, 2, 3, 4];

  return (
    <div className={`flex items-center gap-1.5 ${textSize} text-ink-dim`}>
      <div className="flex items-center gap-1px" aria-hidden="true">
        {stars.map((i) => {
          const fill = Math.max(0, Math.min(1, rate - i));
          return <Star key={i} fill={fill} size={starSize} />;
        })}
      </div>
      <span>
        {rate.toFixed(1)}
        {count > 0 && <span className="text-ink-faint"> ({count})</span>}
      </span>
    </div>
  );
}

function Star({ fill, size }) {
  const id = `star-clip-${Math.random().toString(36).slice(2)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 20 20">
      <defs>
        <clipPath id={id}>
          <rect x="0" y="0" width={20 * fill} height="20" />
        </clipPath>
      </defs>
      <path
        d="M10 1.5l2.6 5.3 5.9.8-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.8L10 1.5z"
        fill="none"
        stroke="#d3992b"
        strokeWidth="1"
      />
      <path
        d="M10 1.5l2.6 5.3 5.9.8-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.8L10 1.5z"
        fill="#d3992b"
        clipPath={`url(#${id})`}
      />
    </svg>
  );
}