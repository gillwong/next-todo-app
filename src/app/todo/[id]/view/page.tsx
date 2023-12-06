import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import TodoActions from "@/components/todo-details/todo-actions";
import TodoBody from "@/components/todo-details/todo-body";

import { type Todo, todoDbSchema } from "@/server/models/todo";
import { createClient } from "@/utils/supabase/server";
import { convertTodoDb } from "@/utils/todo/utils";

export default async function TodoViewPage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);
  if (isNaN(id)) return notFound();

  const supabase = createClient(cookies());

  let todo: Todo;
  try {
    const { data, error } = await supabase.from("todos").select().eq("id", id);
    if (error) throw error;
    if (data.length === 0) throw new Error("data not found");
    if (data.length > 1) throw new Error("expected 1 data, but got 2");

    todo = convertTodoDb(todoDbSchema.parse(data[0]));
  } catch (error) {
    console.error({ error });
    return notFound();
  }
  return (
    <>
      <TodoBody todo={todo} />
      <TodoActions todo={todo} />
    </>
  );
}
