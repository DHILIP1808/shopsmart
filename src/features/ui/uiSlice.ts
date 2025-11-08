import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

export interface UIState {
  theme: 'light' | 'dark';
  toasts: Toast[];
  sidebarOpen: boolean;
}

const THEME_STORAGE_KEY = 'shopsmart_theme';

// Load theme from localStorage
const loadThemeFromStorage = (): 'light' | 'dark' => {
  try {
    const theme = localStorage.getItem(THEME_STORAGE_KEY);
    if (theme === 'dark' || theme === 'light') {
      return theme;
    }
  } catch (error) {
    console.error('Failed to load theme from localStorage:', error);
  }
  // Default to system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const initialState: UIState = {
  theme: loadThemeFromStorage(),
  toasts: [],
  sidebarOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem(THEME_STORAGE_KEY, state.theme);
      
      // Apply theme to document
      if (state.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      localStorage.setItem(THEME_STORAGE_KEY, state.theme);
      
      if (state.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    showToast: (
      state,
      action: PayloadAction<Omit<Toast, 'id'>>
    ) => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      state.toasts.push({
        id,
        ...action.payload,
        duration: action.payload.duration || 3000,
      });
    },
    hideToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload
      );
    },
    clearToasts: (state) => {
      state.toasts = [];
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  showToast,
  hideToast,
  clearToasts,
  toggleSidebar,
  setSidebarOpen,
} = uiSlice.actions;

export default uiSlice.reducer;