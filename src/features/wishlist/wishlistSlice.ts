import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/product.types';

const WISHLIST_STORAGE_KEY = 'shopsmart_wishlist';

interface WishlistState {
  items: Product[];
}

// Load wishlist from localStorage
const loadWishlistFromStorage = (): WishlistState => {
  try {
    const serializedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (serializedWishlist) {
      return JSON.parse(serializedWishlist);
    }
  } catch (error) {
    console.error('Failed to load wishlist from localStorage:', error);
  }
  return { items: [] };
};

// Save wishlist to localStorage
const saveWishlistToStorage = (state: WishlistState) => {
  try {
    const serializedWishlist = JSON.stringify(state);
    localStorage.setItem(WISHLIST_STORAGE_KEY, serializedWishlist);
  } catch (error) {
    console.error('Failed to save wishlist to localStorage:', error);
  }
};

const initialState: WishlistState = loadWishlistFromStorage();

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.items.some(
        (item) => item.id === action.payload.id
      );
      if (!exists) {
        state.items.push(action.payload);
        saveWishlistToStorage(state);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
      saveWishlistToStorage(state);
    },
    toggleWishlist: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
      saveWishlistToStorage(state);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToStorage(state);
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;