/**
 * Validate email format
 * @param email - Email string to validate
 * @returns True if valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate promo code format
 * @param code - Promo code to validate
 * @returns True if valid format
 */
export function isValidPromoCode(code: string): boolean {
  // Alphanumeric, 4-20 characters
  const promoRegex = /^[A-Z0-9]{4,20}$/;
  return promoRegex.test(code.toUpperCase());
}

/**
 * Validate quantity
 * @param quantity - Quantity value
 * @param max - Maximum allowed quantity
 * @returns True if valid
 */
export function isValidQuantity(quantity: number, max: number = 99): boolean {
  return Number.isInteger(quantity) && quantity > 0 && quantity <= max;
}

/**
 * Validate price range
 * @param min - Minimum price
 * @param max - Maximum price
 * @returns Error message or null if valid
 */
export function validatePriceRange(
  min: number | null,
  max: number | null
): string | null {
  if (min !== null && max !== null && min > max) {
    return 'Minimum price cannot be greater than maximum price';
  }
  if (min !== null && min < 0) {
    return 'Price cannot be negative';
  }
  return null;
}

/**
 * Validate search query
 * @param query - Search query string
 * @returns True if valid (non-empty after trim)
 */
export function isValidSearchQuery(query: string): boolean {
  return query.trim().length >= 2;
}

/**
 * Sanitize string input (prevent XSS)
 * @param input - Input string
 * @returns Sanitized string
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .trim();
}

/**
 * Validate rating value
 * @param rating - Rating value
 * @returns True if valid (0-5)
 */
export function isValidRating(rating: number): boolean {
  return rating >= 0 && rating <= 5;
}