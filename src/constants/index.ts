export const APP_NAME = "EStore";

export const FRONTEND_ENDPOINTS = [
  {
    name: "Home",
    link: "/",
    inNav: false,
  },
  {
    name: "Login",
    link: "/login",
    protect: false,
  },
  {
    name: "Product Detail",
    link: "/product/",
    protect: true,
    inNav: false,
  },
  {
    name: "Cart",
    link: "/cart",
    protect: true,
  },
];

export const DEFAULT_IMAGE_URL =
  "https://raw.githubusercontent.com/skrmain/previews/main/dstore/ImageUnavailable.png";

const prod = {
  API_BASE_URL: "https://api-dummy-store.herokuapp.com",
};

const dev = {
  API_BASE_URL: "http://localhost:8000",
};

export const API_BASE_URL =
  process.env.NODE_ENV === "development" ? dev.API_BASE_URL : prod.API_BASE_URL;
