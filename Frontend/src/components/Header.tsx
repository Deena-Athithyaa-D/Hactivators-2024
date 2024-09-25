import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./shared/Logo";
import NavigationLink from "./shared/NavigationLink";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigator = useNavigate();
  return (
    <AppBar
      sx={{
        bgcolor: "#000000", // Black background
        position: "static",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Logo />
        <Button variant="contained" onClick={()=>{
          navigator("/chat")
        }}>Open Chat</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header
