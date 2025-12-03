import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="container mx-auto px-4 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Main Banner */}
        <div className="md:col-span-12 lg:col-span-8 relative rounded-xl overflow-hidden shadow-sm aspect-[2/1] md:aspect-[3/1] lg:aspect-[2.5/1]">
           <img 
             src="https://picsum.photos/1200/400?random=100" 
             alt="Promo Banner" 
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-tokoblue-900/40 to-transparent flex items-center">
             <div className="p-8 text-white">
                <h2 className="text-2xl md:text-4xl font-bold mb-2 drop-shadow-md">Promo Gajian Hemat</h2>
                <p className="mb-4 drop-shadow-md font-medium">Diskon hingga 90% untuk produk elektronik!</p>
                <button className="bg-white text-tokoblue-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100 transition shadow-lg">
                  Cek Sekarang
                </button>
             </div>
           </div>
        </div>

        {/* Side Banners (Hidden on small screens) */}
        <div className="hidden lg:grid col-span-4 gap-4">
           <div className="rounded-xl overflow-hidden shadow-sm relative h-full">
              <img src="https://picsum.photos/400/200?random=101" alt="Side 1" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition duration-300"></div>
           </div>
           <div className="rounded-xl overflow-hidden shadow-sm relative h-full">
              <img src="https://picsum.photos/400/200?random=102" alt="Side 2" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition duration-300"></div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;