"use client";

import dayjs from "dayjs";
import { Fragment, useEffect, useState } from "react";

import { Todo, getAllTodos } from "@/lib/todos";

import TodoListBodyLoading from "@/components/todo-list/todo-list-body/loading";
import { Separator } from "@/components/ui/separator";

import { useToast } from "../ui/use-toast";
import CompletedTodoItem from "./completed-todo-item";

export default function CompletedTodoListBody() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setIsLoading(true);
    getAllTodos()
      .then((data) => {
        setTodos(data as Todo[]);
      })
      .catch((error: Error) => {
        setTodos([]);
        toast({
          variant: "destructive",
          title: "Error!",
          description: error.message,
        });
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
