import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // Added for navigation
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Menu from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Added back icon

import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import toast from "react-hot-toast";
import axios from "axios";
import { BASEURL } from "./constants";

type Message = {
  role: "user" | "assistant";
  content: string;
  type: "text" | "video";
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#7C3AED",
    },
    background: {
      default: "#1E1E2D",
    },
    text: {
      primary: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Work Sans, sans-serif",
  },
});

const Chat = () => {
  const navigate = useNavigate(); // Added for navigation
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState<string>("");

  const saveChatsToLocalStorage = (messages: Message[]) => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  };

  const loadChatsFromLocalStorage = (): Message[] => {
    const storedMessages = localStorage.getItem("chatMessages");
    return storedMessages ? JSON.parse(storedMessages) : [];
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    const content = prompt;
    setPrompt("");
    
    const newMessage: Message = { role: "user", content, type: "text" };
    setChatMessages((prev) => {
      const updatedMessages = [...prev, newMessage];
      saveChatsToLocalStorage(updatedMessages);
      return updatedMessages;
    });

    try {
      const resp = await axios.post(
        `${BASEURL}v2/render`,
        {
          prompt: content,
          filename: "frontend.mp4",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (resp.data.video_url) {
        const videoMessage: Message = {
          role: "assistant",
          content: resp.data.video_url,
          type: "video",
        };
        setChatMessages((prev) => {
          const updatedMessages = [...prev, videoMessage];
          saveChatsToLocalStorage(updatedMessages);
          return updatedMessages;
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate video");
    }
  };

  const handleDeleteChats = () => {
    setChatMessages([]);
    localStorage.removeItem("chatMessages");
    toast.success("Deleted Chats Successfully", { id: "deletechats" });

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
    }
  };

  const handleBackToHome = () => {
    navigate("/"); // Navigate to home page
  };

  useLayoutEffect(() => {
    const storedMessages = loadChatsFromLocalStorage();
    if (storedMessages.length) {
      setChatMessages(storedMessages);
    } else {
      setChatMessages([
        {
          role: "assistant",
          content: "Hello! How can I assist you?",
          type: "text",
        },
      ]);
    }
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100vh",
          mt: 3,
          gap: 3,
          bgcolor: "background.default",
          position: "relative", // Added for positioning the back button
        }}
      >
        {/* Back Button - Added at top left */}
        <IconButton
          onClick={handleBackToHome}
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            color: "text.primary",
            zIndex: 10,
            backgroundColor: "primary.main",
            "&:hover": {
              backgroundColor: "#5B27A0",
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Typography
          sx={{
            fontSize: "40px",
            color: "text.primary",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}
        >
          EduVerse GPT
        </Typography>

        <Box sx={{ display: "flex", flex: 1, gap: 3 }}>
          <Box sx={{ display: { md: "flex", xs: "none", sm: "none" }, flex: 0.2, flexDirection: "column" }}>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: "80vh",
                bgcolor: "#2C2C3D",
                borderRadius: 5,
                flexDirection: "column",
                mx: 3,
              }}
            >
              <Typography sx={{ mx: "auto", fontFamily: "Work Sans", mt: 3, color: "text.primary" }}>
                Chat with EduVerse GPT
              </Typography>
              <Typography sx={{ mx: "auto", fontFamily: "Work Sans", my: 4, p: 3, color: "text.primary" }}>
                Educational Animated Video Generator for Your Prompts.
              </Typography>
              <Button
                onClick={handleDeleteChats}
                sx={{
                  width: "200px",
                  my: "auto",
                  color: "text.primary",
                  fontWeight: "700",
                  borderRadius: 3,
                  mx: "auto",
                  bgcolor: "primary.main",
                  ":hover": { bgcolor: "#5B27A0" },
                }}
              >
                Clear Conversation
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flex: { md: 0.8, xs: 1, sm: 1 },
              flexDirection: "column",
              px: 3,
              height: "80vh",
              overflow: "hidden",
            }}
          >
            <Box
              ref={chatContainerRef}
              sx={{
                width: "100%",
                height: "calc(100% - 100px)",
                borderRadius: 3,
                mx: "auto",
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
                scrollBehavior: "smooth",
                "&::-webkit-scrollbar": { width: "10px" },
                "&::-webkit-scrollbar-thumb": { backgroundColor: "#7C3AED", borderRadius: "10px" },
                "&::-webkit-scrollbar-track": { backgroundColor: "#2C2C3D" },
              }}
            >
              {chatMessages.map((chat, index) => (
                <ChatItem
                  key={index}
                  content={chat.content}
                  role={chat.role}
                  type={chat.type}
                  sx={{
                    alignSelf: chat.role === "user" ? "flex-end" : "flex-start",
                  }}
                />
              ))}
            </Box>

            <Box sx={{ display: "flex", gap: 2, mt: 2, width: "100%", alignItems: "center" }}>
              <textarea
                ref={inputRef}
                value={prompt}
                placeholder="Type a message"
                onKeyDown={handleKeyDown}
                onChange={(e) => setPrompt(e.target.value)}
                style={{
                  flex: 1,
                  padding: "15px",
                  borderRadius: "25px", // More rounded corners
                  border: "1px solid #7C3AED",
                  backgroundColor: "#2C2C3D",
                  color: "#FFF",
                  minHeight: "50px",
                  resize: "vertical",
                  fontSize: "16px",
                  outline: "none",
                }}
              />
              <IconButton
                onClick={handleSubmit}
                sx={{ 
                  bgcolor: "#7C3AED", 
                  ":hover": { bgcolor: "#5B27A0" },
                  width: "56px", 
                  height: "56px",
                  borderRadius: "50%", // Makes it perfectly round
                  marginLeft: "8px",
                }}
              >
                <IoMdSend color="#FFF" size={24} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Chat;