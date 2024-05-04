import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthScreen from "./screens/AuthScreen/index.jsx";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthScreen />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
