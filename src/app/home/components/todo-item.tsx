"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { HTMLAttributes, useState } from "react";
import PriorityIndicator from "./priority-indicator";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import { z } from "zod";
import Link from "next/link";

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

async function setTodoCompletion(id: number, isCompleted: boolean) {
  try {
    let response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/${id}`
    );
    const currentTodo = response.data as Todo;
    response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/${id}`,
      {
        ...currentTodo,
        isCompleted,
      }
    );
  } catch (error) {
    console.error({ error });
  }
}

export default function TodoItem({ className, todo, ...props }: TodoProps) {
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);

  return (
    <li
      className={cn("flex py-4 px-2 justify-between space-x-4", className)}
      {...props}
    >
      <div className="flex space-x-4 items-center">
        <Checkbox
          id={todo.id.toString()}
          onClick={() => {
            setTodoCompletion(todo.id, !isCompleted);
            setIsCompleted((state) => !state);
          }}
          checked={isCompleted}
        />
        <Link
          className="text-sm font-medium hover:underline underline-offset-2"
          href="/home"
        >
          {todo.title}
        </Link>
        {/* <Label htmlFor={todo.id.toString()}>{todo.title}</Label> */}
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
