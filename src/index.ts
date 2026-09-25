import ollama from "ollama";
import { parseAndValidateTask, taskJsonSchema } from "./task.js";

async function main() {
  const response = await ollama.chat({
    model: "qwen3:4b",
    think: false,
    format: taskJsonSchema,
    messages: [
      {
        role: "user",
        content: `다음 업무 문장을 JSON 객체로 분류해줘.
JSON 객체만 반환하고 markdown code fence나 추가 설명은 포함하지 마.

필드 요구사항:
- category: coding, research, writing, planning, other 중 하나
- priority: low, medium, high 중 하나
- summary: 업무 내용을 요약한 문자열

업무 문장: 고객 문의 자동분류 기능 구현`,
      },
    ],
  });

  const validationResult = parseAndValidateTask(response.message.content);

  if (!validationResult.success) {
    if (validationResult.type === "json_parsing_failed") {
      console.error(`JSON parsing failed: ${validationResult.message}`);
    } else {
      console.error("Zod validation failed:", validationResult.issues);
    }

    process.exitCode = 1;
    return;
  }

  console.log(JSON.stringify(validationResult.data, null, 2));
}

await main();
