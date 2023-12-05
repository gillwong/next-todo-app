"use client";

import { Todo } from "@/app/home/components/todo-item";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import CompletedTodoItem from "./completed-todo-item";
import dayjs from "dayjs";
import TodoListBodyLoading from "@/app/home/components/todo-list-body/loading";
import { Separator } from "@/components/ui/separator";

export default function CompletedTodoListBody() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData(): Promise<Todo[]> {
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

    setIsLoading(true);
    fetchData()
      .then((data) => {
        console.log({ data });
        setTodos(data as Todo[]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <TodoListBodyLoading />;

  const filteredTodos = todos
    .filter((todo) => todo.isCompleted)
    .toSorted((a, b) => {
      if (!a.due && !b.due) return 0;
      if (!a.due) return 1;
      if (!b.due) return -1;
      return dayjs(a.due).isAfter(dayjs(b.due)) ? 1 : -1;
    });

  console.log({ todos, filteredTodos });

  return (
    <>
      {filteredTodos.map((todo) => (
        <Fragment key={todo.id}>
          <CompletedTodoItem todo={todo} setTodos={setTodos} />
          <Separator />
        </Fragment>
      ))}
    </>
  );
}
