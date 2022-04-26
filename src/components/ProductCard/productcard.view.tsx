import React from "react";

import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";

import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";

import { Product } from "../../services/model";
import { addProductToCart } from "../../services/apis";
import { DEFAULT_IMAGE_URL } from "../../constants";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  media: {
    height: 200,
  },
  textLeft: {
    textAlign: "left",
  },
  margin_t1: {
    marginTop: "5px",
  },
  right: {
    textAlign: "right",
  },
});

interface ProductCardProps {
  product: Product;
  decreaseProductQuantity?: (productID?: string) => Promise<void>;
  increaseProductQuantity?: (productID?: string) => Promise<void>;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  decreaseProductQuantity,
  increaseProductQuantity,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { image, name, brand, price, description, quantity, _id } = product;

  const handleAddToCart = async () => {
    if (!product?._id) return;

    const response = await addProductToCart(product?._id);
    if (response.status === "success") {
      navigate("/cart");
    } else {
      alert("Error Occurred");
    }
  };

  return (
    <Card className={classes.root}>
      <Grid container>
        <Grid item xs={4}>
          <CardMedia
            className={classes.media}
            image={image || DEFAULT_IMAGE_URL}
            title={name}
          />
        </Grid>
        <Grid item xs={8}>
          <CardContent
            className={classes.textLeft}
            style={{ paddingBottom: 0 }}
          >
            <Typography gutterBottom variant="h6" component="h3" noWrap>
              {name}
            </Typography>
            <Typography>{brand}</Typography>
            <Typography className={classes.margin_t1}>
              <b>Price</b> : {price}
            </Typography>
            <Typography className={classes.margin_t1}>{description}</Typography>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              marginTop="10px"
            >
              {!quantity && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              )}
              {quantity &&
                quantity >= 0 &&
                increaseProductQuantity &&
                decreaseProductQuantity && (
                  <>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => decreaseProductQuantity(_id)}
                    >
                      -
                    </Button>
                    <Typography
                      style={{ fontWeight: "bold", margin: "0 1rem" }}
                    >
                      {quantity}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => increaseProductQuantity(_id)}
                    >
                      +
                    </Button>
                  </>
                )}
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProductCard;
