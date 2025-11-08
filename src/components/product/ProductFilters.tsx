import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setFilters, clearFilters, setCategory } from '../../features/products/productSlice';
import { selectPriceRange } from '../../features/products/productSelectors';
import { Button } from '../../components/ui/Button';
import { formatCategoryName } from '../../utils/formatters';

interface ProductFiltersProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  isOpen = true,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.products.categories);
  const filters = useAppSelector((state) => state.products.filters);
  const selectedCategory = useAppSelector((state) => state.products.selectedCategory);
  const priceRange = useAppSelector(selectPriceRange);

  const [localMinPrice, setLocalMinPrice] = useState(filters.minPrice || priceRange.min);
  const [localMaxPrice, setLocalMaxPrice] = useState(filters.maxPrice || priceRange.max);

  const handleCategoryChange = (category: string | null) => {
    dispatch(setCategory(category));
  };

  const handlePriceChange = () => {
    dispatch(
      setFilters({
        minPrice: localMinPrice,
        maxPrice: localMaxPrice,
      })
    );
  };

  const handleRatingChange = (rating: number | null) => {
    dispatch(setFilters({ minRating: rating }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    setLocalMinPrice(priceRange.min);
    setLocalMaxPrice(priceRange.max);
  };

  const hasActiveFilters =
    selectedCategory ||
    filters.minPrice !== null ||
    filters.maxPrice !== null ||
    filters.minRating !== null;

  return (
    <motion.div
      initial={false}
      animate={{ x: isOpen ? 0 : -320 }}
      className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 overflow-y-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Filters
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <IoClose size={24} />
          </button>
        )}
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearFilters}
          fullWidth
          className="mb-4"
        >
          Clear All Filters
        </Button>
      )}

      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Categories
        </h3>
        <div className="space-y-2">
          <button
            onClick={() => handleCategoryChange(null)}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              selectedCategory === null
                ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            All Categories
          </button>
          {categories.map((category: string) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {formatCategoryName(category)}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Price Range
        </h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-600 dark:text-gray-400 mb-1 block">
              Min Price: ${localMinPrice}
            </label>
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              value={localMinPrice}
              onChange={(e) => setLocalMinPrice(Number(e.target.value))}
              onMouseUp={handlePriceChange}
              onTouchEnd={handlePriceChange}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600 dark:text-gray-400 mb-1 block">
              Max Price: ${localMaxPrice}
            </label>
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              value={localMaxPrice}
              onChange={(e) => setLocalMaxPrice(Number(e.target.value))}
              onMouseUp={handlePriceChange}
              onTouchEnd={handlePriceChange}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Minimum Rating
        </h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() =>
                handleRatingChange(filters.minRating === rating ? null : rating)
              }
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                filters.minRating === rating
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className="flex items-center">
                {Array.from({ length: rating }).map((_, i) => (
                  <span key={i} className="text-yellow-500">★</span>
                ))}
              </span>
              <span>& Up</span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
