import React, { useState } from "react";
import {
  Button,
  Chip,
  Dialog,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import ModalHeader from "../../components/Layout/ModalHeader.jsx";

function AddTaskModel({ tabName, onClose, addTask }) {
  const [text, setText] = useState();
  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="xs">
      <Stack p={2} spacing={3}>
        <ModalHeader title="Add Task" onClose={onClose} />
        <Stack mt={3} spacing={1}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ opacity: 0.7, transition: "opacity 0.3s ease" }}
          >
            <Typography variant="body2">Status:</Typography>
            <Chip
              size="small"
              label={tabName}
              variant="outlined"
              sx={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.25)",
                },
                fontSize: "0.8rem",
                fontWeight: 500,
                borderWidth: "1.5px",
                borderColor: "primary.main",
                color: "primary.main",
                backgroundColor: "transparent",
                padding: "4px 8px",
                borderRadius: "16px",
              }}
            />
          </Stack>
          <OutlinedInput
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Task"
            fullWidth
            size="small"
            sx={{
              borderRadius: 1,
              transition: "border-color 0.3s ease",
              "&:hover": {
                borderColor: "primary.main",
              },
            }}
          />
          <Button
            onClick={() => addTask(text)}
            variant="contained"
            disableElevation
            sx={{
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          >
            Add Task
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
}

export default AddTaskModel;
