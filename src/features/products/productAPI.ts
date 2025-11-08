import axios from 'axios';
import type { Product } from '../../types/product.types';

const API_BASE_URL = 'https://fakestoreapi.com';

/**
 * Fetch all products from the API
 */
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

/**
 * Fetch a single product by ID
 */
export const getProductById = async (id: number): Promise<Product> => {
  try {
    const response = await axios.get<Product>(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw new Error(`Failed to fetch product ${id}`);
  }
};

/**
 * Fetch all product categories
 */
export const getCategories = async (): Promise<string[]> => {
  try {
    const response = await axios.get<string[]>(`${API_BASE_URL}/products/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
};

/**
 * Fetch products by category
 */
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(
      `${API_BASE_URL}/products/category/${category}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    throw new Error(`Failed to fetch products for category ${category}`);
  }
};

/**
 * Fetch limited number of products
 */
export const getLimitedProducts = async (limit: number): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(
      `${API_BASE_URL}/products?limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching limited products:', error);
    throw new Error('Failed to fetch limited products');
  }
};

/**
 * Sort products
 */
export const getSortedProducts = async (sort: 'asc' | 'desc'): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(
      `${API_BASE_URL}/products?sort=${sort}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching sorted products:', error);
    throw new Error('Failed to fetch sorted products');
  }
};