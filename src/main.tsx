import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './styles/index.css';

// CRITICAL: Initialize theme BEFORE React renders to prevent flash
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('shopsmart_theme');
  const root = document.documentElement;
  
  if (savedTheme === 'dark') {
    console.log('Applying dark theme from localStorage');
    root.classList.add('dark');
  } else if (savedTheme === 'light') {
    console.log('Applying light theme from localStorage');
    root.classList.remove('dark');
  } else {
    // Use system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    console.log('No saved theme. System prefers:', prefersDark ? 'dark' : 'light');
    
    if (prefersDark) {
      root.classList.add('dark');
      localStorage.setItem('shopsmart_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('shopsmart_theme', 'light');
    }
  }
};

// Apply theme immediately
initializeTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);