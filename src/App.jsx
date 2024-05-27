import React, { useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme.js";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.js";
import useStore from "./store.js";
import AppLoader from "./components/Layout/AppLoader.jsx";
import PublicOnlyRoutes from "./components/utils/PublicOnlyRoutes.jsx";
import AuthScreen from "./screens/AuthScreen/index.jsx";
import BoardsScreen from "./screens/BoardsScreen/index.jsx";
import PrivateOnlyRoutes from "./components/utils/PrivateOnlyRoutes.jsx";
import TempSignout from "./components/utils/TempSignout.jsx";
import SnackbarManager from "./components/Layout/SnackbarManager.jsx";
import BoardScreen from "./screens/BoardScreen/index.jsx";

function App() {
  const { loader, setLoginStatus } = useStore();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setLoginStatus(!!user);
    });
    return () => unsub();
  }, []);

  if (loader) {
    return (
      <ThemeProvider theme={theme}>
        <AppLoader />
      </ThemeProvider>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarManager />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<PublicOnlyRoutes Component={AuthScreen} />}
          />
          <Route
            path="/boards"
            element={<PrivateOnlyRoutes Component={BoardsScreen} />}
          />
          <Route
            path="/boards/:boardId"
            element={<PrivateOnlyRoutes Component={BoardScreen} />}
          />
          <Route path="/signout" element={<TempSignout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
