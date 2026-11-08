export type CategoryType = 'men' | 'women' | 'accessories' | 'all';

export type ActivityType = 'all' | 'running' | 'training' | 'recovery' | 'track';

export interface ProductColor {
  name: string;
  hex: string;
  bgClass: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  category: 'men' | 'women' | 'accessories';
  activity: ActivityType;
  price: number;
  originalPrice?: number;
  badge?: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  description: string;
  features: string[];
  fabricSpecs: {
    composition: string;
    weight: string;
    compression: 'Light' | 'Medium' | 'High' | 'Graduated' | 'N/A';
    thermalRating: string;
    care: string;
  };
  isNewArrival?: boolean;
  isTrending?: boolean;
}

export interface CartItem {
  id: string; // generated from productId + size + color
  productId: string;
  name: string;
  price: number;
  size: string;
  color: ProductColor;
  image: string;
  quantity: number;
}

export interface FilterState {
  category: CategoryType;
  activity: ActivityType;
  selectedSizes: string[];
  selectedColors: string[];
  priceRange: [number, number];
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  searchQuery: string;
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  shippingInfo: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  timestamp: string;
}
