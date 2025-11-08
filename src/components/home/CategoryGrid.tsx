import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppSelector } from '../../app/hooks';
import { formatCategoryName } from '../../utils/formatters';

const categoryImages: Record<string, string> = {
  electronics: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600',
  jewelery: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600',
  "men's clothing": 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=600',
  "women's clothing": 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600',
};

export const CategoryGrid: React.FC = () => {
  const categories = useAppSelector((state) => state.products.categories);

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
    <section className="py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our curated collections and find exactly what you're looking for
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category: string) => (
            <motion.div key={category} variants={item}>
              <Link to={`/products?category=${encodeURIComponent(category)}`}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group relative h-80 rounded-2xl overflow-hidden shadow-lg"
                >
                  {/* Image */}
                  <img
                    src={categoryImages[category] || categoryImages.electronics}
                    alt={category}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 flex items-end p-6">
                    <div className="text-white">
                      <h3 className="text-2xl font-bold mb-2">
                        {formatCategoryName(category)}
                      </h3>
                      <p className="text-sm opacity-90 group-hover:opacity-100 transition-opacity">
                        Explore Collection →
                      </p>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-primary-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};