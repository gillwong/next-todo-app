import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import TodoCheckbox from "@/components/todo-checkbox";

import { type Todo, todoDbSchema } from "@/server/models/todo";
import { createClient } from "@/utils/supabase/server";
import { convertTodoDb, simplify } from "@/utils/todo/utils";

export default async function TodoHeader({ todoId }: { todoId: number }) {
  const supabase = createClient(cookies());

  let todo: Todo;
  try {
    const { data, error } = await supabase
      .from("todos")
      .select()
      .eq("id", todoId);
    if (error) throw error;
    if (data.length === 0) throw new Error("data not found");
    if (data.length > 1) throw new Error("expected 1 data, but got 2");

    todo = convertTodoDb(todoDbSchema.parse(data[0]));
  } catch (error) {
    return notFound();
  }

  return (
    <div className="flex items-center space-x-4 px-2">
      <TodoCheckbox className="h-6 w-6" todo={simplify(todo)} />
      <h1 className="flex-shrink font-semibold text-lg">{todo.title}</h1>
    </div>
  );
}
