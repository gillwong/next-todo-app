"use client";

import { Todo } from "@/app/home/components/todo-item";
import { Checkbox } from "@/components/ui/checkbox";
import { setTodoCompletion } from "@/lib/todos";
import { useState } from "react";

export default function TodoCheckbox({
  className,
  todo,
}: {
  className?: string;
  todo: Todo;
}) {
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);

  return (
    <Checkbox
      className={className}
      id={todo.id.toString()}
      onClick={() => {
        setTodoCompletion(todo.id, !isCompleted);
        setIsCompleted((state) => !state);
      }}
      checked={isCompleted}
    />
  );
}
