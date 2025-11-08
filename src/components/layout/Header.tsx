import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoCart, IoHeart, IoSearch, IoMenu, IoClose } from 'react-icons/io5';
import { useAppSelector } from '../../app/hooks';
import { selectCartItemCount } from '../../features/cart/cartSelectors';
import { CountBadge } from '../../components/ui/Badge';
import { ThemeToggle } from '../../features/ui/components/ThemeToggle';
import { Input } from '../../components/ui/Input';
import { useDebounce } from '../../hooks/useDebounce';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const cartItemCount = useAppSelector(selectCartItemCount);
  const wishlistCount = useAppSelector((state) => state.wishlist.items.length);
  const categories = useAppSelector((state) => state.products.categories);

  const debouncedSearch = useDebounce(searchQuery, 500);

  React.useEffect(() => {
    if (debouncedSearch.trim().length >= 2) {
      navigate(`/products?search=${encodeURIComponent(debouncedSearch)}`);
      setIsSearchOpen(false);
    }
  }, [debouncedSearch, navigate]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'All Products' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container-custom">
        {/* Main Header */}
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold text-gradient">ShopSmart</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">
                {link.label}
              </Link>
            ))}

            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">
                Categories
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {categories.map((category: string) => (
                  <Link
                    key={category}
                    to={`/products?category=${encodeURIComponent(category)}`}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg capitalize"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="Search"
            >
              <IoSearch size={24} />
            </motion.button>

            <Link to="/wishlist" className="relative">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <IoHeart size={24} />
                <CountBadge count={wishlistCount} />
              </motion.div>
            </Link>

            <Link to="/cart" className="relative">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <IoCart size={24} />
                <CountBadge count={cartItemCount} />
              </motion.div>
            </Link>

            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 dark:text-gray-300"
              aria-label="Toggle menu">
              {isMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} className="pb-4">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<IoSearch className="text-gray-400" />}
              autoFocus
            />
          </motion.div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                  {link.label}
                </Link>
              ))}

              <div className="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium">
                Categories
              </div>

              {categories.map((category: string) => (
                <Link
                  key={category}
                  to={`/products?category=${encodeURIComponent(category)}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="pl-8 pr-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg capitalize"
                >
                  {category}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </div>
    </header>
  );
};
