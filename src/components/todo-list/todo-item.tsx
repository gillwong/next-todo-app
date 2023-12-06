import dayjs from "dayjs";
import Link from "next/link";
import { HTMLAttributes } from "react";

import PriorityIndicator from "@/components/priority-indicator";
import TodoCheckbox from "@/components/todo-checkbox";

import { Todo } from "@/server/models/todo";
import { simplify } from "@/utils/todo/utils";
import { cn } from "@/utils/utils";

interface TodoItemProps extends HTMLAttributes<HTMLElement> {
  todo: Todo;
}

export default function TodoItem({ className, todo, ...props }: TodoItemProps) {
  return (
    <li
      className={cn("flex py-4 px-2 justify-between space-x-4", className)}
      {...props}
    >
      <div className="flex space-x-4 items-center">
        {/* Only plain objects can be passed to Client Components from Server Components */}
        <TodoCheckbox todo={simplify(todo)} />
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
