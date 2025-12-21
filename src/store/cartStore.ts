import { create } from "zustand";
import { type Product } from "../types";

type CartState = {
  cart: Array<Product & { quantity: number }>;
  pendingCart: { [id: number]: number };
  addToCart: (product: Product) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
};

const useCartStore = create<CartState>((set) => ({
  cart: [],
  pendingCart: {},

  // Add product to cart with the quantity from pendingCart
  addToCart: (product) =>
    set((state) => {
      const quantity = state.pendingCart[product.id] || 1;
      const existingProduct = state.cart?.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return {
          cart: state.cart?.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
          pendingCart: { ...state.pendingCart, [product.id]: 1 },
        };
      } else {
        return {
          cart: [...state.cart, { ...product, quantity }],
          pendingCart: { ...state.pendingCart, [product.id]: 1 },
        };
      }
    }),

  // Increase
  increaseQuantity: (id) =>
    set((state) => ({
      pendingCart: {
        ...state.pendingCart,
        [id]: (state.pendingCart[id] || 1) + 1,
      },
    })),

  // Decrease
  decreaseQuantity: (id) =>
    set((state) => ({
      pendingCart: {
        ...state.pendingCart,
        [id]: Math.max((state.pendingCart[id] || 1) - 1, 1),
      },
    })),

  // Remove product from cart
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart?.filter((product) => product.id !== id),
    })),
}));

export default useCartStore;
