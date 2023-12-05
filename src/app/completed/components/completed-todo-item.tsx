"use client";

import PriorityIndicator from "@/app/home/components/priority-indicator";
import { Todo } from "@/app/home/components/todo-item";
import { Checkbox } from "@/components/ui/checkbox";
import { setTodoCompletion } from "@/lib/todos";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import Link from "next/link";
import { Dispatch, HTMLAttributes, SetStateAction } from "react";

interface CompletedTodoItemProps extends HTMLAttributes<HTMLElement> {
  todo: Todo;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

export default function CompletedTodoItem({
  className,
  todo,
  setTodos,
  ...props
}: CompletedTodoItemProps) {
  return (
    <li
      className={cn("flex py-4 px-2 justify-between space-x-4", className)}
      {...props}
    >
      <div className="flex space-x-4 items-center">
        <Checkbox
          id={todo.id.toString()}
          onClick={() => {
            const newIsCompleted = !todo.isCompleted;
            setTodoCompletion(todo.id, newIsCompleted);
            setTodos((state) =>
              state.map((el) =>
                el.id !== todo.id
                  ? el
                  : ({ ...el, isCompleted: newIsCompleted } as Todo)
              )
            );
          }}
          checked={todo.isCompleted}
        />
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
