import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}

function isCodeBlock(str: string) {
  return (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  );
}

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const messageBlocks = extractCodeFromString(content);

  // Conditional background for messages
  const backgroundColor = role === "assistant" ? "#7C3AED" : "#9B59B6";

  return (
    <Box
      sx={{
        display: "flex",
        p: 2,
        gap: 2,
        borderRadius: 2,
        my: 1,
      }}
    >
      {/* Avatar based on role */}
      <Avatar sx={{ ml: "0" }}>
        {role === "assistant" ? (
          <img src="openai.png" alt="openai" width={"30px"} />
        ) : (
          <>
          </>
        )}
      </Avatar>
      <Box>
        {/* Content rendering */}
        {!messageBlocks && (
          <Typography
            sx={{
              fontSize: "20px",
              backgroundColor: backgroundColor,
              padding: "8px 16px",
              borderRadius: 2,
              maxWidth: "fit-content", // Ensure it wraps around the text
            }}
          >
            {content}
          </Typography>
        )}
        {/* If message has code blocks */}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block, index) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter
                key={index}
                style={coldarkDark}
                language="javascript"
                customStyle={{
                  backgroundColor: backgroundColor,
                  padding: "8px 16px",
                  borderRadius: "6px",
                  maxWidth: "fit-content",
                }}
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography
                key={index}
                sx={{
                  fontSize: "20px",
                  backgroundColor: backgroundColor,
                  padding: "8px 16px",
                  borderRadius: 2,
                  maxWidth: "fit-content",
                }}
              >
                {block}
              </Typography>
            )
          )}
      </Box>
    </Box>
  );
};

export default ChatItem;
