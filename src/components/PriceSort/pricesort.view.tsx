import React from "react";

import { Grid, IconButton } from "@mui/material";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

interface PriceSortProps {
  handlePriceSort: () => void;
  priceSort: boolean;
}

const PriceSort: React.FC<PriceSortProps> = ({
  handlePriceSort,
  priceSort,
}) => {
  return (
    <Grid container alignItems="center">
      <Grid item>Price :</Grid>
      <Grid item>
        <IconButton aria-label="arrow" onClick={handlePriceSort}>
          {priceSort ? (
            <ArrowDownwardIcon fontSize="inherit" />
          ) : (
            <ArrowUpwardIcon fontSize="inherit" />
          )}
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default PriceSort;
