import TodoItem, { Todo, todoSchema } from "../todo-item";
import { Fragment } from "react";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import dayjs from "dayjs";

async function getTodos(): Promise<Todo[]> {
  // fake loading
  await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/todos`
    );
    return response.data as Todo[];
  } catch (error) {
    return [];
  }
}

export default async function TodoListBody() {
  const todos = (await getTodos()).toSorted((a, b) => {
    if (!a.due && !b.due) return 0;
    if (!a.due) return 1;
    if (!b.due) return -1;
    return dayjs(a.due).isAfter(dayjs(b.due)) ? 1 : -1;
  });

  return (
    <>
      {todos.map((todo) => (
        <Fragment key={todo.id}>
          <TodoItem key={todo.id} todo={todo} />
          <Separator />
        </Fragment>
      ))}
    </>
  );
}
