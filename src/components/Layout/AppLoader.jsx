import React from "react";
import { LinearProgress, Stack, Typography } from "@mui/material";
import LogoImg from "../../assets/bright-kraken.svg";

function AppLoader() {
  return (
    <Stack
      spacing={2}
      direction="column"
      alignItems="center" // Center items vertically
      justifyContent="center" // Center items horizontally
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <img src={LogoImg} alt="Logo" />
      <LinearProgress
        variant="indeterminate"
        sx={{
          width: "80%", // Adjust the width as needed
          backgroundColor: "transparent",
          "& .MuiLinearProgress-barColorPrimary": {
            backgroundColor: "primary.main", // Set the progress bar color
          },
        }}
      />
      <Typography variant="h6" color="primary">
        Standby...
      </Typography>
    </Stack>
  );
}

export default AppLoader;
