import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  pill?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  pill = false,
  className,
}) => {
  const variants = {
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300',
    secondary: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/30 dark:text-secondary-300',
    success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={clsx(
        'inline-flex items-center font-medium',
        pill ? 'rounded-full' : 'rounded',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </motion.span>
  );
};

// Count Badge for Cart/Wishlist
interface CountBadgeProps {
  count: number;
  className?: string;
  max?: number;
}

export const CountBadge: React.FC<CountBadgeProps> = ({ count, max = 99, className }) => {
  if (count === 0) return null;

  const displayCount = count > max ? `${max}+` : count;

  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={clsx(
        'absolute -top-2 -right-2 inline-flex items-center justify-center',
        'px-2 py-1 text-xs font-bold leading-none text-white',
        'bg-red-600 rounded-full min-w-[1.25rem]',
        className
      )}
    >
      {displayCount}
    </motion.span>
  );
};