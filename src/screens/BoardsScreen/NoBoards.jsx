// import React from "react";
// import { Stack, Typography } from "@mui/material";
//
// function NoBoards() {
//   return (
//     <Stack textAlign="center" mt={15} spacing={1}>
//       <Typography variant="h5" color="secondary">
//         No boards created
//       </Typography>
//       <Typography color="secondary">Create your first board !</Typography>
//     </Stack>
//   );
// }
//
// export default NoBoards;
import React from "react";
import {Stack, styled, Typography} from "@mui/material";
import LogoImg from "../../assets/kraken-tentacle-svgrepo-com.svg";

const BackgroundStack = styled(Stack)(({ theme }) => ({
  backgroundImage: `url(${LogoImg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Dark overlay
    zIndex: 1,
  },
  "& > *": {
    position: "relative",
    zIndex: 2,
  },
}));

function NoBoards() {
  return (
    <BackgroundStack spacing={1}>
      <Typography variant="h5" color="secondary">
        No boards created
      </Typography>
      <Typography color="secondary">Create your first board!</Typography>
    </BackgroundStack>
  );
}

export default NoBoards;
