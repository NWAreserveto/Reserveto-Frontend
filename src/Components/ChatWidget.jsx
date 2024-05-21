import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Chatwidget.scss";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";

const ChatWidget = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const [chatId, setChatId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (showChat && !chatId) {
      createChat();
    }
  }, [showChat]);

  const createChat = async () => {
    try {
      const response = await axios.post(
        "https://reserveto-back.onrender.com/api/chats/",
        {
          text: "Initial message to create chat",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setChatId(response.data.chat_id);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const sendMessage = async () => {
    if (!input.trim() || !chatId) return;

    const newMessage = { user: "You", text: input };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");

    setBotTyping(true);

    try {
      const response = await axios.post(
        `https://reserveto-back.onrender.com/api/chats/${chatId}/messages/`,
        { text: input },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const botMessage = { user: "Bot", text: response.data.reply };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        user: "Bot",
        text: "مشکلی پیش آمده. دوباره تلاش کنید.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setBotTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
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
            {botTyping && (
              <div className="chat-message bot">
                <div className="message-box">
                  <strong>Bot:</strong> در حال نوشتن...
                </div>
              </div>
            )}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
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
