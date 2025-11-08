import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoTrash, IoCart, IoStar } from 'react-icons/io5';
import type { Product } from '../../../types/product.types';
import { useAppDispatch } from '../../../app/hooks';
import { removeFromWishlist } from '../wishlistSlice';
import { addToCart } from '../../../features/cart/cartSlice';
import { showToast } from '../../../features/ui/uiSlice';
import { Button } from '../../../components/ui/Button';
import { formatPrice } from '../../../utils/formatters';

interface WishlistItemProps {
  product: Product;
}

export const WishlistItem: React.FC<WishlistItemProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    dispatch(removeFromWishlist(product.id));
    dispatch(
      showToast({
        message: 'Removed from wishlist',
        type: 'info',
      })
    );
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    dispatch(removeFromWishlist(product.id));
    dispatch(
      showToast({
        message: 'Moved to cart',
        type: 'success',
      })
    );
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="flex flex-col sm:flex-row gap-4 p-4">
        {/* Product Image */}
        <Link
          to={`/products/${product.id}`}
          className="flex-shrink-0 w-full sm:w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden"
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-2"
          />
        </Link>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <Link
            to={`/products/${product.id}`}
            className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 line-clamp-2 mb-2"
          >
            {product.title}
          </Link>

          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              <IoStar className="text-yellow-500" size={16} />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {product.rating.rate.toFixed(1)}
              </span>
            </div>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
              {product.category}
            </span>
          </div>

          <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            {formatPrice(product.price)}
          </p>
        </div>

        {/* Actions */}
        <div className="flex sm:flex-col gap-2">
          <Button
            onClick={handleAddToCart}
            leftIcon={<IoCart />}
            className="flex-1 sm:flex-initial"
          >
            Add to Cart
          </Button>
          <Button
            variant="outline"
            onClick={handleRemove}
            className="flex-1 sm:flex-initial"
          >
            <IoTrash className="text-red-600" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};