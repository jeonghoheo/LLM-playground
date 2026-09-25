import assert from "node:assert/strict";
import test from "node:test";
import { parseAndValidateTask } from "./task.js";

test("distinguishes JSON parsing failure", () => {
  const result = parseAndValidateTask("{ invalid json");

  assert.equal(result.success, false);
  if (!result.success) {
    assert.equal(result.type, "json_parsing_failed");
  }
});

test("distinguishes Zod validation failure", () => {
  const result = parseAndValidateTask(
    JSON.stringify({
      category: "coding",
      priority: "urgent",
      summary: "테스트",
    }),
  );

  assert.equal(result.success, false);
  if (!result.success) {
    assert.equal(result.type, "zod_validation_failed");
  }
});
