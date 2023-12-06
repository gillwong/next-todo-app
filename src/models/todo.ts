import dayjs from "dayjs";

import { Todo } from "@/lib/todos";

import { supabase } from "@/utils/config";

export class TodoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TodoError";
  }
}

function convertTodo(data: any): Todo {
  const todo = { ...data, isCompleted: data.is_completed };
  delete todo["is_completed"];
  return todo;
}

async function getAll() {
  try {
    const { data, error } = await supabase.from("todos").select();
    if (error) throw error;
    return data.map((dt) => convertTodo(dt)) as Todo[];
  } catch (error) {
    throw new TodoError("Failed to select all from todos table");
  }
}

async function getById(id: number) {
  try {
    const { data, error } = await supabase.from("todos").select().eq("id", id);
    if (error) throw error;
    if (data.length === 0) throw new Error("not found");
    return convertTodo(data[0]) as Todo;
  } catch (error) {
    if ((error as Error).message === "not found")
      throw new TodoError("Todo not found in todos table");
    throw new TodoError("Failed to select from todos table");
  }
}

async function save(todo: Omit<Todo, "id">) {
  try {
    const { data, error } = await supabase
      .from("todos")
      .insert({
        title: todo.title,
        is_completed: todo.isCompleted ? 1 : 0,
        description: todo.description ?? "",
        due: todo.due ? dayjs(todo.due).format("YYYY-MM-DD") : null,
        priority: todo.priority ?? "",
      })
      .select();
    if (error) throw error;
    return convertTodo(data[0]) as Todo;
  } catch (error) {
    throw new TodoError("Failed to insert todo into todos table");
  }
}

async function update(id: number, updatedTodo: Omit<Todo, "id">) {
  try {
    const { data, error } = await supabase
      .from("todos")
      .update({
        title: updatedTodo.title,
        description: updatedTodo.description ?? "",
        priority: updatedTodo.priority ?? "",
        due: updatedTodo.due
          ? dayjs(updatedTodo.due).format("YYYY-MM-DD")
          : null,
        is_completed: updatedTodo.isCompleted ? 1 : 0,
      })
      .eq("id", id)
      .select();
    if (error) throw error;
    return convertTodo(data[0]) as Todo;
  } catch (error) {
    throw new TodoError("Failed to update todo in todos table");
  }
}

async function remove(id: number) {
  try {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) throw error;
  } catch (error) {
    throw new TodoError("Failed to delete todo from todos table");
  }
}

const Todos = { getAll, getById, save, update, remove };

export default Todos;
