# llm-playground

LLM Application과 Agent Engineering을 학습하기 위한 최소한의 실험 환경입니다.

## 현재 구현

TypeScript 프로그램이 로컬 Ollama의 `qwen3:4b` 모델에 사용자 업무 문장을 전달하고, Ollama의 Structured Outputs 기능으로 JSON 응답을 받습니다. 응답은 JSON 파싱 후 Zod schema로 검증하며, 성공한 구조화 결과를 터미널에 출력합니다.

## 필요한 환경

- Node.js 20 이상
- npm
- 로컬에서 실행 중인 Ollama
- Ollama에 설치된 `qwen3:4b` 모델

Ollama 서버가 실행 중이고 `qwen3:4b`를 사용할 수 있어야 합니다.

```bash
ollama serve
ollama pull qwen3:4b
```

## 설치

```bash
npm install
```

## 실행

```bash
npm run dev
```

TypeScript 코드가 Ollama JavaScript client를 통해 로컬 Ollama에 요청을 보내고, `qwen3:4b`의 구조화된 업무 분류 결과를 터미널에 출력합니다. JSON 파싱 실패와 Zod validation 실패는 서로 구분된 오류로 표시됩니다.

## 타입 검사

```bash
npm run typecheck
```
