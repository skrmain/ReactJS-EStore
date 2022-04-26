import React, { useEffect, useState } from "react";

import { getProductsAPI } from "../../services/apis";
import { Product } from "../../services/model";
import ProductListView from "./productlist.view";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>();
  const [priceSort, setPriceSort] = useState(true);
  const [categories, setCategories] = useState<string[]>();
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, []);

  const getProducts = async () => {
    try {
      const response = await getProductsAPI();

      if (response.data?.products) {
        const _products = response.data.products;
        const _categories = new Set<string>();
        _products.sort((a, b) => {
          _categories.add(a.category);
          _categories.add(b.category);
          return parseFloat(a.price) - parseFloat(b.price);
        });
        setCategories(Array.from(_categories).sort((a, b) => (a > b ? 1 : -1)));
        setProducts(_products);
      }
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  const handlePriceSort = () => {
    if (products) {
      const _products = [...products];
      _products.sort((a, b) =>
        !priceSort
          ? parseFloat(a.price) - parseFloat(b.price)
          : parseFloat(b.price) - parseFloat(a.price)
      );
      setProducts(_products);
      setPriceSort(!priceSort);
    }
  };

  const handleSelectCategory = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedCategory(event.target.value as string);
  };

  return (
    <ProductListView
      categories={categories}
      handlePriceSort={handlePriceSort}
      handleSelectCategory={handleSelectCategory}
      priceSort={priceSort}
      products={products}
      selectedCategory={selectedCategory}
    />
  );
};

export default ProductList;
