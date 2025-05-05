import React, { useState, useEffect } from "react";
import "../../styles/health/Dashboardhealth.css";

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("object");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [hamsterCount, setHamsterCount] = useState(null);
  const [activity, setActivity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [behaviorResult, setBehaviorResult] = useState(null);
  const [hamsterinroom, setHamsterInRoom] = useState(null);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        detectHamster(file);
        predictActivity(file);
        fetchhamsterinroom();
      };
      reader.readAsDataURL(file);
    }
  };
  const handleAnalyze = () => {
    predictBehavior(); // Gọi API hành vi
  };

  const detectHamster = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);

    setIsLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/detect/count_hamster",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setHamsterCount(data.hamster_count);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const predictActivity = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);

    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/detect/predict/", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setActivity(data.activity); // Lưu kết quả dự đoán từ API
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    } finally {
      setIsLoading(false); // Set lại trạng thái loading
    }
  };

  const [temperature, setTemperature] = useState(25);
  const [humidity, setHumidity] = useState(50);
  const [lights, setLights] = useState(2000);
  const predictBehavior = async () => {
    const currentDate = new Date();
    const hour = currentDate.getHours();
    const minute = currentDate.getMinutes();
    const second = currentDate.getSeconds();

    const requestData = {
      hour,
      minute,
      second,
      temperature,
      humidity,
      light: lights,
    };

    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/ml/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const data = await response.json();
      setBehaviorResult(data.behavior); // lưu toàn bộ kết quả trả về
    } catch (error) {
      console.error("Lỗi khi gọi API hành vi:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchhamsterinroom = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/hamster_count/5?skip=0&limit=10"
      );
      const data = await response.json();
      setHamsterInRoom(data[0].count);
    } catch (error) {
      console.error("Lỗi khi lấy ánh sáng:", error);
    }
  };
  const sendNotification = async (message) => {
    try {
      await fetch("http://127.0.0.1:8000/notifications/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: 1,
          message,
        }),
      });
    } catch (error) {
      console.error("Lỗi khi gửi thông báo:", error);
    }
  };
  useEffect(() => {
    if (
      !activity ||
      hamsterCount === null ||
      hamsterinroom === null ||
      !behaviorResult
    )
      return;

    const reports = [];
    if (hamsterinroom > hamsterCount) {
      reports.push("Phát hiện thiếu hamster! Kiểm tra lại chuồng nuôi.");
    } else if (hamsterinroom < hamsterCount) {
      reports.push("Phát hiện thêm sinh vật trong phòng! Kiểm tra ngay.");
    }
    reports.push(`Hamster đang hoạt động: ${activity}`);

    if (activity !== behaviorResult) {
      reports.push(
        `Với điều kiện hiện tại, hamster thường ${behaviorResult}, nhưng hiện tại lại ${activity}.`
      );
    }

    reports.forEach(sendNotification);
  }, [activity, hamsterCount, hamsterinroom, behaviorResult]);

  useEffect(() => {
    console.log("🛠 useEffect chạy");
    const fetchTemperature = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/param_data/device/5/latest"
        );
        const data = await response.json();
        console.log("Humidity response:", data.value);
        setTemperature(Number(data.value));
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
        setHumidity(data.value);
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
        setLights(data.value);
      } catch (error) {
        console.error("Lỗi khi lấy ánh sáng:", error);
      }
    };
    fetchTemperature();
    fetchHumidity();
    fetchLight();
    const interval = setInterval(() => {
      fetchTemperature();
      fetchHumidity();
      fetchLight();
    }, 5000); // Cập nhật mỗi 5 giây

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      {/* Cột bên trái */}
      <div className="left-column">
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

        <div className="health-monitoring">
          <div className="header-ana">
            <h3>ANALYSIS</h3>
            <button className="analyze-btn" onClick={handleAnalyze}>
              Analyze ➔
            </button>
          </div>

          <div className="tabs-upload">
            <div className="tabs">
              <button
                className={selectedTab === "object" ? "active" : ""}
                onClick={() => setSelectedTab("object")}
              >
                Dynamic analysis
              </button>
            </div>

            <div className="upload">
              <input
                type="file"
                accept="image/*"
                id="upload"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              <label htmlFor="upload" className="upload-btn">
                Upload +
              </label>
            </div>
          </div>

          <div className="content">
            <div className="left-panel">
              {uploadedImage ? (
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="uploaded-img"
                />
              ) : (
                <div className="placeholder">Upload an image to analyze</div>
              )}
            </div>

            <div className="right-panel">
              <div className="result-box">
                <h4>Result</h4>
                {isLoading ? (
                  <div>Loading...</div>
                ) : (
                  <>
                    {hamsterCount !== null && (
                      <div className="result-item">
                        <span>Hamster Count: {hamsterCount}</span>
                      </div>
                    )}
                    {activity && (
                      <div className="result-item">
                        <span>Activity: {activity}</span>
                      </div>
                    )}
                    {behaviorResult && (
                      <div className="result-item">
                        <span>AI Predict: {behaviorResult}</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cột bên phải */}
      <div className="right-column">
        <div className="report-section">
          <h3>Report</h3>
          <select>
            <option>{new Date().toLocaleDateString()}</option>
          </select>
          <div className="report-list">
            {activity && (
              <div className="report-item">
                ⚡ Hamster đang hoạt động: {activity}
              </div>
            )}
            {hamsterCount !== null && hamsterinroom == hamsterCount && (
              <div className="report-item">
                ⚡ Có {hamsterCount} hamster trong phòng
              </div>
            )}
            {hamsterCount !== null && hamsterinroom > hamsterCount && (
              <div className="report-item">
                ⚡ Phát hiện thiếu hamster! Kiểm tra lại chuồng nuôi.
              </div>
            )}
            {hamsterCount !== null && hamsterinroom < hamsterCount && (
              <div className="report-item">
                ⚡ Phát hiện thêm sinh vật trong phòng! Kiểm tra ngay.
              </div>
            )}
            {activity && behaviorResult && activity === behaviorResult && (
              <div className="report-item">
                ⚡ Hamster đang hoạt động đúng theo thói quen.
              </div>
            )}

            {activity && behaviorResult && activity !== behaviorResult && (
              <div className="report-item">
                ⚡ Với điều kiện hiện tại, hamster thường {behaviorResult},
                nhưng hiện tại lại {activity}.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
