import React from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ImageEl from "../../components/utils/ImageEl.jsx";
import Logo from "../../assets/bright-kraken.svg";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import { auth } from "../../firebase.js";
import { signOut } from "firebase/auth";

function BoardScreenNavBar({ openModal }) {
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));
  const handleSignout = () => {
    try {
      signOut(auth);
      console.log("Signout Successful");
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#01080D",
        transition: "background-color 0.3s ease",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box
          sx={{
            cursor: "pointer",

            display: "flex",
            alignItems: "center",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <ImageEl
            src={Logo}
            spacing={2}
            width={50}
            height={50}
            sx={{
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "rotate(360deg)",
              },
            }}
          />
          <Typography
            variant="h6"
            noWrap
            color="primary"
            sx={{
              display: { xs: "none", sm: "block" },
              marginLeft: "10px",
              fontFamily: "Poppins, sans-serif",
              transition: "color 0.3s ease",
              "&:hover": {
                color: "#a6498d",
              },
            }}
          >
            Standard Kraken Board
          </Typography>
          <Typography
            variant="h6"
            noWrap
            sx={{
              display: { xs: "block", sm: "none" },
              marginLeft: "10px",
              color: "#a6498d",
              fontFamily: "Poppins, sans-serif",
              transition: "color 0.3s ease",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            SKB
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          {isXs ? (
            <>
              <IconButton
                onClick={openModal}
                color="primary"
                sx={{
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <DashboardCustomizeIcon />
              </IconButton>
              <IconButton
                onClick={handleSignout}
                color="primary"
                sx={{
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <LogoutIcon />
              </IconButton>
            </>
          ) : (
            <>
              <Button
                onClick={openModal}
                startIcon={<DashboardCustomizeIcon />}
                variant="contained"
                color="primary"
                sx={{
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                Create Board
              </Button>
              <Button
                onClick={handleSignout}
                startIcon={<LogoutIcon />}
                color="primary"
                sx={{
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                Logout
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default BoardScreenNavBar;
