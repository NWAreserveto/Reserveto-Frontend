import React, { useState } from "react";
import "../styles/Chatwidget.scss"; // Create ChatWidget.css for styling
// import ChatIcon from "./ChatIcon";
import ChatIcon from "@mui/icons-material/Chat";
import { ChatBox, SenderMessage, ReceiverMessage } from "mui-chat-box";
import { TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const [write, setWrite] = useState(" ");
  const handleWriteChange = (e) => {
    setWrite(e.target.value);
  };

  const handleWrite = () => {};

  return (
    <div className={`chat-widget ${isOpen ? "open" : ""}`}>
      <button className="chat-toggle-btn" onClick={toggleChat}>
        <ChatIcon />
      </button>
      {isOpen && (
        <div className="chat-window">
          <ChatBox>
            <div style={{ display: "felx" }}>
              <TextField
                value={write}
                onChange={handleWriteChange}
                size="small"
                label="بنویس"
                sx={{
                  width: "70%",
                  "& label": {
                    transformOrigin: "right !important",
                    left: "inherit !important",
                    right: "1.75rem !important",
                    fontSize: "small",
                    color: "#807D7B",
                    fontWeight: 400,
                    overflow: "unset",
                  },
                  "& legend": {
                    textAlign: "right",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "10px",
                  },
                  "& label.Mui-focused": {
                    color: "var(--secondary-color) !important",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "yellow",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "var(--secondary-color) !important",
                    },
                    "&:hover fieldset": {
                      borderColor: "var(--secondary-color) !important",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "var(--secondary-color) !important",
                    },
                  },
                }}
              ></TextField>
              <Button
                sx={{ width: "25px", height: "25px", marginBottom: "-6px" }}
              >
                <SendIcon
                  sx={{
                    transform: "rotate(180deg)",
                    color: "var(--secondary-color)",
                  }}
                />
              </Button>
            </div>
          </ChatBox>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
