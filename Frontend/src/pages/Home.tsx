import { Box, useMediaQuery, createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import TypingAnim from "../components/typer/TypingAnim";
import Footer from "../components/footer/Footer";
import Header from "../components/Header.tsx";

// Custom theme with violet and black
const customTheme = createTheme({
  palette: {
    primary: {
      main: "#7C3AED", // Violet
    },
    background: {
      default: "#000000", // Black background
    },
    text: {
      primary: "#FFFFFF", // White text for contrast with black
      secondary: "#7C3AED", // Violet text for highlights
    },
  },
});

const Home = () => {
  const isBelowMd = useMediaQuery(customTheme.breakpoints.down("md"));

  return (
    <ThemeProvider theme={customTheme}>
      <Header /> {/* Ensure the header has a high z-index */}
      <Box
        width={"100%"}
        height={"100%"}
        sx={{ backgroundColor: customTheme.palette.background.default }}
      >
        {/* Main Content */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            mx: "auto",
            mt: 3,
            position: "relative", // Ensure proper layout
            zIndex: 1, // Keep content below the 3D model
          }}
        >
          <Box>
            <TypingAnim />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: { md: "row", xs: "column", sm: "column" },
              gap: 5,
              my: 10,
              position: "relative",
              zIndex: 1, // Ensure it's below the 3D model
            }}
          >
            <img
              className="image-inverted rotate"
              src="openai.png"
              alt="openai"
              style={{ width: "200px", margin: "auto" }}
            />
          </Box>

          <Box sx={{ display: "flex", mx: "auto" }}>
            <img
              src="chat.png"
              alt="chatbot"
              style={{
                display: "flex",
                margin: "auto",
                width: isBelowMd ? "80%" : "60%",
                borderRadius: 20,
                boxShadow: "-5px -5px 105px #7C3AED", // Violet shadow
                marginTop: 20,
                marginBottom: 20,
                padding: 10,
              }}
            />
          </Box>
        </Box>

        {/* 3D Model with fixed position */}
        <Box
          sx={{
            position: "fixed", // Make the model fixed
            top: "50%", // Start at the middle of the viewport
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isBelowMd ? "90vw" : "70vw", // Increase width
            height: isBelowMd ? "90vh" : "70vh", // Increase height
            zIndex: 9999, // High z-index to ensure it stays above all other content
            pointerEvents: "auto", // Allow interaction with the 3D model
          }}
        >
          <iframe
            src="https://my.spline.design/robotfollowcursorforlandingpage-bc83f993bb81d65f96b13560a2f2c7f4/"
            frameBorder="0"
            allowFullScreen
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "10px", // Optional: add border-radius for smoother corners
            }}
          ></iframe>
        </Box>

        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Home;
