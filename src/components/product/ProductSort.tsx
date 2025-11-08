import React from 'react';
import { IoSwapVertical } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setSort } from '../../features/products/productSlice';
import { SORT_OPTIONS } from '../../utils/constants';

type SortBy = typeof SORT_OPTIONS[number]['sortBy'];
type SortOrder = typeof SORT_OPTIONS[number]['order'];

export const ProductSort: React.FC = () => {
  const dispatch = useAppDispatch();
  const sort = useAppSelector((state) => state.products.sort);

  const currentSortValue = `${sort.sortBy}-${sort.order}`;

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (value === 'default') {
      dispatch(setSort({ sortBy: null, order: 'asc' }));
      return;
    }

    const option = SORT_OPTIONS.find((opt) => opt.value === value);

    if (option) {
      dispatch(
        setSort({
          sortBy: option.sortBy as SortBy,
          order: option.order as SortOrder,
        })
      );
    }
  };

  return (
    <div className="relative">
      <label className="sr-only" htmlFor="sort-select">
        Sort products
      </label>
      <div className="relative">
        <IoSwapVertical
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          size={20}
        />
        <select
          id="sort-select"
          value={sort.sortBy ? currentSortValue : 'default'}
          onChange={handleSortChange}
          className="pl-10 pr-10 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 cursor-pointer appearance-none"
        >
          <option value="default">Default</option>
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Dropdown Arrow */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};
