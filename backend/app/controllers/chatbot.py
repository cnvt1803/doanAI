from fastapi import APIRouter, HTTPException, Form
from pydantic import BaseModel
from app.services.chatbot import generate_answer, search_urls_from_google


router = APIRouter(prefix="/api", tags=["Intelligent Assistant"])

chat_history = []


class Question(BaseModel):
    question: str


@router.post("/ask")
def ask_question(data: Question):
    if not data.question:
        raise HTTPException(
            status_code=400, detail="Câu hỏi không được để trống")

    try:
        answer = generate_answer(data.question, chat_history)
        return {"answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/search-google")
def search_google(query: str = Form(...)):
    if not query.strip():
        raise HTTPException(
            status_code=400, detail="Câu hỏi tìm kiếm không được để trống")

    try:
        results = search_urls_from_google(query)
        if not results:
            raise HTTPException(
                status_code=404, detail="Không tìm thấy kết quả")
        return {"status": "success", "results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Lỗi tìm kiếm: {str(e)}")
