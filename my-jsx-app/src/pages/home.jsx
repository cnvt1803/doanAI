import React from "react";
import "../styles/home.css";
import image from "../images/hamterrm.png";
import logo from "../images/logo.png";
import logotruong from "../images/logotruong.png";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();

  const handleGoNow = () => {
    navigate("/login");
  };
  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>
          <img src={logo} alt="logo" />
        </h1>
        <button className="login-btn" onClick={handleGoNow}>
          Đăng nhập
        </button>
      </div>

      {/* Content */}
      <div className="body">
        <div className="content-home">
          <h2 className="title-home">
            Trường đại học Bách Khoa - Đại học Quốc Gia TPHCM
          </h2>
          <h2 className="title1">Hamster Care</h2>
          <p className="subtitle">Dịch vụ chăm sóc Hamster</p>

          <p className="text-content">
            Nơi bạn có thể
            ................................................................................
            ....................................................................................................
            ....................................................................................................
          </p>
          <button className="button" onClick={handleGoNow}>
            Go Now!
          </button>
        </div>
        {/* Image */}
        <div className="image-container">
          <img src={image} className="image1" />
        </div>
      </div>
      <div className="footer">
        <div className="footer-section">
          <h3>Hamster Care</h3>
          <img src={logotruong} alt="Logo" className="footer-logo" />
        </div>
        <div className="footer-section">
          <h3>Địa chỉ</h3>
          <p>KTX khu B, ĐHQG HCM</p>
          <p>KTX khu A, ĐHQG HCM</p>
        </div>
        <div className="footer-section">
          <h3>Số điện thoại</h3>
          <p>0123 123 123</p>
          <p>0123 123 123</p>
        </div>
        <div className="footer-section">
          <h3>Email</h3>
          <p>xxx.Xxxxxx@hcmut.edu.vn</p>
          <p>abc.Abcdef@hcmut.edu.vn</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
