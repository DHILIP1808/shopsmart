// Product types from FakeStore API
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductFilters {
  category: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  minRating: number | null;
  searchQuery: string;
}

export interface ProductSort {
  sortBy: 'price' | 'rating' | 'name' | null;
  order: 'asc' | 'desc';
}

export interface ProductState {
  items: Product[];
  filteredItems: Product[];
  loading: boolean;
  error: string | null;
  filters: ProductFilters;
  sort: ProductSort;
  categories: string[];
  selectedCategory: string | null;
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
  };
}