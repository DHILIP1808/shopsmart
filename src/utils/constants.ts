// API Configuration
export const API_BASE_URL = 'https://fakestoreapi.com';

// App Configuration
export const APP_NAME = 'ShopSmart';
export const APP_DESCRIPTION = 'Your one-stop shop for quality products';

// Pagination
export const DEFAULT_PAGE_SIZE = 12;
export const PAGE_SIZE_OPTIONS = [8, 12, 16, 24];

// Pricing
export const TAX_RATE = 0.08; // 8%
export const FREE_SHIPPING_THRESHOLD = 100;
export const STANDARD_SHIPPING_COST = 10;

// Search
export const SEARCH_DEBOUNCE_DELAY = 500; // milliseconds
export const MIN_SEARCH_LENGTH = 2;

// Promo Codes (for demo purposes)
export const PROMO_CODES: Record<string, number> = {
  SAVE10: 10,
  SAVE20: 20,
  WELCOME15: 15,
  NEWYEAR25: 25,
};

// Rating
export const MIN_RATING = 0;
export const MAX_RATING = 5;
export const FEATURED_PRODUCT_MIN_RATING = 4.0;

// Cart
export const MAX_CART_QUANTITY = 99;

// Toast Duration
export const TOAST_DURATION = 3000; // milliseconds

// Product Categories (from FakeStore API)
export const CATEGORIES = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing"
];

// Sort Options
export const SORT_OPTIONS = [
  { value: 'price-asc', label: 'Price: Low to High', sortBy: 'price', order: 'asc' },
  { value: 'price-desc', label: 'Price: High to Low', sortBy: 'price', order: 'desc' },
  { value: 'rating-desc', label: 'Rating: High to Low', sortBy: 'rating', order: 'desc' },
  { value: 'rating-asc', label: 'Rating: Low to High', sortBy: 'rating', order: 'asc' },
  { value: 'name-asc', label: 'Name: A to Z', sortBy: 'name', order: 'asc' },
  { value: 'name-desc', label: 'Name: Z to A', sortBy: 'name', order: 'desc' },
] as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  CART: 'shopsmart_cart',
  WISHLIST: 'shopsmart_wishlist',
  THEME: 'shopsmart_theme',
  RECENTLY_VIEWED: 'shopsmart_recently_viewed',
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  CART: '/cart',
  WISHLIST: '/wishlist',
  CATEGORY: '/category/:category',
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Animation Durations
export const ANIMATION_DURATION = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
} as const;