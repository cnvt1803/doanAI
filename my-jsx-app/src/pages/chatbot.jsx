import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

const ChatApp = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Xin chào! Mình có thể giúp gì cho bạn?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSend = async () => {
    if (input.trim()) {
      const quest = input.trim();
      setMessages((prev) => [...prev, { role: "user", text: input }]);
      setInput("");
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5001/api/ask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: quest }),
        });

        if (!response.ok) {
          throw new Error("Có lỗi khi gửi yêu cầu");
        }

        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: data.answer || "Đã có lỗi, thử lại sau." },
        ]);
      } catch (error) {
        console.error("Có lỗi xảy ra khi gửi yêu cầu:", error);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", text: "Không thể nhận được phản hồi." },
        ]);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar-chat">
        <button
          className="sidebar-button-chat"
          onClick={() => handleNavigation("/chatbot")}
        >
          Hỏi đáp
        </button>
        <button
          className="sidebar-button-chat"
          onClick={() => handleNavigation("/chatbottofind")}
        >
          Tìm kiếm bài viết
        </button>
        <button
          className="sidebar-button-chat-return"
          onClick={() => handleNavigation("/page1")}
        >
          Quay về
        </button>
      </div>

      {/* Chat container */}
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.role}`}>
              <div className="bubble">{msg.text}</div>
            </div>
          ))}
          {loading && (
            <div className="message assistant">
              <div className="bubble">Đang trả lời...</div>
            </div>
          )}
        </div>
        <div className="chat-input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập tin nhắn..."
            disabled={loading}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <button type="button" onClick={handleSend} disabled={loading}>
            {loading ? "..." : "➤"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
