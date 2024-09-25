import { Box, useMediaQuery, createTheme, ThemeProvider, AppBar, Toolbar, Typography, Button } from "@mui/material";
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
                  <Header />
      <Box width={"100%"} height={"100%"} sx={{ backgroundColor: customTheme.palette.background.default }}>


        

        {/* Main Content */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            mx: "auto",
            mt: 3,
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
            }}
          >
            <img
              src="robot.png"
              alt="robot"
              style={{ width: "200px", margin: "auto" }}
            />
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
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Home;
