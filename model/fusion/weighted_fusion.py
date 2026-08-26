"""Weighted channel fusion interface."""


def fuse_scores(channel_results: dict, weights: dict | None = None) -> dict:
    """TODO: Calibrate and combine channel scores into a verdict and confidence."""
    return {"verdict": "Inconclusive - Manual Review", "confidence": 0.0}
