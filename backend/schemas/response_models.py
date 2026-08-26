"""Stable API response models shared by mock and future ML pipelines."""

from pydantic import BaseModel, Field


class ChannelScores(BaseModel):
    spatial: float = Field(ge=0, le=1)
    frequency: float = Field(ge=0, le=1)
    temporal: float = Field(ge=0, le=1)
    identity: float = Field(ge=0, le=1)


class AnalysisResponse(BaseModel):
    verdict: str
    confidence: float = Field(ge=0, le=1)
    scores: ChannelScores
    flagged_frames: list[int]
    heatmap_urls: list[str]
    report_text: str
