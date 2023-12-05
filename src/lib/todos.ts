import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import { cache } from "react";
import { z } from "zod";

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL ?? ""}/api/todos`;

async function fakeLoading() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
}

export const todoSchema = z
  .object({
    id: z.number().positive().finite(),
    title: z
      .string({ required_error: "Title is required" })
      .trim()
      .min(1, { message: "Title must not be blank" })
      .max(140, { message: "Title must be less than 140 characters" }),
    isCompleted: z.boolean().default(false),
    description: z.string(),
    // https://github.com/colinhacks/zod/discussions/1259
    due: z.instanceof(dayjs as unknown as typeof Dayjs),
    priority: z.enum(["HIGH", "MEDIUM", "LOW"]),
  })
  .partial({ description: true, due: true, priority: true });

export type Todo = z.infer<typeof todoSchema>;

export const getAllTodos = cache(async (): Promise<Todo[]> => {
  await fakeLoading();
  try {
    const response = await axios.get(`${baseUrl}/`);
    return response.data as Todo[];
  } catch (error) {
    throw new Error("Error occurred while getting todos");
  }
});

export async function getTodo(id: number): Promise<Todo> {
  await fakeLoading();
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data as Todo;
  } catch (error) {
    throw new Error("Todo not found");
  }
}

export async function createTodo(newTodo: Omit<Todo, "id">): Promise<Todo> {
  try {
    const response = await axios.post(`${baseUrl}/`, newTodo);
    return response.data as Todo;
  } catch (error) {
    throw new Error("Error occurred while creating a new todo");
  }
}

export async function updateTodo(
  id: number,
  editedTodo: Omit<Todo, "id">,
): Promise<Todo> {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, editedTodo);
    return response.data as Todo;
  } catch (error) {
    throw new Error("Error occurred while updating todos");
  }
}

export async function setTodoCompletion(
  id: number,
  isCompleted: boolean,
): Promise<Todo> {
  try {
    let response = await axios.get(`${baseUrl}/${id}`);
    const currentTodo = response.data as Todo;
    response = await axios.put(`${baseUrl}/${id}`, {
      ...currentTodo,
      isCompleted,
    });
    return response.data as Todo;
  } catch (error) {
    throw new Error("Error occurred while updating todo");
  }
}

export async function deleteTodo(id: number) {
  await fakeLoading();
  try {
    await axios.delete(`${baseUrl}/${id}`);
  } catch (error) {
    throw new Error("Error occurred while deleting todo");
  }
}
