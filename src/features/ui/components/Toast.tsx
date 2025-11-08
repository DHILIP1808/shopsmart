import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCheckmarkCircle, IoCloseCircle, IoInformationCircle, IoWarning, IoClose } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { hideToast } from '../uiSlice';
import type { Toast as ToastType } from '../uiSlice';

const Toast: React.FC<{ toast: ToastType }> = ({ toast }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(hideToast(toast.id));
    }, toast.duration || 3000);

    return () => clearTimeout(timer);
  }, [toast, dispatch]);

  const icons = {
    success: <IoCheckmarkCircle className="text-green-500" size={24} />,
    error: <IoCloseCircle className="text-red-500" size={24} />,
    warning: <IoWarning className="text-yellow-500" size={24} />,
    info: <IoInformationCircle className="text-blue-500" size={24} />,
  };

  const backgrounds = {
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      className={`flex items-center gap-3 p-4 rounded-lg border shadow-lg min-w-[300px] max-w-md ${backgrounds[toast.type]}`}
    >
      {icons[toast.type]}
      <p className="flex-1 text-sm font-medium text-gray-900 dark:text-gray-100">
        {toast.message}
      </p>
      <button
        onClick={() => dispatch(hideToast(toast.id))}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
      >
        <IoClose size={20} />
      </button>
    </motion.div>
  );
};

export const ToastContainer: React.FC = () => {
  const toasts = useAppSelector((state) => state.ui.toasts);

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
};