import React from "react";
import { Stack, Typography } from "@mui/material";

function NumberOfBoards() {
  return (
    <Stack textAlign="center" mt={15} spacing={1}>
      <Typography variant="h5" color="secondary">
        No boards created
      </Typography>
      <Typography color="secondary">Create your first board !</Typography>
    </Stack>
  );
}

export default NumberOfBoards;
