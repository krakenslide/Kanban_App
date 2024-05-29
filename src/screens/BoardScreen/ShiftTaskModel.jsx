import React, { useState } from "react";
import { Button, Chip, Dialog, Stack, Typography } from "@mui/material";
import ModalHeader from "../../components/Layout/ModalHeader.jsx";
import { statusMap } from "./BoardInterface.jsx";

function ShiftTaskModel({ onClose, task, shiftTask }) {
  const [taskStatus, setTaskStatus] = useState(task.status);

  const handleChipClick = (status) => {
    setTaskStatus(status);
  };

  return (
    <Dialog open fullWidth maxWidth="xs">
      <Stack p={2}>
        <ModalHeader title="Shift Task" onClose={onClose} />
        <Stack mt={3} spacing={3}>
          <Stack spacing={1}>
            <Typography>Task: </Typography>
            <Typography p={0.5} color="primary">
              {task.text}
            </Typography>
          </Stack>
          <Stack spacing={2}>
            <Typography>Status:</Typography>
            <Stack direction="row" spacing={1}>
              {Object.entries(statusMap).map(([status, label]) => (
                <Chip
                  onClick={() => handleChipClick(status)}
                  color="primary"
                  variant={taskStatus === status ? "filled" : "outlined"}
                  key={status}
                  label={label}
                />
              ))}
            </Stack>
            <Button
              onClick={() => shiftTask(taskStatus)}
              variant="contained"
              sx={{ color: "#fff" }} // Set color to white
            >
              Shift Task
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Dialog>
  );
}

export default ShiftTaskModel;
