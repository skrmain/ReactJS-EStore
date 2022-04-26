import React from "react";

import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

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
}));

interface CategoryFilterProps {
  categories: string[];
  // handleSelectCategory: (event: React.ChangeEvent<{ value: unknown }>) => void;
  handleSelectCategory: any;
  selectedCategory: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  handleSelectCategory,
  selectedCategory,
}) => {
  const classes = useStyles();

  return (
    <FormControl
      variant="outlined"
      size="small"
      className={classes.formControl}
    >
      <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={selectedCategory}
        onChange={handleSelectCategory}
        label="Category"
      >
        <MenuItem value="all">
          <em>All</em>
        </MenuItem>
        {categories.map((category, index) => (
          <MenuItem key={index} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryFilter;
