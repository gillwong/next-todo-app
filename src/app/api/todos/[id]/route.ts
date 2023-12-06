import dayjs from "dayjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import todoErrorHandler from "@/server/middleware/error-handler";
import { getIdParam } from "@/server/middleware/todo-middlewares";
import { todoDbSchema, todoSchema } from "@/server/models/todo";
import { createClient } from "@/utils/supabase/server";
import { convertTodoDb } from "@/utils/todo/utils";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const supabase = createClient(cookies());
  try {
    const id = getIdParam(params);
    const { data, error } = await supabase.from("todos").select().eq("id", id);
    if (error) throw error;
    if (data.length === 0) throw new Error("data not found");
    if (data.length > 1) throw new Error("expected 1 data, but got 2");

    const todo = convertTodoDb(todoDbSchema.parse(data[0]));
    return NextResponse.json(todo, { status: 200 });
  } catch (error) {
    return todoErrorHandler(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const supabase = createClient(cookies());
  const body = await request.json();
  try {
    const id = getIdParam(params);
    const updatedTodo = todoSchema.parse(body);
    const { data, error } = await supabase
      .from("todos")
      .update(
        todoSchema.omit({ id: true }).parse({
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

    const savedTodo = convertTodoDb(todoDbSchema.parse(data[0]));
    return NextResponse.json(savedTodo, { status: 200 });
  } catch (error) {
    return todoErrorHandler(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const supabase = createClient(cookies());
  try {
    const id = getIdParam(params);
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) throw error;

    return new Response(null, { status: 204 });
  } catch (error) {
    return todoErrorHandler(error);
  }
}
