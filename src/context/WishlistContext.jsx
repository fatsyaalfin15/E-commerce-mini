import { createContext, useContext, useEffect, useState } from 'react';

const WishlistContext = createContext(null);
const STORAGE_KEY = 'shop-mini-wishlist';

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(readStored);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable — fail quietly
    }
  }, [items]);

  function isSaved(id) {
    return items.some((i) => i.id === id);
  }

  function toggle(product) {
    setItems((prev) =>
      prev.some((i) => i.id === product.id)
        ? prev.filter((i) => i.id !== product.id)
        : [
            ...prev,
            {
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.image,
              category: product.category,
            },
          ]
    );
  }

  const value = { items, count: items.length, isSaved, toggle };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist harus dipakai di dalam WishlistProvider');
  return ctx;
}