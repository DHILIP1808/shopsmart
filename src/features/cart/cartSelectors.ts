import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { CartSummary, CartItem } from '../../types/cart.types';

// Base selectors
export const selectCartItems = (state: RootState): CartItem[] => state.cart.items;
export const selectPromoCode = (state: RootState) => state.cart.promoCode;
export const selectDiscount = (state: RootState) => state.cart.discount;

// Memoized selector for cart item count
export const selectCartItemCount = createSelector(
  [selectCartItems],
  (items: CartItem[]) =>
    items.reduce((total: number, item: CartItem) => total + item.quantity, 0)
);

// Memoized selector for cart subtotal
export const selectCartSubtotal = createSelector(
  [selectCartItems],
  (items: CartItem[]) =>
    items.reduce(
      (total: number, item: CartItem) =>
        total + item.product.price * item.quantity,
      0
    )
);

// Memoized selector for cart summary
export const selectCartSummary = createSelector(
  [selectCartSubtotal, selectDiscount],
  (subtotal: number, discountPercentage: number): CartSummary => {
    const TAX_RATE = 0.08;
    const FREE_SHIPPING_THRESHOLD = 100;
    const SHIPPING_COST = 10;

    const discount = (subtotal * discountPercentage) / 100;
    const subtotalAfterDiscount = subtotal - discount;
    const tax = subtotalAfterDiscount * TAX_RATE;
    const shipping =
      subtotalAfterDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const total = subtotalAfterDiscount + tax + shipping;

    return {
      subtotal: Number(subtotal.toFixed(2)),
      tax: Number(tax.toFixed(2)),
      discount: Number(discount.toFixed(2)),
      shipping: Number(shipping.toFixed(2)),
      total: Number(total.toFixed(2)),
      itemCount: 0,
    };
  }
);

// Check if product in cart
export const selectIsInCart = (productId: number) =>
  createSelector([selectCartItems], (items: CartItem[]) =>
    items.some((item: CartItem) => item.product.id === productId)
  );

// Get quantity of a specific product in cart
export const selectProductQuantityInCart = (productId: number) =>
  createSelector([selectCartItems], (items: CartItem[]) =>
    items.find((item: CartItem) => item.product.id === productId)?.quantity || 0
  );
