import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts, fetchCategories } from '../features/products/productSlice';
import { HeroBanner } from '../components/home/HeroBanner';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { PageLoader } from '../components/ui/Spinner';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, items } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    }
  }, [dispatch, items.length]);

  if (loading && items.length === 0) {
    return <PageLoader />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Section */}
      <section className="container-custom py-8">
        <HeroBanner />
      </section>

      {/* Categories Section */}
      <CategoryGrid />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Value Propositions */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🚚',
                title: 'Free Shipping',
                description: 'On orders over $100',
              },
              {
                icon: '🔒',
                title: 'Secure Payment',
                description: '100% secure transactions',
              },
              {
                icon: '↩️',
                title: 'Easy Returns',
                description: '30-day return policy',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;