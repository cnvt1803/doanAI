import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

const URLApp = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Xin chào! Mình bạn muốn tìm bài viết gì?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages([...messages, { role: "user", text: input }]);
    setInput("");
    setLoading(true);

    try {
      // Gửi yêu cầu POST tới API Flask
      const response = await fetch("http://localhost:5001/api/search-google", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          query: input, // Truyền câu hỏi từ input
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const { results } = data;

        // Chuyển kết quả tìm kiếm thành tin nhắn
        const resultMessages = results.map((result) => ({
          role: "assistant",
          text: `<a href="${result.url}" target="_blank">${result.title}</a>`,
        }));

        setMessages((prevMessages) => [...prevMessages, ...resultMessages]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "assistant", text: data.error },
        ]);
      }
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", text: "Đã xảy ra lỗi khi tìm kiếm." },
      ]);
    } finally {
      setLoading(false);
    }
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
              <div
                className="bubble"
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
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

export default URLApp;
