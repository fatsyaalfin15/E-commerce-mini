export function flyToCart(sourceEl) {
  const target = document.getElementById('cart-icon-target');
  if (!sourceEl || !target) return;

  const from = sourceEl.getBoundingClientRect();
  const to = target.getBoundingClientRect();

  const clone = sourceEl.cloneNode(true);
  clone.removeAttribute('class');
  Object.assign(clone.style, {
    position: 'fixed',
    left: `${from.left}px`,
    top: `${from.top}px`,
    width: `${from.width}px`,
    height: `${from.height}px`,
    margin: '0',
    padding: '4px',
    background: '#f7f4ec',
    border: '1px solid #d9d3c2',
    objectFit: 'contain',
    zIndex: '9999',
    pointerEvents: 'none',
    transition: 'transform 0.55s cubic-bezier(.3,.9,.3,1), opacity 0.55s ease',
    willChange: 'transform, opacity',
  });
  document.body.appendChild(clone);

  const dx = to.left + to.width / 2 - (from.left + from.width / 2);
  const dy = to.top + to.height / 2 - (from.top + from.height / 2);

  // force reflow so the transition below actually animates
  // eslint-disable-next-line no-unused-expressions
  clone.offsetWidth;

  requestAnimationFrame(() => {
    clone.style.transform = `translate(${dx}px, ${dy}px) scale(0.12)`;
    clone.style.opacity = '0.25';
  });

  clone.addEventListener(
    'transitionend',
    () => {
      clone.remove();
      target.classList.add('cart-bump');
      setTimeout(() => target.classList.remove('cart-bump'), 260);
    },
    { once: true }
  );
}
