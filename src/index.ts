import ollama from "ollama";

const response = await ollama.chat({
  model: "qwen3:4b",
  think: false,
  stream: true,
  messages: [
    {
      role: "user",
      content: "TypeScript를 한 문장으로 설명해줘."
    }
  ]
});

for await (const chunk of response) {
  process.stdout.write(chunk.message.content);
}

process.stdout.write("\n");
