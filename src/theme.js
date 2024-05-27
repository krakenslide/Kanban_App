import { createTheme } from "@mui/material";

export const colors = [
  "#F49D6E", // Orange
  "#62C370", // Green
  "#FFD166", // Yellow
  "#8ABEB7", // Teal
  "#B55E83", // Pink
  "#A6C48A", // Light Green
];

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#01080D",
    },
    primary: {
      main: "#F266C1",
    },
    secondary: {
      main: "#733869",
    },
  },
  // components: {
  //   MuiSnackbar: {
  //     defaultProps: {},
  //   },
  // },
  typography: {
    fontFamily: "Poppins, sans-serif",
    button: {
      textTransform: "unset",
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 0,
  },
});

export default theme;
