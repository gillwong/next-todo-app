import { NextRequest, NextResponse } from "next/server";

import { Todo } from "@/lib/todos";

import Todos from "@/models/todo";
import todoErrorHandler from "@/utils/error-handler";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const allTodos = await Todos.getAll();
    return NextResponse.json(allTodos, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    return todoErrorHandler(error);
  }
}

export async function POST(request: NextRequest) {
  const todo = (await request.json()) as Todo;
  try {
    const savedTodo = await Todos.save(todo);
    return NextResponse.json(savedTodo, {
      status: 201,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    return todoErrorHandler(error);
  }
}
