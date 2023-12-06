import dayjs from "dayjs";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

import { type Todo, TodoError, todoDbSchema } from "@/server/models/todo";

import { createClient } from "../supabase/client";
import { isPostgrestError } from "../utils";
import { convertTodoDb } from "./utils";

// Supabase client
const supabase = createClient();

async function getAll(): Promise<Todo[]> {
  try {
    const { data, error } = await supabase.from("todos").select();
    if (error) throw error;

    return todoDbSchema
      .array()
      .parse(data)
      .map((row) => convertTodoDb(row));
  } catch (error) {
    if (isPostgrestError(error as Error))
      throw new TodoError("Failed to get data from database");

    if (error instanceof ZodError) {
      const validationError = fromZodError(error);
      throw new TodoError(
        `Data from database has invalid shape. ${validationError}`,
      );
    }

    throw new TodoError(`Unknown error: ${(error as Error).message}`);
  }
}

async function getById(id: number): Promise<Todo> {
  try {
    const { data, error } = await supabase.from("todos").select().eq("id", id);
    if (error) throw error;
    if (data.length === 0) throw new Error("data not found");
    if (data.length > 1) throw new Error("expected 1 data, but got 2");

    return convertTodoDb(todoDbSchema.parse(data[0]));
  } catch (error) {
    if (isPostgrestError(error as Error))
      throw new TodoError("Failed to get data from database");

    if (error instanceof ZodError) {
      const validationError = fromZodError(error);
      throw new TodoError(
        `Data from database has invalid shape. ${validationError}`,
      );
    }

    if (error instanceof Error) {
      if (error.message === "data not found")
        throw new TodoError("Data not found in database");

      if (error.message === "expected 1 data, but got 2")
        throw new TodoError("Multiple data with the same id found in database");
    }

    throw new TodoError(`Unknown error: ${(error as Error).message}`);
  }
}

async function create(todo: Omit<Todo, "id">): Promise<Todo> {
  try {
    const { data, error } = await supabase
      .from("todos")
      .insert(
        todoDbSchema.omit({ id: true }).parse({
          title: todo.title,
          is_completed: todo.isCompleted,
          description: todo.description ?? "",
          due: todo.due ? dayjs(todo.due).format("YYYY-MM-DD") : null,
          priority: todo.priority ?? "",
        }),
      )
      .select();
    if (error) throw error;
    if (data.length === 0) throw new Error("data not found");
    if (data.length > 1) throw new Error("expected 1 data, but got 2");

    return convertTodoDb(todoDbSchema.parse(data[0]));
  } catch (error) {
    if (isPostgrestError(error as Error))
      throw new TodoError("Failed to insert data into database");

    if (error instanceof ZodError) {
      const validationError = fromZodError(error);
      throw new TodoError(
        `Data from database has invalid shape. ${validationError}`,
      );
    }

    if (error instanceof Error) {
      if (error.message === "data not found")
        throw new TodoError("Data not found in database");

      if (error.message === "expected 1 data, but got 2")
        throw new TodoError("Multiple data with the same id found in database");
    }

    throw new TodoError(`Unknown error: ${(error as Error).message}`);
  }
}

async function update(
  id: number,
  updatedTodo: Omit<Todo, "id">,
): Promise<Todo> {
  try {
    const { data, error } = await supabase
      .from("todos")
      .update(
        todoDbSchema.omit({ id: true }).parse({
          title: updatedTodo.title,
          description: updatedTodo.description ?? "",
          priority: updatedTodo.priority ?? "",
          due: updatedTodo.due
            ? dayjs(updatedTodo.due).format("YYYY-MM-DD")
            : null,
          is_completed: updatedTodo.isCompleted,
        }),
      )
      .eq("id", id)
      .select();
    if (error) throw error;
    if (data.length === 0) throw new Error("data not found");
    if (data.length > 1) throw new Error("expected 1 data, but got 2");

    return convertTodoDb(todoDbSchema.parse(data[0]));
  } catch (error) {
    if (isPostgrestError(error as Error))
      throw new TodoError("Failed to update data into database");

    if (error instanceof ZodError) {
      const validationError = fromZodError(error);
      throw new TodoError(
        `Data from database has invalid shape. ${validationError}`,
      );
    }

    if (error instanceof Error) {
      if (error.message === "data not found")
        throw new TodoError("Data not found in database");

      if (error.message === "expected 1 data, but got 2")
        throw new TodoError("Multiple data with the same id found in database");
    }

    throw new TodoError(`Unknown error: ${(error as Error).message}`);
  }
}

export async function setTodoCompletion(
  id: number,
  isCompleted: boolean,
): Promise<Todo> {
  const currentTodo = await getById(id);
  const updatedTodo = await update(id, { ...currentTodo, isCompleted });
  return updatedTodo;
}

async function remove(id: number) {
  try {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) throw error;
  } catch (error) {
    if (isPostgrestError(error as Error))
      throw new TodoError("Failed to update data into database");

    throw new TodoError(`Unknown error: ${(error as Error).message}`);
  }
}

const todoServices = { getAll, getById, create, update, remove };

export default todoServices;
