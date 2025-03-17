import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  color?: string;
  option?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (productId: string, quantity?: number, color?: string, option?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (productId, quantity = 1, color, option) => {
        set((state) => {
          // Check if the item already exists with the same options
          const existingItemIndex = state.items.findIndex(
            item => item.productId === productId && 
                  item.color === color && 
                  item.option === option
          );
          
          // If it exists, update quantity
          if (existingItemIndex !== -1) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += quantity;
            toast.success('تم تحديث العربة', { duration: 2000 });
            return { items: updatedItems };
          }
          
          // Otherwise, add new item
          const newItem: CartItem = {
            id: `${productId}_${color || 'default'}_${option || 'default'}_${Date.now()}`,
            productId,
            quantity,
            color,
            option
          };
          
          toast.success('تمت الإضافة إلى العربة', { duration: 2000 });
          return { items: [...state.items, newItem] };
        });
      },
      
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }));
        toast.info('تم إزالة المنتج من العربة', { duration: 2000 });
      },
      
      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map(item => 
            item.id === id ? { ...item, quantity } : item
          )
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
        toast.info('تم مسح العربة', { duration: 2000 });
      },
      
      getCartTotal: () => {
        return get().items.reduce((total, item) => {
          // In a real app, you would fetch the product price from a product store/API
          // For simplicity, we'll assume a function that gets the product details
          const productPrice = 100; // Placeholder price
          return total + (productPrice * item.quantity);
        }, 0);
      },
      
      getCartCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'shopping-cart'
    }
  )
);
