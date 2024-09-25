import React, { useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.tsx";

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    // try {
    //   await auth?.signup(name, email, password);
    //   // After signup, navigate to chat page regardless of authentication state
    //   navigate("/chat");
    // } catch (error) {
    //   console.log(error);
    // }
  };


  return (
    <>
      <Header />
      <Box width={"100%"} height={"100%"} display="flex">
        {/* Left Image */}
        <Box
          padding={2}
          display={{ md: "flex", sm: "none", xs: "none" }} // Show image on larger screens
          alignItems="center"
          sx={{ marginLeft: "15%" }} // Shift image 15% to the right
        >
          <img src="airobot.png" alt="Robot" style={{ width: "400px" }} />
        </Box>

        {/* Right Side for Form */}
        <Box
          display="flex"
          justifyContent="flex-end" // Align children to the right
          alignItems="flex-start" // Align to the top
          padding={2} // Add some padding for aesthetics
          flex={1} // Take the remaining space
          sx={{ marginRight: "10%" }} // Shift form 10% to the left
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              padding: "30px",
              boxShadow: "10px 10px 20px #000",
              borderRadius: "10px",
              border: "3px solid transparent", // Set initial border to transparent
              borderColor: "violet", // Set border color
              animation: "fadeInBorder 1s ease-in-out", // Apply animation
              '@keyframes fadeInBorder': { // Define the fade-in animation
                '0%': { borderColor: 'transparent' },
                '100%': { borderColor: 'violet' },
              },
              width: '100%', // Full width for responsiveness
              maxWidth: '400px', // Set a max width for the form
              display: 'flex', // Set to flex to manage alignment easily
              flexDirection: 'column', // Arrange children vertically
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

            {/* Name Label */}
            <Typography
              sx={{ 
                marginBottom: "8px", 
                fontWeight: "bold",
                fontSize: "16px" 
              }}
            >
              Name
            </Typography>
            <CustomizedInput label="cs4" type="text" name="name" />

            {/* Email Label */}
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
            <CustomizedInput label="cs2" type="email" name="email" />

            {/* Password Label */}
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
            <CustomizedInput label="cs3" type="password" name="password" />

            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "100%", // Full width for better responsiveness
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
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Signup;
