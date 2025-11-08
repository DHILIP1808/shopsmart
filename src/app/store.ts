import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice';
// Fix: Corrected the path for cartSlice
import cartReducer from '../features/cart/cartSlice';
// Fix: Changed alias paths to relative paths
import wishlistReducer from '../features/wishlist/wishlistSlice';
import uiReducer from '../features/ui/uiSlice';


export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore toast actions with non-serializable payloads
        ignoredActions: ['ui/showToast'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;