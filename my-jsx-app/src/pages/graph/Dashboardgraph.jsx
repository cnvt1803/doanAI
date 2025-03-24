import React, { useState, useEffect } from "react";
import "../../styles/graph/Dashboardgraph.css";
import grahp from "../../images/grahp.jpg";
import grahp2 from "../../images/graph2.png";
import grahp3 from "../../images/graph3.jpg";

const Dashboardp1 = () => {
  const [temperature, setTemperature] = useState(25);
  const [humidity, setHumidity] = useState(50);
  const [lights, setLights] = useState(2000);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5001/api/data");
        const data = await response.json();

        setTemperature(data.temperature);
        setHumidity(data.humidity);
        setLights(data.lights);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Cập nhật mỗi 5 giây

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      {/* Cột bên trái */}
      <div className="left-column">
        <div className="staticTemGraph">
          <h3>Statistics of Temperature</h3>
          <div className="chart-container">
            <p>
              {" "}
              =
              <img src={grahp2} alt="image" className="grahp" />
            </p>
          </div>
        </div>
        <div className="dashboard-container">
          <div className="sensor-card">
            <h3>Temperature</h3>
            <div className="gauge temperature">
              <span>{temperature}°C</span>
            </div>
          </div>

          <div className="sensor-card">
            <h3>Humidity</h3>
            <div className="gauge humidity">
              <span>{humidity}%</span>
            </div>
          </div>

          <div className="sensor-card">
            <h3>Light</h3>
            <div className="gauge light">
              <span>{lights} Lux</span>
            </div>
          </div>
        </div>
        <div className="note-container">
          <label className="note-label">Note:</label>
          <textarea
            className="note-input"
            placeholder="Enter your note here..."
          ></textarea>
        </div>
      </div>

      {/* Cột bên phải */}
      <div className="right-column">
        {/* Thẻ cảnh báo */}
        <div className="staticHum">
          <h3>Statistics of Humanity</h3>
          <div className="chart-container">
            <p>
              {" "}
              =
              <img src={grahp3} alt="image" className="grahp" />
            </p>
          </div>
        </div>

        {/* Giám sát sức khỏe */}
        <div className="staticLight">
          <h3>Statistics of Light</h3>
          <div className="chart-container">
            <p>
              {" "}
              =
              <img src={grahp} alt="image" className="grahp" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboardp1;
