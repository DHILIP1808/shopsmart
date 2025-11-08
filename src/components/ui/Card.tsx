import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverable = false,
  onClick,
}) => {
  const Component = hoverable ? motion.div : 'div';
  
  return (
    <Component
      className={clsx(
        'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden',
        hoverable && 'cursor-pointer transition-shadow duration-200',
        className
      )}
      onClick={onClick}
      {...(hoverable && {
        whileHover: { y: -4, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' },
        transition: { duration: 0.2 },
      })}
    >
      {children}
    </Component>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={clsx('px-6 py-4 border-b border-gray-200 dark:border-gray-700', className)}>
    {children}
  </div>
);

export const CardBody: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={clsx('px-6 py-4', className)}>
    {children}
  </div>
);

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={clsx('px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700', className)}>
    {children}
  </div>
);