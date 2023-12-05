import TodoBody from "./components/todo-body";
import TodoActions from "./components/todo-actions";
import { notFound } from "next/navigation";
import { getTodo } from "@/lib/todos";
import { Todo } from "@/app/home/components/todo-item";

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
