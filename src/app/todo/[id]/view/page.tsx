import { notFound } from "next/navigation";

import { Todo, getTodo } from "@/lib/todos";

import TodoActions from "@/components/todo-details/todo-actions";
import TodoBody from "@/components/todo-details/todo-body";

export default async function TodoViewPage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);
  if (isNaN(id)) return notFound();

  let todo: Todo;
  try {
    todo = await getTodo(id);
  } catch (error) {
    return notFound();
  }
  return (
    <>
      <TodoBody todo={todo} />
      <TodoActions todo={todo} />
    </>
  );
}
