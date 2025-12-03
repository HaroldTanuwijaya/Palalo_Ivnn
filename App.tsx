import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryList from './components/CategoryList';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import GeminiChat from './components/GeminiChat';
import { Product, CartItem } from './types';
import { api } from './services/api';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Initial Data Fetch & Filter
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch filtered products directly from "Backend"
        const productData = await api.products.list(selectedCategory || undefined, searchQuery);
        setProducts(productData);
        
        // Fetch Cart
        const cartData = await api.cart.get();
        setCart(cartData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory, searchQuery]);

  // Cart Operations
  const addToCart = async (product: Product) => {
    try {
      const updatedCart = await api.cart.add(product);
      setCart(updatedCart);
      setIsCartOpen(true);
    } catch (error) {
      console.error("Error adding to cart", error);
      alert("Gagal menambahkan ke keranjang");
    }
  };

  const removeFromCart = async (id: number) => {
    try {
      const updatedCart = await api.cart.remove(id);
      setCart(updatedCart);
    } catch (error) {
      console.error("Error removing from cart", error);
    }
  };

  const updateQuantity = async (id: number, qty: number) => {
    try {
      const updatedCart = await api.cart.updateQuantity(id, qty);
      setCart(updatedCart);
    } catch (error) {
       console.error("Error updating quantity", error);
    }
  }

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    
    const confirm = window.confirm(`Total pembayaran: ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(cart.reduce((a, b) => a + (b.price * b.quantity), 0))}\n\nLanjutkan pembayaran?`);
    
    if (confirm) {
       try {
         setIsLoading(true);
         await api.orders.create(cart);
         const emptyCart = await api.cart.get(); // Should be empty now
         setCart(emptyCart);
         setIsCartOpen(false);
         alert("Pesanan berhasil dibuat! Terima kasih telah berbelanja di Tokopalalu.");
       } catch (error) {
         console.error(error);
         alert("Gagal memproses pesanan.");
       } finally {
         setIsLoading(false);
       }
    }
  }

  return (
    <div className="min-h-screen pb-12 bg-slate-50 font-sans text-slate-800">
      <Header 
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
        onSearch={setSearchQuery}
      />
      
      {!searchQuery && !selectedCategory && <Hero />}
      
      <CategoryList 
        onSelectCategory={setSelectedCategory} 
        selectedCategory={selectedCategory}
      />

      <main className="container mx-auto px-4 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {searchQuery ? `Hasil Pencarian: "${searchQuery}"` : 
             selectedCategory ? `Kategori: ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}` : 
             "Rekomendasi Pilihan"}
          </h2>
        </div>
        
        {isLoading ? (
           <div className="flex justify-center items-center py-20 min-h-[300px]">
             <div className="flex flex-col items-center gap-3">
               <Loader2 className="animate-spin text-tokoblue-600" size={48} />
               <p className="text-gray-500 text-sm">Memuat data...</p>
             </div>
           </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-lg">Produk tidak ditemukan.</p>
            <button 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
              }}
              className="mt-4 text-tokoblue-600 font-bold hover:underline"
            >
              Lihat semua produk
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart} 
              />
            ))}
          </div>
        )}
      </main>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cart}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckout}
      />

      <GeminiChat />

      <footer className="mt-20 bg-white border-t border-gray-200 pt-12 pb-8">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
           <div className="flex justify-center items-center gap-2 mb-4 font-bold text-tokoblue-600 text-xl">
              tokopalalu
           </div>
           <p className="mb-4">&copy; 2024 Tokopalalu. Design inspired by Tokopedia (Blue Theme).</p>
           <p>Powered by IndexedDB & Gemini AI</p>
        </div>
      </footer>
    </div>
  );
};

export default App;