# MindCare AI

MindCare AI is a mental wellness web app that helps users check their current stress level, receive an AI-generated analysis, follow a simple improvement plan, and complete a final progress check.

The app offers two user paths from the home screen:

- A guided stress test inside the app
- A separate AI assistant flow that opens PromptOpinion in a new tab

## What the app does

The main in-app experience is designed as a short wellness journey:

1. Users answer a five-question stress assessment.
2. The frontend sends those answers to an AI agent endpoint.
3. The app shows a stress result with a score and generated guidance.
4. Users receive a weekly wellness plan based on the detected stress level.
5. A final check helps them reflect on progress after following the plan.

## How it works

### Frontend

The frontend is built with React, Vite, and React Router. It provides the full user flow across these pages:

- `Home`: introduces the product and offers both entry paths
- `StressTest`: collects answers and submits them for analysis
- `Results`: shows the AI-generated stress analysis and score
- `Schedule`: presents a recommended weekly plan
- `FinalCheck`: captures a follow-up self-check

The home page also includes a secondary AI option that opens the PromptOpinion assistant in a new browser tab instead of embedding it directly.

### Backend

The backend is a lightweight Express service that exposes a JSON-RPC endpoint at `/agent`.

Its role is to accept stress-analysis messages and return a valid agent-style response payload. The frontend uses this endpoint to request the text shown on the results page. A `.well-known/agent-card.json` endpoint is also exposed for agent discovery metadata.

## Tech stack

- React 19
- Vite
- React Router
- Tailwind CSS
- Express
- JSON-RPC style messaging

## Local development

### Run the frontend

```bash
cd client
npm install
npm run dev
```

### Run the backend

```bash
cd server
npm install
npm run dev
```

By default, the frontend sends agent requests to:

```text
https://agents-assemble.onrender.com/agent
```

To use a different backend during local development, set:

```text
VITE_AGENT_API_URL
```

## User flow summary

- Start on the landing page
- Take the in-app stress test or continue to the external AI assistant
- Review the AI-generated stress analysis
- Follow the suggested weekly plan
- Complete the final check

## Purpose

This project demonstrates a simple AI-assisted mental wellness experience: a clean frontend journey, a lightweight agent endpoint, and an alternative handoff to an external AI assistant when a dedicated conversational experience is needed.
