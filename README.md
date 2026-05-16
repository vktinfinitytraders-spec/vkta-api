# VKTA API

VKTA Backend API for VKT Infinity Traders.

## Requirements
- Node.js (>=16)

## Setup
1. Clone the repository
   ```bash
   git clone https://github.com/vktinfinitytraders-spec/vkta-api.git
   cd vkta-api
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Create a `.env` file from the example and set your OpenAI API key
   ```bash
   cp .env.example .env
   # then edit .env and set OPENAI_API_KEY
   ```

## Run
- Start production server:
  ```bash
  npm start
  ```
- Start development server (auto-restarts with changes):
  ```bash
  npm run dev
  ```

## Environment
Use `.env` to set the following variables (see `.env.example`):
- OPENAI_API_KEY - Your OpenAI API key
- OPENAI_MODEL - Optional model name (default: gpt-4o-mini)
- PORT - Optional port (default: 3000)

## API
- GET / -> basic health/status
- POST /api/vkta-agent -> chat endpoint (accepts JSON with `messages` array)

## Notes
- The server uses ES modules ("type": "module").
- Treat outputs as drafts; follow company rules in SYSTEM_PROMPT.
