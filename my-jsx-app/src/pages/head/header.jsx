import React from "react";
import "../../styles/head/Header.css";
import avar from "../../images/avar.jpeg";

const Header = () => {
  return (
    <div className="headerp1">
      <input
        type="text"
        placeholder=" 🔍   Search Here..."
        className="search-box"
      />
      <div className="profile">
        <span className="notification_h">
          🔔 <span className="badge_h">2</span>
        </span>
        <img src={avar} alt="User Avatar" className="avatar" />
        <span className="username">Hydekiri</span>
      </div>
    </div>
  );
};

export default Header;
