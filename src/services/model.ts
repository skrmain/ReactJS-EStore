export interface User {
  _id?: string;
  name: string;
  email: string;
  storeId?: string;
  mobileNo?: string;
  gender?: string;
  country?: string;
  city?: string;
}

export interface RegisterResponse {
  data?: {
    user: User;
  };
  error: string;
  errors?: [];
  status: string;
  message: string;
}

export interface LoginResponse {
  data?: {
    user: User;
    token: string;
  };
  error: string;
  errors?: [];
  status: string;
  message: string;
}

export interface UserResponse {
  data?: {
    user: User;
  };
  error: string;
  errors?: [];
  status: string;
  message: string;
}

export interface Product {
  _id?: string;
  name: string;
  brand: string;
  price: string;
  category: string;
  image: string;
  description: string;
  quantity?: number;
}

export interface ProductsResponse {
  data?: { products: Product[] };
  error: string;
  errors?: [];
  message: string;
  status: string;
}

export interface ResponseType {
  data?: any;
  error: string;
  errors?: [];
  message: string;
  status: string;
}

export interface CartProduct {
  product: Product;
  quantity: number;
}

interface CartType {
  products: CartProduct[];
  user: User;
}

export interface CartProductResponse {
  data?: { cart: CartType | null };
  error: string;
  errors?: [];
  message: string;
  status: string;
}
