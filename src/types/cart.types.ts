import type { Product } from './product.types';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  promoCode: string | null;
  discount: number;
}

export interface CartSummary {
  subtotal: number;
  tax: number;
  discount: number;
  shipping: number;
  total: number;
  itemCount: number;
}

export interface PromoCode {
  code: string;
  discountPercentage: number;
  isValid: boolean;
}