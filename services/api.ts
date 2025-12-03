import { db } from '../lib/db';
import { Product, CartItem, Order } from '../types';

// Initialize DB on first import
let isInitialized = false;
const ensureDb = async () => {
  if (!isInitialized) {
    await db.init();
    isInitialized = true;
  }
};

export const api = {
  products: {
    list: async (category?: string, query?: string): Promise<Product[]> => {
      await ensureDb();
      let products = await db.getAll<Product>('products');

      if (category) {
        products = products.filter(p => p.category === category);
      }

      if (query) {
        const lowerQuery = query.toLowerCase();
        products = products.filter(p => 
          p.title.toLowerCase().includes(lowerQuery) || 
          p.category.toLowerCase().includes(lowerQuery)
        );
      }
      
      return products;
    },
    get: async (id: number): Promise<Product | undefined> => {
      await ensureDb();
      return db.get<Product>('products', id);
    }
  },

  cart: {
    get: async (): Promise<CartItem[]> => {
      await ensureDb();
      return db.getAll<CartItem>('cart');
    },
    add: async (product: Product): Promise<CartItem[]> => {
      await ensureDb();
      const existing = await db.get<CartItem>('cart', product.id);
      
      if (existing) {
        await db.put('cart', { ...existing, quantity: existing.quantity + 1 });
      } else {
        await db.put('cart', { ...product, quantity: 1 });
      }
      return db.getAll<CartItem>('cart');
    },
    updateQuantity: async (id: number, quantity: number): Promise<CartItem[]> => {
      await ensureDb();
      if (quantity <= 0) {
        await db.delete('cart', id);
      } else {
        const item = await db.get<CartItem>('cart', id);
        if (item) {
           await db.put('cart', { ...item, quantity });
        }
      }
      return db.getAll<CartItem>('cart');
    },
    remove: async (id: number): Promise<CartItem[]> => {
      await ensureDb();
      await db.delete('cart', id);
      return db.getAll<CartItem>('cart');
    },
    clear: async () => {
      await ensureDb();
      await db.clear('cart');
    }
  },

  orders: {
    create: async (items: CartItem[]): Promise<Order> => {
      await ensureDb();
      const order: Order = {
        id: `ORD-${Date.now()}`,
        items: items,
        total: items.reduce((acc, item) => acc + (item.price * item.quantity), 0),
        date: new Date().toISOString(),
        status: 'pending'
      };
      
      await db.put('orders', order);
      await db.clear('cart'); // Clear cart after order
      return order;
    },
    list: async (): Promise<Order[]> => {
       await ensureDb();
       return db.getAll<Order>('orders');
    }
  }
};