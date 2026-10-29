import { useEffect, useState } from 'react';

export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setStatus('loading');
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Request gagal: ' + res.status);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        if (!data) {
          setStatus('error');
          return;
        }
        setProduct(data);
        setStatus('ok');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { product, status };
}
