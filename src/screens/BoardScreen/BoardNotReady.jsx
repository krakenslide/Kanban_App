import React from "react";
import { Button, Stack, styled, Typography } from "@mui/material";
import LogoImg from "../../assets/kraken-tentacle-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const fadeIn = {
  from: { opacity: 0 },
  to: { opacity: 1 },
};

const slideIn = {
  from: { transform: "translateY(20px)", opacity: 0 },
  to: { transform: "translateY(0)", opacity: 1 },
};

const BackgroundStack = styled(Stack)(({ theme }) => ({
  backgroundImage: `url(${LogoImg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  position: "relative",
  animation: `${fadeIn} 1s ease-out`,
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Dark overlay
    zIndex: 1,
    animation: `${fadeIn} 1s ease-out`,
  },
  "& > *": {
    position: "relative",
    zIndex: 2,
    animation: `${slideIn} 1s ease-out`,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
  transition: "all 0.3s ease",
}));

function BoardNotReady() {
  const navigate = useNavigate();
  return (
    <BackgroundStack spacing={2}>
      <Typography variant="h5" color="primary">
        Oops! Board not ready
      </Typography>
      <Typography variant="h6" color="secondary">
        Kraken is building your board!
      </Typography>
      <StyledButton variant="contained" onClick={() => navigate("/boards")}>
        <ArrowBackIcon />
        Go back
      </StyledButton>
    </BackgroundStack>
  );
}

export default BoardNotReady;
