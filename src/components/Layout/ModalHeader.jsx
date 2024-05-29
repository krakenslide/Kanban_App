import React from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function ModalHeader({ title, onClose }) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      <Typography variant="h6" fontWeight="700" color="primary">
        {title}
      </Typography>
      <IconButton
        onClick={onClose}
        size="small"
        color="primary"
        sx={{
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "rotate(180deg)",
          },
        }}
      >
        <CloseIcon />
      </IconButton>
    </Stack>
  );
}

export default ModalHeader;
