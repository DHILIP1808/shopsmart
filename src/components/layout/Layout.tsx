import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ToastContainer } from '../../features/ui/components/Toast';
import { useAppDispatch } from '../../app/hooks';
import { setTheme } from '../../features/ui/uiSlice';
import { fetchProducts, fetchCategories } from '../../features/products/productSlice';

export const Layout: React.FC = () => {
  const dispatch = useAppDispatch();

  // Initialize theme and data on mount
  useEffect(() => {
    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem('shopsmart_theme');
    
    if (savedTheme === 'dark' || savedTheme === 'light') {
      console.log('Loading saved theme from localStorage:', savedTheme);
      dispatch(setTheme(savedTheme));
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const systemTheme = prefersDark ? 'dark' : 'light';
      console.log('No saved theme. Using system preference:', systemTheme);
      dispatch(setTheme(systemTheme));
    }

    // Fetch initial data
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};