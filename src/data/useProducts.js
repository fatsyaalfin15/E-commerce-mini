import { useEffect, useState } from 'react';

const API = 'https://fakestoreapi.com/products';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ok | error

  useEffect(() => {
    let cancelled = false;
    fetch(API)
      .then((res) => {
        if (!res.ok) throw new Error('Request gagal: ' + res.status);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setProducts(data);
        setStatus('ok');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = [...new Set(products.map((p) => p.category))];

  return { products, categories, status };
}
