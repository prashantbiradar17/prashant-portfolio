# Prashant Portfolio

This portfolio is built with **React + Vite + Tailwind CSS**.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Ask Me Anything (real-time AI)

The Ask Me section now supports real-time LLM answers.

Set these environment variables in a `.env` file:

```bash
VITE_OPENAI_API_KEY=your_api_key
VITE_OPENAI_MODEL=gpt-4o-mini
# Optional if using a compatible endpoint
VITE_OPENAI_BASE_URL=https://api.openai.com/v1
```

If no API key is present, the UI still works using a local fallback knowledge base for personal questions like education, courses, certificates, degree, height, and rating.
