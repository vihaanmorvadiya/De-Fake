"""Video analysis API routes."""

from fastapi import APIRouter, File, HTTPException, UploadFile

from schemas.response_models import AnalysisResponse
from services.mock_pipeline import run_mock_pipeline

router = APIRouter(tags=["analysis"])


@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_video(file: UploadFile = File(...)) -> AnalysisResponse:
    """Accept a video and return results using the stable analysis contract."""
    if file.content_type and not file.content_type.startswith("video/"):
        raise HTTPException(status_code=415, detail="Uploaded file must be a video")
    return await run_mock_pipeline(file)
