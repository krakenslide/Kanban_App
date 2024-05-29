import React from "react";
import { Snackbar, styled, useMediaQuery } from "@mui/material";
import useStore from "../../store.js";

function SnackbarManager() {
  const { toastMessage, setToast } = useStore();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <StyledSnackbar
      message={toastMessage}
      open={!!toastMessage}
      autoHideDuration={5000}
      onClose={() => setToast("")}
      anchorOrigin={{
        horizontal: "center",
        // vertical: isSmallScreen ? "bottom" : "bottom",
        vertical: "bottom",
      }}
    />
  );
}

const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
  "& .MuiSnackbarContent-root": {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
}));

export default SnackbarManager;
