import { notFound } from "next/navigation";

import { Todo } from "@/lib/todos";

import TodoCheckbox from "@/components/todo-checkbox";

import Todos from "@/models/todo";

export default async function TodoHeader({ todoId }: { todoId: number }) {
  let todo: Todo;
  try {
    todo = await Todos.getById(todoId);
  } catch (error) {
    return notFound();
  }

  return (
    <div className="flex items-center space-x-4 px-2">
      <TodoCheckbox className="h-6 w-6" todo={todo} />
      <h1 className="flex-shrink font-semibold text-lg">{todo.title}</h1>
    </div>
  );
}
