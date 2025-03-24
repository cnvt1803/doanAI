import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import "../styles/footer.css";
import logo from "../images/logo.png";
import logotruong from "../images/logotruong.png";
function Login() {
  const navigate = useNavigate();

  const handleclick = () => {
    navigate("/loginmain");
  };
  return (
    <div className="page-container">
      {/* Header */}
      <header className="header">
        <img src={logo} alt="Paws Logo" className="header-logo" />
      </header>
      <div className="login-container">
        <div className="login-box">
          <img src={logo} alt="Paws Logo" className="login-logo" />
          <div className="line"></div>
          <p className="login-text">Đăng nhập với tư cách</p>
          <button className="login-button" onClick={handleclick}>
            User
          </button>
          <button className="login-button" onClick={handleclick}>
            Admin
          </button>
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
}

export default Login;
