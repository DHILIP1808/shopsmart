import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoFilter, IoClose } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts, setSearchQuery, setCategory } from '../features/products/productSlice';
import { selectPaginatedProducts } from '../features/products/productSelectors';
import { ProductGrid } from '../components/product/ProductGrid';
import { ProductFilters } from '../components/product/ProductFilters';
import { ProductSort } from '../components/product/ProductSort';
import { ProductGridSkeleton } from '../components/ui/Skeleton';
import { Button } from '../components/ui/Button';

const ProductListingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { loading, filteredItems, pagination } = useAppSelector((state) => state.products);
  const paginatedProducts = useAppSelector(selectPaginatedProducts);

  // Handle URL params
  useEffect(() => {
    const search = searchParams.get('search');
    const category = searchParams.get('category');

    if (search) {
      dispatch(setSearchQuery(search));
    }
    if (category) {
      dispatch(setCategory(category));
    }
  }, [searchParams, dispatch]);

  // Fetch products on mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white dark:bg-gray-900"
    >
      <div className="container-custom py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            All Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredItems.length} products
          </p>
        </div>

        <div className="flex gap-6">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block flex-shrink-0">
            <div className="sticky top-24">
              <ProductFilters />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 gap-4">
              {/* Mobile Filter Button */}
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(true)}
                leftIcon={<IoFilter />}
                className="lg:hidden"
              >
                Filters
              </Button>

              {/* Sort */}
              <div className="ml-auto">
                <ProductSort />
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <ProductGridSkeleton count={8} />
            ) : (
              <ProductGrid products={paginatedProducts} />
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => dispatch({ type: 'products/setCurrentPage', payload: pagination.currentPage - 1 })}
                    disabled={pagination.currentPage === 1}
                  >
                    Previous
                  </Button>

                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={page === pagination.currentPage ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => dispatch({ type: 'products/setCurrentPage', payload: page })}
                    >
                      {page}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => dispatch({ type: 'products/setCurrentPage', payload: pagination.currentPage + 1 })}
                    disabled={pagination.currentPage === pagination.totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsFilterOpen(false)}
          />
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            className="absolute left-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-900 shadow-xl overflow-y-auto"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Filters
              </h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <IoClose size={24} />
              </button>
            </div>
            <ProductFilters onClose={() => setIsFilterOpen(false)} />
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default ProductListingPage;