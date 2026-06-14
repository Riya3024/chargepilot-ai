from fastapi import APIRouter

from app.services.chat_service import fleet_chat


router = APIRouter()



@router.post("/")
def chat(data: dict):


    answer = fleet_chat(

        data.get("question",""),

        data.get("fleet",{})

    )


    return {

        "answer": answer

    }