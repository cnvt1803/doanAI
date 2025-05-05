import React, { useState, useEffect } from "react";
import "../../styles/graph/Dashboardgraph.css";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboardp1 = () => {
  const [temperature, setTemperature] = useState(28.2);
  const [humidity, setHumidity] = useState(57.2);
  const [lights, setLights] = useState(2342);
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [lightData, setLightData] = useState([]);

  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/param_data/device/5/latest"
        );
        const data = await response.json();
        console.log("Temperature response:", data.value);
        const tempValue = parseFloat(data.value); // Sử dụng parseFloat để chuyển thành số thực
        if (!isNaN(tempValue)) {
          setTemperature(tempValue);
        } else {
          console.error("Invalid temperature value:", data.value);
        }
      } catch (error) {
        console.error("Lỗi khi lấy nhiệt độ:", error);
      }
    };

    const fetchHumidity = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/param_data/device/7/latest"
        );
        const data = await response.json();
        console.log("Humidity response:", data.value);
        const humidityValue = parseFloat(data.value); // Chuyển thành số thực
        if (!isNaN(humidityValue)) {
          setHumidity(humidityValue);
        } else {
          console.error("Invalid humidity value:", data.value);
        }
      } catch (error) {
        console.error("Lỗi khi lấy độ ẩm:", error);
      }
    };

    const fetchLight = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/param_data/device/8/latest"
        );
        const data = await response.json();
        console.log("Light response:", data.value);
        const lightValue = parseFloat(data.value); // Chuyển thành số thực
        if (!isNaN(lightValue)) {
          setLights(lightValue);
        } else {
          console.error("Invalid light value:", data.value);
        }
      } catch (error) {
        console.error("Lỗi khi lấy ánh sáng:", error);
      }
    };
    const fetchTemperatureChart = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/param_data/device/5/latest-list"
        );
        const { values, timestamps } = response.data;
        const formattedData = values.map((val, index) => ({
          time: new Date(timestamps[index]).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          value: val,
        }));
        setTemperatureData(formattedData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu biểu đồ nhiệt độ:", error);
      }
    };
    const fetchHumidityChart = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/param_data/device/7/latest-list"
        );
        const { values, timestamps } = response.data;
        const formattedData = values.map((val, index) => ({
          time: new Date(timestamps[index]).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          value: val,
        }));
        setHumidityData(formattedData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu biểu đồ độ ẩm:", error);
      }
    };
    const fetchlightChart = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/param_data/device/8/latest-list"
        );
        const { values, timestamps } = response.data;
        const formattedData = values.map((val, index) => ({
          time: new Date(timestamps[index]).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          value: val,
        }));
        setLightData(formattedData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu biểu đồ ánh sáng:", error);
      }
    };

    fetchTemperature();
    fetchHumidity();
    fetchLight();
    fetchTemperatureChart();
    fetchHumidityChart();
    fetchlightChart();
    const interval = setInterval(() => {
      fetchTemperature();
      fetchHumidity();
      fetchLight();
      fetchTemperatureChart();
      fetchHumidityChart();
      fetchlightChart();
    }, 5000); // Cập nhật mỗi 5 giây

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-GR">
      {/* Cột bên trái */}
      <div className="left-column-GR">
        <div className="staticTemGraph">
          <h3>Statistics of Temperature</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#ff7300"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
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
      <div className="right-column-GR">
        {/* Thẻ cảnh báo */}
        <div className="staticHum">
          <h3>Statistics of Humanity</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={humidityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#00bcd4"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Giám sát sức khỏe */}
        <div className="staticLight">
          <h3>Statistics of Light</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lightData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#00bcd4"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboardp1;
