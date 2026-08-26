"""Drop-in mock implementation of the future ML analysis service."""

import asyncio

from fastapi import UploadFile

from schemas.response_models import AnalysisResponse, ChannelScores


async def run_mock_pipeline(file: UploadFile) -> AnalysisResponse:
    """Return realistic sample findings while preserving the production API shape."""
    await file.read(1)  # Validate that the multipart stream is readable without storing it.
    await asyncio.sleep(0.35)
    return AnalysisResponse(
        verdict="Likely Manipulated",
        confidence=0.78,
        scores=ChannelScores(
            spatial=0.82,
            frequency=0.61,
            temporal=0.70,
            identity=0.55,
        ),
        flagged_frames=[12, 45, 90],
        heatmap_urls=["/static/frame12_heatmap.png"],
        report_text=(
            "The analysis identified elevated spatial boundary artifacts around the "
            "facial region and moderate temporal inconsistencies across adjacent frames. "
            "Frequency-domain signals show a weaker but notable synthetic signature. "
            "Identity embeddings drift beyond expected intra-person variance at several "
            "points. Together, these signals indicate likely manipulation; manual review "
            "of flagged frames 12, 45, and 90 is recommended."
        ),
    )
