import Todos from "@/models/todo";
import todoErrorHandler from "@/utils/error-handler";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const allTodos = await Todos.getAll();
    return NextResponse.json(allTodos);
  } catch (error) {
    return todoErrorHandler(error);
  }
}