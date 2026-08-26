# De-Fake

De-Fake is a hackathon-ready deepfake detection prototype. Its interface evaluates four independent evidence channels and presents an explainable forensic result. The current backend returns realistic mock findings through the same API contract intended for the future ML pipeline.

## Project layout

```text
de-fake/
├── frontend/   React + Vite + Tailwind CSS
├── backend/    FastAPI service
├── model/      Placeholder ML pipeline interfaces
└── README.md
```

## Run the frontend

Requires a current Node.js release (Node 18 or newer recommended).

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

## Run the backend

Use a separate terminal and a Python 3.10+ environment.

```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

The API runs at `http://localhost:8000`. Check `GET /health` for readiness and open `http://localhost:8000/docs` for the interactive API documentation.

## Demo behavior

- Uploading a video sends it as multipart form data to `POST /analyze`.
- **Try a sample video** runs the same interface flow without requiring a local media file.
- If the local API is unavailable, the frontend uses the same sample response so the demo remains presentable.
- The report download is currently a text-based placeholder. Production PDF formatting can be added without changing the analysis response.

The `/model` package is currently stubbed. Its eventual model implementations will replace `backend/services/mock_pipeline.py`; the `/analyze` response contract should remain unchanged so the frontend requires no migration.
