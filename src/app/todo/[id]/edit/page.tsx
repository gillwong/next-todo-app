import { notFound } from "next/navigation";

import { Todo } from "@/lib/todos";

import EditTodoForm from "@/components/todo-forms/todo-edit-form";

import Todos from "@/models/todo";

export default async function EditTodoPage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);
  if (isNaN(id)) return notFound();

  let todo: Todo;
  try {
    todo = await Todos.getById(id);
  } catch (error) {
    return notFound();
  }
  return (
    <>
      <EditTodoForm todo={todo} />
    </>
  );
}
