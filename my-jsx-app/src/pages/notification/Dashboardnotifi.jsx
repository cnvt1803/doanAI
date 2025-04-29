import React from "react";
import "../../styles/notification/Dashboardnotifi.css";
import image from "../../images/hill1.png";
const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Cột bên trái */}
      <div className="left-column">
        <div className="welcome-card">
          <div className="welcome-card-left">
            <h2 className="name">
              Hello, <span>Truong</span>!
            </h2>
            <p className="line1">
              Always be meticulous when taking care of your hamster.
            </p>
            <p className="linetext">🌡️ 25°C Outdoor Temperature</p>
            <p className="linetext">☁️ Fuzzy cloudy weather</p>
          </div>
          <div className="welcome-card-right">
            <h1>
              <img src={image} alt="image" className="hill" />
            </h1>
          </div>
        </div>

        <div className="hamster-room"></div>
      </div>

      {/* Cột bên phải */}
      <div className="right-column">
        <div className="warning-card-noti">
          <h3>⚠️ Warning:</h3>
          <div className="warning-box-noti">
            {" "}
            Trong phòng có nhiều hơn một hamster
          </div>
          <div className="warning-box-noti"> Thiết bị ổn định</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
