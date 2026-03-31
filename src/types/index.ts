export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  author: string;
  rating: number;
  reviews: number;
  image: string;
  badge: string | null;
  tags: string[];
}

export interface Category {
  id: number;
  name: string;
  count: number;
  icon: string;
}

export interface CartItem {
  productId: number;
  quantity: number;
  product: Product;
}

export interface FeaturedDeal {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  includes: string[];
  image: string;
  endsIn: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface Order {
  id: number;
  items: CartItem[];
  total: number;
  status: string;
  createdAt: string;
}
