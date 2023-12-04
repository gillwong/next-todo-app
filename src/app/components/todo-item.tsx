"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { HTMLAttributes, useState } from "react";
import PriorityIndicator from "./priority-indicator";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";

export type Todo = {
  id: number;
  title: string;
  isCompleted: boolean;
  description?: string;
  due?: Dayjs;
  priority?: "HIGH" | "MEDIUM" | "LOW";
};

interface TodoProps extends HTMLAttributes<HTMLElement> {
  todo: Todo;
}

async function setTodoCompletion(id: number, isCompleted: boolean) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/${id}`
    );
    const currentTodo = response.data as Todo;
    await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/${id}`, {
      ...currentTodo,
      isCompleted,
    });
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
        <Label htmlFor={todo.id.toString()}>{todo.title}</Label>
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
