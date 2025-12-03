import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'gadget', name: 'Gadget', icon: 'smartphone' },
  { id: 'fashion', name: 'Fashion', icon: 'shirt' },
  { id: 'elektronik', name: 'Elektronik', icon: 'monitor' },
  { id: 'kesehatan', name: 'Kesehatan', icon: 'activity' },
  { id: 'rumah', name: 'Rumah Tangga', icon: 'home' },
  { id: 'hobi', name: 'Hobi', icon: 'gamepad-2' },
  { id: 'makanan', name: 'Makanan', icon: 'pizza' },
  { id: 'otomotif', name: 'Otomotif', icon: 'car' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Laptop Gaming Super Cepat RTX 4060",
    price: 15499000,
    originalPrice: 18000000,
    discount: 14,
    rating: 4.8,
    sold: 120,
    location: "Jakarta Pusat",
    image: "https://picsum.photos/300/300?random=1",
    category: "elektronik"
  },
  {
    id: 2,
    title: "Sepatu Sneakers Pria Kasual Navy Blue",
    price: 350000,
    rating: 4.5,
    sold: 1500,
    location: "Bandung",
    image: "https://picsum.photos/300/300?random=2",
    category: "fashion"
  },
  {
    id: 3,
    title: "Smartphone Android 5G Ram 8GB",
    price: 3200000,
    originalPrice: 4000000,
    discount: 20,
    rating: 4.7,
    sold: 500,
    location: "Surabaya",
    image: "https://picsum.photos/300/300?random=3",
    category: "gadget"
  },
  {
    id: 4,
    title: "Kemeja Flanel Kotak-Kotak Premium",
    price: 125000,
    rating: 4.6,
    sold: 800,
    location: "Jakarta Barat",
    image: "https://picsum.photos/300/300?random=4",
    category: "fashion"
  },
  {
    id: 5,
    title: "Smart TV 43 Inch 4K UHD",
    price: 4500000,
    rating: 4.9,
    sold: 50,
    location: "Tangerang",
    image: "https://picsum.photos/300/300?random=5",
    category: "elektronik"
  },
  {
    id: 6,
    title: "Tas Ransel Waterproof Anti Air",
    price: 180000,
    originalPrice: 300000,
    discount: 40,
    rating: 4.4,
    sold: 230,
    location: "Bandung",
    image: "https://picsum.photos/300/300?random=6",
    category: "fashion"
  },
  {
    id: 7,
    title: "Headphone Bluetooth Noise Cancelling",
    price: 850000,
    rating: 4.7,
    sold: 85,
    location: "Jakarta Selatan",
    image: "https://picsum.photos/300/300?random=7",
    category: "gadget"
  },
  {
    id: 8,
    title: "Meja Kerja Minimalis Kayu Jati",
    price: 1200000,
    rating: 4.8,
    sold: 40,
    location: "Jepara",
    image: "https://picsum.photos/300/300?random=8",
    category: "rumah"
  },
  {
    id: 9,
    title: "Vitamin C 1000mg Botol Kaca",
    price: 45000,
    rating: 4.9,
    sold: 5000,
    location: "Surabaya",
    image: "https://picsum.photos/300/300?random=9",
    category: "kesehatan"
  },
  {
    id: 10,
    title: "Kopi Arabika Gayo 500gr",
    price: 95000,
    rating: 4.8,
    sold: 320,
    location: "Aceh",
    image: "https://picsum.photos/300/300?random=10",
    category: "makanan"
  }
];

export const formatRupiah = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};