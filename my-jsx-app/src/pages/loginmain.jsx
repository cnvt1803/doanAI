import React, { useState } from "react";
import "../styles/loginmain.css";
import image from "../images/loginimage.png";
import logo from "../images/logo.png";
import logotruong from "../images/logotruong.png";

const LoginText = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>
          <img src={logo} alt="logo" />
        </h1>
      </div>

      {/* Content */}
      <div className="body">
        <div className="content">
          <h2 className="title">
            Trường đại học Bách Khoa - Đại học Quốc Gia TPHCM
          </h2>
          <h2 className="title1">Hamster Care</h2>
          <h1>
            <img src={image} alt="image" className="imagelogin" />
          </h1>
        </div>

        {/* Form đăng nhập */}
        <div className="login-box">
          <h2 className="login-title">ĐĂNG NHẬP</h2>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              placeholder="abcdef@hcmut.edu.vn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Mật khẩu</label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="remember-forgot">
              <div className="remember">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Ghi nhớ đăng nhập</label>
              </div>
              <a href="#">Quên mật khẩu?</a>
            </div>

            <button type="submit" className="login-button">
              Đăng nhập
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
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

export default LoginText;
