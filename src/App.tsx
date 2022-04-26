import React, { useDispatch } from "reactn";

import { BrowserRouter as Router } from "react-router-dom";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import { setUserDetailReducer } from "./reducers";
import MyRoutes from "./routes";
import NavBar from "./components/NavBar";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
    },
  },
});

const App = () => {
  useDispatch(setUserDetailReducer)();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar />
        <Box sx={{ p: 3, backgroundColor: "#F8F8F8", width: "100%" }}>
          <MyRoutes />
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
