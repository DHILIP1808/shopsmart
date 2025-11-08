import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoHome, IoArrowBack } from 'react-icons/io5';
import { Button } from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        {/* 404 Illustration */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="mb-8"
        >
          <div className="text-9xl font-bold text-gradient mb-4">404</div>
          <div className="text-6xl mb-4">🔍</div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/">
            <Button size="lg" leftIcon={<IoHome />}>
              Go Home
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            leftIcon={<IoArrowBack />}
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            You might be interested in:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/products"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              All Products
            </Link>
            <Link
              to="/cart"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              Shopping Cart
            </Link>
            <Link
              to="/wishlist"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              Wishlist
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;