import React, { useEffect, useState } from "react";

import {
  getCartProducts,
  removeProductFromCart,
  addProductToCart,
  emptyCart,
} from "../../services/apis";
import { CartProduct } from "../../services/model";
import CartView from "./cart.view";

const CartContainer = () => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>();

  useEffect(() => {
    updateCartProducts();
  }, []);

  const updateCartProducts = async () => {
    const response = await getCartProducts();

    if (response.status === "success" && response.data && response.data.cart) {
      setCartProducts([...response.data?.cart.products]);
    }
    console.log("Response : ", response);
  };

  const decreaseProductQuantity = async (productID?: string) => {
    if (!productID) return;
    const response = await removeProductFromCart(productID);

    if (response.status === "success") {
      updateCartProducts();
    }
  };

  const increaseProductQuantity = async (productID?: string) => {
    if (!productID) return;
    const response = await addProductToCart(productID);

    if (response.status === "success") {
      updateCartProducts();
    }
  };

  const handleEmptyCart = async () => {
    const response = await emptyCart();

    if (response.status === "success") {
      updateCartProducts();
    }
  };

  return (
    <CartView
      cartProducts={cartProducts}
      decreaseProductQuantity={decreaseProductQuantity}
      handleEmptyCart={handleEmptyCart}
      increaseProductQuantity={increaseProductQuantity}
    />
  );
};

export default CartContainer;
