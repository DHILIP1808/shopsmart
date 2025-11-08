import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Product, ProductState, ProductFilters, ProductSort } from '../../types/product.types';

const API_BASE_URL = 'https://fakestoreapi.com';

// Async thunks for API calls
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get<Product[]>(`${API_BASE_URL}/products`);
    return response.data;
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const response = await axios.get<string[]>(`${API_BASE_URL}/products/categories`);
    return response.data;
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (category: string) => {
    const response = await axios.get<Product[]>(`${API_BASE_URL}/products/category/${category}`);
    return response.data;
  }
);

const initialState: ProductState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
  filters: {
    category: null,
    minPrice: null,
    maxPrice: null,
    minRating: null,
    searchQuery: '',
  },
  sort: {
    sortBy: null,
    order: 'asc',
  },
  categories: [],
  selectedCategory: null,
  pagination: {
    currentPage: 1,
    itemsPerPage: 12,
    totalPages: 1,
  },
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<ProductFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.currentPage = 1; // Reset to first page on filter change
      applyFiltersAndSort(state);
    },
    setSort: (state, action: PayloadAction<ProductSort>) => {
      state.sort = action.payload;
      applyFiltersAndSort(state);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.searchQuery = action.payload;
      state.pagination.currentPage = 1;
      applyFiltersAndSort(state);
    },
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
      state.filters.category = action.payload;
      state.pagination.currentPage = 1;
      applyFiltersAndSort(state);
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.sort = initialState.sort;
      state.selectedCategory = null;
      state.pagination.currentPage = 1;
      applyFiltersAndSort(state);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        applyFiltersAndSort(state);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      // Fetch categories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      // Fetch products by category
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        applyFiltersAndSort(state);
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

// Helper function to apply filters and sorting
function applyFiltersAndSort(state: ProductState) {
  let filtered = [...state.items];

  // Apply search filter
  if (state.filters.searchQuery) {
    const query = state.filters.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
  }

  // Apply category filter
  if (state.filters.category) {
    filtered = filtered.filter(
      (product) => product.category === state.filters.category
    );
  }

  // Apply price filter
  if (state.filters.minPrice !== null) {
    filtered = filtered.filter(
      (product) => product.price >= state.filters.minPrice!
    );
  }
  if (state.filters.maxPrice !== null) {
    filtered = filtered.filter(
      (product) => product.price <= state.filters.maxPrice!
    );
  }

  // Apply rating filter
  if (state.filters.minRating !== null) {
    filtered = filtered.filter(
      (product) => product.rating.rate >= state.filters.minRating!
    );
  }

  // Apply sorting
  if (state.sort.sortBy) {
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (state.sort.sortBy) {
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'rating':
          comparison = a.rating.rate - b.rating.rate;
          break;
        case 'name':
          comparison = a.title.localeCompare(b.title);
          break;
      }

      return state.sort.order === 'asc' ? comparison : -comparison;
    });
  }

  state.filteredItems = filtered;
  state.pagination.totalPages = Math.ceil(
    filtered.length / state.pagination.itemsPerPage
  );
}

export const {
  setFilters,
  setSort,
  setSearchQuery,
  setCategory,
  setCurrentPage,
  clearFilters,
} = productSlice.actions;

export default productSlice.reducer;