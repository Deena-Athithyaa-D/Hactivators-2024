import React from "react";
import { IoIosLogIn } from "react-icons/io";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import CustomizedInput from "../components/shared/CustomizedInput";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.tsx";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/chat");
  };

  return (
    <>
      <Header />
      <Box width={"100%"} height={"100%"} display="flex">
        {/* Left Image */}
        <Box
          padding={2}
          display={{ md: "flex", sm: "none", xs: "none" }}
          alignItems="center"
          sx={{ marginLeft: "15%" }}
        >
          <img src="airobot.png" alt="Robot" style={{ width: "400px" }} />
        </Box>

        {/* Right Side for Form */}
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-start"
          padding={2}
          flex={1}
          sx={{ marginRight: "10%" }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              padding: "30px",
              boxShadow: "10px 10px 20px #000",
              borderRadius: "10px",
              border: "3px solid transparent",
              borderColor: "violet",
              animation: "fadeInBorder 1s ease-in-out",
              '@keyframes fadeInBorder': {
                '0%': { borderColor: 'transparent' },
                '100%': { borderColor: 'violet' },
              },
              width: '100%',
              maxWidth: '400px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={2}
              fontWeight={600}
            >
              Login
            </Typography>

            {/* Email Input - using CustomizedInput's built-in label */}
            <CustomizedInput 
              type="email" 
              name="email" 
              label="Email" 
            />

            {/* Password Input - using CustomizedInput's built-in label */}
            <CustomizedInput 
              type="password" 
              name="password" 
              label="Password" 
            />

            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "100%",
                borderRadius: 2,
                bgcolor: "#00fffc",
                ":hover": {
                  bgcolor: "white",
                  color: "black",
                },
              }}
              endIcon={<IoIosLogIn />}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;