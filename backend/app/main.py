from fastapi import FastAPI
from app.controllers import user, device, param_data, data_analysis, hamster_behavior, notifications, hamster_count, ML
from app.jobs.jobs import scheduler

app = FastAPI()

# scheduler.start()

app.include_router(user.router)
app.include_router(device.router)
app.include_router(param_data.router)
app.include_router(data_analysis.router)
app.include_router(hamster_behavior.router)
app.include_router(notifications.router)
app.include_router(hamster_count.router)
app.include_router(ML.router)

@app.get("/")
def read_root():
    return {"message": "API is running"}
