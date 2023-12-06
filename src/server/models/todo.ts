import dayjs, { Dayjs } from "dayjs";
import { z } from "zod";

export const todoSchema = z
  .object({
    id: z.number().positive().finite(),
    title: z
      .string({ required_error: "Title is required" })
      .trim()
      .min(1, { message: "Title must not be blank" })
      .max(140, { message: "Title must be less than 140 characters" }),
    isCompleted: z.boolean().default(false),
    description: z.string(),
    // https://github.com/colinhacks/zod/discussions/1259
    due: z.instanceof(dayjs as unknown as typeof Dayjs),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  })
  .partial({ description: true, due: true, priority: true });

export type Todo = z.infer<typeof todoSchema>;

export const todoDbSchema = todoSchema
  .omit({ isCompleted: true, due: true, priority: true })
  .required({ description: true })
  .extend({
    is_completed: z.boolean(),
    due: z.string().nullable(),
    priority: z.enum(["", "LOW", "MEDIUM", "HIGH"]),
  });

export type TodoDb = z.infer<typeof todoDbSchema>;

export class TodoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TodoError";
  }
}

export const todoJSONSchema = todoSchema
  .omit({ due: true })
  .extend({ due: z.string() });

export type TodoJSON = z.infer<typeof todoJSONSchema>;
