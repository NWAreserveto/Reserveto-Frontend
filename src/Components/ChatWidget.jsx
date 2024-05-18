// src/ChatWidget.js
import React, { useState } from "react";
import axios from "axios";
import "../styles/Chatwidget.scss";
import ChatIcon from "@mui/icons-material/Chat";
import { TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatWidget = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { user: "You", text: input };
    setMessages([...messages, newMessage]);

    try {
      const response = await axios.post("https://api.example.com/send", {
        message: input,
      });
      const botMessage = { user: "Bot", text: response.data.reply };
      setMessages([...messages, newMessage, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        user: "Bot",
        text: "مشکلی پیش آمده. دوباره تلاش کنید.",
      };
      setMessages([...messages, newMessage, errorMessage]);
    }

    setInput("");
  };

  return (
    <div className="chat-widget-container">
      <button className="chat-toggle-button" onClick={toggleChat}>
        <ChatIcon />
      </button>
      {showChat && (
        <div className="chat-widget">
          <div className="chat-header">با ما چت کن</div>
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${
                  msg.user === "You" ? "user" : "bot"
                }`}
              >
                <div className="message-box">
                  <strong>{msg.user}:</strong> {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="پیام خود را بنویسید..."
            />
            <button onClick={sendMessage}>
              <SendIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
