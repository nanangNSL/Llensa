from fastapi import APIRouter, UploadFile, File
from typing import List

router = APIRouter()

@router.post("/process")
async def process_document(file: UploadFile = File(...)):
    """
    Placeholder for VLM Document processing.
    """
    return {
        "filename": file.filename,
        "status": "received",
        "message": "VLM processing will be implemented here."
    }

@router.get("/")
async def list_documents():
    """
    Placeholder for listing processed documents.
    """
    return {"documents": []}
