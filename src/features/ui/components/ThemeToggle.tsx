import React from 'react';
import { motion } from 'framer-motion';
import { IoSunny, IoMoon } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { toggleTheme } from '../uiSlice';

export const ThemeToggle: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.ui.theme);

  const isDark = theme === 'dark';

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => dispatch(toggleTheme())}
      className="relative p-2 rounded-lg bg-gray-200 dark:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 180 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <IoMoon className="text-yellow-400" size={20} />
        ) : (
          <IoSunny className="text-yellow-500" size={20} />
        )}
      </motion.div>
    </motion.button>
  );
};