import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { DeepMap, FieldError, UseFormRegister } from "react-hook-form";

import {
  Box,
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";

import { AlertStatusType, LoginValues } from "../../types";

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
}));

interface LoginViewProps {
  register: UseFormRegister<LoginValues>;
  handleLogin: () => void;
  errors: DeepMap<LoginValues, FieldError | undefined>;
  alertStatus: AlertStatusType;
}

const LoginView: React.FC<LoginViewProps> = ({
  errors,
  handleLogin,
  register,
  alertStatus,
}) => {
  const classes = useStyles();

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper>
          <Grid container justifyContent="center">
            <Grid item xs={10}>
              <Box className={classes.center} mt="40px" mb="20px">
                <Typography variant="h4">Login</Typography>
              </Box>

              {alertStatus.show && (
                <Alert severity={alertStatus.type}>{alertStatus.message}</Alert>
              )}

              <Box mt="30px">
                <TextField
                  id="emailID"
                  // name="email"
                  {...register("email", {
                    required: "Required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  // inputRef={}
                  label="Email ID"
                  variant="outlined"
                  className={classes.w100}
                  required
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Box>

              <Box mt="30px">
                <TextField
                  fullWidth
                  // inputRef={}
                  label="Password"
                  // name="password"
                  {...register("password", {
                    required: "Required",
                  })}
                  type="password"
                  variant="outlined"
                  required
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Box>

              <Box mt="30px" className={clsx(classes.w100, classes.right)}>
                <Link component={RouterLink} to="/register">
                  Not have a account? Register here.
                </Link>
              </Box>

              <Box my="30px" className={clsx(classes.w100, classes.center)}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLogin}
                  type="submit"
                >
                  Login
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginView;
