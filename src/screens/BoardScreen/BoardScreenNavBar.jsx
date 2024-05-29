import React, { memo } from "react";
import { AppBar, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import BackIcon from "@mui/icons-material/ArrowBack";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { useNavigate } from "react-router-dom"; //import {colors} from "../../theme.js";
import { colors } from "../../theme.js";

function BoardScreenNavBar({ name, lastUpdated, color, deleteBoard }) {
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        borderBottom: "5px solid",
        borderColor: colors[color],
        backgroundColor: "#01080D",
        transition: "background-color 0.3s ease",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Stack spacing={1} alignItems="center" direction="row">
          <IconButton
            onClick={() => navigate("/boards")}
            color="primary"
            size="small"
          >
            <BackIcon />
          </IconButton>
          <Typography variant="h6" color="primary">
            {name}
          </Typography>
        </Stack>
        <Stack spacing={2} alignItems="center" direction="row">
          <Typography
            display={{
              xs: "none",
              sm: "block",
            }}
            color="primary"
            variant="body2"
          >
            Last Updated: {lastUpdated}
          </Typography>
          <IconButton color="primary" size="small" onClick={deleteBoard}>
            <DeleteSweepIcon />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default memo(BoardScreenNavBar);
