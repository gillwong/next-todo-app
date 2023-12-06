import dayjs from "dayjs";
import { Fragment } from "react";

import { Separator } from "@/components/ui/separator";

import Todos from "@/models/todo";

import TodoItem from "../todo-item";

export default async function TodoListBody() {
  const todos = (await Todos.getAll()).toSorted((a, b) => {
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
