import React, { useState } from "react";
import { IoIosLogIn } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa"; // Import guest icon

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import CustomizedInput from "../components/shared/CustomizedInput";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.tsx";
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    try {
      const response = await axios.post('http://your-api-endpoint/signup', {
        name,
        email,
        password
      });

      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
        navigate("/chat");
      } else {
        setError(response.data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("An error occurred during signup");
    }
  };

  const handleGuestLogin = () => {
    // Set guest flag in localStorage if needed
    localStorage.setItem('isGuest', 'true');
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
            {/* Signup Title */}
            <Typography
              variant="h4"
              textAlign="center"
              padding={2}
              fontWeight={600}
            >
              Signup
            </Typography>

            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}

            {/* Name Input */}
            <Typography
              sx={{ 
                marginBottom: "8px", 
                fontWeight: "bold",
                fontSize: "16px" 
              }}
            >
              Name
            </Typography>
            <CustomizedInput type="text" name="name" label="Name" />

            {/* Email Input */}
            <Typography
              sx={{ 
                marginTop: "16px", 
                marginBottom: "8px", 
                fontWeight: "bold",
                fontSize: "16px" 
              }}
            >
              Email
            </Typography>
            <CustomizedInput type="email" name="email" label="Email" />

            {/* Password Input */}
            <Typography
              sx={{ 
                marginTop: "16px", 
                marginBottom: "8px", 
                fontWeight: "bold",
                fontSize: "16px" 
              }}
            >
              Password
            </Typography>
            <CustomizedInput type="password" name="password" label="Password" />

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
              Signup
            </Button>

            {/* Divider */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              my: 2,
              color: 'text.secondary'
            }}>
              <Box sx={{ flex: 1, height: '1px', bgcolor: 'divider' }} />
              <Typography variant="body2" sx={{ px: 2 }}>OR</Typography>
              <Box sx={{ flex: 1, height: '1px', bgcolor: 'divider' }} />
            </Box>

            {/* Guest Login Button */}
            <Button
              onClick={handleGuestLogin}
              sx={{
                px: 2,
                py: 1,
                width: "100%",
                borderRadius: 2,
                bgcolor: "#7C3AED", // Violet color to match your theme
                color: "white",
                ":hover": {
                  bgcolor: "#5B27A0", // Darker violet on hover
                },
              }}
              endIcon={<FaUserAlt />}
            >
              Continue as Guest
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Signup;