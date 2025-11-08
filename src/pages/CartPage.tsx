import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCart } from 'react-icons/io5';
import { useAppSelector } from '../app/hooks';
import { CartItem } from '../features/cart/components/CartItem';
import { CartSummary } from '../features/cart/components/CartSummary';
import { Button } from '../components/ui/Button';

const CartPage: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);

  if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center"
      >
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
            <IoCart className="text-gray-400" size={48} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Add some products to get started
          </p>
          <Link to="/products">
            <Button size="lg">Continue Shopping</Button>
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
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {/* Cart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cartItems.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </AnimatePresence>

            {/* Continue Shopping */}
            <Link to="/products">
              <Button variant="outline" fullWidth>
                Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Cart Summary */}
          <div>
            <CartSummary />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartPage;