import axios from "axios";
import { Todo } from "@/app/home/components/todo-item";

export async function setTodoCompletion(id: number, isCompleted: boolean) {
  try {
    let response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/${id}`
    );
    const currentTodo = response.data as Todo;
    response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/${id}`,
      {
        ...currentTodo,
        isCompleted,
      }
    );
  } catch (error) {
    console.error({ error });
  }
}

export async function getTodo(id: number): Promise<Todo> {
  // fake loading
  await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/${id}`
    );
    return response.data as Todo;
  } catch (error) {
    throw new Error("Todo not found");
  }
}

export async function deleteTodo(id: number) {
  // fake loading
  await new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/${id}`);
  } catch (error) {
    throw new Error("Error occurred while deleting todo");
  }
}
