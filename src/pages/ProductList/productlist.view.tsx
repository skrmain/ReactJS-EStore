import React from "react";

import { Box, Grid } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

import ProductCard from "../../components/ProductCard";
import CategoryFilter from "../../components/CategoryFilter";
import PriceSort from "../../components/PriceSort";
import { Product } from "../../services/model";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    width: "25ch",
  },
  w100: {
    width: "100%",
  },
  center: {
    textAlign: "center",
  },
  left: {
    textAlign: "left",
  },
  right: {
    textAlign: "right",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

interface ProductListViewProps {
  products: Product[] | undefined;
  categories: string[] | undefined;
  handleSelectCategory: (
    event: React.ChangeEvent<{
      value: unknown;
    }>
  ) => void;
  selectedCategory: string;
  handlePriceSort: () => void;
  priceSort: boolean;
}

const ProductListView: React.FC<ProductListViewProps> = ({
  categories,
  handleSelectCategory,
  products,
  selectedCategory,
  handlePriceSort,
  priceSort,
}) => {
  const classes = useStyles();

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={10} md={8} lg={6}>
        {products && categories ? (
          <>
            <Box className={classes.center} mt="10px" mx={1}>
              <Grid container alignItems="center">
                <Grid item xs={8}>
                  <Grid container alignItems="center">
                    <Grid item>
                      <CategoryFilter
                        {...{
                          categories,
                          handleSelectCategory,
                          selectedCategory,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <PriceSort {...{ handlePriceSort, priceSort }} />
                </Grid>
              </Grid>
            </Box>
            <Box className={classes.center} mt="10px">
              <Grid container>
                {products.length > 0 ? (
                  products
                    .filter(({ category }) =>
                      selectedCategory !== "all"
                        ? category === selectedCategory
                        : true
                    )
                    .map((product, index) => (
                      <Grid item xs={12} sx={{ mt: 1, mb: 2 }} key={index}>
                        <ProductCard product={product} />
                      </Grid>
                    ))
                ) : (
                  <h2>No Product Available</h2>
                )}
              </Grid>
            </Box>
          </>
        ) : (
          <h2>Loading...</h2>
        )}
      </Grid>
    </Grid>
  );
};

export default ProductListView;
