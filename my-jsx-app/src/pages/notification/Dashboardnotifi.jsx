import React, { useState, useEffect } from "react";
import "../../styles/notification/Dashboardnotifi.css";
import image from "../../images/hill1.png";

const Dashboard = () => {
  const [temperature, setTemperature] = useState(25);
  const [notifications, setNotifications] = useState([]); // ✅ useState ở đây, không nằm trong useEffect

  useEffect(() => {
    const fetchUnreadNotifications = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/notifications/1/unread"
        );
        const data = await response.json();
        setNotifications(Array.isArray(data) ? data.slice(0, 7) : []); // Lấy tối đa 7 thông báo
      } catch (error) {
        console.error("Lỗi khi lấy danh sách thông báo chưa đọc:", error);
        setNotifications([]); // đảm bảo luôn là mảng
      }
    };

    const fetchTemperature = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/param_data/device/5/latest"
        );
        const data = await response.json();
        const tempValue = parseFloat(data.value);
        if (!isNaN(tempValue)) {
          setTemperature(tempValue);
        } else {
          console.error("Giá trị nhiệt độ không hợp lệ:", data.value);
        }
      } catch (error) {
        console.error("Lỗi khi lấy nhiệt độ:", error);
      }
    };

    fetchTemperature();
    fetchUnreadNotifications();

    const interval = setInterval(() => {
      fetchTemperature();
      fetchUnreadNotifications();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/notifications/${id}/read`,
        {
          method: "PUT",
        }
      );
      if (res.ok) {
        fetchUnreadNotifications(); // gọi lại danh sách chưa đọc
      }
    } catch (err) {
      console.error("Lỗi khi đánh dấu đã đọc:", err);
    }
  };

  return (
    <div className="dashboard">
      <div className="left-column">
        <div className="welcome-card">
          <div className="welcome-card-left">
            <h2 className="name">
              Hello, <span>Truong</span>!
            </h2>
            <p className="line1">
              Always be meticulous when taking care of your hamster.
            </p>
            <p className="linetext">🌡️ {temperature}°C Outdoor Temperature</p>
            <p className="linetext">☁️ Fuzzy cloudy weather</p>
          </div>
          <div className="welcome-card-right">
            <img src={image} alt="hill" className="hill" />
          </div>
        </div>
        <div className="hamster-room"></div>
      </div>

      <div className="right-column">
        <div className="warning-card-noti">
          <h3>⚠️ Warning:</h3>
          {notifications.length === 0 ? (
            <div className="warning-box-noti">Không có thông báo chưa đọc</div>
          ) : (
            notifications.map((noti, i) => (
              <div
                className="warning-box-noti"
                key={i}
                onClick={() => handleMarkAsRead(noti.id)}
                style={{ cursor: "pointer" }}
              >
                {noti.message}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
