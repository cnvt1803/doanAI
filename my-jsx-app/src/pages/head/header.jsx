import React, { useState, useEffect } from "react";
import "../../styles/head/Header.css";
import avar from "../../images/avar.jpeg";

const Header = () => {
  const [count, setCount] = useState(null);
  useEffect(() => {
    const fetchCountNoti = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/notifications/1/unread/count"
        );
        const data = await response.json();

        console.log("Unread notifications response:", data.unread_count);

        const count = parseInt(data.unread_count); // Vì là số nguyên
        if (!isNaN(count)) {
          setCount(count); // Giả sử bạn dùng useState để lưu
        } else {
          console.error("Invalid unread count value:", data.unread_count);
        }
      } catch (error) {
        console.error("Lỗi khi đếm thông báo", error);
      }
    };
    fetchCountNoti();
    const interval = setInterval(() => {
      fetchCountNoti();
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  const handleMarkAllAsRead = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/notifications/1/read_all", // Gửi yêu cầu PUT tới FastAPI
        {
          method: "PUT",
        }
      );
    } catch (error) {
      console.error("Lỗi khi đánh dấu tất cả thông báo là đã đọc:", error);
    }
  };

  return (
    <div className="headerp1">
      <input
        type="text"
        placeholder=" 🔍   Search Here..."
        className="search-box"
      />
      <div className="profile">
        <span className="notification_h" onClick={handleMarkAllAsRead}>
          🔔 {count > 0 && <span className="badge_h">{count}</span>}
        </span>
        <img src={avar} alt="User Avatar" className="avatar" />
        <span className="username">Hydekiri</span>
      </div>
    </div>
  );
};

export default Header;
