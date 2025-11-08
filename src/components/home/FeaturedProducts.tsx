import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppSelector } from '../../app/hooks';
import { selectFeaturedProducts } from '../../features/products/productSelectors';
import { ProductCard } from '../product/ProductCard';
import { Button } from '../ui/Button';
import type { Product } from '../../types/product.types'; // ✅ Import Product type
 // ✅ Import Product type

export const FeaturedProducts: React.FC = () => {
  const featuredProducts = useAppSelector(selectFeaturedProducts);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Handpicked products with excellent ratings
            </p>
          </div>
          <Link to="/products">
            <Button variant="outline">View All</Button>
          </Link>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featuredProducts.slice(0, 8).map((product: Product) => (
            <motion.div key={product.id} variants={item}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
