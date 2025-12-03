import React from 'react';
import { Product } from '../types';
import { formatRupiah } from '../constants';
import { Star, MapPin } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200 h-full group">
      
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {product.discount && (
          <div className="absolute top-0 right-0 bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-bl-lg">
            {product.discount}% OFF
          </div>
        )}
      </div>

      {/* Info Container */}
      <div className="p-3 flex flex-col flex-1">
        
        {/* Title */}
        <h3 className="text-sm text-gray-700 line-clamp-2 mb-1 min-h-[40px]">
          {product.title}
        </h3>

        {/* Price */}
        <div className="mb-1">
          <span className="text-base font-bold text-gray-900 block">{formatRupiah(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              {formatRupiah(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Location & Rating */}
        <div className="mt-auto">
          <div className="flex items-center text-xs text-gray-500 mb-1">
            <MapPin size={12} className="mr-1" />
            <span className="truncate">{product.location}</span>
          </div>
          <div className="flex items-center justify-between">
             <div className="flex items-center text-xs">
                <Star size={12} className="text-yellow-400 fill-yellow-400 mr-1" />
                <span className="text-gray-700">{product.rating}</span>
                <span className="mx-1 text-gray-300">|</span>
                <span className="text-gray-500">Terjual {product.sold > 1000 ? `${(product.sold/1000).toFixed(1)}rb` : product.sold}</span>
             </div>
          </div>
          
          <button 
            onClick={() => onAddToCart(product)}
            className="w-full mt-3 py-1.5 text-tokoblue-600 border border-tokoblue-600 rounded-lg text-sm font-bold hover:bg-tokoblue-600 hover:text-white transition-colors"
          >
            + Keranjang
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;