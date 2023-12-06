import dayjs from "dayjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import todoErrorHandler from "@/server/middleware/error-handler";
import { todoDbSchema, todoSchema } from "@/server/models/todo";
import { createClient } from "@/utils/supabase/server";
import { convertTodoDb } from "@/utils/todo/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = createClient(cookies());
  try {
    const { data, error } = await supabase.from("todos").select();
    if (error) throw error;

    const allTodos = todoDbSchema
      .array()
      .parse(data)
      .map((row) => convertTodoDb(row));
    return NextResponse.json(allTodos, { status: 200 });
  } catch (error) {
    return todoErrorHandler(error);
  }
}

export async function POST(request: NextRequest) {
  const supabase = createClient(cookies());
  const body = await request.json();
  try {
    const todo = todoSchema.parse(body);
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

    const savedTodo = convertTodoDb(todoDbSchema.parse(data[0]));
    return NextResponse.json(savedTodo, { status: 201 });
  } catch (error) {
    return todoErrorHandler(error);
  }
}
