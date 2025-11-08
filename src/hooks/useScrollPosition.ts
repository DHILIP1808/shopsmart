import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook to save and restore scroll position
 * Useful for maintaining scroll position when navigating back to a page
 * @param key - Unique key for the page (default: pathname)
 */
export function useScrollPosition(key?: string) {
  const location = useLocation();
  const scrollKey = key || location.pathname;
  const savedPosition = useRef<number>(0);

  // Save scroll position before unmounting
  useEffect(() => {
    const handleScroll = () => {
      savedPosition.current = window.scrollY;
      sessionStorage.setItem(
        `scroll-position-${scrollKey}`,
        String(window.scrollY)
      );
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollKey]);

  // Restore scroll position
  useEffect(() => {
    const saved = sessionStorage.getItem(`scroll-position-${scrollKey}`);
    if (saved) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(saved, 10));
      }, 0);
    }
  }, [scrollKey]);

  // Clear scroll position
  const clearScrollPosition = () => {
    sessionStorage.removeItem(`scroll-position-${scrollKey}`);
  };

  return { clearScrollPosition };
}

/**
 * Hook to scroll to top on route change
 */
export function useScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
}

/**
 * Hook to get current scroll position
 */
export function useCurrentScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
}
