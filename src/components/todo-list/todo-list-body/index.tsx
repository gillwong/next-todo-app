import dayjs from "dayjs";
import { Fragment } from "react";

import { getAllTodos } from "@/lib/todos";

import { Separator } from "@/components/ui/separator";

import TodoItem from "../todo-item";

// async function getData(): Promise<Todo[]> {
//   try {
//     const res = await getAllTodos();
//     return res as Todo[];
//   } catch (error) {
//     throw new Error((error as Error).message);
//   }
// }

export default async function TodoListBody() {
  const todos = (await getAllTodos()).toSorted((a, b) => {
    if (!a.due && !b.due) return 0;
    if (!a.due) return 1;
    if (!b.due) return -1;
    return dayjs(a.due).isAfter(dayjs(b.due)) ? 1 : -1;
  });

  return (
    <>
      {todos.map((todo) => (
        <Fragment key={todo.id}>
          <TodoItem todo={todo} />
          <Separator />
        </Fragment>
      ))}
    </>
  );
}
