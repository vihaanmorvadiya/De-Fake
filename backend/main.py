"""FastAPI entry point for the De-Fake prototype."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.analyze import router as analyze_router

app = FastAPI(title="De-Fake API", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(analyze_router)


@app.get("/health")
async def health() -> dict[str, str]:
    """Return a lightweight service readiness response."""
    return {"status": "ok"}
