# AGENTS.md

## Scope

- Prefer small, focused changes.
- Do not add unnecessary abstractions, frameworks, or dependencies.
- Keep the project on TypeScript, the Ollama JavaScript client, and the local `qwen3:4b` model.
- Prefer free, local tools. Do not add another LLM provider unless explicitly requested.

## Implementation

- Keep testable pure logic separate from Ollama calls.
- Keep LLM calls and terminal output in the entry flow; keep parsing and validation independently testable.
- Do not add UI, web servers, databases, RAG, agents, or tool calling unless explicitly requested.

## Verification

- Run `npm test` after code changes.
- Run `npm run typecheck` after TypeScript changes.
- Run `npm run dev` when the Ollama request or terminal output flow changes and local Ollama is available.

## Git

- Before committing, check `git status`, review the commit-target files, and confirm no secrets, API keys, credentials, or unnecessary files are included.
- Do not commit or push unless explicitly requested.

## Handoff

- After implementation, report changed files and verification results.
