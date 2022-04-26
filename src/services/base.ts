import axios, { AxiosError } from "axios";

import { API_BASE_URL } from "../constants";

axios.defaults.baseURL = API_BASE_URL;

/**
 * To Update the Token in axios instance
 */
export const updateBearToken = () => {
  const AUTH_TOKEN = localStorage.getItem("AUTH_TOKEN");

  if (AUTH_TOKEN)
    axios.defaults.headers.common["Authorization"] = `Bearer ${AUTH_TOKEN}`;
};

/**
 * Type guard with "type predicate"
 */
export function isAxiosError(candidate: any): candidate is AxiosError {
  return candidate.isAxiosError === true;
}

/**
 * To Send GET Request
 */
export const get = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const errorResponseData = error?.response?.data;
      return errorResponseData;
    }
  }
};

/**
 * To Send POST Request
 */
export const post = async (url: string, data: any) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const errorResponseData = error?.response?.data;
      return errorResponseData;
    }
  }
};
