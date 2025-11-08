import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoHeart, IoHeartOutline, IoCart, IoStar } from 'react-icons/io5';
import type { Product } from '../../types/product.types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToCart } from '../../features/cart/cartSlice';
import { toggleWishlist } from '../../features/wishlist/wishlistSlice';
import { showToast } from '../../features/ui/uiSlice';
import { Button } from '../../components/ui/Button';
import { formatPrice, truncateText } from '../../utils/formatters';
import { Card } from '../../components/ui/Card';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(({ product }) => {
  const dispatch = useAppDispatch();
  const isInWishlist = useAppSelector((state) =>
    state.wishlist.items.some((item) => item.id === product.id)
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart(product));
    dispatch(
      showToast({
        message: `${product.title} added to cart`,
        type: 'success',
      })
    );
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(toggleWishlist(product));
    dispatch(
      showToast({
        message: isInWishlist
          ? `Removed from wishlist`
          : `Added to wishlist`,
        type: isInWishlist ? 'info' : 'success',
      })
    );
  };

  return (
    <Link to={`/products/${product.id}`}>
      <Card hoverable className="h-full flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
          <motion.img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />

          {/* Wishlist Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleToggleWishlist}
            className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md"
            aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {isInWishlist ? (
              <IoHeart className="text-red-500" size={20} />
            ) : (
              <IoHeartOutline className="text-gray-600 dark:text-gray-400" size={20} />
            )}
          </motion.button>

          {/* Rating Badge */}
          <div className="absolute top-3 left-3 px-2 py-1 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center gap-1">
            <IoStar className="text-yellow-500" size={14} />
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {product.rating.rate.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          {/* Category */}
          <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
            {product.category}
          </span>

          {/* Title */}
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 min-h-[3rem]">
            {truncateText(product.title, 60)}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 flex-1">
            {truncateText(product.description, 80)}
          </p>

          {/* Price and Action */}
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {formatPrice(product.price)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {product.rating.count} reviews
              </p>
            </div>

            <Button
              size="sm"
              onClick={handleAddToCart}
              leftIcon={<IoCart size={18} />}
              className="whitespace-nowrap"
            >
              Add
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
});

ProductCard.displayName = 'ProductCard';