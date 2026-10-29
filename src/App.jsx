import { Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Header from './components/Header';
import CartDrawer from './components/CartDrawer';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import Toast from './components/Toast';
export default function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Header />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Catalog />} />
              <Route path="/produk/:id" element={<ProductDetail />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/checkout/selesai" element={<Confirmation />} />
            </Routes>
          </main>

          <footer className="border-t border-line py-6">
            <p className="mx-auto max-w-6xl px-4 sm:px-6 text-xs text-ink-faint">
              Data produk berasal dari Fake Store API &middot; proyek demo, hanya mini E-commerce
            </p>
          </footer>

          <CartDrawer />
          <Toast/>
        </div>
      </CartProvider>
    </WishlistProvider>
  );
}