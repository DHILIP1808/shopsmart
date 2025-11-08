import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IoHeart } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { clearWishlist } from '../features/wishlist/wishlistSlice';
import { WishlistItem } from '../features/wishlist/components/WishlistItem';
import { Button } from '../components/ui/Button';
import { showToast } from '../features/ui/uiSlice';

const WishlistPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
    dispatch(
      showToast({
        message: 'Wishlist cleared',
        type: 'info',
      })
    );
  };

  if (wishlistItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center"
      >
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
            <IoHeart className="text-gray-400" size={48} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Save items you love for later
          </p>
          <Link to="/products">
            <Button size="lg">Explore Products</Button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      <div className="container-custom py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              My Wishlist
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          {wishlistItems.length > 0 && (
            <Button variant="outline" onClick={handleClearWishlist}>
              Clear All
            </Button>
          )}
        </div>

        {/* Wishlist Items */}
        <div className="space-y-4">
          <AnimatePresence>
            {wishlistItems.map((product) => (
              <WishlistItem key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </div>

        {/* Continue Shopping */}
        <div className="mt-8">
          <Link to="/products">
            <Button variant="outline" fullWidth>
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default WishlistPage;