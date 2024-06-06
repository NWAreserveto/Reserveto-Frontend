import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import style from "../styles/Chatwidget.module.scss";

const ChatWidget = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const [chatId, setChatId] = useState(null);
  const chatBodyRef = useRef(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (showChat && !chatId) {
      createChat();
    }
  }, [showChat]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, botTyping]);

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

  const handleClick = (label) => {
    setInput(label);
  };

  return (
    <div className={style.chatWidgetContainer}>
      <button className={style.chatToggleButton} onClick={toggleChat}>
        <ChatIcon />
      </button>
      {showChat && (
        <div className={style.chatWidget}>
          <div className={style.chatHeader}>
            <Stack direction="row" spacing={0}>
              <Chip
                label="رزرو چیجوریه؟"
                onClick={() => handleClick("رزرو چیجوریه؟")}
                sx={{ color: "white" }}
              />
              <Chip
                label="لغو رزرو"
                onClick={() => handleClick("شرایط لغو رزرو")}
                sx={{ color: "white" }}
              />
              <Chip
                label="نحوه پرداخت"
                onClick={() => handleClick("نحوه پرداخت")}
                sx={{ color: "white" }}
              />
            </Stack>
          </div>
          <div className={style.chatBody} ref={chatBodyRef}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${style.chatMessage} ${
                  msg.user === "You" ? style.user : style.bot
                }`}
              >
                <div className={style.messageBox}>
                  <strong>{msg.user}:</strong> {msg.text}
                </div>
              </div>
            ))}
            {botTyping && (
              <div className={style.chatMessageBot}>
                <div className={style.messageBox}>
                  <strong>Bot:</strong>
                  <span className={style.typingIndicator}>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className={style.chatFooter}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="پیام خود را بنویسید..."
            />
            <button onClick={sendMessage}>
              <SendIcon sx={{ transform: "rotate(180deg)" }} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
