import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import {
  type Todo,
  type TodoDb,
  type TodoJSON,
  todoDbSchema,
  todoJSONSchema,
  todoSchema,
} from "@/server/models/todo";

dayjs.extend(customParseFormat);

export function convertTodoDb(data: TodoDb): Todo {
  const result: Todo = {
    ...data,
    description: data.description !== "" ? data.description : undefined,
    priority: data.priority !== "" ? data.priority : undefined,
    due: data.due ? dayjs(data.due, "YYYY-MM-DD") : undefined,
    isCompleted: data.is_completed,
  };
  return todoSchema.parse(result);
}

export function convertTodo(todo: Todo): TodoDb {
  const result: TodoDb = {
    ...todo,
    description: todo.description ?? "",
    priority: todo.priority ?? "",
    due: todo.due ? dayjs(todo.due).format("YYYY-MM-DD") : null,
    is_completed: todo.isCompleted,
  };
  return todoDbSchema.parse(result);
}

export function parseJSON(todo: TodoJSON): Todo {
  const result = {
    ...todo,
    due: dayjs(todo.due),
  };
  return todoSchema.parse(result);
}

export function simplify(todo: Todo): TodoJSON {
  const result = {
    ...todo,
    due: dayjs(todo.due).format(),
  };
  return todoJSONSchema.parse(result);
}
