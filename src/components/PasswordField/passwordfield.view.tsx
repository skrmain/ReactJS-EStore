import React, { useState } from "react";

import clsx from "clsx";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const useStyles = makeStyles((theme: Theme) => ({
  textField: {
    width: "25ch",
  },
  w100: {
    width: "100%",
  },
}));

interface PasswordFieldViewProps {
  label?: string;
  prop?: string;
  password: any;
  handleChange: any;
  error?: any;
}

const PasswordFieldView: React.FC<PasswordFieldViewProps> = ({
  label = "Password",
  prop = "password",
  password,
  handleChange,
  error,
}) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <FormControl
      className={clsx(classes.textField, classes.w100)}
      variant="outlined"
    >
      <InputLabel htmlFor="outlined-adornment-password" required>
        {label}
      </InputLabel>
      <OutlinedInput
        id={"outlined-adornment-password" + label}
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={handleChange(prop)}
        required
        error={error}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText>{error ? "Error" : ""}</FormHelperText>
    </FormControl>
  );
};

export default PasswordFieldView;
