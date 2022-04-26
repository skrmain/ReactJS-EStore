import React from "react";

import { Button, Box, Grid } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

import ProductCard from "../../components/ProductCard";
import { CartProduct } from "../../services/model";

const useStyles = makeStyles((theme: Theme) => ({
  center: {
    textAlign: "center",
  },
}));

interface CartViewProps {
  cartProducts: CartProduct[] | any;
  decreaseProductQuantity: (productID?: string | undefined) => Promise<void>;
  increaseProductQuantity: (productID?: string | undefined) => Promise<void>;
  handleEmptyCart: () => Promise<void>;
}

const CartView: React.FC<CartViewProps> = ({
  cartProducts,
  handleEmptyCart,
  increaseProductQuantity,
  decreaseProductQuantity,
}) => {
  const classes = useStyles();

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <div>
          <h2>My Cart</h2>
          {cartProducts ? (
            <>
              {cartProducts.length > 0 ? (
                <>
                  <Box className={classes.center} mt="10px">
                    <Grid container>
                      {cartProducts.map(
                        (cartProduct: CartProduct, index: number) => (
                          <Grid item xs={12} key={index} sx={{ mt: 1, mb: 2 }}>
                            <ProductCard
                              key={index}
                              product={{
                                ...cartProduct.product,
                                quantity: cartProduct.quantity,
                              }}
                              decreaseProductQuantity={decreaseProductQuantity}
                              increaseProductQuantity={increaseProductQuantity}
                            />
                          </Grid>
                        )
                      )}
                    </Grid>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    marginTop="15px"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleEmptyCart}
                    >
                      Empty Cart
                    </Button>
                  </Box>
                </>
              ) : (
                <h2>No Product in Cart</h2>
              )}
            </>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default CartView;
