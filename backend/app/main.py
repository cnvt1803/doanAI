from fastapi import FastAPI
from app.controllers import user, device, param_data

app = FastAPI()

app.include_router(user.router)
app.include_router(device.router)
app.include_router(param_data.router)

@app.get("/")
def read_root():
    return {"message": "API is running"}
