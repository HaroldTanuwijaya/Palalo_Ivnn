import React from 'react';
import { CATEGORIES } from '../constants';
import { Smartphone, Shirt, Monitor, Activity, Home, Gamepad2, Pizza, Car } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  smartphone: <Smartphone size={24} />,
  shirt: <Shirt size={24} />,
  monitor: <Monitor size={24} />,
  activity: <Activity size={24} />,
  home: <Home size={24} />,
  'gamepad-2': <Gamepad2 size={24} />,
  pizza: <Pizza size={24} />,
  car: <Car size={24} />,
};

interface CategoryListProps {
  onSelectCategory: (category: string) => void;
  selectedCategory: string | null;
}

const CategoryList: React.FC<CategoryListProps> = ({ onSelectCategory, selectedCategory }) => {
  return (
    <div className="container mx-auto px-4 mt-6">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Kategori Pilihan</h3>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
           
           {/* All Categories Button */}
           <div 
             onClick={() => onSelectCategory("")}
             className={`flex flex-col items-center min-w-[80px] cursor-pointer group`}
           >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 transition-all border ${!selectedCategory ? 'bg-tokoblue-50 border-tokoblue-200 text-tokoblue-600' : 'bg-gray-50 border-gray-200 text-gray-500 group-hover:border-tokoblue-200'}`}>
                 <span className="font-bold text-xs">Semua</span>
              </div>
           </div>

           {CATEGORIES.map((cat) => (
             <div 
               key={cat.id} 
               onClick={() => onSelectCategory(cat.id)}
               className="flex flex-col items-center min-w-[80px] cursor-pointer group"
             >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 transition-all border ${selectedCategory === cat.id ? 'bg-tokoblue-50 border-tokoblue-200 text-tokoblue-600' : 'bg-gray-50 border-gray-200 text-gray-500 group-hover:border-tokoblue-200 group-hover:text-tokoblue-500'}`}>
                   {iconMap[cat.icon]}
                </div>
                <span className={`text-xs text-center truncate w-full ${selectedCategory === cat.id ? 'font-bold text-tokoblue-600' : 'text-gray-600'}`}>
                  {cat.name}
                </span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;