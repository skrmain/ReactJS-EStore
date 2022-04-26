import React, { useDispatch, useGlobal } from "reactn";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";

import { setUserDetailReducer } from "../../reducers";
import { APP_NAME, FRONTEND_ENDPOINTS } from "../../constants";

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
    color: "white",
    textDecoration: "none",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  list: {
    width: "auto",
    height: "100vh",
    paddingTop: "5rem",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { isLogin, name } = useGlobal("userDetail")[0];
  const setGlobalUserDetail = useDispatch(setUserDetailReducer);

  const handleLogout = () => {
    localStorage.clear();
    setGlobalUserDetail();
    navigate("/login");
  };

  return (
    <>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <div>
            <Typography
              variant="h6"
              noWrap
              className={classes.title}
              component={RouterLink}
              to="/"
            >
              {APP_NAME}
            </Typography>
          </div>
          <div>
            {FRONTEND_ENDPOINTS.filter(
              (value) =>
                (value.protect === isLogin || value.protect === undefined) &&
                value.inNav !== false
            ).map((val) => (
              <Button
                key={val.link}
                component={RouterLink}
                to={val.link}
                color="inherit"
              >
                {val.link === "/cart" ? <ShoppingCartIcon /> : val.name}
              </Button>
            ))}
            {isLogin && (
              <Button color="inherit" onClick={handleLogout}>
                Logout, {name}
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.drawerHeader} />
    </>
  );
};

export default NavBar;
