import { get, post } from "./base";
import { LoginValues, RegisterValues } from "../types";
import {
  CartProductResponse,
  LoginResponse,
  ProductsResponse,
  RegisterResponse,
  UserResponse,
  ResponseType,
} from "./model";

export const registerUserAPI = (
  registerData: RegisterValues
): Promise<RegisterResponse> => {
  return post("/user/register", registerData);
};

export const loginAPI = (loginData: LoginValues): Promise<LoginResponse> => {
  return post("/user/login", loginData);
};

export const getUserDetailAPI = (): Promise<UserResponse> => {
  return get("/user");
};

export const getProductsAPI = (): Promise<ProductsResponse> => {
  return get("/product");
};

export const getCartProducts = (): Promise<CartProductResponse> => {
  return get("/cart");
};

export const addProductToCart = (productId: string): Promise<ResponseType> => {
  return post("/cart/add", { product: productId });
};

export const removeProductFromCart = (
  productId: string
): Promise<ResponseType> => {
  return post("/cart/remove", { product: productId });
};

export const emptyCart = (): Promise<ResponseType> => {
  return post("/cart/empty", {});
};
