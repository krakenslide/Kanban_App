import React from "react";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import { motion } from "framer-motion";
import { colors } from "../../theme.js";
import { useNavigate } from "react-router-dom";

function BoardCard({ name, color, createdAt, id }) {
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    const path = `/boards/${id}`;
    navigate(path);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Stack
          p={2}
          color="#292929"
          bgcolor={colors[color]}
          borderLeft="5px solid"
          borderColor={colors[color]}
          sx={{
            transition: "background-color 0.3s, transform 0.3s",
            "&:hover": {
              color: colors[color],
              backgroundColor: "#292929",
              transform: "scale(1.02)",
              cursor: "pointer",
            },
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box width="50%" whiteSpace="no">
              <Typography
                textOverflow="ellipsis"
                overflow="hidden"
                fontWeight={400}
              >
                {name}
              </Typography>
            </Box>
            <IconButton onClick={() => handleNavigate(id)} size="sm">
              <LaunchIcon />
            </IconButton>
          </Stack>
          <Typography variant="caption">Created at:{createdAt}</Typography>
        </Stack>
      </motion.div>
    </Grid>
  );
}

export default BoardCard;
