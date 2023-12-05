import { cn } from "@/lib/utils";
import { HTMLAttributes, useState } from "react";
import PriorityIndicator from "./priority-indicator";
import dayjs, { Dayjs } from "dayjs";
import { z } from "zod";
import Link from "next/link";
import TodoCheckbox from "@/app/components/todo-checkbox";

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
    priority: z.enum(["HIGH", "MEDIUM", "LOW"]),
  })
  .partial({ description: true, due: true, priority: true });

export type Todo = z.infer<typeof todoSchema>;

interface TodoProps extends HTMLAttributes<HTMLElement> {
  todo: Todo;
}

export default function TodoItem({ className, todo, ...props }: TodoProps) {
  return (
    <li
      className={cn("flex py-4 px-2 justify-between space-x-4", className)}
      {...props}
    >
      <div className="flex space-x-4 items-center">
        <TodoCheckbox todo={todo} />
        <Link
          className="text-sm font-medium hover:underline underline-offset-2"
          href={`/todo/${todo.id}/view`}
        >
          {todo.title}
        </Link>
      </div>
      <div className="flex space-x-2 items-center">
        <p className="text-sm">
          {todo.due ? dayjs(todo.due).format("D/MM") : "-"}
        </p>
        <PriorityIndicator priority={todo.priority} />
      </div>
    </li>
  );
}
