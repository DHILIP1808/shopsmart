import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/product.types';
import type { CartState } from '../../types/cart.types';

const CART_STORAGE_KEY = 'shopsmart_cart';

// Load cart from localStorage
const loadCartFromStorage = (): CartState => {
  try {
    const serializedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (serializedCart) {
      return JSON.parse(serializedCart);
    }
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
  }
  return {
    items: [],
    promoCode: null,
    discount: 0,
  };
};

// Save cart to localStorage
const saveCartToStorage = (state: CartState) => {
  try {
    const serializedCart = JSON.stringify(state);
    localStorage.setItem(CART_STORAGE_KEY, serializedCart);
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
};

const initialState: CartState = loadCartFromStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          product: action.payload,
          quantity: 1,
        });
      }
      saveCartToStorage(state);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
      saveCartToStorage(state);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) => {
      const item = state.items.find(
        (item) => item.product.id === action.payload.productId
      );
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      }
      saveCartToStorage(state);
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(
        (item) => item.product.id === action.payload
      );
      if (item) {
        item.quantity += 1;
      }
      saveCartToStorage(state);
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(
        (item) => item.product.id === action.payload
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      saveCartToStorage(state);
    },
    applyPromoCode: (state, action: PayloadAction<string>) => {
      // Simple promo code logic (extend with backend validation in production)
      const promoCodes: Record<string, number> = {
        SAVE10: 10,
        SAVE20: 20,
        WELCOME15: 15,
        NEWYEAR25: 25,
      };

      const code = action.payload.toUpperCase();
      if (promoCodes[code]) {
        state.promoCode = code;
        state.discount = promoCodes[code];
      }
      saveCartToStorage(state);
    },
    removePromoCode: (state) => {
      state.promoCode = null;
      state.discount = 0;
      saveCartToStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.promoCode = null;
      state.discount = 0;
      saveCartToStorage(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  applyPromoCode,
  removePromoCode,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;