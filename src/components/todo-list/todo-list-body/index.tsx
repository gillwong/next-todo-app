import dayjs from "dayjs";
import { cookies } from "next/headers";
import { Fragment } from "react";

import { Separator } from "@/components/ui/separator";

import { todoDbSchema } from "@/server/models/todo";
import { createClient } from "@/utils/supabase/server";
import { convertTodoDb } from "@/utils/todo/utils";

import TodoItem from "../todo-item";

export default async function TodoListBody() {
  const supabase = createClient(cookies());

  const { data, error } = await supabase.from("todos").select();
  if (error) throw error;

  const allTodos = todoDbSchema
    .array()
    .parse(data)
    .map((row) => convertTodoDb(row));

  const sortedTodos = allTodos.toSorted((a, b) => {
    if (!a.due && !b.due) return 0;
    if (!a.due) return 1;
    if (!b.due) return -1;
    return dayjs(a.due).isAfter(dayjs(b.due)) ? 1 : -1;
  });

  return (
    <>
      {sortedTodos.map((todo) => (
        <Fragment key={todo.id}>
          <TodoItem todo={todo} />
          <Separator />
        </Fragment>
      ))}
    </>
  );
}
