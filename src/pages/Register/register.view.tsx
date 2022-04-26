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

import clsx from "clsx";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

import { AlertStatusType, RegisterValues } from "../../types";

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

interface RegisterViewProps {
  register: UseFormRegister<RegisterValues>;
  handleRegister: () => void;
  errors: DeepMap<RegisterValues, FieldError>;
  alertStatus: AlertStatusType;
  password: React.MutableRefObject<{}>;
}

const RegisterView: React.FC<RegisterViewProps> = ({
  handleRegister,
  alertStatus,
  errors,
  register,
  password,
}) => {
  const classes = useStyles();

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper>
          <form>
            <Grid container justifyContent="center">
              <Grid item xs={10}>
                <Box className={classes.center} mt="40px" mb="20px">
                  <Typography variant="h4">Register</Typography>
                </Box>

                {alertStatus.show && (
                  <Alert severity={alertStatus.type}>
                    {alertStatus.message}
                  </Alert>
                )}

                <Box mt="30px">
                  <TextField
                    id="fullName"
                    // name="name"
                    {...register("name", {
                      required: "Required",
                    })}
                    label="Full Name"
                    variant="outlined"
                    // inputRef={}
                    className={classes.w100}
                    required
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                </Box>

                <Box mt="30px">
                  <TextField
                    id="emailID"
                    {...register("email", {
                      required: "Required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    // name="email"
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
                    {...register("password", {
                      required: "Required",
                    })}
                    // inputRef={}
                    label="Password"
                    // name="password"
                    type="password"
                    variant="outlined"
                    required
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                </Box>
                <Box mt="30px">
                  <TextField
                    fullWidth
                    // inputRef={}
                    {...register("confirmPassword", {
                      required: "Required",
                      validate: (value: any) =>
                        value === password.current ||
                        "The passwords do not match",
                    })}
                    label="Confirm Password"
                    // name="confirmPassword"
                    type="password"
                    variant="outlined"
                    required
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                  />
                </Box>

                <Box mt="30px" className={clsx(classes.w100, classes.right)}>
                  <Link component={RouterLink} to="/login">
                    Already have a account? Login here.
                  </Link>
                </Box>

                <Box my="30px" className={clsx(classes.w100, classes.center)}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleRegister}
                    type="submit"
                  >
                    Register
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RegisterView;
