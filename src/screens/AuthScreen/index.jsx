import React, { useState } from "react";
import { Button, Container, Stack, styled, TextField } from "@mui/material";
import LogoImg from "../../assets/kraken-tentacle-svgrepo-com.svg";
import ImageEl from "../../components/utils/ImageEl.jsx";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase.js";
import useStore from "../../store.js";

const initForm = {
  email: "",
  password: "",
};

function AuthScreen() {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState(initForm);
  const { setToast } = useStore();
  console.log(process.env.NODE_ENV);
  const handleChange = (event) =>
    setForm((oldForm) => ({
      ...oldForm,
      [event.target.name]: event.target.value,
    }));

  const handleAuth = async () => {
    try {
      if (isLogin) {
        setLoading(true);
        const user = await signInWithEmailAndPassword(
          auth,
          form.email,
          form.password,
        );
        console.log(user);
      } else {
        await createUserWithEmailAndPassword(auth, form.email, form.password);
      }
    } catch (error) {
      const msg = error.code.split("auth/")[1].split("-").join(" ");
      setToast(msg);
      setLoading(false);
    }
  };

  return (
    <StyledContainer>
      <Stack spacing={4} textAlign="center" alignItems="center">
        <Logo>
          <ImageEl
            src={LogoImg}
            sx={{
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "rotate(360deg)",
              },
            }}
            alt="Logo"
          />
          <LogoText>Standard Kraken Board</LogoText>
        </Logo>
        <StyledTypography>Welcome to Kraken Board</StyledTypography>
        <Stack spacing={2} width="100%">
          <StyledInput>
            <TextField
              name="email"
              value={form.email}
              onChange={handleChange}
              label="Email"
              variant="outlined"
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
            <TextField
              name="password"
              value={form.password}
              onChange={handleChange}
              label="Password"
              type="password"
              variant="outlined"
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
            <Button
              disabled={loading || !form.email.trim() || !form.password.trim()}
              variant="outlined"
              onClick={handleAuth}
              sx={{
                marginY: "1rem",
                backgroundColor: () =>
                  form.email.trim() && form.password.trim()
                    ? "#F266C1"
                    : "#301426",
                borderColor: "#F266C1",
                color: "white",
                "&:hover": {
                  backgroundColor: "primary",
                  color: "#F266C1",
                  borderColor: "#F266C1",
                },
              }}
            >
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </StyledInput>
        </Stack>
        <StyledBottomTypography>
          {isLogin ? "Don't Have an account ? " : "Have an account ?"}
          <StyledLink
            onClick={() => setIsLogin((o) => !o)}
            href="#"
            underline="hover"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </StyledLink>
        </StyledBottomTypography>
      </Stack>
    </StyledContainer>
  );
}

const StyledBottomTypography = styled("Typography")`
  color: #733869;
  font-size: 1rem;
  animation: fadeInUp 1s ease-in-out;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledLink = styled("a")`
  color: #f266c1;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledTypography = styled("Typography")`
  color: #733869;
  font-size: 1.5rem;
  animation: fadeInUp 0.8s ease-in-out;
`;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Logo = styled("div")`
  display: flex;
  align-items: center;
  animation: fadeInDown 0.8s ease-in-out;
`;

const LogoText = styled("span")`
  font-family: "Poppins", sans-serif;
  font-size: 2rem;
  font-weight: bold;
  margin-left: 10px;
  color: #a6498d;
`;

const StyledInput = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: fadeIn 0.8s ease-in-out;
  justify-items: center;
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:focus-within {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInDown {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export default AuthScreen;
