"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";

import type { Todo, TodoJSON } from "@/server/models/todo";
import { setTodoCompletion } from "@/utils/todo/services";

export default function TodoCheckbox({
  className,
  todo,
}: {
  className?: string;
  todo: Todo | TodoJSON;
}) {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);

  return (
    <Checkbox
      className={className}
      id={todo.id.toString()}
      onClick={async () => {
        const state = isCompleted;
        await setTodoCompletion(todo.id, !state);
        setIsCompleted(!state);
        router.refresh();
      }}
      checked={isCompleted}
    />
  );
}
