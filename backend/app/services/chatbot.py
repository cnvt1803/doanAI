# app/services/intelligent_assistant_service.py

import google.generativeai as genai
from serpapi import GoogleSearch

# Cấu hình API key
SERPAPI_API_KEY = ""
GOOGLE_API_KEY = ""

genai.configure(api_key=GOOGLE_API_KEY)
model_name = "gemini-1.5-pro"


def generate_answer(question: str, chat_history: list) -> str:
    model = genai.GenerativeModel(model_name=model_name)

    history_formatted = []
    for turn in chat_history:
        role = "user" if turn["role"] == "user" else "model"
        history_formatted.append({"role": role, "parts": [turn["content"]]})

    history_formatted.append({"role": "user", "parts": [question]})
    response = model.generate_content(history_formatted)
    answer = response.text

    chat_history.append({"role": "user", "content": question})
    chat_history.append({"role": "assistant", "content": answer})

    return answer


def search_urls_from_google(query: str) -> list:
    params = {
        "engine": "google",
        "q": query,
        "api_key": SERPAPI_API_KEY
    }

    search = GoogleSearch(params)
    results = search.get_dict()

    return [
        {"title": item["title"], "url": item["link"]}
        for item in results.get("organic_results", [])
    ]
