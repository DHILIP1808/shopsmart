/**
 * Calculate discount amount
 * @param price - Original price
 * @param discountPercentage - Discount percentage
 * @returns Discount amount
 */
export function calculateDiscount(price: number, discountPercentage: number): number {
  return (price * discountPercentage) / 100;
}

/**
 * Calculate discounted price
 * @param price - Original price
 * @param discountPercentage - Discount percentage
 * @returns Discounted price
 */
export function calculateDiscountedPrice(
  price: number,
  discountPercentage: number
): number {
  const discount = calculateDiscount(price, discountPercentage);
  return price - discount;
}

/**
 * Calculate tax amount
 * @param amount - Amount to calculate tax on
 * @param taxRate - Tax rate (e.g., 0.08 for 8%)
 * @returns Tax amount
 */
export function calculateTax(amount: number, taxRate: number): number {
  return amount * taxRate;
}

/**
 * Calculate shipping cost
 * @param subtotal - Subtotal amount
 * @param freeShippingThreshold - Threshold for free shipping
 * @param standardShippingCost - Standard shipping cost
 * @returns Shipping cost
 */
export function calculateShipping(
  subtotal: number,
  freeShippingThreshold: number = 100,
  standardShippingCost: number = 10
): number {
  return subtotal >= freeShippingThreshold ? 0 : standardShippingCost;
}

/**
 * Calculate total cart value
 * @param subtotal - Subtotal
 * @param tax - Tax amount
 * @param shipping - Shipping cost
 * @param discount - Discount amount
 * @returns Total amount
 */
export function calculateTotal(
  subtotal: number,
  tax: number,
  shipping: number,
  discount: number
): number {
  return subtotal - discount + tax + shipping;
}

/**
 * Calculate savings percentage
 * @param originalPrice - Original price
 * @param discountedPrice - Discounted price
 * @returns Savings percentage
 */
export function calculateSavingsPercentage(
  originalPrice: number,
  discountedPrice: number
): number {
  if (originalPrice === 0) return 0;
  return ((originalPrice - discountedPrice) / originalPrice) * 100;
}

/**
 * Round to 2 decimal places
 * @param value - Value to round
 * @returns Rounded value
 */
export function roundToTwo(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Calculate average rating
 * @param ratings - Array of rating values
 * @returns Average rating
 */
export function calculateAverageRating(ratings: number[]): number {
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return roundToTwo(sum / ratings.length);
}