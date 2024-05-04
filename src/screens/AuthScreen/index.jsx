import React from "react";
import { Container, styled } from "@mui/material";
import LogoImg from "../../assets/kraken-tentacle-svgrepo-com.svg";
import ImageEl from "../../components/utils/ImageEl.jsx";

function AuthScreen() {
  return (
    <StyledContainer>
      <LogoContainer>
        <ImageEl src={LogoImg} alt="Logo" />
      </LogoContainer>
      <LogoText>Standard Kraken Board</LogoText>
    </StyledContainer>
  );
}

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
`;

const LogoContainer = styled("div")`
  margin-right: 4px;
`;

const LogoText = styled("span")`
  font-size: 2rem;
  font-weight: bold;
  margin-left: 10px;
  color: #50687d;
`;

export default AuthScreen;
