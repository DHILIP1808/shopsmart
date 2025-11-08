import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { PageLoader } from '../components/ui/Spinner';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('../pages/HomePage'));
const ProductListingPage = lazy(() => import('../pages/ProductListingPage'));
const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage'));
const CartPage = lazy(() => import('../pages/CartPage'));
const WishlistPage = lazy(() => import('../pages/WishlistPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

// Loading fallback component
// eslint-disable-next-line react-refresh/only-export-components
const SuspenseLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={<PageLoader />}>{children}</Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <SuspenseLoader>
            <HomePage />
          </SuspenseLoader>
        ),
      },
      {
        path: 'products',
        element: (
          <SuspenseLoader>
            <ProductListingPage />
          </SuspenseLoader>
        ),
      },
      {
        path: 'products/:id',
        element: (
          <SuspenseLoader>
            <ProductDetailPage />
          </SuspenseLoader>
        ),
      },
      {
        path: 'cart',
        element: (
          <SuspenseLoader>
            <CartPage />
          </SuspenseLoader>
        ),
      },
      {
        path: 'wishlist',
        element: (
          <SuspenseLoader>
            <WishlistPage />
          </SuspenseLoader>
        ),
      },
      {
        path: '404',
        element: (
          <SuspenseLoader>
            <NotFoundPage />
          </SuspenseLoader>
        ),
      },
      {
        path: '*',
        element: <Navigate to="/404" replace />,
      },
    ],
  },
]);