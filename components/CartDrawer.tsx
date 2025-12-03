import React from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';
import { CartItem } from '../types';
import { formatRupiah } from '../constants';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onRemoveItem, 
  onUpdateQuantity,
  onCheckout 
}) => {
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <ShoppingBag className="text-tokoblue-600" size={20} />
              Keranjang Belanja
              <span className="text-sm font-normal text-gray-500">({cartItems.length} barang)</span>
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-500">
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
                   <ShoppingBag size={48} className="text-gray-300" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-700">Keranjang Kosong</h3>
                  <p className="text-sm">Yuk, isi keranjangmu dengan barang impian!</p>
                </div>
                <button 
                  onClick={onClose}
                  className="px-6 py-2 bg-tokoblue-600 text-white rounded-lg font-bold text-sm hover:bg-tokoblue-700 transition"
                >
                  Mulai Belanja
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-gray-50 pb-4 last:border-0">
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 line-clamp-2">{item.title}</h4>
                      <p className="text-sm font-bold text-tokoblue-600 mt-1">{formatRupiah(item.price)}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                       {/* Quantity Control */}
                       <div className="flex items-center border border-gray-200 rounded-lg">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 px-2 hover:bg-gray-100 text-gray-500 transition"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-semibold w-8 text-center">{item.quantity}</span>
                          <button 
                             onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                             className="p-1 px-2 hover:bg-gray-100 text-tokoblue-600 transition"
                          >
                            <Plus size={14} />
                          </button>
                       </div>

                       {/* Delete Button */}
                       <button 
                         onClick={() => onRemoveItem(item.id)}
                         className="text-gray-400 hover:text-red-500 transition"
                       >
                         <Trash2 size={18} />
                       </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Checkout */}
          {cartItems.length > 0 && (
            <div className="p-4 border-t border-gray-100 bg-white space-y-4">
               <div className="flex justify-between items-center">
                 <span className="text-gray-600 font-medium">Total Harga</span>
                 <span className="text-xl font-bold text-tokoblue-600">{formatRupiah(totalPrice)}</span>
               </div>
               <button 
                 onClick={onCheckout}
                 className="w-full py-3 bg-tokoblue-600 text-white rounded-xl font-bold hover:bg-tokoblue-700 transition shadow-lg shadow-tokoblue-200"
               >
                 Beli ({cartItems.length})
               </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;