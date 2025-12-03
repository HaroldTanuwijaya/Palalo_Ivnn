import { MOCK_PRODUCTS } from '../constants';
import { Product, CartItem, Order } from '../types';

const DB_NAME = 'TokopalaluDB';
const DB_VERSION = 1;

interface DBSchema {
  products: Product;
  cart: CartItem;
  orders: Order;
}

class Database {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      
      request.onsuccess = () => {
        this.db = request.result;
        this.checkAndSeedData().then(resolve);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Products Store
        if (!db.objectStoreNames.contains('products')) {
          db.createObjectStore('products', { keyPath: 'id' });
        }

        // Cart Store
        if (!db.objectStoreNames.contains('cart')) {
          db.createObjectStore('cart', { keyPath: 'id' });
        }

        // Orders Store
        if (!db.objectStoreNames.contains('orders')) {
          db.createObjectStore('orders', { keyPath: 'id' });
        }
      };
    });
  }

  private async checkAndSeedData() {
    const products = await this.getAll('products');
    if (products.length === 0) {
      console.log("Seeding Database with Mock Data...");
      const tx = this.db!.transaction(['products'], 'readwrite');
      const store = tx.objectStore('products');
      MOCK_PRODUCTS.forEach(product => store.add(product));
      return new Promise<void>((resolve) => {
        tx.oncomplete = () => resolve();
      });
    }
  }

  async getAll<T>(storeName: string): Promise<T[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) return reject("Database not initialized");
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async get<T>(storeName: string, id: number | string): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      if (!this.db) return reject("Database not initialized");
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async put(storeName: string, item: any): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) return reject("Database not initialized");
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(item);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async delete(storeName: string, id: number | string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) return reject("Database not initialized");
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
  
  async clear(storeName: string): Promise<void> {
     return new Promise((resolve, reject) => {
      if (!this.db) return reject("Database not initialized");
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

export const db = new Database();