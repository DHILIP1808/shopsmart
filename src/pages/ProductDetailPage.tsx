import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoCart, IoHeart, IoHeartOutline, IoStar, IoArrowBack } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addToCart } from '../features/cart/cartSlice';
import { toggleWishlist } from '../features/wishlist/wishlistSlice';
import { showToast } from '../features/ui/uiSlice';
import { selectProductById } from '../features/products/productSelectors';
import { ImageGallery } from '../components/product/ImageGallery';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ProductDetailSkeleton } from '../components/ui/Skeleton';
import { formatPrice, formatCategoryName } from '../utils/formatters';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);

  const product = useAppSelector((state) =>
    selectProductById(Number(id))(state)
  );
  const isInWishlist = useAppSelector((state) =>
    state.wishlist.items.some((item) => item.id === Number(id))
  );

  useEffect(() => {
    if (!product) {
      // In production, fetch single product if not in state
      navigate('/404');
    }
  }, [product, navigate]);

  if (!product) {
    return <ProductDetailSkeleton />;
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    dispatch(
      showToast({
        message: `${quantity} ${quantity > 1 ? 'items' : 'item'} added to cart`,
        type: 'success',
      })
    );
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product));
    dispatch(
      showToast({
        message: isInWishlist ? 'Removed from wishlist' : 'Added to wishlist',
        type: isInWishlist ? 'info' : 'success',
      })
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white dark:bg-gray-900"
    >
      <div className="container-custom py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          leftIcon={<IoArrowBack />}
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          Back
        </Button>

        {/* Product Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ImageGallery images={[product.image]} alt={product.title} />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Category Badge */}
            <Badge variant="primary" size="sm">
              {formatCategoryName(product.category)}
            </Badge>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IoStar
                    key={i}
                    className={
                      i < Math.floor(product.rating.rate)
                        ? 'text-yellow-500'
                        : 'text-gray-300 dark:text-gray-600'
                    }
                    size={20}
                  />
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-400">
                {product.rating.rate.toFixed(1)} ({product.rating.count} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="py-4 border-y border-gray-200 dark:border-gray-700">
              <p className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                {formatPrice(product.price)}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Inclusive of all taxes
              </p>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Description
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium text-gray-900 dark:text-gray-100">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.min(99, quantity + 1))}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                size="lg"
                onClick={handleAddToCart}
                leftIcon={<IoCart size={20} />}
                className="flex-1"
              >
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleToggleWishlist}
                className="px-6"
              >
                {isInWishlist ? (
                  <IoHeart className="text-red-500" size={24} />
                ) : (
                  <IoHeartOutline size={24} />
                )}
              </Button>
            </div>

            {/* Features */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <span className="text-green-500">✓</span>
                  Free shipping on orders over $100
                </li>
                <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <span className="text-green-500">✓</span>
                  Easy 30-day returns
                </li>
                <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <span className="text-green-500">✓</span>
                  Secure payment options
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetailPage;