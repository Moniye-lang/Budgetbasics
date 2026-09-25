export interface ProductColorway {
  name: string;
  hex: string;
  accent: string;
  image: string;
  tag: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'headphones' | 'dacs' | 'mics' | 'cables';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  colorways: ProductColorway[];
  specs: {
    driver?: string;
    frequency?: string;
    impedance?: string;
    thd?: string;
    weight?: string;
    latency?: string;
  };
  inStock: boolean;
  isNew?: boolean;
}

export interface CartItem {
  product: Product;
  selectedColorway: ProductColorway;
  quantity: number;
  addedAt: number; // timestamp
}
