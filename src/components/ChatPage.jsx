import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../img/logo512.png";
import "../ChatPage.css";

const ChatPage = () => {
  const [activeChat, setActiveChat] = useState(1);
  const [messages, setMessages] = useState({});
  const [inputMessage, setInputMessage] = useState("");
  const [username, setUsername] = useState("You");

  const chats = [
    { id: 1, name: "Kate" },
    { id: 2, name: "Kirill" },
    { id: 3, name: "Eugene" },
  ];

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (inputMessage.trim() !== "") {
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newMessage = { text: inputMessage, time: timestamp, user: username };

      setMessages((prevMessages) => ({
        ...prevMessages,
        [activeChat]: [...(prevMessages[activeChat] || []), newMessage],
      }));

      setInputMessage("");
    }
  };

  const handleLogout = () => {
    alert("Вы вышли из аккаунта");
  };

  return (
    <div className="chat-page container-fluid">
      <div className="row">
        {/* Chat List */}
        <div className="col-md-3 chat-list">
          <h2>Chats</h2>
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${chat.id === activeChat ? "active" : ""}`}
              onClick={() => setActiveChat(chat.id)}
            >
              {chat.name}
            </div>
          ))}
        </div>

        {/* Chat Window */}
        <div className="col-md-6 chat-container">
          <h2>{chats.find((chat) => chat.id === activeChat)?.name}</h2>
          <div className="chat-messages">
            {(messages[activeChat] || []).map((message, index) => (
              <div
                key={index}
                className={`chat-message ${message.user === username ? "my-message" : "other-message"}`}
              >
                <strong>{message.user}</strong>
                <div className="message-text">{message.text}</div>
                <div className="message-time">{message.time}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="chat-form">
            <input
              type="text"
              className="input-field"
              placeholder="Type a message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button type="submit" className="btn">Send</button>
          </form>
        </div>

        {/* User Info */}
        <div className="col-md-3 user-info">
          <img src={Logo} alt="User Avatar" className="user-avatar" />
          <h3>{username}</h3>
          <button 
            className="btn sign-out mt-3" 
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
