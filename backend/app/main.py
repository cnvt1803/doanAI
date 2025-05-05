from fastapi import FastAPI
from app.controllers import user, device, param_data, data_analysis, hamster_behavior, notifications, hamster_count, ML, chatbot,  detect, behavior_detect
from app.jobs.jobs import scheduler
from flask_cors import CORS
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
# Thêm CORS middleware trước khi include routers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],     # Cho phép GET, POST, PUT, DELETE, OPTIONS…
    allow_headers=["*"],
)

# scheduler.start()

app.include_router(user.router)
app.include_router(device.router)
app.include_router(param_data.router)
app.include_router(data_analysis.router)
app.include_router(hamster_behavior.router)
app.include_router(notifications.router)
app.include_router(hamster_count.router)
app.include_router(ML.router)
app.include_router(chatbot.router)
app.include_router(detect.router)
app.include_router(behavior_detect.router)


@app.get("/")
def read_root():
    return {"message": "API is running"}
