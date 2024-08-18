// stores/useCartStore.ts
import { create } from "zustand";

interface CartItem {
  id: number;
  quantity: number;
}

interface CartStore {
  cartItems: CartItem[];
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  getCartQuantity: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cartItems: [],
  addToCart: (id) =>
    set((state) => {
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.min(item.quantity + 1, 5) }
              : item
          ),
        };
      }
      return {
        cartItems: [...state.cartItems, { id, quantity: 1 }],
      };
    }),
  removeFromCart: (id) =>
    set((state) => {
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          ),
        };
      }
      return {
        cartItems: state.cartItems.filter((item) => item.id !== id),
      };
    }),
  getCartQuantity: () =>
    get().cartItems.reduce((total, item) => total + item.quantity, 0),
}));
