import { z } from "zod";

export const taskSchema = z.object({
  category: z.enum(["coding", "research", "writing", "planning", "other"]),
  priority: z.enum(["low", "medium", "high"]),
  summary: z.string(),
});

export const taskJsonSchema = z.toJSONSchema(taskSchema);

type Task = z.infer<typeof taskSchema>;

type ValidationSuccess = {
  success: true;
  data: Task;
};

type ValidationFailure =
  | {
      success: false;
      type: "json_parsing_failed";
      message: string;
    }
  | {
      success: false;
      type: "zod_validation_failed";
      issues: z.core.$ZodIssue[];
    };

export type TaskValidationResult = ValidationSuccess | ValidationFailure;

export function parseAndValidateTask(content: string): TaskValidationResult {
  let parsedContent: unknown;

  try {
    parsedContent = JSON.parse(content);
  } catch (error) {
    return {
      success: false,
      type: "json_parsing_failed",
      message: error instanceof Error ? error.message : String(error),
    };
  }

  const validationResult = taskSchema.safeParse(parsedContent);

  if (!validationResult.success) {
    return {
      success: false,
      type: "zod_validation_failed",
      issues: validationResult.error.issues,
    };
  }

  return {
    success: true,
    data: validationResult.data,
  };
}
