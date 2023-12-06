import { NextRequest, NextResponse } from "next/server";

import { Todo } from "@/lib/todos";

import Todos from "@/models/todo";
import todoErrorHandler from "@/utils/error-handler";

export const dynamic = "force-dynamic";

function getIdParam({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (isNaN(id)) throw new Error(`id: ${id} is not a number`);
  return id;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  let id = 0;
  try {
    id = getIdParam({ params });
  } catch (error) {
    return NextResponse.json(
      { error: `invalid id format: ${(error as Error).message}` },
      { status: 400 },
    );
  }

  try {
    const todo = await Todos.getById(id);
    return NextResponse.json(todo, { status: 200 });
  } catch (error) {
    return todoErrorHandler(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  let id = 0;
  try {
    id = getIdParam({ params });
  } catch (error) {
    return NextResponse.json({ error: "invalid id format" }, { status: 400 });
  }

  const todo = (await request.json()) as Todo;
  try {
    const savedTodo = await Todos.update(id, todo);
    return NextResponse.json(savedTodo, { status: 200 });
  } catch (error) {
    return todoErrorHandler(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  let id = 0;
  try {
    id = getIdParam({ params });
  } catch (error) {
    return NextResponse.json({ error: "invalid id format" }, { status: 400 });
  }

  try {
    await Todos.remove(id);
    return new Response(null, { status: 204 });
  } catch (error) {
    return todoErrorHandler(error);
  }
}
