import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoTrash, IoAdd, IoRemove } from 'react-icons/io5';
import type { CartItem as CartItemType } from '../../../types/cart.types';
import { useAppDispatch } from '../../../app/hooks';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../cartSlice';
import { showToast } from '../../../features/ui/uiSlice';
import { Button } from '../../../components/ui/Button';
import { formatPrice } from '../../../utils/formatters';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  const handleIncrement = () => {
    dispatch(incrementQuantity(item.product.id));
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(decrementQuantity(item.product.id));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.product.id));
    dispatch(
      showToast({
        message: 'Item removed from cart',
        type: 'info',
      })
    );
  };

  const itemTotal = item.product.price * item.quantity;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      {/* Product Image */}
      <Link
        to={`/products/${item.product.id}`}
        className="flex-shrink-0 w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden"
      >
        <img
          src={item.product.image}
          alt={item.product.title}
          className="w-full h-full object-contain p-2"
        />
      </Link>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <Link
          to={`/products/${item.product.id}`}
          className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 line-clamp-2"
        >
          {item.product.title}
        </Link>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 capitalize">
          {item.product.category}
        </p>
        <p className="text-xl font-bold text-primary-600 dark:text-primary-400 mt-2">
          {formatPrice(item.product.price)}
        </p>
      </div>

      {/* Quantity & Actions */}
      <div className="flex flex-col items-end justify-between">
        {/* Quantity Controls */}
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={handleDecrement}
            className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 disabled:opacity-50"
            disabled={item.quantity <= 1}
          >
            <IoRemove size={16} />
          </button>
          <span className="w-8 text-center font-medium text-gray-900 dark:text-gray-100">
            {item.quantity}
          </span>
          <button
            onClick={handleIncrement}
            className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <IoAdd size={16} />
          </button>
        </div>

        {/* Item Total & Remove */}
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {formatPrice(itemTotal)}
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            leftIcon={<IoTrash />}
            className="text-red-600 hover:text-red-700 mt-2"
          >
            Remove
          </Button>
        </div>
      </div>
    </motion.div>
  );
};