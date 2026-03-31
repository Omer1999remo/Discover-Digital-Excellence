import { useState, useEffect, useCallback } from 'react';
import type { Product, Category, FeaturedDeal } from '@/types';

const API_URL = 'http://localhost:3001/api';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredDeal, setFeaturedDeal] = useState<FeaturedDeal | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async (filters?: { category?: string; search?: string; sort?: string }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams();
      if (filters?.category && filters.category !== 'All') params.append('category', filters.category);
      if (filters?.search) params.append('search', filters.search);
      if (filters?.sort) params.append('sort', filters.sort);
      
      const response = await fetch(`${API_URL}/products?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/categories`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  }, []);

  const fetchFeaturedDeal = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/featured-deal`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch featured deal');
      }
      
      const data = await response.json();
      setFeaturedDeal(data);
    } catch (err) {
      console.error('Error fetching featured deal:', err);
    }
  }, []);

  const getProduct = useCallback(async (id: number): Promise<Product | null> => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`);
      
      if (!response.ok) {
        return null;
      }
      
      return await response.json();
    } catch (err) {
      console.error('Error fetching product:', err);
      return null;
    }
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchFeaturedDeal();
  }, [fetchCategories, fetchFeaturedDeal]);

  return {
    products,
    categories,
    featuredDeal,
    isLoading,
    error,
    fetchProducts,
    fetchCategories,
    fetchFeaturedDeal,
    getProduct,
  };
}
