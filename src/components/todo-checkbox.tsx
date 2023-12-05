"use client";

import { useState } from "react";

import { Todo, setTodoCompletion } from "@/lib/todos";

import { Checkbox } from "@/components/ui/checkbox";

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
