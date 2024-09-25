import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import toast from "react-hot-toast";
import axios from "axios";
import { BASEURL } from "./constants";

// Define theme with #7C3AED as the primary color
const theme = createTheme({
  palette: {
    primary: {
      main: "#7C3AED", // Set primary color
    },
    background: {
      default: "#1E1E2D", // Background for the entire app
    },
    text: {
      primary: "#FFFFFF", // White for primary text color
    },
  },
  typography: {
    fontFamily: "Work Sans, sans-serif", // Global font family
  },
});

const Chat = () => {
  const inputRef = useRef(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null); // Ref for the chat container
  const [chatMessages, setChatMessages] = useState([]);
  const [prompt, setPrompt] = useState<string>("");


  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage = { role: "user", content, type: "text" };
    setChatMessages((prev) => [...prev, newMessage]);
    console.log("yoyo came inside handle submit")
    try{
      console.log("yoyoyoyoy try")
      const formattedCode = content
            .replace(/\\/g, '\\\\') // Escape backslashes
            .replace(/"/g, '\\"')   // Escape double quotes
            .replace(/\n/g, '\\n'); // Escape newline characters
      const resp = await axios.post(`${BASEURL}v2/render`, {
        code: prompt,
        filename: "frontend.mp4"
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("yoyoyoyoy requested")
      if(resp.data.video_url){
        const newMessage = { role: "user", content, type: "text" };
        // setChatMessages((prev) => [...prev, newMessage]);
        const videoMessage = {
          role: "assistant",
          content: resp.data.video_url,
          type: "video",
        };
        setChatMessages((prev) => [...prev, videoMessage]);

      }
    }catch(err){
      console.log(err)
    }

   

    // Show video message if input is "arjun"
    if (content.toLowerCase() === "arjun") {
      const videoMessage = {
        role: "assistant",
        content:
          "https://myawsstestings3.s3.eu-north-1.amazonaws.com/Video+Files/1+h.mp4",
        type: "video",
      };
      setChatMessages((prev) => [...prev, videoMessage]);
    } else {
      // Simulate a dummy response
      // const dummyResponse = {
      //   role: "assistant",
      //   content: "response", // Dummy response
      //   type: "text",
      // };
      // setChatMessages((prev) => [...prev, dummyResponse]);
    }
  };

  const handleDeleteChats = () => {
    // Clear the messages state
    setChatMessages([]); // Clear the messages

    // Show success toast
    toast.success("Deleted Chats Successfully", { id: "deletechats" });

    // Scroll to the top after clearing messages
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0; // Set to 0 after clearing
    }
  };

  useLayoutEffect(() => {
    // Simulate loading chats
    const loadChats = async () => {
      toast.loading("Loading Chats", { id: "loadchats" });
      // Simulated chat messages
      const initialMessages = [
        {
          role: "assistant",
          content: "Hello! How can I assist you?",
          type: "text",
        },
      ];
      setChatMessages(initialMessages);
      toast.success("Successfully loaded chats", { id: "loadchats" });

      // Scroll to the bottom after loading chats
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    };

    loadChats().catch((err) => {
      console.log(err);
      toast.error("Loading Failed", { id: "loadchats" });
    });
  }, []);

  // Effect to scroll to the bottom whenever chatMessages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Function to handle key down event
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default behavior of Enter key
      handleSubmit(); // Call handleSubmit to send the message
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column", // Move EduVerse GPT to the top
          width: "100%",
          height: "100vh", // Full height for the chatbox
          mt: 3,
          gap: 3,
          bgcolor: "background.default", // Apply theme background color
        }}
      >
        {/* EduVerse GPT heading at the top */}
        <Typography
          sx={{
            fontSize: "40px",
            color: "text.primary", // Use theme text color
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}
        >
          EduVerse GPT
        </Typography>

        <Box
          sx={{
            display: "flex",
            flex: 1, // Take up all available space
            gap: 3,
          }}
        >
          <Box
            sx={{
              display: { md: "flex", xs: "none", sm: "none" },
              flex: 0.2,
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: "80vh", // Match height with chatbox
                bgcolor: "#2C2C3D", // Dark background for the side panel
                borderRadius: 5,
                flexDirection: "column",
                mx: 3,
              }}
            >
              <Typography
                sx={{
                  mx: "auto",
                  fontFamily: "Work Sans",
                  mt: 3,
                  color: "text.primary",
                }}
              >
                Chat with EduVerse GPT
              </Typography>
              <Typography
                sx={{
                  mx: "auto",
                  fontFamily: "Work Sans",
                  my: 4,
                  p: 3,
                  color: "text.primary",
                }}
              >
                Educational Animated Video Generator for Your Prompts.
              </Typography>
              <Button
                onClick={handleDeleteChats}
                sx={{
                  width: "200px",
                  my: "auto",
                  color: "text.primary", // Text color using theme
                  fontWeight: "700",
                  borderRadius: 3,
                  mx: "auto",
                  bgcolor: "primary.main", // Primary color from theme
                  ":hover": {
                    bgcolor: "#5B27A0", // Darker shade for hover
                  },
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
              height: "80vh", // Chat and video height
              overflow: "hidden",
            }}
          >
            <Box
              ref={chatContainerRef} // Attach the ref to the chat container
              sx={{
                width: "100%",
                height: "calc(100% - 100px)", // Adjust height to fit within container
                borderRadius: 3,
                mx: "auto",
                display: "flex",
                flexDirection: "column",
                overflowY: "auto", // Enable scrolling for long chat
                scrollBehavior: "smooth",
                "&::-webkit-scrollbar": {
                  width: "10px", // Width of the scrollbar
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#7C3AED", // Scrollbar color
                  borderRadius: "10px", // Rounded corners
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "#2C2C3D", // Track color
                },
              }}
            >
              {chatMessages.map((chat, index) =>
                chat.type === "video" ? (
                  <video
                    key={index}
                    controls
                    style={{
                      width: "100%",
                      maxHeight: "calc(100% - 20px)", // Scale video to fit
                      objectFit: "contain", // Contain within bounds
                    }}
                  >
                    <source src={chat.content} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <ChatItem
                    content={chat.content}
                    role={chat.role}
                    key={index}
                  />
                )
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                mt: 2,
                width: "100%",
              }}
            >
              <textarea
                ref={inputRef}
                placeholder="Type a message"
                // onKeyDown={handleKeyDown}
                onChange={(e) => {setPrompt(e.target.value)}}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #7C3AED",
                  backgroundColor: "#2C2C3D",
                  color: "#FFF",
                }}
              />
              <IconButton
                onClick={handleSubmit}
                sx={{
                  bgcolor: "#7C3AED",
                  ":hover": {
                    bgcolor: "#5B27A0",
                  },
                }}
              >
                <IoMdSend color="#FFF" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Chat;
  