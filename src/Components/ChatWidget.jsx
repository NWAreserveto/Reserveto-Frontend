import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import style from "../styles/Chatwidget.module.scss";

const ChatWidget = () => {
  const [showChat, setShowChat] = useState(false);
  const [chats, setChats] = useState({});
  const [currentChatId, setCurrentChatId] = useState(null);
  const [input, setInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const chatBodyRef = useRef(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (showChat && !currentChatId) {
      createChat();
    }
  }, [showChat]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chats, currentChatId, botTyping]);

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
      const newChatId = response.data.chat_id;
      setChats((prevChats) => ({
        ...prevChats,
        [newChatId]: [],
      }));
      setCurrentChatId(newChatId);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const sendMessage = async () => {
    if (!input.trim() || !currentChatId) return;

    const newMessage = { user: "You", text: input };
    setChats((prevChats) => ({
      ...prevChats,
      [currentChatId]: [...prevChats[currentChatId], newMessage],
    }));
    setInput("");

    setBotTyping(true);

    try {
      const response = await axios.post(
        `https://reserveto-back.onrender.com/api/chats/${currentChatId}/messages/`,
        { text: input },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const botMessage = { user: "Bot", text: response.data.reply };
      setChats((prevChats) => ({
        ...prevChats,
        [currentChatId]: [...prevChats[currentChatId], botMessage],
      }));
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        user: "Bot",
        text: "مشکلی پیش آمده. دوباره تلاش کنید.",
      };
      setChats((prevChats) => ({
        ...prevChats,
        [currentChatId]: [...prevChats[currentChatId], errorMessage],
      }));
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

  const switchChat = (chatId) => {
    setCurrentChatId(chatId);
  };

  return (
    <div className={style.chatWidgetContainer}>
      <button className={style.chatToggleButton} onClick={toggleChat}>
        <ChatIcon />
      </button>
      {showChat && (
        <div className={style.chatWidget}>
          <div className={style.chatSidebar}>
            <button onClick={createChat} className={style.newChatButton}>
              چت جدید
            </button>
            <div className={style.chatList}>
              {Object.keys(chats).map((chatId) => (
                <div
                  key={chatId}
                  onClick={() => switchChat(chatId)}
                  className={`${style.chatListItem} ${
                    currentChatId === chatId ? style.activeChat : ""
                  }`}
                >
                  چت {chatId}
                </div>
              ))}
            </div>
          </div>
          {currentChatId && (
            <>
              <div className={style.chatHeader}>
                <Stack direction="row" spacing={1}>
                  <Chip
                    label="رزرو چیجوریه؟"
                    onClick={() => handleClick("رزرو چیجوریه؟")}
                    className={style.chip}
                  />
                  <Chip
                    label="لغو رزرو"
                    onClick={() => handleClick("شرایط لغو رزرو")}
                    className={style.chip}
                  />
                  <Chip
                    label="نحوه پرداخت"
                    onClick={() => handleClick("نحوه پرداخت")}
                    className={style.chip}
                  />
                </Stack>
              </div>
              <div className={style.chatBody} ref={chatBodyRef}>
                {chats[currentChatId]?.map((msg, index) => (
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
                  className={style.chatInput}
                />
                <button onClick={sendMessage} className={style.sendButton}>
                  <SendIcon sx={{ transform: "rotate(180deg)" }} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
