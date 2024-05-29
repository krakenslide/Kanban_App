import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ModalHeader from "../../components/Layout/ModalHeader.jsx";
import { colors as themeColors } from "../../theme.js";
import useApp from "../../hooks/UseApp.js";
import useStore from "../../store.js";

function CreateBoardModel({ closeModal }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState(0);
  const { createBoard } = useApp();
  const [loading, setLoading] = useState(false);
  const { setToast } = useStore();
  const handleCreate = async () => {
    const tName = name.trim();
    if (!tName) {
      setToast("Please enter a board name.");
      return;
    }
    if (tName.length > 20) {
      setToast("Board name cannot be more than 20 characters.");
      return;
    }
    if (!/^[a-zA-Z0-9\s]*$/.test(tName)) {
      setToast("Board name cannot contain special characters.");
      return;
    }
    try {
      setLoading(true);
      await createBoard({ name, color });
      closeModal();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };
  return (
    <Dialog open onClose={closeModal} fullWidth maxWidth="xs">
      <Stack p={2} spacing={3}>
        <ModalHeader onClose={closeModal} title="Create Board" />
        <Stack my={5} spacing={3}>
          <TextField
            value={name}
            label="Board Name"
            onChange={(e) => setName(e.target.value)}
            InputLabelProps={{
              style: { color: "#F266C1" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#F266C1",
              },
              "& input::placeholder": {
                color: "#F266C1",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#733869",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#F266C1",
              },
              "&:hover .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#F266C1",
                },
            }}
          />
          <Stack spacing={1.5} direction="row">
            <Typography color="primary">Color: </Typography>
            {themeColors.map((clr, index) => (
              <Box
                onClick={() => setColor(index)}
                height={25}
                width={25}
                backgroundColor={clr}
                key={clr}
                borderRadius="50%"
                sx={{
                  cursor: "pointer",
                  border: color === index ? "3px solid #383838" : "none",
                  outline: `2px solid ${clr}`,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.2)",
                    boxShadow: `0 0 10px ${clr}`,
                  },
                }}
              />
            ))}
          </Stack>
        </Stack>
        <Button
          disabled={loading}
          onClick={handleCreate}
          size="large"
          variant="contained"
          sx={{
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.02)",
            },
          }}
        >
          Create
        </Button>
      </Stack>
    </Dialog>
  );
}

export default CreateBoardModel;
