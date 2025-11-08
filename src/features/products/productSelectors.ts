import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { Product } from '../../types/product.types';

// Base selectors
export const selectAllProducts = (state: RootState): Product[] =>
  state.products.items;

export const selectFilteredProducts = (state: RootState): Product[] =>
  state.products.filteredItems;

export const selectProductsLoading = (state: RootState): boolean =>
  state.products.loading;

export const selectProductsError = (state: RootState): string | null =>
  state.products.error;

export const selectCategories = (state: RootState): string[] =>
  state.products.categories;

export const selectFilters = (state: RootState) =>
  state.products.filters;

export const selectPagination = (state: RootState) =>
  state.products.pagination;

// ✅ Paginated Products
export const selectPaginatedProducts = createSelector(
  [selectFilteredProducts, selectPagination],
  (products: Product[], pagination) => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return products.slice(startIndex, endIndex);
  }
);

// ✅ Product by ID
export const selectProductById = (productId: number) =>
  createSelector([selectAllProducts], (products: Product[]) =>
    products.find((product: Product) => product.id === productId)
  );

// ✅ Featured Products
export const selectFeaturedProducts = createSelector(
  [selectAllProducts],
  (products: Product[]) =>
    products
      .filter((product: Product) => product.rating.rate >= 4.0)
      .slice(0, 8)
);

// ✅ Price Range
export const selectPriceRange = createSelector(
  [selectAllProducts],
  (products: Product[]) => {
    if (products.length === 0) return { min: 0, max: 0 };

    const prices = products.map((p: Product) => p.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    };
  }
);
